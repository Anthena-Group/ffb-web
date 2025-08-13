---
id: country-select
title: Country Field
sidebar_label: Country Field
---



The **Country Field** allows the user to select their country from a predefined dropdown list. It is implemented using the **Formik Form Builder** with a `select` input type.

---

## Component Preview

```tsx
import { Box, Button } from "@mui/joy";
import { Form, Formik } from "formik";
import { FormBuilder, useFormBuilder } from "formik-form-builder";
import { countryField } from "../../constants";

const CountryInput = () => {
  const { initailValues, yupSchemaValidation } = useFormBuilder(countryField);

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
            fields={countryField}
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

export default CountryInput;
```
To see all select input field configurations and live usage demos, refer to:

- [select-input-constants.ts](./select-input-constants)
- [select-input-examples.tsx](./select-input-examples)




You can try the working example by running:

```bash
cd apps/docs
pnpm start