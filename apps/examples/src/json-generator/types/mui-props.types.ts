// Types used by common/mui-props and other components

export type ComponentType =
  | "text"
  | "multiline"
  | "checkbox"
  | "radio"
  | "select"
  | "autocomplete"
  | string;

export type PropKind = "boolean" | "text" | "select" | "object" | "array" | "nested";

export type PropConfig = {
  name: string;
  type: PropKind;
  options?: string[];
  label?: string;
};

export type MuiPropsState = Record<string, any>;

export interface MUIPropsComponentProps {
  muiProps: MuiPropsState;
  setMuiProps: (props: MuiPropsState) => void;
  componentType?: ComponentType;
}
