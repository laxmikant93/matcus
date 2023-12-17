import React from "react";
import "./switch-button.scss";

const SwitchButton = ({ onChange, checked, disabled, label, stroke }) => {
  return (
    <label class={`${label && stroke ? "switch-stroked-label" : stroke ? "switch-stroked" : label ? "switch-labeled" : "switch"}`}>
      <input type="checkbox" onChange={(e) => onChange(e)} checked={checked} disabled={disabled} />
      <span class={`switch-btn-slider round`}></span>
    </label>
  );
};

export default SwitchButton;
