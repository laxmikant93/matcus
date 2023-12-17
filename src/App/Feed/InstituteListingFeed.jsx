/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLinkUrl from "../../Common/AppLink/AppLinkUrl";
import {
  getInstituteListingData,
  postEdneedFeedLike,
} from "../../store/actions/edneedfeed";
import {
  getInstituteListingListReverseTotal,
  getUserLikeInfo,
} from "../../store/actions/institutelisting";
import AppLink from "../../Common/AppLink";
// import Carousel from "react-elastic-carousel";
import InstituteCard from "../Institute/InstituteListing/InstituteCard";
import { useNavigate } from "react-router-dom";
import SessionStorage from "../../Classes/SessionStorage";
import {
  createPrivateDomainNewInstiute,
  instiid,
  PaymentComplete,
  privateDomain,
  privateDomainAddNewIns,
  privateDomainBookNew,
  privateDomainOfflineFlow,
  privateDomainOpt,
  privateDomainProceedToCheckout,
  privateDomainTLDS,
  registerDetails,
  registrationWorkDone,
  totalPriceValue,
  uid,
} from "../../Constant/auth";
import Storage from "../../Classes/Storage";

const InstituteListingFeed = () => {
  const dispatch = useDispatch();
  const {
    instituteListingSuccess,
    insituteList,
    instituteListReverse,
    users,
    likeCreateSuccess,
    insituteLikedCheck,
  } = useSelector((state) => {
    return {
      users: state.user,
      instituteListingSuccess: state.edneedfeed.instituteListing.success,
      insituteList: state.edneedfeed.instituteListing.data,
      insituteLikedCheck: state.edneedfeed.instituteLiked.success,
      instituteListReverse: state.institutelisting.listReverse,
      likeCreateSuccess: state.institutelisting.likeData.success,
    };
  });

  useEffect(() => {
    dispatch(getInstituteListingListReverseTotal());
  }, [dispatch]);

  const [reverseListFilled, setReverseListFilled] = useState(false);

  if (instituteListReverse.success && !reverseListFilled) {
    setReverseListFilled(true);
    const totalInstitutes = instituteListReverse.data.total;
    let limit = 9;
    let reverselimit = totalInstitutes - limit;
    dispatch(getInstituteListingData(reverselimit, limit));
  }

  const ViewMore = (value) => {
    window.open(AppLinkUrl.createSubdomain(value));
  };
  const breakPoints = [
    { width: 1, itemsToShow: 1, itemsToScroll: 1 },
    { width: 600, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 2, itemsToScroll: 2 },
    { width: 992, itemsToShow: 3, itemsToScroll: 3 },
    { width: 1200, itemsToShow: 3, itemsToScroll: 3 },
  ];

  const [loggedOff, setLoggedOff] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [resetLikeDispatch, setResetLikeDispatch] = useState(false);
  const [resetLike, setResetLike] = useState(false);

  const closeModalState = () => {
    setModalState(false);
  };

  useEffect(() => {
    if (likeCreateSuccess) {
      setResetLike(false);
      setResetLikeDispatch(false);
    }
  }, [dispatch, likeCreateSuccess]);

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

  if (resetLike && !resetLikeDispatch) {
    setResetLikeDispatch(true);
  }

  const manageModalState = () => {
    setModalState(!modalState);
  };

  const postLikeData = (item) => {
    if (item.likestatus) {
      return {
        _id: item._id,
        liked: item._id,
        user: users._id,
        totallike: item.totallike - 1,
      };
    } else {
      return {
        _id: item._id,
        liked: item._id,
        user: users._id,
        totallike: item.totallike + 1,
      };
    }
  };

  const LikeButton = (item) => {
    if (loggedOff) {
      manageModalState();
    } else {
      if (!resetLike && !resetLikeDispatch) {
        dispatch(postEdneedFeedLike(postLikeData(item)));
        setResetLike(true);
        // dispatch(getInstituteListingListReverseTotal());
      }
    }
  };

  useEffect(() => {
    if (insituteLikedCheck) {
      setResetLike(false);
      setResetLikeDispatch(false);
      // const totalInstitutes = instituteListReverse.data.total;
      // let limit = 9;
      // let reverselimit = totalInstitutes - limit;
      // dispatch(getInstituteListingData(reverselimit, limit));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insituteLikedCheck]);
  useEffect(() => {
    SessionStorage.remove(privateDomainOpt);
    SessionStorage.remove(privateDomain);
    SessionStorage.remove(privateDomainTLDS);
    SessionStorage.remove(createPrivateDomainNewInstiute);
    SessionStorage.remove(registrationWorkDone);
    SessionStorage.remove(registerDetails);
    SessionStorage.remove(totalPriceValue);
    SessionStorage.remove(PaymentComplete);
    SessionStorage.remove(privateDomainOfflineFlow);
    SessionStorage.remove(privateDomainAddNewIns);
    SessionStorage.remove(privateDomainBookNew);
    SessionStorage.remove(privateDomainProceedToCheckout);
    SessionStorage.remove("UserRegistration");
    SessionStorage.remove("RegisterInstitiute");
    SessionStorage.remove("DomainName");
    Storage.remove("__wz_pd_offl__");
    Storage.remove("__wz_pd_adni__");
    SessionStorage.remove("InstituteWebsite");
    SessionStorage.remove(uid);
    SessionStorage.remove(instiid);
    SessionStorage.remove("__wz_pd_ptc__");
    Storage.remove("__wz_pd_ptc__");
    Storage.remove("__wz_pd_adni__");
    Storage.remove("registerDetails");
    Storage.remove("__wz_pd_ip__");
  }, []);
  const history = useNavigate();
  const AddNewInstitute = () => {
    SessionStorage.setBool(privateDomainAddNewIns, true);
    history("/check-domain");
  };

  return (
    <React.Fragment>
      <div className="pageFullCenter ED-InstituteListingFeedWrapper">
        <div className="InstituteListingFeedHeadWrap">
          <div className="InstituteListingFeedHead">
            <p className="text-md w-300">Institutes</p>
            <p className="text-xs w-500">
              Get Detailed Information on Top Colleges, University, Institutes
              and more
            </p>
          </div>
          <div className="InstituteListingFeed">
            <div className="institute-card-wrap mt-30 mb-80 edFeedInstituteListSlider">
              {instituteListingSuccess ? (
                // <Carousel breakPoints={breakPoints}>
                //   {insituteList.length
                //     ? insituteList.map((index, key) => {
                //       return (
                //         <div className="InstituteListCardWrapper" key={key}>
                //           <InstituteCard
                //             institute={index}
                //             LikeButton={() => LikeButton(index)}
                //             ViewMore={(value) => ViewMore(value)}
                //           />
                //         </div>
                //       );
                //     })
                //     : "No Record"}
                // </Carousel>
                ""
              ) : (
                <div className="loadingGridData">
                  <i className="ed-loadingGrid"></i>
                </div>
              )}
            </div>
          </div>
          <div className="InstituteListingFeedActionBtn">
            <AppLink
              to="/institute/institute-listing"
              target="_blank"
              type="button"
              className="button button-base btn-sm"
            >
              Browse Institute <i className="animate-r-arrow-icon"></i>
            </AppLink>
            {/* <button
                className="button button-white btn-sm"
                onClick={AddNewInstitute}
              >
                Add Your Institute <i className="animate-r-arrow-icon"></i>
              </button> */}
            {/* <AppLink
                to="/register-institute"
                target="_blank"
                className="button button-white btn-sm"
              >
                Add Your Institute <i className="animate-r-arrow-icon"></i>
              </AppLink> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default InstituteListingFeed;
