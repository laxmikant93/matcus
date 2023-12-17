import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoDataAvailable from "../../../Common/NoDataAvailable";
import { DynamicClassroomHeader } from "../../../Common/UserElement";
import {
  getTeacherAssignedClassroomData,
  deleteTeacherClassroomData,
} from "../../../store/actions/editteacherlist";
import "./Course.scss";

const CourseEdtTeacherAssignClassroom = ({ SelectedTeacherId, courseid }) => {
  const dispatch = useDispatch();

  const { assignedTeacherClassroom, users } = useSelector((state) => {
    return {
      users: state.user,
      assignedTeacherClassroom:
        state.editteacherlist.assignedteacherclassroom.data,
    };
  });

  useEffect(() => {
    dispatch(
      getTeacherAssignedClassroomData(
        users.user_institute,
        courseid,
        SelectedTeacherId
      )
    );
  }, [dispatch, users, courseid, SelectedTeacherId]);

  const DeleteAssignedClassroom = (_id) => {
    dispatch(deleteTeacherClassroomData(_id));
  };

  return (
    <div className="col-md-10">
      <h3 className="dgray text-xs w-500">
        Assigned <DynamicClassroomHeader />{" "}
      </h3>
      {assignedTeacherClassroom.length ? (
        assignedTeacherClassroom.map((item) => {
          return (
            <ul className="closableBtn mt-8" key={item._id}>
              <li>
                <button className="btnText">
                  {item.classroomData_classroomname}
                </button>
                <span
                  className="close"
                  onClick={() => DeleteAssignedClassroom(item._id)}
                >
                  X
                </span>
              </li>
            </ul>
          );
        })
      ) : (
        <NoDataAvailable title="No Records Found." />
      )}
    </div>
  );
};
export default CourseEdtTeacherAssignClassroom;
