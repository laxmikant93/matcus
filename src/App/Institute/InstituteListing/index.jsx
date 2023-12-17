/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InstituteListingTop from "../../Institute/InstituteListing/InstituteListingTop";

import {
  getInstituteListingList,
  getUserLikeInfo,
  scrollInstituteDataList,
  wesbiteLikeIL,
  getInstituteListingListReverseTotal,
  searchInstituteDataList,
  scrollSearchInstituteDataList,
  getLikedInstitute,
  scrollFilterInstituteDataList,
  wesbiteLikeILReset,
  getMyInstituteList,
} from "../../../store/actions/institutelisting";
import AppLinkUrl from "../../../Common/AppLink/AppLinkUrl";

import Login from "../../Auth/Login";
import InstituteCard from "./InstituteCard";
import "./InstituteListing.scss";
import { useNavigate } from "react-router-dom";
import NoDataAvailable from "../../../Common/NoDataAvailable";

import ReactGA from "react-ga";
const InstituteListing = () => {
  const dispatch = useDispatch();

  const [loggedOff, setLoggedOff] = useState(false);

  const [modalState, setModalState] = useState(false);
  const [hideLoadMore, setHideLoadMore] = useState(false);
  const [searchLoadMore, setSearchLoadMore] = useState(false);
  const [reverseListFilled, setReverseListFilled] = useState(false);
  const likedToggle = false;
  const [resetLike, setResetLike] = useState(false);
  const [resetLikeDispatch, setResetLikeDispatch] = useState(false);
  const [searchTermDis, setSearchTermDis] = useState("");
  const history = useNavigate();
  const {
    instituteListingView,
    instituteListingCount,
    users,
    insituteList,
    institutelimit,
    instituteListReverse,
    likeCreateSuccess,
    instituteListReverseSuccess,
    likeScrollSuccess,
  } = useSelector((state) => {
    return {
      users: state.user,
      instituteListingView: state.institutelisting.list,
      instituteListReverse: state.institutelisting.listReverse,
      instituteListReverseSuccess: state.institutelisting.listReverse.success,
      insituteList: state.institutelisting.list.data.data,
      instituteListingCount: state.institutelisting.list.data.total,
      institutelimit: state.institutelisting.list.data.data,
      subdomainLikeInfo: state.institutelisting.likeInfo.data,
      likeCreateSuccess: state.institutelisting.likeData.success,
      likeScrollSuccess: state.institutelisting.scrollData.success,
    };
  });
  const manageModalState = () => {
    history("/auth/login")
    setModalState(!modalState);
  };

  const closeModalState = () => {
    setModalState(false);
  };

  // const [searchTerm, setSearchTerm] = useState({
  //   SearchTerm: {
  //     value: "",
  //   },
  // });

  ///// USEEFFECT TO CHECK TOKEN

  useEffect(() => {
    dispatch(getInstituteListingListReverseTotal());

    if (users.token === undefined) {
      setLoggedOff(true);
    } else {
      setLoggedOff(false);
      dispatch(getUserLikeInfo(users._id));
    }
    closeModalState();
  }, [dispatch, users]);

  ///// AFTER LOGIN USER ACCORDING DATA

  if (instituteListReverseSuccess && !reverseListFilled) {
    setReverseListFilled(true);
    const totalInstitutes = instituteListReverse.data.total;
    let limit = 9;
    let reverselimit = totalInstitutes - limit;
    dispatch(getInstituteListingList(reverselimit, limit));
  }

  ////// LIKE BUTTON & UNLIKE BUTTON

  const LikeButton = (item) => {
    if (loggedOff) {
      manageModalState();
    } else {
      if (!resetLike && !resetLikeDispatch) {
        dispatch(wesbiteLikeIL(postLikeData(item)));
        setResetLike(true);
      }
    }
  };
  /////// LIKE BUTTON DATA

  const postLikeData = (item) => {
    if (item.likestatus) {
      return {
        liked: item._id,
        user: users._id,
        totallike: item.totallike - 1,
      };
    } else {
      return {
        liked: item._id,
        user: users._id,
        totallike: item.totallike + 1,
      };
    }
  };


  ReactGA.event({
    category: "resources",
    action: "click",
    label: "Home_Footer_Discover_Institute",
  })


  /////// LIKE & UNLIKE BUTTON SUCCESS USEEFFECT

  useEffect(() => {
    if (likeCreateSuccess) {
      setResetLike(false);
      setResetLikeDispatch(false);
      dispatch(wesbiteLikeILReset());
    }
  }, [dispatch, likeCreateSuccess]);

  //// RESET LIKE BUTTON SUCCESS

  if (resetLike && !resetLikeDispatch) {
    setResetLikeDispatch(true);
  }

  ///// VIEW MORE SUBDOMAIN BUTTON

  const ViewMore = (value) => {
    window.open(AppLinkUrl.createSubdomain(value));
  };
  ////// LOADING BUTTON
  ///// SEARCH HANDEL CHANGE

  let typing;
  const handleChange = (e) => {
    SetToggleActiveTab("all");
    if (e.target.value === "") {
      resetSearch();
    } else {
      typing = setTimeout(() => {
        setSearchTermDis(e.target.value);
      }, 700);

      if (!e.target.value) {
        clearTimeout(typing);
        setSearchTermDis("");
      }
      setSearchLoadMore(true);
    }
  };

  useEffect(() => {
    dispatch(searchInstituteDataList(searchTermDis));
    setHideLoadMore(false);
  }, [dispatch, searchTermDis]);

  ////// SEARCH REST

  const resetSearch = () => {
    setSearchLoadMore(false);
    setHideLoadMore(false);
    setSearchTermDis("");
    const totalInstitutes = instituteListReverse.data.total;
    let limit = 9;
    let reverselimit = totalInstitutes - limit;
    dispatch(getInstituteListingList(reverselimit, limit));
  };
  ///// LIKED INSTIUTE TOGGLE SWITCH

  const likedInstituteList = () => {
    SetToggleActiveTab("likedInstituteList");
    dispatch(getLikedInstitute(users._id));
    setHideLoadMore(true);
  };
  const allInstitute = () => {
    SetToggleActiveTab("all");

    const totalInstitutes = instituteListReverse.data.total;
    let limit = 9;
    let reverselimit = totalInstitutes - limit;
    dispatch(getInstituteListingList(reverselimit, limit));
    setHideLoadMore(false);
  };
  const MyInstituteList = () => {
    SetToggleActiveTab("MyInstituteList");

    dispatch(getMyInstituteList(users._id));
    setHideLoadMore(true);
  };

  const [ToggleActiveTab, SetToggleActiveTab] = useState("all");
  const [loading, SetLoading] = useState(false);

  useEffect(() => {
    if (likeScrollSuccess) {
      SetLoading(false);
    }
  }, [likeScrollSuccess]);

  useEffect(() => {
    const onScroll = function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (
          instituteListReverseSuccess &&
          reverseListFilled &&
          institutelimit &&
          !loading
        ) {
          SetLoading(true);
          if (likedToggle && !searchLoadMore) {
            const totalInstitutes = instituteListingView.data.total;
            let limit = 9;
            let reverselimit = totalInstitutes - institutelimit.length;
            if (institutelimit.length < instituteListingCount) {
              dispatch(
                scrollFilterInstituteDataList(users._id, reverselimit, limit)
              );
              setHideLoadMore(false);
            } else {
              setHideLoadMore(true);
            }
          }
          if (searchLoadMore) {
            let limit = 9;
            let reverselimit = institutelimit.length;
            if (institutelimit.length < instituteListingCount) {
              dispatch(
                scrollSearchInstituteDataList(
                  searchTermDis,
                  reverselimit,
                  limit
                )
              );
              setHideLoadMore(false);
            } else {
              setHideLoadMore(true);
            }
          } else {
            const totalInstitutes = instituteListReverse.data.total;
            let limit = 9;
            let reverselimit = totalInstitutes - 9 - institutelimit.length;
            if (institutelimit.length < instituteListingCount) {
              dispatch(scrollInstituteDataList(reverselimit, limit));
              setHideLoadMore(false);
            } else {
              setHideLoadMore(true);
            }
          }
        }
        //fireFunction()
        // if (type !== "Search" && dataFound < totalLength) {
        //   userProfiles.data.length === skip && setLoading(true) && setHideLoadMore(true)
        //   userProfiles.data && userProfiles.data.length > skip && loadMore();
        // }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instituteListReverseSuccess, reverseListFilled, institutelimit, loading]);

  return (
    <>
      <InstituteListingTop
        className="mt-20"
        totalCount={instituteListingCount}
        handleChange={(e) => handleChange(e)}
        likedInstituteList={() => likedInstituteList()}
        allInstitute={() => allInstitute()}
        MyInstituteList={() => MyInstituteList()}
        ActiveTab={ToggleActiveTab}
      />
      {/* <button onClick={likedInstituteList}>Liked Institutes</button> */}

      <div className="insDispWrap">
        <div className="pageInCenter DefaultBodyHeight">
          <div className="institute-card-wrap discoverInstituteList">
            {instituteListingView.success ? (
              <React.Fragment>
                {insituteList.length
                  ? insituteList.map((index, key) => {
                    return (
                      <div className="InstituteListCardWrapper" key={key}>
                        <InstituteCard
                          institute={index}
                          LikeButton={() => LikeButton(index)}
                          ViewMore={(value) => ViewMore(value)}
                        />
                      </div>
                    );
                  })
                  :
                  <NoDataAvailable title="No Records Found." />
                }
              </React.Fragment>
            ) : (
              <div className="loadingGridData">
                <i className="ed-loadingGrid"></i>
              </div>
            )}
          </div>
        </div>
        {instituteListingView.success && insituteList.length ? (
          <>
            {!hideLoadMore ? (
              <div className="loadingMoreDataBtnWrap">
                <span>
                  Loading more...
                </span>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
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
              <Login hideSignup />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstituteListing;
