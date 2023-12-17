import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../../../Common/Modal";
import ModalBody from "../../../../Common/Modal/ModalBody";
import ModalFooter from "../../../../Common/Modal/ModalFooter";
import ModalHeader from "../../../../Common/Modal/ModalHeader";
import {
  getAssignedCoursesList,
  postAssignedUsers,
  resetAssignedCoursesList,
  resetPostAssignedData,
} from "../../../../store/actions/admincourse";
import AssignToStudents from "../../../../Common/SelectSearchAssignTo/AssignToStudents";
import AssignToTeachers from "../../../../Common/SelectSearchAssignTo/AssignToTeachers";
import "../../../../Common/SelectSearchAssignTo/assignCourse.scss";
const AssignToModal = ({ onclose, show, courseId }) => {
  const dispatch = useDispatch();
  const { user, teacherList, studentList, successState, postState } =
    useSelector((state) => {
      return {
        user: state.user,
        teacherList: state.admincourse.getAssignedTeacherList.data.teacherData,
        studentList: state.admincourse.getAssignedTeacherList.data.studentData,
        successState: state.admincourse.getAssignedTeacherList.success,
        postState: state.admincourse.postAssignedData,
      };
    });
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const OnSelectedValue = (data) => {
    setSelectedTeachers(data);
  };
  const onSelectedStudents = (data) => {
    setSelectedStudents(data);
  };
  const closeModalState = () => {
    onclose();
    // dispatch(resetAllEntrySwitchStu());
    dispatch(resetAssignedCoursesList());
  };
  useEffect(() => {
    if (courseId) {
      dispatch(
        getAssignedCoursesList(
          courseId,
          process.env.REACT_APP_TEACHER,
          process.env.REACT_APP_STUDENT
        )
      );
    }
  }, [courseId, dispatch]);

  const payloadData = {
    assignToStudent: selectedStudents.length ? selectedStudents : [],
    assignToTeacher: selectedTeachers.length ? selectedTeachers : [],
  };

  const assignCourse = () => {
    dispatch(postAssignedUsers(courseId, payloadData));
  };
  if (postState.success) {
    dispatch(resetPostAssignedData());
    onclose();
  }

  return (
    <React.Fragment>
      <Modal show={show}>
        <ModalHeader
          title="Assign Material"
          closeButton={true}
          onclose={closeModalState}
        />
        <ModalBody>
          {successState ? (
            <React.Fragment>
              {user.user_activeRole === process.env.REACT_APP_TEACHER ? (
                <React.Fragment>
                  <AssignToStudents
                    selectGroup={studentList ? studentList : []}
                    OnSelectedValue={onSelectedStudents}
                    SwitchSelectData={false}
                    name={"Assign to Students"}
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <AssignToTeachers
                    selectGroup={teacherList ? teacherList : []}
                    OnSelectedValue={OnSelectedValue}
                    SwitchSelectData={false}
                    name={"Assign to Teachers"}
                  />
                  <AssignToStudents
                    selectGroup={studentList ? studentList : []}
                    OnSelectedValue={onSelectedStudents}
                    SwitchSelectData={false}
                    name={"Assign to Students"}
                  />
                </React.Fragment>
              )}
            </React.Fragment>
          ) : (
            <h1 className="w-400">Loading...</h1>
          )}
        </ModalBody>
        <ModalFooter>
          {successState ? (
            <React.Fragment>
              {postState.loading ? (
                <button
                  className="button btn-md button-theme btn-md"
                  // onClick={assignCourse}
                  type="button"
                >
                  Updating...
                </button>
              ) : (
                <button
                  className="button btn-md button-theme btn-md"
                  onClick={assignCourse}
                  type="button"
                >
                  Update
                </button>
              )}
            </React.Fragment>
          ) : (
            ""
          )}
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};
export default AssignToModal;
