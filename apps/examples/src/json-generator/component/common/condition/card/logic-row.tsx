import { Cancel } from "@mui/icons-material";
import {
  Grid,
  IconButton,
  Input,
  Select,
  Option,
  Stack,
  Typography,
} from "@mui/joy";
import { ConditionName, PostCondition } from "@mjfy/core";
import { conditionNameList } from "../../../../constants";
import type { LogicRowProps } from "../../../../types";
import React from "react";

function LogicRow({
  logic,
  groupIndex,
  logicIndex,
  updateLogic,
  deleteLogic,
  disableDelete,
}: LogicRowProps) {
  return (
    <Stack
      sx={{
        border: "1px solid",
        borderColor: "neutral.outlinedBorder",
        borderRadius: "md",
        py: 2,
        px: 1,
        mb: 1,
        position: "relative",
      }}
    >
      <IconButton
        size="sm"
        onClick={() => deleteLogic(groupIndex, logicIndex)}
        disabled={disableDelete}
        sx={{ position: "absolute", top: -13, right: -13 }}
      >
        <Cancel fontSize="small" />
      </IconButton>

      <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={3}>
          <Stack>
            <Typography level="body-md" mb={0.5}>
              Reference field:
            </Typography>
            <Input
              placeholder="Enter reference field"
              value={logic.field}
              onChange={(e) =>
                updateLogic(groupIndex, logicIndex, "field", e.target.value)
              }
            />
          </Stack>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Stack>
            <Typography level="body-md" mb={0.5}>
              Condition:
            </Typography>
            <Select
              placeholder="Condition"
              value={logic.condition}
              onChange={(_, val) =>
                updateLogic(
                  groupIndex,
                  logicIndex,
                  "condition",
                  val as ConditionName
                )
              }
            >
              {conditionNameList.map((c) => (
                <Option
                  key={c.value}
                  value={c.value}
                  sx={{ fontWeight: "bold", justifyContent: "center" }}
                >
                  {c.sign}
                </Option>
              ))}
            </Select>
          </Stack>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Stack>
            <Typography level="body-md" mb={0.5}>
              Value:
            </Typography>
            <Input
              placeholder="Value"
              onChange={(e) =>
                updateLogic(groupIndex, logicIndex, "value", e.target.value)
              }
            />
          </Stack>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Stack>
            <Typography level="body-md" mb={0.5}>
              Post Condition:
            </Typography>
            <Select
              placeholder="PostCondition"
              value={logic.postCondition}
              onChange={(_, val) =>
                updateLogic(
                  groupIndex,
                  logicIndex,
                  "postCondition",
                  val as PostCondition
                )
              }
            >
              {Object.values(PostCondition).map((p) => (
                <Option key={p} value={p}>
                  {p}
                </Option>
              ))}
            </Select>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default React.memo(LogicRow);
