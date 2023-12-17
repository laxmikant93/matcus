import React from 'react'


const ToggleIcon = ({ checked, onClick, onChange }) => {
  return (
    <>
      <div>
        <input
          checked={checked}
          onChange={(e) => onChange(e)}
          onClick={onClick}
          className="react-switch-checkbox"
          id={`react-switch-new`}
          type="checkbox"
        // disabled={disabledprop}
        />
        <label
          style={{ background: checked && "#0184ff" }}
          className="react-switch-label"
          htmlFor={`react-switch-new`}
        >
          <span className={`react-switch-button`} />
        </label>
      </div>
    </>
  )
}

export default ToggleIcon