import { Box, Button, Typography } from "@mui/joy";
import { Formik, Form } from "formik";
import { FormBuilder, InputTypes, useFormBuilder, type FieldType } from "formik-form-builder";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ---------------- Component ----------------
const ToDoExample = () => {
  const checklistFields: FieldType[] = [
    {
      field: "tasks",
      type: InputTypes.CHECKBOX,
      initialValue: [],
      direction: "column",
      groupLabel: "Tasks to complete:",
      options: [
        { label: "Check email", value: "email" },
        { label: "Write code", value: "code" },
        { label: "Attend standup", value: "standup" },
        { label: "Review PRs", value: "review" },
      ],
      muiProps: { variant: "outlined" },
    },
  ];

  const { initailValues, yupSchemaValidation } = useFormBuilder(checklistFields);

  return (
    <Formik
      initialValues={initailValues}
      validationSchema={yupSchemaValidation}
      onSubmit={(values, actions) => {
        console.log(values);
        alert("Completed Tasks: " + JSON.stringify(values.tasks, null, 2));
        actions.setSubmitting(false);
      }}
    >
      {({ values }) => (
        <Form>
          <Typography level="h4" gutterBottom>
            Checklist Example usage
          </Typography>

          <FormBuilder
            group="form"
            fields={checklistFields}
            values={values}
            data-test="form"
          />

          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button variant="solid" type="submit">
              Completed
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

// ---------------- Tests ----------------
describe("ToDoExample Form", () => {
  beforeAll(() => {
    global.alert = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all task checkboxes correctly", () => {
    render(<ToDoExample />);
    const tasks = ["Check email", "Write code", "Attend standup", "Review PRs"];
    tasks.forEach((label) => {
      expect(screen.getByLabelText(new RegExp(label, "i"))).toBeInTheDocument();
    });
  });

  it("submits any combination of selected tasks correctly", async () => {
    render(<ToDoExample />);
    const allOptions = ["Check email", "Write code", "Attend standup", "Review PRs"];
    const selected: string[] = [];

    // select a random combination
    for (const label of allOptions) {
      if (Math.random() < 0.5) {
        const checkbox = screen.getByLabelText(new RegExp(label, "i"));
        await userEvent.click(checkbox);

        const map: Record<string, string> = {
          "Check email": "email",
          "Write code": "code",
          "Attend standup": "standup",
          "Review PRs": "review",
        };
        selected.push(map[label]);
      }
    }

    // ensure at least one selected
    if (selected.length === 0) {
      const checkbox = screen.getByLabelText(/Check email/i);
      await userEvent.click(checkbox);
      selected.push("email");
    }

    await userEvent.click(screen.getByRole("button", { name: /Completed/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        "Completed Tasks: " + JSON.stringify(selected, null, 2)
      );
    });
  });

  it("submits empty array if no task selected", async () => {
    render(<ToDoExample />);
    await userEvent.click(screen.getByRole("button", { name: /Completed/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        'Completed Tasks: ' + JSON.stringify([], null, 2)
      );
    });
  });
});

export default ToDoExample;
