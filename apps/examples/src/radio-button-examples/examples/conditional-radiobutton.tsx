import { FormBuilder, useFormBuilder } from "formik-form-builder";
import { conditionalRadio } from "../../constants";
import { Form, Formik } from "formik";
import { Box, Button } from "@mui/joy";

export const ConditionalRadioButton = () => {
  const { initailValues, yupSchemaValidation } =
    useFormBuilder(conditionalRadio);
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
            values={values}
            group="form"
            data-test="form"
            fields={conditionalRadio}
          />
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
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
