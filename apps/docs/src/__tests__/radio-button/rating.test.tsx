// Rating.test.tsx
import React from "react";
import { Box, Button } from "@mui/joy";
import {
  FormikRenderer,
  InputTypes,
  type FieldType,
} from "formik-form-builder";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ---------------- Component ----------------
export const Rating = () => {
  const rate: FieldType[] = [
    {
      field: "rating",
      type: InputTypes.RADIO,
      initialValue: "",
      direction: "column",
      groupLabel: "Please rate your experience",
      options: [
        { label: "Very Bad", value: 1 },
        { label: "Bad", value: 2 },
        { label: "Average", value: 3 },
        { label: "Good", value: 4 },
        { label: "Excelent", value: 5 },
      ],
    },
  ];

  return (
    <FormikRenderer
      fields={rate}
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
describe("Rating Form", () => {
  beforeAll(() => {
    global.alert = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("submits a random rating or empty string", async () => {
    render(<Rating />);

    const options = ["Very Bad", "Bad", "Average", "Good", "Excelent"];

    // Randomly decide whether to select a rating or leave empty
    const pick = Math.random() < 0.5; // 50% chance
    let selectedValue = "";

    if (pick) {
      const randomLabel = options[Math.floor(Math.random() * options.length)];

      // Use exact match to avoid overlapping labels like "Bad" in "Very Bad"
      const radio = screen.getByLabelText(new RegExp(`^${randomLabel}$`, "i"));
      await userEvent.click(radio);

      const valueMap: Record<string, string> = {
        "Very Bad": "1",
        Bad: "2",
        Average: "3",
        Good: "4",
        Excelent: "5",
      };
      selectedValue = valueMap[randomLabel];
    }

    await userEvent.click(screen.getByRole("button", { name: /Continue/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        JSON.stringify({ rating: selectedValue }, null, 2)
      );
    });
  });
});
