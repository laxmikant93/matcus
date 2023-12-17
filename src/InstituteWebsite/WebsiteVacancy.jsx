import React, { useEffect, useMemo, useReducer, useState, useCallback } from "react";
import Card from "../Common/Card";
import CardBody from "../Common/Card/CardBody";
import CardAction from "../Common/Card/CardAction";
import vacancyicon from "../assets/images/img/vacancy-banner.png"
import moment from "moment";
import ComponentLoader from "../Common/Loader/ComponentLoader";
import Request from "../Classes/Request";
import Modal from "../Common/Modal";
import ModalHeader from "../Common/Modal/ModalHeader";
import ModalBody from "../Common/Modal/ModalBody";
import ApplyJobVacancy from "./ApplyJobVacancy";
import AppLink from "../Common/AppLink";
import { useSelector } from "react-redux";
import FormatText from "../Common/FormatText"
import { DynamicHeaderConsumer } from "../Context/DynamicHeaderContext";
import ImageViewer from "../Common/ImageViewer";

const WebsiteVacancy = ({ instituteid, ShowVacancyLimit, homePage }) => {
  const [ModalApplyJob, SetModalApplyJob] = useState(false);
  const [backOption, setBackOption] = useState(false);
  const InstituteVacancyRequest = useMemo(() => {
    return new Request()
  }, []);
  const limit = ShowVacancyLimit ? ShowVacancyLimit : 6;
  const serviceUrl = InstituteVacancyRequest.url(
    "vacancy?institute=__INSTITUTE_ID__&limit=__LIMIT__&skip=__SKIP__&status=Active&industry=__type__"
  );

  const insWebsiteDetails = useSelector((state) => state.institutewebsite.heading)
  const industryType = useSelector((state) =>
    state.user.user_business_type);


  // Actions
  const insVacancyActions = useMemo(() => {
    return {
      INS_VACANCY_LOADING: "INS_VACANCY_LOADING",
      INS_VACANCY_LOADED: "INS_VACANCY_LOADED",
      INS_VACANCY_LOADING_ERROR: "INS_VACANCY_LOADING_ERROR",
      INS_VACANCY_MORE_LOADING: "INS_VACANCY_MORE_LOADING",
      INS_VACANCY_MORE_LOADED: "INS_VACANCY_MORE_LOADED",
      INS_VACANCY_MORE_LOADING_ERROR: "INS_VACANCY_LOADING_ERROR",
      INS_VACANCY_OPEN_POPUP: "INS_VACANCY_OPEN_POPUP",
      INS_VACANCY_CLOSE_POPUP: "INS_VACANCY_CLOSE_POPUP",
      INS_VACANCY_SET_DETAIL: "INS_VACANCY_SET_DETAIL"
    }
  }, []);

  // initail states
  const insVacancyInitStates = {
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
  const vacancyReducer = (_state, { type, payload }) => {
    switch (type) {
      case insVacancyActions.INS_VACANCY_LOADING:
        return {
          ..._state,
          loading: true,
        };

      case insVacancyActions.INS_VACANCY_LOADED:
        return {
          ..._state,
          loading: false,
          data: payload,
          more: payload.length === limit,
        };

      case insVacancyActions.INS_VACANCY_MORE_LOADING:
        return {
          ..._state,
          moreloading: true,
        };

      case insVacancyActions.INS_VACANCY_MORE_LOADED:
        return {
          ..._state,
          moreloading: false,
          data: _state.data.concat(payload),
          more: payload.length === limit,
        };

      case insVacancyActions.INS_VACANCY_OPEN_POPUP:
        return {
          ..._state,
          detailPopup: true,
          detail: _state.data.find((vacancy) => vacancy._id === payload._id),
        };

      case insVacancyActions.INS_VACANCY_CLOSE_POPUP:
        return {
          ..._state,
          detailPopup: false,
          detail: {},
        };

      case insVacancyActions.INS_VACANCY_SET_DETAIL:
        return {
          ..._state,
          detailPopup: false,
          detail: payload,
        };

      default:
        return _state;
    }
  };
  const [state, dispatch] = useReducer(vacancyReducer, insVacancyInitStates);
  const fetchVacancyList = useCallback(() => {
    dispatch({ type: insVacancyActions.INS_VACANCY_LOADING, payload: {} });
    InstituteVacancyRequest.get(
      serviceUrl
        .replace("__INSTITUTE_ID__", instituteid)
        .replace("__LIMIT__", limit)
        .replace("__SKIP__", 0).replace("__type__", industryType),
      (success) => {
        dispatch({
          type: insVacancyActions.INS_VACANCY_LOADED,
          payload: success.data.allJobInfo,
        });
      },
      (error) => {
      }
    );
  }, [InstituteVacancyRequest, insVacancyActions, instituteid, serviceUrl, dispatch]);

  const fetchVacancyListMore = () => {
    dispatch({ type: insVacancyActions.INS_VACANCY_MORE_LOADING, payload: {} });
    InstituteVacancyRequest.get(
      serviceUrl
        .replace("__INSTITUTE_ID__", instituteid)
        .replace("__LIMIT__", limit)
        .replace("__SKIP__", state.data.length).replace("__type__", industryType),
      (success) => {
        dispatch({
          type: insVacancyActions.INS_VACANCY_MORE_LOADED,
          payload: success.data.allJobInfo,
        });
      },
      (error) => {
      }
    );
  };

  const openVacancyPopup = (_id) => {
    dispatch({
      type: insVacancyActions.INS_VACANCY_OPEN_POPUP,
      payload: { _id },
    });
  };

  const closeVacancyPopup = () => {
    dispatch({
      type: insVacancyActions.INS_VACANCY_CLOSE_POPUP,
      payload: {},
    });
  };

  const openApplyVacancyPopup = (_id, option = false) => {
    setBackOption(option);
    SetModalApplyJob(!ModalApplyJob);
    const selectedDetail = state.data.find((vacancy) => vacancy._id === _id);
    dispatch({
      type: insVacancyActions.INS_VACANCY_SET_DETAIL,
      payload: selectedDetail,
    });
  };

  const closeVacancyApply = () => {
    SetModalApplyJob(false);
    dispatch({
      type: insVacancyActions.INS_VACANCY_SET_DETAIL,
      payload: {},
    });
  };

  const handleBackOption = () => {
    if (state.detail._id) {
      SetModalApplyJob(false);
      openVacancyPopup(state.detail._id);
    }
  };

  useEffect(() => {
    fetchVacancyList();
  }, [fetchVacancyList]);


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { users, instituteWebsite } = useSelector((state) => {
    return {
      instituteWebsite: state.institutewebsite.data,
      users: state.user,
    };
  });

  useEffect(() => {
    if (users.token) {
      if (users._id === instituteWebsite.owner && users.user_activeRole === process.env.REACT_APP_PAGE_OWNER
        && users.user_institute_institute_subdomain === instituteWebsite.institute_subdomain) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    } else {
      setIsLoggedIn(false)
    }
  }, [users, instituteWebsite])


  return (
    <React.Fragment>
      {
        homePage ?
          state.data.length > 0 && (
            <div className="CurrentVacancyWrapper">
              <div className="sectionCntrWrap">
                <div className="PageTopHead">
                  <DynamicHeaderConsumer>
                    {
                      (value) => <div className="PTH-Item secHeadWrap">
                        <h3>{value.vacancyhead || "Vacancy"}</h3>
                        <p>{value.vacancysubhead || "Join us and become a part of our institute's dynamic culture."}</p>
                      </div>
                    }
                  </DynamicHeaderConsumer>
                </div>

                {state.error ? (
                  <div>
                    Error in fetching the details
                    <button onClick={() => fetchVacancyList()}>Reload</button>
                  </div>
                ) : state.loading ? (
                  <ComponentLoader />
                ) : state.data.length > 0 ? (
                  <div className="CurrentVacancyGallery text-center mt-20">
                    {state.data.map((vacancy) => (
                      <Card className="CV-Card">
                        <CardBody className="CV-CardBody">
                          <div className="icon justify-content-center center-xs">
                            <ImageViewer object={
                              vacancy.thumbnail ===
                                undefined ||
                                vacancy.thumbnail ===
                                null ||
                                vacancy.thumbnail ===
                                ""
                                ? vacancyicon
                                : vacancy.thumbnail
                            } defaultImage={vacancyicon} alt="vacancyicon" className="img-fluid" />
                          </div>
                          <p className="text-xs w-600">
                            {vacancy.title} ({vacancy.position})
                          </p>
                          {vacancy.qualification && (
                            <p className="text-xs w-600">({vacancy.qualification})</p>
                          )}
                          <p className="text-xxs mt-10">
                            No. of Positions: {vacancy.noOfPosition}
                          </p>
                          {vacancy.lastApplyDate && (
                            <p className="text-xxs">
                              Last date to apply:{" "}
                              <span className="w-500">
                                {moment(vacancy.lastApplyDate).format("LLLL")}
                              </span>
                            </p>
                          )}
                        </CardBody>
                        <CardAction className="CV-Action mt-10 centerDisp">
                          <p
                            className="btnLink"
                            onClick={() => openApplyVacancyPopup(vacancy._id)}
                          >
                            Apply Now
                          </p>
                          <p
                            className="btnLink"
                            onClick={() => {
                              openVacancyPopup(vacancy._id);
                            }}
                          >
                            View Detail
                          </p>
                        </CardAction>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <>
                    {isLoggedIn ? (<React.Fragment>
                      <p className="text-xxs">
                        You are missing out on valuable candidates. Add vacancy details to
                        receive top candidate applications.
                      </p>
                      <AppLink
                        className="button btn-o-primary btn-sm primary mt-20"
                        to="/vacancy-list"
                        target="_blank"
                      >
                        Add {insWebsiteDetails.vacancyhead ? insWebsiteDetails.vacancyhead : 'Vacancy'}
                      </AppLink>
                    </React.Fragment>) : (`No ${insWebsiteDetails.vacancyhead
                      ? insWebsiteDetails.vacancyhead
                      : "Current Openings"}`)
                    }
                  </>
                )}
                {state.moreloading ? (
                  <button
                    type="button"
                    className="button button-white btn-sm primary mt-60"
                  >
                    Loading...
                  </button>
                ) : (
                  state.more && (
                    <p
                      className="text-xxs w-600 base primary linkbtn mt-30"
                      onClick={() => fetchVacancyListMore()}
                    >
                      Load More...
                    </p>
                  )
                )}
              </div>

              <Modal
                className="ViewFeeStructureWrap"
                ModalSize="modal-l"
                show={state.detailPopup}
              >
                <ModalHeader
                  title={state.detail.title}
                  TitleClass="base"
                  closeButton={true}
                  onclose={closeVacancyPopup}
                />
                <ModalBody>
                  <div className="VacancyDetailWrapper">
                    <div className="VacancyDetailBanner">
                      <ul>
                        <li>
                          <p className="text-xxs">Vacancy Type</p>
                          <p className="text-xs">{state.detail.position}</p>
                        </li>
                        <li>
                          <p className="text-xxs">No. Of Position</p>
                          <p className="text-xs">{state.detail.noOfPosition}</p>
                        </li>
                        <li>
                          <p className="text-xxs">Minimum Experience</p>
                          <p className="text-xs">{state.detail.experience}</p>
                        </li>
                        <li>
                          <p className="text-xxs">Annual Salary</p>
                          <p className="text-xs">
                            ({state.detail.currencyType}){state.detail.annualSalary}
                          </p>
                        </li>
                        <li>
                          <p className="text-xxs">Minimum Qualification</p>
                          <p className="text-xs">{state.detail.qualification}</p>
                        </li>
                        <li>
                          <p className="text-xxs">Last date to apply</p>
                          <p className="text-xxs">
                            {moment(state.detail.lastApplyDate).format("DD MMM. YYYY")}
                          </p>
                        </li>
                      </ul>
                    </div>

                    <div className="VD-ActionSection mt-20">
                      <button
                        onClick={() => openApplyVacancyPopup(state.detail._id, true)}
                        className="button button-base btn-sm"
                        type="button"
                      >
                        Apply Now
                      </button>
                      {state.detail.fileUpload&&state.detail.fileUpload.src && (
                        <a
                          href={state.detail.fileUpload.src}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="button btn-o-mgray btn-sm base"
                        >
                          Download Job Description
                        </a>
                      )}
                    </div>
                    <div className="VD-ContentSection mt-20">
                      <p className="text-sm">Job Description</p>
                      {
                        state.detail.description && <FormatText text={state.detail.description}>
                          {({ formatedText }) => (
                            <p
                              className="text-xxs mt-10 sun-editor-output"
                              dangerouslySetInnerHTML={{ __html: formatedText }}
                            ></p>
                          )}
                        </FormatText>
                      }

                      {state.detail.keyRoles && (
                        <React.Fragment>
                          <p className="text-sm mt-20">Key Roles & Responsibility</p>
                          <FormatText text={state.detail.keyRoles}>
                            {({ formatedText }) => (
                              <p className="sun-editor-output"
                                dangerouslySetInnerHTML={{ __html: formatedText }}
                              ></p>
                            )}
                          </FormatText>

                        </React.Fragment>
                      )}
                    </div>
                  </div>
                </ModalBody>
              </Modal>
              {ModalApplyJob && <ApplyJobVacancy
                open={ModalApplyJob}
                back={backOption}
                backAction={handleBackOption}
                detail={state.detail}
                close={closeVacancyApply}
              />}
            </div>
          ) : (
            <div className="CurrentVacancyWrapper">
              <div className="sectionCntrWrap">
                <div className="PageTopHead">
                  <DynamicHeaderConsumer>
                    {
                      (value) => <div className="PTH-Item secHeadWrap">
                        <h3>{value.vacancyhead || "Vacancy"}</h3>
                        <p>{value.vacancysubhead || "Join us and become a part of our institute's dynamic culture."}</p>
                      </div>
                    }
                  </DynamicHeaderConsumer>
                </div>

                {state.error ? (
                  <div>
                    Error in fetching the details
                    <button onClick={() => fetchVacancyList()}>Reload</button>
                  </div>
                ) : state.loading ? (
                  <ComponentLoader />
                ) : state.data.length > 0 ? (
                  <div className="CurrentVacancyGallery text-center mt-20">
                    {state.data.map((vacancy) => (
                      <Card className="CV-Card">
                        <CardBody className="CV-CardBody">
                          <div className="icon justify-content-center center-xs">
                            <img src={
                              vacancy.thumbnail ===
                                undefined ||
                                vacancy.thumbnail ===
                                null ||
                                vacancy.thumbnail ===
                                ""
                                ? vacancyicon
                                : vacancy.thumbnail
                            } alt="vacancyicon" className="img-fluid" />
                          </div>
                          <p className="text-xs w-600">
                            {vacancy.title} ({vacancy.position})
                          </p>
                          {vacancy.qualification && (
                            <p className="text-xs w-600">({vacancy.qualification})</p>
                          )}
                          <p className="text-xxs mt-10">
                            No. of Positions: {vacancy.noOfPosition}
                          </p>
                          {vacancy.lastApplyDate && (
                            <p className="text-xxs">
                              Last date to apply:{" "}
                              <span className="w-500">
                                {moment(vacancy.lastApplyDate).format("LLLL")}
                              </span>
                            </p>
                          )}
                        </CardBody>
                        <CardAction className="CV-Action mt-10 centerDisp">
                          <p
                            className="btnLink"
                            onClick={() => openApplyVacancyPopup(vacancy._id)}
                          >
                            Apply Now
                          </p>
                          <p
                            className="btnLink"
                            onClick={() => {
                              openVacancyPopup(vacancy._id);
                            }}
                          >
                            View Detail
                          </p>
                        </CardAction>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <>
                    {isLoggedIn ? (<React.Fragment>
                      <p className="text-xxs">
                        You are missing out on valuable candidates. Add vacancy details to
                        receive top candidate applications.
                      </p>
                      <AppLink
                        className="button btn-o-primary btn-sm primary mt-20"
                        to="/vacancy-list"
                        target="_blank"
                      >
                        Add {insWebsiteDetails.vacancyhead ? insWebsiteDetails.vacancyhead : 'Vacancy'}
                      </AppLink>
                    </React.Fragment>) : (`No ${insWebsiteDetails.vacancyhead
                      ? insWebsiteDetails.vacancyhead
                      : "Current Openings"}`)
                    }
                  </>
                )}
                {state.moreloading ? (
                  <button
                    type="button"
                    className="button button-white btn-sm primary mt-60"
                  >
                    Loading...
                  </button>
                ) : (
                  state.more && (
                    <p
                      className="text-xxs w-600 base primary linkbtn mt-30"
                      onClick={() => fetchVacancyListMore()}
                    >
                      Load More...
                    </p>
                  )
                )}
              </div>

              <Modal
                className="ViewFeeStructureWrap"
                ModalSize="modal-l"
                show={state.detailPopup}
              >
                <ModalHeader
                  title={state.detail.title}
                  TitleClass="base"
                  closeButton={true}
                  onclose={closeVacancyPopup}
                />
                <ModalBody>
                  <div className="VacancyDetailWrapper">
                    <div className="VacancyDetailBanner">
                      <ul>
                        <li>
                          <p className="text-xxs">Vacancy Type</p>
                          <p className="text-xs">{state.detail.position}</p>
                        </li>
                        <li>
                          <p className="text-xxs">No. Of Position</p>
                          <p className="text-xs">{state.detail.noOfPosition}</p>
                        </li>
                        <li>
                          <p className="text-xxs">Minimum Experience</p>
                          <p className="text-xs">{state.detail.experience}</p>
                        </li>
                        <li>
                          <p className="text-xxs">Annual Salary</p>
                          <p className="text-xs">
                            ({state.detail.currencyType}){state.detail.annualSalary}
                          </p>
                        </li>
                        <li>
                          <p className="text-xxs">Minimum Qualification</p>
                          <p className="text-xs">{state.detail.qualification}</p>
                        </li>
                        <li>
                          <p className="text-xxs">Last date to apply</p>
                          <p className="text-xxs">
                            {moment(state.detail.lastApplyDate).format("DD MMM. YYYY")}
                          </p>
                        </li>
                      </ul>
                    </div>

                    <div className="VD-ActionSection mt-20">
                      <button
                        onClick={() => openApplyVacancyPopup(state.detail._id, true)}
                        className="button button-base btn-sm"
                        type="button"
                      >
                        Apply Now
                      </button>
                      {state.detail.fileUpload&&state.detail.fileUpload.src && (
                        <a
                          href={state.detail.fileUpload.src}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="button btn-o-mgray btn-sm base"
                        >
                          Download Job Description
                        </a>
                      )}
                    </div>
                    <div className="VD-ContentSection mt-20">
                      <p className="text-sm">Job Description</p>
                      {
                        state.detail.description && <FormatText text={state.detail.description}>
                          {({ formatedText }) => (
                            <p
                              className="text-xxs mt-10 sun-editor-output"
                              dangerouslySetInnerHTML={{ __html: formatedText }}
                            ></p>
                          )}
                        </FormatText>
                      }

                      {state.detail.keyRoles && (
                        <React.Fragment>
                          <p className="text-sm mt-20">Key Roles & Responsibility</p>
                          <FormatText text={state.detail.keyRoles}>
                            {({ formatedText }) => (
                              <p className="sun-editor-output"
                                dangerouslySetInnerHTML={{ __html: formatedText }}
                              ></p>
                            )}
                          </FormatText>

                        </React.Fragment>
                      )}
                    </div>
                  </div>
                </ModalBody>
              </Modal>
              {ModalApplyJob && <ApplyJobVacancy
                open={ModalApplyJob}
                back={backOption}
                backAction={handleBackOption}
                detail={state.detail}
                close={closeVacancyApply}
              />}
            </div>
          )
      }
    </React.Fragment>
  );
};

export default WebsiteVacancy;
