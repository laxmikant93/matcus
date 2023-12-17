import React from "react";
import ProfileReviewListHead from "./ProfileReviewListHead";
import Card from "../../Common/Card/index";
import CardBody from "../../Common/Card/CardBody";
import CardMedia from "../../Common/Card/CardMedia";
import { useEffect } from "react";
import { getAllReviews } from "../../store/actions/Testimonial";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../../Common/Rating";
import "./EdneedReview.scss";
import NoDataAvailable from "../../Common/NoDataAvailable";
import IconArrowSmall from "./icon-arrow-small.svg";
import ReactGA from "react-ga";
const ProfileReviewList = () => {
  const dispatch = useDispatch();
  // const [previewModel, setpreviewModel] = useState(false);
  // const [galleryPopup, setGalleryPopup] = useState({});
  const { allReviews, allReviewsSuccess } = useSelector((state) => {
    return {
      allReviews: state.testimonial.ReviewList.data,
      allReviewsSuccess: state.testimonial.ReviewList.success,

    };
  });

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  ReactGA.event({
    category: "TESTIMONIALS",
    action: "click",
    label: "Home_Customer",
  })

  return (
    <div className="edContainer">
      <ProfileReviewListHead />
      <div className="profileReviewListSection">
        {allReviewsSuccess ? (
          allReviews.length > 0 ? (
            allReviews.map((item, key) => {
              return (
                <Card
                  key={key}
                  className={
                    item.userType === "Teacher"
                      ? "teacher-review"
                      : item.userType === "InstituteOwner"
                        ? "institute-review"
                        : item.userType === "Student"
                          ? "student-review"
                          : "others-review"
                  }
                >
                  <CardMedia>
                    <div className="wave"></div>
                    <div className="PRL-wrapper">
                      {item.profileImage === undefined ||
                        item.profileImage === null ||
                        item.profileImage === "" ||
                        !item.profileImage ? (
                        ""
                      ) : (
                        <div className="PRL-ProfilePhoto">
                          <img
                            className="PRL-ProfilePhotoCustom"
                            src={item.profileImage}
                            alt="reviewerImage"
                          />
                        </div>
                      )}
                      <div className="PRL-ProfilePhotoDetails">
                        <p className="text-xs w-500">{item.fullName}</p>
                        <p className="text-xxs gray w-300 mt-5">
                          <span className="base text-xxs w-500">
                            {item.userType === "InstituteOwner"
                              ? "Institute Admin"
                              : item.userType}
                            {item.InsName ? "," : ""}&nbsp;&nbsp;
                          </span>
                          {item.InsName &&
                            item.InsName.includes("Institute Admin") ? item.InsName.replace("Institute Admin", "")
                            : item.InsName &&
                              item.InsName.includes("Teacher") ? item.InsName.replace("Teacher", "") : item.InsName &&
                                item.InsName.includes("Student") ? item.InsName.replace("Student", "") : item.InsName}
                        </p>
                        <div className="mt-5">
                          <Rating ratingStar={item.userRating} />
                          {/* <p>Rating *****</p> */}
                        </div>
                      </div>
                    </div>
                  </CardMedia>
                  <CardBody className="cardPadding">
                    {item.feedbackFormat === "Video" ? (
                      <div className="PRL-ReviewVideoCustom">
                        <video
                          src={item.feedbackData}
                          controls
                        // autoPlay
                        ></video>
                      </div>
                    ) : (
                      ""
                    )}
                    {item.feedbackFormat === "Text" ? (
                      <React.Fragment>
                        <p className="reviewText text-xxs w-400">
                          {item.feedbackData}
                        </p>
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                    {item.feedbackFormat === "Audio" ? (
                      <div className="PRL-ReviewAudioCustom">
                        <audio controls>
                          <source src={item.feedbackData} type="audio/mpeg" />
                        </audio>
                      </div>
                    ) : (
                      ""
                    )}

                    {!item.websiteUrl || item.websiteUrl === "" ? (
                      ""
                    ) : (
                      <a
                        href={item.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xxs base underline mt-30 readMoreLink"
                      >
                        Also read this review &nbsp;{" "}
                        <img src={IconArrowSmall} alt="Arrow" />
                      </a>
                    )}
                  </CardBody>
                </Card>
              );
            })
          ) : (
            <NoDataAvailable title="No Records Found." />
          )
        ) : (
          <div className="loadingGridData">
            <i className="ed-loadingGrid"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileReviewList;
