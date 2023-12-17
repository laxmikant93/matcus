import { useSelector, useDispatch } from "react-redux";
import { changeClassroomAssignedData } from "../../store/actions/classroomassigned";
import { string, func, bool } from "prop-types";
import { useEffect, useState } from "react";
import { DynamicCourseHeader } from "../UserElement";

function CourseSelect({
  name,
  value,
  onSelect,
  onEvent,
  autoevent,
  courseSubmit,
  disabled,
  className,
  id,
  label
}) {
  const { courseList } = useSelector((state) => {
    return {
      courseList: state.classroomassigned.courseList,
    };
  });

  const dispatch = useDispatch();
  const [fired, setfired] = useState(false);
  const [selected, setselected] = useState("");
  const handleCourseChange = (e) => {
    setselected(e.target.value);
    onSelect(e.target.value);
    onEvent(e);
    dispatch(changeClassroomAssignedData(e.target.value));
  };

  // if(value)dispatch(changeClassroomAssignedData(value))

  useEffect(() => {
    if (autoevent && !fired) {
      setselected(value);
      setfired(value);
      value && dispatch(changeClassroomAssignedData(value));
    }
  }, [autoevent, dispatch, fired, selected, value]);

  useEffect(() => {
    if (courseSubmit) {
      setselected("");
    }
  }, [courseSubmit]);

  const [focusLabel, setFocusLabel] = useState(false)

  return (
    // <select
    //   name={name}
    //   defaultValue={value}
    //   value={selected || value}
    //   onChange={handleCourseChange}
    //   disabled={disabled}
    // >
    //   <option value="">Select {DynamicCourseHeader()}</option>
    //   {(courseList || []).length &&
    //     courseList.map((item, index) => (
    //       <option key={index} value={item.course}>
    //         {item.coursename}
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
          onChange={handleCourseChange}
          defaultValue={value}
          disabled={disabled}
        >
          <option value="">Select {DynamicCourseHeader()}</option>
          {(courseList || []).length &&
            courseList.map((item, index) => (
              <option key={index} value={item.course}>
                {item.coursename}
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

CourseSelect.defaultProps = {
  autoevent: false,
  name: "course",
  value: "",
  onSelect: () => { },
  onEvent: () => { },
};

CourseSelect.propTypes = {
  autoevent: bool,
  name: string.isRequired,
  value: string,
  onSelect: func.isRequired,
  onEvent: func,
};

export default CourseSelect;
