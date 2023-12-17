import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "../App/Auth/Login";
import { wesbiteLike, getWesbiteLike } from "../store/actions/institutewebsite";
import AppLinkUrl from "../Common/AppLink/AppLinkUrl";
import UseOutsideClick from "../Common/UseOutsideClick";
import SharePopUp from "../Common/SharePopUp";
import "./WebsiteLike.scss";
import { useNavigate } from "react-router-dom";
const InstituteLike = ({ like }) => {
  const history = useNavigate()
  const dispatch = useDispatch();
  const [LogedOff, setLogedOff] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [likeCount, setLikeCount] = useState("");
  const [alreadyLike, setalreadyLike] = useState(false);
  const [isfilled, setIsFilled] = useState(false);

  const [shareShow, setShareShow] = useState(false);
  const sharePop = useRef();

  UseOutsideClick(sharePop, () => {
    if (shareShow) setShareShow(false);
  });

  const manageModalState = () => {
    history("/auth/login")
    setModalState(!modalState);
  };

  const closeModalState = () => {
    setModalState(false);
  };

  const {
    users,
    instituteSubdomain,
    subdomainLikeInfo,
    subdomainLikeInfoSuccess,
  } = useSelector((state) => {
    return {
      users: state.user,
      instituteSubdomain: state.institutewebsite.data,
      subdomainLikeInfo: state.institutewebsite.subdomainliked.data,
      subdomainLikeInfoSuccess: state.institutewebsite.subdomainliked.success,
    };
  });

  let subdomainLink = AppLinkUrl.createSubdomain(
    instituteSubdomain.institute_subdomain
  );

  useEffect(() => {
    if (users.token === undefined) {
      setLogedOff(true);
    } else {
      setLogedOff(false);
      dispatch(getWesbiteLike(instituteSubdomain._id, users._id));
    }
    setLikeCount(like);
  }, [users, dispatch, instituteSubdomain, setLikeCount, like]);

  const likeClick = () => {
    if (LogedOff) {
      manageModalState();
    } else {
      if (!alreadyLike) {
        dispatch(wesbiteLike(postLikeData()));
        setLikeCount(likeCount + 1);
        setalreadyLike(true);
      } else {
        dispatch(wesbiteLike(postLikeData()));
        setLikeCount(likeCount - 1);
        setalreadyLike(false);
      }
    }
  };
  if (subdomainLikeInfo.length > 0 && subdomainLikeInfoSuccess && !isfilled) {
    setalreadyLike(true);
    setIsFilled(true);
  }

  const postLikeData = () => {
    return {
      liked: instituteSubdomain._id,
      user: users._id,
    };
  };

  return (
    <React.Fragment>
      <div className="rgtActionGroupBtn">
        <span className="institute-share-custom">
          <SharePopUp
            shareUrl={subdomainLink}
            shareBtnClass={"button sharebtn"}
            shareiconclass="i-xs"
            textName={"Website"}
          />
        </span>
        <span className="institute-like-calculate">
          {alreadyLike ? (
            <button
              className="button"
              onClick={likeClick}
            >
              <i className="ed-icon icon-like-heart i-xs"></i>
              {likeCount} {likeCount > 1 ? "Likes" : "Like"}
            </button>
          ) : (
            <button
              className="button likebtn"
              onClick={likeClick}
            >
              <i className="ed-icon icon-like-heart i-xs"></i>
              {likeCount} {likeCount > 1 ? "Likes" : "Like"}
            </button>
          )}
        </span>
      </div>
      <div className={`modal pop-login modalShowing-${modalState}`}>
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
              <Login hideGoogleLogin hideSignup />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default InstituteLike;
