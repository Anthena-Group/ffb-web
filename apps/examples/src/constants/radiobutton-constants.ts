import { InputTypes, type FieldType } from "formik-form-builder";

export const gender: FieldType[] = [
    {
        field: "gender",
        type: InputTypes.RADIO,
        groupLabel: "What's your gender?",
        validation: { required: true, minLength: 1 },
        options: [{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }]
    }
]

export const darkLight: FieldType[] = [
    {
        field: "darkLight",
        type: InputTypes.RADIO,
        initialValue: "Dark",
        groupLabel: "Choose a theme:",
        options: [{ label: "Dark", value: "Dark" }, { label: "Light", value: "Light" }]
    }
]

export const disabledRadio: FieldType[] = [

    {
        field: "subscription",
        type: InputTypes.RADIO,
        initialValue: "",
        groupLabel: "Pick a plan",
        validation: { required: true },
        options: [
            { label: "Free", value: "free" },
            { label: "Pro", value: "pro", },
            { label: "Enterprise", value: "enterprise" },
        ],
        muiProps: { disabled: true }
    }
]