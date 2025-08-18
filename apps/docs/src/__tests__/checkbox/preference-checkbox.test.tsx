import { Box, Button } from "@mui/joy";
import { Formik, Form } from "formik";
import {
  FormBuilder,
  ConditionAction,
  ConditionName,
  InputTypes,
  useFormBuilder,
  PostCondition,
  type FieldType,
} from "formik-form-builder";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ---------------- Component ----------------
function PreferenceCheckBox() {
  const giftWrapFields: FieldType[] = [
    {
      field: "orderExtras",
      type: InputTypes.CHECKBOX,
      initialValue: [],
      groupLabel: "Select order extras",
      validation: {
        required: true,
        minLength: 1,
        minLengthRuleMsg: "required",
        maxLength: 1,
        maxLengthRuleMsg: "Please select only one",
      },
      options: [
        { label: "Include Gift Wrap", value: "gift_wrap" },
        { label: "Express Shipping", value: "express" },
      ],
      muiProps: { variant: "outlined", color: "primary" },
    },
    {
      field: "specialInstructions",
      type: InputTypes.MULTI_TEXT,
      label: "Special Instructions",
      initialValue: "",
      conditions: {
        action: ConditionAction.SHOW,
        groups: [
          {
            group: "gift",
            groupPostCondition: PostCondition.AND,
            logic: [
              {
                field: "orderExtras",
                value: "gift_wrap",
                condition: ConditionName.INCLUDES,
                postCondition: PostCondition.AND,
              },
            ],
          },
        ],
      },
      muiProps: { placeholder: "Enter any special instructions" },
    },
  ];

  const { initailValues, yupSchemaValidation } = useFormBuilder(giftWrapFields);

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
            fields={giftWrapFields}
            data-test="form"
            group="form"
            values={values}
          />
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button variant="solid" type="submit">
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

// ---------------- Test ----------------
describe("PreferenceCheckBox Form", () => {
  beforeAll(() => {
    global.alert = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders checkbox options and specialInstructions hidden initially", () => {
    render(<PreferenceCheckBox />);
    expect(screen.getByLabelText(/Include Gift Wrap/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Express Shipping/i)).toBeInTheDocument();

    // specialInstructions is present but hidden
    const instructionInput = screen.queryByPlaceholderText(
      /Enter any special instructions/i
    );
    expect(instructionInput).toBeNull();
  });

  it("shows specialInstructions when gift_wrap is selected", async () => {
    render(<PreferenceCheckBox />);
    const giftWrapCheckbox = screen.getByLabelText(/Include Gift Wrap/i);
    await userEvent.click(giftWrapCheckbox);

    const instructionInput = await screen.findByPlaceholderText(
      /Enter any special instructions/i
    );
    expect(instructionInput).toBeInTheDocument();
  });

  it("submits correct values when gift_wrap selected with instructions", async () => {
    render(<PreferenceCheckBox />);
    const giftWrapCheckbox = screen.getByLabelText(/Include Gift Wrap/i);
    await userEvent.click(giftWrapCheckbox);

    const instructionInput = await screen.findByPlaceholderText(
      /Enter any special instructions/i
    );
    await userEvent.type(instructionInput, "Wrap it nicely");

    await userEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        JSON.stringify(
          {
            orderExtras: ["gift_wrap"],
            specialInstructions: "Wrap it nicely",
          },
          null,
          2
        )
      );
    });
  });

  it("submits correct values when express selected", async () => {
    render(<PreferenceCheckBox />);
    const expressCheckbox = screen.getByLabelText(/Express Shipping/i);
    await userEvent.click(expressCheckbox);

    await userEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        JSON.stringify(
          {
            orderExtras: ["express"],
            specialInstructions: "",
          },
          null,
          2
        )
      );
    });
  });

});

export default PreferenceCheckBox;
