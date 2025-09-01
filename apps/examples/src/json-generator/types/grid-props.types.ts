export type GridPropKey = "xs" | "sm" | "md" | "lg" | "xl";

export interface PropSelectProps {
  selectedKey: GridPropKey | "";
  remainingKeys: GridPropKey[];
  onChange: (val: GridPropKey | "") => void;
  onAdd: () => void
}

export interface PropFieldProps {
  propKey: GridPropKey;
  value: number | "auto" | "";
  onUpdate: (Key: GridPropKey, value: string) => void;
  onDelete: (Key: GridPropKey) => void;
}

export interface GridPropsBuilderProps {
  onConfirm: (props: Partial<Record<GridPropKey, number | "auto">>) => void;
}