export type GridPropKey = "xs" | "sm" | "md" | "lg" | "xl";


export interface PropFieldProps {
  propKey: GridPropKey;
  value: number | "auto" | "";
  onChange: (key: GridPropKey, value: string) => void;
  onDelete: (key: GridPropKey) => void;
}

export interface GridPropsBuilderProps {
  onConfirm: (props: Partial<Record<GridPropKey, number | "auto">>) => void;
}