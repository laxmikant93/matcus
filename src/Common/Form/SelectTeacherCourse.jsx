import React, { forwardRef, useEffect, useState } from "react";
import { string, func, bool } from "prop-types";
import {
  finAllTeacherCourses,
  resetTeacherCourse,
  setSelectedCourse,
} from "../../store/actions/teacherselect";
import { useDispatch, useSelector } from "react-redux";
import { DynamicCourseHeader } from "../UserElement";
import SelectInput from "./SelectInput";

const SelectTeacherCourse = forwardRef(
  ({ name, value, onSelect, onEvent, error }, ref) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const { loading, data } = useSelector((state) => state.teacherselect);
    const [selected, setselected] = useState("");

    const handleOnChange = (e) => {
      const { value } = e.target;
      dispatch(setSelectedCourse(value));
      setselected(value);
      onSelect(value);
      onEvent(e);
    };

    useEffect(() => {
      return () => {
        dispatch(resetTeacherCourse());
      };
    }, [dispatch]);

    useEffect(() => {
      dispatch(finAllTeacherCourses(user.user_institute, user._id, "teacher"));
      !selected && dispatch(setSelectedCourse(value));
    }, [dispatch, user, value, selected]);

    return (
      <div className={`formFieldwrap`}>
        <SelectInput
          className={error ? "errorInput" : ""}
          name={name}
          defaultValue={value}
          value={selected || value}
          onChange={handleOnChange}
        >
          {!value && (
            <option value="">
              {loading ? "Loading..." : `Select ${DynamicCourseHeader()}`}
            </option>
          )}
          {data.length &&
            data.map((courseOption, index) => (
              <option key={index} value={courseOption.courseid}>
                {courseOption.course}
              </option>
            ))}
        </SelectInput>
      </div>
    );
  }
);

SelectTeacherCourse.defaultProps = {
  name: "teachercourse",
  value: "",
  onSelect: () => { },
  onEvent: () => { },
  error: false,
};

SelectTeacherCourse.propTypes = {
  name: string.isRequired,
  value: string,
  onSelect: func.isRequired,
  onEvent: func,
  error: bool,
};

export default SelectTeacherCourse;
