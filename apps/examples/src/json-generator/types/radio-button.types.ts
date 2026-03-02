import type { FieldRadioType } from "@mjfy/core";

export interface RadioFieldsProps {
  config: FieldRadioType;
  initialInput: string;
  onChange: (key: keyof FieldRadioType, value: string | null) => void;
  setInitialInput: (val: string) => void;
}