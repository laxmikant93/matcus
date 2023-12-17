import React from "react";
import ProfileAbout from "./About/ProfileAbout";
import ProfileStartServices from "./ProfileStartServices";
import ProfileExperience from "./Experience/ProfileExperience";
// import ProfileAffiliations from "./Affiliation/ProfileAffiliations";
import ProfileEducation from "./Education/ProfileEducation";
import ProfileLanguages from "./Language/ProfileLanguage";
import ProfileAward from "./Award/ProfileAward";
import ProfileAffiliations from "./Affiliation/ProfileAffiliations";
import { useSelector } from "react-redux";
import Certificate from "./Certificate/Certificate";
import Hobbies from "./Hobbies/Hobbies";

const ProfilePersonalInfo = () => {
  // const dispatch = useDispatch();
  // const [shouldVisible, setShouldVisible] = useState(false);

  const userProfile = useSelector(
    (state) => state.publicProfile.singleProfile.data.userInfo
  );

  const userId = useSelector((state) => state.user._id);
  const isnotUserFound = (userProfile && userProfile.user) !== userId;

  // useEffect(() => {
  //   // setShouldVisible(isUserFound);
  //   dispatch(getProfileExperience());
  // }, [dispatch]);

  return (
    <div className="ProfilePersonalInfo">
      {/* {(isAbout() || isUserFound) && <ProfileAbout />} */}
      <ProfileAbout />
      {userProfile && isnotUserFound && <ProfileStartServices />}
      {/* <ProfileStartServices /> */}
      <ProfileExperience />
      <ProfileAward />
      <ProfileAffiliations />
      <ProfileEducation />
      <Certificate />
      <Hobbies />
      <ProfileLanguages />
    </div>
  );
};

export default ProfilePersonalInfo;
