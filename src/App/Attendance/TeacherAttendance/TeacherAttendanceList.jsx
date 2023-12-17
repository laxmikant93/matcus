import React, { useEffect, useState } from "react";
import "../Attendance.scss";
import DummyProfile from "../DummyProfile.png";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import TeacherLeaveRequestModal from "./TeacherLeaveRequest/TeacherLeaveRequestModal";
import TeacherAttendanceListBreadcrumbs from "./TeacherAttendanceListBreadcrumbs";
import TeacherAttendanceListHeader from "./TeacherAttendanceListHeader";
import CreateAttendance from "../CreateEditAttendance/CreateAttendance";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getTeacherStudentAttendanceList } from "../../../store/actions/TeacherAttendance";
import { useSelector } from "react-redux";
import EditAttendance from "../CreateEditAttendance/EditAttendance";
import { changedatavalue, getDanamicCalenderDate } from "../commonFunctions";
import NoDataAvailable from "../../../Common/NoDataAvailable";
import { getClassroomDataInviteFaculty, resetClassroomsData } from "../../../store/actions/classroom";
import ImageViewer from "../../../Common/ImageViewer";
const TeacherAttendanceList = () => {
  const { _classroomId, _subjectId } = useParams();
  const [manageLR, SetManageLR] = useState(false);
  const dispatch = useDispatch();
  const { user, attendanceList, attendanceListSuccess, postAttendanceState } =
    useSelector((state) => {
      return {
        user: state.user,
        attendanceList:
          state.teacherAttendance.getTeacherStudentAttendance.data,
        postAttendanceState: state.teacherAttendance.postAttendance,
        attendanceListSuccess:
          state.teacherAttendance.getTeacherStudentAttendance.success,
        deleteAttendanceSuccess:
          state.teacherAttendance.deleteAttendance.success,
      };
    });
  const [dates, setDates] = useState([]);
  let firstDate = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(firstDate.getFullYear(), firstDate.getMonth(), 1)
  );
  const [postAttendanceModal, setPostAttendanceModal] = useState(false);

  const [propDate, setPropDate] = useState(false);
  const handleModal = (day) => {
    if (day) {
      // ManageDisable(day);
      let full = dates.find((item) => {
        return item.date === day && item;
      });
      if (full.fullDate < new Date()) {
        setPostAttendanceModal(!postAttendanceModal);
        setPropDate(full.fullDate);
      }
    } else {
      setPostAttendanceModal(!postAttendanceModal);
    }
  };
  const [leaveId, setLeaveId] = useState("");
  const ManageLR = (leaveId) => {
    if (!_subjectId) {
      if (leaveId.length) {
        setLeaveId(leaveId[0]);
      }
      SetManageLR(!manageLR);
    }
  };
  useEffect(() => {
    if (postAttendanceState.success) {
      if (window.location.pathname.includes("teacher")) {
        if (_subjectId) {
          dispatch(
            getTeacherStudentAttendanceList(
              "teacherClassroomSubject",
              user.user_institute,
              user._id,
              _classroomId,
              _subjectId,
              currentDate
            )
          );
          setCssDate(currentDate);
        } else {
          dispatch(
            getTeacherStudentAttendanceList(
              "teacherClassroom",
              user.user_institute,
              user._id,
              _classroomId,
              "",
              currentDate
            )
          );
          setCssDate(currentDate);
        }
      } else if (window.location.pathname.includes("admin")) {
        if (_subjectId) {
          dispatch(
            getTeacherStudentAttendanceList(
              "adminClassroomSubject",
              user.user_institute,
              "",
              _classroomId,
              _subjectId,
              currentDate
            )
          );
          setCssDate(currentDate);
        } else {
          dispatch(
            getTeacherStudentAttendanceList(
              "adminClassroom",
              user.user_institute,
              "",
              _classroomId,
              "",
              currentDate
            )
          );
          setCssDate(currentDate);
        }
      }
    }
  }, [
    _classroomId,
    _subjectId,
    currentDate,
    dispatch,
    postAttendanceState.success,
    user._id,
    user.user_institute,
  ]);
  const [managePeriods, SetManagePeriods] = useState();
  const [SingleStudentPeriodData, setSingleStudentPeriodData] = useState("");
  const [editPropDate, setEditPropDate] = useState("");
  const ManagePeriods = (data, day, attendanceInfo) => {
    SetManagePeriods(!managePeriods);
    if (day) {
      let full = dates.find((item) => {
        return item.date === day && item;
      });
      if (full.fullDate) {
        setEditPropDate(full.fullDate);
      }
    }
    setSingleStudentPeriodData({
      data: data,
      day: day,
      attendanceInfo: attendanceInfo,
    });
  };
  const updateStatusInList = () => {
    setPropDate(!propDate)
    if (window.location.pathname.includes("teacher")) {
      if (_subjectId) {
        dispatch(
          getTeacherStudentAttendanceList(
            "teacherClassroomSubject",
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            currentDate
          )
        );
        setCssDate(currentDate);
      } else {
        dispatch(
          getTeacherStudentAttendanceList(
            "teacherClassroom",
            user.user_institute,
            user._id,
            _classroomId,
            "",
            currentDate
          )
        );
        setCssDate(currentDate);
      }
    } else if (window.location.pathname.includes("admin")) {
      if (_subjectId) {
        dispatch(
          getTeacherStudentAttendanceList(
            "adminClassroomSubject",
            user.user_institute,
            "",
            _classroomId,
            _subjectId,
            currentDate
          )
        );
        setCssDate(currentDate);
      } else {
        dispatch(
          getTeacherStudentAttendanceList(
            "adminClassroom",
            user.user_institute,
            "",
            _classroomId,
            "",
            currentDate
          )
        );
        setCssDate(currentDate);
      }
    }
  };
  const closeModalState = (value) => {
    if (value === "Create") {
      setPostAttendanceModal(!postAttendanceModal);
      setPropDate("");
    } else if (value === "Leave") {
      SetManageLR(!manageLR);
      setLeaveId("");
    }
  };
  const closePeriodsState = () => {
    SetManagePeriods(!managePeriods);
    // dispatch(
    //   getTeacherStudentAttendanceList(
    //     user.user_institute,
    //     user._id,
    //     _classroomId,
    //     _subjectId,
    //     currentDate
    //   )
    // );
    setPropDate(!propDate)
    if (window.location.pathname.includes("teacher")) {
      if (_subjectId) {
        dispatch(
          getTeacherStudentAttendanceList(
            "teacherClassroomSubject",
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            currentDate
          )
        );
        setCssDate(currentDate);
      } else {
        dispatch(
          getTeacherStudentAttendanceList(
            "teacherClassroom",
            user.user_institute,
            user._id,
            _classroomId,
            "",
            currentDate
          )
        );
        setCssDate(currentDate);
      }
    } else if (window.location.pathname.includes("admin")) {
      if (_subjectId) {
        dispatch(
          getTeacherStudentAttendanceList(
            "adminClassroomSubject",
            user.user_institute,
            "",
            _classroomId,
            _subjectId,
            currentDate
          )
        );
        setCssDate(currentDate);
      } else {
        dispatch(
          getTeacherStudentAttendanceList(
            "adminClassroom",
            user.user_institute,
            "",
            _classroomId,
            "",
            currentDate
          )
        );
        setCssDate(currentDate);
      }
    }
  };

  const deleteSuccessApiHit = () => {
    setPropDate(!propDate)
    if (window.location.pathname.includes("teacher")) {
      if (_subjectId) {
        dispatch(
          getTeacherStudentAttendanceList(
            "teacherClassroomSubject",
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            currentDate
          )
        );
        setCssDate(currentDate);
      } else {
        dispatch(
          getTeacherStudentAttendanceList(
            "teacherClassroom",
            user.user_institute,
            user._id,
            _classroomId,
            "",
            currentDate
          )
        );
        setCssDate(currentDate);
      }
    } else if (window.location.pathname.includes("admin")) {
      if (_subjectId) {
        dispatch(
          getTeacherStudentAttendanceList(
            "adminClassroomSubject",
            user.user_institute,
            "",
            _classroomId,
            _subjectId,
            currentDate
          )
        );
        setCssDate(currentDate);
      } else {
        dispatch(
          getTeacherStudentAttendanceList(
            "adminClassroom",
            user.user_institute,
            "",
            _classroomId,
            "",
            currentDate
          )
        );
        setCssDate(currentDate);
      }
    }
  };

  useEffect(() => {
    let field = getDanamicCalenderDate(currentDate);
    setCurrentDate(field.newDate ? field.newDate : new Date());
    setDates(field.Dates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const monthFilter = (values) => {
    let field = getDanamicCalenderDate(changedatavalue(values, currentDate));
    setCurrentDate(field.newDate ? field.newDate : new Date());
    setDates(field.Dates);
  };
  const [cssDate, setCssDate] = useState(new Date());

  useEffect(() => {
    if (window.location.pathname.includes("teacher")) {
      if (_subjectId) {
        dispatch(
          getTeacherStudentAttendanceList(
            "teacherClassroomSubject",
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            currentDate
          )
        );
        setCssDate(currentDate);
      } else {
        dispatch(
          getTeacherStudentAttendanceList(
            "teacherClassroom",
            user.user_institute,
            user._id,
            _classroomId,
            "",
            currentDate
          )
        );
        setCssDate(currentDate);
      }
    } else if (window.location.pathname.includes("admin")) {
      if (_subjectId) {
        dispatch(
          getTeacherStudentAttendanceList(
            "adminClassroomSubject",
            user.user_institute,
            "",
            _classroomId,
            _subjectId,
            currentDate
          )
        );
        setCssDate(currentDate);
      } else {
        dispatch(
          getTeacherStudentAttendanceList(
            "adminClassroom",
            user.user_institute,
            "",
            _classroomId,
            "",
            currentDate
          )
        );
        setCssDate(currentDate);
      }
    }
  }, [
    _classroomId,
    _subjectId,
    currentDate,
    dispatch,
    user._id,
    user.user_activerole,
    user.user_institute,
  ]);

  const filteredDatesForMobileView = (dbDate, value) => {
    const filterData =
      dbDate && dates.length
        ? dates.find((item) => {
          return dbDate && dbDate === item.date && item.date
            ? `${item.date}-${item.day}`
            : "";
        })
        : "";
    if (filterData && filterData !== undefined) {
      if (value === "date") {
        return filterData ? filterData.date : "";
      } else {
        return filterData.day ? filterData.day : "";
      }
    }
  };
  useEffect(() => {
    return () => {
      dispatch(resetClassroomsData())
    }
  }, [dispatch])
  useEffect(() => {
    dispatch(getClassroomDataInviteFaculty(_classroomId));
  }, [_classroomId, _subjectId, dispatch]);
  return (
    <React.Fragment>
      <React.Fragment>
        <>
        <TeacherAttendanceListBreadcrumbs />
          <TeacherAttendanceListHeader
            modal={() => handleModal("")}
            changeDateValue={monthFilter}
            currentDate={currentDate}
            propDate={propDate}
          />
          {attendanceListSuccess ? (
            <div className="Attendance-List-View-Wrapper">
              {attendanceListSuccess ? (
                attendanceList.length ? (
                  <table>
                    <thead>
                      <tr>
                        <th>
                          {attendanceListSuccess && attendanceList.length}{" "}
                          Students
                        </th>
                        {dates.length
                          ? dates.map((item, key) => {
                            return (
                              <th key={key}>
                                <div className="table-date">
                                  <div className="text-xxs w-500">
                                    {item.date}
                                  </div>{" "}
                                  <div className="text-xxs w-400">
                                    {item.day}
                                  </div>{" "}
                                </div>
                              </th>
                            );
                          })
                          : ""}
                      </tr>
                    </thead>

                    <tbody>
                      <React.Fragment>
                        {attendanceList.map((item) => {
                          return (
                            <React.Fragment>
                              <tr>
                                <th>
                                  <div className="scroll-nav-tab-wrapper">
                                    <div className="Attendance-ProfileDetail">
                                      <ImageViewer
                                        object={item.profile_picture
                                        }
                                        defaultImage={DummyProfile}
                                        alt="Profile"
                                      />
                                      <div className="scroll-nav-tab-wrapper">
                                        <div className="ProfileDetail">
                                          <p className="text-rgf w-600">
                                            {item.fullname}
                                          </p>
                                          <p
                                            className="text-2xs primary w-500"
                                            title={item.email}
                                          >
                                            {item.email}
                                          </p>
                                          <p className="text-xxs primary w-500">
                                            {item.admission_no}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </th>
                                {item.attendanceMark.length
                                  ? item.attendanceMark.map(
                                    (studentData, key) => {
                                      return (
                                        <React.Fragment key={key}>
                                          {!studentData.attendanceInfo
                                            .length ? (
                                            <td
                                              className={
                                                cssDate.setDate(
                                                  studentData.day
                                                ) > new Date() &&
                                                  (studentData.attendanceInfo.every(
                                                    (i) =>
                                                      i["status"] !==
                                                      "LeaveRequest"
                                                  ) ||
                                                    studentData.attendanceInfo.every(
                                                      (i) =>
                                                        i["status"] !== "Leave"
                                                    ))
                                                  ? "disable"
                                                  : ""
                                              }
                                              data-label={`${filteredDatesForMobileView(
                                                studentData.day,
                                                "date"
                                              )}- ${filteredDatesForMobileView(
                                                studentData.day,
                                                "day"
                                              )}`}
                                            >
                                              <div
                                                className="w-500"
                                                onClick={() =>
                                                  handleModal(studentData.day)
                                                }
                                              >
                                                -
                                              </div>
                                              {/* <div className="Nill-Period-Cal text-2xs w-500">
                                                  <span className="base">8</span>/12
                                                </div> */}
                                            </td>
                                          ) : studentData.attendanceInfo
                                            .length ? (
                                            <React.Fragment>
                                              {studentData.attendanceInfo.every(
                                                (i) =>
                                                  i["status"] === "Absent"
                                              ) ? (
                                                <React.Fragment>
                                                  {studentData.attendanceInfo.every(
                                                    (i) => i["_id"]
                                                  ) ? (
                                                    <td
                                                      onClick={() =>
                                                        ManagePeriods(
                                                          item,
                                                          studentData.day,
                                                          studentData.attendanceInfo
                                                        )
                                                      }
                                                      data-label={`${filteredDatesForMobileView(
                                                        studentData.day,
                                                        "date"
                                                      )}- ${filteredDatesForMobileView(
                                                        studentData.day,
                                                        "day"
                                                      )}`}
                                                    >
                                                      <div className="Absent w-500">
                                                        A
                                                      </div>
                                                    </td>
                                                  ) : (
                                                    <td
                                                      // onClick={() =>
                                                      //   ManagePeriods(
                                                      //     item,
                                                      //     studentData.day,
                                                      //     studentData.attendanceInfo
                                                      //   )
                                                      // }
                                                      data-label={`${filteredDatesForMobileView(
                                                        studentData.day,
                                                        "date"
                                                      )}- ${filteredDatesForMobileView(
                                                        studentData.day,
                                                        "day"
                                                      )}`}
                                                    >
                                                      <div className="Absent w-500">
                                                        A
                                                      </div>
                                                    </td>
                                                  )}
                                                </React.Fragment>
                                              ) : studentData.attendanceInfo.every(
                                                (i) =>
                                                  i["status"] ===
                                                  "LeaveRejected"
                                              ) ? (
                                                <td
                                                  className={
                                                    cssDate.setDate(
                                                      studentData.day
                                                    ) > new Date() &&
                                                      (studentData.attendanceInfo.every(
                                                        (i) =>
                                                          i["status"] !==
                                                          "LeaveRequest"
                                                      ) ||
                                                        studentData.attendanceInfo.every(
                                                          (i) =>
                                                            i["status"] !==
                                                            "Leave"
                                                        ))
                                                      ? "disable"
                                                      : ""
                                                  }
                                                  onClick={() =>
                                                    handleModal(
                                                      studentData.day
                                                    )
                                                  }
                                                >
                                                  <div className="w-500">
                                                    -
                                                  </div>
                                                </td>
                                              ) : studentData.attendanceInfo.every(
                                                (i) =>
                                                  i["status"] === "Leave"
                                              ) ? (
                                                <td
                                                  onClick={() =>
                                                    ManageLR(
                                                      studentData.attendanceInfo.map(
                                                        (item) => {
                                                          return item.leaveId;
                                                        }
                                                      )
                                                    )
                                                  }
                                                >
                                                  <div className="primary w-500">
                                                    L
                                                  </div>
                                                </td>
                                              ) : studentData.attendanceInfo.every(
                                                (i) =>
                                                  i["status"] === "ManualLeave"
                                              ) ? (
                                                <td
                                                >
                                                  <div className="primary w-500">
                                                    ML
                                                  </div>
                                                </td>
                                              )
                                                : studentData.attendanceInfo.every(
                                                  (i) =>
                                                    i["status"] ===
                                                    "LeaveRequest"
                                                ) ? (
                                                  <td
                                                    onClick={() =>
                                                      ManageLR(
                                                        studentData.attendanceInfo.map(
                                                          (item) => {
                                                            return item.leaveId;
                                                          }
                                                        )
                                                      )
                                                    }
                                                    data-label={`${filteredDatesForMobileView(
                                                      studentData.day,
                                                      "date"
                                                    )} - ${filteredDatesForMobileView(
                                                      studentData.day,
                                                      "day"
                                                    )}`}
                                                  >
                                                    <div className="bsPink w-500">
                                                      LR
                                                    </div>
                                                  </td>
                                                ) : studentData.attendanceInfo.every(
                                                  (i) =>
                                                    i["status"] === "Holiday"
                                                ) ? (
                                                  <td
                                                    // onClick={() => ManageLR(studentData.attendanceInfo.map((item) => {
                                                    //   return item.leaveId
                                                    // }))}
                                                    data-label={`${filteredDatesForMobileView(
                                                      studentData.day,
                                                      "date"
                                                    )} - ${filteredDatesForMobileView(
                                                      studentData.day,
                                                      "day"
                                                    )}`}
                                                  >
                                                    <div className="HalfDay w-500">
                                                      H
                                                    </div>
                                                  </td>
                                                ) : (
                                                  <td
                                                    data-label={`${filteredDatesForMobileView(
                                                      studentData.day,
                                                      "date"
                                                    )} - ${filteredDatesForMobileView(
                                                      studentData.day,
                                                      "day"
                                                    )}`}
                                                  >
                                                    <div className="Present w-500">
                                                      P
                                                    </div>
                                                    <div
                                                      className="S-Period-Cal text-2xs w-500"
                                                      onClick={() =>
                                                        ManagePeriods(
                                                          item,
                                                          studentData.day,
                                                          studentData.attendanceInfo
                                                        )
                                                      }
                                                    >
                                                      <span className="secondary">
                                                        {
                                                          studentData.attendanceInfo.filter(
                                                            (item) =>
                                                              item.status ===
                                                              "Present"
                                                          ).length
                                                        }
                                                      </span>
                                                      /
                                                      {
                                                        studentData
                                                          .attendanceInfo.length
                                                      }
                                                    </div>
                                                  </td>
                                                )}
                                            </React.Fragment>
                                          ) : (
                                            ""
                                          )}
                                        </React.Fragment>
                                      );
                                    }
                                  )
                                  : ""}
                              </tr>
                            </React.Fragment>
                          );
                        })}
                      </React.Fragment>
                    </tbody>
                  </table>
                ) : (
                  <NoDataAvailable title="No Records Found." />
                )
              ) : (
                <div className="loadingGridData">
                  <i className="ed-loadingGrid"></i>
                </div>
              )}
            </div>
          ) : (
            <NoDataAvailable title="Loading..." />
          )}
        </>
        {manageLR && (
          <TeacherLeaveRequestModal
            manageLR={manageLR}
            leaveId={leaveId}
            closeModalState={() => closeModalState("Leave")}
            updateLeaveStatus={updateStatusInList}
          />
        )}
        {postAttendanceModal && (
          <CreateAttendance
            onclose={() => closeModalState("Create")}
            show={postAttendanceModal}
            classroomId={_classroomId}
            propDate={propDate}
            getApiHit={deleteSuccessApiHit}
          />
        )}
        {managePeriods && (
          <EditAttendance
            show={managePeriods}
            onclose={closePeriodsState}
            SingleStudentPeriodData={SingleStudentPeriodData}
            editPropDate={editPropDate}
          />
        )}
      </React.Fragment>
    </React.Fragment>
  );
};

export default TeacherAttendanceList;
