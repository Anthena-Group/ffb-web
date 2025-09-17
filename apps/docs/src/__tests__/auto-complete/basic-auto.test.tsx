// BasicAuto.test.tsx
import React from "react";
import { Box, Button } from "@mui/joy";
import { FormikRenderer, InputTypes, type FieldType } from "formik-form-builder";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ---------------- Component ----------------
export function BasicAuto() {
  const basic: FieldType[] = [
    {
      field: "countryName",
      type: InputTypes.AUTO_COMPLETE,
      label: "Which country are you from?",
      initialValue: '',
      validation: {
        required: true,
        message: "Please enter your country."
      },
      options: [
        { label: "United States", value: "US" },
        { label: "India", value: "IN" },
        { label: "United Kingdom", value: "GB" },
        { label: "Canada", value: "CA" },
        { label: "Australia", value: "AU" },
        { label: "Germany", value: "DE" },
        { label: "France", value: "FR" },
        { label: "Japan", value: "JP" },
        { label: "China", value: "CN" },
        { label: "Brazil", value: "BR" }
      ],
      muiProps: { variant: "outlined" },
    },
  ];

  return (
    <FormikRenderer
      fields={basic}
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
describe("BasicAuto Form", () => {
  beforeAll(() => {
    global.alert = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should submit a random valid country from the autocomplete", async () => {
    render(<BasicAuto />);
    const input = screen.getByRole("combobox");

    // Define the available options
    const options = [
      { label: "United States", value: "US" },
      { label: "India", value: "IN" },
      { label: "United Kingdom", value: "GB" },
      { label: "Canada", value: "CA" },
      { label: "Australia", value: "AU" },
      { label: "Germany", value: "DE" },
      { label: "France", value: "FR" },
      { label: "Japan", value: "JP" },
      { label: "China", value: "CN" },
      { label: "Brazil", value: "BR" }
    ];

    // Pick a random option
    const selectedOption = options[Math.floor(Math.random() * options.length)];

    // Type the label to filter autocomplete options
    await userEvent.type(input, selectedOption.label);

    // Wait for the option to appear and click it
    const optionNode = await screen.findByText(selectedOption.label);
    await userEvent.click(optionNode);

    // Submit the form
    await userEvent.click(screen.getByRole("button", { name: /Continue/i }));

    // Assert alert contains the selected value
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        JSON.stringify({ countryName: selectedOption.value }, null, 2)
      );
    });
  });
});
