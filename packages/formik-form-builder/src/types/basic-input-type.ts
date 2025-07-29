import { GridProps } from '@mui/joy/Grid';
import { ValidationRule } from './validation-rule';
import { ConditionType } from './condition-type';

export interface CommonInputTypes {
  label?: string;
  groupLabel?: string;
  placeholder?: string;
  helperText?: string;
}

export interface BasicInputType<T, P> extends CommonInputTypes {
  id?: string;
  type: T;
  ['data-test']?: string;
  field: string;
  initialValue?: string | number | boolean | string[] | number[] | boolean[];
  validation?: ValidationRule;
  outputType?: "string" | "number" | "boolean";
  muiProps?: P;
  gridProps?: GridProps;
  conditions?: ConditionType;
}
