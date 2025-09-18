import { Box, Button } from "@mui/joy";
import { Form, Formik } from "formik";
import {
  FormBuilder,
  InputTypes,
  useFormBuilder,
  type FieldType,
} from "formik-form-builder";


// Yet to be done 

function RadioButtonBuilder() {
  const generic: FieldType[] = [
    {
      field: "field",
      type: InputTypes.TEXT,
      initialValue: "",
      label: "Enter field name: ",
      placeholder: "FieldName",
      validation: { required: true, message: "Field name is required." },
    },
    {
      field: "groupLabel",
      type: InputTypes.TEXT,
      initialValue: "",
      placeholder: "Group Label",
      label: "Enter Group label name: ",
    },
    {
      field: "helperText",
      type: InputTypes.TEXT,
      initialValue: "",
      placeholder: "Helper Text",
      label: "Enter helperText: ",
    },
    {
      field: "direction",
      type: InputTypes.SELECT,
      initialValue: "",
      label: "Choose direction: ",
      options: [
        { label: "Row", value: "row" },
        { label: "Column", value: "column" },
      ],
      muiProps: { placeholder: "Select Direction" },
    },
    {
      field: "variant",
      type: InputTypes.SELECT,
      initialValue: "",
      label: "Choose variant: ",
      options: [
        { label: "Default", value: "DEFAULT" },
        { label: "Icon", value: "ICON" },
      ],
      muiProps: { placeholder: "Select variant" },
    },
    {
      field: "outputType",
      type: InputTypes.SELECT,
      initialValue: "",
      label: "Choose output type: ",
      options: [
        { label: "String", value: "string" },
        { label: "Number", value: "number" },
        { label: "Boolean", value: "boolean" },
      ],
      muiProps: { placeholder: "Select output type" },
    },
  ];

  const { initialValues, yupSchemaValidation } = useFormBuilder(generic);
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
            fields={generic}
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

export default RadioButtonBuilder;
