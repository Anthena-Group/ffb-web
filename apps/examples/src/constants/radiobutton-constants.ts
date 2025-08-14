import { ConditionAction, ConditionName, InputTypes, PostCondition, type FieldType } from "formik-form-builder";


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
        options: [{ label: "Dark", value: "Dark"}, { label: "Light", value: "Light" }],
        variant:"ICON"
    }
]

export const disabledRadio: FieldType[] = [
    {
        field: "accountType",
        type: InputTypes.RADIO,
        groupLabel: "Select account type",
        initialValue: "guest",
        options: [
            { label: "Guest", value: "guest" },
            { label: "Registered", value: "registered" },
        ],

    },
    {
        field: "subscription",
        type: InputTypes.RADIO,
        groupLabel: "Pick a plan",
        initialValue: "free",
        options: [
            { label: "Free", value: "free" },
            { label: "Pro", value: "pro" },
            { label: "Enterprise", value: "enterprise" },
        ],
        conditions: {
            action: ConditionAction.ENABLE,
            groups: [
                {
                    group: "radio",
                    groupPostCondition: PostCondition.AND,
                    logic: [
                        {
                            field: "accountType",
                            value: "registered",
                            condition: ConditionName.CONTAINS,
                            postCondition: PostCondition.AND,
                        },
                    ],
                },
            ],
        },
    },
];



export const conditionalRadio: FieldType[] = [
    {
        field: "planType",
        type: InputTypes.RADIO,
        groupLabel: "Choose your subscription plan:",
        initialValue: ["Basic"],
        validation: { required: true },
        options: [
            { label: "Basic", value: "Basic" },
            { label: "Pro", value: "Pro" },
            { label: "Custom", value: "Custom" }
        ]
    },
    {
        field: "planDescription",
        type: InputTypes.MULTI_TEXT,
        label: "Provide description for your plan:",
        validation: { required: true, message: "Description is required" },
        initialValue: "",
        conditions: {
            action: ConditionAction.SHOW,
            groups: [
                {
                    group: "radio",
                    groupPostCondition: PostCondition.AND,
                    logic: [
                        {
                            field: "planType",
                            value: "Custom",
                            condition: ConditionName.CONTAINS,
                            postCondition: PostCondition.AND
                        }
                    ]
                }
            ]
        },
        muiProps: { placeholder: "Description" }
    }
]

export const confirmAction: FieldType[] = [
    {
        field: "confirmDelete",
        type: InputTypes.RADIO,
        groupLabel: "This action is irreversible. Are you sure you want to delete?",
        validation: { required: true, message: "You must acknowledge." },
        options: [
            { label: "I understand that this action is irreversible.", value: "confirmed" }
        ]
    }
]

export const rate: FieldType[] = [
    {
        field: "rating",
        type: InputTypes.RADIO,
        direction: "column",
        groupLabel: "Please rate your experience",
        options: [
            { label: "Very Bad", value: 1 },
            { label: "Bad", value: 2 },
            { label: "Average", value: 3 },
            { label: "Good", value: 4 },
            { label: "Excelent", value: 5 },
        ],
    }
]