import { Button, FormControl, Checkbox, Box, FormLabel } from "@mui/joy";
import { Form, Formik } from "formik";
import { FormBuilder, useFormBuilder, InputTypes, type FieldType } from "formik-form-builder";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ---------------- Component ----------------
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
      groupLabel: "Choose items to buy:",
      options: itemOptions,
      muiProps: { variant: "outlined" },
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
        const isAllSelected = values.bulkSelecting?.length === itemOptions.length;
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

            <Box width="100%" display="flex" justifyContent="center" alignItems="center">
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

// ---------------- Test ----------------
describe("BulkSelection Form", () => {
  beforeAll(() => {
    global.alert = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all options and 'Select All' checkbox", () => {
    render(<BulkSelection />);
    const options = ["Item A", "Item B", "Item C", "Item D"];
    options.forEach((label) => {
      expect(screen.getByLabelText(new RegExp(label, "i"))).toBeInTheDocument();
    });
    expect(screen.getByLabelText(/Select All/i)).toBeInTheDocument();
  });

  it("selects individual items and submits correctly", async () => {
    render(<BulkSelection />);
    const items = ["Item A", "Item C"];
    const selected: string[] = [];

    for (const label of items) {
      const checkbox = screen.getByLabelText(new RegExp(label, "i"));
      await userEvent.click(checkbox);
      selected.push(label);
    }

    await userEvent.click(screen.getByRole("button", { name: /Proceed/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        JSON.stringify({ bulkSelecting: selected }, null, 2)
      );
    });
  });

  it("selects all items via 'Select All' checkbox", async () => {
    render(<BulkSelection />);
    const selectAll = screen.getByLabelText(/Select All/i);
    await userEvent.click(selectAll);

    const allValues = ["Item A", "Item B", "Item C", "Item D"];
    await userEvent.click(screen.getByRole("button", { name: /Proceed/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        JSON.stringify({ bulkSelecting: allValues }, null, 2)
      );
    });
  });

  it("deselects all items if 'Select All' toggled off", async () => {
    render(<BulkSelection />);
    const selectAll = screen.getByLabelText(/Select All/i);
    await userEvent.click(selectAll); // select all
    await userEvent.click(selectAll); // deselect all

    await userEvent.click(screen.getByRole("button", { name: /Proceed/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        JSON.stringify({ bulkSelecting: [] }, null, 2)
      );
    });
  });
});

export default BulkSelection;
