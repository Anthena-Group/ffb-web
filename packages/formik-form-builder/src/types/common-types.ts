export type OptionType = {
  value: string | boolean | number;
  label: string;
  description?: string;
  icon?: React.ReactNode;
};

export type CheckboxOptionType = OptionType & {
  value: string;
};


export type FieldConditionAction = {
  hide: boolean;
  disable: boolean;
}
