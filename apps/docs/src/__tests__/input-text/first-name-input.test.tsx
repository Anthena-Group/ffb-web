import { Box, Button } from "@mui/joy";
import { Formik, Form } from "formik";
import {
  FormBuilder,
  InputTypes,
  useFormBuilder,
  type FieldType,
} from "formik-form-builder";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


// ---------------- Component ----------------
export const FirstName = () => {
    const firstNameField: FieldType[] = [
  {
    field: "firstName",
    type: InputTypes.TEXT,
    label: "First Name",
    validation: {
      required: true,
      message: "First Name is required",
    },
    helperText: "Please enter your first name",
    muiProps: {
      variant: "outlined",
      fullWidth: false,
      sx: { width: "300px" },
    },
    gridProps: { xs: 12 },
  },
]
const { initailValues, yupSchemaValidation } = useFormBuilder(firstNameField);
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
     {({values})=>(
      <Form>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300 }}>
          <FormBuilder fields={firstNameField} group="form" values={values}
            data-test="form" />
          <Button type="submit">Submit</Button>
        </Box>
      </Form>)}
    </Formik>
  );
}


// ---------------- Test ----------------
describe("FirstName Component", () => {
  beforeAll(() => {
    global.alert = jest.fn(); 
  });

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it("submits a valid first name", async () => {
    render(<FirstName />);

    // Type a valid first name
    const input = screen.getByLabelText(/First Name/i);
    await userEvent.type(input, "Lakshitha");

    // Click Submit
    const submitBtn = screen.getByRole("button", { name: /Submit/i });
    await userEvent.click(submitBtn);

    // Check alert was called with the correct value
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        JSON.stringify({ firstName: "Lakshitha" }, null, 2)
      );
    });
  });

  it("shows validation error if first name is empty", async () => {
    render(<FirstName />);

    const submitBtn = screen.getByRole("button", { name: /Submit/i });
    await userEvent.click(submitBtn);

    // Check if validation error message appears
    await waitFor(() => {
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });
  });
});
