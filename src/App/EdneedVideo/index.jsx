import React from "react";
import EdneedVideoTabs from "./EdneedVideoTabs";
import CommunityTheme from "../../Common/Theme/CommunityTheme";
import { useSelector } from "react-redux";
import "./EdneedVideo.scss";
const EdneedVideo = () => {
  const user = useSelector((state) => state.user);
  return (
    <React.Fragment>
      <React.Fragment>
        <div className="edContainer">
          <div className="EdneedVideoHeadCst">
            <p className="w-300 text-sm">Hello {user.user_fullname}</p>
            <p className="text-xxs w-300">Let's start your Edneed journey.</p>
          </div>
          <EdneedVideoTabs />
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};

export default EdneedVideo;
