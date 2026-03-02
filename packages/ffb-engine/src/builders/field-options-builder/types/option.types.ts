import type { InputTypes, OptionType } from "@mjfy/core";

export type ExtendedOptionType = OptionType & {
  title?: string;
};

export type OptionBuilderProps = {
    onChange: (options: OptionType[]) => void;
    type?: InputTypes;
    variant?: "ICON" | "DEFAULT";
    value?: OptionType[];
};