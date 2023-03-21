import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";

const ColorPicker = ({ color, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.keyCode === 27) {
        setShowPicker(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handlePickerToggle = () => {
    setShowPicker(!showPicker);
  };

  const handleColorChange = (color) => {
    onChange(color);
  };

  const handleOpacityChange = (opacity) => {
    onChange({ ...color, a: opacity });
  };

  const handleBackdropClick = () => {
    setShowPicker(false);
  };

  return (
    <div className="input-group-text input-group-sm">
      <i
        className="btn bi bi-palette-fill p-0 fs-5"
        type="button"

        onClick={handlePickerToggle}
        style={{
          color:
            color && `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        }}
      ></i>
      {showPicker && (
        <>
          <div className="modal-backdrop" onClick={handleBackdropClick}></div>
          <div className="color-picker-container">
            <div className="color-picker">
              <button
                type="button"
                className="btn-close"
                onClick={handlePickerToggle}
                aria-label="Close"
              ></button>
              <SketchPicker
                color={color}
                onChange={handleColorChange}
                className="sketch-picker"
                style={{
                  width: "100%",
                }}
              >
                <div className="opacity-slider-container">
                  <div className="opacity-slider-label">Opacity:</div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={color?.a}
                    onChange={(e) => handleOpacityChange(e.target.value)}
                    className="opacity-slider"
                    style={{
                      color: color
                        ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                        : "black",
                    }}
                  />
                </div>
              </SketchPicker>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ColorPicker;
