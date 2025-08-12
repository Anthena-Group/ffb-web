import { Box, Button } from "@mui/joy";
import { Form, Formik } from "formik";
import { FormBuilder, useFormBuilder } from "formik-from-builder";
import { gender } from "../../constants";

export const GenderRadioButton = () => {
  const { initailValues, yupSchemaValidation } = useFormBuilder(gender);
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
            data-test="form"
            values={values}
            fields={gender}
            group="form"
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
