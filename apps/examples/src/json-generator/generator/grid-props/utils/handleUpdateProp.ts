import type { GridPropKey } from "../../../types";

export const handleUpdateProp = (
    key: GridPropKey,
    value: string,
    setDraftProps: React.Dispatch<
        React.SetStateAction<Partial<Record<GridPropKey, number | "auto" | "">>>
    >
) => {
    setDraftProps((prev) => ({
        ...prev,
        [key]: value === "auto" ? "auto" : Number(value),
    }));
}