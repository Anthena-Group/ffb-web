// import { render, screen, fireEvent } from "@testing-library/react";
// import LiveCodeBlock from "../components/live-demo";
// import { FormikRenderer } from "formik-form-builder";

// // Dummy code for testing
// const sampleCode = `
// function TestComponent() {
//   return <div>Live Preview Works!</div>;
// }
// export default TestComponent;
// `;

// describe("LiveCodeBlock", () => {
//   it("renders LivePreview with defaultScope", async () => {
//     render(<LiveCodeBlock code={sampleCode} componentName="TestComponent" />);
//     expect(await screen.findByText(/Live Preview Works!/i)).toBeInTheDocument();
//   });

//   it("injects extra scope correctly", async () => {
//     const codeWithScope = `
//       function ScopeComponent() {
//         return <div>{FormikRenderer ? "Scope works!" : "No scope"}</div>;
//       }
//       export default ScopeComponent;
//     `;
//     render(
//       <LiveCodeBlock
//         code={codeWithScope}
//         componentName="ScopeComponent"
//         scope={{ FormikRenderer }}
//       />
//     );
//     expect(await screen.findByText(/Scope works!/i)).toBeInTheDocument();
//   });

//   it("shows LiveEditor and copy button works", async () => {
//     render(<LiveCodeBlock code={sampleCode} componentName="TestComponent" />);
    
//     // Editor should exist
//     expect(screen.getByText(/Code Editor/i)).toBeInTheDocument();

//     // Copy button
//     const copyBtn = screen.getByText(/Copy/i);
//     Object.assign(navigator, { clipboard: { writeText: jest.fn() } });
//     fireEvent.click(copyBtn);
//     expect(await screen.findByText(/Copied..!/i)).toBeInTheDocument();
//     expect(navigator.clipboard.writeText).toHaveBeenCalledWith(sampleCode);
//   });

//   it("expand/collapse toggles editor height", () => {
//     render(<LiveCodeBlock code={sampleCode} componentName="TestComponent" />);
//     const toggleBtn = screen.getByText(/Expand/i);
//     const editorBox = screen.getByRole("textbox").parentElement; // LiveEditor wrapper box

//     expect(editorBox?.style.maxHeight).toBe("300px");
//     fireEvent.click(toggleBtn);
//     expect(screen.getByText(/Collapse/i)).toBeInTheDocument();
//     expect(editorBox?.style.maxHeight).toBe("none");
//   });

//   it("shows LiveError for broken code", async () => {
//     const brokenCode = `function Broken() { return <div></div>`;
//     render(<LiveCodeBlock code={brokenCode} componentName="Broken" />);
//     expect(await screen.findByText(/Unexpected token/i)).toBeInTheDocument();
//   });
// });

import { render, screen, fireEvent, act } from "@testing-library/react";
import LiveCodeBlock from "../components/live-demo";
import { FormikRenderer } from "formik-form-builder";

// Dummy code for testing
const sampleCode = `
function TestComponent() {
  return <div>Live Preview Works!</div>;
}
export default TestComponent;
`;

describe("LiveCodeBlock", () => {
  it("renders LivePreview with defaultScope", async () => {
    render(<LiveCodeBlock code={sampleCode} componentName="TestComponent" />);
    expect(await screen.findByText(/Live Preview Works!/i)).toBeInTheDocument();
  });

  it("injects extra scope correctly", async () => {
    const codeWithScope = `
      function ScopeComponent() {
        return <div>{FormikRenderer ? "Scope works!" : "No scope"}</div>;
      }
      export default ScopeComponent;
    `;
    render(
      <LiveCodeBlock
        code={codeWithScope}
        componentName="ScopeComponent"
        scope={{ FormikRenderer }}
      />
    );
    expect(await screen.findByText(/Scope works!/i)).toBeInTheDocument();
  });

  it("shows LiveEditor and copy button works", async () => {
    render(<LiveCodeBlock code={sampleCode} componentName="TestComponent" />);
    
    // Editor should exist
    expect(screen.getByText(/Code Editor/i)).toBeInTheDocument();

    // Copy button
    const copyBtn = screen.getByText(/Copy/i);
    Object.assign(navigator, { clipboard: { writeText: jest.fn() } });
    fireEvent.click(copyBtn);
    expect(await screen.findByText(/Copied..!/i)).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(sampleCode);
  });

  it("expand/collapse toggles editor height", async () => {
    render(<LiveCodeBlock code={sampleCode} componentName="TestComponent" />);
    
    const toggleBtn = screen.getByText(/Expand/i);
    const editorWrapper = screen.getByTestId("live-editor-wrapper");

    const getMaxHeight = () => getComputedStyle(editorWrapper).maxHeight;

    // Initial state
    expect(getMaxHeight()).toBe("300px");

    // Expand
    await act(async () => {
      fireEvent.click(toggleBtn);
    });
    expect(screen.getByText(/Collapse/i)).toBeInTheDocument();
    expect(getMaxHeight()).toBe("none");

    // Collapse back
    await act(async () => {
      fireEvent.click(screen.getByText(/Collapse/i));
    });
    expect(getMaxHeight()).toBe("300px");
  });

  it("shows LiveError for broken code", async () => {
    const brokenCode = `function Broken() { return <div></div>`;
    render(<LiveCodeBlock code={brokenCode} componentName="Broken" />);
    expect(await screen.findByText(/Unexpected token/i)).toBeInTheDocument();
  });
});
