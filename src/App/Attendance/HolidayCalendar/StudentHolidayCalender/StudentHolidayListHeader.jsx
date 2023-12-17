import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleSelectDropdown from "../../../../Common/Form/SingleSelectDropdown";
import SearchControl from "../../../../Common/SearchControl";
import {
  getStudentHolidaysList,
  getStudentHolidaysListSortBy,
} from "../../../../store/actions/studentHolidays";

const StudentHolidayListHeader = ({ changeYear, currentYear }) => {
  const { user } = useSelector((state) => {
    return {
      user: state.user,
    };
  });
  const dispatch = useDispatch();
  const SingleSelectHandel = (value) => {
    const selectedValue = value;
    switch (selectedValue) {
      case "ALL": {
        dispatch(
          getStudentHolidaysList(user.user_institute, user._id, currentYear)
        );
        break;
      }
      case "Holiday": {
        dispatch(
          getStudentHolidaysListSortBy(
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
          getStudentHolidaysListSortBy(
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
          getStudentHolidaysListSortBy(
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
          getStudentHolidaysListSortBy(
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
          getStudentHolidaysListSortBy(
            user.user_institute,
            currentYear,
            "holidayType",
            "gazetted"
          )
        );
        break;
      }
      default:
        dispatch(
          getStudentHolidaysList(user.user_institute, user._id, currentYear)
        );
    }
  };
  const selectGroup = [
    "Holiday",
    "Vacation",
    "Additional",
    "Statutory",
    "Gazetted",
  ];
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
    if (searchTerm) {
      dispatch(
        getStudentHolidaysListSortBy(
          user.user_institute,
          currentYear,
          "search",
          searchTerm
        )
      );
    } else {
      dispatch(
        getStudentHolidaysList(user.user_institute, user._id, currentYear)
      );
    }
  }, [currentYear, dispatch, searchTerm, user._id, user.user_institute]);
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
      <div className="PageTopHead PTH-student-holiday-listHead mt-20">
        <div className="PTH-Item">
          <SingleSelectDropdown
            selectGroup={selectGroup}
            filterValues={[]}
            SingleSelectHandel={SingleSelectHandel}
          />
        </div>
        <div className="PTH-Item">{/* <SingleSelectDropdown /> */}</div>
        <div className="PTH-Item">
          <div className="LeftRightCalender">
            {/* <InputDatePicker /> */}
            <button
              type="button"
              onClick={() => changeYear("minus")}
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
              onClick={() => changeYear("plus")}
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
      </div>
    </React.Fragment>
  );
};

export default StudentHolidayListHeader;
