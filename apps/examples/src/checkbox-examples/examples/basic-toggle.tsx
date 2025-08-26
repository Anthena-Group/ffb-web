import { Box, Button } from "@mui/joy";
import { FormBuilder, InputTypes, useFormBuilder, type FieldType } from "formik-form-builder";
import { basicToggling } from "../../constants";
import { Form, Formik } from "formik";
import { useState } from "react";

function BasicToggleCheckBox() {
  const [form, setForm] = useState<FieldType[]>(basicToggling);

  const adDynamicValue = ()=>{
    setForm((prev)=>[...prev,  {
    field: "isIntern",
    type: InputTypes.CHECKBOX,
    initialValue: "",
    groupLabel: "Are you a intern?",
    validation: {
      required: true,
      minLength: 1,
      minLengthRuleMsg: "required",
      maxLength: 1,
      maxLengthRuleMsg: "Please select either yes or no",
    },
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
    muiProps: { variant: "outlined", color: "primary" },
  },])
  }
  const {initailValues, yupSchemaValidation} = useFormBuilder(form)
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
                fields={form}
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
                <Button variant="solid" onClick={adDynamicValue} >
                  Add
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
  );
}

export default BasicToggleCheckBox;
