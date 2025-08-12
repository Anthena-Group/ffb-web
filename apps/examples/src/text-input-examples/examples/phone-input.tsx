import { Box, Button } from "@mui/joy";
import { Form, Formik } from "formik";
import { FormBuilder, useFormBuilder } from "formik-form-builder";
import { phoneNumberField } from "../../constants";

const PhoneNumberInput = () => {
  const { initailValues: initialValues, yupSchemaValidation } = useFormBuilder(phoneNumberField);

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
            fields={phoneNumberField}
          />
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
          >
            <Button variant="solid" type="submit">
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default PhoneNumberInput;
