import React from "react";
import IconVideoDummy from "./icon-video-dummy.svg";

const DummyVideo = ({ Caption }) => {
  return (
    <div className="DummyVideo">
      <img src={IconVideoDummy} alt="" />
      <p className="text-xs mt-10">{Caption}</p>
    </div>
  );
};

export default DummyVideo;
