import React, { useRef } from "react";
// import { BackgroundDefault, DummyProfile } from "../../Common/Images";
import ProfileSocialAction from "./ProfileSocialAction";
import { useState } from "react";
import Cropper from "../../Common/Cropper";
import { useDispatch, useSelector } from "react-redux";
import {
  getContact,
  postProfileBanner,
  putFollow,
} from "../../store/actions/publicProfile";
import Login from "../Auth/Login";
import ListModal from "./ListModal";
import ProfileOwnerEdit from "./ProfileOwnerEdit";
import { useEffect } from "react";
import {
  getProfileReviews,
  getfollowerList,
  getfollowingList,
  getpublicprofileById,
} from "../../store/actions/publicProfile";
import ManageProfileDefaultBanner from "../../assets/images/img/profile-banner-default.png";
import SessionStorage from "../../Classes/SessionStorage";
import Uploader from "../../Common/ImageUploader";
import UploadButton from "../../Common/UploadButton";
import ImageViewer from "../../Common/ImageViewer";

const ProfileHero = ({ setTabbar }) => {
  const dispatch = useDispatch();
  const ref = useRef()
  const { singleProfile, user, userLink, followerList, followingList, review } =
    useSelector((state) => {
      return {
        singleProfile: state.publicProfile.singleProfile.data.userInfo,
        user: state.user,
        userLink: state.publicProfile.editLink.data,
        followingList: state.publicProfile.followingList.data,
        datasuccess: state.publicProfile.singleProfile.success,
        followerList: state.publicProfile.followerList.data,
        review: state.publicProfile.reviews,
      };
    });
  const [FollowersListModal, SetFollowersListModal] = useState(false);
  const [FollowingListModal, SetFollowingListModal] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [webhttp, setWebhttp] = useState(false);
  const [facehttp, setFacehttp] = useState(false);
  const [twihttp, setTwihttp] = useState(false);
  const [instahttp, setInstahttp] = useState(false);
  const [linkhttp, setLinkhttp] = useState(false);
  const [youtubehttp, setYoutubehttp] = useState(false);
  const id = singleProfile && singleProfile.user;
  useEffect(() => {
    id && dispatch(getProfileReviews(id));
    id && dispatch(getContact(id));
    id && dispatch(getfollowingList(id));
    id && dispatch(getfollowerList(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (userLink.website) {
      userLink.website.includes("http") ? setWebhttp(true) : setWebhttp(false);
    }
    if (userLink.facebook) {
      userLink.facebook.includes("http")
        ? setFacehttp(true)
        : setFacehttp(false);
    }
    if (userLink.twitter) {
      userLink.twitter.includes("http") ? setTwihttp(true) : setTwihttp(false);
    }
    if (userLink.instagram) {
      userLink.instagram.includes("http")
        ? setInstahttp(true)
        : setInstahttp(false);
    }
    if (userLink.linkedin) {
      userLink.linkedin.includes("http")
        ? setLinkhttp(true)
        : setLinkhttp(false);
    }
    if (userLink.youtube) {
      userLink.youtube.includes("http")
        ? setYoutubehttp(true)
        : setYoutubehttp(false);
    }
  }, [userLink]);

  useEffect(() => {
    if (
      SessionStorage.alive("__review_oo_n_log") ||
      SessionStorage.getBool("__review_oo_n_log") === "true"
    ) {
      setTabbar("ProfileReviews");
      SessionStorage.remove("__review_oo_n_log");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const userId=user && user._id;
  const isFound = id === user._id;
  const userValid = user && user._id;
  const isOnline = user && user._id;
  const [imgLink, setImgLink] = useState("");

  const [EditModal, SetEditModal] = useState(false);
  const [focusForWebsite, setfocusForWebsite] = useState(false);
  const [focusForSocialLinks, setfocusForSocialLinks] = useState(true);
  const [focusForHeadline, setfocusForHeadline] = useState(false);
  // const noLinks =   userLink &&   userLink.facebook &&  userLink.linkedin &&userLink.instagram &&userLink.twitter &&
  //   userLink.youtube ? true : false;
  const someLink =
    userLink &&
      (userLink.facebook ||
        userLink.linkedin ||
        userLink.instagram ||
        userLink.twitter ||
        userLink.youtube)
      ? true
      : false;

  const manageModalState = (website, socialLink, headline) => {
    SetEditModal(!EditModal);
    setfocusForWebsite(website);
    setfocusForSocialLinks(socialLink);
    setfocusForHeadline(headline);
  };

  const updateImage = (data) => {
    setImgLink(data);
    const postData = {
      public_profile_banner: data,
    };
    dispatch(postProfileBanner(id, postData));
  };
  let username = singleProfile && singleProfile.username;
  const profile_id = singleProfile && singleProfile._id;
  const userId = user && user._id;
  const removeImage = () => {
    setImgLink("");
    dispatch(postProfileBanner(id, { public_profile_banner: "" }));
  };

  const oncloseFollowersListModal = () => {
    SetFollowersListModal(!FollowersListModal);
  };
  const oncloseFollowingListModal = () => {
    SetFollowingListModal(!FollowingListModal);
  };
  const imgIsFalse = userLink.public_profile_picture === "false" ? true : false;

  /*** Get last word from Name ***/
  function getLastWord(words) {
    var lastLetter = words.split(" ");
    return lastLetter[lastLetter.length - 1][0];
  }
  const closeModalState = () => {
    setModalState(false);
  };

  const addFollow = () => {
    if (user && userId) {
      dispatch(putFollow(userId, profile_id));
      setTimeout(() => {
        dispatch(getpublicprofileById(username));
      }, 500);
    } else {
      setModalState(!modalState);
    }
  };

  const changeTabbar = () => {
    if (user && userId) {
      setTabbar("ProfileReviews");
    } else {
      setModalState(!modalState);
      if (!user.token) {
        SessionStorage.setBool("__review_oo_n_log", true);
      }
    }
  };

  return (
    <React.Fragment>
      {/* <button>Add</button> */}
      <div className="ProfileHeroCst">
        <div className="ProfileHeroCover">
          {imgLink === "" &&
            // imgLink === null &&
            // imgLink === undefined &&
            singleProfile &&
            !singleProfile.public_profile_banner?.src ? (
            <div className="DefaultProfileHeroCover">
              <img
                className="DefaultProfileHeroCoverImg"
                src={ManageProfileDefaultBanner}
                alt="Manage Profile Banner"
              />
              <div className="UploadPublicProfileButton">
                {isFound && (
                  <React.Fragment>
                    <UploadButton
                        BtnName="Upload File"
                       IconClassName="i-md gray"
                        BtnPropClass="button-primary button-s CropUploadBtn"
                        onClick={() => {
                          ref.current.open();
                        }}
                      />
                      <Uploader
                        onclose={() => ref.current.close()}
                        multiSelect={false}
                        discartRef={ref}
                        onUploaded={(data) => updateImage(data)}
                        uploadLimit={1}
                      />
                  </React.Fragment>
                )}
              </div>
            </div>
          ) : (
            // { (singleProfile && singleProfile.public_profile_banner)

            // }
            singleProfile && (
              <ImageViewer
                className="ProfileHeroCoverImage"
                object={
                  imgLink ||
                  (singleProfile && singleProfile.public_profile_banner)
                }
                alt="User Cover"
              />
            )
          )}
          <div className="PublicProfileActionButtonAfter CoverGroupBtn">
            {isFound ? (
              imgLink === "" &&
                singleProfile &&
                !singleProfile.public_profile_banner ? (
                ""
              ) : (
                <React.Fragment>
                   <UploadButton
                        BtnName="Upload File"
                       IconClassName="i-md gray"
                        InputOvelapClass="button coverRemove"
                    InputOvelapLabel="Change"
                    InputUploadIconClass="icon-edit primary i-xs"
                        BtnPropClass="button-primary button-s CropUploadBtn"
                        onClick={() => {
                          ref.current.open();
                        }}
                      />
                      <Uploader
                        onclose={() => ref.current.close()}
                        multiSelect={false}
                        discartRef={ref}
                        onUploaded={(data) => updateImage(data)}
                        uploadLimit={1}
                      />
                  <button
                    className="button coverRemove"
                    type="button"
                    onClick={removeImage}
                  >
                    Remove
                  </button>
                </React.Fragment>
              )
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="ProfileHeroProf">
          <div className="PH-ProfilePic">
            {userLink && userLink.public_profile_picture && !imgIsFalse ? (
              <img
                className="personal-profpic-img"
                src={userLink && userLink.public_profile_picture}
                alt="user_profile"
              />
            ) : (
              <React.Fragment>
                <div className="DefaultPH-ProfilePic">
                  {singleProfile &&
                    singleProfile.name &&
                    singleProfile.name.substring(0, 1)}
                  {getLastWord(
                    singleProfile && singleProfile.name
                      ? singleProfile.name
                      : ""
                  )}
                </div>
              </React.Fragment>
            )}
          </div>
          <div className="PH-ProfileUserName">
            <div className="PH-UserName">
              <p className="text-md w-500">
                {userLink && userLink.name
                  ? userLink.name
                  : singleProfile && singleProfile.name}
              </p>
            </div>
            <div className="PH-Designation">
              {userLink && userLink.short_intro ? (
                <p className="base text-xs w-500">{userLink.short_intro}</p>
              ) : (
                isFound && (
                  // : singleProfile && singleProfile.short_intro ? (
                  //   singleProfile.short_intro
                  // )
                  <p
                    className="base w-500 text-xs"
                    onClick={() =>
                      isFound && manageModalState(false, false, true)
                    }
                  >
                    Add Your Profile Headline
                  </p>
                )
              )}
            </div>
            {isFound ? (
              <div className="PH-webDesignation mt-3">
                {userLink && userLink.website ? (
                  <>

                    {webhttp ? (
                      <a
                        href={userLink.website}
                        className="primary text-xs"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="ed-icon icon-web primary i-xs mt-3"></i>
                        {userLink.website}
                      </a>
                    ) : (
                      !webhttp && (
                        <a
                          href={`http://${userLink.website}`}
                          className="primary text-xs"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="ed-icon icon-web primary i-xs mt-3"></i>
                          {userLink.website}
                        </a>
                      )
                    )}
                  </>
                ) : singleProfile && singleProfile.website ? (
                  singleProfile.website
                ) : (
                  <>
                    <i className="ed-icon icon-web primary i-xs"></i>
                    <p
                      className="primary text-xs"
                      onClick={() =>
                        isFound && manageModalState(true, false, false)
                      }
                    >
                      Add Your Website
                    </p>
                  </>
                )}
              </div>
            ) : (
              userLink &&
              userLink.website && (
                <div className="PH-webDesignation mt-3">


                  {userLink && userLink.website ? (
                    webhttp ? (
                      <a
                        href={userLink.website}
                        hreflang="en-ca"
                        className="primary text-xs"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <i className="ed-icon icon-web primary i-xs"></i>
                        {userLink.website}
                      </a>
                    ) : (
                      !webhttp && (
                        <a
                          href={userLink.website}
                          hreflang="en-ca"
                          className="primary text-xs"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="ed-icon icon-web primary i-xs"></i>
                          {userLink.website}
                        </a>
                      )
                    )
                  ) : singleProfile && singleProfile.website ? (
                    singleProfile.website
                  ) : (
                    ""
                  )}
                </div>
              )
            )}
          </div>
          <div className="PH-ProfileSocialAction">
            {isFound ? (
              <button
                className="button btn-o-primary primary btn-sm"
                onClick={() => manageModalState()}
              >
                <i className="ed-icon icon-edit i-xxs primary"></i>
                Edit
              </button>
            ) : (
              ""
            )}
            {EditModal && (
              <ProfileOwnerEdit
                userInfo={singleProfile ? singleProfile : {}}
                EditModal={EditModal}
                SetEditModal={SetEditModal}
                focusForWebsite={focusForWebsite}
                focusForSocialLinks={focusForSocialLinks}
                focusForHeadline={focusForHeadline}
                singleProfile={singleProfile}
              />
            )}
            <ProfileSocialAction />
          </div>
          <div className="PH-ProfileHeroProfileInfoWrap scroll-nav-tab-wrapper  mt-20">
            <div className="PH-ProfileHeroProfileInfo">
              <div className="PH-Profile-Info-Item">
                <p className="text-xxs">
                  {singleProfile &&
                    singleProfile.follower &&
                    singleProfile.follower.length > 1
                    ? "Followers"
                    : "Follower"}
                </p>
                <div className="PH-Profile-Info-Item-body">
                  {singleProfile &&
                    singleProfile.follower &&
                    singleProfile.follower.length > 0 ? (
                    singleProfile.follower.length
                  ) : !isFound ? (
                    <p className="text-xxs primary" onClick={addFollow}>
                      Be the First One
                    </p>
                  ) : (
                    <p className="text-xs">0</p>
                  )}
                  {singleProfile && singleProfile.follower.length > 0 ? (
                    <i
                      className="ed-icon icon-external-link i-xs base"
                      onClick={() =>
                        singleProfile &&
                          singleProfile.follower &&
                          singleProfile.follower.length > 0 &&
                          userValid
                          ? SetFollowersListModal(true)
                          : !userValid &&
                          singleProfile.follower &&
                          singleProfile.follower.length > 0 &&
                          setModalState(!modalState)
                      }
                    ></i>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="PH-Profile-Info-Item">
                <p className="text-xxs">
                  {singleProfile.following && singleProfile.following.length > 1
                    ? "Followings"
                    : "Following"}
                </p>
                <div className="PH-Profile-Info-Item-body">
                  <p className="text-xs">
                    {isFound
                      ? singleProfile &&
                        singleProfile.following &&
                        singleProfile.following.length > 0
                        ? singleProfile.following.length
                        : "0"
                      : !isFound &&
                      (singleProfile &&
                        singleProfile.following &&
                        singleProfile.following.length > 0
                        ? singleProfile.following.length
                        : "-")}
                  </p>
                  {singleProfile && singleProfile.following.length > 0 ? (
                    <i
                      className="ed-icon icon-external-link i-xs base"
                      onClick={() =>
                        singleProfile &&
                          singleProfile.following &&
                          singleProfile.following.length > 0 &&
                          userValid
                          ? SetFollowingListModal(true)
                          : !userValid &&
                          singleProfile.following &&
                          singleProfile.following.length > 0 &&
                          setModalState(!modalState)
                      }
                    ></i>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="PH-Profile-Info-Item">
                <p className="text-xxs">
                  {singleProfile &&
                    singleProfile.like &&
                    singleProfile.like.length > 1
                    ? "Likes"
                    : "Like"}
                </p>
                <div className="PH-Profile-Info-Item-body">
                  <p className="text-xs">
                    {singleProfile && singleProfile.like
                      ? singleProfile.like.length
                      : "0"}
                  </p>
                </div>
              </div>
              <div className="PH-Profile-Info-Item">
                <p className="text-xxs">
                  {review && review.allReviews && review.allReviews.length > 1
                    ? "Reviews"
                    : "Review"}
                </p>
                <div className="PH-Profile-Info-Item-body">
                  {!isFound ? (
                    review &&
                      review.allReviews &&
                      review.allReviews.length > 0 ? (
                      <p className="text-xs">{review.allReviews.length} </p>
                    ) : (
                      <p
                        className="text-xs primary"
                        onClick={() => changeTabbar()}
                      >
                        write first review{" "}
                      </p>
                    )
                  ) : review && review.allReviews ? (
                    <p className="text-xs">{review.allReviews.length}</p>
                  ) : (
                    <p className="text-xs">0</p>
                  )}
                </div>
              </div>
              <div className="PH-Profile-Info-Item">
                <p className="text-xxs">Social Links</p>
                <div className="PH-Profile-Info-Item-body">
                  {isFound ? (
                    !someLink ? (
                      <p
                        className="text-xs primary"
                        onClick={() => manageModalState(false, true, false)}
                      >
                        Add Social Links
                      </p>
                    ) : (
                      someLink && (
                        <>
                          {userLink && userLink.facebook && facehttp ? (
                            <a
                              href={userLink && userLink.facebook}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="ed-icon icon-fb base i-xs"></i>
                            </a>
                          ) : (
                            !facehttp &&
                            userLink &&
                            userLink.facebook && (
                              <a
                                href={`http://${userLink && userLink.facebook}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="ed-icon icon-fb base i-xs"></i>
                              </a>
                            )
                          )}
                          {userLink && userLink.twitter && twihttp ? (
                            <a
                              href={userLink && userLink.twitter}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="ed-icon icon-twitter base i-xs"></i>
                            </a>
                          ) : (
                            !twihttp &&
                            userLink &&
                            userLink.twitter && (
                              <a
                                href={`http://${userLink && userLink.twitter}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="ed-icon icon-twitter base i-xs"></i>
                              </a>
                            )
                          )}
                          {userLink && userLink.linkedin && linkhttp ? (
                            <a
                              href={userLink && userLink.linkedin}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="ed-icon icon-linkedin base i-xs"></i>
                            </a>
                          ) : (
                            !linkhttp &&
                            userLink &&
                            userLink.linkedin && (
                              <a
                                href={`http://${userLink && userLink.linkedin}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="ed-icon icon-linkedin base i-xs"></i>
                              </a>
                            )
                          )}
                          {userLink && userLink.instagram && instahttp ? (
                            <a
                              href={userLink && userLink.instagram}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="ed-icon icon-instagram base i-xs"></i>
                            </a>
                          ) : (
                            userLink &&
                            userLink.instagram &&
                            !instahttp && (
                              <a
                                href={`http://${userLink && userLink.instagram
                                  }`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="ed-icon icon-instagram base i-xs"></i>
                              </a>
                            )
                          )}
                          {userLink && userLink.youtube && youtubehttp ? (
                            <a
                              href={userLink && userLink.youtube}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="ed-icon icon-youtube base i-s"></i>
                            </a>
                          ) : (
                            userLink &&
                            userLink.youtube &&
                            !youtubehttp && (
                              <a
                                href={`http://${userLink && userLink.youtube}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="ed-icon icon-youtube base i-s"></i>
                              </a>
                            )
                          )}
                        </>
                      )
                    )
                  ) : (
                    !isFound && (
                      <>
                        {!someLink ? (
                          <p className="text-xs">-</p>
                        ) : (
                          someLink && (
                            <>
                              {userLink && userLink.facebook && facehttp ? (
                                <a
                                  href={userLink && userLink.facebook}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <i className="ed-icon icon-fb base i-xs"></i>
                                </a>
                              ) : (
                                !facehttp &&
                                userLink &&
                                userLink.facebook && (
                                  <a
                                    href={`http://${userLink && userLink.facebook
                                      }`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <i className="ed-icon icon-fb base i-xs"></i>
                                  </a>
                                )
                              )}
                              {userLink && userLink.twitter && twihttp ? (
                                <a
                                  href={userLink && userLink.twitter}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <i className="ed-icon icon-twitter base i-xs"></i>
                                </a>
                              ) : (
                                !twihttp &&
                                userLink &&
                                userLink.twitter && (
                                  <a
                                    href={`http://${userLink && userLink.twitter
                                      }`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <i className="ed-icon icon-twitter base i-xs"></i>
                                  </a>
                                )
                              )}
                              {userLink && userLink.linkedin && linkhttp ? (
                                <a
                                  href={userLink && userLink.linkedin}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <i className="ed-icon icon-linkedin base i-xs"></i>
                                </a>
                              ) : (
                                !linkhttp &&
                                userLink &&
                                userLink.linkedin && (
                                  <a
                                    href={`http://${userLink && userLink.linkedin
                                      }`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <i className="ed-icon icon-linkedin base i-xs"></i>
                                  </a>
                                )
                              )}
                              {userLink && userLink.instagram && instahttp ? (
                                <a
                                  href={userLink && userLink.instagram}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <i className="ed-icon icon-instagram base i-xs"></i>
                                </a>
                              ) : (
                                userLink &&
                                userLink.instagram &&
                                !instahttp && (
                                  <a
                                    href={`http://${userLink && userLink.instagram
                                      }`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <i className="ed-icon icon-instagram base i-xs"></i>
                                  </a>
                                )
                              )}
                              {userLink && userLink.youtube && youtubehttp ? (
                                <a
                                  href={userLink && userLink.youtube}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <i className="ed-icon icon-youtube base i-s"></i>
                                </a>
                              ) : (
                                userLink &&
                                userLink.youtube &&
                                !youtubehttp && (
                                  <a
                                    href={`http://${userLink && userLink.youtube
                                      }`}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <i className="ed-icon icon-youtube base i-s"></i>
                                  </a>
                                )
                              )}
                            </>
                          )
                        )}
                      </>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`modal c-modal modalShowing-${modalState}`}>
          <div className="modalwrapper">
            <div className="modalHead">
              <span
                className="closeModal text-xxs gray"
                onClick={() => closeModalState()}
              >
                {" "}
                Close
              </span>
            </div>
            <div className="modalbody">
              <div className="pageFullCenter">
                {/* <Login hideSignup /> */}
                <Login hideGoogleLogin={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ListModal
        ShowModalProp={FollowersListModal}
        CloseModalProp={oncloseFollowersListModal}
        List={followerList}
        userId={user._id}
        type="Follower"
        singleProfile={singleProfile}
        isOnline={isOnline}
        isFound={isFound}
      />
      <ListModal
        ShowModalProp={FollowingListModal}
        CloseModalProp={oncloseFollowingListModal}
        List={followingList}
        userId={user._id}
        type="Following"
        singleProfile={singleProfile}
        isOnline={isOnline}
      />
    </React.Fragment>
  );
};

export default ProfileHero;
