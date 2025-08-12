import { Box, Button } from "@mui/joy";
// import { FormikRenderer } from "formik-form-builder";
import { confirmAction } from "../../constants";
import { FormBuilder, useFormBuilder } from "formik-from-builder";
import { Form, Formik } from "formik";

export const Confirmation = () => {
  const { initailValues, yupSchemaValidation } = useFormBuilder(confirmAction);
  return (
    // <FormikRenderer
    //   fields={confirmAction}
    //   onSubmit={(values, actions) => {
    //     console.log(values);
    //     alert(JSON.stringify(values, null, 2));
    //     actions.setSubmitting(false);
    //   }}
    // >
    //   <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
    //     <Button variant="solid" type="submit">
    //       Continue
    //     </Button>
    //   </Box>
    // </FormikRenderer>
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
                fields={confirmAction}
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
