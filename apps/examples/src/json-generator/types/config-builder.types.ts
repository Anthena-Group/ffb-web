export type Action<T> =
    | { type: "CHANGE"; key: keyof T; value: unknown }
    | { type: "RESET"; payload: T };