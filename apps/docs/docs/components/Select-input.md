---
title: Select Input (Dropdown)
sidebar_position: 4
---

# Select Input Component

The `SelectInput` component is used to create a dropdown where users can select one option from a list.

It is built using **Formik** and supports form state management and validation.

Below are different examples showing how to use the `SelectInput` in forms.

---
## Example: Select Input Demo with Gender, Country, User Role and language

This example uses the `FormikFormBuilder` to render multiple dropdowns (select inputs) for Gender, Country, and User Role.  
Each field is validated using Yup and defined in a separate `constants.ts` file.

The form is created using:

- `Formik` – for form handling  
- `useFormBuilder()` – to generate initial values and validation schema  
- `FormBuilder` – to render the form fields based on the config

---
### Component File (`select-input-examples.tsx`)

This component uses `selectField` and renders the form with validation and submit logic.

```tsx
import { Form, Formik } from "formik";
import { FormBuilder, useFormBuilder } from "formik-form-builder";
import { selectField } from "./constants";

const SelectInputDemo = () => {
  const { initailValues, yupSchemaValidation } = useFormBuilder(selectField);

  return (
    <Formik
      initialValues={initailValues}
      validationSchema={yupSchemaValidation}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 500);
      }}
    >
      <Form>
        <FormBuilder
          fields={selectField}
          group="form"
          values={initailValues}
          data-test="form"
        />
      </Form>
    </Formik>
  );
};

export default SelectInputDemo;

```

### 📄 Constants File (`constants.ts`)

This file defines the select input fields with their labels, options, validation, helper texts, and layout.

```ts


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
    },
    gridProps: { xs: 12, sm: 6 },
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
      { label: "Select role", value: "" },
      { label: "Admin", value: "admin" },
      { label: "Editor", value: "editor" },
      { label: "Viewer", value: "viewer" },
    ],
    validation: {
      required: true,
      message: "Role selection is required",
    },
    helperText: "Select your user role",
    muiProps: { variant: "plain" },
    gridProps: { xs: 12, sm: 6 },
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
];

```




You can test this example by running the examples app:

```bash
cd apps/examples
pnpm dev

```

Here’s the output preview for the example fields:
![Select Input Form Output](/img/select-input-preview.jpg)
