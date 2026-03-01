import { useReducer, useState, useCallback } from "react";
import type { FieldType } from "@mjfy/core";
import type { Action } from "../types";

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
        let nextInitialValue: string | number | boolean | string[] | number[] | boolean[] | undefined =
            config.initialValue;

        if (Array.isArray(config.initialValue)) {
            if (typeof config.initialValue[0] === "string") {
                nextInitialValue = initialInput.trim()
                    ? Array.from(new Set([...(config.initialValue as string[]), initialInput.trim()]))
                    : config.initialValue;
            } else if (typeof config.initialValue[0] === "number") {
                const parsed = Number(initialInput);
                if (!isNaN(parsed)) {
                    nextInitialValue = Array.from(new Set([...(config.initialValue as number[]), parsed]));
                }
            } else if (typeof config.initialValue[0] === "boolean") {
                const normalized = initialInput.trim().toLowerCase();
                if (normalized === "true" || normalized === "false") {
                    const parsed = normalized === "true";
                    nextInitialValue = Array.from(new Set([...(config.initialValue as boolean[]), parsed]));
                }
            }
        } else if (typeof config.initialValue === "string") {
            nextInitialValue = initialInput.trim();
        } else if (typeof config.initialValue === "number") {
            const parsed = Number(initialInput);
            nextInitialValue = isNaN(parsed) ? config.initialValue : parsed;
        } else if (typeof config.initialValue === "boolean") {
            const normalized = initialInput.trim().toLowerCase();
            if (normalized === "true") nextInitialValue = true;
            else if (normalized === "false") nextInitialValue = false;
        }


        const updatedConfig = { ...config, initialValue: nextInitialValue };

        setFinalConfig(updatedConfig);
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

