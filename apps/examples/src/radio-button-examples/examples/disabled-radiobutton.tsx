import { FormBuilder, useFormBuilder } from "formik-form-builder";
import { disabledRadio } from "../../constants";
import { Form, Formik } from "formik";
import { Box, Button } from "@mui/joy";

export const DisabledRadio = () => {
  const { initailValues, yupSchemaValidation } = useFormBuilder(disabledRadio);
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
            fields={disabledRadio}
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
