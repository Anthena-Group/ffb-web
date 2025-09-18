import type { InputTypes, OptionType } from "formik-form-builder";

export type ExtendedOptionType = OptionType & {
  title?: string;
};

export type OptionBuilderProps = {
    onConfirm: (options: OptionType[]) => void;
    type?: InputTypes;
    variant?: "ICON" | "DEFAULT";
};