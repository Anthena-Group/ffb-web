import { InputTypes, type FieldType } from "formik-form-builder";

export const fields: FieldType[] = [
  {
    field: "firstName",
    type: InputTypes.TEXT,
    label: "First Name",
    validation: {
      required: true,
      message: "First Name is required",
    },
    helperText: "Please enter your first name",
    muiProps: {
      variant: "plain",
     // fullWidth: false,
      //sx: { width: "300px" },
    },
    gridProps: { xs: 12, sm: 6  },
  },
  {
    field: "email",
    type: InputTypes.TEXT,
    label: "Email",
    validation: {
      required: true,
      message: "Email is required",
      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      patternRuleMsg: "Enter a valid email",
    },
    helperText: "Please enter a valid email address",
    muiProps: {
      variant: "plain",
      //fullWidth: false,
      //sx: { width: "300px" },
    },
    gridProps: { xs: 12, sm: 6   },
  },
  {
    field: "username",
    type: InputTypes.TEXT,
    label: "Username",
    placeholder: "Enter your username",
    validation: {
      required: true,
      message: "Username is required",
    },
    helperText: "Choose a unique username",
    muiProps: {
      variant: "plain",
      //fullWidth: false,
      //sx: { width: "300px" },
    },
    gridProps: { xs: 12, sm: 6  },
  },
  {
    field: "password",
    type: InputTypes.TEXT,
    label: "Password",
    placeholder: "Enter your password",
    validation: {
      required: true,
      message: "Password is required",
      pattern:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
      patternRuleMsg:
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
    },
    helperText: "Include uppercase, lowercase, number, and symbol",
    muiProps: {
      variant: "outlined",
      //fullWidth: false,
      //sx: { width: "300px" },
      type: "password",
    },
    gridProps: { xs: 12, sm: 6 },
  },
  {
    field: "phoneNumber",
    type: InputTypes.TEXT,
    label: "Phone Number",
    placeholder: "Enter your 10-digit phone number",
    validation: {
      required: true,
      pattern: /^[0-9]{10}$/,
      message: "Phone number must be exactly 10 digits",
    },
    helperText: "Only digits allowed, no spaces or special characters",
    muiProps: {
      variant: "plain",
      //fullWidth: false,
      //sx: { width: "300px" },
    },
    gridProps: {xs: 12, sm: 6  },
  },
  {
    field: "panNumber",
    type: InputTypes.TEXT,
    label: "PAN Number",
    placeholder: "Enter your PAN (e.g., ABCDE1234F)",
    validation: {
      required: true,
      pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      message: "Enter a valid PAN number (ABCDE1234F)",
    },
    helperText: "PAN format: 5 letters, 4 digits, 1 letter (all uppercase)",
    muiProps: {
      variant: "plain",
      //fullWidth: false,
      //sx: { width: "300px" },
    },
    gridProps: {xs: 12, sm: 6  },
  },
];
  export const selectField: FieldType[] = [
  {
    field: "gender",
    type: InputTypes.SELECT,
    label: "Gender",
    placeholder: "Select your gender",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
    validation: {
      required: true,
      message: "Please select a gender",
    },
    helperText: "Choose your gender from the dropdown",
    muiProps: {
      variant: "plain",
  //sx: { width: "300px" },
    },
    gridProps: {  xs: 12, sm: 6  },
  },
  {
    field: "country",
    type: InputTypes.SELECT,
    label: "Country",
    placeholder: "Select your country",
    options: [
      { label: "India", value: "india" },
      { label: "United States", value: "usa" },
      { label: "Germany", value: "germany" },
       { label: "Other", value: "other" },
    ],
    validation: {
      required: true,
      message: "Country is required",
    },
    helperText: "Pick your country from the list",
    muiProps: { variant: "plain" },
    gridProps: { xs: 12, sm: 6 },
  },
  {
    field: "role",
    type: InputTypes.SELECT,
    label: "User Role",
    placeholder: "Choose your role",
    options: [
      { label: "Select role", value: "", },
      { label: "Admin", value: "admin" },
      { label: "Editor", value: "editor" },
      { label: "Viewer", value: "viewer" },
       { label: "Other", value: "other" },
    ],
    validation: {
      required: true,
      message: "Role selection is required",
    },
    helperText: "Select your user role",
    muiProps: { variant: "plain" },
    gridProps: {xs: 12, sm: 6  },
  },
  {
  field: "language",
  type: InputTypes.SELECT,
  label: "Preferred Language",
  placeholder: "Select your preferred language",
  options: [
    { label: "English", value: "english" },
    { label: "Hindi", value: "hindi" },
    { label: "Spanish", value: "spanish" },
    { label: "Other", value: "other" },
  ],
  validation: {
    required: true,
    message: "Please select a language",
  },
  helperText: "Choose the language you are most comfortable with",
  muiProps: { variant: "plain" },
  gridProps: { xs: 12, sm: 6 },
}



];
