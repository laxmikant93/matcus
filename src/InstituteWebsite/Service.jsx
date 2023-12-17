import React, { useEffect, useReducer, useState } from "react";
import Card from "../Common/Card/index";
import CardBody from "../Common/Card/CardBody";
import ComponentLoader from "../Common/Loader/ComponentLoader";
import Request from "../Classes/Request";
import { NavLink } from "react-router-dom";
import AppLink from "../Common/AppLink";
import { useSelector } from "react-redux";
import FormatText from "../Common/FormatText";
import { DynamicHeaderConsumer } from "../Context/DynamicHeaderContext";
import ImageViewer from "../Common/ImageViewer";
const InstituteServiceRequest = new Request();
let limit = 9;
const serviceUrl = InstituteServiceRequest.url(
  "services?institute=__INSTITUTE_ID__&limit=__LIMIT__&skip=__SKIP__&isStatus=Active&industry=__type__"

);

// Actions
const insServiceActions = {
  INS_SRVC_LOADING: "INS_SRVC_LOADING",
  INS_SRVC_LOADED: "INS_SRVC_LOADED",
  INS_SRVC_LOADING_ERROR: "INS_SRVC_LOADING_ERROR",
  INS_SRVC_MORE_LOADING: "INS_SRVC_MORE_LOADING",
  INS_SRVC_MORE_LOADED: "INS_SRVC_MORE_LOADED",
  INS_SRVC_MORE_LOADING_ERROR: "INS_SRVC_LOADING_ERROR",
};

// initail states
const insSrvcInitStates = {
  data: [],
  total: 0,
  skip: 0,
  loading: false,
  error: false,
  more: false,
  moreloading: false,
};

