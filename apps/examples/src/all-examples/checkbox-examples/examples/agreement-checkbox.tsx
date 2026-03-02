import { Box, Button } from "@mui/joy";
import { Form, Formik } from "formik";
import {
  FormBuilder,
  useFormBuilder,
} from "@mjfy/core";
import { termsAndAgreement } from "../../../constants";



function Agreement() {
 
  const { initialValues, yupSchemaValidation } = useFormBuilder(termsAndAgreement);
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
            fields={termsAndAgreement}
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
}

export default Agreement;
