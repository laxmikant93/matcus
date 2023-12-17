/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
// import { SearchIcon } from "../../../Common/Icon";
import { useDispatch, useSelector } from "react-redux";
import {
  getJoinClass,
  getStudentFilteredClass,
  // getUpcomingClasses,
  // searchClasses,
  // classSortByToggleValueFromStudent,
  // postStudentJoinTiming,
  // getUpcomingClasses,
  // classCreatedBySelf,
  // classCreatedByInstituteOwner,
  // classCreatedByOther,
} from "../../../store/actions/studentjoinclass";
// import { DATETIME_FORMAT_AP } from "../../../Constant/constants";
// import moment from "moment";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
// import SingleSelectDropdown from "../../../Common/Form/SingleSelectDropdown";
// import MultipleGroupSelectDropdown from "../../../Common/Form/MultipleGroupSelectDropdown";
// import CourseClassCheckboxFilter from "../../../Common/CourseClassCheckboxFilter";
import "./StudentDashboard.scss";
import SearchControl from "../../../Common/SearchControl";
// import UpcomingClassesModal from "../../OnlineClasses/UpcomingClassesModal";
import StudentSideFilter from "./StudentSideFilter";
import StudentSideList from "./StudentSideList";

export default function StudentJoinAssignments() {
  const dispatch = useDispatch();

  const [toggleStudentFilter, setToggleStudentFilter] = useState(false);
  const InsId = useSelector((state) => state.user.user_institute);

  const {
    joinclass,
    users,
    // coursename,
    joinclassSuccess,
    // studentCourseName,
    // courseClass,
  } = useSelector((state) => {
    return {
      joinclass: state.studentjoinclass.list.data,
      users: state.user,
      coursename: state.studentjoinclass.list.data[0],
      joinclassSuccess: state.studentjoinclass.list.success,
      // studentCourseName: state.studentjoinclass.list.course_data_coursename,
      // courseClass: state.studentjoinclass.list.classroom_data_classroomname,
    };
  });
  const [searchTerm, setSearchTerm] = useState("");
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
      dispatch(getStudentFilteredClass(users._id, InsId, "search", searchTerm));
    } else {
      dispatch(getJoinClass(users._id, users.user_institute))
    }
  }, [dispatch, users._id, InsId, searchTerm, users.user_institute]);


  useEffect(() => {
    dispatch(getJoinClass(users._id, users.user_institute))
  }, [dispatch, users._id, users.user_institute])
  return (
    <>
      <React.Fragment>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem
            to="/dashboard/student-join-class"
            title="Join Class"
          />
        </Breadcrumb>
        <div className="PageTopHead PTH-studentJoinListHeaderWrapper mt-20">
          <div className="PTH-Item">
            <p className="text-sm w-300">
              <span className="purple">
                {joinclassSuccess && joinclass.length ? joinclass.length
                  : ""}
              </span>
              &nbsp;
              {joinclassSuccess &&
                joinclass &&
                joinclass.length > 1
                ? "Online Classes"
                : "Online Class"}
            </p>
          </div>
          <div className="PTH-Item P-Right">
            <div className="toggleFilterBtn" onClick={() => setToggleStudentFilter(!toggleStudentFilter)}>
              <i className="ed-filter"></i>
            </div>
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
        </div>
        <StudentSideFilter toggleStudentFilter={toggleStudentFilter} />

        <StudentSideList />
      </React.Fragment>
    </>
  );
}