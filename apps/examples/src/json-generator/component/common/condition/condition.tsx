import { Add } from "@mui/icons-material";
import { Box, Button, Option, Select, Stack, Typography } from "@mui/joy";
import { ConditionAction } from "formik-form-builder";
import type { ConditionBuilderProps } from "../../../types";
import { useConditionBuilder } from "../../../hooks";
import { GroupCard } from "./card";
import React from "react";

function ConditionBuilder({ onChange }: ConditionBuilderProps) {
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
  } = useConditionBuilder(onChange);

  return (
    <Stack spacing={3} mt={2}>
      <Typography level="h4">Conditions:</Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        <Typography>Action:</Typography>
        <Select
          placeholder="Select action"
          value={action as ConditionAction}
          onChange={(_, val) => setAction(val as ConditionAction)}
        >
          {Object.values(ConditionAction).map((a) => (
            <Option value={a} key={a}>
              {a}
            </Option>
          ))}
        </Select>
      </Stack>

      {groups.map((group, groupIndex) => (
        <GroupCard
          key={groupIndex}
          group={group}
          groupIndex={groupIndex}
          groupsLength={groups.length}
          updateGroup={updateGroup}
          deleteGroup={deleteGroup}
          updateLogic={updateLogic}
          addLogic={addLogic}
          deleteLogic={deleteLogic}
        />
      ))}

      <Box display="flex" alignItems="center" justifyContent="space-evenly">
        <Button startDecorator={<Add />} onClick={addGroup}>
          Add Group
        </Button>
      </Box>
    </Stack>
  );
}

export default React.memo(ConditionBuilder);
