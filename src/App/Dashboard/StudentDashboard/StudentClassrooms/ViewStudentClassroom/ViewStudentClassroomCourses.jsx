/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import DummyImage from "../../../../../Common/DummyMedia/DummyImage";
// import DummyVideo from '../../../../../Common/DummyMedia/DummyVideo';
import SingleSelectDropdown from "../../../../../Common/Form/SingleSelectDropdown";
import MultipleSelectDropDownCommon from "../../../../../Common/Form/MultiSelectDropDownCommon";
import {
  filterCreatedBySubjectCoursesList,
  getSubjectCoursesList,
  searchSortBySubjectCoursesList,
} from "../../../../../store/actions/viewStudentClassroom";
import "../../../../Course/StudentCourse/StudentCourse.scss";
import { getAssignmentTeacherClassroom } from "../../../../../store/actions/classroomdetail";
import SearchControl from "../../../../../Common/SearchControl";
const ViewStudentClassroomCourses = () => {
  const dispatch = useDispatch();
  const { _classroomId, _subjectId } = useParams();
  const {
    user,
    coursesList,
    coursesListSuccess,
    TeacherListData,
    TeacherListDataSuccess,
  } = useSelector((state) => {
    return {
      user: state.user,
      coursesList: state.viewStudentClassroom.subjectCoursesList.data,
      coursesListSuccess: state.viewStudentClassroom.subjectCoursesList.success,
      TeacherListData: state.classroomDetail.TeacherDataList.data,
      TeacherListDataSuccess: state.classroomDetail.TeacherDataList.success,
    };
  });

  const selectGroup = [
    "Status",
    "Upcoming",
    "Ongoing",
    "Completed",
    "Not Defined",

    "Added Time",
    "Recently",
    "Oldest",

    "Duration",
    "Longest",
    "Shortest",
  ];

  const filterValues = ["Status", "Added Time", "Duration"];

  const SingleSelectHandel = (value) => {
    const selectedValue = value;
    switch (selectedValue) {
      case "ALL": {
        dispatch(
          getSubjectCoursesList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId
          )
        );
        break;
      }
      case "Upcoming": {
        dispatch(
          searchSortBySubjectCoursesList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "status",
            "upcomming"
          )
        );
        break;
      }
      case "Ongoing": {
        dispatch(
          searchSortBySubjectCoursesList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "status",
            "ongoing"
          )
        );
        break;
      }
      case "Completed": {
        dispatch(
          searchSortBySubjectCoursesList(
            user.user_institute,
            user._id,
            "status",
            "completed"
          )
        );
        break;
      }
      case "Not Defined": {
        dispatch(
          searchSortBySubjectCoursesList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "status",
            "notdefined"
          )
        );
        break;
      }
      case "Recently": {
        dispatch(
          searchSortBySubjectCoursesList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "date",
            "recent"
          )
        );
        break;
      }
      case "Oldest": {
        dispatch(
          searchSortBySubjectCoursesList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "date",
            "old"
          )
        );
        break;
      }
      case "Longest": {
        dispatch(
          searchSortBySubjectCoursesList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "duration",
            "longest"
          )
        );
        break;
      }
      case "Shortest": {
        dispatch(
          searchSortBySubjectCoursesList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId,
            "duration",
            "shortest"
          )
        );
        break;
      }

      default:
        dispatch(
          getSubjectCoursesList(
            user.user_institute,
            user._id,
            _classroomId,
            _subjectId
          )
        );
    }
  };
  const history = useNavigate();
  const handleView = (_id) => {
    history(
      `/dashboard/course-detail-classroom-view/${_id}/${_classroomId}/${_subjectId}`
    );
  };
  const OnSelectedValueCreatedBy = (val) => {
    dispatch(
      filterCreatedBySubjectCoursesList(
        user.user_institute,
        user._id,
        _classroomId,
        _subjectId,
        val
      )
    );
  };
  useEffect(() => {
    dispatch(
      getSubjectCoursesList(
        user.user_institute,
        user._id,
        _classroomId,
        _subjectId
      )
    );
    dispatch(getAssignmentTeacherClassroom(user.user_institute, _subjectId));
  }, [_classroomId, _subjectId, dispatch, user._id, user.user_institute]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    if (searchTerm) {
      dispatch(
        searchSortBySubjectCoursesList(
          user.user_institute,
          user._id,
          _classroomId,
          _subjectId,
          "search",
          searchTerm
        )
      );
    } else {
      dispatch(
        getSubjectCoursesList(
          user.user_institute,
          user._id,
          _classroomId,
          _subjectId
        )
      );
    }
  }, [dispatch, user, searchTerm, _classroomId, _subjectId]);

  const [multipleDropDownUserData, setMultipleDropDownUserData] = useState([]);
  useEffect(() => {
    if (TeacherListData && TeacherListData.length) {
      TeacherListData.map((item) => item.user && multipleDropDownUserData.push(item.user));
    }
  }, [TeacherListData, user._id])
  return (
    <React.Fragment>
      <div className="PageTopHead PTH-StudentViewClassroomCourse mt-20">
        <div className="PTH-Item">
          <SingleSelectDropdown
            SingleSelectHandel={SingleSelectHandel}
            selectGroup={selectGroup}
            filterValues={filterValues}
          />
        </div>
        <div className="PTH-Item">
          <MultipleSelectDropDownCommon
            selectGroup={
              TeacherListDataSuccess && TeacherListData ? multipleDropDownUserData : []
            }
            OnSelectedValue={OnSelectedValueCreatedBy}
            name={"Created By"}
            SwitchSelectData={false}
          />
        </div>
        <div className="PTH-Item P-Right">
          <SearchControl
            classNameWrappper="tableSearchbar"
            id="search"
            name="search"
            onChange={handleSearch}
            placeholder="Search Study Material."
          />
        </div>
      </div>
      <div className="courseDetailListingSection">
        {coursesListSuccess ? (
          coursesList.length ? (
            coursesList.map((item) => {
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
                          {" "}
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
export default ViewStudentClassroomCourses;
