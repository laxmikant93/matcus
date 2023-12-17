import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DynamicClassroomHeader } from "../../../Common/UserElement";
import { deleteTeacherClassroomData } from "../../../store/actions/classroomassigned";
import NoDataAvailable from "../../../Common/NoDataAvailable";
const EditFacultyPopUP = () => {
  const dispatch = useDispatch();

  const { teacherAssignedClassroomName } = useSelector((state) => {
    return {
      users: state.user,
      teacherAssignedClassroomName:
        state.classroomassigned.teacherassignedclassrooom.data,
    };
  });

  const DeleteAssignedClassroom = (_id) => {
    dispatch(deleteTeacherClassroomData(_id));
  };
  return (
    <div className="col-md-10">
      <h3 className="dgray text-xs w-500">
        Assigned <DynamicClassroomHeader />
      </h3>
      {teacherAssignedClassroomName && teacherAssignedClassroomName.length ? (
        teacherAssignedClassroomName.map((item) => {
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

export default EditFacultyPopUP;
