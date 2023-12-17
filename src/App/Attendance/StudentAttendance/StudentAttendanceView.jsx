/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "../../../Common/Card";
import CardBody from "../../../Common/Card/CardBody";
import CardHeader from "../../../Common/Card/CardHeader";
import StudentTheme from "../../../Common/Theme/StudentTheme";

import NoDataAvailable from "../../../Common/NoDataAvailable";
import { getStudentAttendanceList } from "../../../store/actions/StudentAttendance";
import "../Attendance.scss";
import { changedatavalue, getDanamicCalenderDate } from "../commonFunctions";

import { getTeacherClassroomSpecificData } from "../../../store/actions/teachersubjectlist";
import StudentSubjectAttendanceViewMultiModal from "./StudentSubjectAttendanceViewMultiModal";
import StudentAttendanceHeader from "./StudentAttendanceHeader";
const StudentAttendanceView = () => {
  const [showSubjectAttendance, hideSubjectAttendance] = useState(-1);
  const dispatch = useDispatch();
  const { _classroomId } = useParams();
  const { user, studentSubjectAttendance, studentSubjectAttendanceSuccess } =
    useSelector((state) => {
      return {
        user: state.user,
        studentSubjectAttendance:
          state.studentAttendance.studentAttendanceList.data,
        studentSubjectAttendanceSuccess:
          state.studentAttendance.studentAttendanceList.success,
      };
    });
  const [dates, setDates] = useState([]);
  let firstDate = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(firstDate.getFullYear(), firstDate.getMonth(), 1)
  );

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
  function showHideSubjectsAttendance(index) {
    hideSubjectAttendance(showSubjectAttendance === index ? -1 : index);
  }
  const [AttendanceCalc, SetAttendanceCalc] = useState();
  const [periodsData, setPeriodsData] = useState("");
  const [courseDetails, setcourseDetails] = useState("");
  const ManageAttendanceCalc = (data, day, attendanceInfo) => {
    SetAttendanceCalc(!AttendanceCalc);
    setPeriodsData({
      data: data,
      day: day,
      attendanceInfo: attendanceInfo,
    });
  };
  const closeModalState = () => {
    SetAttendanceCalc(!AttendanceCalc);
  };

  const totalAttendedPeriods = (item) => {
    let singleDayPeriods =
      item.length &&
      item.map((details) => {
        return details.attendanceInfo.filter(
          (item) => item.status === "Present"
        ).length;
      });
    const totalAttendedPeriods = singleDayPeriods.reduce((a, b) => a + b, 0);
    const validTotalAttendedPeriods = totalAttendedPeriods
      ? totalAttendedPeriods
      : 0;
    return validTotalAttendedPeriods;
  };
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
    dispatch(
      getStudentAttendanceList(
        user.user_institute,
        user._id,
        _classroomId,
        currentDate
      )
    );
    dispatch(getTeacherClassroomSpecificData(_classroomId));
  }, [_classroomId, currentDate, dispatch, user._id, user.user_institute]);
  return (
    <StudentTheme>
      <StudentAttendanceHeader
          changeDateValue={monthFilter}
          currentDate={currentDate}
        />
        <div className="S-Attendance-ClassroomList-Wrap">
          {studentSubjectAttendanceSuccess ? (
            studentSubjectAttendance.length ? (
              studentSubjectAttendance.map((item) => {
                return (
                  <Card>
                    <CardHeader>
                      <p
                        className={`HeaderCnt text-xs w-500 ${showSubjectAttendance === item._id ? "active" : ""
                          }`}
                        onClick={() => showHideSubjectsAttendance(item._id)}
                      >
                        {item.classroomname}
                        <span className="text-xxs w-400 ">
                          &nbsp; &nbsp;
                          <span className="secondary w-600">
                            {totalAttendedPeriods(item.attendanceMark)}
                          </span>
                          /{`${item.totalPeriod} `}
                          Periods
                        </span>
                      </p>
                    </CardHeader>
                    {showSubjectAttendance === item._id && (
                      <CardBody>
                        <div className="Subject-Attendance-table">
                          <table>
                            <thead>
                              <tr>
                                {dates.length
                                  ? dates.map((item) => {
                                    return (
                                      <th>
                                        <div className="table-date">
                                          <div className="text-xxs w-500">
                                            {item.date}
                                          </div>
                                          <div className="text-xxs w-400">
                                            {item.day}
                                          </div>
                                        </div>
                                      </th>
                                    );
                                  })
                                  : ""}
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                {item.attendanceMark.length
                                  ? item.attendanceMark.map((studentData) => {
                                    return (
                                      <React.Fragment>
                                        {!studentData.attendanceInfo
                                          .length ? (
                                          <td
                                            data-label={`${filteredDatesForMobileView(
                                              studentData.day &&
                                              studentData.day,
                                              "date"
                                            )} - ${filteredDatesForMobileView(
                                              studentData.day &&
                                              studentData.day,
                                              "day"
                                            )}`}
                                          >
                                            <div className="base">-</div>
                                          </td>
                                        ) : studentData.attendanceInfo
                                          .length ? (
                                          <React.Fragment>
                                            {studentData.attendanceInfo.every(
                                              (i) => i["status"] === "Absent"
                                            ) ? (
                                              <td
                                                data-label={`${filteredDatesForMobileView(
                                                  studentData.day &&
                                                  studentData.day,
                                                  "date"
                                                )} - ${filteredDatesForMobileView(
                                                  studentData.day &&
                                                  studentData.day,
                                                  "day"
                                                )}`}
                                              >
                                                <div className="red">A</div>
                                              </td>
                                            ) : studentData.attendanceInfo.every(
                                              (i) => i["status"] === "Leave"
                                            ) ? (
                                              <td
                                                data-label={`${filteredDatesForMobileView(
                                                  studentData.day &&
                                                  studentData.day,
                                                  "date"
                                                )} - ${filteredDatesForMobileView(
                                                  studentData.day &&
                                                  studentData.day,
                                                  "day"
                                                )}`}
                                              >
                                                <div className="primary">
                                                  L
                                                </div>
                                              </td>
                                            ) : studentData.attendanceInfo.every(
                                              (i) =>
                                                i["status"] ===
                                                "ManualLeave"
                                            ) ? (
                                              <td
                                                data-label={`${filteredDatesForMobileView(
                                                  studentData.day &&
                                                  studentData.day,
                                                  "date"
                                                )} - ${filteredDatesForMobileView(
                                                  studentData.day &&
                                                  studentData.day,
                                                  "day"
                                                )}`}
                                              >
                                                <div className="primary">
                                                  ML
                                                </div>
                                              </td>
                                            ) : studentData.attendanceInfo.every(
                                              (i) =>
                                                i["status"] ===
                                                "LeaveRequest"
                                            ) ? (
                                              <td
                                                data-label={`${filteredDatesForMobileView(
                                                  studentData.day &&
                                                  studentData.day,
                                                  "date"
                                                )} - ${filteredDatesForMobileView(
                                                  studentData.day &&
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
                                            ) : studentData.attendanceInfo.every(
                                              (i) =>
                                                i["status"] ===
                                                "LeaveRejected"
                                            ) ? (
                                              <td
                                                data-label={`${filteredDatesForMobileView(
                                                  studentData.day &&
                                                  studentData.day,
                                                  "date"
                                                )} - ${filteredDatesForMobileView(
                                                  studentData.day &&
                                                  studentData.day,
                                                  "day"
                                                )}`}
                                              >
                                                <div className="base">-</div>
                                              </td>
                                            ) : (
                                              <td
                                                data-label={`${filteredDatesForMobileView(
                                                  studentData.day &&
                                                  studentData.day,
                                                  "date"
                                                )} - ${filteredDatesForMobileView(
                                                  studentData.day &&
                                                  studentData.day,
                                                  "day"
                                                )}`}
                                              >
                                                <div className="secondary">
                                                  P
                                                </div>
                                                <div
                                                  className="AttendanceCalc-S"
                                                  onClick={() =>
                                                    ManageAttendanceCalc(
                                                      item,
                                                      studentData.day,
                                                      studentData.attendanceInfo
                                                    )
                                                  }
                                                >
                                                  <span className="secondary">
                                                    {" "}
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
                                                    studentData.attendanceInfo
                                                      .length
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
                                  })
                                  : ""}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </CardBody>
                    )}
                  </Card>
                );
              })
            ) : (
              <NoDataAvailable title="No Records Found." />
            )
          ) : (
            <div className="loadingGridData">
              <i className="ed-loadingGrid"></i>
            </div>
          )}
        </div>
        {AttendanceCalc && (
          <StudentSubjectAttendanceViewMultiModal
            ManageAttendanceCalc={AttendanceCalc}
            closeModalState={() => closeModalState()}
            periodsData={periodsData}
          />
        )}
    </StudentTheme>
  );
};

export default StudentAttendanceView;
