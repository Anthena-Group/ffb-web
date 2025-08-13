---
id: language-select
title: Language Field
sidebar_label: Language Field
---

## Overview
The **Language Field** allows users to select their preferred language from a predefined list of options. This is useful for personalizing the application interface and content.

---
## Component Preview
```tsx
import { Box, Button } from "@mui/joy";
import { Form, Formik } from "formik";
import { FormBuilder, useFormBuilder } from "formik-form-builder";
import { languageField } from "../../constants";

const LanguageInput = () => {
  const { initailValues, yupSchemaValidation } = useFormBuilder(languageField);

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
            fields={languageField}
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

export default LanguageInput;

```

To see all select input field configurations and live usage demos, refer to:

- [select-input-constants.ts](./select-input-constants)
- [select-input-examples.tsx](./select-input-examples)



You can try the working example by running:

```bash
cd apps/docs
pnpm start