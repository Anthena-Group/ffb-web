import TabExampleViewer, { type exampleType } from "../layout/tab-example-viewer";
import BasicAuto from "./examples/basic-auto-complete";



const examples: Record<string, exampleType> = {
basic: {
    label: "Basic Auto",
    component: <BasicAuto />,
  },
};

const AutoCompleteExamples = () => <TabExampleViewer examples={examples} />;

export default AutoCompleteExamples;
