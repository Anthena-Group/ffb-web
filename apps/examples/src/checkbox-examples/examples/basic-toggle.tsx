import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import { FormBuilder, useFormBuilder } from "formik-form-builder";
import { basicToggling } from "../../constants";

function BasicToggleCheckBox() {
  const { initailValues, yupSchemaValidation } = useFormBuilder(basicToggling);
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
            data-test="form"
            values={values}
            fields={basicToggling}
          />

          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default BasicToggleCheckBox;
