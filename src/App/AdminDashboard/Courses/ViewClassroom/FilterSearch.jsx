import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Storage from "../../../../Classes/Storage";
import SearchControl from "../../../../Common/SearchControl";
import { courseID } from "../../../../Constant/auth";
import {
  SearchClassroomViewItem,
  getClassroomViewList,
  SortCoursesAdminClassroom,
} from "../../../../store/actions/classroomdetail";
const FilterSearch = ({ ToggleValue, courseId }) => {
  const dispatch = useDispatch();
  const { classroomId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  let typing;

  const { users } = useSelector((state) => {
    return {
      users: state.user,
    };
  });

  const resetSearch = () => {
    setSearchTerm("");
    if (ToggleValue !== "Courses") {
      dispatch(
        getClassroomViewList(users.user_institute, classroomId, ToggleValue, Storage.getJson(courseID))
      );
    } else if (ToggleValue === "Courses") {
      dispatch(
        getClassroomViewList(users.user_institute, classroomId, ToggleValue, courseId)
      );
    }

  };
  const searchInputHandel = (evt) => {
    if (evt.target.value === "") {
      resetSearch();
    }
    clearTimeout(typing);
    typing = setTimeout(() => {
      setSearchTerm(evt.target.value);
    }, 400);

    if (!evt.target.value) {
      setSearchTerm("");
      clearTimeout(typing);
    }
  };

  useEffect(() => {
    if (searchTerm && ToggleValue !== "Courses" && ToggleValue !== "Teachers" && ToggleValue !== "Students") {
      dispatch(
        SearchClassroomViewItem(
          users.user_institute,
          ToggleValue,
          classroomId,
          searchTerm,
        )
      );
    } else if (searchTerm && ((ToggleValue === "Teachers") || (ToggleValue === "Students"))) {
      dispatch(
        SearchClassroomViewItem(
          users.user_institute,
          ToggleValue,
          classroomId,
          searchTerm,
          Storage.getJson(courseID),
        )
      );
    } else if (searchTerm && ToggleValue === "Courses") {
      dispatch(
        SortCoursesAdminClassroom(
          users.user_institute,
          courseId,
          classroomId,
          "search",
          searchTerm
        )
      );
    }
  }, [searchTerm, dispatch, ToggleValue, users.user_institute, classroomId, courseId]);

  return (
    <React.Fragment>
      <SearchControl
        classNameWrappper="tableSearchbar"
        id="search"
        name="search"
        onChange={(evt) => searchInputHandel(evt)}
        onKeyUp={(evt) => searchInputHandel(evt)}
        placeholder={`Search ${ToggleValue === "Courses" ? "Study Material" : ToggleValue}`} />
    </React.Fragment>
  );
};
export default FilterSearch;
