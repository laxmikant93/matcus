import React from "react";
import { CourseClassromFilterConsumer } from "../../Context/CourseClassromFilterContext";

const ClassRoomOption = ({ classroomid, title, courseid }) => {
  return (
    <CourseClassromFilterConsumer>
      {({ classRoomSelection, classroomSelect }) => (
        <li className="option">
          <label className="small" title={title}>
            <input
              type="checkbox"
              name={classroomid}
              checked={classRoomSelection.includes(classroomid)}
              defaultChecked={classRoomSelection.includes(classroomid)}
              onChange={(evt) => classroomSelect(evt, courseid)}
            />
            {title}
          </label>
        </li>
      )}
    </CourseClassromFilterConsumer>
  );
};

export default ClassRoomOption;
