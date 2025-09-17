import { useState, useRef, useEffect } from "react";
import { TextField, Checkbox, Radio, Select, MenuItem } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { MUIProps } from "./MUIProps"; // controls for mui + input props
import { fieldConfigs } from "./fieldConfigs";

// ✅ Input types 
const inputTypeDefaults: Record<string, any> = {
  text: { type: "text", label: "Text Field" },
  email: { type: "email", label: "Email" },
  password: { type: "password", label: "Password" },
  tel: { type: "tel", label: "Telephone" },
  color: { type: "color", label: "Pick a Color" },
  date: { type: "date", label: "Date" },
  time: { type: "time", label: "Time" },
};

export default function TextInputGenerator() {
  const [componentType, setComponentType] = useState("text");
  const [config, setConfig] = useState({
    field: "",
    type: "",
    label: "",
    required: false,
    requiredMessage: "",
    muiProps: {} as Record<string, any>,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Autofocus logic
  useEffect(() => {
    if (config.muiProps.autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [config.muiProps.autoFocus]);

  const updateField = (key: string, value: any) =>
    setConfig((prev) => ({ ...prev, [key]: value }));

  const toggleMuiProp = (prop: string, type: string, value?: any) => {
    setConfig((prev) => {
      const newProps = { ...prev.muiProps };
      if (type === "boolean") newProps[prop] = !newProps[prop];
      else if (type === "select" || type === "text" || type === "array")
        newProps[prop] = value ?? newProps[prop];

      // Prevent Select from keeping `color` (since it’s not supported)
      if (componentType === "select") {
        delete newProps.color;
      }

      return { ...prev, muiProps: newProps };
    });
  };

  const validateInput = (value: string) => {
    const inputProps = config.muiProps.inputProps || {};
    let error = "";

    if (componentType === "checkbox") {
      if (config.required && !config.muiProps.checked) {
        error = config.requiredMessage || "This checkbox is required";
      }
    } else {
      if (config.required && !value.trim())
        error = config.requiredMessage || "This field is required";
      if (inputProps.min && +value < inputProps.min)
        error = `Value must be at least ${inputProps.min}`;
      if (inputProps.max && +value > inputProps.max)
        error = `Value must be ≤ ${inputProps.max}`;
      if (inputProps.step && value) {
        const num = Number(value);
        if (!Number.isNaN(num) && (num - (inputProps.min ?? 0)) % inputProps.step !== 0)
          error = `Value must follow step of ${inputProps.step}`;
      }
      if (inputProps.minLength && value.length < inputProps.minLength)
        error = `Minimum length is ${inputProps.minLength}`;
      if (inputProps.maxLength && value.length > inputProps.maxLength)
        error = `Maximum length is ${inputProps.maxLength}`;
      if (inputProps.pattern && value) {
        const regex = new RegExp(inputProps.pattern);
        if (!regex.test(value)) error = "Value does not match required pattern";
      }
    }
    setErrorMessage(error);
  };

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

  // Render preview based on selected component
  const renderPreview = () => {
    const props = config.muiProps;
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
              toggleMuiProp("value", "text", e.target.value);
              validateInput(e.target.value);
            }}
            error={!!props.error || !!errorMessage}
            helperText={errorMessage || props.helperText || ""}
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
              toggleMuiProp("value", "text", e.target.value);
              validateInput(e.target.value);
            }}
            error={!!props.error || !!errorMessage}
            helperText={errorMessage || props.helperText || ""}
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
            onChange={() => toggleMuiProp("checked", "boolean")}
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
                  onChange={() => toggleMuiProp("value", "text", opt)}
                  id={props.id}
                  name={props.name}
                  color={props.color || "primary"}
                  size={props.size || "medium"}
                  disabled={props.disabled}
                  autoFocus={props.autoFocus}
                  required={config.required}
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
              id={props.id}
              name={props.name}
              value={props.value || ""}
              onChange={(e) => toggleMuiProp("value", "text", e.target.value)}
              displayEmpty
              fullWidth={props.fullWidth}
              required={config.required}
              autoFocus={props.autoFocus}
              error={!!props.error}
              variant={props.variant || "outlined"}
              size={props.size || "medium"}
              disabled={props.disabled}
              sx={{ mt: 2, minWidth: 200 }}
            >
              {(props.options || ["Option 1", "Option 2"]).map((opt: string, idx: number) => (
                <MenuItem key={idx} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
            {(props.helperText || errorMessage) && (
              <p style={{ color: props.error ? "red" : "#666", marginTop: 4, fontSize: 12 }}>
                {props.helperText || errorMessage}
              </p>
            )}
          </div>
        );
      case "autocomplete":
        return (
          <Autocomplete
            id={props.id}
            options={props.options || ["Option 1", "Option 2"]}
            value={props.value || ""}
            onChange={(_, newValue) => toggleMuiProp("value", "text", newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={config.label}
                placeholder={props.placeholder}
                variant={props.variant || "outlined"}
                size={props.size || "medium"}
                color={props.color || "primary"}
                error={!!props.error}
                helperText={props.helperText}
                required={config.required}
                fullWidth={props.fullWidth}
                autoFocus={props.autoFocus}
                disabled={props.disabled}
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
    <div
      style={{
        display: "flex",
        padding: 24,
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Left: Config controls */}
      <div style={{ flex: 1, maxHeight: "90vh", overflowY: "auto", paddingRight: 16 }}>
        <h2>Field Builder</h2>
        {/* Field Name */}
        <div style={cardStyle}>
          <label>Field name</label>
          <input value={config.field} onChange={(e) => updateField("field", e.target.value)} style={inputStyle} />
        </div>
        {/* Component Type */}
        <div style={cardStyle}>
          <label>Component Type</label>
          <select
            value={componentType}
            onChange={(e) => {
              const newType = e.target.value;
              setComponentType(newType);
              //  Reset config whenever a new component is chosen
              setConfig({
                field: "",
                type: "",
                label: "",
                required: false,
                requiredMessage: "",
                muiProps: {},
              });
              setErrorMessage("");
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
        {/* Input Type (only for text components) */}
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
        {/* Label */}
        <div style={cardStyle}>
          <label>Label</label>
          <input value={config.label} onChange={(e) => updateField("label", e.target.value)} style={inputStyle} />
        </div>
        {/* ---------- Props (MUI + Input) ---------- */}
        <MUIProps
          muiProps={config.muiProps}
          toggleMuiProp={toggleMuiProp}
          config={config}
          setConfig={setConfig}
          componentType={componentType}
        />
      </div>
      {/* Right: Live Preview & JSON */}
      <div style={{ flex: 1, paddingLeft: 16 }}>
        <h3>Live Preview</h3>
        {renderPreview()}
        <h3>Preview Config</h3>
        <pre
          style={{
            background: "#f9f9f9",
            padding: 14,
            borderRadius: 10,
            height: 400,
            overflow: "auto",
            fontSize: 14,
          }}
        >
          {JSON.stringify(config, null, 2)}
        </pre>
      </div>
    </div>
  );
}
