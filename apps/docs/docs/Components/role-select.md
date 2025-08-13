---
id: role-select
title: User Role
sidebar_position: 7
---

# User Role Select

The **User Role** select input allows users to pick a role (for example: *Admin*, *Editor*, *Viewer*).  
This component is implemented using **Formik**, **formik-form-builder**, and **MUI Joy** components. It renders a **dropdown select** and includes validation to ensure a role is chosen.

---

## Component Preview

```tsx
import { Box, Button } from "@mui/joy";
import { Form, Formik } from "formik";
import { FormBuilder, useFormBuilder } from "formik-form-builder";
import { roleField } from "../../constants";

const RoleInput = () => {
  const { initialValues, yupSchemaValidation } = useFormBuilder(roleField);

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
        <Form>
          <FormBuilder
            group="form"
            values={values}
            data-test="form"
            fields={roleField}
          />
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
          >
            <Button variant="solid" type="submit">
              Continue
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default RoleInput;
```

To see all select input field configurations and live usage demos, refer to:

- [select-input-constants.ts](./select-input-constants)
- [select-input-examples.tsx](./select-input-examples)




You can try the working example by running:

```bash
cd apps/docs
pnpm start