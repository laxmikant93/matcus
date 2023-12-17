import React, { useState } from "react";
import moment from "moment";
import SingleSelectDropdown from "../../../../Common/Form/SingleSelectDropdown";
import SearchControl from "../../../../Common/SearchControl";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllClassroomSubjects } from "../../../../store/actions/admincourse";
import MultipleSelectDropDownCommon from "../../../../Common/Form/MultiSelectDropDownCommon";
import {
  AllEntrySelected,
  AllEntrySelectedSwitch,
} from "../../../../store/actions/MultiSelectDropDown";
import {
  filterByClassrooms,
  holidayCalendarList,
  searchSortByHolidayList,
} from "../../../../store/actions/holidayCalender";
const TeacherHolidayListHeader = ({ currentYear, onChangeYear }) => {
  const { user, classroomSubjectsDetails, classroomSubjectSuccess } =
    useSelector((state) => {
      return {
        user: state.user,
        classroomSubjectsDetails:
          state.admincourse.getAllClassroomSubjects.data,
        classroomSubjectSuccess:
          state.admincourse.getAllClassroomSubjects.success,
      };
    });
  const dispatch = useDispatch();
  const history = useNavigate();
  const handleAddHoliday = () => {
    if (user.user_activeRole === process.env.REACT_APP_TEACHER) {
      history("/dashboard/add-holiday-calendar");
    } else {
      history("/admin-add-holiday-calendar");
    }
  };

  const SingleSelectHandel = (value) => {
    const selectedValue = value;
    switch (selectedValue) {
      case "ALL": {
        dispatch(holidayCalendarList(user.user_institute, currentYear));
        break;
      }
      case "Holiday": {
        dispatch(
          searchSortByHolidayList(
            user.user_institute,
            currentYear,
            "holidayType",
            "holiday"
          )
        );
        break;
      }
      case "Vacation": {
        dispatch(
          searchSortByHolidayList(
            user.user_institute,
            currentYear,
            "holidayType",
            "vacation"
          )
        );
        break;
      }
      case "Additional": {
        dispatch(
          searchSortByHolidayList(
            user.user_institute,
            currentYear,
            "holidayType",
            "additional"
          )
        );
        break;
      }
      case "Statutory": {
        dispatch(
          searchSortByHolidayList(
            user.user_institute,
            currentYear,
            "holidayType",
            "statutory"
          )
        );
        break;
      }
      case "Gazetted": {
        dispatch(
          searchSortByHolidayList(
            user.user_institute,
            currentYear,
            "holidayType",
            "gazetted"
          )
        );
        break;
      }
      default:
        dispatch(holidayCalendarList(user.user_institute, currentYear));
    }
  };
  const selectGroup = [
    "Holiday",
    "Vacation",
    "Additional",
    "Statutory",
    "Gazetted",
  ];
  const handleClassroomFilter = (values) => {
    if (values.length) {
      dispatch(filterByClassrooms(user.user_institute, currentYear, values));
    } else {
      // dispatch(holidayCalendarList(user.user_institute, currentYear))
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
    dispatch(holidayCalendarList(user.user_institute, currentYear));
  }, [currentYear, dispatch, user.user_institute]);

  useEffect(() => {
    if (searchTerm) {
      dispatch(
        searchSortByHolidayList(
          user.user_institute,
          currentYear,
          "search",
          searchTerm
        )
      );
    } else {
      dispatch(holidayCalendarList(user.user_institute, currentYear));
    }
  }, [currentYear, dispatch, searchTerm, user.user_institute]);
  const [selectedClassroomsFilled, setSelectedClassroomsFilled] =
    useState(false);

  if (
    classroomSubjectSuccess &&
    !selectedClassroomsFilled &&
    classroomSubjectsDetails.length
  ) {
    setSelectedClassroomsFilled(true);
    let value = [];
    for (let i = 0; i < classroomSubjectsDetails.length; i++) {
      value.push(classroomSubjectsDetails[i]._id);
    }
    value.push("All");
    dispatch(AllEntrySelected(value));
    dispatch(AllEntrySelectedSwitch(value));
  }
  useEffect(() => {
    if (user.user_activeRole === process.env.REACT_APP_TEACHER) {
      dispatch(getAllClassroomSubjects(user.user_institute, user._id));
    } else {
      dispatch(getAllClassroomSubjects(user.user_institute));
    }
  }, [dispatch, user._id, user.user_activeRole, user.user_institute]);
  return (
    <React.Fragment>
      <div className="HolidayCalender-ListView-Head mt-20">
        <p className="HeadNameCst text-sm w-500">Holidays Calendar</p>
        <div className="scroll-nav-tab-wrapper">
          <ul className="HolidayCalender-List-labeling">
            <li className="text-2xs w-500">H&nbsp;-&nbsp;Holiday</li>
            <li className="text-2xs w-500">V&nbsp;-&nbsp;Vacation</li>
            <li className="text-2xs w-500">A&nbsp;-&nbsp;Additional</li>
            <li className="text-2xs w-500">S&nbsp;-&nbsp;Statutory</li>
            <li className="text-2xs w-500">G&nbsp;-&nbsp;Gazetted</li>
          </ul>
        </div>
      </div>
      <div className="PageTopHead PTH-teacher-holiday-listHead mt-20">
        <div className="PTH-Item">
          <SingleSelectDropdown
            classNameWrappper="tableSearchbar"
            selectGroup={selectGroup}
            filterValues={[]}
            SingleSelectHandel={SingleSelectHandel}
          />
        </div>
        <div className="PTH-Item">
          <MultipleSelectDropDownCommon
            selectGroup={
              classroomSubjectSuccess ? classroomSubjectsDetails : []
            }
            CourseSwitch={true}
            OnSelectedValue={handleClassroomFilter}
            name="Classrooms"
          />
        </div>
        <div className="PTH-Item">
          <div className="LeftRightCalender">
            {/* <InputDatePicker /> */}
            <button
              type="button"
              onClick={() => onChangeYear("minus")}
              className="LeftDateIcon text-sm w-500"
            >
              &#60;
            </button>
            <div className="DateCntMain">
              {moment(currentYear).format("yyyy")}-
              {moment(currentYear).add(1, "year").format("YY")}
            </div>
            <button
              type="button"
              onClick={() => onChangeYear("plus")}
              className="RightDateIcon text-sm w-500"
            >
              &#62;
            </button>
          </div>
        </div>
        <div className="PTH-Item P-Right">
          <SearchControl
            classNameWrappper="tableSearchbar"
            placeholder="Holiday Search"
            onChange={handleSearch}
          />
        </div>
        {user.user_activeRole === process.env.REACT_APP_TEACHER ? (
          ""
        ) : (
          <div className="PTH-Item P-Right">
            <button
              type="button"
              className="button button-base btn-sm"
              onClick={() => handleAddHoliday()}
            >
              <span className="text-xs">&#43;</span>&nbsp;Add Holiday
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default TeacherHolidayListHeader;
