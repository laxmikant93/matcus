import moment from 'moment';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import InputDatePicker from '../../../../../Common/Form/InputDatePicker';
import SingleSelectDropdown from '../../../../../Common/Form/SingleSelectDropdown';
import Calender from '../../../../../Common/Icon/CalenderIcon';
import SearchControl from '../../../../../Common/SearchControl';
import refresh from "./icon-refresh.svg";
import { filterCreatedBy } from '../../../../../store/actions/onlineClasses';
import { useNavigate, useParams } from 'react-router-dom';
import { courseID } from '../../../../../Constant/auth';
import Storage from '../../../../../Classes/Storage';
import { getClassroomViewList, SearchClassroomViewItem, SortOnlineTestClassroom } from '../../../../../store/actions/classroomdetail';
import MultipleSelectDropDownCommon from '../../../../../Common/Form/MultiSelectDropDownCommon';
import EmailAddPopUp from '../../../../Auth/EmailAddPopUp/EmailAddPopUp';
import "./ClassroomOnlineClass.scss";
const SearchFilterAdmin = () => {
  const dispatch = useDispatch();
  const [courseRouteID, setCourseID] = useState("");
  const { classroomId } = useParams();
  const {
    onlineClasses,
    users,
    onlineclassSuccess,
    classroomData,
    classroomCreatedByList
  } = useSelector((state) => {
    return {
      onlineClasses: state.classroomDetail.OnlineCLasslist.data,
      courseAndClassroom: state.onlineClasses.courseAndClassroom,
      onlineclassSuccess: state.classroomDetail.OnlineCLasslist.success,
      classroomCreatedByListSuccess:
        state.onlineClasses.assignedClassroom.success,
      classroomCreatedByList: state.onlineClasses.assignedClassroom.data,
      users: state.user,
      courseList: state.classroomassigned.courseList,
      isSuccess: state.zoomapi.success,
      classroomData: state.classroomDetail.classrooomData.data,
      classroomDataSuccess: state.classroomDetail.classrooomData.success,
      classroomDataLoading: state.classroomDetail.classrooomData.loading,
    };
  });
  const InsId = useSelector((state) => state.user.user_institute);
  useEffect(() => {
    Storage.setJson("__wz_clsrom__", classroomId);
    setCourseID(Storage.getJson(courseID));
  }, [classroomId]);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useNavigate()
  let typing;
  const handleSearch = (e) => {
    e.preventDefault();
    clearTimeout(typing);
    typing = setTimeout(() => {
      setSearchTerm(e.target.value);
    }, 300);
    if (!e.target.value) {
      clearTimeout(typing);
      setSearchTerm("");
    }
  };
  useEffect(() => {
    if (searchTerm) {
      dispatch(SearchClassroomViewItem(InsId, "Online Classes", classroomData.data_classroomInfo, searchTerm, users._id))
    } else {
      dispatch(
        getClassroomViewList(users.user_institute, classroomId, "Online Classes", users._id)
      );
    }
  }, [searchTerm, dispatch, users.user_institute, InsId, classroomData.data_classroomInfo, users._id, classroomId]);

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



  const [activeToggleName, setActiveToggleName] = useState("All");

  const sortBy = (value, query) => {
    setActiveToggleName(value);
    switch (value) {
      case "Recent to Old": {
        dispatch(SortOnlineTestClassroom(InsId, classroomId, "createdOn", "rto", users._id));
        setActiveToggleName("rto")
        break;
      }
      case "Old to Recent": {
        dispatch(SortOnlineTestClassroom(InsId, classroomId, "createdOn", "otr", users._id));
        setActiveToggleName("otr")
        break;
      }
      case "High to Low 1": {
        dispatch(SortOnlineTestClassroom(InsId, classroomId, "duration", 'htl', users._id));
        setActiveToggleName("htl")
        break;
      }
      case "Low to High 1": {
        dispatch(SortOnlineTestClassroom(InsId, classroomId, "duration", 'lth', users._id));
        setActiveToggleName("lth")
        break;
      }
      case "Zoom": {
        dispatch(SortOnlineTestClassroom(InsId, classroomId, "meetingOn", "Zoom", users._id));
        setActiveToggleName("Zoom")
        break;
      }
      case "Google Meet": {
        dispatch(SortOnlineTestClassroom(InsId, classroomId, "meetingOn", "GoogleMeet", users._id));
        setActiveToggleName("GoogleMeet")
        break;
      }
      case "High to Low 2": {
        dispatch(SortOnlineTestClassroom(InsId, classroomId, "attendees", "htl", users._id));
        break;
      }
      case "Low to High 2": {
        dispatch(SortOnlineTestClassroom(InsId, classroomId, "attendees", "lth", users._id));
        break;
      }
      default:
        dispatch(
          getClassroomViewList(users.user_institute, classroomId, "Online Classes", users._id));
    }
  };

  const SingleSelectHandel = (value, query) => {
    setActiveToggleName(value);
    switch (value) {
      case "All": {
        dispatch(
          getClassroomViewList(users.user_institute, classroomId, "Online Classes", users._id));
        setActiveToggleName("All");
        break;
      }
      case "Today": {
        dispatch(SortOnlineTestClassroom(InsId, classroomId, "timeStatus", "today", users._id));
        setActiveToggleName("today");
        break;
      }
      case "Tomorrow": {
        dispatch(SortOnlineTestClassroom(InsId, classroomId, "timeStatus", "tomorrow", users._id));
        setActiveToggleName("tomorrow");
        break;
      }
      case "This_Week": {
        dispatch(SortOnlineTestClassroom(InsId, classroomId, "timeStatus", "thisWeek", users._id));
        setActiveToggleName("thisWeek");
        break;
      }
      case "This_Month": {
        dispatch(SortOnlineTestClassroom(InsId, classroomId, "timeStatus", "thisMonth", users._id));
        setActiveToggleName("thisMonth");
        break;
      }
      case "One Time": {
        dispatch(SortOnlineTestClassroom(InsId, classroomId, "classType", 2, users._id));
        break;
      }
      case "Recurring": {
        dispatch(SortOnlineTestClassroom(InsId, classroomId, "classType", 8, users._id));
        break;
      }
      default:
        dispatch(
          getClassroomViewList(users.user_institute, classroomData.data_classroomInfo, "Online Classes", users._id));
    }
  };

  const [startDate, setStartDate] = useState("");

  const [openAddEmailPopUp, setOpenAddEmailPopUp] = useState(false);

  const createClass = () => {
    if (users.user_email) {
      history(`/create-admin-onlineClass/${courseRouteID}/${classroomId}`)
    } else {
      setOpenAddEmailPopUp(true)
    }
  }
  const closePopUp = () => {
    setOpenAddEmailPopUp(!openAddEmailPopUp)
  }
  const [calenderData, setCalenderData] = useState([])
  const [isDatesFilled, setIsDatesFilled] = useState(false)
  useEffect(() => {
    if (onlineclassSuccess && !isDatesFilled) {
      setIsDatesFilled(true)
      setCalenderData(onlineClasses)
    }
  }, [isDatesFilled, onlineClasses, onlineclassSuccess])
  useEffect(() => {
    if (startDate) {
      dispatch(SortOnlineTestClassroom(InsId, classroomData.data_classroomInfo, "date", moment(startDate).format("ddddDDMMMMYYYY"), users._id));
    }
  }, [InsId, classroomData.data_classroomInfo, dispatch, startDate, users._id])

  function uniq(onlineClass) {
    let datesArray = [];
    onlineClass.forEach((element) => {
      datesArray.push(element.class_timing);
    });
    return Array.from(new Set(datesArray));
  }
  const [filterIconToggle, setFilterIconToggle] = useState(false);
  const OnSelectedValueCreatedBy = (val) => {
    if (val.includes("All")) {
      val.pop()
    }
    dispatch(filterCreatedBy(users._id, InsId, val, users._id));
  };
  const refreshList = () => {
    dispatch(getClassroomViewList(users.user_institute, classroomData.data_classroomInfo, "Online Classes", users._id));
  }
  return (
    <>
      <div className="PageTopHead PTH-ViewClassroomOnlineClassfiltter mt-20">
        <div className="PTH-Item">
          <SingleSelectDropdown
            SingleSelectHandel={sortBy}
            selectGroup={selectGroup}
            filterValues={filterValues}
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
          <MultipleSelectDropDownCommon
            selectGroup={classroomCreatedByList ? classroomCreatedByList : []}
            OnSelectedValue={OnSelectedValueCreatedBy}
            name={"Created By"}
            SwitchSelectData={false}
          />
        </div>

        <div className="PTH-Item P-Right">
          <SearchControl
            classNameWrappper="tableSearchbar"
            id="search"
            name="search"
            placeholder="Search Online Classes"
            onChange={handleSearch}
          />
        </div>

        <div className='actionRefBtns'>
          <div className="filterhalf">
            <div className="toggleFilterBtn" onClick={() => setFilterIconToggle(!filterIconToggle)}>
              <i className="ed-filter"></i>
            </div>
          </div>
          <div className="refreshHalf">
            <button type="button" title="Refresh" className="refreshBtn" onClick={refreshList}>
              <img src={refresh} alt="" width="18px" />
            </button>
          </div>
        </div>


        <div className="PTH-Item P-Right">
          <button
            className="button button-primary btn-oval btn-sm button-block"
            onClick={createClass}
          >
            <i className="ed-icon icon-plus-add white i-xs"></i>
            Schedule Live Classes
          </button>
        </div>
      </div>

      {filterIconToggle &&

        <div className="scroll-top-menu-wrap">
          <div className="onlineclassteacherdateTabsnew mt-10">
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
              onClick={() => SingleSelectHandel("Today")}
            >
              Today
            </button>
            <button
              className={`button btn-xs base  w-400 ${activeToggleName === "tomorrow" ? "button-base" : "btn-o-base"
                }`}
              onClick={() => SingleSelectHandel("Tomorrow")}
            >
              Tormorrow
            </button>
            <button
              className={`button btn-xs base  w-400 ${activeToggleName === "thisWeek" ? "button-base" : "btn-o-base"
                }`}
              onClick={() => SingleSelectHandel("This_Week")}
            >
              This Week
            </button>
            <button
              className={`button btn-xs base  w-400 ${activeToggleName === "thisMonth"
                ? "button-base"
                : "btn-o-base"
                }`}
              onClick={() => SingleSelectHandel("This_Month")}
            >
              This Month
            </button>
            <div className="DateInputIcon">
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
      }
      {
        openAddEmailPopUp && <EmailAddPopUp showPopUp={openAddEmailPopUp} closePopUp={() => closePopUp()} />
      }
    </>
  );
};

export default SearchFilterAdmin;
