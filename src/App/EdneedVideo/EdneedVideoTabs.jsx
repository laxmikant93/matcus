import React, { useEffect, useState } from "react";
import Teacher from "./Teacher";
import Students from "./Students";
import SchoolAdmin from "./SchoolAdmin";
import PrivateTutor from "./PrivateTutor";
import EdneedAllVideos from "./EdneedAllVideos";
import Community from "./Community";
import {
  readAllYoutubeVideos,
  sortYoutubeVideos,
} from "../../store/actions/edneedYoutube";
import { useDispatch } from "react-redux";

const EdneedVideoTabs = () => {
  const [toggle, setToggle] = useState("EdneedAllVideos");
  const dispatch = useDispatch();
  useEffect(() => {
    if (toggle === "EdneedAllVideos") {
      dispatch(readAllYoutubeVideos());
    } else if (toggle === "privateTutor") {
      dispatch(sortYoutubeVideos("schoolAdmin"))
    }
    else {
      dispatch(sortYoutubeVideos(toggle));
    }

  }, [toggle, dispatch]);

  return (
    <React.Fragment>
      <div className="EdneedVideoTabBar">
        <div className="EdneedVideoTabBarCst scroll-nav-tab-wrapper">
          <ul className="EdneedVideoTabList scroll-nav-tab">
            <li
              className={toggle === "EdneedAllVideos" ? "active" : ""}
              onClick={() =>
                setToggle("EdneedAllVideos")
              }
            >
              All Videos
            </li>
            <li
              className={toggle === "schoolAdmin" ? "active" : ""}
              onClick={() =>
                setToggle("schoolAdmin")
              }
            >
              Institute Admin
            </li>
            <li
              className={toggle === "privateTutor" ? "active" : ""}
              onClick={() =>
                setToggle("privateTutor")
              }
            >
              Private Tutor
            </li>
            <li
              className={toggle === "teacher" ? "active" : ""}
              onClick={() =>
                setToggle("teacher")
              }
            >
              Teacher
            </li>
            <li
              className={toggle === "student" ? "active" : ""}
              onClick={() =>
                setToggle("student")
              }
            >
              Students
            </li>
            {/* <li
              className={toggle === "community" ? "active" : ""}
              onClick={() =>
                setToggle("community")
              }
            >
              Community
            </li> */}
          </ul>
        </div>
      </div>
      <div className="ProfileTabListContent">
        {toggle === "EdneedAllVideos" ? (
          <EdneedAllVideos />
        ) : toggle === "schoolAdmin" ? (
          <SchoolAdmin />
        ) : toggle === "privateTutor" ? (
          <PrivateTutor />
        ) : toggle === "teacher" ? (
          <Teacher />
        ) : toggle === "student" ? (
          <Students />
        ) : toggle === "community" ? (
          <Community />
        ) : (
          <EdneedAllVideos toggleOption={toggle} />
        )}
      </div>
    </React.Fragment>
  );
};

export default EdneedVideoTabs;
