import { Stack, Typography, Input, IconButton } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import type { PositiveFieldProps } from "../../../types";

export default function PositiveField({
  draftRules,
  onUpdate,
  onDelete,
}: PositiveFieldProps) {
  return (
    <Stack spacing={1} direction="row" alignItems="center">
      <Typography flex={0.4}>Must be Positive</Typography>
      <Input
        placeholder="Message"
        value={draftRules.isPositiveRuleMsg ?? ""}
        onChange={(e) => onUpdate("isPositiveRuleMsg", e.target.value)}
      />
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}
