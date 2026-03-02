import type { GridProps } from "@mui/joy";

export type GridPropKey = "xs" | "sm" | "md" | "lg" | "xl";


export interface PropFieldProps {
  propKey: GridPropKey;
  value: number | "auto" | "";
  onChange: (key: GridPropKey, value: string) => void;
  onDelete: (key: GridPropKey) => void;
}

export interface GridPropsBuilderProps {
  onChange: (gridProps: GridProps) => void;
}