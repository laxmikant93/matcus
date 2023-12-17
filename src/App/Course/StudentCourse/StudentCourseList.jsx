/* eslint-disable no-unused-vars */
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import DummyImage from "../../../Common/DummyMedia/DummyImage";
import DummyVideo from "../../../Common/DummyMedia/DummyVideo";

const StudentCourseList = () => {
  const { studentCoursesList, studentCoursesListSuccess } = useSelector(
    (state) => {
      return {
        studentCoursesList: state.studentcourse.courseList.data,
        studentCoursesListSuccess: state.studentcourse.courseList.success,
      };
    }
  );
  const history = useNavigate();
  const handleView = (_id) => {
    history(`/dashboard/course-detail-view/${_id}`);
  };
  return (
    <React.Fragment>
      <div className="courseDetailListingSection">
        {studentCoursesListSuccess ? (
          studentCoursesList.length ? (
            studentCoursesList.map((item) => {
              return (
                <div className="courseDetailListingItem">
                  <div className="courseDetailListMedia">
                    {item.courseIntroVideo && item.courseBanner ? (
                      <React.Fragment>
                        {item.defaultBanner === "image" ? (
                          <img
                            className="banner-image"
                            src={item.courseBanner}
                            alt="Course Banner"
                          />
                        ) : (
                          <video
                            className="banner-video"
                            // height="180"
                            src={item.courseIntroVideo}
                            controls
                            // className="gallery-thumnail"
                            alt=""
                          ></video>
                        )}
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {item.courseBanner ? (
                          <img
                            className="banner-image"
                            src={item.courseBanner}
                            alt="Course Banner"
                          />
                        ) : (
                          <React.Fragment>
                            {item.courseIntroVideo ? (
                              <video
                                className="banner-video"
                                // height="180"
                                src={item.courseIntroVideo}
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
                  <div
                    className="courseDetailListContent"
                    onClick={() => handleView(item._id)}
                  >
                    {item.courseLevel === "institute" ? "Institute Level" : ""}
                    <p className="text-sm w-700">{item.courseTitle}</p>
                    <p className="text-xxs w-500">{item.shortIntro}</p>
                    <ul className="detailAttr">
                      <li>
                        <p className="text-2xs w-600 purple">Starts From</p>
                        <p className="text-xxs w-700">
                          {item.startFrom ? (
                            <React.Fragment>
                              {moment(item.startFrom).format("Do MMMM YYYY")}
                            </React.Fragment>
                          ) : (
                            "-"
                          )}
                        </p>
                      </li>
                      <li>
                        <p className="text-2xs w-600 purple">Duration</p>
                        <p className="text-xxs w-700">
                          {`${item.durationYear ? item.durationYear : "-"
                            } Year`}{" "}
                          |{" "}
                          {`${item.durationMonth ? item.durationMonth : "-"
                            } Months`}
                        </p>
                      </li>
                      <li>
                        <p className="text-2xs w-600 purple">Conducted By</p>
                        <p className="text-xxs w-700">{item.createdBy}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="loadingGridData">No Materials Found.</div>
          )
        ) : (
          <div className="loadingGridData">
            <i className="ed-loadingGrid"></i>
          </div>
        )}

        {/* <div className="courseDetailListingItem" onClick={() => handleView("7")}>
          <div className="courseDetailListMedia">
            <DummyVideo Caption="No Video Available" />
          </div>
          <div className="courseDetailListContent">
            <p className="text-sm w-700">
              Class 8-B, for the academic year 2021 - 2022
            </p>
            <p className="text-xxs w-500">
              Viva Physics ICSE edition is a set of three books for the
              students of classes 6-8. It teaches concepts in a clear, crisp
              and... interesting manner to satisfy the needs of the young
              minds.
            </p>
            <ul className="detailAttr">
              <li>
                <p className="text-2xs w-600 purple">Starts From</p>
                <p className="text-xxs w-700">20 Aug. 2021</p>
              </li>
              <li>
                <p className="text-2xs w-600 purple">Starts From</p>
                <p className="text-xxs w-700">20 Aug. 2021</p>
              </li>
              <li>
                <p className="text-2xs w-600 purple">Starts From</p>
                <p className="text-xxs w-700">20 Aug. 2021</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="courseDetailListingItem" onClick={() => handleView("9")}>
          <div className="courseDetailListMedia">
            <DummyVideo Caption="No Video Available" />
          </div>
          <div className="courseDetailListContent">
            <p className="text-sm w-700">
              Class 8-B, for the academic year 2021 - 2022
            </p>
            <p className="text-xxs w-500">
              Viva Physics ICSE edition is a set of three books for the
              students of classes 6-8. It teaches concepts in a clear, crisp
              and... interesting manner to satisfy the needs of the young
              minds.
            </p>
            <ul className="detailAttr">
              <li>
                <p className="text-2xs w-600 purple">Starts From</p>
                <p className="text-xxs w-700">20 Aug. 2021</p>
              </li>
              <li>
                <p className="text-2xs w-600 purple">Starts From</p>
                <p className="text-xxs w-700">20 Aug. 2021</p>
              </li>
              <li>
                <p className="text-2xs w-600 purple">Starts From</p>
                <p className="text-xxs w-700">20 Aug. 2021</p>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </React.Fragment>
  );
};
export default StudentCourseList;
