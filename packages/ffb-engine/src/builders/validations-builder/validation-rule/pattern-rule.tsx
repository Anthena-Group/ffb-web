import React from "react";
import { Stack, Typography, Input, IconButton, Box } from "@mui/joy";
import { Trash2, Braces, MessageSquare, Terminal } from "lucide-react";
import type { PatternRuleProps } from "../types";

export function PatternRule({
  message,
  onMessageChange,
  onPatternChange,
  onDelete,
}: PatternRuleProps) {
  return (
    <Stack spacing={1.5}>
      {/* Header Row */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={1} alignItems="center">
          <Box sx={{ 
            p: 0.5, 
            borderRadius: '6px', 
            bgcolor: 'warning.softBg', 
            color: 'warning.solidBg', 
            display: 'flex' 
          }}>
            <Braces size={14} />
          </Box>
          <Typography level="title-sm" sx={{ fontSize: 'xs', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            Regex Pattern
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

      {/* Configuration Rows */}
      <Stack spacing={1}>
        {/* Regex Input */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography level="body-xs" sx={{ minWidth: 45, fontWeight: 600, color: 'neutral.500' }}>
            Match
          </Typography>
          <Input
            size="sm"
            variant="plain"
            placeholder="^[a-zA-Z0-9]+$"
            startDecorator={<Terminal size={12} />}
            onChange={(e) => {
              try {
                onPatternChange(new RegExp(e.target.value));
              } catch (err) {
                // Silently handle invalid regex while typing
              }
            }}
            sx={{ 
              flex: 1, 
              fontFamily: 'monospace', 
              fontSize: 'xs',
              bgcolor: 'background.level1',
              borderRadius: 'md',
              '--Input-focusedThickness': '1px',
              '& input': { color: 'warning.solidColor' } // Subtle color cue for regex
            }}
          />
        </Stack>

        {/* Message Input */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography level="body-xs" sx={{ minWidth: 45, fontWeight: 600, color: 'neutral.500' }}>
            Error
          </Typography>
          <Input
            size="sm"
            variant="plain"
            placeholder="Invalid format..."
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

export default React.memo(PatternRule);