import React, { useState, useRef } from "react";
import { CourseClassromFilterConsumer } from "../../Context/CourseClassromFilterContext";
import ClassRoomSelect from "./ClassRoomSelect";

const CourseOption = ({ title, courseid, classroomData = [] }) => {
  const courseRef = useRef();
  const [active, setActive] = useState(false);

  const handleInderminate = (courseClassRoomSelection) => {
    let checked =
      courseClassRoomSelection[courseid] &&
      classroomData.length === courseClassRoomSelection[courseid].length;

    if (courseRef.current) {
      if (
        courseClassRoomSelection[courseid] &&
        courseClassRoomSelection[courseid].length > 0 &&
        !checked
      ) {
        courseRef.current.indeterminate = true;
        // courseRef.current.nextSibling.classList.add("CheckDash");
      } else {
        courseRef.current.indeterminate = false;
        // courseRef.current.nextSibling.classList.remove("CheckDash");
      }

      // courseRef.current.indeterminate =
      //   courseClassRoomSelection[courseid] &&
      //     courseClassRoomSelection[courseid].length > 0
      //     ? !checked
      //     : false;
    }
    return checked;
  };

  return (
    <li className="GroupOption">
      <div className={`GroupOptLabelWrap ${active ? "active" : ""}`}>
        <span className="GroupOptCaretIcon" onClick={() => setActive(!active)}>
          &#10095;
        </span>
        <CourseClassromFilterConsumer>
          {({ courseSelect, courseClassRoomSelection }) => (
            <label className="small">
              {/* Auto indeterminate selection */}

              <input
                type="checkbox"
                ref={courseRef}
                name={courseid}
                checked={handleInderminate(courseClassRoomSelection)}
                defaultChecked={handleInderminate(courseClassRoomSelection)}
                onChange={courseSelect}
              // onChange={(evt) => handleOnChange(evt, courseSelect, courseClassRoomSelection)}
              />
              {handleInderminate(courseClassRoomSelection)}
            </label>
          )}
        </CourseClassromFilterConsumer>
        <span
          className="GroupOptionLabel"
          title={title}
          onClick={() => setActive(!active)}
        >
          {title}
        </span>
      </div>
      {classroomData.length > 0 && active && (
        <ClassRoomSelect show={true} classroomData={classroomData} />
      )}
    </li>
  );
};

export default CourseOption;
