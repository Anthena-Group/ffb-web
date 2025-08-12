import { InputTypes, type FieldType } from "formik-form-builder";

export const FeedBack: FieldType[] = [
    {
        field: "feedBack",
        type: InputTypes.MULTI_TEXT,
        label: "Your Feedback",
        placeholder: "Write your detailed feedback here...", 
        initialValue: '',
        validation: {
            required: true,
            message: "FeedBack is required."
        },
        muiProps: { variant: "outlined", },
    },
];
