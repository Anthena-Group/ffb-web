import { Add, DisabledByDefault } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  IconButton,
  Select,
  Option,
  Stack,
  Typography,
} from "@mui/joy";
import { PostCondition } from "formik-form-builder";
import type { GroupCardProps } from "../../../../types";
import React from "react";
import LogicRow from "./logic-row";

function GroupCard({
  group,
  groupIndex,
  groupsLength,
  updateGroup,
  deleteGroup,
  updateLogic,
  addLogic,
  deleteLogic,
}: GroupCardProps) {
  return (
    <Box>
      {groupsLength > 1 && groupIndex > 0 && (
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Typography>Group Post Condition:</Typography>
          <Select
            placeholder="Select group post Condition"
            value={group.groupPostCondition}
            onChange={(_, val) =>
              updateGroup(
                groupIndex,
                "groupPostCondition",
                val as PostCondition
              )
            }
          >
            {Object.values(PostCondition).map((c) => (
              <Option key={c} value={c}>
                {c}
              </Option>
            ))}
          </Select>
        </Stack>
      )}

      <Card variant="outlined" sx={{ p: 1 }}>
        <Stack>
          <IconButton
            sx={{
              justifyContent: "flex-end",
              ":hover": { background: "none" },
            }}
            color="danger"
            onClick={() => deleteGroup(groupIndex)}
            disabled={groupsLength === 1}
          >
            <DisabledByDefault />
          </IconButton>

          <Typography my={1}>Logic:</Typography>
          {group.logic.map((logic, logicIndex) => (
            <LogicRow
              key={logicIndex}
              logic={logic}
              groupIndex={groupIndex}
              logicIndex={logicIndex}
              updateLogic={updateLogic}
              deleteLogic={deleteLogic}
              disableDelete={group.logic.length === 1}
            />
          ))}

          <Box display="flex" alignItems="center" justifyContent="space-evenly">
            <Button
              startDecorator={<Add />}
              onClick={() => addLogic(groupIndex)}
              variant="outlined"
            >
              Add Logic
            </Button>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
}

export default React.memo(GroupCard);
