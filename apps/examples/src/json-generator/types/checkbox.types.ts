import type { FieldCheckboxType } from "@mjfy/core";

export interface CheckboxConfigFieldProps {
  config: FieldCheckboxType;
  initialInput: string;
  onChange: (key: keyof FieldCheckboxType, value: string | null) => void;
  setInitialInput: (val: string) => void;
}