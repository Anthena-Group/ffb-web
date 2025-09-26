import { Input, Select, Option, Box, Stack } from "@mui/joy";
import React from "react";
import type { RadioFieldsProps } from "../../types";

function RadioConfigFields({
  config,
  initialInput,
  onChange,
  setInitialInput,
}: RadioFieldsProps) {
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
          value={config.field ?? ""}
          onChange={(e) => onChange("field", e.target.value)}
        />
        <Input
          placeholder="Group Label"
          value={config.groupLabel ?? ""}
          onChange={(e) => onChange("groupLabel", e.target.value)}
        />
        <Input
          placeholder="Label"
          value={config.label ?? ""}
          onChange={(e) => onChange("label", e.target.value)}
        />
        <Input
          placeholder="Helper Text"
          value={config.helperText ?? ""}
          onChange={(e) => onChange("helperText", e.target.value)}
        />
        <Input
          placeholder="Enter initial value"
          value={initialInput}
          onChange={(e) => setInitialInput(e.target.value)}
          sx={{ flex: "1 1 100%" }}
        />
      </Box>

      <Stack direction="row" spacing={2}>
        <Select
          value={config.direction || null}
          onChange={(_, val) => onChange("direction", val)}
          placeholder="Direction"
          sx={{ flex: 1 }}
        >
          <Option value="row">Row</Option>
          <Option value="column">Column</Option>
        </Select>

        <Select
          value={config.outputType || null}
          onChange={(_, val) => onChange("outputType", val)}
          placeholder="Output Type"
          sx={{ flex: 1 }}
        >
          <Option value="string">String</Option>
          <Option value="number">Number</Option>
          <Option value="boolean">Boolean</Option>
        </Select>
        <Select
          value={config.variant || null}
          onChange={(_, val) => onChange("variant", val)}
          placeholder="Variant"
          sx={{ flex: 1 }}
        >
          <Option value="DEFAULT">Default</Option>
          <Option value="ICON">Icon</Option>
        </Select>
      </Stack>
    </Stack>
  );
}

export default React.memo(RadioConfigFields);
