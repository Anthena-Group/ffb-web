import { FieldAutoCompleteType } from './field-autocomplete-type';
import { FieldCheckboxType } from './field-checkbox-type';
import { FieldMultiTextType } from './field-multitext-type';
import { FieldRadioType } from './field-radio-type';
import { FieldSelectType } from './field-select-type';
import { FieldTextType } from './field-text-type';

export type FieldType =
  | FieldTextType
  | FieldMultiTextType
  | FieldCheckboxType
  | FieldRadioType
  | FieldSelectType
  | FieldAutoCompleteType;
