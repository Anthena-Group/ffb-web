import { Stack, Typography, Input, IconButton } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import type { PatternFieldProps } from "../../../types";

export default function PatternField({
  draftRules,
  onUpdate,
  onDelete,
}: PatternFieldProps) {
  return (
    <Stack spacing={1} direction="row" alignItems="center">
      <Typography flex={0.4}>Pattern</Typography>
      <Input
        placeholder="Regex"
        onChange={(e) => onUpdate("pattern", new RegExp(e.target.value))}
      />
      <Input
        placeholder="Message"
        value={draftRules.patternRuleMsg ?? ""}
        onChange={(e) => onUpdate("patternRuleMsg", e.target.value)}
      />
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}
