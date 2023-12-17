import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import { getStudentLeaveRequestList } from "../../../store/actions/StudentAttendance";

const StudentAttendanceHeader = ({ currentDate, changeDateValue }) => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   let thisDate = new Date();
  //   setDisabledState(
  //     moment(thisDate).format("MM-YYYY") ===
  //       moment(currentDate).format("MM-YYYY")
  //   );
  // }, [currentDate]);
  const { _classroomId } = useParams();
  const history = useNavigate();
  // const [disabledState, setDisabledState] = useState(false);
  const {
    user,
    ClassroomDetailSuccess,
    ClassroomDetail,
    requestList,
    requestListSuccess,
    studentSubjectAttendance,
    studentSubjectAttendanceSuccess,
  } = useSelector((state) => {
    return {
      user: state.user,
      ClassroomDetailSuccess:
        state.teachersubjectlist.TeacherClassroomData.success,
      ClassroomDetail: state.teachersubjectlist.TeacherClassroomData.data,
      requestList: state.studentAttendance.studentRequestList.data,
      requestListSuccess: state.studentAttendance.studentRequestList.success,
      studentSubjectAttendance:
        state.studentAttendance.studentAttendanceList.data,
      studentSubjectAttendanceSuccess:
        state.studentAttendance.studentAttendanceList.success,
    };
  });

  const leaveRequest = () => {
    history(`/dashboard/student-new-leave-request/${_classroomId}`);
  };
  const viewLeaves = () => {
    history(`/dashboard/student-view-leaves/${_classroomId}`);
  };

  const totalPeriodsOfMonth = () => {
    let singleDayPeriods =
      studentSubjectAttendanceSuccess &&
      studentSubjectAttendance.length &&
      studentSubjectAttendance.map((details) => {
        return details.totalPeriod;
      });
    const totalPeriods = singleDayPeriods.length
      ? singleDayPeriods.reduce((a, b) => a + b, 0)
      : "";
    const validTotalPeriods = totalPeriods ? totalPeriods : 0;
    return validTotalPeriods;
  };
  const [totalAllSubjectsAttendedPeriods, setTotalAllSubjectsAttendedPeriods] =
    useState("");

  useEffect(() => {
    let singleMonth =
      studentSubjectAttendanceSuccess &&
      studentSubjectAttendance.length &&
      studentSubjectAttendance.map((detail) => {
        return detail.attendanceMark.map((item) => {

          return item.attendanceInfo.filter((item) => item.status === "Present")
            .length;
        });
      });

    let allSubjectPeriods = singleMonth.length
      ? singleMonth.map((item) => {
        return item.length ? item.reduce((a, b) => a + b, 0) : "";
      })
      : "";

    const totalAttendedPeriods = allSubjectPeriods.length
      ? allSubjectPeriods.reduce((a, b) => a + b, 0)
      : "";
    const validTotalAttendedPeriods = totalAttendedPeriods
      ? totalAttendedPeriods
      : 0;
    setTotalAllSubjectsAttendedPeriods(validTotalAttendedPeriods);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentSubjectAttendanceSuccess]);

  useEffect(() => {
    dispatch(
      getStudentLeaveRequestList(
        user.user_institute,
        user._id,
        _classroomId,
        currentDate
      )
    );
  }, [_classroomId, currentDate, dispatch, user._id, user.user_institute]);
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem
          to="/dashboard/attendance-student-classroomlist"
          title="Attendance"
        />
        <BreadcrumbItem
          to={`/dashboard/student-subjects-attendance/${_classroomId}`}
          title={ClassroomDetailSuccess && ClassroomDetail.coursename}
        />
      </Breadcrumb>
      <div className="Attendance-ListView-Head mt-20">
        <div className="HeadNameCst">
          <p className="text-sm w-400">Attendance</p>
          <p className="text-xxs w-500">
            {ClassroomDetailSuccess && ClassroomDetail.coursename}
          </p>
        </div>
        <div className="scroll-nav-tab-wrapper">
          <ul className="Attendance-List-labeling">
            <li className="text-2xs w-500">
              <span className="secondary">
                <i className="disc"></i>P&nbsp;
              </span>
              -&nbsp;Present
            </li>
            <li className="text-2xs w-500">
              <span className="red">
                <i className="disc"></i>A&nbsp;
              </span>
              -&nbsp;Absent
            </li>
            <li className="text-2xs w-500">
              <span className="primary">
                <i className="disc"></i>L&nbsp;
              </span>
              -&nbsp;Leave Approved
            </li>
            <li className="text-2xs w-500">
              <span className="primary">
                <i className="disc"></i>ML&nbsp;
              </span>
              -&nbsp;Manual Leave
            </li>
            <li className="text-2xs w-500">
              <span className="bsPink">
                <i className="disc"></i>LR&nbsp;
              </span>
              -&nbsp;Leave Request
            </li>
            <li className="text-2xs w-500">
              <span className="gray">
                <i className="disc"></i>H&nbsp;
              </span>
              -&nbsp;Holiday
            </li>
          </ul>
        </div>
      </div>
      <div className="PageTopHead PTH-Student-Attendance-ListView mt-20">
        <div className="PTH-Item">
          <div className="LeftRightCalender">
            {/* <InputDatePicker /> */}
            <button
              type="button"
              onClick={() => changeDateValue("minus")}
              className="LeftDateIcon text-sm w-500"
            >
              &#60;
            </button>
            <div className="DateCntMain">
              {moment(currentDate).format("MMMM-YYYY")}
            </div>
            <button
              type="button"
              onClick={() => changeDateValue("plus")}
              // disabled={disabledState}
              className="RightDateIcon text-sm w-500"
            >
              &#62;
            </button>
          </div>
        </div>
        <div className="PTH-Item">
          <p className="text-xxs">
            <span className="secondary">{totalAllSubjectsAttendedPeriods}</span>
            /{totalPeriodsOfMonth()} Periods
          </p>
        </div>
        <div className="PTH-Item P-Right">
          <button type="button" onClick={viewLeaves} className="VL-Oval_Btn">
            View Leaves <span>{requestListSuccess && requestList.length}</span>
          </button>
        </div>
        <div className="PTH-Item P-Right">
          <button
            type="button"
            className="button button-base btn-oval btn-sm"
            onClick={leaveRequest}
          >
            <span className="text-xs">&#43;</span>&nbsp;New Leave Request
          </button>
        </div>
        {/* <div className="PTH-Item">
          <button
            type="button"
            className="button button-base btn-oval btn-sm"
          >
            Holidays Calendar
          </button>
        </div> */}
      </div>
    </React.Fragment>
  );
};
export default StudentAttendanceHeader;
