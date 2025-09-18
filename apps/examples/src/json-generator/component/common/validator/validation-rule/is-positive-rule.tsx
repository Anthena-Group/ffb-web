import { Stack, Typography, Input, IconButton } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import type { PositiveRuleProps } from "../../../../types";


export function IsPositiveRule({
  message,
  onChange,
  onDelete,
}: PositiveRuleProps) {
  return (
    <Stack spacing={1} direction="row" alignItems="center">
      <Typography flex={0.4}>Positive</Typography>
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
