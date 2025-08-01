import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import {
  FormBuilder,
  InputTypes,
  useFormBuilder,
  type FieldType,
} from "formik-form-builder";


const CheckboxExample = () => {
  const checkBox: FieldType[] = [

    {
      field: "Language",
      type: InputTypes.CHECKBOX,
      initialValue: [],
      groupLabel: "What programming language do you like?",
      validation: {
        required: true,
      },
      options: [
        {
          label: "Javascript",
          value: "Javascript",
        },
        {
          label: "Python",
          value: "Python",
        },
      ],
    },
    {
      field: "likeFruits",
      type: InputTypes.CHECKBOX,
      initialValue: "",
      groupLabel: "Do you love fruits?",
      validation: {
        required: true,
        minLength:1, 
        minLengthRuleMsg: "Please select either yes or no",
        maxLength:1,
        maxLengthRuleMsg: "You can select only one"
      },
      options: [
        {
          label: "Yes",
          value: "yes",
        },
        {
          label: "No",
          value: "no",
        },
      ],
    },
    {
      field: "Fruit",
      type: InputTypes.CHECKBOX,
      initialValue: [],
      direction: "row",
      validation:{
        required:true,
        minLength:1,
        minLengthRuleMsg:"Select atleast one fruit"
      },
      groupLabel: "Choose the fruit you like",
      options: [
        {
          label: "Apple",
          value: "Apple",

        },
        {
          label: "Lemon",
          value: "Lemon",
        },
        {
          label: "Strawbery",
          value: "Strawbery",
        },
        {
          label: "Buddha's Hand",
          value: "Buddha's Hand",
          description: "A citron with finger-like sections",
        },
      ],
      muiProps: {variant: "solid", color:"success", size: "sm"},
    },
    {
      field: "termAcceptence",
      type: InputTypes.CHECKBOX,
      validation:{
        minLength:1,
        minLengthRuleMsg: "Accept terms and condition to continue"
      },
      options: [
        {
          label:"Accept terms and condition to continue",
          value: "Accepted",
        },

      ],
    },
 

  ];
  const { initailValues, yupSchemaValidation } = useFormBuilder(checkBox);

  return (
    <Formik
      initialValues={initailValues}
      validationSchema={yupSchemaValidation}
      onSubmit={(values, actions) => {
        console.log(values);
        alert(JSON.stringify(values, null, 2)), actions.setSubmitting(false);
      }}
    >
      {({ values }) => (
        <Form>
          <FormBuilder
            group="form"
            fields={checkBox}
            data-test="form"
            values={values}
          />
          <Button variant="outlined" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CheckboxExample;
