import React, { useEffect, useState } from "react";
import AppLink from "../../../Common/AppLink/AppLink";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import InstituteTheme from "../../../Common/Theme/InstituteTheme";
import "./Course.scss";
// import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import CourseList from "../AdminCourse/CourseList/CourseList";
import CourseListSearch from "../AdminCourse/CourseList/CourseSearch";
import {
  filterAdminCourseList,
  filterAssignToAdminList,
  filterCourseClassroomAdminList,
  getAdminCourseList,
} from "../../../store/actions/admincourse/index";
import SingleSelectDropdown from "../../../Common/Form/SingleSelectDropdown";
import IconRefresh from "../icon-refresh.svg";
import CourseClassCheckboxFilter from "../../../Common/CourseClassCheckboxFilter";
import { getFacultyUserInfoData } from "../../../store/actions/studentlistuserinfo";
import MultipleSelectDropDownCommon from "../../../Common/Form/MultiSelectDropDownCommon";
import {
  AllEntrySelected,
  AllEntrySelectedSwitch,
} from "../../../store/actions/MultiSelectDropDown";
const Course = () => {
  const dispatch = useDispatch();
  const {
    user,
    adminCourseList,
    adminCourseListSuccess,
    assignToFilterList,
    assignToFilterListSuccess,
  } = useSelector((state) => {
    return {
      user: state.user,
      adminCourseList: state.admincourse.list.data,
      adminCourseListSuccess: state.admincourse.list.success,
      assignToFilterList: state.studentlistuserinfo.list.data,
      assignToFilterListSuccess: state.studentlistuserinfo.list.success,
    };
  });
  const [assignedToAdminList, setAssignedToAdminList] = useState([]);
  useEffect(() => {
    if (assignToFilterListSuccess) {
      const data = [];
      for (let index = 0; index < assignToFilterList.length; index++) {
        const element = assignToFilterList[index];
        data.push({
          user: element.userData._id,
          user_email: element.userData.email,
          user_fullname: element.userData.fullname,
        });
      }
      setAssignedToAdminList(data);
    }
  }, [assignToFilterList, assignToFilterListSuccess]);

  // const { _id } = useParams()
  const [levelActive, setLevelActive] = useState("All");
  const subjectLevel = () => {
    setLevelActive("multipleClassroom");
    dispatch(
      filterAdminCourseList(
        user.user_institute,
        // user._id,
        "courseLevel",
        "multipleClassroom",
        searchTerm
      )
    );
  };
  const allCourses = () => {
    setLevelActive("All");
    dispatch(getAdminCourseList(user.user_institute));
  };
  const refreshList = () => {
    dispatch(getAdminCourseList(user.user_institute));
  };
  const instituteLevel = () => {
    setLevelActive("institute");
    dispatch(
      filterAdminCourseList(user.user_institute, "courseLevel", "institute", searchTerm)
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
    setLevelActive("All");
    switch (selectedValue) {
      case "ALL": {
        // dispatch(getStudentAssignmentInfoData(users._id, users.user_institute));
        break;
      }
      case "Longest to Shortest": {
        dispatch(
          filterAdminCourseList(user.user_institute, "duration", "longest")
        );
        break;
      }
      case "Shortest to Longest": {
        dispatch(
          filterAdminCourseList(user.user_institute, "duration", "shortest")
        );
        break;
      }
      case "Recent to Old": {
        dispatch(filterAdminCourseList(user.user_institute, "date", "recent"));
        break;
      }
      case "Old to Recent": {
        dispatch(filterAdminCourseList(user.user_institute, "date", "old"));
        break;
      }
      case "High to Low": {
        dispatch(
          filterAdminCourseList(user.user_institute, "noOfStudent", "htl")
        );
        break;
      }
      case "Low to High": {
        dispatch(
          filterAdminCourseList(user.user_institute, "noOfStudent", "lth")
        );
        break;
      }
      case "Upcoming": {
        dispatch(
          filterAdminCourseList(user.user_institute, "status", "upcomming")
        );
        break;
      }
      case "Ongoing": {
        dispatch(
          filterAdminCourseList(user.user_institute, "status", "ongoing")
        );
        break;
      }
      case "Completed": {
        dispatch(
          filterAdminCourseList(user.user_institute, "status", "completed")
        );
        break;
      }
      case "Not Defined": {
        dispatch(
          filterAdminCourseList(user.user_institute, "status", "notdefined")
        );
        break;
      }

      default:
        dispatch(getAdminCourseList(user.user_institute));
    }
  };
  const getFilterList = (selectedData) => {
    dispatch(
      filterCourseClassroomAdminList(
        user.user_institute,
        selectedData.courseList,
        selectedData.classRoomList
      )
    );
  };
  useEffect(() => {
    dispatch(getAdminCourseList(user.user_institute));
    dispatch(
      getFacultyUserInfoData(
        user.user_institute,
        process.env.REACT_APP_TEACHER,
        "teacher", 10, 0
      )
    );
  }, [dispatch, user.user_institute]);
  const OnSelectedValueCreatedBy = (val) => {
    dispatch(filterAssignToAdminList(user.user_institute, val));
  };

  const [selectedTeacherFilled, setSelectedTeacherFilled] = useState(false);

  if (
    assignToFilterListSuccess &&
    !selectedTeacherFilled &&
    assignedToAdminList.length
  ) {
    setSelectedTeacherFilled(true);
    let value = [];
    for (let i = 0; i < assignedToAdminList.length; i++) {
      value.push(assignedToAdminList[i].user);
    }
    value.push("All");
    dispatch(AllEntrySelected(value));
    dispatch(AllEntrySelectedSwitch(value));
  }
  const isAllReset = () => {
    setLevelActive("All");
  };
  const [searchTerm, setSearchTerm] = useState("")
  const searchKeyword = (value) => {
    setSearchTerm(value)
  }
  return (
    <React.Fragment>
      <React.Fragment>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/course" title="Study Material" />
        </Breadcrumb>
        <div className="courseList-wrapper mt-20">
          <div className="PageTopHead PTH-CourseList1">
            <div className="PTH-Item">
              <p className="text-sm w-300">
                <span className="base">
                  {adminCourseListSuccess && adminCourseList.length
                    ? adminCourseList.length
                    : ""}
                </span>{" "}
                {adminCourseListSuccess
                  ? adminCourseList.length > 1
                    ? "Study Materials"
                    : "Study Material"
                  : "Study Material"}
              </p>
            </div>
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
                className={levelActive === "multipleClassroom" ? "active" : ""}
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
          <div className="PageTopHead PTH-I-Course mt-20">
            <div className="PTH-Item">
              <SingleSelectDropdown
                SingleSelectHandel={SingleSelectHandel}
                selectGroup={selectGroup}
                filterValues={filterValues}
              />
            </div>
            <div className="PTH-Item">
              <MultipleSelectDropDownCommon
                selectGroup={assignedToAdminList ? assignedToAdminList : []}
                OnSelectedValue={OnSelectedValueCreatedBy}
                name={"Created By"}
                SwitchSelectData={false}
              />
            </div>
            <div className="PTH-Item">
              <CourseClassCheckboxFilter onSelect={getFilterList} />
            </div>
            <div className="PTH-Item">
              <button
                type="button"
                onClick={refreshList}
                className="refreshBtn"
                title="Refresh"
              >
                <img src={IconRefresh} alt="Refresh icon" />
              </button>
            </div>
            <div className="PTH-Item P-Right">
              <CourseListSearch isAllReset={() => isAllReset()} searchKeyword={searchKeyword} levelActive={levelActive} />
            </div>
            <div className="PTH-Item P-Right">
              <AppLink
                to="/create-course"
                className="button button-primary btn-oval btn-sm"
              >
                <i className="ed-icon icon-plus-add white i-xs"></i> Create
                Material
              </AppLink>
            </div>
          </div>
          <CourseList />
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};

export default Course;
