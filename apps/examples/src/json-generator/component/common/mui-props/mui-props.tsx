import React from "react";
import Switch from "@mui/joy/Switch";
import type { MUIPropsComponentProps } from "../../../types/mui-props.types";
const COMMON_BOOLEAN_PROPS = ["disabled", "error", "fullWidth", "autoFocus"];
const CHECKBOX_BOOLEAN_PROPS = ["required", "disabled"];
const RADIO_BOOLEAN_PROPS = ["required", "disabled", "autoFocus"];
const MULTILINE_INPUT_PROPS = ["readOnly", "minLength", "maxLength", "pattern"];
const DEFAULT_INPUT_PROPS = ["readOnly", "min", "max", "step", "minLength", "maxLength", "pattern"];

export const sizeOptions = ["small", "medium"];
export const variantOptions = ["outlined", "filled", "standard"];
export const colorOptions = ["primary", "secondary", "success", "error", "info", "warning"];

export const colorMap: Record<string, string> = {
  primary: "#1976d2",
  secondary: "#9c27b0",
  success: "#2e7d32",
  error: "#d32f2f",
  info: "#0288d1",
  warning: "#ed6c02",
};

const cardStyle: React.CSSProperties = {
  padding: 16,
  border: "1px solid #e0e0e0",
  borderRadius: 10,
  marginBottom: 15,
  backgroundColor: "#fff",
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

export const MUIProps: React.FC<MUIPropsComponentProps> = ({ muiProps, setMuiProps, componentType }) => {
  let booleanProps: string[] = [];
let textProps: string[] = [];
let showInputProps: string[] = [];

switch (componentType) {
  case "multiline":
    booleanProps = COMMON_BOOLEAN_PROPS;
    textProps = ["helperText", "id", "placeholder"];
    showInputProps = MULTILINE_INPUT_PROPS;
    break;

  case "checkbox":
    booleanProps = CHECKBOX_BOOLEAN_PROPS;
    textProps = ["helperText"];
    break;

  case "radio":
    booleanProps = RADIO_BOOLEAN_PROPS;
    textProps = ["id", "name", "value"];
    break;

  case "select":
    booleanProps = COMMON_BOOLEAN_PROPS;
    textProps = ["id", "name", "value", "helperText"];
    break;

  case "autocomplete":
    booleanProps = COMMON_BOOLEAN_PROPS;
    textProps = ["id", "name", "value", "helperText", "placeholder"];
    break;

  default:
    booleanProps = [...COMMON_BOOLEAN_PROPS, "multiline"];
    textProps = ["helperText", "id", "name", "placeholder", "value"];
    showInputProps = DEFAULT_INPUT_PROPS;
}


  const updateProp = (key: string, value: any) => {
    setMuiProps({ ...muiProps, [key]: value });
  };

  const updateInputProp = (key: string, value: any) => {
    setMuiProps({ ...muiProps, inputProps: { ...(muiProps.inputProps || {}), [key]: value } });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 12 }}>
      {/* Boolean props */}
      {booleanProps.map((prop) => (
        <div key={prop} style={{ ...cardStyle, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 700, textTransform: "capitalize" }}>{prop}</div>
          <Switch checked={!!muiProps[prop]} onChange={() => updateProp(prop, !muiProps[prop])} size="md" />
        </div>
      ))}

      {/* Text props */}
      {textProps.map((prop) => (
        <div key={prop} style={{ ...cardStyle, display: "flex", flexDirection: "column" }}>
          <div style={{ fontWeight: 700, textTransform: "capitalize", marginBottom: 6 }}>{prop}</div>
          <input
            value={muiProps[prop] ?? ""}
            onChange={(e) => updateProp(prop, e.target.value)}
            style={inputStyle}
            placeholder={`Enter ${prop}`}
          />
        </div>
      ))}

      {/* Size */}
      {sizeOptions.length > 0 && (
        <div style={{ ...cardStyle, display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: 700 }}>Size</label>
          <div style={{ display: "flex", marginTop: 6 }}>
            {sizeOptions.map((opt) => (
              <button
                key={opt}
                style={{
                  padding: "6px 12px",
                  borderRadius: 8,
                  border: muiProps.size === opt ? "2px solid #1976d2" : "1px solid #ccc",
                  background: muiProps.size === opt ? "#e3f2fd" : "#fff",
                  marginRight: 8,
                }}
                onClick={() => updateProp("size", opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Variant */}
      {componentType !== "checkbox" && componentType !== "radio" && (
        <div style={{ ...cardStyle, display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: 700 }}>Variant</label>
          <div style={{ display: "flex", marginTop: 6 }}>
            {variantOptions.map((opt) => (
              <button
                key={opt}
                style={{
                  padding: "6px 12px",
                  borderRadius: 8,
                  border: muiProps.variant === opt ? "2px solid #1976d2" : "1px solid #ccc",
                  background: muiProps.variant === opt ? "#e3f2fd" : "#fff",
                  marginRight: 8,
                }}
                onClick={() => updateProp("variant", opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color */}
      {componentType !== "checkbox" && componentType !== "radio" && (
        <div style={{ ...cardStyle, display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: 700 }}>Color</label>
          <div style={{ display: "flex", marginTop: 6, flexWrap: "wrap" }}>
            {colorOptions.map((opt) => (
              <button
                key={opt}
                style={{
                  padding: "6px 12px",
                  borderRadius: 8,
                  border: muiProps.color === opt ? "2px solid #1976d2" : "1px solid #ccc",
                  background: muiProps.color === opt ? colorMap[opt] || "#e3f2fd" : "#fff",
                  color: "#000",
                  marginRight: 8,
                  marginBottom: 6,
                }}
                onClick={() => updateProp("color", opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* inputProps */}
      {showInputProps.length > 0 && (
        <div style={{ ...cardStyle }}>
          <label style={{ fontWeight: 700, display: "block", marginBottom: 6 }}>inputProps</label>
          {showInputProps.map((prop) => (
            <div key={prop} style={{ display: "flex", flexDirection: "column", marginBottom: 8 }}>
              <span style={{ fontSize: 13, marginBottom: 4 }}>{prop}</span>
              <input
                type="text"
                value={muiProps.inputProps?.[prop] ?? ""}
                onChange={(e) => updateInputProp(prop, e.target.value)}
                style={inputStyle}
                placeholder={`Enter ${prop}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
