import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { SearchIcon } from "../../../../../../Common/Icon";
import SearchControl from "../../../../../../Common/SearchControl";
import {
  SearchClassroomViewItem,
  getClassroomViewList,
} from "../../../../../../store/actions/classroomdetail";
const TeacherClassroomStudentFilterSearch = ({ toggle }) => {
  const dispatch = useDispatch();
  const { classroomId, subjectId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  let typing;

  const { users } = useSelector((state) => {
    return {
      users: state.user,
    };
  });

  // const resetSearch = () => {
  //   setSearchTerm("");
  //   getClassroomViewList(users.user_institute, subjectId, toggle);
  // };
  const searchInputHandel = (event) => {
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
        SearchClassroomViewItem(
          users.user_institute,
          toggle,
          subjectId,
          searchTerm, classroomId
        )
      );
    } else {
      dispatch(getClassroomViewList(users.user_institute, subjectId, toggle, classroomId));
    }
  }, [searchTerm, dispatch, users.user_institute, toggle, subjectId, classroomId]);

  return (
    <React.Fragment>
      <SearchControl
        classNameWrappper="tableSearchbar"
        id="search"
        name="search"
        onChange={(evt) => searchInputHandel(evt)}
        onKeyUp={(evt) => searchInputHandel(evt)}
        placeholder="Search"
      />
    </React.Fragment>
  );
};
export default TeacherClassroomStudentFilterSearch;
