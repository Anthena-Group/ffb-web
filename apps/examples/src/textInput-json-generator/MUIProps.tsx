import React from "react";
import Switch from "@mui/joy/Switch";
import { sizeOptions, variantOptions, colorOptions, colorMap } from "./fieldConfigs";

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

interface MUIPropsComponentProps {
  muiProps: Record<string, any>;
  setMuiProps: (props: Record<string, any>) => void;
  componentType?: string;
}

export const MUIProps: React.FC<MUIPropsComponentProps> = ({
  muiProps,
  setMuiProps,
  componentType,
}) => {
  let booleanProps: string[] = [];
  let textProps: string[] = [];
  let showInputProps: string[] = [];

  if (componentType === "multiline") {
    booleanProps = ["disabled", "error", "fullWidth", "autoFocus"];
    textProps = ["helperText", "id", "placeholder"];
    showInputProps = ["readOnly", "minLength", "maxLength", "pattern"];
  } else if (componentType === "checkbox") {
    booleanProps = ["required", "disabled"];
    textProps = ["helperText"];
  } else if (componentType === "radio") {
    booleanProps = ["required", "disabled", "autoFocus"];
    textProps = ["id", "name", "value"];
  } else if (componentType === "select") {
    booleanProps = ["disabled", "required", "error", "fullWidth", "autoFocus"];
    textProps = ["id", "name", "value", "helperText"];
  } else if (componentType === "autocomplete") {
    booleanProps = ["disabled", "required", "error", "fullWidth", "autoFocus"];
    textProps = ["id", "name", "value", "helperText", "placeholder"];
  } else {
    booleanProps = ["disabled", "error", "fullWidth", "autoFocus", "multiline"];
    textProps = ["helperText", "id", "name", "placeholder", "value"];
    showInputProps = [
      "readOnly",
      "min",
      "max",
      "step",
      "minLength",
      "maxLength",
      "pattern",
    ];
  }

  // helper to update props immutably
  const updateProp = (key: string, value: any) => {
    setMuiProps({ ...muiProps, [key]: value });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 12 }}>
      {/* Boolean props as toggles */}
      {booleanProps.map((prop) => (
        <div
          key={prop}
          style={{ ...cardStyle, display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <div style={{ fontWeight: 700, textTransform: "capitalize" }}>{prop}</div>
          <Switch
            checked={!!muiProps[prop]}
            onChange={() => updateProp(prop, !muiProps[prop])}
            size="md"
          />
        </div>
      ))}

      {/* Text props as input boxes */}
      {textProps.map((prop) => (
        <div key={prop} style={{ ...cardStyle, display: "flex", flexDirection: "column" }}>
          <div style={{ fontWeight: 700, textTransform: "capitalize", marginBottom: 6 }}>{prop}</div>
          <input
            value={muiProps[prop] || ""}
            onChange={(e) => updateProp(prop, e.target.value)}
            style={inputStyle}
            placeholder={`Enter ${prop}`}
          />
        </div>
      ))}

      {/* Size options */}
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

      {/* Variant options */}
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

      {/* Color options */}
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
          <label style={{ fontWeight: 700, display: "block", marginBottom: 6 }}>
            inputProps
          </label>
          {showInputProps.map((prop) => (
            <div key={prop} style={{ display: "flex", flexDirection: "column", marginBottom: 8 }}>
              <span style={{ fontSize: 13, marginBottom: 4 }}>{prop}</span>
              <input
                type="text"
                value={muiProps.inputProps?.[prop] || ""}
                onChange={(e) =>
                  setMuiProps({
                    ...muiProps,
                    inputProps: { ...muiProps.inputProps, [prop]: e.target.value },
                  })
                }
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
