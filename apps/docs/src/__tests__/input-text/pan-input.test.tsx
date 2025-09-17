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
export const PAN = () => {
  const panField: FieldType[] = [
  {
    field: "panNumber",
    type: InputTypes.TEXT,
    label: "PAN Number",
    placeholder: "Enter your PAN (e.g., ABCDE1234F)",
    validation: {
      required: true,
      pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      message: "Enter a valid PAN number (ABCDE1234F)",
    },
    helperText: "PAN format: 5 letters, 4 digits, 1 letter (all uppercase)",
    muiProps: {
      variant: "outlined",
      fullWidth: false,
      sx: { width: "300px" },
    },
    gridProps: {xs: 12 },
  },
];
  const { initailValues: initialValues, yupSchemaValidation } = useFormBuilder(panField);

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
            fields={panField}
          />
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
          >
            <Button variant="solid" type="submit">
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

// ---------------- Test ----------------
describe("PAN Component", () => {
  beforeAll(() => {
    global.alert = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("submits a valid PAN", async () => {
    render(<PAN />);
    const input = screen.getByLabelText(/PAN Number/i);
    await userEvent.type(input, "ABCDE1234F");

    const submitBtn = screen.getByRole("button", { name: /Submit/i });
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        JSON.stringify({ panNumber: "ABCDE1234F" }, null, 2)
      );
    });
  });

  it("shows validation error if PAN is empty", async () => {
    render(<PAN />);
    const submitBtn = screen.getByRole("button", { name: /Submit/i });
    await userEvent.click(submitBtn);

    await waitFor(() => {
      // Match any required error message for the field
      expect(screen.getByText(/required/i)).toBeInTheDocument();
    });
  });

  it("shows validation error if PAN is invalid", async () => {
    render(<PAN />);
    const input = screen.getByLabelText(/PAN Number/i);
    await userEvent.type(input, "ABCDE123"); // invalid format

    const submitBtn = screen.getByRole("button", { name: /Submit/i });
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Enter a valid PAN number/i)).toBeInTheDocument();
    });
  });
});
