import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import Modal from "../../../Common/Modal";
import ModalBody from "../../../Common/Modal/ModalBody";
import ModalHeader from "../../../Common/Modal/ModalHeader";
const StudentSubjectAttendanceViewMultiModal = ({
  ManageAttendanceCalc,
  closeModalState,
  periodsData
}) => {
  const { ClassroomDetailSuccess, ClassroomDetail } = useSelector((state) => {
    return {
      ClassroomDetailSuccess: state.teachersubjectlist.TeacherClassroomData.success,
      ClassroomDetail: state.teachersubjectlist.TeacherClassroomData.data,
    }
  })
  return (
    <React.Fragment>
      <Modal show={ManageAttendanceCalc}>
        <ModalHeader
          title="Leave Requests"
          closeButton={true}
          onclose={closeModalState}
        />
        <ModalBody>
          <div className="SubjectAttendanceViewModal-Wrapper">
            <div className="Item_Wrap">
              <div className="Left_Item">
                <p className="text-sm w-500">Attendance</p>
                <p className="text-xxs w-500">{ClassroomDetailSuccess &&
                  ClassroomDetail.coursename}</p>
              </div>

            </div>
            <div className="SubjectAttendanceViewList-Body">
              <p className="text-sm w-400 mt-30 mb-20">{periodsData ? periodsData.attendanceInfo.length : ""} periods of {periodsData ? periodsData.data.classroomname : ""} </p>
              {
                periodsData && periodsData.attendanceInfo.length ?
                  (
                    periodsData.attendanceInfo.map((item) => {
                      return (
                        <ul className="SubjectAttendanceViewList-Item">
                          <li>{item.status}</li>
                          <li>{moment(item.startTime).format("hh:mm A")}&nbsp;&nbsp;{moment(item.endTime).format("hh:mm A")}</li>
                          <li>{item.teacherName}</li>
                        </ul>
                      )
                    })
                  ) : "No records"
              }
            </div>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};
export default StudentSubjectAttendanceViewMultiModal;
