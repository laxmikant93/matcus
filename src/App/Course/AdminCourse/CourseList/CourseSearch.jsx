/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import SearchControl from "../../../../Common/SearchControl";
import { useDispatch, useSelector } from "react-redux";
import { filterAdminCourseList, getAdminCourseList } from "../../../../store/actions/admincourse";
const CourseListSearch = ({ isAllReset, searchKeyword, levelActive }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return {
      user: state.user,
    }
  })
  const [searchTerm, setSearchTerm] = useState("");
  const [searchEffectCheck, setSearchEffectCheck] = useState(false);
  let typing;
  const handleSearch = (event) => {
    // isAllReset()
    event.preventDefault();
    // setAllReset("All");
    clearTimeout(typing);
    typing = setTimeout(() => {
      setSearchEffectCheck(true)
      setSearchTerm(event.target.value);
      searchKeyword(event.target.value)
    }, 400);

    if (!event.target.value) {
      setSearchEffectCheck(false)
      clearTimeout(typing);
      setSearchTerm("");
      dispatch(getAdminCourseList(user.user_institute));
    }
  };
  useEffect(() => {
    // dispatch(searchServices(user.user_institute, searchTerm.toLowerCase()));
    if (searchTerm && searchEffectCheck) {
      dispatch(
        // filterAdminCourseList(
        //   user.user_institute,
        //   "search",
        //   searchTerm
        // )e==
        levelActive !== "All" ?
          filterAdminCourseList(
            user.user_institute,
            // user._id,
            "courseLevel",
            levelActive,
            searchTerm
          ) :
          filterAdminCourseList(
            user.user_institute,
            // user._id,
            "search",
            searchTerm
          )
      );
    }
  }, [dispatch, levelActive, searchTerm, user.user_institute]);
  return (
    <React.Fragment>
      <SearchControl
        classNameWrappper="tableSearchbar"
        id="search"
        name="search"
        onChange={handleSearch}
        placeholder="Study Material Search"
      />
    </React.Fragment>
  );
};
export default CourseListSearch;
