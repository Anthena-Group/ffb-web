import { FormikValues } from 'formik';
import { ConditionLogic, ConditionName, ConditionValue } from '../types';

export const evaluateCondition = (
  logic: ConditionLogic,
  fieldValue: ConditionValue
): boolean => {
  const { condition } = logic;
  switch (condition) {
    case ConditionName.EQUALS:
      return fieldValue === logic.value;
    case ConditionName.NOT_EQUALS:
      return fieldValue !== logic.value;
    case ConditionName.GREATER_THAN:
      return (
        typeof fieldValue === 'number' &&
        typeof logic.value === 'number' &&
        fieldValue > logic.value
      );
    case ConditionName.LESS_THAN:
      return (
        typeof fieldValue === 'number' &&
        typeof logic.value === 'number' &&
        fieldValue < logic.value
      );
    case ConditionName.GREATER_THAN_OR_EQUAL:
      return (
        typeof fieldValue === 'number' &&
        typeof logic.value === 'number' &&
        fieldValue >= logic.value
      );
    case ConditionName.LESS_THAN_OR_EQUAL:
      return (
        typeof fieldValue === 'number' &&
        typeof logic.value === 'number' &&
        fieldValue <= logic.value
      );
    case ConditionName.CONTAINS:
      return (
        typeof fieldValue === 'string' &&
        typeof logic.value === 'string' &&
        fieldValue.includes(logic.value)
      );
    case ConditionName.NOT_CONTAINS:
      return (
        typeof fieldValue === 'string' &&
        typeof logic.value === 'string' &&
        !fieldValue.includes(logic.value)
      );
    case ConditionName.STARTS_WITH:
      return (
        typeof fieldValue === 'string' &&
        typeof logic.value === 'string' &&
        fieldValue.startsWith(logic.value)
      );
    case ConditionName.ENDS_WITH:
      return (
        typeof fieldValue === 'string' &&
        typeof logic.value === 'string' &&
        fieldValue.endsWith(logic.value)
      );
    case ConditionName.IS_EMPTY:
      return (
        fieldValue === '' || fieldValue === null || fieldValue === undefined
      );
    case ConditionName.IS_NOT_EMPTY:
      return (
        fieldValue !== '' && fieldValue !== null && fieldValue !== undefined
      );
    // Array-specific conditions
    case ConditionName.INCLUDES:
      return (
        Array.isArray(fieldValue) &&
        fieldValue.includes(logic.value)
      );
    case ConditionName.NOT_INCLUDES:
      return (
        Array.isArray(fieldValue) &&
        logic.value !== undefined &&
        !fieldValue.includes(logic.value)
      );
    case ConditionName.ARRAY_EQUALS:
      return (
        logic.value !== null &&
        logic.value !== undefined &&
        Array.isArray(fieldValue) &&
        Array.isArray(logic.value) &&
        fieldValue.length === logic.value.length &&
        fieldValue.every((val, index) => val === (Array.isArray(logic.value) && logic.value[index]))
      );
    default:
      return false;
  }
};


export const getFieldValue = (fieldPath: string, values: FormikValues): ConditionValue => {
    // Split the field path into an array of keys
    const keys = fieldPath.split('.');
    let currentValue: FormikValues = values;

    // Traverse the object using the keys
    for (const key of keys) {
        // Check if the current value is an object and has the key
        if (currentValue && typeof currentValue === 'object' && key in currentValue) {
            currentValue = currentValue[key];
        } else {
            // If the key does not exist, return undefined or handle as needed
            return undefined; // or throw an error, or return a default value
        }
    }

    return currentValue as unknown as ConditionValue; // Return the final value found
};

function includes(value: string | number | boolean | ConditionValue[] | null | undefined): boolean {
  throw new Error('Function not implemented.');
}
