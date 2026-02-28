import { Stack, Typography, Input, IconButton, Box, Tooltip } from "@mui/joy";
import { Trash2, Asterisk } from "lucide-react";
import type { RequiredRuleProps } from "../types";

export function RequiredRule({ message, onChange, onDelete }: RequiredRuleProps) {
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Box sx={{ display: 'flex', mt: 1, color: 'danger.solidBg' }}>
        <Asterisk size={18} />
      </Box>
      
      <Stack spacing={0.5} sx={{ flex: 1 }}>
        <Typography level="title-sm">Required Field</Typography>
        <Typography level="body-xs">Ensures the user cannot leave this field empty.</Typography>
        
        <Input
          size="sm"
          placeholder="Error message (e.g. 'This field is required')"
          value={message ?? ""}
          onChange={(e) => onChange(e.target.value)}
          sx={{ mt: 1, borderRadius: 'md' }}
        />
      </Stack>

      <Tooltip title="Remove Rule" variant="soft">
        <IconButton size="sm" color="neutral" variant="plain" onClick={onDelete} sx={{ mt: 0.5 }}>
          <Trash2 size={16} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}