import React, { useEffect, useReducer, useState, useCallback } from "react";
import FormatText from "../Common/FormatText";
import Card from "../Common/Card/index";
import CardMedia from "../Common/Card/CardMedia";
import CardAction from "../Common/Card/CardAction";
import ComponentLoader from "../Common/Loader/ComponentLoader";
import Modal from "../Common/Modal";
import ModalHeader from "../Common/Modal/ModalHeader";
import ModalBody from "../Common/Modal/ModalBody";
import Request from "../Classes/Request";
import BackgroundDefault from "../assets/images/img/BackgroundDefault.png";
import ApplyAdmission from "./ApplyAdmission";
import AppLink from "../Common/AppLink";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { DynamicHeaderConsumer } from "../Context/DynamicHeaderContext";
import ImageViewer from "../Common/ImageViewer";
const InstituteAdmissionRequest = new Request();
let limit = 6;
const admissionUrl = InstituteAdmissionRequest.url(
  "admission?institute=__INSTITUTE_ID__&limit=__LIMIT__&skip=__SKIP__&status=Active"
);
// Actions
const insAdmissionActions = {
  INS_ADM_LOADING: "INS_ADM_LOADING",
  INS_ADM_LOADED: "INS_ADM_LOADED",
  INS_ADM_LOADING_ERROR: "INS_ADM_LOADING_ERROR",
  INS_ADM_MORE_LOADING: "INS_ADM_MORE_LOADING",
  INS_ADM_MORE_LOADED: "INS_ADM_MORE_LOADED",
  INS_ADM_MORE_LOADING_ERROR: "INS_ADM_LOADING_ERROR",
  INS_ADM_OPEN_POPUP: "INS_ADM_OPEN_POPUP",
  INS_ADM_CLOSE_POPUP: "INS_ADM_CLOSE_POPUP",
  INS_ADM_SET_DETAIL: "INS_ADM_SET_DETAIL",
};

// initail states
const insAdmInitStates = {
  data: [],
  total: 0,
  skip: 0,
  loading: false,
  error: false,
  more: false,
  moreloading: false,
  detailPopup: false,
  detail: {},
};

// self reducer method
const admissionReducer = (_state, { type, payload }) => {
  switch (type) {
    case insAdmissionActions.INS_ADM_LOADING:
      return {
        ..._state,
        loading: true,
      };

    case insAdmissionActions.INS_ADM_LOADED:
      return {
        ..._state,
        loading: false,
        data: payload,
        more: payload.length === limit,
      };

    case insAdmissionActions.INS_ADM_MORE_LOADING:
      return {
        ..._state,
        moreloading: true,
      };

    case insAdmissionActions.INS_ADM_MORE_LOADED:
      return {
        ..._state,
        moreloading: false,
        data: _state.data.concat(payload),
        more: payload.length === limit,
      };

    case insAdmissionActions.INS_ADM_OPEN_POPUP:
      return {
        ..._state,
        detailPopup: true,
        detail: _state.data.find((admission) => admission._id === payload._id),
      };

    case insAdmissionActions.INS_ADM_CLOSE_POPUP:
      return {
        ..._state,
        detailPopup: false,
        detail: {},
      };

    case insAdmissionActions.INS_ADM_SET_DETAIL:
      return {
        ..._state,
        detailPopup: false,
        detail: payload,
        // detail: _state.detailPopup ? _state.detail : payload,
      };

    default:
      return _state;
  }
};

