/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";

import FormInput from "../../../Common/Form/FormInput";

import { IconAttachment } from "../../../Common/Icon";
import {
  getSingleAssignmentData,
  selectAssignmentToUpdate,
  patchAssigmentRemark,
  selectAssignmentToUpdateRESET,
  sortByRecentToOldViewAssignment,
  sortByOldToRecentViewAssignment,
  sortBySubmittedAssignment,
  sortByPendingAssignment,
  sortByAssignmentGradedYes,
  sortByAssignmentGradedNo,
} from "../../../store/actions/assignment";
import { useDispatch, useSelector } from "react-redux";
import { getSingleAssignmentDataTeacherView } from "../../../store/actions/assignment";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router";
import ValidationFile from "../../Auth/ValidationFile";
import moment from "moment";
import FormError from "../../../Common/Form/FormError";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import { SearchIcon } from "../../../Common/Icon";
import "./TeacherDashboard.scss";
import SingleSelectDropdown from "../../../Common/Form/SingleSelectDropdown";
import SearchControl from "../../../Common/SearchControl";
import NoDataAvailable from "../../../Common/NoDataAvailable";
import DummyProfile from "./DummyProfile.png";
import * as XLSX from 'xlsx';
import FileSaver from "file-saver";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../Common/UserElement";

