import React, { useEffect, useReducer, useState } from "react";
import Slider from "react-slick";
import Request from "../Classes/Request";
import FormatText from "../Common/FormatText";
import { NavLink } from "react-router-dom";
import AppLink from "../Common/AppLink";
import { useSelector } from "react-redux";
// import FormatText from "../Common/FormatText";
import { DynamicHeaderConsumer } from "../Context/DynamicHeaderContext";
import Rating from "../App/AdminDashboard/Website/TestimonialList/Rating";
import WebsiteTestimonial from "./WebsiteTestimonial";
const InstituteTestimonialRequest = new Request();
const testimonialUrl = InstituteTestimonialRequest.url(
  "testimonials/testimonial?institute=__INSTITUTE_ID__&isFeatureMarked=Yes&industry=__type__"
);
// Actions
const insTestimonialActions = {
  INS_TESTIM_LOADING: "INS_TESTIM_LOADING",
  INS_TESTIM_LOADED: "INS_TESTIM_LOADED",
  INS_TESTIM_LOADING_ERROR: "INS_TESTIM_LOADING_ERROR",
};

// initail states
const insTestimInitStates = {
  data: [],
  total: 0,
  skip: 0,
  loading: false,
  error: false,
};

// self reducer method
const testimonialReducer = (_state, { type, payload }) => {
  switch (type) {
    case insTestimonialActions.INS_TESTIM_LOADING:
      return {
        ..._state,
        loading: true,
      };

    case insTestimonialActions.INS_TESTIM_LOADED:
      return {
        ..._state,
        loading: false,
        data: payload,
      };

    default:
      return _state;
  }
};

