import React from "react";
import EdneedAllVideos from "./EdneedAllVideos";
import AppLink from "../../Common/AppLink";

const Teacher = () => {
  return (
    <React.Fragment>
      <div className="EdneedVideoPageTopHead">
        <div className="EdneedVideoPageTopHeadItem">
          <p className="text-sm w-500">Are you a teacher?</p>
          <p className="text-xxs w-500">
            Are you associated with any institute? Find them on Edneed.
          </p>
        </div>
        <div className="EdneedVideoPageTopHeadItem">
          <AppLink to="/Institute/institute-listing" className="button button-primary btn-sm">
            Discover Institutes
          </AppLink>
          <AppLink to="/request-demo" className="button btn-o-primary primary btn-sm">
            Book Free Demo
          </AppLink>
        </div>
      </div>
      <EdneedAllVideos />
    </React.Fragment>
  );
};

export default Teacher;
