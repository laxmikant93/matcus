import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SearchControl from "../../../../../../Common/SearchControl";
import {
  SearchClassroomViewItem,
  getClassroomViewList,
} from "../../../../../../store/actions/classroomdetail";
const TeacherClassroomOnlineClassFilterSearch = ({ ToggleValue }) => {
  const dispatch = useDispatch();
  const {  subjectId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  let typing;

  const { users } = useSelector((state) => {
    return {
      users: state.user,
    };
  });

  const resetSearch = () => {
    setSearchTerm("");
    dispatch(
      getClassroomViewList(users.user_institute, subjectId, ToggleValue, users._id)
    );
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
    if (searchTerm) {
      dispatch(
        SearchClassroomViewItem(
          users.user_institute,
          ToggleValue,
          subjectId,
          searchTerm,
          users._id
        )
      );
    }
  }, [searchTerm, dispatch, users.user_institute, subjectId, ToggleValue, users._id]);

  return (
    <React.Fragment>
      <SearchControl
        classNameWrappper="tableSearchbar"
        id="search"
        name="search"
        onChange={(evt) => searchInputHandel(evt)}
        placeholder="Search"
      />
    </React.Fragment>
  );
};
export default TeacherClassroomOnlineClassFilterSearch;
