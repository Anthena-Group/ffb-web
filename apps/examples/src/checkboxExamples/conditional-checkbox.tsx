import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import {
  ConditionAction,
  ConditionName,
  FormBuilder,
  InputTypes,
  PostCondition,
  useFormBuilder,
  type FieldType,
} from "formik-form-builder";

function ConditionalCheckBox() {
  const allfields: FieldType[] = [
    {
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
      muiProps: { variant: "solid", color: "primary" },
    },

    {
      field: "companyName",
      type: InputTypes.TEXT,
      label: "Please enter the name of your company",
      helperText:"Enter your company name",
      initialValue: "",
      validation: {
        required: true,
        message: "Required.",
      },
      conditions: {
        action: ConditionAction.SHOW,
        groups: [
          {
            group: "check",
            groupPostCondition: PostCondition.AND,
            logic: [
              {
                field: "isIntern",
                value: "yes",
                condition: ConditionName.INCLUDES,
                postCondition: PostCondition.AND,
              },
            ],
          },
        ],
      },
    },
  ];
  const { initailValues, yupSchemaValidation } = useFormBuilder(allfields);
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
            fields={allfields}
            data-test="form"
            group="form"
            values={values}
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default ConditionalCheckBox;