const TestimonialSlider = ({ instituteid, homePage }) => {
  // const stars = 5;
  const [state, dispatch] = useReducer(testimonialReducer, insTestimInitStates);
  const insWebsiteDetails = useSelector((state) => state.institutewebsite.heading)
  const industryType = useSelector((state) =>
    state.user.user_business_type);
  const fetchTestimonialList = () => {
    dispatch({ type: insTestimonialActions.INS_TESTIM_LOADING, payload: {} });
    InstituteTestimonialRequest.get(
      testimonialUrl.replace("__INSTITUTE_ID__", instituteid).replace("__type__", industryType),
      (success) => {
        dispatch({
          type: insTestimonialActions.INS_TESTIM_LOADED,
          payload: success.data.allTestimonialInfo || [],
        });
      },
      (error) => {

      }
    );
  };
  const settings = {
    className: "testSubDomainHome",
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    swipeToSlide: true,
  };
  useEffect(fetchTestimonialList, [instituteid]);

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

  const [TestimonialModal, SetTestimonialModal] = useState(false);
  const closeModalState = () => {
    SetTestimonialModal(false);
  };

  const handleAddTestimonial = () => {
    SetTestimonialModal(true);
  }

  return (
    <React.Fragment>
      {
        homePage ?
          // state.data.length > 0 && (
          <div className="SD-WebTestimonial">
            <div className="PageTopHead">
              <DynamicHeaderConsumer>
                {(value) => (
                  <div className="PTH-Item secHeadWrap">
                    <h3 className="heading">{value.testimonialhead || "Testimonials"}</h3>
                    <p className="subheading">
                      {value.testimonialsubhead ||
                        "We value your review. Share your experience with us."}
                    </p>
                  </div>
                )}
              </DynamicHeaderConsumer>
            </div>{" "}
            {state.data.length ? (
              <div>
                {state.error ? (
                  <div>   `No ${insWebsiteDetails.testimonialhead
                    ? insWebsiteDetails.testimonialhead
                    : "Testimonial"}`
                    <button
                      className="button mt-20"
                      onClick={handleAddTestimonial}
                    >
                      Add Testimonial
                    </button>
                  </div>
                ) : state.loading ? (
                  <div>Loading...</div>
                ) : state.data.length ? (
                  <React.Fragment>
                    <button
                      className="button mt-20"
                      onClick={handleAddTestimonial}
                    >
                      Add Testimonial
                    </button>
                    <Slider {...settings}>
                      {state.data.map((testimonial) => (
                        <div key={testimonial._id}>
                          <h4>{testimonial.name}</h4>
                          {/* <p className="text-xxs">{`${testimonial.rating} stars out of ${stars}`}</p> */}
                          <Rating
                            IsClickable={false}
                            ratingValue={testimonial.rating}
                          />

                          <FormatText text={testimonial.message}>
                            {({ formatedText }) => (
                              <p
                                className="SD-TestimonialMessage mt-15 sun-editor-output"
                                dangerouslySetInnerHTML={{ __html: formatedText }}
                              ></p>
                            )}
                          </FormatText>
                        </div>
                      ))}
                    </Slider>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <p className="text-xxs">
                      Testimonials field is empty. 84% people trust online
                      testimonials before making a decision.
                    </p>
                    <NavLink
                      className="button btn-sm primary mt-20"
                      to="/"
                    >
                      Add {insWebsiteDetails.testimonialhead ? insWebsiteDetails.testimonialhead : 'Testimonials'}
                    </NavLink>
                  </React.Fragment>
                )}
              </div>
            ) : (
              <>
                {isLoggedIn ? (
                  <React.Fragment>
                    <p className="text-xxs">
                      Testimonials field is empty. 84% people trust online
                      testimonials before making a decision.
                    </p>
                    <AppLink
                      className="button mt-20"
                      to="/testimonial-list"
                      target="_blank"
                    >
                      Add {insWebsiteDetails.testimonialhead ? insWebsiteDetails.testimonialhead : 'Testimonials'}
                    </AppLink>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <button
                      className="button mt-20"
                      onClick={handleAddTestimonial}
                    >
                      Add Testimonial
                    </button></React.Fragment>
                )}
              </>
            )}
          </div>
          : (
            <div className="SD-WebTestimonial">
              <div className="PageTopHead">
                <DynamicHeaderConsumer>
                  {(value) => (
                    <div className="PTH-Item secHeadWrap">
                      <h3 className="heading">{value.testimonialhead || "Testimonials"}</h3>
                      <p className="subheading">
                        {value.testimonialsubhead ||
                          "We value your review. Share your experience with us."}
                      </p>
                    </div>
                  )}
                </DynamicHeaderConsumer>
              </div>{" "}
              {state.data.length ? (
                <div>
                  {state.error ? (
                    <div>No Testimonial</div>
                  ) : state.loading ? (
                    <div>Loading...</div>
                  ) : state.data.length ? (
                    <React.Fragment>
                      <button
                        className="button mt-20"
                        onClick={handleAddTestimonial}
                      >
                        Add Testimonial
                      </button>
                      <Slider {...settings}>
                        {state.data.map((testimonial) => (
                          <div key={testimonial._id}>
                            <h4>{testimonial.name}</h4>
                            {/* <p className="text-xxs">{`${testimonial.rating} stars out of ${stars}`}</p> */}
                            <Rating
                              IsClickable={false}
                              ratingValue={testimonial.rating}
                            />

                            <FormatText text={testimonial.message}>
                              {({ formatedText }) => (
                                <p
                                  className="SD-TestimonialMessage mt-15 sun-editor-output"
                                  dangerouslySetInnerHTML={{ __html: formatedText }}
                                ></p>
                              )}
                            </FormatText>
                          </div>
                        ))}
                      </Slider>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <p className="text-xxs">
                        Testimonials field is empty. 84% people trust online
                        testimonials before making a decision.
                      </p>
                      <NavLink
                        className="button mt-20"
                        to="/"
                      >
                        Add {insWebsiteDetails.testimonialhead ? insWebsiteDetails.testimonialhead : 'Testimonials'}
                      </NavLink>
                    </React.Fragment>
                  )}
                </div>
              ) : (
                <>
                  {isLoggedIn ? (
                    <React.Fragment>
                      <p className="text-xxs">
                        Testimonials field is empty. 84% people trust online
                        testimonials before making a decision.
                      </p>
                      <AppLink
                        className="button mt-20"
                        to="/testimonial-list"
                        target="_blank"
                      >
                        Add {insWebsiteDetails.testimonialhead ? insWebsiteDetails.testimonialhead : 'Testimonials'}
                      </AppLink>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
          )

      }
      {TestimonialModal &&
        <WebsiteTestimonial onclose={closeModalState} show={TestimonialModal} />}

    </React.Fragment>
  );
};

export default TestimonialSlider;
