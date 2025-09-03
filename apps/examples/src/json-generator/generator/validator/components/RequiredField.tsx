import { Stack, Typography, Input, IconButton } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import type { RequiredFieldProps } from "../../../types";

export default function RequiredField({
  draftRules,
  onUpdate,
  onDelete,
}: RequiredFieldProps) {
  return (
    <Stack spacing={1} direction="row" alignItems="center">
      <Typography flex={0.4}>Required</Typography>
      <Input
        placeholder="Message"
        value={draftRules.message ?? ""}
        onChange={(e) => onUpdate("message", e.target.value)}
      />
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}
