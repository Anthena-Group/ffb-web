import { useEffect, useState } from 'react';
import { FormikValues } from 'formik';
import { evaluateCondition, getFieldValue } from '../helper';
import {
  ConditionAction,
  FieldConditionAction,
  FieldType,
  PostCondition,
} from '../types';

export const getEvaluatedResult = (field: FieldType, values: FormikValues) => {
  const conditions = field?.conditions;
  const groups = conditions?.groups;

  const finalResult = groups?.reduce((acc, group, index) => {
    const groupResult = group?.logic.reduce((c, logic, i) => {
      const fieldValue = getFieldValue(logic.field, values);
      const result = evaluateCondition(logic, fieldValue);
      if (i === 0) {
        return result;
      }

      if (logic.postCondition === PostCondition.AND) {
        return c && result;
      } else if (logic.postCondition === PostCondition.OR) {
        return c || result;
      }
      return c;
    }, true);

    if (index === 0) {
      return groupResult;
    }

    if (group.groupPostCondition === PostCondition.AND) {
      return acc && groupResult;
    } else if (group.groupPostCondition === PostCondition.OR) {
      return acc || groupResult;
    }

    return acc;
  }, true);

  return finalResult;
};

export const useFieldConditions = (
  fields: FieldType[],
  values: FormikValues
) => {
  const [fieldConditions, setFieldConditions] = useState<{
    [key: string]: boolean;
  }>({});

  const fieldDefaults: {
    [key: string]: FieldConditionAction;
  } = {};

  const fieldActions = fields.reduce(
    (acc: { [key: string]: FieldConditionAction }, field) => {
      if (field.conditions?.action) {
        switch (field.conditions.action) {
          case ConditionAction.HIDE:
            acc[field.field] = { hide: true, disable: false };
            fieldDefaults[field.field] = { hide: false, disable: false };
            break;
          case ConditionAction.DISABLE:
            acc[field.field] = { hide: false, disable: true };
            fieldDefaults[field.field] = { hide: false, disable: false };
            break;
          case ConditionAction.SHOW:
            acc[field.field] = { hide: false, disable: false };
            fieldDefaults[field.field] = { hide: true, disable: false };
            break;
          case ConditionAction.ENABLE:
            acc[field.field] = { hide: false, disable: false };
            fieldDefaults[field.field] = { hide: false, disable: true };
            break;
          default:
            acc[field.field] = { hide: false, disable: false };
            fieldDefaults[field.field] = { hide: false, disable: false };
        }
      }
      return acc;
    },
    {}
  );

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const newConditions = fields.reduce(
        (acc: { [key: string]: boolean }, field) => {
          const res = getEvaluatedResult(field, values) || false;
          acc[field.field] = res;
          return acc;
        },
        {}
      );
      setFieldConditions(newConditions);
    }, 100); // Adjust debounce delay as needed

    return () => clearTimeout(debounceTimeout); // Cleanup timeout on unmount or re-run
  }, [values]);

  return { fieldConditions, fieldActions, fieldDefaults };
};
