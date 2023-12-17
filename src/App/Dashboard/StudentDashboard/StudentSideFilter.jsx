/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import CourseClassCheckboxFilter from '../../../Common/CourseClassCheckboxFilter';
import MultipleSelectDropDownCommon from '../../../Common/Form/MultiSelectDropDownCommon';
import SingleSelectDropdown from '../../../Common/Form/SingleSelectDropdown';
import { filterCreatedBy, getFilteredClass } from '../../../store/actions/onlineClasses';
import { getJoinClass, getStudentFilteredClass, studentCourseClassroomFilter } from '../../../store/actions/studentjoinclass';
import refresh from "./icon-refresh.svg";
import InputDatePicker from "../../../Common/Form/InputDatePicker";
import Calender from '../../../Common/Icon/CalenderIcon';
import moment from 'moment';

const StudentSideFilter = ({ toggleStudentFilter }) => {
  const dispatch = useDispatch();
  const {
    onlineClasses,
    onlineclassSuccess,
    users,
    classroomCreatedByList,
    // isTokenExpired,
  } = useSelector((state) => {
    return {
      onlineClasses: state.studentjoinclass.list.data,
      courseAndClassroom: state.onlineClasses.courseAndClassroom,
      onlineclassSuccess: state.studentjoinclass.list.success,
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
  ];
  const selectGroup2 = ["One Time", "Recurring"];

  const filterValues = ["Created On", "Duration", "Meeting On"];
  const filterValues2 = [2, 8];

  const OnSelectedValueCreatedBy = (val) => {
    dispatch(filterCreatedBy(users._id, InsId, val));
  };

  const [activeToggleName, setActiveToggleName] = useState("All");
  const SortbyHandle = (value) => {
    switch (value) {
      case "ALL": {
        dispatch(getJoinClass(users._id, users.user_institute))
        break;
      }
      case "Recent to Old": {
        dispatch(getStudentFilteredClass(users._id, InsId, "createdOn", "rto"));
        break;
      }
      case "Old to Recent": {
        dispatch(getStudentFilteredClass(users._id, InsId, "createdOn", "otr"));
        break;
      }
      case "High to Low 1": {
        dispatch(getStudentFilteredClass(users._id, InsId, "duration", 'htl'));
        break;
      }
      case "Low to High 1": {
        dispatch(getStudentFilteredClass(users._id, InsId, "duration", 'lth'));
        break;
      }
      case "Zoom": {
        dispatch(getStudentFilteredClass(users._id, InsId, "meetingOn", "Zoom"));
        break;
      }
      case "Google Meet": {
        dispatch(getStudentFilteredClass(users._id, InsId, "meetingOn", "GoogleMeet"));
        break;
      }
      default: return
    }
  }
  const SingleSelectHandel = (value, query,) => {
    switch (value) {
      case "All": {
        dispatch(getJoinClass(users._id, users.user_institute))
        setActiveToggleName("All");
        break;
      }
      case "Today": {
        dispatch(getStudentFilteredClass(users._id, InsId, "timeStatus", "today"));
        setActiveToggleName("today");
        break;
      }
      case "Tomorrow": {
        dispatch(getStudentFilteredClass(users._id, InsId, "timeStatus", "tomorrow"));
        setActiveToggleName("tomorrow");
        break;
      }
      case "This_Week": {
        dispatch(getStudentFilteredClass(users._id, InsId, "timeStatus", "thisWeek"));
        setActiveToggleName("thisWeek");
        break;
      }
      case "This_Month": {
        dispatch(getStudentFilteredClass(users._id, InsId, "timeStatus", "thisMonth"));
        setActiveToggleName("This_Month");
        break;
      }
      case "One Time": {
        dispatch(getStudentFilteredClass(users._id, InsId, "classType", 2));
        // setActiveToggleName("thisMonth");
        break;
      }
      case "Recurring": {
        dispatch(getStudentFilteredClass(users._id, InsId, "classType", 8));
        // setActiveToggleName("thisMonth");
        break;
      }
      default:
        dispatch(getJoinClass(users._id, users.user_institute))
    }
  };

  const filterCourseAndClassroom = (selectedData) => {
    selectedData.courseList.length !== 0 &&
      selectedData.classRoomList.length !== 0 &&
      dispatch(
        studentCourseClassroomFilter(
          users._id,
          InsId,
          selectedData.courseList,
          selectedData.classRoomList
        )
      );
  };
  const handleRefresh = () => {
    dispatch(getJoinClass(users._id, users.user_institute))
  }

  const [startDate, setStartDate] = useState("");
  const [calenderData, setCalenderData] = useState([])
  const [isDatesFilled, setIsDatesFilled] = useState(false)
  useEffect(() => {
    if (onlineclassSuccess && !isDatesFilled) {

      setCalenderData(onlineClasses)
      setIsDatesFilled(true)
    }
  }, [])

  useEffect(() => {
    if (startDate) {
      dispatch(
        getStudentFilteredClass(
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
      datesArray.push(element.onlineclasses_data.class_timing);
    });
    return Array.from(new Set(datesArray));
  }
  return (
    <React.Fragment>




      {toggleStudentFilter &&
        <div className='TeacherRoleOnlineClass'>


          <div className=" scroll-top-menu-wrap">
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
                Tormorrow
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
                className={`DateInputIcon ${activeToggleName === "CalenderIcon" ? "activeBlack" : "not"
                  } `}
              // onClick={() => setActiveToggleName("All")}
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
          </div>
          <div className="PageTopHead PTH-ViewClassroomOnlineClassStudenSide mt-10">
            <div className="PTH-Item">
              <SingleSelectDropdown
                SingleSelectHandel={SortbyHandle}
                selectGroup={selectGroup}
                filterValues={filterValues}
              />
            </div>

            {/* Don't remove */}
            <div className="PTH-Item">
              <CourseClassCheckboxFilter
                onSelect={(selectedData) => {
                  filterCourseAndClassroom(selectedData);
                }}
              />
            </div>
            <div className="PTH-Item">
              <MultipleSelectDropDownCommon
                selectGroup={classroomCreatedByList ? classroomCreatedByList : []}
                OnSelectedValue={OnSelectedValueCreatedBy}
                name={"Created By"}
                SwitchSelectData={false}
              />
            </div>
            <div className="PTH-Item">
              <SingleSelectDropdown
                SingleSelectLabelName="Class Type"
                SingleSelectHandel={SingleSelectHandel}
                selectGroup={selectGroup2}
                filterValues={filterValues2}
              />
            </div>
            <div className="PTH-Item">
              <button onClick={handleRefresh} className="refreshBtn" title="Refresh">

                <img src={refresh} alt="" width="18px" /></button>
            </div>


          </div>
        </div>
      }
    </React.Fragment>
  );
};

export default StudentSideFilter;
