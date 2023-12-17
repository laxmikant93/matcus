import { useSelector } from "react-redux";
import { string, func, bool } from "prop-types";
import { useEffect, useState } from "react";
import { DynamicClassroomHeader } from "../UserElement";

function ClassroomSelect({
  name,
  value,
  onSelect,
  onEvent,
  autoevent,
  classroomSubmit,
  disabled,
  id,
  label,
  className,
}) {
  const { classroomList } = useSelector((state) => {
    return {
      classroomList: state.classroomassigned.classroomList,
    };
  });

  const fired = false;
  const [selected, setselected] = useState("");
  const handleClassroomChange = (e) => {
    setselected(e.target.value);
    onSelect(e.target.value);
    onEvent(e);
  };

  useEffect(() => {
    if (autoevent && !fired) {
      // setselected(value)
      // setfired(value)
      // value && dispatch(changeClassroomAssignedData(value))
    }
  }, [autoevent, fired, selected, value]);

  useEffect(() => {
    if (classroomSubmit) {
      setselected("");
    }
  }, [classroomSubmit]);
  const [focusLabel, setFocusLabel] = useState(false)

  return (
    // <select
    //   name={name}
    //   defaultValue={value}
    //   value={selected || value}
    //   onChange={handleClassroomChange}
    //   disabled={disabled}
    // >
    //   <option value="">Select {DynamicClassroomHeader()}</option>
    //   {(classroomList || []).length &&
    //     classroomList.map((item) => (
    //       <option value={item.classroom} key={item.classroom}>
    //         {item.classroomname}
    //       </option>
    //     ))}
    // </select>
    <div className="cstmSelectWrap">
      <div className={`form-group ${(focusLabel || value) && "caretup"}`}>
        <select
          className={`select-control ${className}`}
          name={name}
          onBlur={() => setFocusLabel(false)}
          id={id}
          onFocus={() => setFocusLabel(true)}
          value={selected || value}
          onChange={handleClassroomChange}
          disabled={disabled}
          defaultValue={value}
        >
          <option value="">Select {DynamicClassroomHeader()}</option>
          {(classroomList || []).length &&
            classroomList.map((item) => (
              <option value={item.classroom} key={item.classroom}>
                {item.classroomname}
              </option>
            ))}
        </select>
        <label className={`animLabel ${((label && value) || (focusLabel)) && "show"}`} htmlFor={id}>
          {label}
        </label>
      </div>
    </div>
  );
}

ClassroomSelect.defaultProps = {
  autoevent: false,
  name: "classroom",
  value: "",
  onSelect: () => { },
  onEvent: () => { },
};

ClassroomSelect.propTypes = {
  autoevent: bool,
  name: string.isRequired,
  value: string,
  onSelect: func.isRequired,
  onEvent: func,
};

export default ClassroomSelect;
