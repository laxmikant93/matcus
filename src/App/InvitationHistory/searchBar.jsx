/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchIcon } from "../../Common/Icon";
import SearchControl from "../../Common/SearchControl";
import {
  getInvitationsHistoryList,
  searchInvitationHistory,
} from "../../store/actions/invitationhistory";
const SearchBar = ({ studentHistory, teacherHistory }) => {
  const { users } = useSelector((state) => {
    return {
      users: state.user,
      invitationHistoryList: state.invitationhistory.list.data,
    };
  });

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  let typing;

  const resetSearch = () => {
    setSearchTerm("");
    if (teacherHistory) {
      dispatch(
        getInvitationsHistoryList(
          users.user_institute,
          process.env.REACT_APP_TEACHER,
          "teacherList"
        )
      );
    } else {
      dispatch(
        getInvitationsHistoryList(
          users.user_institute,
          process.env.REACT_APP_STUDENT,
          "studentList"
        )
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
    if (teacherHistory) {
      dispatch(
        searchInvitationHistory(
          users.user_institute,
          process.env.REACT_APP_TEACHER,
          "teacherList",
          searchTerm
        )
      );
    } else {
      dispatch(
        searchInvitationHistory(
          users.user_institute,
          process.env.REACT_APP_STUDENT,
          "studentList",
          searchTerm
        )
      );
    }
  }, [searchTerm, users, dispatch, teacherHistory]);

  return (
    <React.Fragment>
      <SearchControl
        classNameWrappper="tableSearchbar"
        id="search"
        name="search"
        onChange={(evt) => searchInputHandel(evt)}
        onKeyUp={(evt) => searchInputHandel(evt)}
        placeholder={teacherHistory ? "Search Teachers" : "Search Students"}
      />
    </React.Fragment>
  );
};
export default SearchBar;
