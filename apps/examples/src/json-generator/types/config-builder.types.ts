export type Action<FieldType> =
    | { type: "CHANGE"; key: keyof FieldType; value: unknown }
    | { type: "RESET"; payload: FieldType };
