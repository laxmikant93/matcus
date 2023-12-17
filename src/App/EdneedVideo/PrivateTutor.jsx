import React from "react";
import EdneedAllVideos from "./EdneedAllVideos";
import AppLink from "../../Common/AppLink";

const PrivateTutor = () => {
  return (
    <React.Fragment>
      <div className="EdneedVideoPageTopHead">
        <div className="EdneedVideoPageTopHeadItem">
          <p className="text-sm w-500">Are you a private tutor or trainer?</p>
          <p className="text-xxs w-500">
            On Edneed you can digitize your classes in just 120 seconds
            seamlessly.
          </p>
        </div>
        <div className="EdneedVideoPageTopHeadItem">
          {/* <AppLink to="/register-institute" className="button button-primary btn-sm">
            Get Started
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

export default PrivateTutor;
