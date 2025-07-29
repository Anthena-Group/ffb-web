import { AutocompleteProps } from '@mui/joy/Autocomplete';
import { BasicInputType } from './basic-input-type';
import { FieldConditionAction, OptionType } from './common-types';
import { InputTypes } from './input-types';

export type FieldAutoCompleteProps = Omit<
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  AutocompleteProps<any, false, false, false>,
  'options' | 'renderInput'
> & {
  name: string;
  label?: string;
  helperText?: string;
  placeholder?:string;
  options: OptionType[];
  required?: boolean;
  actions: FieldConditionAction;
};

export interface FieldAutoCompleteType
  extends BasicInputType<
    InputTypes.AUTO_COMPLETE,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Omit<AutocompleteProps<any, false, false, false>, 'options' | 'renderInput'>
  > {
  options: OptionType[];
}
