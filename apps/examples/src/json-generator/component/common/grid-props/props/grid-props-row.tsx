import { Stack, Typography, Input, IconButton } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import type { PropFieldProps } from "../../../../types";

export function GridPropRow({
  propKey,
  value,
  onChange,
  onDelete,
}: PropFieldProps) {
  return (
    <Stack
      key={propKey}
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="start"
    >
      <Typography flex={0.3}>{propKey}</Typography>
      <Input
        placeholder="number or 'auto'"
        value={value}
        onChange={(e) => onChange(propKey, e.target.value)}
      />
      <IconButton onClick={() => onDelete(propKey)}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}
