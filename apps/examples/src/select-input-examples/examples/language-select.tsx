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
