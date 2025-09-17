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
  export const Email = () => {
    const emailField: FieldType[] = [
  {
    field: "email",
    type: InputTypes.TEXT,
    label: "Email",
    validation: {
  required: true,
  message: "Email is required",
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  patternRuleMsg: "Enter a valid email",
},

    helperText: "Please enter a valid email address",
    muiProps: {
      variant: "outlined",
      fullWidth: false,
      sx: { width: "300px" },
    },
    gridProps: { xs: 12  },
    
  },
]

const { initailValues, yupSchemaValidation } = useFormBuilder(emailField);

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
            fields={emailField}
          />
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
          >
            <Button variant="solid" type="submit">
              Continue
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};


// ---------------- Test ----------------
describe("Email Component", () => {
  beforeAll(() => {
    global.alert = jest.fn(); 
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("submits a valid email", async () => {
    render(<Email />);
    const input = screen.getByLabelText(/Email/i);
    await userEvent.type(input, "test@example.com");

    const submitBtn = screen.getByRole("button", { name: /Continue/i });
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        JSON.stringify({ email: "test@example.com" }, null, 2)
      );
    });
  });

  it("shows validation error if email is empty", async () => {
    render(<Email />);
    const submitBtn = screen.getByRole("button", { name: /Continue/i });
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });
  });

  it("shows validation error if email is invalid", async () => {
    render(<Email />);
    const input = screen.getByLabelText(/Email/i);
    await userEvent.type(input, "invalid-email");

    const submitBtn = screen.getByRole("button", { name: /Continue/i });
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Enter a valid email/i)).toBeInTheDocument();
    });
  });
});