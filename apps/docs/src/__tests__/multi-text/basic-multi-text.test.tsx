// BasicMultiText.test.tsx
import React from "react";
import { Box, Button } from "@mui/joy";
import { FormikRenderer, InputTypes, type FieldType } from "formik-form-builder";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ---------------- Component ----------------
export function BasicMultiText() {
  const FeedBack: FieldType[] = [
    {
      field: "feedBack",
      type: InputTypes.MULTI_TEXT,
      label: "Your Feedback",
      placeholder: "Write your detailed feedback here...",
      initialValue: '',
      muiProps: { variant: "outlined" },
    },
  ];

  return (
    <FormikRenderer
      fields={FeedBack}
      onSubmit={(values, actions) => {
        console.log(values);
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button variant="solid" type="submit">
          Continue
        </Button>
      </Box>
    </FormikRenderer>
  );
}

// ---------------- Test ----------------
describe("BasicMultiText Form", () => {
  beforeAll(() => {
    global.alert = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("submits short text feedback", async () => {
    render(<BasicMultiText />);
    const textarea = screen.getByLabelText(/Your Feedback/i);
    const text = "This is a short feedback.";

    await userEvent.type(textarea, text);
    await userEvent.click(screen.getByRole("button", { name: /Continue/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        JSON.stringify({ feedBack: text }, null, 2)
      );
    });
  });

  it("submits long text feedback without timeout", async () => {
    render(<BasicMultiText />);
    const textarea = screen.getByLabelText(/Your Feedback/i);
    const longText = "a".repeat(500); // long text

    // Set value instantly to avoid timeout
    fireEvent.change(textarea, { target: { value: longText } });

    await userEvent.click(screen.getByRole("button", { name: /Continue/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        JSON.stringify({ feedBack: longText }, null, 2)
      );
    });
  });


  it("submits empty feedback", async () => {
    render(<BasicMultiText />);
    await userEvent.click(screen.getByRole("button", { name: /Continue/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        JSON.stringify({ feedBack: "" }, null, 2)
      );
    });
  });
});
