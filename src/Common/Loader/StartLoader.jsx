import React from "react";
import "./Loader.scss";

export default function StartLoader() {
  return (
    <div className="startLoader">
      <div className="loaderCircle"></div>
      <div className="loderCnt">
        <p className="loaderHead">EdNeed</p>
        <p className="loadersubhead">endless & beyond</p>
      </div>
    </div>
  );
}
