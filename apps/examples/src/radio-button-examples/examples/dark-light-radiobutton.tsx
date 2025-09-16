import {
  FormBuilder,
  InputTypes,
  useFormBuilder,
  type FieldType,
} from "formik-form-builder";
// import { darkLight } from "../../constants";
import { Form, Formik } from "formik";
import { Box, Button } from "@mui/joy";
import { DarkMode, LightMode } from "@mui/icons-material";

export const DarkLight = () => {
  const darkLight: FieldType[] = [
    {
      field: "darkLight",
      type: InputTypes.RADIO,
      initialValue: "Dark",
      groupLabel: "Choose a theme:",
      options: [
        { label: "Dark", value: "Dark", icon: <DarkMode /> },
        { label: "Light", value: "Light", icon: <LightMode /> },
      ],
      variant: "ICON",
    },
  ];
  const { initialValues, yupSchemaValidation } = useFormBuilder(darkLight);
  return (
    <Formik
      initialValues={initialValues}
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
