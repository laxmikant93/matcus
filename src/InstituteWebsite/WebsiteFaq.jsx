import React, { useState, useEffect, useReducer } from "react";
import ComponentLoader from "../Common/Loader/ComponentLoader";
import Request from "../Classes/Request";
import { NavLink } from "react-router-dom";
import AppLink from "../Common/AppLink";
import { useSelector } from "react-redux";
import FormatText from "../Common/FormatText";
import { DynamicHeaderConsumer } from "../Context/DynamicHeaderContext";

const InstituteFaqRequest = new Request();
let limit = 10;
const serviceUrl = InstituteFaqRequest.url(
  "faq?institute=__INSTITUTE_ID__&limit=__LIMIT__&skip=__SKIP__","commonservices"
);
// Actions
const insFaqActions = {
  INS_FAQ_LOADING: "INS_FAQ_LOADING",
  INS_FAQ_LOADED: "INS_FAQ_LOADED",
  INS_FAQ_LOADING_ERROR: "INS_FAQ_LOADING_ERROR",
  INS_FAQ_MORE_LOADING: "INS_FAQ_MORE_LOADING",
  INS_FAQ_MORE_LOADED: "INS_FAQ_MORE_LOADED",
  INS_FAQ_MORE_LOADING_ERROR: "INS_FAQ_LOADING_ERROR",
};

// initail states
const insFaqInitStates = {
  data: [],
  total: 0,
  skip: 0,
  loading: false,
  error: false,
  more: false,
  moreloading: false,
};

