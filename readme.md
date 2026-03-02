# Formik Form Builder

**Formik Form Builder** is a configuration-driven form library built on **Formik**, **MUI** (Material UI or Joy UI), and **Yup**.  
It allows you to create fully functional, validated forms using just a JSON configuration—no repetitive boilerplate.

---

## Features

- **Declarative & JSON-driven**: Define fields, layout, and validations via a single JSON object.
- **Built-in validation**: Supports Yup validation rules.
- **Multiple input types**: Text, Multi-text, Checkbox, Radio, Select, AutoComplete, Dropdown, etc.
- **Conditional rendering**: Show, hide, enable, or disable fields dynamically.
- **MUI & Joy UI styling**: Fully compatible with Material UI and Joy themes.
- **Extensible**: Add custom components, validation rules, or UI tweaks.

---

## Installation

```bash
npm install formik-form-builder
# or
yarn add formik-form-builder
```

**Peer dependencies**:  
- `formik`  
- `yup`  
- `@mui/material` or `@mui/joy`  

---

## Quick Example

```tsx
import { Box, Button } from "@mui/joy";
import { Formik } from "formik";
import { FormBuilder, InputTypes, useFormBuilder } from "@mjfy/core";

function FullNameForm() {
  const fields = [
    {
      field: "name",
      type: InputTypes.TEXT,
      initialValue: "",
      label: "Full Name",
      validation: { required: true, message: "Required" },
    },
  ];

  const { initialValues, yupSchemaValidation } = useFormBuilder(fields);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={yupSchemaValidation}
      onSubmit={(values, actions) => {
        console.log(values);
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      {({ values }) => (
        <form>
          <FormBuilder group="form" values={values} fields={fields} />
          <Box mt={2} display="flex" justifyContent="center">
            <Button type="submit">Continue</Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default FullNameForm;
```

---

## Usage

- **`<FormikRenderer />`**: Quick setup for a full form, including Formik integration, validation, and submission.
- **`<FormBuilder />`**: Render form fields based on your field config.
- **`useFormBuilder`**: Generates `initialValues` and Yup schema from your field config for custom Formik setups.

---

## Field Configuration

Each field is defined by an object with:

- `field` – unique key  
- `type` – input type (`TEXT`, `CHECKBOX`, `RADIO`, etc.)  
- `initialValue` – default value  
- `label` / `groupLabel` – display labels  
- `validation` – Yup rules  
- `options` – for choice-based fields  
- `conditions` – dynamic show/hide/enable/disable rules  
- `muiProps` – additional MUI/Joy props  
- etc based on the needs

For more detail, please see the **full documentation**: [Docs](https://formik-form-builder.web.app/)

---
### Gaps

The Gap: Build a simple, visual workflow builder inside your product. When Form is Submitted → Send templated email to user → Add row to Google Sheet → Send Slack message to #sales channel. This keeps the user inside your ecosystem and solves a much larger business problem than just data collection.

---