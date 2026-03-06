import React from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import {FormBuilder} from "@mjfy/form-builder";

export default function BuilderPage() {
  return (
    <Layout
      title="Live Form Builder"
      noFooter={true} // Removes footer for full-page app feel
    >
      <main style={{ height: "calc(100vh - 60px)", width: "100%" }}>
        <BrowserOnly fallback={<div>Loading Builder...</div>}>
          {() => {
            // Import here to prevent SSR "window is not defined" errors
            return <FormBuilder />;
          }}
        </BrowserOnly>
      </main>
    </Layout>
  );
}
