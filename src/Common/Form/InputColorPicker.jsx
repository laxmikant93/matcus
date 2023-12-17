import React, { useEffect, useState } from "react";
import reactCSS from "reactcss";
import { ChromePicker } from "react-color";

function InputColorPicker({ selectedColor, ...props }) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState("#F17013");

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  useEffect(() => {
    setColor(selectedColor);
  }, [selectedColor]);

  const styles = reactCSS({
    default: {
      color: {
        width: "30px",
        height: "25px",
        background: `${color}`,
      },
      swatch: {
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  return (
    <React.Fragment>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {displayColorPicker ? (
        <div className="popover">
          <div style={styles.cover} onClick={handleClose} />
          <ChromePicker color={color} {...props} />
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default InputColorPicker;
