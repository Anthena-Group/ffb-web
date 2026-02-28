// PatternRule.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Stack, Typography, Input, IconButton, Box, FormHelperText } from "@mui/joy";
import { Trash2, Braces, MessageSquare, Terminal } from "lucide-react";
import type { PatternRuleProps } from "../types";

/**
 * IMPORTANT CHANGE:
 * - Supports pre-filled pattern (so when you select an existing field, the regex shows up)
 * - Keeps local string while typing (so invalid regex doesn't wipe/reset)
 * - Shows a subtle "Invalid regex" helper text when the current input is not a valid regex
 *
 * You must update PatternRuleProps to include:
 *   pattern?: RegExp | string;
 *
 * (string is allowed because your JSON output converts RegExp to source sometimes)
 */
export function PatternRule({
  pattern,
  message,
  onMessageChange,
  onPatternChange,
  onDelete,
}: PatternRuleProps & { pattern?: RegExp | string }) {
  const initialText = useMemo(() => {
    if (!pattern) return "";
    if (pattern instanceof RegExp) return pattern.source;
    return String(pattern); // allow pre-serialized pattern
  }, [pattern]);

  const [text, setText] = useState(initialText);
  const [isValid, setIsValid] = useState(true);

  // When selecting a different field (or rule changes), sync UI
  useEffect(() => {
    setText(initialText);
    setIsValid(true);
  }, [initialText]);

  return (
    <Stack spacing={1.5}>
      {/* Header Row */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              p: 0.5,
              borderRadius: "6px",
              bgcolor: "warning.softBg",
              color: "warning.solidBg",
              display: "flex",
            }}
          >
            <Braces size={14} />
          </Box>
          <Typography
            level="title-sm"
            sx={{
              fontSize: "xs",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}
          >
            Regex Pattern
          </Typography>
        </Stack>

        <IconButton
          size="sm"
          variant="plain"
          color="danger"
          onClick={onDelete}
          sx={{
            "--IconButton-size": "24px",
            opacity: 0.6,
            "&:hover": { opacity: 1 },
          }}
        >
          <Trash2 size={14} />
        </IconButton>
      </Stack>

      {/* Configuration Rows */}
      <Stack spacing={1}>
        {/* Regex Input */}
        <Stack spacing={0.5}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              level="body-xs"
              sx={{ minWidth: 45, fontWeight: 600, color: "neutral.500" }}
            >
              Match
            </Typography>

            <Input
              size="sm"
              variant="plain"
              placeholder="^[a-zA-Z0-9]+$"
              startDecorator={<Terminal size={12} />}
              value={text}
              onChange={(e) => {
                const next = e.target.value;
                setText(next);

                if (!next) {
                  // treat empty as "no pattern" (valid)
                  setIsValid(true);
                  onPatternChange(new RegExp("")); // or onPatternChange(undefined) if your types allow it
                  return;
                }

                try {
                  const re = new RegExp(next);
                  setIsValid(true);
                  onPatternChange(re);
                } catch {
                  // keep the text, but mark invalid and DON'T call onPatternChange
                  setIsValid(false);
                }
              }}
              sx={{
                flex: 1,
                fontFamily: "monospace",
                fontSize: "xs",
                bgcolor: "background.level1",
                borderRadius: "md",
                "--Input-focusedThickness": "1px",
                "& input": {
                  color: "warning.solidColor",
                },
                ...(isValid
                  ? {}
                  : {
                      outline: "1px solid",
                      outlineColor: "danger.outlinedBorder",
                      borderRadius: "md",
                    }),
              }}
            />
          </Stack>

          {!isValid && (
            <Box sx={{ pl: "54px" }}>
              <FormHelperText sx={{ color: "danger.500", fontSize: "xs" }}>
                Invalid regex pattern
              </FormHelperText>
            </Box>
          )}
        </Stack>

        {/* Message Input */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography
            level="body-xs"
            sx={{ minWidth: 45, fontWeight: 600, color: "neutral.500" }}
          >
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
              fontSize: "xs",
              bgcolor: "background.level1",
              borderRadius: "md",
              "--Input-focusedThickness": "1px",
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default React.memo(PatternRule);