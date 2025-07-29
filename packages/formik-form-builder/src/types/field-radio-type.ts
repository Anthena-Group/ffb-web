import { RadioProps } from '@mui/joy/Radio';
import { BasicInputType } from './basic-input-type';
import { InputTypes } from './input-types';
import { FieldConditionAction, OptionType } from './common-types';


export type FieldRadioProps = RadioProps & {
    name: string;
    groupLabel?: string;
    helperText?: string;
    options: OptionType[];
    outputType?: "string" | "number" | "boolean";
    direction?: "row" | "column";
    required?: boolean;
    actions: FieldConditionAction;
};

export interface FieldRadioType
  extends BasicInputType<InputTypes.RADIO, RadioProps> {
    options: OptionType[];
    direction?: "row" | "column";
    variant?: "DEFAULT" | "ICON";
}
