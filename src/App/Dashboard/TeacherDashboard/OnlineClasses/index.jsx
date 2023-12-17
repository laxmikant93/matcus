/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import ClassesList from "./ClassesList";
import ScheduleClass from "./ScheduleClass";
import ToggleFilter from "./ToggleFilter";

import "./Recurring.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchControl from "../../../../Common/SearchControl";
import {
  classroomCreatedBy,
  getCourseandClassroom,
  getOnlineClasses,
  getSearchFilteredClass,
} from "../../../../store/actions/onlineClasses";
import { getClassroomAssignedData } from "../../../../store/actions/classroomassigned";
import EmailAddPopUp from "../../../Auth/EmailAddPopUp/EmailAddPopUp";
function OnlineClasses() {
  const history = useNavigate();

  const [openAddEmailPopUp, setOpenAddEmailPopUp] = useState(false)
  const { user } = useSelector((state) => {
    return {
      user: state.user,
    };
  });
  const handleSubmit = () => {

    if (user.user_email) {
      history("/dashboard/teacher/create-online-class");
    } else {
      setOpenAddEmailPopUp(true)
    }

  };
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  let typing;
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);


    if (!e.target.value) {
      setSearchTerm("");
    }
  };
  useEffect(() => {
    dispatch(
      getClassroomAssignedData(user._id, user.user_institute, "teacher")
    );
    dispatch(getOnlineClasses(user._id, user.user_institute));
    dispatch(getCourseandClassroom(user.user_institute));
    dispatch(classroomCreatedBy(user._id, user.user_institute));
  }, [dispatch, user._id, user.user_institute]);
  useEffect(() => {
    if (searchTerm) {
      dispatch(
        getSearchFilteredClass(user._id, user.user_institute, searchTerm)
      );
    } else {
      dispatch(getOnlineClasses(user._id, user.user_institute));
    }
  }, [dispatch, searchTerm, user._id, user.user_institute]);
  const onlineClasses = useSelector((state) => state.onlineClasses.list.data);

  const [toggle, setToggle] = useState(false);

  const closePopUp = () => {
    setOpenAddEmailPopUp(!openAddEmailPopUp)
  }

  const emptySearchTerm = () => {
    setSearchTerm("")
  }
  return (
    <React.Fragment>
      <React.Fragment>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem
            to="/dashboard/teacher-online-class"
            title="Online Class"
          />
        </Breadcrumb>
        <div className="PageTopHead PTH-TeacherRoleOnlineClass mt-20">
          <div className="text-sm w-300">
            <span className="secondary">
              {onlineClasses && onlineClasses.length}&nbsp;
            </span>
            Online Classes
          </div>
          <div className="PTH-Item P-Right">
            <SearchControl
              classNameWrappper="tableSearchbar"
              id="search"
              name="search"
              value={searchTerm}
              placeholder="Search Online Classes"
              onChange={handleSearch}
            />
          </div>

          <div className="PTH-Item P-Right">
            <button
              className="toggleFilterBtn"
              onClick={() => setToggle(!toggle)}
              title="Filter"
            >
              <i className="ed-filter"></i>
            </button>
          </div>

          <div className="PTH-Item P-Right">
            <button
              className="button button-secondary btn-oval btn-sm button-block"
              onClick={handleSubmit}
            >
              <i className="ed-icon icon-plus-add white i-xs"></i>Schedule
              Class
            </button>
          </div>
        </div>
        {
          openAddEmailPopUp && <EmailAddPopUp showPopUp={openAddEmailPopUp} closePopUp={() => closePopUp()} />
        }
        {toggle && <ToggleFilter emptySearchTerm={emptySearchTerm} />}

        <ClassesList />
      </React.Fragment>
    </React.Fragment>
  );
}

export default OnlineClasses;
