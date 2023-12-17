import React from "react";
import AppLink from "../../Common/AppLink";
import EdneedAllVideos from "./EdneedAllVideos";

const SchoolAdmin = () => {
  return (
    <React.Fragment>
      <div className="EdneedVideoPageTopHead">
        <div className="EdneedVideoPageTopHeadItem">
          <p className="text-sm w-500">Are you an institute owner?</p>
          <p className="text-xxs w-500">
            Digitize your institute and conduct online classes, assignments and
            tests with Edneed's Learning Management System.
          </p>
        </div>
        <div className="EdneedVideoPageTopHeadItem">
          {/* <AppLink to="/register-institute" className="button button-primary btn-sm">
            Add Institute
          </AppLink> */}
          <AppLink to="/request-demo" className="button btn-o-primary primary btn-sm">
            Book Free Demo
          </AppLink>
        </div>
      </div>
      <EdneedAllVideos />
    </React.Fragment>
  );
};

export default SchoolAdmin;
