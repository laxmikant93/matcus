import React, { useEffect } from "react";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import TeacherSubmissionListItem from "./TeacherSubmissionListItem";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import { useParams } from "react-router-dom";
import refresh from "../TeacherSubmissionList/icon-refresh.svg";
import { useDispatch, useSelector } from "react-redux";
import "./TeacherSubmissionList.scss";

import {
  getSingleExamDetails,
  getStudentListSubmittedExam,
  resetOnlineExam,
  sortAndSearchSubmissionList,
} from "../../../store/actions/onlineexam";
import SingleSelectDropdown from "../../../Common/Form/SingleSelectDropdown";
import FileSaver from "file-saver";
import * as XLSX from 'xlsx';
import { useState } from "react";
import moment from "moment";
import ErrorBoundary from "../../../Classes/ErrorBoundary";
import CommonError from "../../../Common/CommonError";
import TeacherAttendeesList from "./TeacherAttendeesList";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../Common/UserElement";
import { courseID } from "../../../Constant/auth";
import SearchControl from "../../../Common/SearchControl";
import Storage from "../../../Classes/Storage";

const TeacherSubmissionList = (props) => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const [courseRouteID, setCourseID] = useState("");
  const [classroomRouteID, setClassroomID] = useState("");
  // New Changes
  // const { admin, attendees, submission } = props.history.location.state;

  const { ClassroomDetail } = useSelector((state) => {
    return {
      ClassroomDetail: state.classroomDetail.classrooomData.data,
    };
  });
  useEffect(() => {
    if (Storage.alive(courseID)) {

      setCourseID(Storage.getJson(courseID));
    }
    if (Storage.alive('__wz_clsrom__')) {

      setClassroomID(Storage.getJson("__wz_clsrom__"))
    }
  }, []);
  const [toggle, setToggle] = useState("SubmissionList")
  // New Changes

  const [searchTerm, setSearchTerm] = useState("");
  const {
    studentList,
    users,
    studentListSuccess,
    singleExamDetails,
    singleExamSuccess,
  } = useSelector((state) => {
    return {
      users: state.user,
      studentList: state.onlineexam.studentList.data,
      studentListSuccess: state.onlineexam.studentList.success,
      singleExamDetails: state.onlineexam.getSingleExam.data,
      singleExamSuccess: state.onlineexam.getSingleExam.success,
    };
  });

  // sort By
  const [selectGroup, setSelectGroup] = useState([])
  // const selectGroup = [
  //   "Checked",
  //   "Not Checked",
  //   "View Request",
  //   "Submitted On",
  //   "Recent to Old",
  //   "Old to Recent",
  //   "Status",
  //   "Participated",
  //   "Participating",
  //   "Not Participated",
  //   "Marks",
  //   "High to Low",
  //   "Low to High",
  // ];
  useEffect(() => {
    if (toggle === "SubmissionList") {
      const selectGroup = [
        "Graded",
        "Checked",
        "Not Checked",
        "Marks",
        "High to Low",
        "Low to High",
        "Submitted On",
        "Recent to Old",
        "Old to Recent",
      ];
      setSelectGroup(selectGroup)
    } else {
      const selectGroup = [
        "View Request",
        "Status",
        "Participated",
        "Participating",
        "Not Participated",
      ];
      setSelectGroup(selectGroup)
    }
  }, [toggle])

  const filterValues = ["Graded", "Submitted On", "Status", "Marks"];
  const SingleSelectHandel = (value) => {
    const selectedValue = value;
    switch (selectedValue) {
      case "ALL":
        if (toggle === "SubmissionList") {
          dispatch(getStudentListSubmittedExam(_id, users.user_institute, "submission"));
        } else {
          dispatch(getStudentListSubmittedExam(_id, users.user_institute));
        }
        break;
      case "Checked":
        dispatch(sortAndSearchSubmissionList(_id, "isTestChecked", "yes"));
        break;
      case "Not Checked":
        dispatch(sortAndSearchSubmissionList(_id, "isTestChecked", "no"));
        break;
      case "View Request":
        dispatch(sortAndSearchSubmissionList(_id, "viewRequest", "true"));
        break;
      case "Recent to Old":
        dispatch(sortAndSearchSubmissionList(_id, "submittedOn", "rto"));
        break;
      case "Old to Recent":
        dispatch(sortAndSearchSubmissionList(_id, "submittedOn", "otr"));
        break;
      case "Participated":
        dispatch(sortAndSearchSubmissionList(_id, "status", "Participated"));
        break;
      case "Participating":
        dispatch(sortAndSearchSubmissionList(_id, "status", "Participating"));
        break;
      case "Not Participated":
        dispatch(sortAndSearchSubmissionList(_id, "status", "NotParticipated"));
        break;
      case "Low to High":
        dispatch(sortAndSearchSubmissionList(_id, "marksObtained", "lth"));
        break;
      case "High to Low":
        dispatch(sortAndSearchSubmissionList(_id, "marksObtained", "htl"));
        break;
      default:
        if (toggle === "SubmissionList") {
          dispatch(getStudentListSubmittedExam(_id, users.user_institute, "submission"));
        } else {
          dispatch(getStudentListSubmittedExam(_id, users.user_institute));
        }
    }
  };
  useEffect(() => {
    return () => {
      dispatch(resetOnlineExam());
    };
  }, [dispatch]);

  // search Item
  let typing;
  const handleChange = (event) => {
    event.preventDefault();
    clearTimeout(typing);
    typing = setTimeout(() => {
      setSearchTerm(event.target.value);
    }, 400);

    if (!event.target.value) {
      clearTimeout(typing);
      setSearchTerm("");
    }
  };

  function calculatePercentage(item) {
    let percentage = 0;
    if (
      item.submittedInfo &&
      item.submittedInfo.marksObtained > 0 &&
      item.totalmarks > 0
    ) {
      percentage =
        (item.submittedInfo &&
          item.submittedInfo.marksObtained / item.totalmarks) * 100;
      percentage = percentage.toFixed(2);
    }
    return percentage;
  }

  // excel sheet download
  // convert JSON Data into Excel
  const formatDataForSubmissionList = () => {
    const rawData = studentList;
    const filterData = [];
    studentList &&
      rawData.forEach((item) => {
        filterData.push({
          // Sno: item,
          "Student Name": item.userInfo && item.userInfo.fullname,
          "Student Admission number":
            item.userRole && item.userRole.admission_no,
          "Student Email": item.userInfo && item.userInfo.email,
          "Student phone no.": item.userInfo.contact,
          "Marks Obtained":
            !item.submittedInfo ||
              item.submittedInfo === null ||
              !item.submittedInfo.marksObtained ||
              item.submittedInfo.marksObtained > 7000
              ? ""
              : item.submittedInfo.marksObtained + "/" + item.totalmarks,
          "Percentage Obtained":
            !item.submittedInfo || item.submittedInfo === null
              ? ""
              : !item.submittedInfo || item.submittedInfo === null
                ? ""
                : item.submittedInfo &&
                  item.submittedInfo.status === "Participating"
                  ? ""
                  : item.submittedInfo && item.submittedInfo.isTestChecked
                    ? `${calculatePercentage(item)}%`
                    : "Not checked",
          "Exam checked on":
            item.submittedInfo && item.submittedInfo.isTestChecked
              ? moment(item.submittedInfo.updatedAt).format(
                "Do MMMM YYYY h:mm a"
              )
              : "",
        });
      });
    return filterData;
  };

  // excel sheet download
  // convert JSON Data into Excel
  const formatDataForSubmissionList2 = () => {
    const rawData = studentList;
    const filterData = [];
    studentList &&
      rawData.forEach((item) => {
        filterData.push({
          StudentName: item.userInfo.fullname,
          Status:
            !item.submittedInfo || item.submittedInfo === null
              ? "Not Participated"
              : item.submittedInfo.status,
          WindowSwtich:
            !item.submittedInfo || item.submittedInfo === null
              ? ""
              : item.submittedInfo.WindowSwtich,
          AttendLeaveTime: "",
          GraceTimeRequested:
            !item.submittedInfo || item.submittedInfo === null
              ? ""
              : item.submittedInfo.viewRequest === true
                ? "Yes"
                : "No",
          GraceTimeRequestDetails:
            !item.submittedInfo || item.submittedInfo === null
              ? ""
              : item.submittedInfo.graceDiscription,
          GraceTimeApprovalStatus:
            !item.submittedInfo || item.submittedInfo === null
              ? ""
              : item.submittedInfo.isRequestAccepted === true
                ? "Accepted"
                : item.submittedInfo.isRequestRejected === true
                  ? "Rejected"
                  : "",
        });
      });
    return filterData;
  };
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileName = `Online exam download sheet`;
  const fileExtension = ".xlsx";

  const fileType2 =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileName2 = `Online exam download sheet`;
  const fileExtension2 = ".xlsx";

  const downloadXLSX2 = () => {
    const worksheet = XLSX.utils.json_to_sheet(formatDataForSubmissionList2());
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: fileType2 });
    FileSaver.saveAs(data, fileName2 + fileExtension2);
  };

  // Attendies
  const downloadXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(formatDataForSubmissionList());
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  // Refresh
  const handleReload = () => {
    if (toggle === "SubmissionList") {
      dispatch(getStudentListSubmittedExam(_id, users.user_institute, "submission"));
    } else {
      dispatch(getStudentListSubmittedExam(_id, users.user_institute));
    }
  };


  // const [toggle, setToggle] = useState(
  //   props.history.location.state &&
  //     (props.history.location.state.adminView ||
  //       props.history.location.state.teacherView)
  //     ? "AttendeesList"
  //     : "SubmissionList"
  // );

  useEffect(() => {
    if (searchTerm) {
      dispatch(sortAndSearchSubmissionList(_id, "search", searchTerm));
    } else {
      if (toggle === "SubmissionList") {
        dispatch(getStudentListSubmittedExam(_id, users.user_institute, "submission"));
      } else {
        dispatch(getStudentListSubmittedExam(_id, users.user_institute));
      }
    }
  }, [dispatch, _id, users, searchTerm, toggle]);

  useEffect(() => {
    dispatch(getSingleExamDetails(_id));
  }, [dispatch, _id, users]);
  useEffect(() => {
    if (toggle === "SubmissionList") {
      dispatch(getStudentListSubmittedExam(_id, users.user_institute, "submission"));
    } else {
      dispatch(getStudentListSubmittedExam(_id, users.user_institute));
    }
  }, [_id, dispatch, toggle, users.user_institute])

  return (
    <ErrorBoundary url="/dashboard/teacher-online-test">
      <React.Fragment>
        <CommonError graceReject={true} />
        {window.location.pathname.includes("admin") ? (
          <Breadcrumb>
            <BreadcrumbItem to="/" title="Dashboard" />
            <BreadcrumbItem
              to="/school-admin-course"
              title={DynamicCourseHeader()}
            />
            <BreadcrumbItem
              to={`/edit-course/${courseRouteID}`}
              title={`Edit ${DynamicCourseHeader()}`}
            />
            <BreadcrumbItem
              to={`/view-classroom/${classroomRouteID}`}
              title={DynamicClassroomHeader()}
            />
            <BreadcrumbItem
              to="#"
              title={toggle}
            />
          </Breadcrumb>
        ) : (
          <Breadcrumb>
            <BreadcrumbItem to="/" title="Dashboard" />
            <BreadcrumbItem
              to="/dashboard/teacher-online-test"
              title="Online Test"
            />
            <BreadcrumbItem
              to="/dashboard/teacher-online-test"
              title="Online Test"
            />
            <BreadcrumbItem
              to="#"
              title={toggle}
            />
          </Breadcrumb>
        )}
        {singleExamSuccess ? (
          <React.Fragment>
            <p className="text-sm w-300 mt-20">{singleExamDetails.title}</p>
            <div className="DetailonlinetextWrapper mt-10">
              <div className="PTH-Item">
                <p className="sub-heading dgray text-xs w-300 coursname">
                  {singleExamDetails.course.coursename}
                </p>
                <p className="sub-heading dgray text-xs w-300">
                  {singleExamDetails.classroom.classroomname}
                </p>
              </div>
              {/* Add Time Secontion  */}
              <div className="PTH-Item text-center">
                <p className="sub-heading dgray text-xs w-300 coursname">
                  {moment(singleExamDetails.quizon).format("Do MMM YYYY")}
                </p>
                <p className="sub-heading dgray text-xs w-300">
                  {`${moment(singleExamDetails.quizon).format(
                    "h:mm a"
                  )} - ${moment(singleExamDetails.quizon)
                    .add(singleExamDetails.estimatedtime, "m")
                    .format("h:mm a")} `}
                </p>
              </div>

              <div className="PTH-Item text-right">
                <p className="sub-heading dgray text-xxs w-300">
                  No. of Questions:{" "}
                  <span className="base  w-600">
                    {singleExamDetails.question.length}
                  </span>
                </p>
                <p className="sub-heading dgray text-xxs w-300">
                  Total Marks:{" "}
                  <span className="base w-600">
                    {singleExamDetails.totalmarks}
                  </span>
                </p>
                <p className="sub-heading dgray text-xxs w-300">
                  No. of Students:{" "}
                  <span className="base w-600">
                    {singleExamDetails.noOfStudent}
                  </span>
                </p>
              </div>
            </div>
            <div className="ViewClassroomTabBar">
              <div className=" scroll-nav-tab-wrapper">
                <ul className=" scroll-nav-tab">
                  <ul className="ViewClassroomTabListNew scroll-nav-tab">
                    <li
                      className={`button  btn-sm  ${toggle === "SubmissionList"
                        ? "button-secondary secondary"
                        : "btn-o-secondary secondary"
                        }`}
                      onClick={() =>
                        setToggle(
                          toggle === "SubmissionList"
                            ? "SubmissionList"
                            : "SubmissionList"
                        )
                      }
                    >
                      Submission List
                    </li>
                    <li
                      className={`button  btn-sm ${toggle === "AttendeesList"
                        ? "button-secondary secondary"
                        : "btn-o-secondary secondary"
                        }`}
                      onClick={() =>
                        setToggle(
                          toggle === "AttendeesList"
                            ? "AttendeesList"
                            : "AttendeesList"
                        )
                      }
                    >
                      Attendees List
                    </li>
                  </ul>
                  {/* )} */}
                </ul>
              </div>
            </div>
            <div className="PageTopHead PTH-TeacherOnlineExamList-2 PTH-CustomeResponsive mt-10">
              <div className="PTH-Item">
                {
                  toggle === "SubmissionList" ?
                    <SingleSelectDropdown
                      SingleSelectHandel={SingleSelectHandel}
                      selectGroup={selectGroup}
                      filterValues={filterValues}
                    /> : <SingleSelectDropdown
                      SingleSelectHandel={SingleSelectHandel}
                      selectGroup={selectGroup}
                      filterValues={filterValues}
                    />
                }

              </div>
              <div className="PTH-Item">
                <button onClick={handleReload} className="refreshBtn" title="Refresh">
                  <img src={refresh} alt="" width="18px" />
                </button>
              </div>
              <div className="PTH-Item">
                <SearchControl
                  classNameWrappper="tableSearchbar"
                  id="search"
                  name="search"
                  onChange={handleChange}
                  onKeyUp={handleChange}
                  placeholder="Attendees Search"
                />
              </div>
            </div>
            <div className="ProfileTabListContent">
              {toggle === "AttendeesList" ? (
                <div>
                  <div className="gridListTable  ">
                    <ul className="gridHeader">
                      <li className="col col-1">&nbsp;</li>
                      <li className="col col-2">Student</li>
                      <li className="col col-2">Status</li>
                      <li className="col col-3">Attend/Leave/Resume Time</li>
                      <li className="col col-2">Window Switch</li>
                      <li className="col col-2">Grace Request</li>
                    </ul>
                    <div className="gridBody">
                      <ErrorBoundary url="/dashboard/teacher-online-test">
                        {studentListSuccess ? (
                          studentList.length > 0 ? (
                            studentList.map((item, key) => {
                              return (
                                <React.Fragment>
                                  <div className="gridRow" key={key}>
                                    <TeacherAttendeesList
                                      props={props}
                                      examID={item._id}
                                      studentID={item.userInfo._id}
                                      studentName={item.userInfo.fullname}
                                      studentProfile={item.userInfo.username}
                                      studentImage={
                                        item.userInfo.profile_picture
                                      }
                                      studentEmail={item.userInfo.email}
                                      studentAdmission={
                                        item.userRole &&
                                        item.userRole.admission_no
                                      }
                                      submitId={
                                        item.submittedInfo &&
                                        item.submittedInfo._id
                                      }
                                      status={
                                        item.submittedInfo
                                          ? item.submittedInfo.status
                                          : ""
                                      }
                                      startExam={
                                        item.submittedInfo &&
                                        item.submittedInfo.startExam
                                      }
                                      submittedOn={
                                        item.submittedInfo &&
                                        item.submittedInfo.submittedOn
                                      }
                                      viewRequest={
                                        item.submittedInfo &&
                                        item.submittedInfo.viewRequest
                                      }
                                      Autosubmit={
                                        item.submittedInfo &&
                                        item.submittedInfo.isSubmitted
                                      }
                                      Rejected={
                                        item.submittedInfo &&
                                        item.submittedInfo.isRequestRejected
                                      }
                                      Accepted={
                                        item.submittedInfo &&
                                        item.submittedInfo.isRequestAccepted
                                      }
                                      RequestAccepted={
                                        item.submittedInfo
                                          ? item.submittedInfo
                                            .isRequestAccepted ||
                                          item.submittedInfo
                                            .isRequestRejected ||
                                          item.submittedInfo.isSubmitted
                                          : false
                                      }
                                      windowSwtich={
                                        item.submittedInfo &&
                                        item.submittedInfo.windowSwitch
                                      }
                                      resumeTime={
                                        item.submittedInfo &&
                                        item.submittedInfo.resumeTime
                                      }
                                      contact={
                                        item.userInfo && item.userInfo.contact
                                      }
                                      quizon={item.quizon && item.quizon}
                                      checked={
                                        item.submittedInfo &&
                                        item.submittedInfo.isTestChecked
                                      }
                                      finalCheck={
                                        item.submittedInfo &&
                                        item.submittedInfo.isFinalCheck
                                      }
                                      isQuestionSubjective={
                                        item.isQuestionSubjective &&
                                        item.isQuestionSubjective
                                      }
                                      Terminated={
                                        item.submittedInfo &&
                                        item.submittedInfo.isTerminated
                                      }
                                      endExam={
                                        item.submittedInfo &&
                                        item.submittedInfo.endExam
                                      }
                                    />
                                  </div>
                                </React.Fragment>
                              );
                            })
                          ) : (
                            <p className="loadingGridData">
                              No records found.
                            </p>
                          )
                        ) : (
                          <p className="loadingGridData">Loading...</p>
                        )}
                      </ErrorBoundary>
                    </div>
                  </div>
                  <div className="TableBottomBtn justify-start mt-20">
                    <button
                      className="button btn-o-secondary secondary btn-sm"
                      onClick={downloadXLSX2}
                    >
                      Download Sheet
                    </button>
                  </div>
                </div>
              ) : (
                toggle === "SubmissionList" && (
                  <div className="gridListTable">
                    <ul className="gridHeader">
                      <li className="col col-2">&nbsp;</li>
                      <li className="col col-2">Student</li>
                      <li className="col col-2">Obtained Marks</li>
                      <li className="col col-2">Percentile</li>
                      <li className="col col-2">Checked On</li>
                      <li className="col col-2">Submitted On</li>
                      <li className="col col-2">&nbsp;</li>
                    </ul>
                    <div className="gridBody">
                      <ErrorBoundary url="/dashboard/teacher-online-test">
                        {studentListSuccess ? (
                          studentList.length > 0 ? (
                            studentList.map((item, key) => {
                              return (
                                <React.Fragment>
                                  <div className="gridRow" key={key}>
                                    <TeacherSubmissionListItem
                                      props={props}
                                      examID={item._id}
                                      totalMarks={item.totalmarks}
                                      updatedAt={item && item.updatedAt}
                                      studentID={item.userInfo._id}
                                      studentName={item.userInfo.fullname}
                                      studentImage={
                                        item.userInfo.profile_picture
                                      }
                                      studentProfile={item.userInfo.username}
                                      studentEmail={item.userInfo.email}
                                      studentAdmission={
                                        item.userRole &&
                                        item.userRole.admission_no
                                      }
                                      submitId={
                                        item.submittedInfo &&
                                        item.submittedInfo._id
                                      }
                                      mark={
                                        item.submittedInfo &&
                                        item.submittedInfo.marksObtained
                                      }
                                      status={
                                        item.submittedInfo
                                          ? item.submittedInfo.status
                                          : ""
                                      }
                                      checked={
                                        item.submittedInfo &&
                                        item.submittedInfo.isTestChecked
                                      }
                                      finalCheck={
                                        item.submittedInfo &&
                                        item.submittedInfo.isFinalCheck
                                      }
                                      submittedTime={
                                        item.submittedInfo &&
                                        item.submittedInfo.submittedOn
                                      }
                                      updatedOn={
                                        item.submittedInfo &&
                                        item.submittedInfo.updatedAt
                                      }
                                      isQuestionSubjective={
                                        item.isQuestionSubjective &&
                                        item.isQuestionSubjective
                                      }
                                      contact={
                                        item.userInfo && item.userInfo.contact
                                      }
                                    />
                                  </div>
                                </React.Fragment>
                              );
                            })
                          ) : (
                            <tr>
                              <td>
                                <p className="loadingGridData">
                                  No records found.
                                </p>
                              </td>
                            </tr>
                          )
                        ) : (
                          <tr>
                            <td>
                              <p className="loadingGridData">Loading...</p>
                            </td>
                          </tr>
                        )}
                      </ErrorBoundary>
                    </div>

                    <div className="TableBottomBtn justify-start text-right mt-20">
                      <button
                        className="button button-secondary secondary btn-sm"
                        onClick={downloadXLSX}
                      >
                        Download Sheet
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </React.Fragment>
        ) : (
          <div className="loadingGridData">
            <i className="ed-loadingGrid"></i>
          </div>
        )}
      </React.Fragment>
    </ErrorBoundary>
  );
};

export default TeacherSubmissionList;
