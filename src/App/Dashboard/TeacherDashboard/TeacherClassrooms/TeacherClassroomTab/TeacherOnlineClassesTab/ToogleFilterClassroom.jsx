/* eslint-disable no-unused-vars */
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import InputDatePicker from '../../../../../../Common/Form/InputDatePicker';
import Calender from '../../../../../../Common/Icon/CalenderIcon';
import { filterCreatedBy, getFilteredClass } from '../../../../../../store/actions/onlineClasses';
import SingleSelectDropdown from "../../../../../../Common/Form/SingleSelectDropdown";
import MultipleSelectDropDownCommon from "../../../../../../Common/Form/MultiSelectDropDownCommon";
import refresh from "./icon-refresh.svg"
import CourseClassCheckboxFilter from '../../../../../../Common/CourseClassCheckboxFilter';
import { getClassroomViewList, SortOnlineClassClassroom } from '../../../../../../store/actions/classroomdetail';
import { useParams } from 'react-router-dom';

const ToogleFilterClassroom = () => {
  const dispatch = useDispatch();
  const {
    onlineClasses,
    users,
    classroomCreatedByList,
  } = useSelector((state) => {
    return {
      onlineClasses: state.onlineClasses.list.data,
      courseAndClassroom: state.onlineClasses.courseAndClassroom,
      onlineclassSuccess: state.onlineClasses.list.success,
      classroomCreatedByListSuccess:
        state.onlineClasses.assignedClassroom.success,
      classroomCreatedByList: state.onlineClasses.assignedClassroom.data,
      users: state.user,
      courseList: state.classroomassigned.courseList,
      isSuccess: state.zoomapi.success,
      // isTokenExpired: state.zoomapi.GoogleMeetData,
    };
  });
  const InsId = useSelector((state) => state.user.user_institute);

  // useEffect(() => {
  //   dispatch(getFilteredClass(users.user_institute, InsId, "search", searchTerm));
  // }, [dispatch, users.user_institute, InsId, searchTerm]);
  const ToggleValue = "Online Classes";

  const selectGroup = [
    "Created On",
    "Recent to Old",
    "Old to Recent",
    "Duration",
    "High to Low 1",
    "Low to High 1",
    "Meeting On",
    "Zoom",
    "Google Meet",
    "Attendees",
    "High to Low 2",
    "Low to High 2",
  ];
  const selectGroup2 = ["One Time", "Recurring"];

  const filterValues = ["Created On", "Duration", "Meeting On", "Attendees"];
  const filterValues2 = [2, 8];

  const OnSelectedValueCreatedBy = (val) => {
    dispatch(filterCreatedBy(users.user_institute, InsId, val));
  };

  const [activeToggleName, setActiveToggleName] = useState("All");
  const { subjectId } = useParams();

  const SortBySelectHandle = (value, query) => {
    switch (value) {
      case "ALL": {
        dispatch(getClassroomViewList(users.user_institute, subjectId, ToggleValue));
        break;
      }
      case "Recent to Old": {
        dispatch(SortOnlineClassClassroom(users.user_institute, subjectId, "createdOn", "rto", users._id));
        break;
      }
      case "Old to Recent": {
        dispatch(SortOnlineClassClassroom(users.user_institute, subjectId, "createdOn", "otr", users._id));
        break;
      }
      case "High to Low 1": {
        dispatch(SortOnlineClassClassroom(users.user_institute, subjectId, "duration", "htl", users._id));
        break;
      }
      case "Low to High 1": {
        dispatch(SortOnlineClassClassroom(users.user_institute, subjectId, "duration", "lth", users._id));
        break;
      }
      case "Zoom": {
        dispatch(SortOnlineClassClassroom(users.user_institute, subjectId, "meetingOn", "Zoom", users._id));
        break;
      }
      case "Google Meet": {
        dispatch(SortOnlineClassClassroom(users.user_institute, subjectId, "meetingOn", "GoogleMeet", users._id));
        break;
      }
      case "High to Low 2": {
        dispatch(SortOnlineClassClassroom(users.user_institute, subjectId, "attendees", "htl", users._id));
        break;
      }
      case "Low to High 2": {
        dispatch(SortOnlineClassClassroom(users.user_institute, subjectId, "attendees", "lth", users._id));
        break;
      }
      default:
        return;
    }
  };
  const SingleSelectHandel = (value, query) => {
    switch (value) {
      case "All": {
        dispatch(getClassroomViewList(users.user_institute, subjectId, ToggleValue, users._id));
        setActiveToggleName(value);
        break;
      }
      case "Today": {
        dispatch(SortOnlineClassClassroom(users.user_institute, subjectId, "timeStatus", "today", users._id));
        setActiveToggleName("today");
        break;
      }
      case "Tomorrow": {
        dispatch(SortOnlineClassClassroom(users.user_institute, subjectId, "timeStatus", "tomorrow", users._id));
        setActiveToggleName("tomorrow");
        break;
      }
      case "This_Week": {
        dispatch(SortOnlineClassClassroom(users.user_institute, subjectId, "timeStatus", "thisWeek", users._id));
        setActiveToggleName("thisWeek");
        break;
      }
      case "This_Month": {
        dispatch(SortOnlineClassClassroom(users.user_institute, subjectId, "timeStatus", "thisMonth", users._id));
        setActiveToggleName('thisMonth');
        break;
      }
      case "CalenderIcon": {
        // dispatch(SortOnlineClassClassroom(users.user_institute, subjectId, ToggleValue, query, value));
        setActiveToggleName(value);
        break;
      }
      case "One Time": {
        dispatch(SortOnlineClassClassroom(users.user_institute, subjectId, "classType", 2, users._id));
        // setActiveToggleName("thisMonth");
        break;
      }
      case "Recurring": {
        dispatch(SortOnlineClassClassroom(users.user_institute, subjectId, "classType", 8, users._id));
        // setActiveToggleName("thisMonth");
        break;
      }
      default:
        dispatch(getClassroomViewList(users.user_institute, subjectId, ToggleValue, users._id));
    }
  };

  const filterCourseAndClassroom = (selectedData) => {
    selectedData.courseList.length !== 0 &&
      selectedData.classRoomList.length !== 0 &&
      dispatch(
        getClassroomViewList(
          users.user_institute,
          InsId,
          selectedData.courseList,
          selectedData.classRoomList
        )
      );
  };

  const [startDate, setStartDate] = useState("");

  useEffect(() => {
    if (startDate) {
      dispatch(
        SortOnlineClassClassroom(
          users.user_institute,
          InsId,
          "date",
          moment(startDate).format("ddddDDMMMMYYYY")
        )
      );
    }
  }, [InsId, dispatch, startDate, users.user_institute]);

  function uniq(onlineClass) {
    let datesArray = [];
    onlineClass.forEach((element) => {
      datesArray.push(element.class_timing);
    });
    return Array.from(new Set(datesArray));
  }
  const refreshList = () => {
    dispatch(getClassroomViewList(users.user_institute, subjectId, ToggleValue, users._id));
  }

  return (
    <div className="TeacherRoleOnlineClass ToggleFilterContent">
      <div className="onlineclassteacherdateTabsnew ">
        <button
          className={`button btn-xs base  w-400 ${activeToggleName === "All" ? "button-base" : "btn-o-base"
            }`}
          onClick={() => SingleSelectHandel("All", "All")}
        >
          All
        </button>
        <button
          className={`button btn-xs base  w-400 ${activeToggleName === "today" ? "button-base" : "btn-o-base"
            }`}
          onClick={() => SingleSelectHandel("Today", "timeStatus")}
        >
          Today
        </button>
        <button
          className={`button btn-xs base  w-400 ${activeToggleName === "tomorrow" ? "button-base" : "btn-o-base"
            }`}
          onClick={() => SingleSelectHandel("Tomorrow", "timeStatus")}
        >
          Tomorrow
        </button>
        <button
          className={`button btn-xs base  w-400 ${activeToggleName === "thisWeek" ? "button-base" : "btn-o-base"
            }`}
          onClick={() => SingleSelectHandel("This_Week", "timeStatus")}
        >
          This Week
        </button>
        <button
          className={`button btn-xs base  w-400 ${activeToggleName === "This_Month"
            ? "button-base"
            : "btn-o-base"
            }`}
          onClick={() => SingleSelectHandel("This_Month", "timeStatus")}
        >
          This Month
        </button>
        <div
          className={`DateInputIcon`}

        >
          <Calender />
          <InputDatePicker
            popperPlacement="top-right"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            highlightDates={uniq(onlineClasses).map((date) => {
              const d = new Date(date);
              d.setDate(d.getDate());
              return d;
            })}
            includedDates={uniq(onlineClasses).map((date) => {
              const d = new Date(date);
              d.setDate(d.getDate());
              return d;
            })}
            className={`onlineClasscalenderIconFilter`}
          />
        </div>
      </div>

      <div className="Filters">
        <div className="Filters-Item">
          <SingleSelectDropdown
            SingleSelectHandel={SortBySelectHandle}
            selectGroup={selectGroup}
            filterValues={filterValues}
          />
        </div>

        {/* Don't remove */}
        <div className="Filters-Item">
          {/* <CourseClassCheckboxFilter
            onSelect={(selectedData) => {
              filterCourseAndClassroom(selectedData);
            }}
          /> */}
        </div>
        <div className="Filters-Item">
          {/* <MultipleSelectDropDownCommon
            selectGroup={classroomCreatedByList ? classroomCreatedByList : []}
            OnSelectedValue={OnSelectedValueCreatedBy}
            name={"Created By"}
            SwitchSelectData={false}
          /> */}
        </div>
        <div className="Filters-Item">
          <SingleSelectDropdown
            SingleSelectLabelName="Class Type"
            SingleSelectHandel={SingleSelectHandel}
            selectGroup={selectGroup2}
            filterValues={filterValues2}
          />
        </div>
        <div className="Filters-Item">
          <button className="refreshBtn" onClick={refreshList} title="Refresh">
            <img src={refresh} alt="" width="18px" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ToogleFilterClassroom
