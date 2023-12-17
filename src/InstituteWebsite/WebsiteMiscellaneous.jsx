import React, { useEffect, useReducer, useState } from "react";
// import Card from "../Common/Card/index";
// import CardBody from "../Common/Card/CardBody";
import ComponentLoader from "../Common/Loader/ComponentLoader";
import Request from "../Classes/Request";
import { NavLink } from "react-router-dom";
import AppLink from "../Common/AppLink";
import { useSelector } from "react-redux";
// import FormatText from "../Common/FormatText";
import { DynamicHeaderConsumer } from "../Context/DynamicHeaderContext";
//import MiscellaneousPopup from "./WebsiteComponents/MiscellaneousPopup";
// import BackgroundDefault from "../assets/images/img/BackgroundDefault.png";
// import IconAttachment from "../App/AdminDashboard/Website/NoticeBoard/icon-attachment.svg";
import "../App/AdminDashboard/Website/NoticeBoard/NoticeBoard.scss";
const InstituteMiscellaneousRequest = new Request();
let limit = 9;
const miscellaneousUrl = InstituteMiscellaneousRequest.url(
  "/notices/getNotice?institute=__INSTITUTE_ID__&isStatus=Active&industry=__type__"
);
// Actions
const insmiscellaneousActions = {
  INS_MISC_LOADING: "INS_MISC_LOADING",
  INS_MISC_LOADED: "INS_MISC_LOADED",
  INS_MISC_LOADING_ERROR: "INS_MISC_LOADING_ERROR",
  INS_MISC_MORE_LOADING: "INS_MISC_MORE_LOADING",
  INS_MISC_MORE_LOADED: "INS_MISC_MORE_LOADED",
  INS_MISC_MORE_LOADING_ERROR: "INS_MISC_LOADING_ERROR",
};

// initail states
const insMiscInitStates = {
  data: [],
  total: 0,
  skip: 0,
  loading: false,
  error: false,
  more: false,
  moreloading: false,
};

// self reducer method
const miscellaneousReducer = (_state, { type, payload }) => {
  switch (type) {
    case insmiscellaneousActions.INS_MISC_LOADING:
      return {
        ..._state,
        loading: true,
      };

    case insmiscellaneousActions.INS_MISC_LOADED:
      return {
        ..._state,
        loading: false,
        data: payload,
        more: payload.length === limit,
      };

    case insmiscellaneousActions.INS_MISC_MORE_LOADING:
      return {
        ..._state,
        moreloading: true,
      };

    case insmiscellaneousActions.INS_MISC_MORE_LOADED:
      return {
        ..._state,
        moreloading: false,
        data: _state.data.concat(payload),
        more: payload.length === limit,
      };

    default:
      return _state;
  }
};


