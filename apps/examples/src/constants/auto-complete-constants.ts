import { InputTypes, type FieldType } from "formik-from-builder";

export const basic: FieldType[] = [
    {
        field: "countryName",
        type: InputTypes.AUTO_COMPLETE,
        label: "Which country are you from?",
        initialValue: '',
        validation: {
            required: true,
            message: "Please enter your country."
        },
        options: [
            { label: "United States", value: "US" },
            { label: "India", value: "IN" },
            { label: "United Kingdom", value: "GB" },
            { label: "Canada", value: "CA" },
            { label: "Australia", value: "AU" },
            { label: "Germany", value: "DE" },
            { label: "France", value: "FR" },
            { label: "Japan", value: "JP" },
            { label: "China", value: "CN" },
            { label: "Brazil", value: "BR" }
        ],
        muiProps: { variant: "outlined" },
    },
];
