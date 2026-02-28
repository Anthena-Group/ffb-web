import React, { useEffect } from "react";
import {
  Stack,
  Typography,
  Select,
  Option,
  Box,
  Sheet,
  IconButton,
} from "@mui/joy";
import { ShieldCheck, Plus, AlertCircle, ChevronDown } from "lucide-react";
import type { ValidationBuilderProps, ValidationRuleType } from "./types";
import {
  IsPositiveRule,
  NumericRule,
  PatternRule,
  RequiredRule,
} from "./validation-rule";
import { useValidationBuilder } from "./hooks";
import type { ValidationRule } from "formik-form-builder";

export const ValidationBuilder = React.memo(
  ({ value, onChange }: ValidationBuilderProps) => {
    const {
      draftRules,
      setDraftRules, // ✅ make sure your hook exposes this (see note below)
      selectedRule,
      setSelectedRule,
      availableRules,
      addRule,
      updateRule,
      deleteRule,
    } = useValidationBuilder(onChange, value);

    const activeRuleKeys = Object.keys(draftRules).filter(
      (k) => k !== "message" && !k.endsWith("Msg"),
    ) as ValidationRuleType[];

    return (
      <Box sx={{ width: "100%" }}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2, px: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ color: "primary.solidBg", display: "flex" }}>
              <ShieldCheck size={18} />
            </Box>
            <Typography level="title-sm" sx={{ fontWeight: 700 }}>
              Validation
            </Typography>
          </Stack>

          <Typography
            level="body-xs"
            sx={{
              fontWeight: "bold",
              color:
                activeRuleKeys.length > 0
                  ? "success.plainColor"
                  : "neutral.400",
            }}
          >
            {activeRuleKeys.length} active
          </Typography>
        </Stack>

        {/* Add Rule Toolbar */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={1}>
            <Select
              placeholder="Add a constraint..."
              size="sm"
              value={selectedRule}
              indicator={<ChevronDown size={14} />}
              onChange={(_, v) => setSelectedRule(v as ValidationRuleType)}
              sx={{
                flex: 1,
                bgcolor: "background.surface",
                borderRadius: "lg",
                boxShadow: "sm",
                fontSize: "xs",
                fontWeight: 600,
              }}
            >
              {availableRules.map((rule) => (
                <Option
                  key={rule}
                  value={rule}
                  disabled={Object.prototype.hasOwnProperty.call(
                    draftRules,
                    rule,
                  )} // ✅ safer
                  sx={{ fontSize: "xs" }}
                >
                  {rule.replace(/([A-Z])/g, " $1").trim()}
                </Option>
              ))}
            </Select>

            <IconButton
              variant="solid"
              color="primary"
              onClick={addRule}
              disabled={!selectedRule}
              sx={{ borderRadius: "lg", width: 36 }}
            >
              <Plus size={18} />
            </IconButton>
          </Stack>
        </Box>

        {/* Rules */}
        <Stack spacing={1.5}>
          {activeRuleKeys.length === 0 && (
            <Sheet
              variant="outlined"
              sx={{
                py: 3,
                px: 2,
                textAlign: "center",
                borderRadius: "xl",
                bgcolor: "transparent",
                borderColor: "neutral.outlinedBorder",
              }}
            >
              <Typography
                level="body-xs"
                sx={{
                  color: "neutral.500",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <AlertCircle size={14} /> No rules applied
              </Typography>
            </Sheet>
          )}

          {/* ✅ render ONLY active rules (not message keys) */}
          {activeRuleKeys.map((key) => {
            let RuleComponent: React.ReactNode = null;

            if (key === "required") {
              RuleComponent = (
                <RequiredRule
                  key={key}
                  message={draftRules.message}
                  onChange={(val) => updateRule("message", val)}
                  onDelete={() => deleteRule("required")}
                />
              );
            } else if (key === "isPositive") {
              RuleComponent = (
                <IsPositiveRule
                  key={key}
                  message={draftRules.isPositiveRuleMsg}
                  onChange={(val) => updateRule("isPositiveRuleMsg", val)}
                  onDelete={() => deleteRule("isPositive")}
                />
              );
            } else if (key === "pattern") {
              RuleComponent = (
                <PatternRule
                  key={key}
                  pattern={draftRules.pattern as any} // ✅ pass existing regex/string so UI shows it
                  message={draftRules.patternRuleMsg}
                  onMessageChange={(val) => updateRule("patternRuleMsg", val)}
                  onPatternChange={(regex) => updateRule("pattern", regex)}
                  onDelete={() => deleteRule("pattern")}
                />
              );
            } else if (
              [
                "minLength",
                "maxLength",
                "minValue",
                "maxValue",
                "moreThan",
                "lessThan",
              ].includes(key)
            ) {
              RuleComponent = (
                <NumericRule
                  key={key}
                  label={key}
                  value={draftRules[key as keyof ValidationRule] as number}
                  message={
                    draftRules[
                      `${key}RuleMsg` as keyof ValidationRule
                    ] as string
                  }
                  onValueChange={(val) =>
                    updateRule(key as ValidationRuleType, val)
                  }
                  onMessageChange={(val) =>
                    updateRule(`${key}RuleMsg` as ValidationRuleType, val)
                  }
                  onDelete={() => deleteRule(key as ValidationRuleType)}
                />
              );
            }

            if (!RuleComponent) return null;

            return (
              <Sheet
                key={key}
                variant="outlined"
                sx={{
                  borderRadius: "xl",
                  bgcolor: "background.surface",
                  transition: "0.2s",
                  borderLeft: "4px solid",
                  borderLeftColor: "primary.softBg",
                  "&:hover": {
                    boxShadow: "md",
                    borderLeftColor: "primary.solidBg",
                  },
                }}
              >
                <Box sx={{ p: 1.5 }}>{RuleComponent}</Box>
              </Sheet>
            );
          })}
        </Stack>
      </Box>
    );
  },
);
