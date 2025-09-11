import { Stack, Typography, Input, IconButton } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import type { RequiredRuleProps } from "../../../../types";

export function RequiredRule({
  message,
  onChange,
  onDelete,
}: RequiredRuleProps) {
  return (
    <Stack spacing={1} direction="row" alignItems="center">
      <Typography flex={0.4}>Required</Typography>
      <Input
        placeholder="Message"
        value={message ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}
