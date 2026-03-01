import { useState } from "react";
import { Box, Button, Stack, Typography, Divider } from "@mui/joy";
import {
  CheckboxBuilder,
  ConditionBuilder,
  GridPropsBuilder,
  OptionBuilder,
  RadioButtonBuilder,
  ValidationBuilder,
} from "./json-generator";
import {
  AutoCompleteExamples,
  CheckboxExamples,
  MultiTextExamples,
  RadioButtonExamples,
  SelectInputExamples,
  TextInputExamples,
} from "./all-examples";
import { FormBuilder } from "@mjfy/form-builder";

const examples: Record<string, { label: string; component: React.ReactNode }> =
  {
    select: {
      label: "Select",
      component: <SelectInputExamples />,
    },
    text: {
      label: "Text",
      component: <TextInputExamples />,
    },
    checkbox: {
      label: "Checkbox",
      component: <CheckboxExamples />,
    },
    radio: {
      label: "Radio Button",
      component: <RadioButtonExamples />,
    },
    autoComplete: {
      label: "Auto Complete",
      component: <AutoCompleteExamples />,
    },
    multiText: {
      label: "MultiText",
      component: <MultiTextExamples />,
    },
    generate: {
      label: "Checkbox Generator",
      component: <CheckboxBuilder />,
    },
    validator: {
      label: "Validation Generator",
      component: (
        <ValidationBuilder onChange={(rules) => console.log(rules)} />
      ),
    },
    conditional: {
      label: "Condition Generator",
      component: <ConditionBuilder onChange={(rules) => console.log(rules)} />,
    },
    gridProps: {
      label: "Grid Props Generator",
      component: <GridPropsBuilder onChange={(rules) => console.log(rules)} />,
    },
    option: {
      label: "Option Generator",
      component: <OptionBuilder onChange={(rules) => console.log(rules)} />,
    },

    Radio: {
      label: "Radio Button Generator",
      component: <RadioButtonBuilder />,
    },
  };

const App = () => {
  const keys = Object.keys(examples);
  const [selected, setSelected] = useState(keys[0]);

  return (
    <Box sx={{ display: "flex" }}>
      {/* <Box
        sx={{
          borderRight: "1px solid #ddd",
          p: 2,
          minWidth: 200,
        }}
      >
        <Typography level="h3" sx={{ mb: 1 }} textAlign={"center"}>
          Components
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={1}>
          {keys.map((key) => (
            <Button
              key={key}
              onClick={() => setSelected(key)}
              variant={selected === key ? "solid" : "outlined"}
              color={selected === key ? "primary" : "neutral"}
            >
              {examples[key].label}
            </Button>
          ))}
        </Stack>
      </Box>

      <Box sx={{ flex: 1, p: 4 }}>{examples[selected].component}</Box> */}
      <FormBuilder />
    </Box>
  );
};

export default App;
