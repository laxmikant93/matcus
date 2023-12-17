import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AppLink from "../../../Common/AppLink";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import CourseClassCheckboxFilter from "../../../Common/CourseClassCheckboxFilter";
import MultipleSelectDropDownCommon from "../../../Common/Form/MultiSelectDropDownCommon";
import SingleSelectDropdown from "../../../Common/Form/SingleSelectDropdown";
import SearchControl from "../../../Common/SearchControl";
import TeacherTheme from "../../../Common/Theme/TeacherTheme";
import { assignmentCreatedBy } from "../../../store/actions/assignment";
import {
  AllEntrySelected,
  AllEntrySelectedSwitch,
} from "../../../store/actions/MultiSelectDropDown";
import {
  courseClassroomFilterTeacherCourseList,
  createdByTeacherCourseList,
  getTeacherCoursesList,
  sortByTeacherCourseList,
} from "../../../store/actions/teachercourse";
// import { courseClassroomFilterTeacherCourseList, getTeacherCoursesList, sortByTeacherCourseList } from "../../../store/actions/teachercourse";
import "./TeacherCourse.scss";
import IconRefresh from "../icon-refresh.svg";
import TeacherCourseList from "./TeacherCourseList";
const CourseDetailList = () => {
  const dispatch = useDispatch();
  const {
    user,
    teacherCourseList,
    teacherCourseListSuccess,
    coursesCreatedByList,
    coursesCreatedByListSuccess,
  } = useSelector((state) => {
    return {
      user: state.user,
      teacherCourseList: state.teachercourse.teacherCourseList.data,
      teacherCourseListSuccess: state.teachercourse.teacherCourseList.success,
      coursesCreatedByListSuccess: state.assignment.assignedAssignment.success,
      coursesCreatedByList: state.assignment.assignedAssignment.data,
    };
  });
  const [searchTerm, setSearchTerm] = useState("");
  let typing;

  const handleSearch = (event) => {
    event.preventDefault();

    setLevelActive("All");
    clearTimeout(typing);
    typing = setTimeout(() => {
      setSearchTerm(event.target.value);
    }, 400);

    if (!event.target.value) {
      clearTimeout(typing);
      setSearchTerm("");
    }
  };

  const [levelActive, setLevelActive] = useState("All");
  const subjectLevel = () => {
    setLevelActive("subject");
    dispatch(
      sortByTeacherCourseList(
        user.user_institute,
        user._id,
        "courseLevel",
        "multipleClassroom"
      )
    );
  };
  const allCourses = () => {
    setLevelActive("All");
    dispatch(getTeacherCoursesList(user.user_institute, user._id));
  };
  const refreshList = () => {
    dispatch(getTeacherCoursesList(user.user_institute, user._id));
  };
  const instituteLevel = () => {
    setLevelActive("institute");
    dispatch(
      sortByTeacherCourseList(
        user.user_institute,
        user._id,
        "courseLevel",
        "institute"
      )
    );
  };

  const selectGroup = [
    "Duration",
    "Longest to Shortest",
    "Shortest to Longest",

    "Status",
    "Upcoming",
    "Ongoing",
    "Completed",
    "Not Defined",

    "No. of Students",
    "High to Low",
    "Low to High",
  ];

  const filterValues = ["Duration", "Status", "No. of Students"];

  const SingleSelectHandel = (value) => {
    const selectedValue = value;
    switch (selectedValue) {
      case "ALL": {
        dispatch(getTeacherCoursesList(user.user_institute, user._id));
        break;
      }
      case "Longest to Shortest": {
        dispatch(
          sortByTeacherCourseList(
            user.user_institute,
            user._id,
            "duration",
            "longest"
          )
        );
        break;
      }
      case "Shortest to Longest": {
        dispatch(
          sortByTeacherCourseList(
            user.user_institute,
            user._id,
            "duration",
            "shortest"
          )
        );
        break;
      }
      case "Recent to Old": {
        dispatch(
          sortByTeacherCourseList(
            user.user_institute,
            user._id,
            "date",
            "recent"
          )
        );
        break;
      }
      case "Old to Recent": {
        dispatch(
          sortByTeacherCourseList(user.user_institute, user._id, "date", "old")
        );
        break;
      }
      case "High to Low": {
        dispatch(
          sortByTeacherCourseList(
            user.user_institute,
            user._id,
            "noOfStudent",
            "htl"
          )
        );
        break;
      }
      case "Low to High": {
        dispatch(
          sortByTeacherCourseList(
            user.user_institute,
            user._id,
            "noOfStudent",
            "lth"
          )
        );
        break;
      }
      case "Upcoming": {
        dispatch(
          sortByTeacherCourseList(
            user.user_institute,
            user._id,
            "status",
            "upcomming"
          )
        );
        break;
      }
      case "Ongoing": {
        dispatch(
          sortByTeacherCourseList(
            user.user_institute,
            user._id,
            "status",
            "ongoing"
          )
        );
        break;
      }
      case "Completed": {
        dispatch(
          sortByTeacherCourseList(
            user.user_institute,
            user._id,
            "status",
            "completed"
          )
        );
        break;
      }
      case "Not Defined": {
        dispatch(
          sortByTeacherCourseList(
            user.user_institute,
            user._id,
            "status",
            "notdefined"
          )
        );
        break;
      }
      default:
        dispatch(getTeacherCoursesList(user.user_institute, user._id));
    }
  };
  const getFilterList = (selectedData) => {
    dispatch(
      courseClassroomFilterTeacherCourseList(
        user.user_institute,
        user._id,
        selectedData.courseList,
        selectedData.classRoomList
      )
    );
  };
  useEffect(() => {
    dispatch(
      sortByTeacherCourseList(
        user.user_institute,
        user._id,
        "search",
        searchTerm
      )
    );
  }, [dispatch, searchTerm, user._id, user.user_institute]);

  const OnSelectedValueCreatedBy = (val) => {
    dispatch(createdByTeacherCourseList(user.user_institute, user._id, val));
  };

  const [selectedTeacherFilled, setSelectedTeacherFilled] = useState(false);

  if (
    coursesCreatedByListSuccess &&
    !selectedTeacherFilled &&
    coursesCreatedByList.length
  ) {
    setSelectedTeacherFilled(true);
    let value = [];
    for (let i = 0; i < coursesCreatedByList.length; i++) {
      value.push(
        coursesCreatedByList[i].user
          ? coursesCreatedByList[i].user
          : coursesCreatedByList[i]._id
      );
    }
    value.push("All");
    dispatch(AllEntrySelected(value));
    dispatch(AllEntrySelectedSwitch(value));
  }
  useEffect(() => {
    dispatch(getTeacherCoursesList(user.user_institute, user._id));
    dispatch(assignmentCreatedBy(user._id, user.user_institute));
  }, [dispatch, user._id, user.user_institute]);
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem to="/course" title="Study Materials" />
      </Breadcrumb>
      <div className="T-Course text-sm w-300 mt-20">
        <span className="base">
          {teacherCourseListSuccess ? teacherCourseList.length : ""}
          {` `}
        </span>
        {teacherCourseListSuccess
          ? teacherCourseList.length > 1
            ? "Study Materials"
            : "Study Material"
          : "Study Material"}
      </div>
      <div className="scroll-nav-tab-wrapper mt-10">
        <ul className="groupFilterBtn scroll-nav-tab">
          <li
            onClick={allCourses}
            className={levelActive === "All" ? "active" : ""}
          >
            All
          </li>
          <li
            onClick={subjectLevel}
            className={levelActive === "subject" ? "active" : ""}
          >
            Subjects
          </li>
          <li
            onClick={instituteLevel}
            className={levelActive === "institute" ? "active" : ""}
          >
            Institute Level
          </li>
        </ul>
      </div>
      <div className="PageTopHead PTH-T-Course mt-10">
        <div className="PTH-Item">
          <SingleSelectDropdown
            SingleSelectHandel={SingleSelectHandel}
            selectGroup={selectGroup}
            filterValues={filterValues}
          />
        </div>
        <div className="PTH-Item">
          <MultipleSelectDropDownCommon
            selectGroup={
              coursesCreatedByListSuccess && coursesCreatedByList
                ? coursesCreatedByList
                : []
            }
            OnSelectedValue={OnSelectedValueCreatedBy}
            name={"Created By"}
            SwitchSelectData={false}
          />
        </div>
        <div className="PTH-Item">
          <CourseClassCheckboxFilter onSelect={getFilterList} />
        </div>
        <div className="PTH-Item">
          <button type="button" onClick={refreshList} className="refreshBtn" title="Refresh">
            <img src={IconRefresh} alt="Refresh Icon" />
          </button>
        </div>
        <div className="PTH-Item P-Right">
          <SearchControl
            classNameWrappper="tableSearchbar"
            id="search"
            name="search"
            placeholder="Search Study Material"
            onChange={handleSearch}
            onKeyUp={handleSearch}
          />
        </div>
        <div className="PTH-Item P-Right">
          <AppLink
            to="/dashboard/teacher-create-course"
            className="button button-secondary btn-oval btn-sm"
          >
            <i className="ed-icon icon-plus-add white i-xs"></i> Create
            Material
          </AppLink>
        </div>
      </div>
      <TeacherCourseList />
    </React.Fragment>
  );
};

export default CourseDetailList;
