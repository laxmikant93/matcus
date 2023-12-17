/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './home.scss';
import AppLink from '../../Common/AppLink';
import edCalenderIcon from "./HomeIcons/calender.png";
import DummyProfile from "../../assets/images/img/DummyProfile.png";
import Slider from "react-slick";
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { getFeaturedInstituteList } from '../../store/actions/institutelisting';
import { getAllTestimonails } from '../../store/actions/Testimonial';
const Vid = ({ id, src, play }) => {
  const vidRef = React.createRef();
  useEffect(() => {
    if (play) {
      // vidRef.current?.play();
      const active = vidRef.current?.closest(".slick-active");
      if (!active) {
        vidRef.current?.pause();
      }
    } else {
      vidRef.current?.pause();
    }
  }, [play]);
  return (
    <video className={`video-${id}`} ref={vidRef} width="400" controls>
      <source src={src} type="video/mp4" />
    </video>
  );
};
const EdneedReviewSlider = () => {
  const [curIdx, setCurIdx] = useState(0);

  const dispatch = useDispatch()
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    dots: true,
    speed: 300,
    infinite: true,
    autoplaySpeed: 5000,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          arrows: true,
          centerPadding: '120px',
          slidesToShow: 3,
          centerMode: false,
          autoplay: false,
        }
      },
      {
        breakpoint: 1440,
        settings: {
          arrows: true,
          centerPadding: '60px',
          slidesToShow: 2,
          centerMode: true,
          autoplay: false,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '180px',
          slidesToShow: 1,
          autoplay: false,
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: false,
          centerPadding: '0',
          slidesToShow: 1,
          autoplay: false,
        }
      }
    ]
  };
  // const { instituteListingView, insituteList } = useSelector((state) => {
  //   return {
  //     users: state.user,
  //     instituteListingView: state.institutelisting.featuredListing,
  //     insituteList: state.institutelisting.featuredListing.data.data,
  //   };
  // });


  // getFeaturedInstituteList()
  // useEffect(() => {
  //   dispatch(getAllTestimonails());
  // }, [dispatch]);
  const testimonailsData = [
    {
      instituteBanner: "",
      instituteBannerVideo: "https://edneed-images-uat.s3.amazonaws.com/1635312044Edneed%20Review.mp4",
      instituteName: "Guru Nanak Dev ji Institute of Suchajji Foundation",
      instituteReview: "Benefits both students and teachers in diffucilt times. It has become a self based learning and allows teachers and students  to work together to meeet the scheduled target. As teachers, we can teach anywhere with the help of edneed, students can learn anywhere and we can connect anywhere. Delivering online and hybrid learning, better engage students through impactful virtual experiences.",
      reviewerImage: "",
      reviewerName: "Guru Nanak Dev ji Institute of Suchajji Foundation",
      reviewerDesignation: "Kulwant Kaur"
    },
    {
      instituteBanner: "https://edneed-images-uat.s3.amazonaws.com/1620214620School%20pic.jpg",
      instituteName: "Tarun Chandra Bhattacharya Memorial Junior College",
      instituteReview: "Edneed platform is a worldclass solution provider for online schooling. We benefited a lot during lockdown period. All classes could be scheduled with convenience and both our teachers and students liked it a lot. I thank Edneed for associating with us and helping us to bridge the gap. It also provide an overall administration opportunity environment for the institution. I wish Edneed a bright future. Nayanjyoti Khaund Director & Principal Tarun Chandra Bhattacharyya Memorial Senior Secondary School, Biswanath Chariali, Assam.",
      reviewerImage: "https://edneed-images-uat.s3.amazonaws.com/161978851243670a3f-5b32-462f-be15-ec4c51dac000.jpg",
      reviewerName: "Mr.Nayanjyoti Khaund",
      reviewerDesignation: "Institute Admin"
    }, {
      instituteBanner: "https://edneed-images-uat.s3.amazonaws.com/blob:https://edneed.com/91acf902-6b57-4440-b933-b01589d4ce2c",
      instituteName: "Areca School",
      instituteReview: "Very good👍👍👍 app yes we needs to use and improve day by days to come thanks a lots.",
      reviewerImage: "https://edneed-images-uat.s3.amazonaws.com/blob:https://edneed.com/239804e7-3dd1-48b6-b8bc-fb1dfd275534",
      reviewerName: "Hemprakash",
      reviewerDesignation: "Teacher"
    },
    {
      instituteBanner: "https://edneed-images-uat.s3.amazonaws.com/blob:https://edneed.com/1836a00f-26f9-4725-9be7-142a284823c7",
      instituteName: "Royal Academy",
      instituteReview: "With Edneed we were able to build a dynamic website very easily. Their support team also helped us in designing the website. We are overall very happy with their product and services.",
      reviewerImage: "https://edneed-images-uat.s3.amazonaws.com/blob:https://edneed.com/f06f4934-50e7-4da7-8917-f80050d72721",
      reviewerName: "Vinay Kumar",
      reviewerDesignation: "Teacher"
    },
    {
      instituteBanner: "https://edneed-images-uat.s3.amazonaws.com/blob:https://edneed.com/01f1f696-6b60-43cb-b73b-9090a3b48f3d",
      instituteName: "Balrampur Modern School",
      instituteReview: "We made our school's website with Edneed's website builder. Their dashboard is pretty simple and easy to use. I am satisfied with their services. Also, the staff of the company is humble and supporting.",
      reviewerImage: "https://edneed-images-uat.s3.amazonaws.com/blob:https://edneed.com/dcf3550c-f887-427b-b141-362eafc9355e",
      reviewerName: "Shri Hemant Kumar Tiwari",
      reviewerDesignation: "Institute Admin"
    },
    {
      instituteBanner: "https://edneed-images-uat.s3.amazonaws.com/blob:https://edneed.com/74ffb82f-8b5a-475b-a258-b425e7b22e3e",
      instituteName: "Mansi International School",
      instituteReview: "I am happy to recommend the high-quality services of Edneed Technology Pvt Limited, website builder and Digital Marketing Service. The clients get a 24-hour service. The prices are also very reasonable compared to other providers in the market. I strongly recommend Edneed for your offical  and personal growth.",
      reviewerImage: "https://edneed-images-uat.s3.amazonaws.com/blob:https://edneed.com/b981eaa3-9f9c-41da-922c-31218608d89e",
      reviewerName: "Anamika",
      reviewerDesignation: "Teacher"
    },
    {
      instituteBanner: "https://edneed-images-uat.s3.amazonaws.com/blob:https://edneed.com/7e71994a-ca37-45b5-a1af-f1f9540c50ed",
      instituteName: "Geeta International School",
      instituteReview: "My school's digital marketing services are handled by Edneed digital marketing team . We are aware of the reach of digital media in modern days and the impact it can have on marketing. Not only does it offers targeted campaign, but also it can help tangible performance measurement by mixing different channels available and reduction in cost. The result-oriented approach of Edneed gives me the confidence to recommend the company in the highest order.",
      reviewerImage: "https://edneed-images-uat.s3.amazonaws.com/blob:https://edneed.com/2efe93d5-2b12-4c9b-b7b3-cfebc7251a09",
      reviewerName: "Neelam Agarwal",
      reviewerDesignation: "Institute Admin"
    },
    {
      instituteBanner: "https://edneed-images-uat.s3.amazonaws.com/blob:https://edneed.com/23c39986-7fb4-48a4-b506-f23cea714404",
      instituteName: "Gyandhara Competition Classes",
      instituteReview: "Edneed has been working with our Gyandhara Competition Classes for the last few months and has been providing website building and maintaining services. I am confident about the services of Edneed  and I can surely recommend the services  of Edneed for other institutions.",
      reviewerImage: "https://edneed-images-uat.s3.amazonaws.com/blob:https://gyandharacompetition.com/21821706-1043-4ac3-b445-7b14667bfa93",
      reviewerName: "Imran Khan",
      reviewerDesignation: "Institute Admin"
    },
    {
      instituteBanner: "https://edneed-images-uat.s3.amazonaws.com/blob:https://edneed.com/f4158011-ade4-4fa3-9336-61279306c8e2",
      instituteName: "Rosewood Inter College",
      instituteReview: "I am extremely happy to recommend to you the exceptional quality of the Digital Marketing services and Website builder product of company named Edneed Technology Pvt Limited. I have never encountered any kind of problem with their products or services. Therefore, I highly recommend Edneed for all of your requirements in this field, and have the confidence that you will not be disappointed by my recommendation.",
      reviewerImage: "",
      reviewerName: "Amit Pandey",
      reviewerDesignation: "Institute Admin"
    }
  ]
  return (
    <Fragment>
      {/* {instituteListingView.success ? ( */}
      <div className={'ed_review_slider_wrap'}>
        <div className={'edneed_instute_slider_wrap_head'}>
          <h3 className={`secondary w-600 text-xs`}>CUSTOMER TESTIMONIALS</h3>
          <h4 className={`base w-600`}>What our clients say about us</h4>
        </div>
        <div className={'ed_institute_slider_panel'}>

          <Slider beforeChange={(cur, next) => {
            setCurIdx(next);
          }} {...settings}>
            {/* {insituteList.length > 0 && insituteList.map((item) => { */}
            {/* return ( */}
            {/* <> */}
            {testimonailsData.map((item, index) => {
              return (
                <div className={'reviewcard_slider_wrap'} key={index}>
                  <div className={'reviewcard_slider_cst'}>
                    <div className={'reviewcard_slider_cover'}>
                      {item.instituteBanner.length > 0 ? (
                        <img className="img-fluid" src={item.instituteBanner} alt="Dummy Cover" />
                      ) : (
                        <Vid id={index} src={item.instituteBannerVideo} play={index === curIdx} />
                      )}

                    </div>
                    <div className={'reviewcard_slider_body'}>
                      <div className={'reviewcard_slider_detail'}>
                        <h5>{item.instituteName}</h5>
                        <div className={'start_rating'}>
                          <span className="active">&#9733;</span>
                          <span className="active">&#9733;</span>
                          <span className="active">&#9733;</span>
                          <span className="active">&#9733;</span>
                          <span className="active">&#9733;</span>
                        </div>
                        <>
                          {item.instituteReview.length > 130 ? (
                            <>
                              <p className='review_des'>{item.instituteReview.slice(0, 130)}
                                {item.instituteReview.length > 150 && <>...<AppLink className="seemore_btn" to='/profile-review-list'>See more </AppLink></>}</p>
                            </>
                          ) : <p className='review_des'>{item.instituteReview}</p>
                          }
                        </>
                      </div>
                      <div className={'reviewcard_slider_footer'}>
                        <div className={'dummy_user_profile_image'}>
                          {item.reviewerImage.length ? (
                            <img className="img-fluid" src={item.reviewerImage} alt="User Profile" />
                          ) : (
                            <img className="img-fluid" src={DummyProfile} alt="User Profile" />
                          )}

                        </div>
                        <div className={'user_profile_detail'}>
                          <h5>{item.reviewerName}</h5>
                          <h6>{item.reviewerDesignation}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* </> */}
            {/* ) */}
            {/* })} */}

          </Slider>
        </div>
        <div className='edContainer'>
          <div className={'ed_see_more_review_btn'}>
            <AppLink to="/profile-review-list">View testimonials</AppLink>
          </div>
        </div>
      </div>
      {/* ) : (
        <div className="loadingGridData">
          <i className="ed-loadingGrid"></i>
        </div>
      )} */}

      <div className={'ed_try_it_free'}>
        <div className={'ed_try_it_free_button'}>
          <AppLink to="/request-demo"><img src={edCalenderIcon} alt="Calender Icon" width="18" height="20" />Book a Free Demo</AppLink>
        </div>
      </div>
    </Fragment>
  )
}

export default EdneedReviewSlider