export default function DashboardFacultyList({ props }) {
  const { _assignmentId } = useParams();

  const dispatch = useDispatch();
  const location = useLocation();

  let switchChangeBreadCrumb =
    location.state && location.state.ClassroomView
      ? location.state.ClassroomView
      : "";
  let courseRouteID =
    location.state && location.state.courseRouteID
      ? location.state.courseRouteID
      : "";
  let classroomRouteID =
    location.state && location.state.classroomRouteID
      ? location.state.classroomRouteID
      : "";

  const {
    users,
    StudentAssignmentSubmittedData,
    StudentGrade,
    TeacherView,
    StudentGradeSuccess,
    StudentGradeLoading,
  } = useSelector((state) => {
    return {
      users: state.user,
      StudentAssignmentSubmittedData: state.assignment.singleassignment.data,
      StudentGrade: state.assignment.updateSelection,
      StudentGradeLoading: state.assignment.update.loading,
      StudentGradeSuccess: state.assignment.update.success,
      TeacherView: state.assignment.teacherassignmentview.data,
    };
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const closeGradeModalState = () => {
    dispatch(selectAssignmentToUpdateRESET());
    setGradeModalState(false);
    setisFilled(false);
  };

  useEffect(() => {
    if (StudentGradeSuccess) {
      closeGradeModalState();
      dispatch(selectAssignmentToUpdateRESET());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [StudentGradeSuccess]);

  useEffect(() => {
    if (courseRouteID && classroomRouteID) {
      dispatch(
        getSingleAssignmentData(
          _assignmentId,
          users.user_institute,
          classroomRouteID,
          courseRouteID
        )
      );
    } else {
      dispatch(getSingleAssignmentData(_assignmentId, users.user_institute));
    }

    dispatch(
      getSingleAssignmentDataTeacherView(
        users.user_institute,
        users._id,
        _assignmentId
      )
    );
  }, [_assignmentId, classroomRouteID, courseRouteID, dispatch, users]);

  const [GrademodalState, setGradeModalState] = useState(false);
  const manageGradeModalState = () => {
    setGradeModalState(!GrademodalState);
  };

  const [ViewmodalState, setViewModalState] = useState(false);
  const manageViewModalState = () => {
    setViewModalState(!ViewmodalState);
  };

  const closeViewModalState = () => {
    setViewModalState(false);
  };

  const [Grade, setGrade] = useState("");
  const [Description, setDescription] = useState("");
  const [isFilled, setisFilled] = useState(false);
  const [submitError, setsubmitError] = useState(false);

  // if (userRole && !isFilledRole) {
  //     setisFilledRole(true);

  //     if (userRole.length === 1) {
  //         dispatch(getSingleAssignmentDataTeacherView(userRole[0]._id, _assignmentId));
  //     } else {
  //         let userId = userRole.find((item) => item.user !== users._id)
  //         setUserRoleId(userId._id)
  //         dispatch(getSingleAssignmentDataTeacherView(userId._id, _assignmentId));
  //     }
  // }

  if (StudentGrade.success && !isFilled) {
    setisFilled(true);
    setGrade(StudentGrade.data.submittedAssignmentData_grade);
    setDescription(StudentGrade.data.submittedAssignmentData_remarks);
  }

  const GradeSelection = (assignmentID) => {
    dispatch(selectAssignmentToUpdate(assignmentID));
    manageGradeModalState();
  };

  const ViewSelection = (assignmentID) => {
    dispatch(selectAssignmentToUpdate(assignmentID));
    manageViewModalState();
  };

  const RemarkHandelInput = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    switch (inputName) {
      case "Grade":
        setGrade(inputValue);

        break;
      case "description":
        setDescription(inputValue);

        break;
      default:
        break;
    }
    setsubmitError(false);
  };

  const HandelSubmitRemark = () => {
    if (ValidationFile.validEmpty(Grade)) {
      dispatch(
        patchAssigmentRemark(StudentGrade.data._id, RemarkData(), alldata())
      );
    } else {
      setsubmitError(true);
    }
  };

  const RemarkData = () => {
    return {
      grade: Grade,
      remarks: Description,
    };
  };

  const alldata = () => {
    return {
      submittedAssignmentData_status: "graded",
      submittedAssignmentData_grade: Grade,
      submittedAssignmentData_remarks: Description,
      assignmentData: StudentGrade.data.assignmentData,
      assignmentData_course: StudentGrade.data.assignmentData_course,
      assignmentData_classroom: StudentGrade.data.assignmentData_classroom,
      assignmentData_title: StudentGrade.data.assignmentData_title,
      assignmentData_duedate: StudentGrade.data.assignmentData_duedate,
      assignmentData_fileupload: StudentGrade.data.assignmentData_fileupload,
      assignmentData_institute: StudentGrade.data.assignmentData_institute,
      assignmentData_description: StudentGrade.data.assignmentData_description,
      assignmentData_updatedAt: StudentGrade.data.assignmentData_updatedAt,
      classroomData_classroomname:
        StudentGrade.data.classroomData_classroomname,
      classroomData: StudentGrade.data.classroomData,
      // classroomData_classroomname:
      //   StudentGrade.data.classroomData_classroomname,
      // classroomData_classroomname:
      //   StudentGrade.data.classroomData_classroomname,
      _id: StudentGrade.data._id,
    };
  };
  // const [modalState, setModalState] = useState(false);
  // const manageModalState = (mode) => {
  //   setModalState(!modalState);
  // };

  // const closeModalState = () => {
  //   setModalState(false);
  // };

  // props that is being pass into the SingleDropdown
  const selectGroup = [
    "Status",
    "Submitted",
    "Pending",
    "Graded",
    "Yes",
    "No",
    "Submited On",
    "Recent to Old",
    "Old to Recent",
  ];

  const filterValues = ["Status", "Graded", "Submited On"];

  const SingleSelectHandel = (value) => {
    const selectedValue = value;

    switch (selectedValue) {
      case "ALL": {
        dispatch(getSingleAssignmentData(_assignmentId, users.user_institute));
        break;
      }
      case "Recent to Old": {
        dispatch(
          sortByRecentToOldViewAssignment(_assignmentId, users.user_institute)
        );
        break;
      }
      case "Old to Recent": {
        dispatch(
          sortByOldToRecentViewAssignment(_assignmentId, users.user_institute)
        );
        break;
      }
      case "Submitted": {
        dispatch(
          sortBySubmittedAssignment(_assignmentId, users.user_institute)
        );
        break;
      }
      case "Pending": {
        dispatch(sortByPendingAssignment(_assignmentId, users.user_institute));
        break;
      }
      case "Yes": {
        dispatch(
          sortByAssignmentGradedYes(_assignmentId, users.user_institute)
        );
        break;
      }
      case "No": {
        dispatch(sortByAssignmentGradedNo(_assignmentId, users.user_institute));
        break;
      }
      default:
        dispatch(getSingleAssignmentData(_assignmentId, users.user_institute));
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };
  const formatDataForViewAssignment = () => {
    const rawData = StudentAssignmentSubmittedData;
    const filterData = [];
    const heading = [];
    rawData.filter((item) => {
      StudentAssignmentSubmittedData &&
        heading.push({
          Assignment_title: item.assignmentData_title,
          classroom: item.classroomData_classroomname,
          Due_date_time: item.assignmentData_duedate,
        });
    });
    StudentAssignmentSubmittedData &&
      rawData.map((item) => {
        filterData.push({
          Student_Name: item.userData_fullname,
          Student_Admission_number: item.userData_admission_no,
          Student_Email: item.userData_email,
          Student_phone_no: item.userData_contact,
          Submitted_on:
            item.submittedAssignmentData_status === "pending"
              ? ""
              : moment(item.submittedAssignmentData_updatedAt).format(
                "Do MMMM YYYY h:mm a"
              ),
          Grades: "",
          Remarks: item.submittedAssignmentData_remarks,
          Graded_on: item.submittedAssignmentData_grade
            ? item.submittedAssignmentData_grade
            : "",
          // Assignment_title: item.assignmentData_title,
          // classroom: item.classroomData_classroomname,
          // Due_date_time: item.assignmentData_duedate,
        });
      });
    return { filterData: filterData, heading: heading };
  };

  // convert JSON Data into Excel
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileName = `Assignment_View_details`;
  const fileExtension = ".xlsx";

  const downloadXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      formatDataForViewAssignment().heading
    );
    XLSX.utils.sheet_add_json(
      worksheet,
      formatDataForViewAssignment().filterData
    );
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
      <React.Fragment>
        <Breadcrumb>
          {switchChangeBreadCrumb ? (
            <React.Fragment>
              <BreadcrumbItem to="/" title="Dashboard" />
              <BreadcrumbItem
                to="/dashboard/teacher-classrooms-list"
                title={DynamicCourseHeader()}
              />
              <BreadcrumbItem
                to={`/dashboard/teacher/subject-list/${courseRouteID}`}
                title={DynamicClassroomHeader()}
              />
              <BreadcrumbItem
                to={`/dashboard/teacher/${courseRouteID}/view-classroom/${classroomRouteID}`}
                title={`View ` + DynamicClassroomHeader()}
              />
              {/* <BreadcrumbItem to={`/dashboard/teacher-assignment-view/${_assignmentId}`} title={`View Assignment`} /> */}
              <BreadcrumbItem
                to={`/dashboard/teacher-assignment-view/${_assignmentId}`}
                state={{
                  switchChangeBreadCrumb: switchChangeBreadCrumb,
                  courseRouteID: courseRouteID,
                  classroomRouteID: classroomRouteID,
                }}
                title={`View Assignment`}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <BreadcrumbItem to="/" title="Dashboard" />
              <BreadcrumbItem
                to="/dashboard/teacher-assignments"
                title="Assignment "
              />
              <BreadcrumbItem
                to={`/dashboard/teacher-assignment-view/${_assignmentId}`}
                title="Assignment View"
              />
            </React.Fragment>
          )}
        </Breadcrumb>
        <div className="PageTopHead PTH-TeacherClassroomAssignmentView mt-20">
          {TeacherView ? (
            <div className="PTH-Item">
              <p className="text-sm w-300">{TeacherView.title}</p>
            </div>
          ) : (
            <div className="PTH-Item">
              <p className="text-sm w-300"></p>
            </div>
          )}

          <div className="PTH-Item">
            <SingleSelectDropdown
              SingleSelectHandel={SingleSelectHandel}
              selectGroup={selectGroup}
              filterValues={filterValues}
            />
          </div>

          <div className="PTH-Item P-Right">
            <SearchControl
              classNameWrappper="tableSearchbar"
              id="search"
              name="search"
              onChange={handleChange}
              placeholder="Student Search"
            />
          </div>
          <div className="PTH-Item">
            <p className="sub-heading text-xxs w-500 dgray">
              {TeacherView && TeacherView.classroom_data_course}
            </p>
            <p className="sub-heading text-xxs w-500 dgray">
              {TeacherView && TeacherView.classroom_data_classroomname}
            </p>
          </div>
          <div className="PTH-Item P-Right">
            <p className="sub-heading text-xxs w-300 gray">
              Created at :&nbsp;
              {moment(TeacherView && TeacherView.createdAt).format(
                "Do MMMM YYYY  h:mm a"
              )}
            </p>
          </div>
        </div>
        <div className="gridListTable">
          <ul className="gridHeader">
            <li className="col col-4">Student Details</li>
            <li className="col col-2">Submitted on</li>
            <li className="col col-2">Grade & Remarks</li>
            <li className="col col-2">Status</li>
            <li className="col col-2">&nbsp;</li>
          </ul>
          <div className="gridBody">
            {StudentAssignmentSubmittedData.length ? (
              // eslint-disable-next-line array-callback-return
              StudentAssignmentSubmittedData.filter((item) => {
                if (searchTerm === "") {
                  return item;
                } else if (
                  item.userData_fullname
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return item;
                }
              }).map((item) => {
                return (
                  <div className="gridRow" key={item._id}>
                    <ul className="topInfo">
                      <li className="col col-4">
                        <div className="userDetails">
                          <div className="profileCircle">
                            <a
                              href={`/profile/${item.userData_username}`}
                              rel="noreferrer"
                              target="_blank"
                            >
                              <img
                                src={
                                  item.userData_profile_picture ===
                                    undefined ||
                                    item.userData_profile_picture === null ||
                                    item.userData_profile_picture === ""
                                    ? DummyProfile
                                    : item.userData_profile_picture
                                }
                                alt="user profile"
                              />
                            </a>
                          </div>
                          <div className="profileDetails">
                            <div className="profile-name">
                              <a
                                className="secondary"
                                href={`/profile/${item.userData_username}`}
                                rel="noreferrer"
                                target="_blank"
                              >
                                {item.userData_fullname}
                              </a>
                            </div>
                            <div className="profile-email">
                              {item.userData_email}
                            </div>
                            <div className="profile-contact">
                              {item.userData_contact}
                            </div>
                            <div className="admission-no">
                              <span>
                                ADM No. {item.userData_admission_no}
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="col col-2" data-head="Submitted on">
                        {item.submittedAssignmentData_status === "pending" ? (
                          ""
                        ) : (
                          <div className="gray">
                            {moment(
                              item.submittedAssignmentData_updatedAt
                            ).format("Do MMMM YYYY h:mm a")}
                          </div>
                        )}
                      </li>
                      <li className="col col-2" data-head="Grade & Remarks">
                        {item.submittedAssignmentData_grade ? (
                          <div className="">
                            {item.submittedAssignmentData_grade}
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="mt-3">
                          {item.submittedAssignmentData_remarks}
                        </div>
                      </li>
                      <li className="col col-2" data-head="Status">
                        <div className="secondary">
                          {item.submittedAssignmentData_status}
                        </div>
                      </li>
                      <li className="col col-2 actionCols">
                        {item.submittedAssignmentData_status === "pending" ? (
                          ""
                        ) : (
                          <div className="actionBtn">
                            <button
                              className="btn-square"
                              title="View"
                              onClick={() => ViewSelection(item._id)}
                            >
                              <span className="cssIcon">
                                <i className="ed-eye"></i>
                              </span>
                            </button>

                            <button
                              className="btn-square"
                              title="Grade"
                              onClick={() => GradeSelection(item._id)}
                            >
                              <span className="cssIcon">
                                <i className="ed-grade"></i>
                              </span>
                            </button>
                          </div>
                        )}
                      </li>
                    </ul>
                  </div>
                );
              })
            ) : (
              <NoDataAvailable title="No Records Found." />
            )}
          </div>
        </div>

        <button
          className="button btn-o-secondary secondary btn-sm mt-20"
          onClick={downloadXLSX}
        >
          Download Excelsheet
        </button>
        {/* <div className={`modal modalShowing-${modalState}`}>
            <div className="modalwrapper">
              <span
                className="closeModal text-xxs gray"
                onClick={() => closeModalState()}
              >
                Close
              </span>
              <div className="modalHead">
                <div className="pageFullCenter">
                  <div className="row">
                    <div className="col-xs-12 col-md-12">
                      <h3 className="text-sm w-300">cfdfd</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modalbody">
                <div className="pageFullCenter"></div>
              </div>
              <div className="modalFooter">
                <div className="pageFullCenter"></div>
              </div>
            </div>
          </div> */}
        <div className={`modal modalShowing-${GrademodalState}`}>
          <div className="modalwrapper">
            <span
              className="closeModal text-xxs gray"
              onClick={() => closeGradeModalState()}
            >
              Close
            </span>
            <div className="modalHead">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="text-sm w-300">Remarks</h3>
                  <p className="dgray text-xs w-400">
                    {StudentGrade.data.user_data_fullname}
                  </p>
                </div>
              </div>
            </div>
            <div className="modalbody">
              <div className="row mt-20">
                <div className="col-md-12">
                  <FormInput
                    className=""
                    name="Grade"
                    type="text"
                    label="Grade"
                    placeholder="Grade"
                    onChange={RemarkHandelInput}
                    onKeyUp={RemarkHandelInput}
                    defaultValue={Grade}
                  />
                  <FormError show={submitError} error="Grade is required." />
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      name="description"
                      id="exampleFormControlTextarea1"
                      rows="4"
                      placeholder="Description"
                      defaultValue={Description}
                      onChange={RemarkHandelInput}
                      onKeyUp={RemarkHandelInput}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="modalFooter">
              <div className="row">
                <div className="col-md-12">
                  {StudentGradeLoading ? (
                    <button className="button btn-md button-theme">
                      Updating...
                    </button>
                  ) : (
                    <button
                      className="button btn-md button-theme"
                      onClick={HandelSubmitRemark}
                    >
                      Update Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`modal modalShowing-${ViewmodalState}`}>
          <div className="modalwrapper">
            <span
              className="closeModal text-xxs gray"
              onClick={() => closeViewModalState()}
            >
              Close
            </span>
            <div className="modalHead">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="text-sm w-300">Assignment View</h3>
                  <p className="dgray text-xs w-400">
                    {StudentGrade.data.userData_fullname}
                  </p>
                </div>
              </div>
            </div>

            <div className="modalbody">
              <div className="row mt-40">
                <div className="col-md-12">
                  {StudentGrade.data.submittedAssignmentData_attachment ? (
                    <div className="attachment">
                      <span>
                        <i className="ed-icon icon-attachment gray i-xs"></i>
                        <a
                          href={
                            StudentGrade.data
                              .submittedAssignmentData_attachment
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          View Attachment
                        </a>
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  <p className="text-xs w-400 mt-50">
                    {StudentGrade.data.submittedAssignmentData_description}
                  </p>
                </div>
              </div>
            </div>
            <div className="modalFooter">
              <div className="row mt-20"></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </>
  );
}
