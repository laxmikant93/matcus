import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CourseClassCheckboxFilter from "../../../../Common/CourseClassCheckboxFilter";
import MultipleSelectDropDownCommon from "../../../../Common/Form/MultiSelectDropDownCommon";
import SingleSelectDropdown from "../../../../Common/Form/SingleSelectDropdown";
import InputDatePicker from "../../../../Common/Form/InputDatePicker";
import {
  filterCreatedBy,
  getCourseClassroomFilterDropdown,
  getFilteredClass,
  getOnlineClasses,
} from "../../../../store/actions/onlineClasses";
import moment from "moment";
import Calender from "../../../../Common/Icon/CalenderIcon";
import refresh from "./icon-refresh.svg"

const ToggleFilter = ({ adminSide, emptySearchTerm }) => {
  const dispatch = useDispatch();
  const {
    onlineClasses,
    // courseAndClassroom,
    users,
    onlineclassSuccess,
    classroomCreatedByList,
    // isTokenExpired,
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
  //   dispatch(getFilteredClass(users._id, InsId, "search", searchTerm));
  // }, [dispatch, users._id, InsId, searchTerm]);

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
    if (val.includes("All")) {
      val.pop()
    }
    dispatch(filterCreatedBy(users._id, InsId, val));
  };

  const [activeToggleName, setActiveToggleName] = useState("All");

  const SortBySelectHandle = (value, query) => {
    switch (value) {
      case "ALL": {
        dispatch(getOnlineClasses(users._id, users.user_institute));
        break;
      }
      case "Recent to Old": {
        dispatch(getFilteredClass(users._id, InsId, "createdOn", "rto"));
        break;
      }
      case "Old to Recent": {
        dispatch(getFilteredClass(users._id, InsId, "createdOn", "otr"));
        break;
      }
      case "High to Low 1": {
        dispatch(getFilteredClass(users._id, InsId, "duration", "htl"));
        break;
      }
      case "Low to High 1": {
        dispatch(getFilteredClass(users._id, InsId, "duration", "lth"));
        break;
      }
      case "Zoom": {
        dispatch(getFilteredClass(users._id, InsId, "meetingOn", "Zoom"));
        break;
      }
      case "Google Meet": {
        dispatch(getFilteredClass(users._id, InsId, "meetingOn", "GoogleMeet"));
        break;
      }
      case "High to Low 2": {
        dispatch(getFilteredClass(users._id, InsId, query, value));
        break;
      }
      case "Low to High 2": {
        dispatch(getFilteredClass(users._id, InsId, query, value));
        break;
      }
      default:
        return;
    }
  };
  const SingleSelectHandel = (value, query) => {
    switch (value) {
      case "All": {
        dispatch(getOnlineClasses(users._id, users.user_institute));
        setActiveToggleName(value);
        break;
      }
      case "today": {
        dispatch(getFilteredClass(users._id, InsId, query, value));
        setActiveToggleName("today");
        break;
      }
      case "tomorrow": {
        dispatch(getFilteredClass(users._id, InsId, query, value));
        setActiveToggleName("tomorrow");
        break;
      }
      case "thisWeek": {
        dispatch(getFilteredClass(users._id, InsId, query, value));
        setActiveToggleName("thisWeek");
        break;
      }
      case "thisMonth": {
        dispatch(getFilteredClass(users._id, InsId, query, value));
        setActiveToggleName('thisMonth');
        break;
      }
      case "CalenderIcon": {
        dispatch(getFilteredClass(users._id, InsId, query, value));
        setActiveToggleName(value);
        break;
      }
      case "One Time": {
        dispatch(getFilteredClass(users._id, InsId, "classType", 2));
        // setActiveToggleName("thisMonth");
        break;
      }
      case "Recurring": {
        dispatch(getFilteredClass(users._id, InsId, "classType", 8));
        // setActiveToggleName("thisMonth");
        break;
      }
      default:
        dispatch(getFilteredClass(users._id, InsId, query, value));
    }
  };
  const [calenderData, setCalenderData] = useState([])
  const [isDatesFilled, setIsDatesFilled] = useState(false)
  useEffect(() => {
    if (onlineclassSuccess && !isDatesFilled) {
      setIsDatesFilled(true)
      setCalenderData(onlineClasses)
    }
  }, [isDatesFilled, onlineClasses, onlineclassSuccess])

  const filterCourseAndClassroom = (selectedData) => {
    selectedData.courseList.length !== 0 &&
      selectedData.classRoomList.length !== 0 &&
      dispatch(
        getCourseClassroomFilterDropdown(
          users._id,
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
        getFilteredClass(
          users._id,
          InsId,
          "date",
          moment(startDate).format("ddddDDMMMMYYYY")
        )
      );
    }
  }, [InsId, dispatch, startDate, users._id]);

  function uniq(onlineClass) {
    let datesArray = [];
    onlineClass.forEach((element) => {
      datesArray.push(element.class_timing);
    });
    return Array.from(new Set(datesArray));
  }

  const refreshList = () => {
    emptySearchTerm()
    dispatch(getOnlineClasses(users._id, users.user_institute))

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
          onClick={() => SingleSelectHandel("today", "timeStatus")}
        >
          Today
        </button>
        <button
          className={`button btn-xs base  w-400 ${activeToggleName === "tomorrow" ? "button-base" : "btn-o-base"
            }`}
          onClick={() => SingleSelectHandel("tomorrow", "timeStatus")}
        >
          Tomorrow
        </button>
        <button
          className={`button btn-xs base  w-400 ${activeToggleName === "thisWeek" ? "button-base" : "btn-o-base"
            }`}
          onClick={() => SingleSelectHandel("thisWeek", "timeStatus")}
        >
          This Week
        </button>
        <button
          className={`button btn-xs base  w-400 ${activeToggleName === "thisMonth"
            ? "button-base"
            : "btn-o-base"
            }`}
          onClick={() => SingleSelectHandel("thisMonth", "timeStatus")}
        >
          This Month
        </button>
        <div
          className={`DateInputIcon  ${activeToggleName === "CalenderIcon" ? "activeBlack" : "not"
            } `}
          onClick={() => SingleSelectHandel("CalenderIcon", "timeStatus")}
        >
          <Calender />
          <InputDatePicker
            popperPlacement="top-right"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            highlightDates={uniq(calenderData).map((date) => {
              const d = new Date(date);
              d.setDate(d.getDate());
              return d;
            })}
            includedDates={uniq(calenderData).map((date) => {
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
          <CourseClassCheckboxFilter
            onSelect={(selectedData) => {
              filterCourseAndClassroom(selectedData);
            }}
          />
        </div>
        <div className="Filters-Item">
          <MultipleSelectDropDownCommon
            selectGroup={classroomCreatedByList ? classroomCreatedByList : []}
            OnSelectedValue={OnSelectedValueCreatedBy}
            name={"Created By"}
            SwitchSelectData={false}
          />
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
  );
};

export default ToggleFilter;
