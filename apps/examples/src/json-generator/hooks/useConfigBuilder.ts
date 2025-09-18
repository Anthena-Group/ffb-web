import { useState } from "react";
import type { FieldType } from "formik-form-builder";
import { cleanConfig } from "../utils";

export function useConfigBuilder<T extends FieldType>(initialConfig: T) {
    const [config, setConfig] = useState<T>(initialConfig);
    const [finalConfig, setFinalConfig] = useState<Partial<T>>({});
    const [initialInput, setInitialInput] = useState("");

    const handleChange = (key: keyof T, value: any) => {
        setConfig((prev) => ({ ...prev, [key]: value }));
    };

    const handleReset = () => {
        setConfig(initialConfig);
        setFinalConfig({});
        setInitialInput("");
    };

    const handleAddConfig = () => {
        const combinedInitialValues = initialInput.trim()
            ? Array.from(
                new Set([...(config.initialValue as any[] || []), initialInput.trim()])
            )
            : config.initialValue;

        const updatedConfig = { ...config, initialValue: combinedInitialValues };

        // clean config here
        console.log(updatedConfig)
        setFinalConfig(cleanConfig(updatedConfig, ["initialValue", "pattern"]));
    };

    return {
        config,
        setConfig,
        finalConfig,
        setFinalConfig,
        initialInput,
        setInitialInput,
        handleChange,
        handleAddConfig,
        handleReset,
    };
}

