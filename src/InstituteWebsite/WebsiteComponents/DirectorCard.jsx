import { string } from "prop-types";
import React, { useEffect, useState } from "react";
import DummyProfile from "../../assets/images/img/DummyProfile.png";
import FormatText from "../../Common/FormatText";
import AppLink from "../../Common/AppLink";
import { useSelector } from "react-redux";
import ImageViewer from "../../Common/ImageViewer";
const DirectorCard = ({ profile, name, position, message }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { users, instituteWebsite } = useSelector((state) => {
    return {
      instituteWebsite: state.institutewebsite.data,
      users: state.user,
    };
  });

  useEffect(() => {
    if (users.token) {
      if (
        users._id === instituteWebsite.owner &&
        users.user_activeRole === process.env.REACT_APP_PAGE_OWNER &&
        users.user_institute_institute_subdomain ===
        instituteWebsite.institute_subdomain
      ) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [users, instituteWebsite]);

  return (
    <div className="institute-Director-msg">
      <div className="director-profile">
        {/* {(name || position || message) &&  */}
        <span className="director-profile-img">
          {profile ? (
            <ImageViewer object={profile} className="img-fluid" />
            // <img src={profile} className="img-fluid" alt="Director" />
          ) : (
            <img src={DummyProfile} className="img-fluid" alt="Director" />
          )}
        </span>
        {/* } */}
        <span className="director-profile-name">
          {name && <p className="subheading">{name}</p>}

          {position && <p>{position}</p>}
        </span>
      </div>

      <div className="director-message mt-5">
        {message ? (
          <FormatText text={message}>
            {({ formatedText }) => (
              <p className="sun-editor-output"
                dangerouslySetInnerHTML={{ __html: formatedText }}
              ></p>
            )}
          </FormatText>
        ) : (
          <>
            {isLoggedIn ? (
              <React.Fragment>
                <p className="text-xxs base">
                  Founder’s message field is empty. Parents are curious about
                  this information.
                </p>
                <AppLink
                  className="linkbtn text-xxs mt-20"
                  to="/institute-info-manage"
                  target="_blank"
                >
                  Add Founder’s Message
                </AppLink>
              </React.Fragment>
            ) : (
              <p className="NoContentFoundCst">No Data Found</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

DirectorCard.defaultProps = {
  profile: undefined,
  name: undefined,
  position: undefined,
  message: undefined,
};

DirectorCard.propTypes = {
  profile: string,
  name: string,
  position: string,
  message: string,
};

export default DirectorCard;
