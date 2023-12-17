import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ValidationFile from "../../../../Classes/ValidationFile";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import FormError from "../../../../Common/Form/FormError";
import FormInput from "../../../../Common/Form/FormInput";
import InstituteTheme from "../../../../Common/Theme/InstituteTheme";
import {
  findInstituteInformation,
  resetManageInstituteInfo,
  updateInstituteInformation,
} from "../../../../store/actions/instituteregistration/action";
import "./SocialLinks.scss";
export default function AddSocialLinks() {
  const { users, institutedetail } = useSelector((state) => {
    return {
      users: state.user,
      institutedetail: state.manageinstituteinfo,
    };
  });
  const history = useNavigate();
  const dispatch = useDispatch();
  const [isFilled, setisFilled] = useState(false);
  const [facebookUrl, setFacebookUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [urlError, setUrlError] = useState(false);
  const [facebookUrlError, setFacebookUrlError] = useState(false);
  const [linkedinUrlError, setLinkedinUrlError] = useState(false);
  const [twitterUrlError, setTwitterUrlError] = useState(false);
  const [instagramUrlError, setInstagramUrlError] = useState(false);
  const [youtubeUrlError, setYoutubeUrlError] = useState(false);

 useEffect(()=>{
  if (institutedetail.success && !institutedetail.loading && !isFilled) {
    setisFilled(true);
    setFacebookUrl(institutedetail.data?.facebook_url);
    setLinkedinUrl(institutedetail.data?.linkedin_url);
    setTwitterUrl(institutedetail.data?.twitter_url);
    setInstagramUrl(institutedetail.data?.instagram_url);
    setYoutubeUrl(institutedetail.data?.youtube_url);
  }
 },[institutedetail, institutedetail.loading, institutedetail.success, isFilled])
  
  useEffect(() => {
    dispatch(findInstituteInformation(users.user_institute, users.user_business_type));
  }, [dispatch, users]);
  const handleInput = (e) => {
    let inputValue = e.target.value;
    let inputName = e.target.name;
    switch (inputName) {
      case "facebookUrl":
        setFacebookUrl(inputValue);
        setFacebookUrlError(
          facebookUrl && !ValidationFile.validFacebookLink(inputValue)
        );

        break;
      case "linkedinUrl":
        setLinkedinUrl(inputValue);
        setLinkedinUrlError(!ValidationFile.validlinkedinLink(inputValue));
        break;
      case "twitterUrl":
        setTwitterUrl(inputValue);
        setTwitterUrlError(!ValidationFile.validtwitterLink(inputValue));
        break;
      case "instagramUrl":
        setInstagramUrl(inputValue);
        setInstagramUrlError(!ValidationFile.validinstagramLink(inputValue));
        break;
      case "youtubeUrl":
        setYoutubeUrl(inputValue);
        setYoutubeUrlError(!ValidationFile.validyoutubeLink(inputValue));
        break;
      default:
        return false;
    }
  };
  useEffect(() => {
    return () => {
      dispatch(resetManageInstituteInfo());
    };
  }, [dispatch]);

  const validFacebookLink = () => {
    let isValid = true;
    if (facebookUrl) {
      if (!ValidationFile.validFacebookLink(facebookUrl)) {
        isValid = false;
      } else {
        isValid = true;
      }
    } else {
      isValid = true;
    }
    return isValid;
  };
  const validLinkedinLink = () => {
    let isValid = true;
    if (linkedinUrl) {
      if (!ValidationFile.validlinkedinLink(linkedinUrl)) {
        isValid = false;
      } else {
        isValid = true;
      }
    } else {
      isValid = true;
    }
    return isValid;
  };
  const validTwitterLink = () => {
    let isValid = true;
    if (twitterUrl) {
      if (!ValidationFile.validtwitterLink(twitterUrl)) {
        isValid = false;
      } else {
        isValid = true;
      }
    } else {
      isValid = true;
    }
    return isValid;
  };
  const validInstagramLink = () => {
    let isValid = true;
    if (instagramUrl) {
      if (!ValidationFile.validinstagramLink(instagramUrl)) {
        isValid = false;
      } else {
        isValid = true;
      }
    } else {
      isValid = true;
    }
    return isValid;
  };

  const validYoutubeLink = () => {
    let isValid = true;
    if (youtubeUrl) {
      if (!ValidationFile.validyoutubeLink(youtubeUrl)) {
        isValid = false;
      } else {
        isValid = true;
      }
    } else {
      isValid = true;
    }
    return isValid;
  };

  const handleSubmit = () => {
    setUrlError(true);

    const isValidFacebookLink = validFacebookLink();
    const isValidLinkdInLink = validLinkedinLink();
    const isValidTwitterLink = validTwitterLink();
    const isValidInstagramLink = validInstagramLink();
    const isValidYoutubeLink = validYoutubeLink();

    setFacebookUrlError(!isValidFacebookLink);
    setLinkedinUrlError(!isValidLinkdInLink);
    setTwitterUrlError(!isValidTwitterLink);
    setInstagramUrlError(!isValidInstagramLink);
    setYoutubeUrlError(!isValidYoutubeLink);

    if (
      isValidFacebookLink &&
      isValidLinkdInLink &&
      isValidTwitterLink &&
      isValidInstagramLink &&
      isValidYoutubeLink
    ) {
      dispatch(
        updateInstituteInformation(
          users.user_institute,
          socialLoginUrl(),
          "social",
          users.user_business_type
        )
      );
    }
  };

  const socialLoginUrl = () => {
    return {
      facebook_url: facebookUrl,
      linkedin_url: linkedinUrl,
      twitter_url: twitterUrl,
      instagram_url: instagramUrl,
      youtube_url: youtubeUrl,
    };
  };
  const [added, setAdded] = useState(false);
  if (institutedetail.updatesuccess && !added) {
    setAdded(true);
    history("/dashboard");
  }
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/add-social-links" title="Social Links" />
      </Breadcrumb>

      {!institutedetail.loading ? (
        <React.Fragment>
          <div className="PageTopHead PTH-SocialLinks mt-30">
            <div className="PTH-Item">
              <p className="text-sm">Social Links</p>
            </div>
          </div>
          <div className="AddSocialLinkWrap">
            {/* <div className="AddSocialLinkHead">
              <p className="text-xs dgray w-500">
                {users.user_institute_institute_name}
              </p>
              <p className="text-xs dgray w-500">
                {users.user_institute_institute_address}
              </p>
            </div> */}
            <div className="AddSocialLinkBody mt-20">
              <div className="AddSocialLinkItem">
                <div className="formFieldwrap">
                  <FormInput
                    type="text"
                    label="Facebook URL"
                    name="facebookUrl"
                    value={facebookUrl}
                    placeholder="Facebook URL"
                    onChange={handleInput}
                    onKeyUp={handleInput}
                  />

                  <FormError
                    show={facebookUrlError && urlError}
                    error="Please enter a valid Facebook URL."
                  />
                </div>
                <div className="formFieldwrap">
                  <FormInput
                    type="text"
                    label="Linkedin URL"
                    name="linkedinUrl"
                    value={linkedinUrl}
                    placeholder="Linkedin URL"
                    onChange={handleInput}
                    onKeyUp={handleInput}
                  />

                  <FormError
                    show={linkedinUrlError && urlError}
                    error="Please enter a valid Linkedin URL."
                  />
                </div>
                <div className="formFieldwrap">
                  <FormInput
                    type="text"
                    label="Twitter URL"
                    name="twitterUrl"
                    value={twitterUrl}
                    placeholder="Twitter URL"
                    onChange={handleInput}
                    onKeyUp={handleInput}
                  />

                  <FormError
                    show={twitterUrlError && urlError}
                    error="Please enter a valid Twitter URL."
                  />
                </div>
                <div className="formFieldwrap">
                  <FormInput
                    type="text"
                    label="Instagram URL"
                    name="instagramUrl"
                    value={instagramUrl}
                    placeholder="Instagram URL"
                    onKeyUp={handleInput}
                    onChange={handleInput}
                  />

                  <FormError
                    show={instagramUrlError && urlError}
                    error="Please enter a valid Instagram URL."
                  />
                </div>
                <div className="formFieldwrap">
                  <FormInput
                    type="text"
                    label="Youtube URL"
                    value={youtubeUrl}
                    name="youtubeUrl"
                    placeholder="Youtube URL"
                    onChange={handleInput}
                    onKeyUp={handleInput}
                  />

                  <FormError
                    show={youtubeUrlError && urlError}
                    error="Please enter a valid Youtube URL."
                  />
                </div>
                {institutedetail.updating ? (
                  <button
                    type="button"
                    className="button btn-md button-theme btn-md"
                  // onClick={handleSubmit}
                  >
                    Saving Social Links...
                  </button>
                ) : (
                  <button
                    type="button"
                    className="button btn-md button-theme btn-md"
                    onClick={handleSubmit}
                  >
                    Save Social Links
                  </button>
                )}
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div className="loadingGridData">
          <i className="ed-loadingGrid"></i>
        </div>
      )}
    </React.Fragment>
  );
}
