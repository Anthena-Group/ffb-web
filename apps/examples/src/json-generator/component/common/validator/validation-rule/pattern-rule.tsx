import { Stack, Typography, Input, IconButton } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import type { PatternRuleProps } from "../../../../types";


export function PatternRule({
  message,
  onMessageChange,
  onPatternChange,
  onDelete,
}: PatternRuleProps) {
  return (
    <Stack spacing={1} direction="row" alignItems="center">
      <Typography flex={1}>Pattern</Typography>
      <Input
        placeholder="Regex"
        onChange={(e) => onPatternChange(new RegExp(e.target.value))}
      />
      <Input
        placeholder="Message"
        value={message ?? ""}
        onChange={(e) => onMessageChange(e.target.value)}
      />
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}
