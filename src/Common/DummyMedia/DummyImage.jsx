import React from "react";
import IconImageDummy from "./icon-image-dummy.svg";
const DummyImage = ({ Caption }) => {
  return (
    <div className="DummyBanner">
      <img src={IconImageDummy} alt="" />
      <p className="text-xs mt-10">{Caption}</p>
    </div>
  );
};

export default DummyImage;
