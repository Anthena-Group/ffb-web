import type { GridPropKey } from "../../../types"

export const handleDeleteProp = (
    key: GridPropKey,
    draftProps: Partial<Record<GridPropKey, number | "auto" | "">>,
    setDraftProps: React.Dispatch<
        React.SetStateAction<Partial<Record<GridPropKey, number | "auto" | "">>>
    >
) => {
    const newProps = { ...draftProps };
    delete newProps[key];
    setDraftProps(newProps);

}