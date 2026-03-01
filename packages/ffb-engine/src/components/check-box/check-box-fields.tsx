import React from "react";
import { Input, Select, Option, Box, Stack } from "@mui/joy";
import { CHECK_BOX_VALUE_TYPE } from "@mjfy/core";
import type { FieldCheckboxType } from "@mjfy/core";

export interface CheckboxConfigFieldProps {
  config: FieldCheckboxType;
  initialInput: string;
  onChange: (key: keyof FieldCheckboxType, value: string | null) => void;
  setInitialInput: (val: string) => void;
}

export const CheckboxConfigField = React.memo(
  ({
    config,
    initialInput,
    onChange,
    setInitialInput,
  }: CheckboxConfigFieldProps) => {
    // Safe fallbacks to avoid uncontrolled/controlled warnings
    const safeConfig = {
      field: config.field ?? "",
      groupLabel: config.groupLabel ?? "",
      label: config.label ?? "",
      helperText: config.helperText ?? "",
      direction: (config.direction ?? null) as "row" | "column" | null,
      outputType: (config.outputType ?? null) as
        | "string"
        | "number"
        | "boolean"
        | null,
      valueType: (config.valueType ?? null) as CHECK_BOX_VALUE_TYPE | null,
    };

    return (
      <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            "& > *": { flex: "1 1 45%" },
          }}
        >
          <Input
            placeholder="Field name"
            value={safeConfig.field}
            onChange={(e) => onChange("field", e.target.value)}
          />
          <Input
            placeholder="Group Label"
            value={safeConfig.groupLabel}
            onChange={(e) => onChange("groupLabel", e.target.value)}
          />
          <Input
            placeholder="Label"
            value={safeConfig.label}
            onChange={(e) => onChange("label", e.target.value)}
          />
          <Input
            placeholder="Helper Text"
            value={safeConfig.helperText}
            onChange={(e) => onChange("helperText", e.target.value)}
          />
          <Input
            placeholder="Enter initial value"
            value={initialInput ?? ""}
            onChange={(e) => setInitialInput(e.target.value)}
            sx={{ flex: "1 1 100%" }}
          />
        </Box>

        <Stack direction="row" spacing={2}>
          <Select<"row" | "column">
            value={safeConfig.direction}
            onChange={(_, val) => {
              // Joy Select can return null
              onChange("direction", val ?? null);
            }}
            placeholder="Direction"
            sx={{ flex: 1 }}
          >
            <Option value="row">Row</Option>
            <Option value="column">Column</Option>
          </Select>

          <Select<"string" | "number" | "boolean">
            value={safeConfig.outputType}
            onChange={(_, val) => onChange("outputType", val ?? null)}
            placeholder="Output Type"
            sx={{ flex: 1 }}
          >
            <Option value="string">String</Option>
            <Option value="number">Number</Option>
            <Option value="boolean">Boolean</Option>
          </Select>

          <Select<CHECK_BOX_VALUE_TYPE>
            value={safeConfig.valueType}
            onChange={(_, val) => onChange("valueType", val ?? null)}
            placeholder="Value Type"
            sx={{ flex: 1 }}
          >
            <Option value={CHECK_BOX_VALUE_TYPE.ARRAY}>Array</Option>
            <Option value={CHECK_BOX_VALUE_TYPE.STRING}>String</Option>
            <Option value={CHECK_BOX_VALUE_TYPE.BOOLEAN}>Boolean</Option>
          </Select>
        </Stack>
      </Stack>
    );
  },
);
