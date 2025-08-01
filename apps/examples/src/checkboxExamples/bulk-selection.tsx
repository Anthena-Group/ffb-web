import { Button, FormControlLabel, Checkbox, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import {
  FormBuilder,
  InputTypes,
  useFormBuilder,
  type FieldType,
} from "formik-form-builder";

const BulkSelection = () => {
  const itemOptions = [
    { label: "Item A", value: "Item A" },
    { label: "Item B", value: "Item B" },
    { label: "Item C", value: "Item C" },
    { label: "Item D", value: "Item D" },
  ];

  const bulkSelect: FieldType[] = [
    {
      field: "bulkSelecting",
      type: InputTypes.CHECKBOX,
      initialValue: [],
      groupLabel: "Choose items to buy",
      options: itemOptions,
      muiProps: { variant: "solid" },
    },
  ];

  const { initailValues, yupSchemaValidation } = useFormBuilder(bulkSelect);

  const allValues = itemOptions.map((opt) => opt.value);

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
      {({ values, setFieldValue }) => {
        const isAllSelected =
          values.bulkSelecting?.length === itemOptions.length;

        const toggleSelectAll = () => {
          setFieldValue("bulkSelecting", isAllSelected ? [] : allValues);
        };

        return (
          <Form>
            <FormControlLabel
              control={
                <Checkbox checked={isAllSelected} onChange={toggleSelectAll} />
              }
              label="Select All"
            />
            <FormBuilder
              group="form"
              fields={bulkSelect}
              data-test="form"
              values={values}
            />

            <Button variant="outlined" type="submit">
              Proceed
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default BulkSelection;
