import { IconButton, Input, Stack, Typography } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import type { PropFieldProps } from "../../../types";

export default function PropField({
  propKey,
  value,
  onUpdate,
  onDelete,
}: PropFieldProps) {
  return (
    <Stack
      direction="row"
      justifyContent="start"
      spacing={2}
      alignItems={"center"}
    >
      <Typography flex={0.3}>{propKey}</Typography>
      <Input
        placeholder="number or 'auto'"
        value={value}
        onChange={(e) => onUpdate(propKey, e.target.value)}
      />
      <IconButton onClick={() => onDelete(propKey)}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}
