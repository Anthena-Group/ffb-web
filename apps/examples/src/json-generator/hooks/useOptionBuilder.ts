import { useMemo, useState } from "react";
import * as MuiIcons from "@mui/icons-material";
import type { ExtendedOptionType } from "../types";


export function useOptionBuilder() {
  const [options, setOptions] = useState<ExtendedOptionType[]>([
    { label: "", value: "" },
  ]);

  const allIcons = useMemo(() => Object.keys(MuiIcons), []);

  const handleOptionChange = (
    index: number,
    key: keyof ExtendedOptionType,
    value: string
  ) => {
    const updated = [...options];
    updated[index] = { ...updated[index], [key]: value };
    setOptions(updated);
  };

  const addOption = () => {
    const last = options[options.length - 1];
    if (!(last.label || last.title)?.trim() || !String(last.value ?? "").trim()) return;
    setOptions((prev) => [...prev, { label: "", value: "" }]);
  };

  const removeOption = (index: number) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };


  const getValidOptions = () =>
    options.filter(
      (opt) =>
        !!(opt.label?.toString().trim() || opt.title?.toString().trim()) &&
        !!opt.value?.toString().trim()
    );


  const getIconSuggestions = (input: string) => {
    if (!input) return allIcons.slice(0, 50);
    return allIcons
      .filter((name) =>
        name.toLowerCase().includes(input.toLowerCase())
      )
      .slice(0, 50);
  };

  return {
    options,
    handleOptionChange,
    addOption,
    removeOption,
    getValidOptions,
    getIconSuggestions,
  };
}
