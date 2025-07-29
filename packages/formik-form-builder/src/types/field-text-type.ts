import { InputProps } from '@mui/joy/Input';
import { BasicInputType } from './basic-input-type';
import { InputTypes } from './input-types';
import { FieldConditionAction } from './common-types';



export type FieldTextProps = InputProps & {
    name: string;
    label?: string;
    helperText?:string;
    placeholder?: string;
    required?: boolean;
    actions: FieldConditionAction;
}

export interface FieldTextType extends BasicInputType<InputTypes.TEXT, InputProps> {
    style?: string;
}