import React from "react";
import OppsFace from "./opps_face.svg";
import "./index.scss";

const NoDataAvailable = ({ title, Children }) => {
  return (
    <div className="noDataAvailableWrapper">
      {/* <img src={OppsFace} alt="Opps Face" /> */}
      {/* <p className="text-sm w-600 base mt-10">Oops!</p> */}
      <p className="text-xs w-500 mgray mt-5">{title}</p>
      {Children}
    </div>
  );
};

export default NoDataAvailable;
