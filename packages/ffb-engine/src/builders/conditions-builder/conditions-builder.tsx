// ConditionBuilder.tsx - updated UI behavior
import React from "react";
import {
  Box,
  Button,
  Option,
  Select,
  Stack,
  Typography,
  Divider,
  Sheet,
  IconButton,
  Tooltip,
} from "@mui/joy";
import { ConditionAction } from "formik-form-builder";
import { Plus, Zap, Info, Trash2 } from "lucide-react";
import type { ConditionBuilderProps } from "./types";
import { useConditionBuilder } from "./hooks";
import { GroupCard } from "./card";

export const ConditionBuilder = React.memo(({ onChange, value }: ConditionBuilderProps) => {
  const {
    action,
    setAction,
    groups,
    updateGroup,
    deleteGroup,
    updateLogic,
    addLogic,
    deleteLogic,
    addGroup,
    startConditions,
    clearAll,
  } = useConditionBuilder(onChange as any, value);

  const hasGroups = groups.length > 0;

  return (
    <Box sx={{ width: "100%", maxWidth: 520, mx: "auto" }}>
      {/* Header */}
      <Stack spacing={1} sx={{ mb: 3, px: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography level="title-lg" sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: 700 }}>
              <Zap size={18} color="var(--joy-palette-warning-solidBg)" />
              Logic Rules
            </Typography>
            <Typography level="body-xs" sx={{ color: "neutral.500" }}>
              Define when this field should trigger.
            </Typography>
          </Box>

          <Stack direction="row" spacing={0.5} alignItems="center">
            <Tooltip title="How it works" variant="soft">
              <IconButton size="sm" variant="plain" color="neutral">
                <Info size={16} />
              </IconButton>
            </Tooltip>

            {/* ✅ Clear all (only when rules exist) */}
            {hasGroups && (
              <Tooltip title="Remove all conditions" variant="soft">
                <IconButton size="sm" variant="plain" color="danger" onClick={clearAll}>
                  <Trash2 size={16} />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Stack>

        {/* Action row (keep visible, but disable if no groups) */}
        <Sheet
          variant="soft"
          color="primary"
          sx={{
            p: 1.5,
            borderRadius: "lg",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: (theme) =>
              `linear-gradient(to right, ${theme.vars.palette.primary.softBg}, ${theme.vars.palette.common.white})`,
            opacity: hasGroups ? 1 : 0.6,
          }}
        >
          <Typography level="title-sm" color="primary">
            Action
          </Typography>

          <Select
            size="sm"
            variant="plain"
            value={action as ConditionAction}
            onChange={(_, val) => setAction(val as ConditionAction)}
            disabled={!hasGroups} // ✅ cannot change action until conditions exist
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              textDecoration: "underline",
              "&:hover": { bgcolor: "transparent", color: "primary.solidBg" },
            }}
          >
            {Object.values(ConditionAction).map((a) => (
              <Option value={a} key={a}>
                {a}
              </Option>
            ))}
          </Select>
        </Sheet>
      </Stack>

      {/* ✅ Empty State: no conditions until user clicks add */}
      {!hasGroups ? (
        <Sheet
          variant="outlined"
          sx={{
            borderRadius: "xl",
            p: 3,
            textAlign: "center",
            borderColor: "neutral.outlinedBorder",
            bgcolor: "background.surface",
          }}
        >
          <Typography level="title-sm" sx={{ fontWeight: 700 }}>
            No conditions added
          </Typography>
          <Typography level="body-sm" sx={{ opacity: 0.7, mt: 0.5 }}>
            Click below to start building condition rules.
          </Typography>

          <Button
            variant="solid"
            color="primary"
            startDecorator={<Plus size={16} />}
            onClick={startConditions} // ✅ creates first group
            sx={{ mt: 2, borderRadius: "xl", py: 1.2 }}
            fullWidth
          >
            Add Conditions
          </Button>
        </Sheet>
      ) : (
        <>
          {/* Logic Groups */}
          <Stack spacing={2} sx={{ position: "relative" }}>
            {groups.map((group, groupIndex) => (
              <Box key={groupIndex} sx={{ position: "relative" }}>
                {groupIndex > 0 && (
                  <Divider sx={{ my: 2 }}>
                    <Typography level="body-xs" sx={{ px: 1, fontWeight: "bold", color: "neutral.400" }}>
                      OR
                    </Typography>
                  </Divider>
                )}

                <GroupCard
                  group={group}
                  groupIndex={groupIndex}
                  groupsLength={groups.length}
                  updateGroup={updateGroup}
                  deleteGroup={deleteGroup}
                  updateLogic={updateLogic}
                  addLogic={addLogic}
                  deleteLogic={deleteLogic}
                />
              </Box>
            ))}
          </Stack>

          {/* Footer Add Group Button */}
          <Button
            fullWidth
            variant="outlined"
            color="neutral"
            startDecorator={<Plus size={16} />}
            onClick={addGroup}
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: "xl",
              transition: "0.2s",
              "&:hover": {
                bgcolor: "primary.softBg",
                borderColor: "primary.outlinedBorder",
                color: "primary.plainColor",
              },
            }}
          >
            Add Condition Group
          </Button>
        </>
      )}
    </Box>
  );
});