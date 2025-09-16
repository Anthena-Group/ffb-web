import { useState } from "react";
import type { GridPropKey } from "../types";

export function useGridPropsBuilder() {
  const [draftProps, setDraftProps] = useState<
    Partial<Record<GridPropKey, number | "auto" | "">>
  >({});
  const [selectedKey, setSelectedKey] = useState<GridPropKey | "">("");

  const addProp = () => {
    if (!selectedKey || draftProps[selectedKey]) return;
    setDraftProps((prev) => ({ ...prev, [selectedKey]: "" }));
    setSelectedKey("");
  };

  const updateProps = (key: GridPropKey, value: string) => {
    setDraftProps((prev) => ({
      ...prev,
      [key]: value === "auto" ? "auto" : Number(value),
    }));
  };

  const deleteProps = (key: GridPropKey) => {
    const newProps = { ...draftProps };
    delete newProps[key];
    setDraftProps(newProps);
  };

  const confirmProps = () => {
    const finalProps: Partial<Record<GridPropKey, number | "auto">> = {};
    Object.entries(draftProps).forEach(([k, v]) => {
      if (v !== "") finalProps[k as GridPropKey] = v as number | "auto";
    });
    return finalProps;
  };

  return {
    draftProps,
    selectedKey,
    setSelectedKey,
    addProp,
    updateProps,
    deleteProps,
    confirmProps,
  };
}