// self reducer method
const faqReducer = (_state, { type, payload }) => {
  switch (type) {
    case insFaqActions.INS_FAQ_LOADING:
      return {
        ..._state,
        error: false,
        loading: true,
      };

    case insFaqActions.INS_FAQ_LOADED:
      return {
        ..._state,
        loading: false,
        data: payload,
        more: payload.length === limit,
      };

    case insFaqActions.INS_FAQ_MORE_LOADING:
      return {
        ..._state,
        moreloading: true,
        error: false,
      };

    case insFaqActions.INS_FAQ_MORE_LOADED:
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

const WebsiteFaq = ({ instituteid, ShowFaqLimit, homePage, disabledButton = false }) => {
  limit = ShowFaqLimit ? ShowFaqLimit : 10;
  let faqServiceUrl = serviceUrl
    .replace("__INSTITUTE_ID__", instituteid)
    .replace("__LIMIT__", limit)
    .replace("__SKIP__", 0);
  if (ShowFaqLimit) {
    faqServiceUrl = `${faqServiceUrl}&featured=Yes&status=Active`;
  } else {
    faqServiceUrl = `${faqServiceUrl}&status=Active`;
  }
  const [showAnwer, hideAnswer] = useState(-1);
  function showHideFaq(index) {
    hideAnswer(showAnwer === index ? -1 : index);
  }

  const insWebsiteDetails = useSelector(
    (state) => state.institutewebsite.heading
  );
  const [state, dispatch] = useReducer(faqReducer, insFaqInitStates);
  const fetchFaqList = () => {
    dispatch({ type: insFaqActions.INS_FAQ_LOADING, payload: {} });
    InstituteFaqRequest.get(
      faqServiceUrl,
      (success) => {
        dispatch({
          type: insFaqActions.INS_FAQ_LOADED,
          payload: success.data.allFaqInfo,
        });
      },
      (error) => {
        // dispatch({
        //   type: insFaqActions.INS_FAQ_LOADED,
        //   payload: success.data.allServicesInfo
        // })
      }
    );
  };

  const fetchFaqListMore = () => {
    dispatch({ type: insFaqActions.INS_FAQ_MORE_LOADING, payload: {} });
    InstituteFaqRequest.get(
      serviceUrl
        .replace("__INSTITUTE_ID__", instituteid)
        .replace("__LIMIT__", limit)
        .replace("__SKIP__", state.data.length),
      (success) => {
        dispatch({
          type: insFaqActions.INS_FAQ_MORE_LOADED,
          payload: success.data.allFaqInfo,
        });
      },
      (error) => { }
    );
  };

  useEffect(fetchFaqList, [instituteid, faqServiceUrl]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { users, instituteWebsite, instituteheading } = useSelector((state) => {
    return {
      instituteWebsite: state.institutewebsite.data,
      instituteheading: state.institutewebsite.heading,
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
            <div className={ShowFaqLimit ? "" : "sectionCntrWrap"}>
              <div className="SD-WebFaqs">
                {ShowFaqLimit ? (
                  <div className="PageTopHead">
                    <DynamicHeaderConsumer>
                      {(value) => (
                        <div className="PTH-Item secHeadWrap">
                          <h3 className="heading">{value.faqhead || "FAQ"}</h3>
                          <p className="subheading">
                            {value.faqsubhead ||
                              "Need help? Refer to our most frequently asked questions."}
                          </p>
                        </div>
                      )}
                    </DynamicHeaderConsumer>
                  </div>
                ) : (
                  <div className="PageTopHead secHeadWrap">
                    <div className="PTH-Item">
                      <h3 className="heading">{instituteheading.faqhead || "Frequently Asked Questions"}</h3>
                      <p className="subheading">
                        {instituteheading.faqsubhead ? instituteheading.faqsubhead :
                          "Need help? Refer to our most frequently asked questions."}
                      </p>
                    </div>
                  </div>
                )}
                <section className="faqWrapSec subdomainHomeFaq">
                  {state.error ? (
                    <div>
                      Error in fetching the details
                      <button onClick={() => fetchFaqList()}>Reload</button>
                    </div>
                  ) : state.loading ? (
                    <ComponentLoader />
                  ) : state.data.length > 0 ? (
                    state.data.map((faqListItem, index) => (
                      <article
                        key={index}
                        id={index}
                        className={showAnwer === index ? "active" : ""}
                      >
                        <div className="faqHead" onClick={() => showHideFaq(index)}>
                          {faqListItem.title}
                        </div>
                        {faqListItem.description && (
                          <FormatText text={faqListItem.description}>
                            {({ formatedText }) => (
                              <div
                                className="faqAnswerDisp sun-editor-output"
                                dangerouslySetInnerHTML={{ __html: formatedText }}
                              ></div>
                            )}
                          </FormatText>
                        )}
                      </article>
                    ))
                  ) : (
                    <>
                      {isLoggedIn ? (
                        <React.Fragment>
                          <p className="text-xxs">
                            Your visitors are interested in this information.
                            Unfortunately, you have not added any FAQs.
                          </p>
                          {!disabledButton ? (
                            <AppLink
                              className="button mt-20"
                              to="/manage-faqs"
                              target="_blank"
                            >
                              Add{" "}
                              {insWebsiteDetails.faqhead
                                ? insWebsiteDetails.faqhead
                                : "FAQs"}
                            </AppLink>
                          ) : (
                            <button
                              className="button mt-20"
                              to="/manage-faqs"
                              target="_blank"
                            >
                              Add{" "}
                              {insWebsiteDetails.faqhead
                                ? insWebsiteDetails.faqhead
                                : "FAQs"}
                            </button>
                          )}
                        </React.Fragment>
                      ) : (
                        `No ${insWebsiteDetails.faqhead
                          ? insWebsiteDetails.faqhead
                          : "FAQs"}`
                      )}
                    </>
                  )}
                  {state.data.length > 0 ? (
                    <React.Fragment>
                      {" "}
                      {ShowFaqLimit ? (
                        <NavLink className="button mt-15" to="/faqs">
                          View all{" "}
                          {insWebsiteDetails.faqhead
                            ? insWebsiteDetails.faqhead
                            : "FAQs"}
                        </NavLink>
                      ) : (
                        <React.Fragment>
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
                                className="text-xxs w-600 base primary linkbtn"
                                onClick={() => fetchFaqListMore()}
                              >
                                Load More...
                              </p>
                            )
                          )}
                        </React.Fragment>
                      )}{" "}
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </section>
              </div>
            </div>
          ) : (
            <div className={ShowFaqLimit ? "" : "sectionCntrWrap"}>
              <div className="SD-WebFaqs">
                {ShowFaqLimit ? (
                  <div className="PageTopHead">
                    <DynamicHeaderConsumer>
                      {(value) => (
                        <div className="PTH-Item secHeadWrap">
                          <h3 className="heading">{value.faqhead || "FAQ"}</h3>
                          <p className="subheading">
                            {value.faqsubhead ||
                              "Need help? Refer to our most frequently asked questions."}
                          </p>
                        </div>
                      )}
                    </DynamicHeaderConsumer>
                  </div>
                ) : (
                  <div className="PageTopHead secHeadWrap">
                    <div className="PTH-Item">
                      <h3 className="heading">{instituteheading.faqhead || "Frequently Asked Questions"}</h3>
                      <p className="subheading">
                        {instituteheading.faqsubhead ||
                          "Need help? Refer to our most frequently asked questions."}
                      </p>
                    </div>
                  </div>
                )}
                <section className="faqWrapSec subdomainHomeFaq">
                  {state.error ? (
                    <div>
                      Error in fetching the details
                      <button onClick={() => fetchFaqList()}>Reload</button>
                    </div>
                  ) : state.loading ? (
                    <ComponentLoader />
                  ) : state.data.length > 0 ? (
                    state.data.map((faqListItem, index) => (
                      <article
                        key={index}
                        id={index}
                        className={showAnwer === index ? "active" : ""}
                      >
                        <div className="faqHead" onClick={() => showHideFaq(index)}>
                          {faqListItem.title}
                        </div>
                        {faqListItem.description && (
                          <FormatText text={faqListItem.description}>
                            {({ formatedText }) => (
                              <div
                                className="faqAnswerDisp sun-editor-output"
                                dangerouslySetInnerHTML={{ __html: formatedText }}
                              ></div>
                            )}
                          </FormatText>
                        )}
                      </article>
                    ))
                  ) : (
                    <>
                      {isLoggedIn ? (
                        <React.Fragment>
                          <p className="text-xxs">
                            Your visitors are interested in this information.
                            Unfortunately, you have not added any FAQs.
                          </p>
                          {!disabledButton ? (
                            <AppLink
                              className="button mt-20"
                              to="/manage-faqs"
                              target="_blank"
                            >
                              Add{" "}
                              {insWebsiteDetails.faqhead
                                ? insWebsiteDetails.faqhead
                                : "FAQs"}
                            </AppLink>
                          ) : (
                            <button
                              className="button mt-20"
                              to="/manage-faqs"
                              target="_blank"
                            >
                              Add{" "}
                              {insWebsiteDetails.faqhead
                                ? insWebsiteDetails.faqhead
                                : "FAQs"}
                            </button>
                          )}
                        </React.Fragment>
                      ) : (
                        `No ${insWebsiteDetails.faqhead
                          ? insWebsiteDetails.faqhead
                          : "FAQs"}`
                      )}
                    </>
                  )}
                  {state.data.length > 0 ? (
                    <React.Fragment>
                      {" "}
                      {ShowFaqLimit ? (
                        <NavLink className="button mt-15" to="/faqs">
                          View all{" "}
                          {insWebsiteDetails.faqhead
                            ? insWebsiteDetails.faqhead
                            : "FAQs"}
                        </NavLink>
                      ) : (
                        <React.Fragment>
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
                                className="text-xxs w-600 base primary linkbtn"
                                onClick={() => fetchFaqListMore()}
                              >
                                Load More...
                              </p>
                            )
                          )}
                        </React.Fragment>
                      )}{" "}
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </section>
              </div>
            </div>
          )
      }
    </React.Fragment>

  );
};

export default WebsiteFaq;
