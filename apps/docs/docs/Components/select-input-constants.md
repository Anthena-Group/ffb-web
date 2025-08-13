---
id: select-input-constants
title: Select Input Constants
sidebar_position: 10
---

# Select Input Constants

The **`select-input-constants.ts`** file defines all the **select dropdown field configurations** used across the Formik Form Builder examples. These constants are passed into the `useFormBuilder` hook to generate fields dynamically with validation.

---

---

## Code Reference

```ts
import { InputTypes, type FieldType } from "formik-form-builder";

export const genderField: FieldType[] = [
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
      variant: "outlined"
  //sx: { width: "300px" },
    },
    gridProps: {  xs: 12 },
  },
]
  export const countryField: FieldType[] = [
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
    muiProps: { variant: "outlined"},
    gridProps: { xs: 12},
    
  },
]

  export const roleField: FieldType[] = [
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
    muiProps: { variant: "outlined" },
    gridProps: {xs: 12 },
  },
]
export const languageField: FieldType[] = [

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
  muiProps: { variant: "outlined" },
  gridProps: { xs: 12 },
}

];
