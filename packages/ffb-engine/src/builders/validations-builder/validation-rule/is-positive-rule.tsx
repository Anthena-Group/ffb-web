import { Stack, Typography, Input, IconButton, Box } from "@mui/joy";
import { Trash2, PlusCircle } from "lucide-react";
import type { PositiveRuleProps } from "../types";

export function IsPositiveRule({
  message,
  onChange,
  onDelete,
}: PositiveRuleProps) {
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Box sx={{ display: 'flex', mt: 1, color: 'success.solidBg' }}>
        <PlusCircle size={18} />
      </Box>

      <Stack spacing={0.5} sx={{ flex: 1 }}>
        <Typography level="title-sm">Positive Number</Typography>
        <Typography level="body-xs">Restricts input to numbers greater than zero.</Typography>
        
        <Input
          size="sm"
          placeholder="Error message"
          value={message ?? ""}
          onChange={(e) => onChange(e.target.value)}
          sx={{ mt: 1, borderRadius: 'md' }}
        />
      </Stack>

      <IconButton size="sm" color="neutral" variant="plain" onClick={onDelete} sx={{ mt: 0.5 }}>
        <Trash2 size={16} />
      </IconButton>
    </Stack>
  );
}