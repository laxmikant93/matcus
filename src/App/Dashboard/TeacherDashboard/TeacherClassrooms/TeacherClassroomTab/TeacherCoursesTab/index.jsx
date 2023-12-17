/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
import { useParams } from "react-router";
import AppLink from "../../../../../../Common/AppLink";
// import DummyImage from "../../../../../../Common/DummyMedia/DummyImage";
import SingleSelectDropdown from "../../../../../../Common/Form/SingleSelectDropdown";
// import Popup from "../../../../../../Common/Popup";
// import { getTeacherCoursesList, sortByTeacherCourseList } from "../../../../../../store/actions/teachercourse";
import TeacherCoursesTabList from "./TeacherCoursesTabList";
import "../../../../../Course/TeacherCourse/TeacherCourse.scss";
import {
  createdByFilterTeacherCoursesClassroom,
  getAssignmentTeacherClassroom,
  getClassroomViewList,
  sortFilterTeacherCoursesClassroom,
} from "../../../../../../store/actions/classroomdetail";
import MultipleSelectDropDownCommon from "../../../../../../Common/Form/MultiSelectDropDownCommon";
import SearchControl from "../../../../../../Common/SearchControl";
import IconRefresh from "../../icon-refresh.svg";
const TeacherCoursesTab = () => {
  const dispatch = useDispatch();
  const {
    user,
    ViewClassroomListLoading,
    TeacherListData,
    TeacherListDataSuccess,
  } = useSelector((state) => {
    return {
      user: state.user,
      ViewClassroomListLoading: state.classroomDetail.CourseList.loading,
      ViewClassroomListSuccess: state.classroomDetail.CourseList.success,
      TeacherListData: state.classroomDetail.TeacherDataList.data,
      TeacherListDataSuccess: state.classroomDetail.TeacherDataList.success,
    };
  });
  const selectGroup = [
    "Duration",
    "Longest to Shortest",
    "Shortest to Longest",

    "Start Date",
    "Recent to Old",
    "Old to Recent",

    "Topic",
    "High to Low",
    "Low to High",
  ];
  const filterValues = ["Duration", "Start Date", "Topic"];
  const SingleSelectHandel = (value) => {
    const selectedValue = value;
    switch (selectedValue) {
      case "ALL": {
        dispatch(
          getClassroomViewList(
            user.user_institute,
            subjectId,
            "teacherCourses",
            classroomId,
            user._id
          )
        );

        // dispatch(getStudentAssignmentInfoData(users._id, users.user_institute));
        break;
      }
      case "Longest to Shortest": {
        dispatch(
          sortFilterTeacherCoursesClassroom(
            user.user_institute,
            user._id,
            classroomId,
            subjectId,
            "duration",
            "long"
          )
        );

        break;
      }
      case "Shortest to Longest": {
        dispatch(
          sortFilterTeacherCoursesClassroom(
            user.user_institute,
            user._id,
            classroomId,
            subjectId,
            "duration",
            "short"
          )
        );

        break;
      }
      case "Recent to Old": {
        dispatch(
          sortFilterTeacherCoursesClassroom(
            user.user_institute,
            user._id,
            classroomId,
            subjectId,
            "time",
            "rto"
          )
        );

        break;
      }
      case "Old to Recent": {
        dispatch(
          sortFilterTeacherCoursesClassroom(
            user.user_institute,
            user._id,
            classroomId,
            subjectId,
            "time",
            "otr"
          )
        );

        break;
      }
      case "High to Low": {
        dispatch(
          sortFilterTeacherCoursesClassroom(
            user.user_institute,
            user._id,
            classroomId,
            subjectId,
            "topic",
            "htl"
          )
        );

        break;
      }
      case "Low to High": {
        dispatch(
          sortFilterTeacherCoursesClassroom(
            user.user_institute,
            user._id,
            classroomId,
            subjectId,
            "topic",
            "lth"
          )
        );

        break;
      }

      default:
        dispatch(
          getClassroomViewList(
            user.user_institute,
            subjectId,
            "teacherCourses",
            classroomId,
            user._id
          )
        );
    }
  };
  const { classroomId, subjectId } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  let typing;
  const [listGetLoading, setListGetLoading] = useState(false);
  useEffect(() => {
    if (ViewClassroomListLoading) {
      setListGetLoading(true);
    } else if (!listGetLoading) {
      dispatch(
        getClassroomViewList(
          user.user_institute,
          subjectId,
          "teacherCourses",
          classroomId,
          user._id
        )
      );

      // dispatch(getClassroomViewList(user.user_institute, user._id, classroomId, subjectId));

      dispatch(getAssignmentTeacherClassroom(user.user_institute, classroomId));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classroomId, user._id, user.user_institute, listGetLoading]);

  useEffect(() => {
    if (!ViewClassroomListLoading && listGetLoading) {
      setListGetLoading(false)
    }
  }, [ViewClassroomListLoading, listGetLoading])

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
  const refreshList = () => {
    dispatch(
      getClassroomViewList(
        user.user_institute,
        subjectId,
        "teacherCourses",
        classroomId,
        user._id
      )
    );
  };
  const OnSelectedValueCreatedBy = (val) => {
    dispatch(
      createdByFilterTeacherCoursesClassroom(
        user.user_institute,
        user._id,
        classroomId,
        subjectId,
        "createdBy",
        val
      )
    );
  };

  useEffect(() => {
    // dispatch(searchServices(user.user_institute, searchTerm.toLowerCase()));
    dispatch(
      sortFilterTeacherCoursesClassroom(
        user.user_institute,
        user._id,
        classroomId,
        subjectId,
        "search",
        searchTerm
      )
    );
  }, [
    classroomId,
    dispatch,
    searchTerm,
    subjectId,
    user._id,
    user.user_institute,
  ]);
  const [multipleDropDownUserData, setMultipleDropDownUserData] = useState([]);
  useEffect(() => {
    if (TeacherListData && TeacherListData.length) {
      TeacherListData.map((item) => item.user && multipleDropDownUserData.push(item.user));
    }
  }, [TeacherListData, user._id])
  return (
    <React.Fragment>
      <div className="PageTopHead PTH-CourseViewClassroom mt-20">
        <div className="PTH-Item">
          <SingleSelectDropdown
            SingleSelectHandel={SingleSelectHandel}
            selectGroup={selectGroup}
            filterValues={filterValues}
          />
        </div>
        <div className="PTH-Item">
          <MultipleSelectDropDownCommon
            selectGroup={TeacherListDataSuccess && multipleDropDownUserData}
            OnSelectedValue={OnSelectedValueCreatedBy}
            name={"Created By"}
            SwitchSelectData={false}
          />
        </div>
        <div className="PTH-Item">
          <button type="button" onClick={refreshList} className="refreshBtn" title="Refresh">
            <img src={IconRefresh} alt="Refresh icon" />
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
            to={`/dashboard/create-teacherClassroom-course/${classroomId}`}
            className="button button-secondary btn-oval btn-sm"
          >
            <i className="ed-icon icon-plus-add white i-xs"></i> Create Material
          </AppLink>
        </div>
      </div>
      <TeacherCoursesTabList />

      {/* </div> */}
    </React.Fragment>
  );
};
export default TeacherCoursesTab;
