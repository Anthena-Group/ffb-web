import type { GridPropKey } from "../../../types";

export const handleAddProp = (
    selectedKey: GridPropKey | "",
    draftProps: Partial<Record<GridPropKey, number | "auto" | "">>,
    setDraftProps: React.Dispatch<React.SetStateAction<Partial<Record<GridPropKey, number | "auto" | "">>>>,
    setSelectedKey: (val: GridPropKey | "") => void
) => {
    if (!selectedKey || draftProps[selectedKey]) return;
    setDraftProps((prev) => ({ ...prev, [selectedKey]: "" }))
    setSelectedKey("")
}