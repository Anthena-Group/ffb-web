import { Input, Select, Option, Box, Stack } from "@mui/joy";
import {
  CHECK_BOX_VALUE_TYPE,
  type FieldCheckboxType,
} from "formik-form-builder";
import React from "react";

interface CheckboxConfigFieldProps {
  config: FieldCheckboxType;
  initialInput: string;
  onChange: (key: keyof FieldCheckboxType, value: any) => void;
  setInitialInput: (val: string) => void;
}

function CheckboxConfigField({
  config,
  initialInput,
  onChange,
  setInitialInput,
}: CheckboxConfigFieldProps) {
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
          value={config.field}
          onChange={(e) => onChange("field", e.target.value)}
        />
        <Input
          placeholder="Group Label"
          value={config.groupLabel}
          onChange={(e) => onChange("groupLabel", e.target.value)}
        />
        <Input
          placeholder="Label"
          value={config.label}
          onChange={(e) => onChange("label", e.target.value)}
        />
        <Input
          placeholder="Helper Text"
          value={config.helperText}
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
          value={config.valueType || null}
          onChange={(_, val) => onChange("valueType", val)}
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
}

export default React.memo(CheckboxConfigField);
