import { InputTypes, type FieldType } from "formik-form-builder";

export const firstNameField: FieldType[] = [
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
      variant: "outlined",
     // fullWidth: false,
      //sx: { width: "300px" },
    },
    gridProps: { xs: 12 },
  },
]
export const emailField: FieldType[] = [
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
      variant: "outlined",
      //fullWidth: false,
      //sx: { width: "300px" },
    },
    gridProps: { xs: 12  },
  },
]
export const usernameField: FieldType[] = [
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
      variant: "outlined",
      //fullWidth: false,
      //sx: { width: "300px" },
    },
    gridProps: { xs: 12 },
  },
]
export const passwordField: FieldType[] = [
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
    gridProps: { xs: 12},
  },
]
export const phoneNumberField : FieldType[] = [
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
      variant: "outlined",
      //fullWidth: false,
      //sx: { width: "300px" },
    },
    gridProps: {xs: 12  },
  },
]
export const panField: FieldType[] = [
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
      variant: "outlined",
      //fullWidth: false,
      //sx: { width: "300px" },
    },
    gridProps: {xs: 12 },
  },
];