import { Add } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Input,
  Option,
  Select,
  Stack,
  Typography,
} from "@mui/joy";
import {
  ConditionAction,
  ConditionName,
  PostCondition,
  type ConditionGroup,
  type ConditionLogic,
} from "formik-form-builder";
import { useState } from "react";
import type { ConditionBuilderProps } from "../../types";
import { conditionNameList } from "../../constants";

export default function ConditionBuilder({ onConfirm }: ConditionBuilderProps) {
  const [action, setAction] = useState<ConditionAction | "">("");
  const [groups, setGroups] = useState<ConditionGroup[]>([
    {
      group: "group1",
      groupPostCondition: PostCondition.AND,
      logic: [
        {
          field: "",
          value: undefined,
          condition: ConditionName.EQUALS,
          postCondition: PostCondition.AND,
        },
      ],
    },
  ]);

  const updateGroup = (
    index: number,
    key: keyof ConditionGroup,
    value: any
  ) => {
    setGroups((prev) =>
      prev.map((g, i) => (i === index ? { ...g, [key]: value } : g))
    );
  };

  const deleteGroup = (index: number) => {
    setGroups((prev) => prev.filter((_, i) => i !== index));
  };

  const updateLogic = (
    groupIndex: number,
    logicIndex: number,
    key: keyof ConditionLogic,
    value: any
  ) => {
    setGroups((prev) =>
      prev.map((group, i) =>
        i === groupIndex
          ? {
              ...group,
              logic: group.logic.map((l, li) =>
                li === logicIndex ? { ...l, [key]: value } : l
              ),
            }
          : group
      )
    );
  };

  const addLogic = (groupIndex: number) => {
    const lastLogic = groups[groupIndex].logic.at(-1)!;
    if (
      !lastLogic.field ||
      !lastLogic.value ||
      !lastLogic.condition ||
      !lastLogic.postCondition
    )
      return;

    setGroups((prev) =>
      prev.map((group, index) =>
        index === groupIndex
          ? {
              ...group,
              logic: [
                ...group.logic,
                {
                  field: "",
                  value: undefined,
                  condition: ConditionName.EQUALS,
                  postCondition: PostCondition.AND,
                },
              ],
            }
          : group
      )
    );
  };

  const addGroup = () => {
    const lastGroup = groups.at(-1);
    const groupLogic = lastGroup?.logic.at(-1);
    if (!groupLogic?.field || !groupLogic.value) return;
    setGroups((prev) => [
      ...prev,
      {
        group: `group${prev.length + 1}`,
        groupPostCondition: PostCondition.AND,
        logic: [
          {
            field: "",
            value: undefined,
            condition: ConditionName.EQUALS,
            postCondition: PostCondition.AND,
          },
        ],
      },
    ]);
  };

  const deleteLogic = (groupIndex: number, logicIndex: number) => {
    setGroups((prev) =>
      prev.map((group, index) =>
        index === groupIndex
          ? { ...group, logic: group.logic.filter((_, i) => i !== logicIndex) }
          : group
      )
    );
  };

  const handleConfirm = () => {
    onConfirm({ action: action as ConditionAction, groups });
  };

  return (
    <Stack spacing={3}>
      <Typography level="h4">Conditions:</Typography>
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <Typography>Action: </Typography>
        <Select
          placeholder="Select action"
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
        <Box>
          {groups.length > 1 && groupIndex > 0 && (
            <Stack direction={"row"} spacing={2} alignItems={"center"} mb={2}>
              <Typography>Group Post Condition: </Typography>
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

          <Card key={groupIndex} variant="outlined" sx={{ p: 1 }}>
            <Stack>
              <IconButton
                sx={{
                  justifyContent: "flex-end",
                  ":hover": { background: "none" },
                }}
                color="danger"
                onClick={() => deleteGroup(groupIndex)}
                disabled={groups.length === 1}
              >
                <DisabledByDefaultIcon />
              </IconButton>

              <Typography my={1}>Logic: </Typography>
              {group.logic.map((logic, logicIndex) => (
                <Stack
                  key={logicIndex}
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
                  {/* Delete button top-right */}
                  <IconButton
                    size="sm"
                    onClick={() => deleteLogic(groupIndex, logicIndex)}
                    disabled={group.logic.length === 1}
                    sx={{ position: "absolute", top: -13, right: -13 }}
                  >
                    <CancelIcon fontSize="small" />
                  </IconButton>

                  {/* Responsive Grid */}
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
                            updateLogic(
                              groupIndex,
                              logicIndex,
                              "field",
                              e.target.value
                            )
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
                            <Option key={c.value} value={c.value}>
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
                            updateLogic(
                              groupIndex,
                              logicIndex,
                              "value",
                              e.target.value
                            )
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
              ))}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-evenly"
              >
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
      ))}

      <Box display="flex" alignItems="center" justifyContent="space-evenly">
        <Button startDecorator={<Add />} onClick={() => addGroup()}>
          Add Group
        </Button>
        <Button
          color="success"
          onClick={handleConfirm}
          disabled={action === ""}
        >
          Confirm{" "}
        </Button>
      </Box>
    </Stack>
  );
}
