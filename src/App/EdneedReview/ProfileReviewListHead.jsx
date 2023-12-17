/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import SingleSelectDropdown from "../../Common/Form/SingleSelectDropdown";
import { SearchIcon } from "../../Common/Icon";
import SearchControl from "../../Common/SearchControl";
import { getAllReviews, searchReviews } from "../../store/actions/Testimonial";

const ProfileReviewListHead = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isActive, setIsActive] = useState("All");
  const handleAll = () => {
    setIsActive("All");
    dispatch(getAllReviews());
  };
  const handleInstitute = () => {
    setIsActive("InstituteOwner");
    dispatch(searchReviews("userType", "InstituteOwner"));
  };
  const handleTeacher = () => {
    setIsActive("Teacher");
    dispatch(searchReviews("userType", "Teacher"));
  };
  const handleStudent = () => {
    setIsActive("Student");
    dispatch(searchReviews("userType", "Student"));
  };
  const handleOthers = () => {
    setIsActive("Other");
    dispatch(searchReviews("userType", "Other"));
  };
  let typing;
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

  const selectReviewGroup = [
    "Format",
    "Text",
    "Audio",
    "Video",
    "Ratings",
    "High to Low",
    "Low to High",
  ];

  const filterReviewValues = ["Format", "Ratings"];
  //

  const SingleReviewSelectHandel = (value) => {
    const selectedValue = value;
    switch (selectedValue) {
      case "ALL":
        dispatch(getAllReviews());
        break;
      case "Text":
        dispatch(searchReviews("feedbackFormat", "Text"));
        break;

      case "Audio":
        dispatch(searchReviews("feedbackFormat", "Audio"));
        break;

      case "Video":
        dispatch(searchReviews("feedbackFormat", "Video"));
        break;
      case "High to Low":
        dispatch(searchReviews("userRating", "htl"));
        break;
      case "Low to High":
        dispatch(searchReviews("userRating", "lth"));
        break;
      default:
    }
  };
  useEffect(() => {
    if (searchTerm) {
      dispatch(searchReviews("search", searchTerm));
    } else {
      dispatch(getAllReviews());
    }
  }, [dispatch, searchTerm]);

  return (
    <React.Fragment>
      <div className="PageTopHead PTH-ProfileReviewList">
        <div className="PTH-Item scroll-nav-tab-wrapper">
          <div className="scroll-nav-tab">
            <button
              onClick={handleAll}
              // className="button button-base btn-sm base"
              className={
                isActive === "All"
                  ? "button button-base btn-sm base"
                  : "button btn-o-base btn-sm base"
              }
            >
              All
            </button>
            <button
              onClick={handleInstitute}
              className={
                isActive === "InstituteOwner"
                  ? "button button-base btn-sm base"
                  : "button btn-o-base btn-sm base"
              }
            >
              Institute Admin
            </button>
            <button
              onClick={handleTeacher}
              className={
                isActive === "Teacher"
                  ? "button button-base btn-sm base"
                  : "button btn-o-base btn-sm base"
              }
            >
              Teachers
            </button>
            <button
              onClick={handleStudent}
              className={
                isActive === "Student"
                  ? "button button-base btn-sm base"
                  : "button btn-o-base btn-sm base"
              }
            >
              Students
            </button>
            <button
              onClick={handleOthers}
              className={
                isActive === "Other"
                  ? "button button-base btn-sm base"
                  : "button btn-o-base btn-sm base"
              }
            >
              Others
            </button>
          </div>
        </div>
        <div className="PTH-Item">
          <SingleSelectDropdown
            SingleSelectHandel={SingleReviewSelectHandel}
            selectGroup={selectReviewGroup}
            filterValues={filterReviewValues}
          />
        </div>

        <div className="PTH-Item P-Right">
          <SearchControl
            classNameWrappper="tableSearchbar"
            id="search"
            onChange={handleSearch}
            onKeyUp={handleSearch}
            name="search"
            placeholder="Edneed search"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileReviewListHead;
