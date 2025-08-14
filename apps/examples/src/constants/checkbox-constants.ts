import { ConditionAction, ConditionName, InputTypes, PostCondition, type FieldType } from "formik-form-builder";

export const termsAndAgreement: FieldType[] = [
  {
    field: "termAcceptence",
    type: InputTypes.CHECKBOX,
    initialValue: [],
    validation: {
      required: true,
      minLength: 1,
      minLengthRuleMsg: "Accept terms and condition to continue",
    },
    options: [
      {
        label: "Accept terms and condition to continue",
        value: "Accepted",
      },
    ],
    muiProps: { variant: "outlined" },
  },
];

export const basicToggling: FieldType[] = [
  {
    field: "sport",
    type: InputTypes.CHECKBOX,
    initialValue: [],
    groupLabel: "Choose the sports you love:",
    validation: {
      required: true,
      minLength: 1,
      minLengthRuleMsg: "Choose atleast one sport"
    },
    options: [
      {
        label: "Football",
        value: "Football",
      },
      {
        label: "Volleyball",
        value: "Volleyball",
      },
      {
        label: "BasketBall",
        value: "BasketBall",
      },
      {
        label: "Cricket",
        value: "Cricket",
      },
    ],
    muiProps: { variant: "outlined" }
  },
];

export const conditionalCheck: FieldType[] = [
  {
    field: "isIntern",
    type: InputTypes.CHECKBOX,
    initialValue: "",
    groupLabel: "Are you a intern?",
    validation: {
      required: true,
      minLength: 1,
      minLengthRuleMsg: "required",
      maxLength: 1,
      maxLengthRuleMsg: "Please select either yes or no",
    },
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
    muiProps: { variant: "outlined", color: "primary" },
  },

  {
    field: "companyName",
    type: InputTypes.TEXT,
    label: "Please enter the name of your company",
    initialValue: "",
    conditions: {
      action: ConditionAction.SHOW,
      groups: [
        {
          group: "check",
          groupPostCondition: PostCondition.AND,
          logic: [
            {
              field: "isIntern",
              value: "yes",
              condition: ConditionName.INCLUDES,
              postCondition: PostCondition.AND,
            },
          ],
        },
      ],
    },
    muiProps: { placeholder: "Enter you company name" },
  },
];

export const checklistFields: FieldType[] = [
  {
    field: "tasks",
    type: InputTypes.CHECKBOX,
    initialValue: [],
    direction: "column",
    groupLabel: "Tasks to complete:",
    options: [
      { label: "Check email", value: "email" },
      { label: "Write code", value: "code" },
      { label: "Attend standup", value: "standup" },
      { label: "Review PRs", value: "review" },
    ],
    muiProps: { variant: "outlined" },
  },
];


export const itemOptions = [
  { label: "Item A", value: "Item A" },
  { label: "Item B", value: "Item B" },
  { label: "Item C", value: "Item C" },
  { label: "Item D", value: "Item D" },
];

export const bulkSelect: FieldType[] = [
  {
    field: "bulkSelecting",
    type: InputTypes.CHECKBOX,
    initialValue: [],
    groupLabel: "Choose items to buy:",
    options: itemOptions,
    muiProps: { variant: "outlined" },
  },
];

export const giftWrapFields: FieldType[] = [
  {
    field: "orderExtras",
    type: InputTypes.CHECKBOX,
    initialValue: [],
    groupLabel: "Select order extras",
    validation: {
        required: true,
        minLength: 1,
        minLengthRuleMsg: "required",
        maxLength: 1,
        maxLengthRuleMsg: "Please select only one",
      },
    options: [
      { label: "Include Gift Wrap", value: "gift_wrap" },
      { label: "Express Shipping", value: "express" },
    ],
    muiProps: { variant: "outlined", color: "primary" },
  },
  {
    field: "specialInstructions",
    type: InputTypes.TEXT,
    label: "Special Instructions",
    initialValue: "",
    conditions: {
      action: ConditionAction.ENABLE,
      groups: [
        {
          group: "gift",
          groupPostCondition: PostCondition.AND,
          logic: [
            {
              field: "orderExtras",
              value: "gift_wrap",
              condition: ConditionName.INCLUDES,
              postCondition: PostCondition.AND,
            },
          ],
        },
      ],
    },
    muiProps: { placeholder: "Enter any special instructions" },
  },
];