const Admissions = ({
  instituteid,
  ShowAdmissionLimit,
  homePage,
  disabledButton = false,
}) => {
  limit = ShowAdmissionLimit ? ShowAdmissionLimit : 6;
  const [applyPopup, setApplyPopup] = useState(false);
  const [backOption, setBackOption] = useState(false);
  const insWebsiteDetails = useSelector(
    (state) => state.institutewebsite.heading
  );
  const [state, dispatch] = useReducer(admissionReducer, insAdmInitStates);
  const fetchAdmissionList = useCallback(() => {
    dispatch({ type: insAdmissionActions.INS_ADM_LOADING, payload: {} });
    InstituteAdmissionRequest.get(
      admissionUrl
        .replace("__INSTITUTE_ID__", instituteid)
        .replace("__LIMIT__", limit)
        .replace("__SKIP__", 0),
      (success) => {
        dispatch({
          type: insAdmissionActions.INS_ADM_LOADED,
          payload: success.data.admissionList,
        });
      },
      (error) => { }
    );
  }, [instituteid]);

  const fetchAdmissionListMore = () => {
    dispatch({ type: insAdmissionActions.INS_ADM_MORE_LOADING, payload: {} });
    InstituteAdmissionRequest.get(
      admissionUrl
        .replace("__INSTITUTE_ID__", instituteid)
        .replace("__LIMIT__", limit)
        .replace("__SKIP__", state.data.length),
      (success) => {
        dispatch({
          type: insAdmissionActions.INS_ADM_MORE_LOADED,
          payload: success.data.admissionList,
        });
      },
      (error) => { }
    );
  };

  const openAdmissionPopup = (_id) => {
    dispatch({
      type: insAdmissionActions.INS_ADM_OPEN_POPUP,
      payload: { _id },
    });
  };

  const closeAdmissionPopup = () => {
    dispatch({
      type: insAdmissionActions.INS_ADM_CLOSE_POPUP,
      payload: {},
    });
  };

  const openApplyAdmissionPopup = (_id, option = false) => {
    setBackOption(option);
    setApplyPopup(!applyPopup);
    const selectedAdmDetail = state.data.find(
      (admission) => admission._id === _id
    );
    dispatch({
      type: insAdmissionActions.INS_ADM_SET_DETAIL,
      payload: selectedAdmDetail,
    });
  };

  const closeAdmisisonApply = () => {
    setApplyPopup(false);
    dispatch({
      type: insAdmissionActions.INS_ADM_SET_DETAIL,
      payload: {},
    });
  };

  const handleBackOption = () => {
    if (state.detail._id) {
      setApplyPopup(false);
      openAdmissionPopup(state.detail._id);
    }
  };

  useEffect(fetchAdmissionList, [fetchAdmissionList]);

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
    <React.Fragment>
      {
        homePage ?
          state.data.length > 0 && (
            <div className="AdmissionApplyWrapper">
              <div className="sectionCntrWrap">
                <div className="PageTopHead">
                  <DynamicHeaderConsumer>
                    {(value) => (
                      <div className="PTH-Item secHeadWrap">
                        <h3 className="heading ShowAdmissionLimi">
                          {value.admissionhead || "Admissions"}
                        </h3>
                        <p className="subheading">
                          {value.admissionsubhead ||
                            "Apply now ! Find application related information below."}
                        </p>
                      </div>
                    )}
                  </DynamicHeaderConsumer>
                </div>

                {state.error ? (
                  <div>
                    Error in fetching the details
                    <button onClick={() => fetchAdmissionList()}>Reload</button>
                  </div>
                ) : state.loading ? (
                  <ComponentLoader />
                ) : state.data.length > 0 ? (
                  <div className="AdmissionApplyGallery mt-20 mb-20">
                    {state.data.map((admission) => (
                      <Card key={Math.random()} className="AAG-Card">
                        <CardMedia className="AAG-CardMedia">
                          {admission.thumbnail ? (
                            <ImageViewer object={admission.thumbnail}
                            alt={admission.description}
                            loading="lazy"/>
                            // <img
                            //   src={admission.thumbnail}
                            //   alt={admission.description}
                            //   loading="lazy"
                            // />
                          ) : (
                            ""
                          )}
                          <div
                            className={`thumbOverlay ${admission.thumbnail ? "" : "thumbOverlayNoImage"
                              }`}
                          >
                            <span>{admission.title}</span>
                          </div>
                        </CardMedia>
                        <CardAction className="AAG-Action centerDisp">
                          <p
                            className="btnLink"
                            onClick={() => {
                              openApplyAdmissionPopup(admission._id);
                            }}
                          >
                            Apply Now
                          </p>

                          {ShowAdmissionLimit ? (
                            <NavLink className="btnLink" to="/admission">
                              View Detail
                            </NavLink>
                          ) : (
                            <p
                              className="btnLink"
                              onClick={() => {
                                openAdmissionPopup(admission._id);
                              }}
                            >
                              View Detail
                            </p>
                          )}
                        </CardAction>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <>
                    {isLoggedIn ? (
                      <React.Fragment>
                        <p className="text-xxs">
                          Parents are looking for a school like yours. Add admission
                          details to receive student applications.
                        </p>
                        {!disabledButton ? (
                          <AppLink
                            className="button mt-20"
                            to="/admission-list"
                            target="_blank"
                          >
                            Add{" "}
                            {insWebsiteDetails.admissionhead
                              ? insWebsiteDetails.admissionhead
                              : "Admission Details"}
                          </AppLink>
                        ) : (
                          <button className="button mt-20" target="_blank">
                            Add
                            {insWebsiteDetails.admissionhead
                              ? insWebsiteDetails.admissionhead
                              : "Admission Details"}
                          </button>
                        )}
                      </React.Fragment>
                    ) : (
                      `No ${insWebsiteDetails.admissionhead
                        ? insWebsiteDetails.admissionhead
                        : "Admission"}`
                    )}
                  </>
                )}
                {state.data.length > 0 ? (
                  <React.Fragment>
                    {ShowAdmissionLimit ? (
                      <NavLink to="/admission" className="button mt-20">
                        View all{" "}
                        {insWebsiteDetails.admissionhead
                          ? insWebsiteDetails.admissionhead
                          : "Admission Details"}
                      </NavLink>
                    ) : (
                      <React.Fragment>
                        {state.moreloading ? (
                          <button type="button" className="button mt-60">
                            Loading...
                          </button>
                        ) : (
                          state.more && (
                            <span
                              className="button mt-50"
                              onClick={() => fetchAdmissionListMore()}
                            >
                              View all{" "}
                              {insWebsiteDetails.admissionhead
                                ? insWebsiteDetails.admissionhead
                                : "Admission"}
                            </span>
                          )
                        )}
                      </React.Fragment>
                    )}{" "}
                  </React.Fragment>
                ) : (
                  ""
                )}
              </div>

              <Modal ModalSize="modal-m" show={state.detailPopup}>
                <ModalHeader closeButton={true} onclose={closeAdmissionPopup} />
                <ModalBody>
                  <div className="ProfileAdmissionWrapper">
                    <div className="ProAdmBannerSection">
                      <div className="ProAdmBannerImg">
                        {state.detail.thumbnail ? (
                          <ImageViewer object={state.detail.thumbnail}
                          alt={state.detail.title}
                          loading="lazy"/>
                          // <img
                          //   src={state.detail.thumbnail}
                          //   alt={state.detail.title}
                          //   loading="lazy"
                          // />
                        ) : (
                          <img src={BackgroundDefault} alt="Profile Admission Banner" />
                        )}
                      </div>
                      <div className="ProAdmBannerDetail">
                        <div className="PA-BannerDetailTitle">
                          <p className="text-sm">{state.detail.title}</p>
                          {/* <p className="text-xxs primary">
                      Mind and Behavior - Philosophy of the Body and Illness
                    </p> */}
                        </div>
                        <ul>
                          {state.detail.session && (
                            <li>
                              <p className="text-xxs">Session for</p>
                              <p className="text-xs w-600">{state.detail.session}</p>
                            </li>
                          )}
                          {state.detail.noOfSeats && (
                            <li>
                              <p className="text-xxs">No. of Seat</p>
                              <p className="text-xs w-600">
                                {state.detail.noOfSeats}
                              </p>
                            </li>
                          )}

                          {state.detail.age && (
                            <li>
                              <p className="text-xxs">Minimum Age</p>
                              <p className="text-xs w-600">
                                {state.detail.age} Years
                              </p>
                            </li>
                          )}
                          {state.detail.courseFee && (
                            <li>
                              <p className="text-xxs">Course Fees</p>
                              <p className="text-xs w-600">
                                <strong>{state.detail.courseFee}</strong> (
                                {state.detail.currencyType})
                              </p>
                            </li>
                          )}

                          {state.detail.class && (
                            <li>
                              <p className="text-xxs">Course/Classroom</p>
                              <p className="text-xs w-600">{state.detail.class}</p>
                            </li>
                          )}

                          {state.detail.qualification && (
                            <li>
                              <p className="text-xxs">Minimum Qualification</p>
                              <p className="text-xs w-600">
                                {state.detail.qualification}
                              </p>
                            </li>
                          )}
                          {state.detail.lastApplyDate && (
                            <li>
                              <p className="text-xxs">Last date to apply</p>
                              <p className="text-xxs w-600">
                                {moment(state.detail.lastApplyDate).format(
                                  "DD MMM. YYYY"
                                )}
                              </p>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="ProAdmActionSection mt-20">
                      <button
                        onClick={() => openApplyAdmissionPopup(state.detail._id, true)}
                        className="button button-base btn-sm"
                        type="button"
                      >
                        Apply Now
                      </button>
                      {state.detail.feeStructure && (
                        <a
                          href={state.detail.feeStructure}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="button btn-o-mgray btn-sm base"
                        >
                          Download Fee Structure
                        </a>
                      )}
                      {/* <span >
                  
                </span> */}
                      {state.detail.prospectus && (
                        <a
                          href={state.detail.prospectus}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="button button-base btn-sm"
                        >
                          Download Brochure
                        </a>
                      )}
                    </div>
                    {(state.detail.description || state.detail.process) && (
                      <div className="ProAdmContentSection mt-20">
                        <p className="text-xs w-600">Admission Details</p>
                        {state.detail.description && (
                          <FormatText text={state.detail.description}>
                            {({ formatedText }) => (
                              <p
                                className="text-xxs sun-editor-output"
                                dangerouslySetInnerHTML={{ __html: formatedText }}
                              ></p>
                            )}
                          </FormatText>
                        )}
                        <p className="text-xs w-600 mt-20">Admission Process</p>
                        {state.detail.process && (
                          <FormatText text={state.detail.process}>
                            {({ formatedText }) => (
                              <p
                                className="text-xxs sun-editor-output"
                                dangerouslySetInnerHTML={{ __html: formatedText }}
                              ></p>
                            )}
                          </FormatText>
                        )}
                      </div>
                    )}
                  </div>
                </ModalBody>
              </Modal>
              {applyPopup && (
                <ApplyAdmission
                  open={applyPopup}
                  back={backOption}
                  backAction={handleBackOption}
                  close={closeAdmisisonApply}
                  detail={state.detail}
                />
              )}
            </div>
          ) : <div className="AdmissionApplyWrapper">
            <div className="sectionCntrWrap">
              <div className="PageTopHead">
                <DynamicHeaderConsumer>
                  {(value) => (
                    <div className="PTH-Item secHeadWrap">
                      <h3 className="heading ShowAdmissionLimi">
                        {value.admissionhead || "Admissions"}
                      </h3>
                      <p className="subheading">
                        {value.admissionsubhead ||
                          "Apply now ! Find application related information below."}
                      </p>
                    </div>
                  )}
                </DynamicHeaderConsumer>
              </div>

              {state.error ? (
                <div>
                  Error in fetching the details
                  <button onClick={() => fetchAdmissionList()}>Reload</button>
                </div>
              ) : state.loading ? (
                <ComponentLoader />
              ) : state.data.length > 0 ? (
                <div className="AdmissionApplyGallery mt-20 mb-20">
                  {state.data.map((admission) => (
                    <Card key={Math.random()} className="AAG-Card">
                      <CardMedia className="AAG-CardMedia">
                        {admission.thumbnail ? (
                          <ImageViewer object={admission.thumbnail}
                          alt={admission.description}
                          loading="lazy"
                      />
                          // <img
                          //   src={admission.thumbnail}
                          //   alt={admission.description}
                          //   loading="lazy"
                          // />
                        ) : (
                          ""
                        )}
                        <div
                          className={`thumbOverlay ${admission.thumbnail ? "" : "thumbOverlayNoImage"
                            }`}
                        >
                          <span>{admission.title}</span>
                        </div>
                      </CardMedia>
                      <CardAction className="AAG-Action centerDisp">
                        <p
                          className="btnLink"
                          onClick={() => {
                            openApplyAdmissionPopup(admission._id);
                          }}
                        >
                          Apply Now
                        </p>

                        {ShowAdmissionLimit ? (
                          <NavLink className="btnLink" to="/admission">
                            View Detail
                          </NavLink>
                        ) : (
                          <p
                            className="btnLink"
                            onClick={() => {
                              openAdmissionPopup(admission._id);
                            }}
                          >
                            View Detail
                          </p>
                        )}
                      </CardAction>
                    </Card>
                  ))}
                </div>
              ) : (
                <>
                  {isLoggedIn ? (
                    <React.Fragment>
                      <p className="text-xxs">
                        Parents are looking for a school like yours. Add admission
                        details to receive student applications.
                      </p>
                      {!disabledButton ? (
                        <AppLink
                          className="button mt-20"
                          to="/admission-list"
                          target="_blank"
                        >
                          Add{" "}
                          {insWebsiteDetails.admissionhead
                            ? insWebsiteDetails.admissionhead
                            : "Admission Details"}
                        </AppLink>
                      ) : (
                        <button className="button mt-20" target="_blank">
                          Add
                          {insWebsiteDetails.admissionhead
                            ? insWebsiteDetails.admissionhead
                            : "Admission Details"}
                        </button>
                      )}
                    </React.Fragment>
                  ) : (
                    `No ${insWebsiteDetails.admissionhead
                      ? insWebsiteDetails.admissionhead
                      : "Admission"}`
                  )}
                </>
              )}
              {state.data.length > 0 ? (
                <React.Fragment>
                  {ShowAdmissionLimit ? (
                    <NavLink to="/admission" className="button mt-20">
                      View all{" "}
                      {insWebsiteDetails.admissionhead
                        ? insWebsiteDetails.admissionhead
                        : "Admission Details"}
                    </NavLink>
                  ) : (
                    <React.Fragment>
                      {state.moreloading ? (
                        <button type="button" className="button mt-60">
                          Loading...
                        </button>
                      ) : (
                        state.more && (
                          <span
                            className="button mt-50"
                            onClick={() => fetchAdmissionListMore()}
                          >
                            View all{" "}
                            {insWebsiteDetails.admissionhead
                              ? insWebsiteDetails.admissionhead
                              : "Admission"}
                          </span>
                        )
                      )}
                    </React.Fragment>
                  )}{" "}
                </React.Fragment>
              ) : (
                ""
              )}
            </div>

            <Modal ModalSize="modal-m" show={state.detailPopup}>
              <ModalHeader closeButton={true} onclose={closeAdmissionPopup} />
              <ModalBody>
                <div className="ProfileAdmissionWrapper">
                  <div className="ProAdmBannerSection">
                    <div className="ProAdmBannerImg">
                      {state.detail.thumbnail ? (
                        <ImageViewer
                          object={state.detail.thumbnail}
                          alt={state.detail.title}
                          loading="lazy"
                        />
                      ) : (
                        <img src={BackgroundDefault} alt="Profile Admission Banner" />
                      )}
                    </div>
                    <div className="ProAdmBannerDetail">
                      <div className="PA-BannerDetailTitle">
                        <p className="text-sm">{state.detail.title}</p>
                        {/* <p className="text-xxs primary">
                  Mind and Behavior - Philosophy of the Body and Illness
                </p> */}
                      </div>
                      <ul>
                        {state.detail.session && (
                          <li>
                            <p className="text-xxs">Session for</p>
                            <p className="text-xs w-600">{state.detail.session}</p>
                          </li>
                        )}
                        {state.detail.noOfSeats && (
                          <li>
                            <p className="text-xxs">No. of Seat</p>
                            <p className="text-xs w-600">
                              {state.detail.noOfSeats}
                            </p>
                          </li>
                        )}

                        {state.detail.age && (
                          <li>
                            <p className="text-xxs">Minimum Age</p>
                            <p className="text-xs w-600">
                              {state.detail.age} Years
                            </p>
                          </li>
                        )}
                        {state.detail.courseFee && (
                          <li>
                            <p className="text-xxs">Course Fees</p>
                            <p className="text-xs w-600">
                              <strong>{state.detail.courseFee}</strong> (
                              {state.detail.currencyType})
                            </p>
                          </li>
                        )}

                        {state.detail.class && (
                          <li>
                            <p className="text-xxs">Course/Classroom</p>
                            <p className="text-xs w-600">{state.detail.class}</p>
                          </li>
                        )}

                        {state.detail.qualification && (
                          <li>
                            <p className="text-xxs">Minimum Qualification</p>
                            <p className="text-xs w-600">
                              {state.detail.qualification}
                            </p>
                          </li>
                        )}
                        {state.detail.lastApplyDate && (
                          <li>
                            <p className="text-xxs">Last date to apply</p>
                            <p className="text-xxs w-600">
                              {moment(state.detail.lastApplyDate).format(
                                "DD MMM. YYYY"
                              )}
                            </p>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="ProAdmActionSection mt-20">
                    <button
                      onClick={() => openApplyAdmissionPopup(state.detail._id, true)}
                      className="button button-base btn-sm"
                      type="button"
                    >
                      Apply Now
                    </button>
                    {state.detail.feeStructure && (
                      <a
                        href={state.detail.feeStructure}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="button btn-o-mgray btn-sm base"
                      >
                        Download Fee Structure
                      </a>
                    )}
                    {/* <span >
              
            </span> */}
                    {state.detail.prospectus && (
                      <a
                        href={state.detail.prospectus}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="button button-base btn-sm"
                      >
                        Download Brochure
                      </a>
                    )}
                  </div>
                  {(state.detail.description || state.detail.process) && (
                    <div className="ProAdmContentSection mt-20">
                      <p className="text-xs w-600">Admission Details</p>
                      {state.detail.description && (
                        <FormatText text={state.detail.description}>
                          {({ formatedText }) => (
                            <p
                              className="text-xxs sun-editor-output"
                              dangerouslySetInnerHTML={{ __html: formatedText }}
                            ></p>
                          )}
                        </FormatText>
                      )}
                      <p className="text-xs w-600 mt-20">Admission Process</p>
                      {state.detail.process && (
                        <FormatText text={state.detail.process}>
                          {({ formatedText }) => (
                            <p
                              className="text-xxs sun-editor-output"
                              dangerouslySetInnerHTML={{ __html: formatedText }}
                            ></p>
                          )}
                        </FormatText>
                      )}
                    </div>
                  )}
                </div>
              </ModalBody>
            </Modal>
            {applyPopup && (
              <ApplyAdmission
                open={applyPopup}
                back={backOption}
                backAction={handleBackOption}
                close={closeAdmisisonApply}
                detail={state.detail}
              />
            )}
          </div>
      }

    </React.Fragment>
  );
};

export default Admissions;
