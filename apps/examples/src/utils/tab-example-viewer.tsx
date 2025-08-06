import { Box, Tabs, TabList, Tab, Card } from "@mui/joy";
import type React from "react";
import { useState } from "react";

export interface exampleType {
  label: string;
  component: React.ReactNode;
}

interface TabExampleViewerProps {
  examples: Record<string, exampleType>;
}

const TabExampleViewer: React.FC<TabExampleViewerProps> = ({ examples }) => {
  const keys = Object.keys(examples);
  const [selectedTab, setSelectedTab] = useState<string>(keys[0]);
  const selectedExample = examples[selectedTab];

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Tabs
        value={selectedTab}
        onChange={(_, newValue) => {
          if (typeof newValue == "string") setSelectedTab(newValue);
        }}
        sx={{ px: 2, pt: 2, mb: 4 }}
      >
        <TabList>
          {keys.map((key) => (
            <Tab disableIndicator color="primary" key={key} value={key}>
              {examples[key].label}
            </Tab>
          ))}
        </TabList>
      </Tabs>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "auto",
          p: 2,
        }}
      >
        <Card
          variant="outlined"
          sx={{
            p: 4,
            minWidth: "300px",
            maxWidth: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {selectedExample.component}
        </Card>
      </Box>
    </Box>
  );
};

export default TabExampleViewer;