// self reducer method
const serviceReducer = (_state, { type, payload }) => {
  switch (type) {
    case insServiceActions.INS_SRVC_LOADING:
      return {
        ..._state,
        loading: true,
      };

    case insServiceActions.INS_SRVC_LOADED:
      return {
        ..._state,
        loading: false,
        data: payload,
        more: payload.length === limit,
      };

    case insServiceActions.INS_SRVC_MORE_LOADING:
      return {
        ..._state,
        moreloading: true,
      };

    case insServiceActions.INS_SRVC_MORE_LOADED:
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

const Service = ({
  instituteid,
  homePage,
  ShowServicesLimit,
  disabledButton = false,
}) => {
  limit = ShowServicesLimit ? ShowServicesLimit : 9;

  const insWebsiteDetails = useSelector(
    (state) => state.institutewebsite.heading
  );
  const industryType = useSelector((state) =>
    state.user.user_business_type);
  const [state, dispatch] = useReducer(serviceReducer, insSrvcInitStates);
  const fetchServiceList = () => {
    dispatch({ type: insServiceActions.INS_SRVC_LOADING, payload: {} });
    InstituteServiceRequest.get(
      serviceUrl
        .replace("__INSTITUTE_ID__", instituteid)
        .replace("__LIMIT__", limit)
        .replace("__SKIP__", 0).replace("__type__", industryType),
      (success) => {
        dispatch({
          type: insServiceActions.INS_SRVC_LOADED,
          payload: success.data.allServicesInfo,
        });
      },
      (error) => { }
    );
  };

  const fetchServiceListMore = () => {
    dispatch({ type: insServiceActions.INS_SRVC_MORE_LOADING, payload: {} });
    InstituteServiceRequest.get(
      serviceUrl
        .replace("__INSTITUTE_ID__", instituteid)
        .replace("__LIMIT__", limit)
        .replace("__SKIP__", state.data.length),
      (success) => {
        dispatch({
          type: insServiceActions.INS_SRVC_MORE_LOADED,
          payload: success.data.allServicesInfo,
        });
      },
      (error) => { }
    );
  };

  useEffect(fetchServiceList, [instituteid]);

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
          state.data.length > 0 && (<div className="ServiceOfferedWrapper">
            <div className="sectionCntrWrap">
              <div className="PageTopHead">
                <DynamicHeaderConsumer>
                  {(value) => (
                    <div className="PTH-Item secHeadWrap">
                      <h3 className="heading">{value.servicehead || "Services"}</h3>
                      <p className="subheading">
                        {value.servicesubhead ||
                          "A full spectrum of services to ensure an enriching learning experience."}
                      </p>
                    </div>
                  )}
                </DynamicHeaderConsumer>
              </div>

              {state.error ? (
                <div>
                  Error in fetching the details
                  <button onClick={() => fetchServiceList()}>Reload</button>
                </div>
              ) : state.loading ? (
                <ComponentLoader />
              ) : state.data.length > 0 ? (
                <div className="ServiceOfferedGallery">
                  {state.data.map((service, index) => (
                    <Card
                      key={`services_${index}`}
                      id={`services_${index}`}
                      className="SO-Card cardPadding"
                    >
                      <CardBody className="SO-CardBody">
                        <div className="ServiceIcon mb-20">
                          {service.thumbnail ? (
                          
                            <ImageViewer
                              object={service.thumbnail}
                              alt={`Service - ${service.title}`}
                              height={50}
                              width={50}
                            />
                          ) : (
                            <i className="ed-icon icon-admission base"></i>
                          )}
                        </div>
                        <p className="text-xs w-700">{service.title}</p>
                        {service.details && (
                          <FormatText text={service.details}>
                            {({ formatedText }) => (
                              <p
                                className="mt-10 sun-editor-output"
                                dangerouslySetInnerHTML={{ __html: formatedText }}
                              ></p>
                            )}
                          </FormatText>
                        )}
                      </CardBody>
                    </Card>
                  ))}
                </div>
              ) : (
                <>
                  {isLoggedIn ? (
                    <React.Fragment>
                      <p className="text-xxs">
                        Services field is empty. Parents are curious about this
                        information.
                      </p>
                      {!disabledButton ? (
                        <AppLink
                          className="button mt-20"
                          to="/services-list"
                          target="_blank"
                        >
                          Add{" "}
                          {insWebsiteDetails.servicehead
                            ? insWebsiteDetails.servicehead
                            : "Services"}
                        </AppLink>
                      ) : (
                        <button className="button mt-20" target="_blank">
                          Add{" "}
                          {insWebsiteDetails.servicehead
                            ? insWebsiteDetails.servicehead
                            : "Services"}
                        </button>
                      )}
                    </React.Fragment>
                  ) : (
                    ` No  ${insWebsiteDetails.servicehead
                      ? insWebsiteDetails.servicehead
                      : "Services"}`
                  )}
                </>
              )}
              {state.data.length > 0 ? (
                <React.Fragment>
                  {" "}
                  {ShowServicesLimit ? (
                    <NavLink to="services" className="button mt-15">
                      View all{" "}
                      {insWebsiteDetails.servicehead
                        ? insWebsiteDetails.servicehead
                        : "Services"}
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
                            onClick={() => fetchServiceListMore()}
                          >
                            View all{" "}
                            {insWebsiteDetails.servicehead
                              ? insWebsiteDetails.servicehead
                              : "Services"}
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
          </div>) : (
            <div className="ServiceOfferedWrapper">
              <div className="sectionCntrWrap">
                <div className="PageTopHead">
                  <DynamicHeaderConsumer>
                    {(value) => (
                      <div className="PTH-Item secHeadWrap">
                        <h3 className="heading">{value.servicehead || "Services"}</h3>
                        <p className="subheading">
                          {value.servicesubhead ||
                            "A full spectrum of services to ensure an enriching learning experience."}
                        </p>
                      </div>
                    )}
                  </DynamicHeaderConsumer>
                </div>

                {state.error ? (
                  <div>
                    Error in fetching the details
                    <button onClick={() => fetchServiceList()}>Reload</button>
                  </div>
                ) : state.loading ? (
                  <ComponentLoader />
                ) : state.data.length > 0 ? (
                  <div className="ServiceOfferedGallery">
                    {state.data.map((service, index) => (
                      <Card
                        key={`services_${index}`}
                        id={`services_${index}`}
                        className="SO-Card cardPadding"
                      >
                        <CardBody className="SO-CardBody">
                          <div className="ServiceIcon mb-20">
                            {service.thumbnail ? (
                              <ImageViewer
                                object={service.thumbnail}
                                alt={`Service - ${service.title}`}
                                height={50}
                                width={50}
                              />
                            ) : (
                              <i className="ed-icon icon-admission base"></i>
                            )}
                          </div>
                          <p className="text-xs w-700">{service.title}</p>
                          {service.details && (
                            <FormatText text={service.details}>
                              {({ formatedText }) => (
                                <p
                                  className="mt-10 sun-editor-output"
                                  dangerouslySetInnerHTML={{ __html: formatedText }}
                                ></p>
                              )}
                            </FormatText>
                          )}
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <>
                    {isLoggedIn ? (
                      <React.Fragment>
                        <p className="text-xxs">
                          Services field is empty. Parents are curious about this
                          information.
                        </p>
                        {!disabledButton ? (
                          <AppLink
                            className="button mt-20"
                            to="/services-list"
                            target="_blank"
                          >
                            Add{" "}
                            {insWebsiteDetails.servicehead
                              ? insWebsiteDetails.servicehead
                              : "Services"}
                          </AppLink>
                        ) : (
                          <button className="button mt-20" target="_blank">
                            Add{" "}
                            {insWebsiteDetails.servicehead
                              ? insWebsiteDetails.servicehead
                              : "Services"}
                          </button>
                        )}
                      </React.Fragment>
                    ) : (
                      ` No  ${insWebsiteDetails.servicehead
                        ? insWebsiteDetails.servicehead
                        : "Services"}`
                    )}
                  </>
                )}
                {state.data.length > 0 ? (
                  <React.Fragment>
                    {" "}
                    {ShowServicesLimit ? (
                      <NavLink to="services" className="button mt-15">
                        View all{" "}
                        {insWebsiteDetails.servicehead
                          ? insWebsiteDetails.servicehead
                          : "Services"}
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
                              onClick={() => fetchServiceListMore()}
                            >
                              View all{" "}
                              {insWebsiteDetails.servicehead
                                ? insWebsiteDetails.servicehead
                                : "Services"}
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

    </React.Fragment>

  );
};

export default Service;
