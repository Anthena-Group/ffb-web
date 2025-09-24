import { useState, useRef, useEffect } from "react";
import { TextField, Checkbox, Radio, Select, MenuItem } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { fieldConfigs, inputTypeDefaults } from "./config-fields";
import { MUIProps } from "../common/mui-props/mui-props";


export default function TextInputGenerator({
  onConfigChange,
}: {
  onConfigChange?: (cfg: any) => void;
}) {
  const [componentType, setComponentType] = useState("text");
  const [config, setConfig] = useState({
    field: "",
    type: "",
    label: "",
    required: false,
    requiredMessage: "",
    muiProps: {} as Record<string, any>,
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  // autofocus
  useEffect(() => {
    if (config.muiProps.autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [config.muiProps.autoFocus]);

  // helper to send config to parent explicitly  ---
  const sendConfigToParent = () => {
    if (onConfigChange) {
      onConfigChange(config);
    }
  };

  // ---helper to update local config state ---
  const updateField = (key: string, value: any) =>
    setConfig((prev) => ({ ...prev, [key]: value }));

  const updateMuiProps = (newMuiProps: Record<string, any>) => {
    setConfig((prev) => ({ ...prev, muiProps: newMuiProps }));
  };

  // Styles
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    border: "1px solid #ccc",
    borderRadius: 8,
    outline: "none",
    fontSize: 14,
    marginTop: 4,
    boxSizing: "border-box",
  };

  const cardStyle: React.CSSProperties = {
    padding: 16,
    border: "1px solid #e0e0e0",
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  };

  // Render preview 
  const renderPreview = () => {
    const props = config.muiProps || {};
    switch (componentType) {
      case "text":
        return (
          <TextField
            inputRef={inputRef}
            label={config.label}
            type={config.type || "text"}
            value={props.value ?? ""}
            required={config.required}
            autoFocus={props.autoFocus}
            onChange={(e) => {
              updateMuiProps({ ...props, value: e.target.value });
            }}
            error={!!props.error}
            helperText={props.helperText || ""}
            {...props}
            variant={props.variant || "outlined"}
            size={props.size || "medium"}
            inputProps={props.inputProps}
            sx={{ marginTop: 2, minHeight: 56, fontSize: 16, borderRadius: 10 }}
          />
        );
      case "multiline":
        return (
          <TextField
            inputRef={inputRef}
            label={config.label}
            multiline
            rows={4}
            value={props.value ?? ""}
            required={config.required}
            autoFocus={props.autoFocus}
            onChange={(e) => {
              updateMuiProps({ ...props, value: e.target.value });
            }}
            error={!!props.error}
            helperText={props.helperText || ""}
            {...props}
            variant={props.variant || "outlined"}
            size={props.size || "medium"}
            inputProps={props.inputProps}
            sx={{ marginTop: 2, fontSize: 16 }}
          />
        );
      case "checkbox":
        return (
          <Checkbox
            checked={!!props.checked}
            onChange={() => updateMuiProps({ ...props, checked: !props.checked })}
            {...props}
          />
        );
      case "radio":
        return (
          <div>
            {(props.options || ["Option A", "Option B"]).map((opt: string, idx: number) => (
              <label key={idx} style={{ marginRight: 12 }}>
                <Radio
                  checked={props.value === opt}
                  onChange={() => updateMuiProps({ ...props, value: opt })}
                  {...props}
                />
                {opt}
              </label>
            ))}
          </div>
        );
      case "select":
        return (
          <div>
            <label>{config.label}</label>
            <Select
              value={props.value ?? ""}
              onChange={(e) => updateMuiProps({ ...props, value: (e.target as HTMLSelectElement).value })}
              displayEmpty
              {...props}
              sx={{ mt: 2, minWidth: 200 }}
            >
              {(props.options || ["Option 1", "Option 2"]).map((opt: string, idx: number) => (
                <MenuItem key={idx} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
            {(props.helperText || props.error) && (
              <p style={{ color: props.error ? "red" : "#666", marginTop: 4, fontSize: 12 }}>
                {props.helperText || ""}
              </p>
            )}
          </div>
        );
      case "autocomplete":
        return (
          <Autocomplete
            options={props.options || ["Option 1", "Option 2"]}
            value={props.value ?? ""}
            onChange={(_, newValue) => updateMuiProps({ ...props, value: newValue })}
            renderInput={(params) => (
              <TextField
                {...params}
                label={config.label}
                placeholder={props.placeholder}
                {...props}
              />
            )}
            sx={{ mt: 2, minWidth: 200 }}
          />
        );
      default:
        return <p>Select a component type to preview</p>;
    }
  };

  return (
    <div style={{ display: "flex", padding: 24, fontFamily: "Arial, sans-serif", backgroundColor: "#f5f5f5" }}>
      <div style={{ flex: 1, maxHeight: "90vh", overflowY: "auto", paddingRight: 16 }}>
        <h2>Field Builder</h2>

        <div style={cardStyle}>
          <label>Field name</label>
          <input value={config.field} onChange={(e) => updateField("field", e.target.value)} style={inputStyle} />
        </div>

        <div style={cardStyle}>
          <label>Component Type</label>
          <select
            value={componentType}
            onChange={(e) => {
              const newType = e.target.value;
              setComponentType(newType);
              setConfig({ field: "", type: "", label: "", required: false, requiredMessage: "", muiProps: {} });
            }}
            style={inputStyle}
          >
            {Object.keys(fieldConfigs).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>

        {componentType === "text" && (
          <div style={cardStyle}>
            <label>Input Type</label>
            <select
              value={config.type}
              onChange={(e) => {
                const selectedType = e.target.value;
                if (inputTypeDefaults[selectedType]) {
                  setConfig((prev) => ({
                    ...prev,
                    type: selectedType,
                    label: inputTypeDefaults[selectedType].label,
                  }));
                } else updateField("type", selectedType);
              }}
              style={inputStyle}
            >
              <option value="">-- Select Input Type --</option>
              {Object.keys(inputTypeDefaults).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
        )}

        <div style={cardStyle}>
          <label>Label</label>
          <input value={config.label} onChange={(e) => updateField("label", e.target.value)} style={inputStyle} />
        </div>

        <MUIProps muiProps={config.muiProps} setMuiProps={updateMuiProps} componentType={componentType} />
      </div>

      <div style={{ flex: 1, paddingLeft: 16 }}>
        <h3>Live Preview</h3>
        {renderPreview()}

        {/* Buttons to explicitly send / copy the config --- */}
        <div style={{ display: "flex", gap: 8, marginTop: 12, marginBottom: 12 }}>
          <button
            onClick={sendConfigToParent}
            style={{ padding: "8px 12px", borderRadius: 8, cursor: "pointer" }}
          >
            Send config
          </button>

          <button
            onClick={() => {
              try {
                navigator.clipboard?.writeText(JSON.stringify(config, null, 2));
         
              } catch {
               
              }
            }}
            style={{ padding: "8px 12px", borderRadius: 8, cursor: "pointer" }}
          >
            Copy JSON
          </button>
        </div>

        <h3>Preview Config</h3>
        <pre style={{ background: "#f9f9f9", padding: 14, borderRadius: 10, height: 400, overflow: "auto", fontSize: 14 }}>
          {JSON.stringify(config, null, 2)}
        </pre>
      </div>
    </div>
  );
}
