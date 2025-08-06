import { useState } from "react";
import { Box, Button, Stack, Typography, Divider } from "@mui/joy";
import { CheckboxExamples } from "./checkbox-examples";
import { RadioButtonExamples } from "./radio-button-examples";
import TextInputExamples from './text-input-examples/text-input-examples';
import SelectInputExamples from './select-input-examples/select-input-examples';


const examples: Record<string, { label: string; component: React.ReactNode }> =
  {
Select: {
      label: "Select",
      component: <SelectInputExamples/>
    },
     text: {
      label: "Text",
      component: <TextInputExamples/>
    },
    checkbox: {
      label: "Checkbox",
      component: <CheckboxExamples />,
    },
    radio: {
      label: "Radio Button",
      component: <RadioButtonExamples />,
    },
  };

const App = () => {
  const keys = Object.keys(examples);
  const [selected, setSelected] = useState(keys[0]);

  return (
    <Box sx={{ display: "flex" }}>
      <Box
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

      <Box sx={{ flex: 1, p: 4 }}>{examples[selected].component}</Box>
    </Box>
  );
};

export default App;
