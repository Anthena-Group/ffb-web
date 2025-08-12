import { Button, FormControl, Checkbox, Box, FormLabel } from "@mui/joy";
import { Form, Formik } from "formik";
import {
  FormBuilder,
  useFormBuilder,
} from "formik-from-builder";
import { bulkSelect, itemOptions } from "../../constants";

const BulkSelection = () => {
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
            <FormControl orientation="horizontal" sx={{ mb: 2 }}>
              <Checkbox
                checked={isAllSelected}
                onChange={toggleSelectAll}
                variant="outlined"
                color="primary"
              />
              <FormLabel sx={{ ml: 1, fontWeight: 500 }}>Select All</FormLabel>
            </FormControl>

            <FormBuilder
              group="form"
              fields={bulkSelect}
              data-test="form"
              values={values}
            />

            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button variant="solid" type="submit">
                Proceed
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default BulkSelection;
