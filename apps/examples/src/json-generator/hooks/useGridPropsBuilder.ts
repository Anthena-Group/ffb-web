import { useState, useCallback, useEffect } from "react";
import type { GridPropKey } from "../types";
import type { GridProps } from "@mui/joy";

export function useGridPropsBuilder(onChange: (props: GridProps) => void) {
  const [draftProps, setDraftProps] = useState<
    Partial<Record<GridPropKey, number | "auto" | "">>
  >({});
  const [selectedKey, setSelectedKey] = useState<GridPropKey | "">("");

  useEffect(() => {
    onChange(confirmProps());
  }, [draftProps, selectedKey]);

  const addProp = useCallback(() => {
    setDraftProps(prev => {
      if (!selectedKey || prev[selectedKey]) return prev;
      return { ...prev, [selectedKey]: "" };
    });
    setSelectedKey("");
  }, [selectedKey]);

  const updateProps = useCallback((key: GridPropKey, value: string) => {
    setDraftProps(prev => ({
      ...prev,
      [key]: value === "auto" ? "auto" : Number(value),
    }));
  }, []);

  const deleteProps = useCallback((key: GridPropKey) => {
    setDraftProps(prev => {
      const newProps = { ...prev };
      delete newProps[key];
      return newProps;
    });
  }, []);

  const confirmProps = useCallback(() => {
    const finalProps: Partial<Record<GridPropKey, number | "auto">> = {};
    Object.entries(draftProps).forEach(([k, v]) => {
      if (v !== "") finalProps[k as GridPropKey] = v as number | "auto";
    });
    return finalProps;
  }, [draftProps]);

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
