/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikValues } from 'formik';
import * as Yup from 'yup';
import { CHECK_BOX_VALUE_TYPE, FieldType, InputTypes } from '../types';

const assignObjectFields = (
  fieldsValString: string,
  value: any,
  schemaFields: Record<string, any>
): Record<string, any> => {
  const fields = fieldsValString.split('.');
  if (fields.length === 1) return { ...schemaFields, [fieldsValString]: value };
  const [firstVal, ...rest] = fields;
  const result: Record<string, any> = schemaFields;

  result[firstVal] = assignObjectFields(
    rest.join('.'),
    value,
    result[firstVal] || {}
  );
  return result;
};

export const useFormBuilder = (fields: FieldType[]) => {
  const schemaFields: Record<string, any> = {};
  const initailValues: FormikValues = {};
  const nestedFields: { [key: string]: string } = {};

  fields.forEach((field) => {
    let validator: any;
    switch (field.type) {
      case InputTypes.CHECKBOX:
        if (field.valueType === CHECK_BOX_VALUE_TYPE.STRING) {
          validator = Yup.string();
        } else if (field.valueType === CHECK_BOX_VALUE_TYPE.BOOLEAN) {
          validator = Yup.boolean();
        } else {
          validator = Yup.array();
        }
        break;
      case InputTypes.TEXT:
        if (field.muiProps?.type === 'number') {
          validator = Yup.number();
        } else if (field.muiProps?.type === 'date') {
          validator = Yup.date();
        } else if (field.muiProps?.type === 'email') {
          validator = Yup.string().email();
        } else {
          validator = Yup.string();
        }
        break;
      default:
        validator = Yup.string();
        break;
    }

    if (field.validation?.required) {
      validator = validator.required(
        field.validation.message || 'This field is required'
      );
    }

    if (field.validation?.minLength) {
      validator = validator.min(
        field.validation.minLength,
        field.validation.minLengthRuleMsg ||
          `Minimum length is ${field.validation.minLength}` ||
          field.validation.message
      );
    }

    if (field.validation?.minValue) {
      validator = validator.min(
        field.validation.minValue,
        field.validation.minValueRuleMsg ||
          `Minimum value is ${field.validation.minValue}` ||
          field.validation.message
      );
    }

    if (field.validation?.isPositive) {
      validator = validator.positive(
        field.validation.isPositiveRuleMsg ||
          `Value must be a positive number.` ||
          field.validation.message
      );
    }

    if (field.validation?.moreThan) {
      validator = validator.transform(Number).moreThan(
        field.validation.moreThan,
        field.validation.moreThanRuleMsg ||
          `Should be more than ${field.validation.moreThan}` ||
          field.validation.message
      );
    }

    if (field.validation?.lessThan) {
      validator = validator.lessThan(
        field.validation.lessThan,
        field.validation.lessThanRuleMsg ||
          `Should be less than ${field.validation.lessThan}` ||
          field.validation.message
      );
    }

    if (field.validation?.maxLength) {
      validator = validator.max(
        field.validation.maxLength,
        field.validation.maxLengthRuleMsg ||
          `Maximum length is ${field.validation.maxLength}` ||
          field.validation.message
      );
    }

    if (field.validation?.maxValue) {
      validator = validator.max(
        field.validation.maxValue,
        field.validation.maxValueRuleMsg ||
          `Maximum value is ${field.validation.maxValue}` ||
          field.validation.message
      );
    }

    if (field.validation?.pattern) {
      validator = validator.matches(
        field.validation.pattern,
        field.validation.patternRuleMsg ||
          field.validation.message ||
          'Invalid format'
      );
    }

    if(field?.validation?.yupCustomValidation) {
      validator = validator.test(field?.validation?.yupCustomValidation)
    }

    if (field.field.split('.').length > 1) {
      nestedFields[field.field.split('.')[0]] = 'val';
      assignObjectFields(field.field, validator, schemaFields);
      assignObjectFields(field.field, field.initialValue, initailValues);
    } else {
      schemaFields[field.field] = validator;
      initailValues[field.field] = field.initialValue;
    }
  });

  //TODO: Deep nested fields are not supported yet
  Object.keys(nestedFields).forEach((f) => {
    schemaFields[f] = Yup.object().shape({ ...schemaFields[f] });
  });

  return {
    yupSchemaValidation: Yup.object().shape(schemaFields),
    initailValues,
  };
};
