import TabExampleViewer, { type exampleType } from "../Layout/tab-example-viewer";
import { BasicMultiText } from "./example";


const examples: Record<string, exampleType> = {
basic: {
    label: "FeedBack",
    component: < BasicMultiText/>,
  },
};

const MultiTextExamples = () => <TabExampleViewer examples={examples} />;

export default MultiTextExamples;