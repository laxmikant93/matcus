import React from "react";
import EdneedAllVideos from "./EdneedAllVideos";
import AppLink from "../../Common/AppLink";

const Community = () => {
  return (
    <React.Fragment>
      <div className="EdneedVideoPageTopHead">
        <div className="EdneedVideoPageTopHeadItem">
          <p className="text-sm w-500">Join our learning community</p>
          <p className="text-xxs w-500">
            Practice knowledge sharing, productive networking and build the best
            practices in education-together
          </p>
        </div>
        <div className="EdneedVideoPageTopHeadItem">
          <AppLink to="/community" className="button button-primary btn-sm">
            Discover Community
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

export default Community;
