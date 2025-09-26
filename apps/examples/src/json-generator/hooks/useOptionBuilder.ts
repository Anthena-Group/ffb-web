import { useMemo, useState, useCallback, useEffect } from "react";
import * as MuiIcons from "@mui/icons-material";
import type { ExtendedOptionType } from "../types";

export function useOptionBuilder(onChange: (opts: ExtendedOptionType[]) => void) {
  const [options, setOptions] = useState<ExtendedOptionType[]>([
    { label: "", value: "" },
  ]);

  useEffect(() => {
    if (onChange) onChange(getValidOptions());
  }, [options]);

  const allIcons = useMemo(() => Object.keys(MuiIcons), []);

  const handleOptionChange = useCallback(
    <K extends keyof ExtendedOptionType>(
      index: number,
      key: K,
      value: ExtendedOptionType[K]
    ) => {
      setOptions((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [key]: value };
        return updated;
      });
    },
    []
  );



  const addOption = useCallback(() => {
    const last = options[options.length - 1];
    if (!(last.label || last.title)?.trim() || !String(last.value ?? "").trim())
      return;
    setOptions((prev) => [...prev, { label: "", value: "" }]);
  }, [options]);

  const removeOption = useCallback((index: number) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const getValidOptions = useCallback(() => {
    return options.filter(
      (opt) =>
        !!(opt.label?.toString().trim() || opt.title?.toString().trim()) &&
        !!opt.value?.toString().trim()
    );
  }, [options]);

  const getIconSuggestions = useCallback(
    (input: string) => {
      const query = input?.trim().toLowerCase();
      if (!query) return allIcons.slice(0, 50); // fallback first 50
      return allIcons
        .filter((name) => name.toLowerCase().includes(query))
        .slice(0, 50);
    },
    [allIcons]
  );

  return {
    options,
    handleOptionChange,
    addOption,
    removeOption,
    getValidOptions,
    getIconSuggestions,
  };
}
