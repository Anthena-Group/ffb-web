---
id: gender-select
title: Gender
sidebar_position: 6
---

# Gender Field

The **Gender Input** component demonstrates how to create a gender selection field using **Formik**, **formik-form-builder**, and **MUI Joy** components. It uses a **dropdown select field** for choosing gender and includes validation logic using **Yup**.

---

## Component Preview

```tsx
import { Box, Button } from "@mui/joy";
import { Form, Formik } from "formik";
import { FormBuilder, useFormBuilder } from "formik-form-builder";
import { genderField } from "../../constants";

const GenderInput = () => {
  const { initailValues, yupSchemaValidation } = useFormBuilder(genderField);

  return (
    <Formik
      initialValues={initailValues}
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
            fields={genderField}
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

export default GenderInput;
```

To see all select input field configurations and live usage demos, refer to:

- [select-input-constants.ts](./select-input-constants)
- [select-input-examples.tsx](./select-input-examples)



You can try the working example by running:

```bash
cd apps/docs
pnpm start

