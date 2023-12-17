import React from "react";
// import CommunityFeed from "./CommunityFeed";
// import InstagramFeed from "./InstagramFeed";
// import InstituteListingFeed from "./InstituteListingFeed";
import HomeFooter from "../../Layout/WithoutAuthLayout/Footer";
import FeedHeroContent from "./FeedHeroContent";
import CommunityTheme from "../../Common/Theme/CommunityTheme";
import { useSelector } from "react-redux";
import CommunityFeed from "./CommunityFeed";
import InstagramFeed from "./InstagramFeed";
import InstituteListingFeed from "./InstituteListingFeed";

// import FeedHead from "./FeedHead";
import "./EdneedFeed.scss";
import SelectRow from "../Auth/SelectRow";
import ServicesSelection from "../Auth/ServiceSelection";
// import HomeRoute from "../../AppRouting/HomeRoute";
const EdneedFeed = () => {
  const user = useSelector((state) => state.user);
  return (
    <React.Fragment>
      <React.Fragment>
        {!user.user_institute ? <ServicesSelection /> :
          <>
            <FeedHeroContent />
            <CommunityFeed />

            <InstituteListingFeed />

            <InstagramFeed />

            {/* <HomeFooter /> */}
          </>
        }
      </React.Fragment>
    </React.Fragment>
  );
};
export default EdneedFeed;
