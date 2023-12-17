import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import CourseClassCheckboxFilter from "../../../Common/CourseClassCheckboxFilter";
import MultipleSelectDropDownCommon from "../../../Common/Form/MultiSelectDropDownCommon";
import SingleSelectDropdown from "../../../Common/Form/SingleSelectDropdown";
import StudentTheme from "../../../Common/Theme/StudentTheme";
import { assignmentCreatedBy } from "../../../store/actions/assignment";
import {
  AllEntrySelected,
  AllEntrySelectedSwitch,
} from "../../../store/actions/MultiSelectDropDown";
import {
  createdByFilterStudentCoursesList,
  filterCourseClassroomStudentList,
  filterStudentCourseList,
  getStudentCoursesList,
} from "../../../store/actions/studentcourses";
import "./StudentCourse.scss";
import StudentCourseList from "./StudentCourseList";
import IconRefresh from "./icon-refresh.svg";
import SearchControl from "../../../Common/SearchControl";
const CourseDetailList = () => {
  const dispatch = useDispatch();
  const {
    user,
    studentCoursesList,
    studentCoursesListSuccess,
    coursesCreatedByListSuccess,
    coursesCreatedByList,
  } = useSelector((state) => {
    return {
      user: state.user,
      coursesCreatedByListSuccess: state.assignment.assignedAssignment.success,
      coursesCreatedByList: state.assignment.assignedAssignment.data,
      studentCoursesList: state.studentcourse.courseList.data,
      studentCoursesListSuccess: state.studentcourse.courseList.success,
    };
  });
  const [searchTerm, setSearchTerm] = useState("");
  let typing;

  const handleSearch = (event) => {
    setLevelActive("All");
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

  const [levelActive, setLevelActive] = useState("All");
  const subjectLevel = () => {
    setLevelActive("subject");
    dispatch(
      filterStudentCourseList(
        user.user_institute,
        user._id,
        "courseLevel",
        "multipleClassroom"
      )
    );
  };
  const allCourses = () => {
    setLevelActive("All");
    dispatch(getStudentCoursesList(user.user_institute, user._id));
  };
  const refreshList = () => {
    dispatch(getStudentCoursesList(user.user_institute, user._id));
  };
  const instituteLevel = () => {
    setLevelActive("institute");
    dispatch(
      filterStudentCourseList(
        user.user_institute,
        user._id,
        "courseLevel",
        "institute"
      )
    );
  };

  const selectGroup = [
    "Status",
    "Upcoming",
    "Ongoing",
    "Completed",
    "Not Defined",

    "Added Time",
    "Recently",
    "Oldest",

    "Duration",
    "Longest",
    "Shortest",
  ];

  const filterValues = ["Status", "Added Time", "Duration"];

  const SingleSelectHandel = (value) => {
    const selectedValue = value;
    switch (selectedValue) {
      case "ALL": {
        dispatch(getStudentCoursesList(user.user_institute, user._id));
        break;
      }
      case "Upcoming": {
        dispatch(
          filterStudentCourseList(
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
          filterStudentCourseList(
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
          filterStudentCourseList(
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
          filterStudentCourseList(
            user.user_institute,
            user._id,
            "status",
            "notdefined"
          )
        );
        break;
      }
      case "Recently": {
        dispatch(
          filterStudentCourseList(
            user.user_institute,
            user._id,
            "date",
            "recent"
          )
        );
        break;
      }
      case "Oldest": {
        dispatch(
          filterStudentCourseList(user.user_institute, user._id, "date", "old")
        );
        break;
      }
      case "Longest": {
        dispatch(
          filterStudentCourseList(
            user.user_institute,
            user._id,
            "duration",
            "longest"
          )
        );
        break;
      }
      case "Shortest": {
        dispatch(
          filterStudentCourseList(
            user.user_institute,
            user._id,
            "duration",
            "shortest"
          )
        );
        break;
      }

      default:
        dispatch(getStudentCoursesList(user.user_institute, user._id));
    }
  };
  const getFilterList = (selectedData) => {
    dispatch(
      filterCourseClassroomStudentList(
        user.user_institute,
        user._id,
        selectedData.courseList,
        selectedData.classRoComList
      )
    );
  };

  const OnSelectedValueCreatedBy = (val) => {
    dispatch(
      createdByFilterStudentCoursesList(user.user_institute, user._id, val)
    );
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
    dispatch(
      filterStudentCourseList(
        user.user_institute,
        user._id,
        "search",
        searchTerm
      )
    );
  }, [dispatch, searchTerm, user._id, user.user_institute]);

  useEffect(() => {
    dispatch(getStudentCoursesList(user.user_institute, user._id));
    dispatch(assignmentCreatedBy(user._id, user.user_institute));
  }, [dispatch, user._id, user.user_institute]);
  return (
    <StudentTheme>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem
          to="/dashboard/student/course-detail-list"
          title="Study Material"
        />
      </Breadcrumb>

      <p className="text-md w-300 mt-10">
        {studentCoursesListSuccess && studentCoursesList.length
          ? studentCoursesList.length
          : ""}{" "}
        {studentCoursesListSuccess
          ? studentCoursesList.length > 1
            ? "Materials"
            : "Material"
          : "Materials"}
        &nbsp;<span className="base text-xxs w-600"></span>
      </p>
      <div className="scroll-nav-tab-wrapper">
        <ul className="scroll-nav-tab">
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
      <div className="PageTopHead PTH-S-Course mt-20">
        <div className="PTH-Item">
          <SingleSelectDropdown
            SingleSelectHandel={SingleSelectHandel}
            selectGroup={selectGroup}
            filterValues={filterValues}
          />
        </div>
        <div className="PTH-Item">
          <CourseClassCheckboxFilter onSelect={getFilterList} />
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
          <button type="button" onClick={refreshList} className="refreshBtn" title="Refresh">
            <img src={IconRefresh} alt="" />
          </button>
        </div>
        <div className="PTH-Item P-Right">
          <SearchControl
            classNameWrappper="tableSearchbar"
            id="search"
            name="search"
            onChange={handleSearch}
            placeholder="Search Study Material"
          />
        </div>
      </div>
      <StudentCourseList />
    </StudentTheme>
  );
};

export default CourseDetailList;
