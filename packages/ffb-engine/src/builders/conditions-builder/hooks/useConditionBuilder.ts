// hooks.ts (useConditionBuilder) - FIXED (no infinite loop)
import { useState, useCallback, useEffect, useRef } from "react";
import {
  ConditionAction,
  ConditionName,
  PostCondition,
  type ConditionGroup,
  type ConditionLogic,
  type ConditionType,
} from "formik-form-builder";

function makeEmptyGroup(index: number): ConditionGroup {
  return {
    group: `group${index}`,
    groupPostCondition: PostCondition.AND,
    logic: [
      {
        field: "",
        value: undefined,
        condition: ConditionName.EQUALS,
        postCondition: PostCondition.AND,
      },
    ],
  };
}

export function useConditionBuilder(
  onChange: (condition: ConditionType | undefined) => void,
  value?: ConditionType,
) {
  const onChangeRef = useRef(onChange);

  // ✅ keep ref updated without retriggering the main effect
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const [action, setAction] = useState<ConditionAction>(value?.action ?? ConditionAction.SHOW);
  const [groups, setGroups] = useState<ConditionGroup[]>(value?.groups ?? []);

  // ✅ hydrate when switching selected field
  useEffect(() => {
    setAction(value?.action ?? ConditionAction.SHOW);
    setGroups(value?.groups ?? []);
  }, [value]);

  // ✅ emit changes (NO onChange in deps → no render loop)
  useEffect(() => {
    if (groups.length === 0) {
      onChangeRef.current(undefined);
      return;
    }
    onChangeRef.current({ action, groups });
  }, [action, groups]);

  const updateGroup = useCallback(
    (index: number, key: keyof ConditionGroup, value: ConditionGroup[keyof ConditionGroup]) => {
      setGroups((prev) => prev.map((g, i) => (i === index ? { ...g, [key]: value } : g)));
    },
    [],
  );

  const deleteGroup = useCallback((index: number) => {
    setGroups((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateLogic = useCallback(
    (
      groupIndex: number,
      logicIndex: number,
      key: keyof ConditionLogic,
      value: ConditionLogic[keyof ConditionLogic],
    ) => {
      setGroups((prev) =>
        prev.map((group, i) =>
          i === groupIndex
            ? {
                ...group,
                logic: group.logic.map((l, li) => (li === logicIndex ? { ...l, [key]: value } : l)),
              }
            : group,
        ),
      );
    },
    [],
  );

  const addLogic = useCallback((groupIndex: number) => {
    setGroups((prev) => {
      const group = prev[groupIndex];
      if (!group) return prev;

      const lastLogic = group.logic.at(-1);
      if (!lastLogic?.field || lastLogic.value === undefined || lastLogic.value === null || lastLogic.value === "") {
        return prev;
      }

      const next = [...prev];
      next[groupIndex] = {
        ...group,
        logic: [
          ...group.logic,
          { field: "", value: undefined, condition: ConditionName.EQUALS, postCondition: PostCondition.AND },
        ],
      };
      return next;
    });
  }, []);

  const deleteLogic = useCallback((groupIndex: number, logicIndex: number) => {
    setGroups((prev) =>
      prev.map((group, index) =>
        index === groupIndex ? { ...group, logic: group.logic.filter((_, i) => i !== logicIndex) } : group,
      ),
    );
  }, []);

  const addGroup = useCallback(() => {
    setGroups((prev) => {
      if (prev.length === 0) return [makeEmptyGroup(1)];

      const lastGroup = prev.at(-1);
      const lastLogic = lastGroup?.logic.at(-1);

      if (!lastLogic?.field || lastLogic.value === undefined || lastLogic.value === null || lastLogic.value === "") {
        return prev;
      }

      return [...prev, makeEmptyGroup(prev.length + 1)];
    });
  }, []);

  const startConditions = useCallback(() => {
    setGroups((prev) => (prev.length === 0 ? [makeEmptyGroup(1)] : prev));
  }, []);

  const clearAll = useCallback(() => {
    setGroups([]);
  }, []);

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
    startConditions,
    clearAll,
  };
}