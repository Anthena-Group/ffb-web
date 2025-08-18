// Confirmation.test.tsx
import React from "react";
import { Box, Button } from "@mui/joy";
import { FormikRenderer, InputTypes, type FieldType } from "formik-form-builder";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ---------------- Component ----------------
export const Confirmation = () => {
  const confirmAction: FieldType[] = [
    {
      field: "confirmDelete",
      type: InputTypes.RADIO,
      initialValue:"",
      groupLabel: "This action is irreversible. Are you sure you want to delete?",
      validation: { required: true, message: "You must acknowledge." },
      options: [
        { label: "I understand that this action is irreversible.", value: "confirmed" }
      ]
    }
  ];

  return (
    <FormikRenderer
      fields={confirmAction}
      onSubmit={(values, actions) => {
        console.log(values);
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button variant="solid" type="submit">
          Continue
        </Button>
      </Box>
    </FormikRenderer>
  );
};

// ---------------- Test ----------------
describe("Confirmation Form", () => {
  beforeAll(() => {
    global.alert = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("submits when radio is selected", async () => {
    render(<Confirmation />);
    const radio = screen.getByLabelText(/I understand that this action is irreversible./i);

    await userEvent.click(radio);
    await userEvent.click(screen.getByRole("button", { name: /Continue/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        JSON.stringify({ confirmDelete: "confirmed" }, null, 2)
      );
    });
  });

  it("shows validation error if radio not selected", async () => {
    render(<Confirmation />);

    await userEvent.click(screen.getByRole("button", { name: /Continue/i }));

    await waitFor(() => {
      expect(screen.getByText(/You must acknowledge./i)).toBeInTheDocument();
    });
  });
});
