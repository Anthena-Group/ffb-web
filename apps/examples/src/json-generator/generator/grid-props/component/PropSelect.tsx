import { Button, Option, Select, Stack } from "@mui/joy";
import type { GridPropKey, PropSelectProps } from "../../../types";

export default function PropSelect({
  selectedKey,
  remainingKeys,
  onChange,
  onAdd,
}: PropSelectProps) {
  return (
    <Stack direction={"row"} spacing={2}>
      <Select
        placeholder="Select Grid Prop"
        value={selectedKey}
        onChange={(_, val) => onChange(val as GridPropKey)}
      >
        {remainingKeys.map((k) => (
          <Option key={k} value={k}>
            {k}
          </Option>
        ))}
      </Select>
      <Button onClick={onAdd}>Add</Button>
    </Stack>
  );
}
