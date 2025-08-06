import { Box, Button } from "@mui/joy";
import { Form, Formik } from "formik";
import { FormBuilder, useFormBuilder } from "formik-form-builder";
import { conditionalCheck } from "../../constants";

function ConditionalCheckBox() {
  const { initailValues, yupSchemaValidation } =
    useFormBuilder(conditionalCheck);
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
            fields={conditionalCheck}
            data-test="form"
            group="form"
            values={values}
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
}

export default ConditionalCheckBox;