const WebsiteMiscellaneous = ({
  instituteid,
  homePage,
  ShowMiscellaneousLimit,
  disabledButton = false,
}) => {
  limit = ShowMiscellaneousLimit ? ShowMiscellaneousLimit : 9;

  const insWebsiteDetails = useSelector(
    (state) => state.institutewebsite.heading
  );
  const industryType = useSelector((state) =>
    state.user.user_business_type);
  const [state, dispatch] = useReducer(miscellaneousReducer, insMiscInitStates);
  const fetchMiscellaneousList = () => {
    dispatch({ type: insmiscellaneousActions.INS_MISC_LOADING, payload: {} });
    InstituteMiscellaneousRequest.get(
      miscellaneousUrl
        .replace("__INSTITUTE_ID__", instituteid)
        .replace("__LIMIT__", limit)
        .replace("__SKIP__", 0).replace("__type__", industryType),
      (success) => {
        dispatch({
          type: insmiscellaneousActions.INS_MISC_LOADED,
          payload: success.data,
        });
      },
      (error) => { }
    );
  };



  const fetchMiscellaneousListMore = () => {
    dispatch({ type: insmiscellaneousActions.INS_MISC_MORE_LOADING, payload: {} });
    InstituteMiscellaneousRequest.get(
      miscellaneousUrl
        .replace("__INSTITUTE_ID__", instituteid)
        .replace("__LIMIT__", limit)
        .replace("__SKIP__", state.data.length),
      (success) => {
        dispatch({
          type: insmiscellaneousActions.INS_MISC_MORE_LOADED,
          payload: success.data.allMiscellaneousInfo,
        });
      },
      (error) => { }
    );
  };

  useEffect(fetchMiscellaneousList, [instituteid]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [readMoreText, setReadMoreText] = useState("");
  const [toggle, setTogget] = useState(false);

  const { users, instituteWebsite } = useSelector((state) => {
    return {
      instituteWebsite: state.institutewebsite.data,
      users: state.user,
    };
  });

  const ReadMoreButton = (id, active) => {
    setReadMoreText(id);
    setTogget(active);
  };

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
  const [File, setFile] = useState(false)

  const downloadFile = () => {
    setFile(true)
  }

  return (
    <React.Fragment>
      {
        homePage ?
          state.data.length > 0 && (<div className="ServiceOfferedWrapper">
            <div className="sectionCntrWrap">
              <div className="PageTopHead">
                <DynamicHeaderConsumer>
                  {(value) => (
                    <div className="PTH-Item secHeadWrap">
                      <h3 className="heading">{value.noticehead || "Miscellaneous"}</h3>
                      <p className="subheading">
                        {value.noticesubhead ||
                          "A full spectrum of services to ensure an enriching learning experience."}
                      </p>
                    </div>
                  )}
                </DynamicHeaderConsumer>
              </div>

              {state.error ? (
                <div>
                  Error in fetching the details
                  <button onClick={() => fetchMiscellaneousList()}>Reload</button>
                </div>
              ) : state.loading ? (
                <ComponentLoader />
              ) : state.data.length > 0 ? (
                //<div className="ServiceOfferedGallery">
                <div className="gridListTable">
                  <div className="gridBody">
                    {state.data.map((item, index) => (
                      <div className="gridRow">
                        <ul className="topInfo">
                          <li className="col col-4" data-head="Title ">
                            <div className="text-xs w-600 base">
                              {item.title}
                            </div>
                          </li>
                          <li
                            className="col col-3"
                            data-head="Description"
                          >
                            <React.Fragment>
                              {item._id === readMoreText && toggle
                                ? item.description
                                : item.description.slice(0, 50)}

                              <div
                                className={`${item.description.length > 50
                                  ? "ToggleBtnSectionCst"
                                  : ""
                                  } `}
                              >
                                <span
                                  className={
                                    `primary ${item._id === readMoreText && toggle
                                      ? "active"
                                      : ""}`
                                  }
                                  onClick={() =>
                                    ReadMoreButton(item._id, !toggle)
                                  }
                                >
                                  <React.Fragment>
                                    {!toggle && item.description.length > 50
                                      ? "Read More"
                                      : item._id === readMoreText &&
                                        item.description.length > 50 &&
                                        toggle
                                        ? "Read Less"
                                        : item._id !== readMoreText &&
                                          item.description.length > 50 &&
                                          toggle
                                          ? "Read More"
                                          : ""}
                                  </React.Fragment>
                                </span>
                              </div>
                            </React.Fragment>
                          </li>
                          <li className="col col-4 actionCols">
                            {!item.attachment || item.attachment === "" ? (
                              ""
                            ) : (
                              <div className="actionBtn">
                                <a
                                  className="btn-square"
                                  title="Download Attachment"
                                  href={item.attachment}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <span className="cssIcon">
                                    <i className="ed-download"></i>
                                  </span>
                                </a>
                              </div>
                            )}
                          </li>

                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
                //</div>
              ) : (
                <>
                  {isLoggedIn ? (
                    <React.Fragment>
                      <p className="text-xxs">
                        Miscellaneous field is empty. Parents are curious about this
                        information.
                      </p>
                      {!disabledButton ? (
                        <AppLink
                          className="button mt-20"
                          to="/"
                          target="_blank"
                        >
                          Add{" "}
                          {insWebsiteDetails.noticehead
                            ? insWebsiteDetails.noticehead
                            : "Miscellaneous"}
                        </AppLink>
                      ) : (
                        <button className="button mt-20" target="_blank">
                          Add{" "}
                          {insWebsiteDetails.noticehead
                            ? insWebsiteDetails.noticehead
                            : "Miscellaneous"}
                        </button>
                      )}
                    </React.Fragment>
                  ) : (
                    ` No  ${insWebsiteDetails.noticehead
                      ? insWebsiteDetails.noticehead
                      : "Miscellaneous"}`
                  )}
                </>
              )}
              {
                state.data.length > 0 ? (
                  <React.Fragment>
                    {" "}
                    {ShowMiscellaneousLimit ? (
                      <NavLink to="miscellaneous" className="button mt-15">
                        View all{" "}
                        {insWebsiteDetails.noticehead
                          ? insWebsiteDetails.noticehead
                          : "Miscellaneous"}
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
                              onClick={() => fetchMiscellaneousListMore()}
                            >
                              View all{" "}
                              {insWebsiteDetails.noticehead
                                ? insWebsiteDetails.noticehead
                                : "Miscellaneous"}
                            </span>
                          )
                        )}
                      </React.Fragment>
                    )}{" "}
                  </React.Fragment>
                ) : (
                  ""
                )
              }
            </div>
          </div>) : (
            <div className="ServiceOfferedWrapper">
              <div className="sectionCntrWrap">
                <div className="PageTopHead">
                  <DynamicHeaderConsumer>
                    {(value) => (
                      <div className="PTH-Item secHeadWrap">
                        <h3 className="heading">{value.noticehead || "Miscellaneous"}</h3>
                        <p className="subheading">
                          {value.noticesubhead ||
                            "A full spectrum of miscellaneous to ensure an enriching learning experience."}
                        </p>
                      </div>
                    )}
                  </DynamicHeaderConsumer>
                </div>

                {state.error ? (
                  <div>
                    Error in fetching the details
                    <button onClick={() => fetchMiscellaneousList()}>Reload</button>
                  </div>
                ) : state.loading ? (
                  <ComponentLoader />
                ) : state.data.length > 0 ? (
                  <div className="gridListTable">
                    <div className="gridBody">
                      {state.data.map((item, index) => (
                        <div className="gridRow">
                          <ul className="topInfo">
                            <li className="col col-3" data-head="Title ">
                              <div className="text-xs w-600 base">
                                {item.title}
                              </div>
                            </li>
                            <li
                              className="col col-4"
                              data-head="Description"
                            >
                              <React.Fragment>
                                {item._id === readMoreText && toggle
                                  ? item.description
                                  : item.description.slice(0, 50)}

                                <div
                                  className={`${item.description.length > 50
                                    ? "ToggleBtnSectionCst"
                                    : ""
                                    } `}
                                >
                                  <span
                                    className={
                                      `primary ${item._id === readMoreText && toggle
                                        ? "active"
                                        : ""}`
                                    }
                                    onClick={() =>
                                      ReadMoreButton(item._id, !toggle)
                                    }
                                  >
                                    <React.Fragment>
                                      {!toggle && item.description.length > 50
                                        ? "Read More"
                                        : item._id === readMoreText &&
                                          item.description.length > 50 &&
                                          toggle
                                          ? "Read Less"
                                          : item._id !== readMoreText &&
                                            item.description.length > 50 &&
                                            toggle
                                            ? "Read More"
                                            : ""}
                                    </React.Fragment>
                                  </span>
                                </div>
                              </React.Fragment>
                            </li>
                            <li className="col col-4 actionCols">
                              {!item.attachment || item.attachment === "" ? (
                                ""
                              ) : (
                                <div className="actionBtn">
                                  <a
                                    className="btn-square"
                                    title="Download Attachment"
                                    href={item.attachment}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <span className="cssIcon">
                                      <i className="ed-download"></i>
                                    </span>
                                  </a>
                                </div>
                              )}
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {isLoggedIn ? (
                      <React.Fragment>
                        <p className="text-xxs">
                          This field is empty. Parents are curious about this
                          information.
                        </p>
                        {!disabledButton ? (
                          <AppLink
                            className="button mt-20"
                            to="/miscellaneous-list"
                            target="_blank"
                          >
                            Add{" "}
                            {insWebsiteDetails.noticehead
                              ? insWebsiteDetails.noticehead
                              : "Miscellaneous"}
                          </AppLink>
                        ) : (
                          <button className="button mt-20" target="_blank">
                            Add{" "}
                            {insWebsiteDetails.noticehead
                              ? insWebsiteDetails.noticehead
                              : "Miscellaneous"}
                          </button>
                        )}
                      </React.Fragment>
                    ) : (
                      ` No  ${insWebsiteDetails.noticehead
                        ? insWebsiteDetails.noticehead
                        : "Miscellaneous"}`
                    )}
                  </>
                )}
                {state.data.length > 0 ? (
                  <React.Fragment>
                    {" "}
                    {ShowMiscellaneousLimit ? (
                      <NavLink to="miscellaneous" className="button mt-15">
                        View all{" "}
                        {insWebsiteDetails.noticehead
                          ? insWebsiteDetails.noticehead
                          : "Miscellaneous"}
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
                              onClick={() => fetchMiscellaneousListMore()}
                            >
                              View all{" "}
                              {insWebsiteDetails.noticehead
                                ? insWebsiteDetails.noticehead
                                : "Miscellaneou"}
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
            </div>
          )
      }

      {/* {viewPopupToggle &&
        <MiscellaneousPopup onclose={closeModal} show={viewPopupToggle} />
      } */}

    </React.Fragment>

  );
};
export default WebsiteMiscellaneous;