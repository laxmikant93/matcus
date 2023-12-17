import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Modal from '../../../Common/Modal';
import ModalBody from '../../../Common/Modal/ModalBody';
import ModalFooter from '../../../Common/Modal/ModalFooter';
import ModalHeader from '../../../Common/Modal/ModalHeader';
import { resetSendLeaveRequest, sendLeaveRequest } from '../../../store/actions/StudentAttendance';
import { EditAttendanceList, getSingleStudentPeriodData } from '../../../store/actions/TeacherAttendance';
import UseOutsideClick from '../../../Common/UseOutsideClick';

import { DynamicCourseHeader } from "../../../Common/UserElement";
import Popup from '../../../Common/Popup';
function EditAttendance({ onclose, show, SingleStudentPeriodData, editPropDate }) {
  const dispatch = useDispatch();
  const {
    user,
    sendLeaveRequestState,
    classroomDetail,
    classroomDetailSuccess,
  } = useSelector((state) => {
    return {
      user: state.user,
      sendLeaveRequestState: state.studentAttendance.sendLeaveRequest,
      classroomDetail: state.classroomDetail.classrooomData.data,
      classroomDetailSuccess: state.classroomDetail.classrooomData.success,
    }
  })
  const { _classroomId, _subjectId } = useParams()

  const [confirmPop, setConfirmPop] = useState(false)
  const RemovePopToggleRef = useRef();
  UseOutsideClick(RemovePopToggleRef, () => {
    if (confirmPop) setConfirmPop(false);
  });
  const { data, loading, success } = useSelector((state) => state.teacherAttendance.editStudentSubjectAttendance);
  const handleChange = (e, _id) => {
    let inputValue = e.target.value;
    let newdata = { status: inputValue };
    dispatch(EditAttendanceList(newdata, _id));
  };
  const postData = () => {
    let endDate = moment(editPropDate).add('hours', 14).format()
    let startDate = moment(editPropDate).subtract(330, 'm').format()
    return {
      startFrom: moment(startDate),
      endOn: moment(endDate),
      user: SingleStudentPeriodData.data.user,
      course: _classroomId,
      institute: user.user_institute,
      owner: user._id,
      status: "manual",
    };
  };
  const leaveStudent = () => {
    dispatch(sendLeaveRequest(postData()))
  }
  useEffect(() => {
    !sendLeaveRequestState.loading && sendLeaveRequestState.success && setConfirmPop(false);
  }, [sendLeaveRequestState]);
  const [resetState, setResetState] = useState()
  if (sendLeaveRequestState.success && !resetState) {
    onclose();
    setResetState(true);
  }
  useEffect(() => {
    return () => {
      dispatch(resetSendLeaveRequest())
      setResetState(false)
    }
  }, [dispatch])
  const leaveStudentPopup = () => {
    setConfirmPop(!confirmPop)
  }
  useEffect(() => {
    if (_subjectId) {
      dispatch(
        getSingleStudentPeriodData(
          SingleStudentPeriodData.attendanceInfo[0].course,
          SingleStudentPeriodData.attendanceInfo[0].institute,
          SingleStudentPeriodData.attendanceInfo[0].attendanceDate,
          SingleStudentPeriodData.attendanceInfo[0].user,
          SingleStudentPeriodData.attendanceInfo[0].classroom
        )
      );
    } else {
      dispatch(
        getSingleStudentPeriodData(
          SingleStudentPeriodData.attendanceInfo[0].course,
          SingleStudentPeriodData.attendanceInfo[0].institute,
          SingleStudentPeriodData.attendanceInfo[0].attendanceDate,
          SingleStudentPeriodData.attendanceInfo[0].user,
          ""
        )
      );
    }
  }, [dispatch, SingleStudentPeriodData, _subjectId]);
  return (
    <React.Fragment>
      <Modal show={show}>
        <ModalHeader closeButton={true} onclose={onclose} />
        <ModalBody>
          <div className="Manage-Periods-Wrapper">
            <div className="Manage-Periods-Time-Details">
              <div className="Manage-Periods-Time-From">
                <p className="text-xxs w-500">
                  <span className="text-2xs w-300">
                    <DynamicCourseHeader /> &nbsp;-&nbsp;
                  </span>
                  {_subjectId
                    ? SingleStudentPeriodData.attendanceInfo[0].classroomname
                    : classroomDetailSuccess && classroomDetail.coursename}
                </p>
                <p className="text-xs w-500">
                  <span className="text-2xs w-300">
                    Student Name &nbsp;-&nbsp;
                  </span>
                  {SingleStudentPeriodData.data.fullname}
                </p>
              </div>
              <div className="Manage-Periods-Time-To">
                <p className="text-xxs w-500">
                  {moment(editPropDate).format("DD-MMMM-YYYY")}
                </p>
              </div>
            </div>
            <div className="Manage-Periods-Body">
              <div className="Manage-Periods-Body-Head">
                <p className="text-xs w-600">
                  {data.filter((item) => item.status === "Present").length}/
                  {data.length}&nbsp;Periods
                </p>
                {!_subjectId ?
                  <button
                    onClick={leaveStudentPopup}
                    type="button"
                    className="button btn-xs button-base"
                  >
                    Leave
                  </button>
                  : ""}
                {
                  confirmPop && (
                    <Popup
                      show={confirmPop}
                      removeButtonLabel={"Yes, Leave"}
                      cancelButtonLabel={"No"}
                      leaveRequest={true}
                      RemoveProp={leaveStudent}
                      RemovePopToggleRef={RemovePopToggleRef}
                      CancelProp={() => setConfirmPop(!confirmPop)}
                      loading={sendLeaveRequestState.loading}
                    >
                      <p className="gray text-xxs w-300">
                        You are about to mark this student on Leave. It will not be editable/changable.
                      </p>
                      <p className="dgray text-xxs w-400">
                        Are you sure?
                      </p>
                    </Popup>
                  )
                }
              </div>
              <div className="Manage-Periods-grid">
                <div className="gridListTable">
                  <ul className="gridHeader">
                    <li className="col col-4">Classroom Name</li>
                    <li className="col col-2">Status</li>
                    <li className="col col-2">Start Time</li>
                    <li className="col col-2">End Time</li>
                    <li className="col col-2">Teacher</li>
                  </ul>
                  <div className="gridBody">
                    {data && data.length > 0 && success ? (
                      data.map((item) => {
                        return (
                          <div className="gridRow">
                            <ul className="topInfo">
                              <li
                                className="col col-4"
                                data-head="Classroom/Period Name"
                              >
                                {item.classroomname}
                              </li>
                              <li className="col col-2" data-head="Status">
                                <div className="selectTextType">
                                  <select
                                    value={item.status}
                                    onChange={(e) => handleChange(e, item._id)}
                                  >
                                    <option value="Present">Present</option>
                                    <option value="Absent">Absent</option>
                                    {/* <option value="Leave">Leave</option> */}
                                  </select>
                                </div>
                              </li>
                              <li className="col col-2" data-head="Start Time">
                                {" "}
                                <p>
                                  {moment(item.startTime).format("hh:mm a")}
                                </p>
                              </li>
                              <li className="col col-2" data-head="End Time">
                                <p>{moment(item.endTime).format("hh:mm a")}</p>
                              </li>
                              <li className="col col-2" data-head="Teacher">
                                <p>{item.teacherName}</p>
                              </li>
                            </ul>
                          </div>
                        );
                      })
                    ) : loading ? (
                      <div className="loadingGridData">
                        <i className="ed-loadingGrid"></i>
                      </div>
                    ) : success ? (
                      <div className="loadingGridData">No Record.</div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody >
        <ModalFooter>
          {/* <button
            type="button"
            className="button btn-sm btn-o-primary primary"
          >
            <span className="text-sm w-400">&#43;&nbsp;</span> Add more
            Periods
          </button> */}
        </ModalFooter>
      </Modal >
    </React.Fragment >
  );
}

export default EditAttendance;
