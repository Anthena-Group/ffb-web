import { Box, Button } from "@mui/joy";
// import { FormikRenderer } from "formik-from-builder";

import { rate } from "../../constants";
import { FormBuilder, useFormBuilder } from "formik-from-builder";
import { Form, Formik } from "formik";

export const Rating = () => {
  const { initailValues, yupSchemaValidation } = useFormBuilder(rate);
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
                fields={rate}
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
    // <FormikRenderer
    //   fields={rate}
    //   onSubmit={(values, actions) => {
    //     console.log(values);
    //     alert(JSON.stringify(values, null, 2));
    //     actions.setSubmitting(false);
    //   }}
    // >
    //   <Box
    //     width={"100%"}
    //     display={"flex"}
    //     justifyContent={"center"}
    //     alignItems={"center"}
    //   >
    //     <Button variant="solid" type="submit">
    //       Continue
    //     </Button>
    //   </Box>
    // </FormikRenderer>
  );
};
