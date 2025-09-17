import React, { useEffect, useRef } from "react";
import Switch from "@mui/joy/Switch";
import {
  sizeOptions,
  variantOptions,
  colorOptions,
  colorMap,
} from "./fieldConfigs";

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
  toggleMuiProp: (prop: string, type: string, value?: any) => void;
  config: any;
  setConfig: React.Dispatch<React.SetStateAction<any>>;
  componentType?: string;
}

export const MUIProps: React.FC<MUIPropsComponentProps> = ({
  muiProps,
  toggleMuiProp,
  config,
  setConfig,
  componentType,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Autofocus logic
  useEffect(() => {
    if (config.muiProps.autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [config.muiProps.autoFocus]);

  const updateInputProps = (key: string, value: any) => {
    setConfig((prev: any) => ({
      ...prev,
      muiProps: {
        ...prev.muiProps,
        inputProps: {
          ...prev.muiProps.inputProps,
          [key]: value,
        },
      },
    }));
  };

  // ---------- Props per component ----------
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        marginBottom: 12,
      }}
    >
      {/* Boolean switches */}
      {booleanProps.map((prop) => (
        <div
          key={prop}
          style={{
            ...cardStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontWeight: 700, textTransform: "capitalize" }}>
            {prop}
          </div>
          <Switch
            checked={!!muiProps[prop]}
            onChange={() => toggleMuiProp(prop, "boolean")}
            size="md"
          />
        </div>
      ))}

      {/* Text props */}
      {textProps.map((prop) => (
        <div
          key={prop}
          style={{ ...cardStyle, display: "flex", flexDirection: "column" }}
        >
          <div
            style={{
              fontWeight: 700,
              textTransform: "capitalize",
              marginBottom: 6,
            }}
          >
            {prop}
          </div>
          <input
            ref={prop === "id" && muiProps.autoFocus ? inputRef : null}
            value={muiProps[prop] || ""}
            onChange={(e) => toggleMuiProp(prop, "text", e.target.value)}
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
                  border:
                    muiProps.size === opt
                      ? "2px solid #1976d2"
                      : "1px solid #ccc",
                  background: muiProps.size === opt ? "#e3f2fd" : "#fff",
                  marginRight: 8,
                }}
                onClick={() => toggleMuiProp("size", "select", opt)}
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
                  border:
                    muiProps.variant === opt
                      ? "2px solid #1976d2"
                      : "1px solid #ccc",
                  background:
                    muiProps.variant === opt ? "#e3f2fd" : "#fff",
                  marginRight: 8,
                }}
                onClick={() => toggleMuiProp("variant", "select", opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color */}
      {componentType !== "select" && (
        <div style={{ ...cardStyle, display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: 700 }}>Color</label>
          <div style={{ display: "flex", marginTop: 6 }}>
            {colorOptions.map((col) => (
              <div
                key={col}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  backgroundColor: colorMap[col] || col,
                  marginRight: 8,
                  border:
                    muiProps.color === col
                      ? "3px solid #1976d2"
                      : "1px solid #ccc",
                  cursor: "pointer",
                }}
                onClick={() => toggleMuiProp("color", "select", col)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Input Props */}
      {showInputProps.length > 0 && (
        <>
          <h3>Input Props</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            {showInputProps.includes("readOnly") && (
              <div
                style={{
                  ...cardStyle,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ fontWeight: 700 }}>readOnly</div>
                <Switch
                  checked={!!muiProps.inputProps?.readOnly}
                  onChange={() =>
                    updateInputProps(
                      "readOnly",
                      !muiProps.inputProps?.readOnly
                    )
                  }
                  size="md"
                />
              </div>
            )}

            {showInputProps.includes("minLength") && (
              <div style={cardStyle}>
                <label>minLength</label>
                <input
                  type="number"
                  value={muiProps.inputProps?.minLength || ""}
                  onChange={(e) =>
                    updateInputProps(
                      "minLength",
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  style={inputStyle}
                  placeholder="Enter minimum length"
                />
              </div>
            )}

            {showInputProps.includes("maxLength") && (
              <div style={cardStyle}>
                <label>maxLength</label>
                <input
                  type="number"
                  value={muiProps.inputProps?.maxLength || ""}
                  onChange={(e) =>
                    updateInputProps(
                      "maxLength",
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  style={inputStyle}
                  placeholder="Enter maximum length"
                />
              </div>
            )}

            {showInputProps.includes("pattern") && (
              <div style={cardStyle}>
                <label>pattern</label>
                <input
                  type="text"
                  value={muiProps.inputProps?.pattern || ""}
                  onChange={(e) =>
                    updateInputProps("pattern", e.target.value)
                  }
                  style={inputStyle}
                  placeholder="Enter regex pattern"
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
