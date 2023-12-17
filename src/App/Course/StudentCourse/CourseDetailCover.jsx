import moment from "moment";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import DummyImage from "../../../Common/DummyMedia/DummyImage";
// import DummyVideo from "../../../Common/DummyMedia/DummyVideo";
import UseOutsideClick from "../../../Common/UseOutsideClick";
const CourseDetailCover = () => {
  const { courseDetailCoverData } = useSelector((state) => {
    return {
      courseDetailCoverData: state.studentcourse.courseDetail.data,
    };
  });
  const RemovePopToggleRef = useRef();
  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(!modal);
  };
  UseOutsideClick(RemovePopToggleRef, () => {
    if (modal) setModal(false);
  });
  return (
    <React.Fragment>
      <div className="CourseDetailViewCover">
        <p className="coverTitle text-xs w-300 white">
          {courseDetailCoverData.shortIntro}
        </p>
        <div className="CourseDetailViewAttr">
          <div className="CourseDetailViewAttrItem">
            <p className="uppercase text-2xs lgray">Starts From</p>
            <p className="text-xs white">
              {courseDetailCoverData.startFrom ? (
                <React.Fragment>
                  {moment(courseDetailCoverData.startFrom).format(
                    "Do MMMM YYYY"
                  )}
                </React.Fragment>
              ) : (
                "-"
              )}
            </p>
          </div>
          <div className="CourseDetailViewAttrItem">
            <p className="uppercase text-2xs lgray">Duration</p>
            <p className="text-xs white">
              {`${courseDetailCoverData.durationYear
                ? courseDetailCoverData.durationYear
                : "-"
                } Year`}{" "}
              |{" "}
              {`${courseDetailCoverData.durationMonth
                ? courseDetailCoverData.durationMonth
                : "-"
                } Months`}
            </p>
          </div>
          <div className="CourseDetailViewAttrItem">
            <p className="uppercase text-2xs lgray">Teacher</p>
            <div className="teacherCourseList">
              <p className="text-xs white">
                {courseDetailCoverData.assignTo &&
                  courseDetailCoverData.assignTo.length
                  ? courseDetailCoverData.assignTo[0].fullname
                  : "Not Assigned"}
              </p>
              <button
                type="button"
                className="btnText"
                onClick={() => openModal(courseDetailCoverData._id)}
              >
                {courseDetailCoverData.assignTo &&
                  courseDetailCoverData.assignTo.length > 0
                  ? courseDetailCoverData.assignTo.length
                  : ""}
              </button>
              {modal && courseDetailCoverData.assignTo.length && (
                <div className="teacherCourseListCustom">
                  <div className="teacherCourseListItem">
                    {courseDetailCoverData.assignTo.map((item) => {
                      return (
                        <p
                          className="text-2xs mb-3 w-600"
                          ref={RemovePopToggleRef}
                        >
                          {item.fullname}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="CourseDetailViewAttrItem">
            <p className="uppercase text-2xs lgray">Created By</p>
            <p className="text-xs white">
              {courseDetailCoverData.createdBy
                ? courseDetailCoverData.createdBy
                : "-"}
            </p>
          </div>
          <div className="CourseDetailViewAttrItem">
            <p className="uppercase text-2xs lgray">Last Updated</p>
            <p className="text-xs white">
              {" "}
              {courseDetailCoverData.updatedAt ? (
                <React.Fragment>
                  {moment(courseDetailCoverData.updatedAt).format(
                    "Do MMMM YYYY"
                  )}
                </React.Fragment>
              ) : (
                moment(courseDetailCoverData.updatedAt).format("Do MMMM YYYY")
              )}
            </p>
          </div>
        </div>

        <div className="CourseDetailViewMedia">
          {courseDetailCoverData.courseIntroVideo &&
            courseDetailCoverData.courseBanner ? (
            <React.Fragment>
              {courseDetailCoverData.defaultBanner === "image" ? (
                <img
                  className="banner-image"
                  src={courseDetailCoverData.courseBanner}
                  alt="Course Banner"
                />
              ) : (
                <video
                  className="banner-video"
                  // height="180"
                  src={courseDetailCoverData.courseIntroVideo}
                  controls
                  // className="gallery-thumnail"
                  alt=""
                ></video>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {courseDetailCoverData.courseBanner ? (
                <img
                  className="banner-image"
                  src={courseDetailCoverData.courseBanner}
                  alt="Course Banner"
                />
              ) : (
                <React.Fragment>
                  {courseDetailCoverData.courseIntroVideo ? (
                    <video
                      className="banner-video"
                      // height="180"
                      src={courseDetailCoverData.courseIntroVideo}
                      controls
                      // className="gallery-thumnail"
                      alt=""
                    ></video>
                  ) : (
                    <DummyImage Caption="No Image Available" />
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
export default CourseDetailCover;
