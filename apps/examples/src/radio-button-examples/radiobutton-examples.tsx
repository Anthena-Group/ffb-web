import { TabExampleViewer } from "../utils";
import { DarkLight, GenderRadioButton } from "./examples";
import type { exampleType } from "../utils/tab-example-viewer";

const examples: Record<string, exampleType> = {
  gender: {
    label: "Gender Radio",
    component: <GenderRadioButton />,
  },
  darkLightTheme: {
    label: "Theme",
    component: <DarkLight />,
  },
};

export const RadioButtonExamples = () => (
  <TabExampleViewer examples={examples} />
);
