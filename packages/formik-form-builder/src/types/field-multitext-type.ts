import { TextareaProps } from '@mui/joy/Textarea';
import { BasicInputType } from './basic-input-type';
import { InputTypes } from './input-types';
import { FieldConditionAction } from './common-types';

export type FieldMultiTextProps = TextareaProps & {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  actions: FieldConditionAction;
};

export interface FieldMultiTextType
  extends BasicInputType<InputTypes.MULTI_TEXT, TextareaProps> {
  style?: string;
}
