import type { FieldCheckboxType } from "formik-form-builder";

export interface CheckboxConfigFieldProps {
  config: FieldCheckboxType;
  initialInput: string;
  onChange: (key: keyof FieldCheckboxType, value: string | null) => void;
  setInitialInput: (val: string) => void;
}