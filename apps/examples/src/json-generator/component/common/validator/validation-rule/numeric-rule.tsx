import { Stack, Typography, Input, IconButton } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import type { NumericRuleProps } from "../../../../types";

export function NumericRule({
  label,
  value,
  message,
  onValueChange,
  onMessageChange,
  onDelete,
}: NumericRuleProps) {
  return (
    <Stack spacing={1} direction="row" alignItems="center">
      <Typography flex={1}>{label}</Typography>
      <Input
        type="number"
        placeholder="Value"
        value={value ?? ""}
        onChange={(e) => onValueChange(Number(e.target.value))}
      />
      <Input
        placeholder={`enter ${label} rule message`}
        value={message ?? ""}
        onChange={(e) => onMessageChange(e.target.value)}
      />
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}
