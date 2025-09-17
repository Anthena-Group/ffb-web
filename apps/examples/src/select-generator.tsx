import { useState } from "react";

export default function SelectGenerator() {
  const [config, setConfig] = useState({
    field: "",
    type: "select",
    label: "",
    defaultValue: "",
    required: false,
    options: [] as string[],
  });

  const [optionInput, setOptionInput] = useState("");

  function updateField(key: string, value: any) {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }

  function addOption() {
    if (optionInput.trim() !== "") {
      setConfig((prev) => ({
        ...prev,
        options: [...prev.options, optionInput.trim()],
      }));
      setOptionInput("");
    }
  }

  function removeOption(index: number) {
    setConfig((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: 6,
    outline: "none",
    fontSize: 14,
    marginTop: 4,
  };

  const fieldContainerStyle: React.CSSProperties = {
    marginBottom: 15,
  };

  const optionListStyle: React.CSSProperties = {
    marginTop: 6,
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
  };

  const optionItemStyle: React.CSSProperties = {
    background: "#f0f0f0",
    padding: "4px 8px",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    gap: 4,
  };

  const buttonStyle: React.CSSProperties = {
    padding: "6px 12px",
    border: "none",
    background: "#1976d2",
    color: "white",
    borderRadius: 4,
    cursor: "pointer",
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif", maxWidth: 500 }}>
      <h2>Select Field Builder</h2>

      {/* Field name */}
      <div style={fieldContainerStyle}>
        <label>Field name</label>
        <input
          value={config.field}
          onChange={(e) => updateField("field", e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* Label */}
      <div style={fieldContainerStyle}>
        <label>Label</label>
        <input
          value={config.label}
          onChange={(e) => updateField("label", e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* Default Value */}
      <div style={fieldContainerStyle}>
        <label>Default Value</label>
        <input
          value={config.defaultValue}
          onChange={(e) => updateField("defaultValue", e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* Required */}
      <div style={fieldContainerStyle}>
        <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input
            type="checkbox"
            checked={config.required}
            onChange={(e) => updateField("required", e.target.checked)}
          />
          Required
        </label>
      </div>

      {/* Options */}
      <div style={fieldContainerStyle}>
        <label>Options</label>
        <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
          <input
            value={optionInput}
            onChange={(e) => setOptionInput(e.target.value)}
            style={{ ...inputStyle, flex: 1, marginTop: 0 }}
            placeholder="Enter option and click Add"
          />
          <button type="button" onClick={addOption} style={buttonStyle}>
            Add
          </button>
        </div>

        {/* Show current options */}
        <div style={optionListStyle}>
          {config.options.map((opt, index) => (
            <div key={index} style={optionItemStyle}>
              {opt}
              <span
                style={{ cursor: "pointer", color: "red" }}
                onClick={() => removeOption(index)}
              >
                ×
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Preview JSON */}
      <h3>Preview Config</h3>
      <pre
        style={{
          background: "#f9f9f9",
          padding: 12,
          borderRadius: 8,
          height: 200,
          overflow: "auto",
          fontSize: 14,
        }}
      >
        {JSON.stringify(config, null, 2)}
      </pre>
    </div>
  );
}
