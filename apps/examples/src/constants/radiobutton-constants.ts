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