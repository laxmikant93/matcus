import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import SingleSelectDropdown from "../../../../Common/Form/SingleSelectDropdown";
import SearchControl from "../../../../Common/SearchControl";
import "../../Attendance.scss";
import {
  getTeacherLeaveRequestList,
  searchStudentLeaveRequestList,
} from "../../../../store/actions/TeacherAttendance";
import { DynamicCourseHeader } from "../../../../Common/UserElement";
const LeaveRequestListHeader = ({ changeDateValue, currentDate }) => {
  const { user, ClassroomDetailSuccess, ClassroomDetail } = useSelector(
    (state) => {
      return {
        user: state.user,
        ClassroomDetailSuccess:
          state.teachersubjectlist.TeacherClassroomData.success,
        ClassroomDetail: state.teachersubjectlist.TeacherClassroomData.data,
      };
    }
  );
  const dispatch = useDispatch();
  const { _classroomId } = useParams();
  const selectGroup = ["Pending", "Approved", "Rejected"];

  const filterValues = [];

  const SingleSelectHandel = (value) => {
    const selectedValue = value;
    switch (selectedValue) {
      case "ALL": {
        dispatch(
          getTeacherLeaveRequestList(
            user.user_institute,
            _classroomId,
            currentDate
          )
        );
        break;
      }
      case "Pending": {
        dispatch(
          searchStudentLeaveRequestList(
            user.user_institute,
            _classroomId,
            currentDate,
            "status",
            "pending"
          )
        );
        break;
      }
      case "Approved": {
        dispatch(
          searchStudentLeaveRequestList(
            user.user_institute,
            _classroomId,
            currentDate,
            "status",
            "approved"
          )
        );
        break;
      }
      case "Rejected": {
        dispatch(
          searchStudentLeaveRequestList(
            user.user_institute,
            _classroomId,
            currentDate,
            "status",
            "rejected"
          )
        );
        break;
      }

      default:
    }
  };
  const [searchTerm, setSearchTerm] = useState("");
  let typing;

  const handleSearch = (event) => {
    event.preventDefault();
    clearTimeout(typing);
    typing = setTimeout(() => {
      setSearchTerm(event.target.value);
    }, 400);

    if (!event.target.value) {
      clearTimeout(typing);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    dispatch(
      searchStudentLeaveRequestList(
        user.user_institute,
        _classroomId,
        currentDate,
        "search",
        searchTerm
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {user.user_activeRole === process.env.REACT_APP_TEACHER ? (
          <BreadcrumbItem
            to="/dashboard/attendance-teacher-classroomSubjectlist"
            title="Attendance"
          />
        ) : (
          <BreadcrumbItem
            to="/admin-attendance-classroomSubjectlist"
            title="Attendance"
          />
        )}
        <BreadcrumbItem to="#" title="Leave Request" />
      </Breadcrumb>
      <div className="PageTopHead mt-10">
        <div className="PTH-Item">
          <p className="text-sm w-400">Leave Request</p>
          <p className="text-xxs w-400">
            <DynamicCourseHeader /> &nbsp;-&nbsp;
            <strong>
              {ClassroomDetailSuccess && ClassroomDetail.coursename}
            </strong>
          </p>
        </div>
      </div>
      <div className="PageTopHead PTH-T-LR-ListHead mt-10">
        <div className="PTH-Item">
          <SingleSelectDropdown
            SingleSelectHandel={SingleSelectHandel}
            selectGroup={selectGroup}
            filterValues={filterValues}
          />
        </div>
        <div className="PTH-Item">
          <div className="LeftRightCalender">
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
              className="RightDateIcon text-sm w-500"
            >
              &#62;
            </button>
          </div>
        </div>
        <div className="PTH-Item P-Right">
          <SearchControl
            classNameWrappper="tableSearchbar"
            placeholder="Search Student"
            onChange={handleSearch}
            onKeyUp={handleSearch}
          />
        </div>

        {/* <div className="PTH-Item">
          <AppLink to="/" className="LeaveRequestButton">
            Leave Request
            <span className="LRBtnNumber">324</span>
          </AppLink>
        </div> */}
        {/* <div className="PTH-Item">
          <button type="button" className="button btn-sm button-base">
            Holidays Calender
          </button>
        </div> */}
      </div>
    </React.Fragment>
  );
};
export default LeaveRequestListHeader;
