import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getStudentUserInfoData } from "../../store/actions/studentlistuserinfo";
// import { messaging } from "../../firebase/messaginInit";
// import { getMessaging } from "firebase/messaging"
// import { subscriberToTopic } from "../../firebase/subscribetopic";
import {
  // getPublicProfiles,
  // getpublicprofileById,
  putLike,
  putUnlike,
  putFollow,
  putUnfollow,
} from "../../store/actions/publicProfile";
import { useLocation } from "react-router-dom";
import SharePopUp from "../../Common/SharePopUp";
// import ProfileOwnerEdit from "./ProfileOwnerEdit";
import Login from "../Auth/Login";
import { showSuccessPopup } from "../../store/actions/successmessagepopup";
import GetNotification from "../Notifications/GetNotification";

const ProfileSocialAction = () => {
  // use this for server
  // let profileUrl = window.location.hostname;

  // use this for local
  let profileUrl = window.location.host;

  const dispatch = useDispatch();
  const param = useLocation();
  const paramid = param.pathname.split("/");
  const username = paramid.pop();
  const { users, singleProfile, datasuccess } = useSelector((state) => {
    return {
      singleProfile: state.publicProfile.singleProfile.data.userInfo,
      users: state.user,
      datasuccess: state.publicProfile.singleProfile.success,
    };
  });
  const [isLike, setIsLike] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [likevalue, setLike] = useState("Like");
  const [followvalue, setFollow] = useState("Follow");
  const profileId = singleProfile && singleProfile._id;
  const userId = users._id;
  const IsOnline = users && userId;
  if (!isLike && datasuccess) {
    setIsLike(true);
    singleProfile && singleProfile.like.includes(userId)
      ? setLike("Liked")
      : setLike("Like");
  }

  if (!isFollow && datasuccess && IsOnline) {
    setIsFollow(true);
    singleProfile && singleProfile.follower.includes(userId)
      ? setFollow("Following")
      : setFollow("Follow");
  }

  useEffect(() => {
    singleProfile && singleProfile.follower.includes(userId)
      ? setFollow("Following")
      : setFollow("Follow");
  }, [singleProfile, dispatch, userId]);
  const addLike = () => {
    if (likevalue === "Like" && IsOnline) {
      dispatch(putLike(userId, profileId));

      datasuccess && setLike("Liked");
    } else if (likevalue === "Liked" && IsOnline) {
      dispatch(putUnlike(userId, profileId));
      datasuccess && setLike("Like");
    } else {
    }
    // datasuccess && !likevalue === "Unlike" ? setLike("Unlike") : setLike("Like");
  };

  const addFollow = () => {
    if (followvalue === "Follow" && IsOnline) {
      dispatch(putFollow(userId, profileId));
      datasuccess && setFollow("Following");
    } else if (followvalue === "Following" && IsOnline) {
      dispatch(putUnfollow(userId, profileId));
      datasuccess && setFollow("Follow");
    } else {
    }
    // datasuccess && followvalue === "Follow"
    //   ? setFollow("Unfollow")
    //   : setFollow("Follow");
  };
  const [modalState, setModalState] = useState(false);

  const closeModalState = () => {
    setModalState(false);
  };

  const manageModalState = () => {
    setModalState(!modalState);
  };

  return (
    <div className="ProfileSocialAction">
      {/* <ProfileOwnerEdit userInfo={singleProfile ? singleProfile : {}} /> */}

      {singleProfile && users._id !== singleProfile.user ? (
        <button
          className={`button btn-sm w-600 ${followvalue === "Follow" ? "button-white primary" : "button-primary"
            }`}
          onClick={() => (users._id ? addFollow() : manageModalState())}
        >
          {followvalue === "Follow" && (
            <i className="ed-icon icon-plus-add primary i-xs"></i>
          )}
          {followvalue === "Following" && (
            <i className="ed-icon icon-check white i-xs"></i>
          )}
          {followvalue}
        </button>
      ) : (
        ""
      )}
      <SharePopUp
        shareUrl={`${profileUrl}/profile/${username}`}
        textName={"Profile"}
        shareBtnClass="button btn-sm button-white primary w-600"
        shareiconclass="primary i-xs"
      />

      {singleProfile && users._id !== singleProfile.user ? (
        <button
          className={`button btn-sm w-600 ${likevalue === "Like" ? "button-white primary" : "button-primary"
            }`}
          onClick={() => (users._id ? addLike() : manageModalState())}
        >
          <i
            className={`ed-icon icon-like-thumb  i-xs ${likevalue === "Like" ? "primary" : "white"
              }`}
          ></i>
          {likevalue}
        </button>
      ) : (
        ""
      )}


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

              <Login hideGoogleLogin={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSocialAction;