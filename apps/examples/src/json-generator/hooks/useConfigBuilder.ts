import { useReducer, useState, useCallback } from "react";
import type { FieldType } from "formik-form-builder";
import { cleanConfig } from "../utils";

type Action<T> =
    | { type: "CHANGE"; key: keyof T; value: any }
    | { type: "RESET"; payload: T };

function configReducer<T extends FieldType>(state: T, action: Action<T>): T {
    switch (action.type) {
        case "CHANGE":
            if (state[action.key] === action.value) return state;
            return { ...state, [action.key]: action.value };
        case "RESET":
            return action.payload;
        default:
            return state;
    }
}

export function useConfigBuilder<T extends FieldType>(initialConfig: T) {
    const [config, dispatch] = useReducer(configReducer<T>, initialConfig);
    const [finalConfig, setFinalConfig] = useState<Partial<T>>({});
    const [initialInput, setInitialInput] = useState("");

    const handleChange = useCallback(
        (key: keyof T, value: unknown) => {
            dispatch({ type: "CHANGE", key, value });
        },
        []
    );

    const handleReset = useCallback(() => {
        dispatch({ type: "RESET", payload: initialConfig });
        setFinalConfig({});
        setInitialInput("");
    }, [initialConfig]);

    const handleAddConfig = useCallback(() => {
        let nextInitialValue: unknown = config.initialValue;

        if (Array.isArray(config.initialValue)) {
            nextInitialValue = initialInput.trim()
                ? Array.from(
                    new Set([...(config.initialValue ?? []), initialInput.trim()])
                )
                : config.initialValue;
        } else if (typeof config.initialValue === "string") {
            nextInitialValue = initialInput.trim();
        } else if (typeof config.initialValue === "number") {
            const parsed = Number(initialInput);
            nextInitialValue = isNaN(parsed) ? config.initialValue : parsed;
        }

        const updatedConfig = { ...config, initialValue: nextInitialValue };

        const cleaned = cleanConfig(updatedConfig, ["initialValue", "pattern"]);
        setFinalConfig(cleaned);
    }, [config, initialInput]);


    return {
        config,
        finalConfig,
        initialInput,
        setInitialInput,
        handleChange,
        handleAddConfig,
        handleReset,
    };
}
