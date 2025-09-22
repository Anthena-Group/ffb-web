import { useState, useCallback } from "react";
import {
  ConditionAction,
  ConditionName,
  PostCondition,
  type ConditionGroup,
  type ConditionLogic,
} from "formik-form-builder";

export function useConditionBuilder() {
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

  const updateGroup = useCallback(
    (index: number, key: keyof ConditionGroup, value: any) => {
      setGroups((prev) =>
        prev.map((g, i) => (i === index ? { ...g, [key]: value } : g))
      );
    },
    []
  );

  const deleteGroup = useCallback((index: number) => {
    setGroups((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateLogic = useCallback(
    (groupIndex: number, logicIndex: number, key: keyof ConditionLogic, value: any) => {
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
    },
    []
  );

  const addLogic = useCallback(
    (groupIndex: number) => {
      const lastLogic = groups[groupIndex].logic.at(-1)!;
      if (!lastLogic.field || !lastLogic.value) return;

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
    },
    [groups]
  );

  const deleteLogic = useCallback((groupIndex: number, logicIndex: number) => {
    setGroups((prev) =>
      prev.map((group, index) =>
        index === groupIndex
          ? { ...group, logic: group.logic.filter((_, i) => i !== logicIndex) }
          : group
      )
    );
  }, []);

  const addGroup = useCallback(() => {
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
  }, [groups]);

  return {
    action,
    setAction,
    groups,
    updateGroup,
    deleteGroup,
    updateLogic,
    addLogic,
    deleteLogic,
    addGroup,
  };
}
