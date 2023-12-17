import React from "react";
import {
  DynamicCourseHeader,
  DynamicClassroomHeader,
} from "../../Common/UserElement";

const List = ({ studentHistory, teacherHistory }) => {
  return (
    <React.Fragment>
      <ul className="gridHeader">
        <li className="col col-3">Name & Contact</li>
        {studentHistory && (
          <li className="col col-2">{<DynamicCourseHeader />}</li>
        )}
        {teacherHistory && (
          <li className="col col-2">
            <DynamicCourseHeader /> / <DynamicClassroomHeader />
          </li>
        )}
        <li className="col col-3">Invited on</li>
        <li className="col col-2">Type & Status</li>
        <li className="col col-2">&nbsp;</li>
      </ul>
    </React.Fragment>
  );
};
export default List;
