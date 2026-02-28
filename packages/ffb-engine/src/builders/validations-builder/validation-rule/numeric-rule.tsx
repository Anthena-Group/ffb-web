import React from "react";
import { Stack, Typography, Input, IconButton, Box, Divider } from "@mui/joy";
import { Trash2, Hash, MessageSquare } from "lucide-react";
import type { NumericRuleProps } from "../types";

function NumericRule({
  label,
  value,
  message,
  onValueChange,
  onMessageChange,
  onDelete,
}: NumericRuleProps) {
  // Format camelCase label (e.g., minLength -> Min Length)
  const displayLabel = label.replace(/([A-Z])/g, ' $1').trim();

  return (
    <Stack spacing={1.5}>
      {/* Top Header Row */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ p: 0.5, borderRadius: '6px', bgcolor: 'primary.softBg', color: 'primary.solidBg', display: 'flex' }}>
            <Hash size={14} />
          </Box>
          <Typography level="title-sm" sx={{ fontSize: 'xs', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            {displayLabel}
          </Typography>
        </Stack>
        
        <IconButton 
          size="sm" 
          variant="plain" 
          color="danger" 
          onClick={onDelete}
          sx={{ '--IconButton-size': '24px', opacity: 0.6, '&:hover': { opacity: 1 } }}
        >
          <Trash2 size={14} />
        </IconButton>
      </Stack>

      {/* Inputs Configuration */}
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography level="body-xs" sx={{ minWidth: 45, fontWeight: 600, color: 'neutral.500' }}>
            Limit
          </Typography>
          <Input
            type="number"
            size="sm"
            variant="plain"
            placeholder="0"
            value={value ?? ""}
            onChange={(e) => onValueChange(Number(e.target.value))}
            sx={{ 
              flex: 1, 
              fontWeight: 'bold',
              bgcolor: 'background.level1',
              borderRadius: 'md',
              '--Input-focusedThickness': '1px'
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="flex-start" spacing={1}>
          <Typography level="body-xs" sx={{ minWidth: 45, mt: 1, fontWeight: 600, color: 'neutral.500' }}>
            Error
          </Typography>
          <Input
            size="sm"
            variant="plain"
            placeholder="Custom error message..."
            value={message ?? ""}
            startDecorator={<MessageSquare size={12} />}
            onChange={(e) => onMessageChange(e.target.value)}
            sx={{ 
              flex: 1, 
              fontSize: 'xs',
              bgcolor: 'background.level1',
              borderRadius: 'md',
              '--Input-focusedThickness': '1px'
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default React.memo(NumericRule);