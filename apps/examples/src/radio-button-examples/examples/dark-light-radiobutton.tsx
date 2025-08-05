import { FormBuilder, useFormBuilder } from "formik-form-builder";
import { darkLight } from "../../constants";
import { Form, Formik } from "formik";
import { Box, Button } from "@mui/joy";

export const DarkLight = () => {
  const { initailValues, yupSchemaValidation } = useFormBuilder(darkLight);
  return (
    <Formik
      initialValues={initailValues}
      validationSchema={yupSchemaValidation}
      onSubmit={(values, actions) => {
        console.log(values), alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      {({ values }) => (
        <Form>
          <FormBuilder
            group="form"
            values={values}
            data-test="form"
            fields={darkLight}
          />
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
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
