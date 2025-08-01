import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import {
    FormBuilder,
  InputTypes,
  useFormBuilder,
  type FieldType,
} from "formik-form-builder";

function BasicToggleCheckBox() {
  const basicToggling: FieldType[] = [
    {
      field: "music",
      type: InputTypes.CHECKBOX,
      initialValue: [],
      groupLabel: "Do you like music?",
      validation: {
        required: true,
      },
      options: [
        {
          label: "Yes",
          value: "Yes",
        },
        {
          label: "No",
          value: "No",
        },
      ],
    },
  ];
  const { initailValues, yupSchemaValidation } = useFormBuilder(basicToggling);
  return (
    <Formik
      initialValues={initailValues}
      validationSchema={yupSchemaValidation}
      onSubmit={(values,actions)=>{
        console.log(values)
        alert(JSON.stringify(values, null, 2))
        actions.setSubmitting(false)
      }}
    >
        {({values})=>(
            <Form>
                <FormBuilder group="form" data-test="form" values={values} fields={basicToggling}/>
                <Button variant="contained" type="submit">Submit</Button>
            </Form>
        )}
    </Formik>
  );
}

export default BasicToggleCheckBox;
