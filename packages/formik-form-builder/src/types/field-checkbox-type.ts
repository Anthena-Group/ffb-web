import { CheckboxProps } from '@mui/joy/Checkbox';
import { BasicInputType } from './basic-input-type';
import { CheckboxOptionType, FieldConditionAction } from './common-types';
import { InputTypes } from './input-types';

export type FieldCheckBoxProps = CheckboxProps & {
  name: string;
  options: CheckboxOptionType[];
  helperText?: string;
  groupLabel?: string;
  direction?: 'row' | 'column';
  required?: boolean;
  actions: FieldConditionAction;
};

export enum CHECK_BOX_VALUE_TYPE {
  ARRAY = 'array',
  STRING = 'string',
  BOOLEAN = 'boolean'
}

export interface FieldCheckboxType
  extends BasicInputType<InputTypes.CHECKBOX, CheckboxProps> {
  options: CheckboxOptionType[];
  direction?: 'row' | 'column';
  valueType?: CHECK_BOX_VALUE_TYPE;
}
