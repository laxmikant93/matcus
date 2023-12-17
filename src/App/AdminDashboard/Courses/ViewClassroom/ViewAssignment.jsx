/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import FormInput from "../../../../Common/Form/FormInput";
import { IconAttachment } from "../../../../Common/Icon";
import {
  getSingleAssignmentData,
  selectAssignmentToUpdate,
  patchAssigmentRemark,
  getSearchSingleAssignmentData,
  selectAssignmentToUpdateRESET,
  getSortBySingleAssignmentData,
} from "../../../../store/actions/assignment";
import { useDispatch, useSelector } from "react-redux";
import { SingleAssignmentData } from "../../../../store/actions/assignment";

import { useParams } from "react-router";
import ValidationFile from "../../../Auth/ValidationFile";
import moment from "moment";
import FormError from "../../../../Common/Form/FormError";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import { SearchIcon } from "../../../../Common/Icon";
import Storage from "../../../../Classes/Storage";
import { courseID, classroomID } from "../../../../Constant/auth";
import SingleSelectDropdown from "../../../../Common/Form/SingleSelectDropdown";
import SearchControl from "../../../../Common/SearchControl";
import NoDataAvailable from "../../../../Common/NoDataAvailable";
import * as XLSX from 'xlsx';
import FileSaver from "file-saver";
import DummyProfile from "../../../../assets/images/img/DummyProfile.png";
import "./ViewAssignment.scss";
export default function DashboardFacultyList() {
  const { assignmentId } = useParams();
  const [courseRouteID, setCourseID] = useState("");
  const [classroomRouteID, setClassroomID] = useState("");
  const dispatch = useDispatch();
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
  const closeGradeModalState = () => {
    setGradeModalState(!GrademodalState);
    setisFilled(false);
  };

  useEffect(() => {
    if (StudentGradeSuccess) {
      setGradeModalState(false);
      dispatch(selectAssignmentToUpdateRESET());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [StudentGradeSuccess]);

  useEffect(() => {
    if (Storage.alive(classroomID) && Storage.alive(courseID)) {
      setClassroomID(Storage.getJson(classroomID));
      dispatch(getSingleAssignmentData(assignmentId, users.user_institute, Storage.getJson(classroomID), Storage.getJson(courseID)));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignmentId, dispatch, users.user_institute, classroomID]);

  useEffect(() => {
    dispatch(SingleAssignmentData(assignmentId));
  }, [assignmentId, dispatch]);

  useEffect(() => {
    if (Storage.alive(courseID)) {
      setCourseID(Storage.getJson(courseID));
    }
    if (Storage.alive(classroomID)) {
      setClassroomID(Storage.getJson(classroomID));
    }
  }, []);

  const [ViewmodalState, setViewModalState] = useState(false);
  const [GrademodalState, setGradeModalState] = useState(false);
  const manageGradeModalState = () => {
    setGradeModalState(!GrademodalState);
  };

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

  if (StudentGrade.success && !isFilled) {
    setisFilled(true);
    setGrade(StudentGrade.data.submittedAssignmentData_grade);
    setDescription(StudentGrade.data.submittedAssignmentData_remarks);
  }

  const GradeSelection = (assignmentID) => {
    manageGradeModalState();
    dispatch(selectAssignmentToUpdate(assignmentID));
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
      _id: StudentGrade.data._id,
    };
  };
  const [searchTerm, setSearchTerm] = useState("");

  let typing;

  const resetSearch = () => {
    setSearchTerm("");
    dispatch(getSingleAssignmentData(assignmentId, users.user_institute));
  };
  const searchInputHandel = (evt) => {
    if (evt.target.value === "") {
      resetSearch();
    }
    clearTimeout(typing);
    typing = setTimeout(() => {
      setSearchTerm(evt.target.value);
    }, 400);

    if (!evt.target.value) {
      setSearchTerm("");
      clearTimeout(typing);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      dispatch(
        getSearchSingleAssignmentData(
          users.user_institute,
          assignmentId,
          searchTerm
        )
      );
    }
  }, [searchTerm, dispatch, users.user_institute, assignmentId]);

  const selectGroup = [
    "Status",
    "Submitted",
    "Pending",
    "Graded",
    "Yes",
    "No",
    "Submitted On",
    "Recent to Old",
    "Old to Recent",
  ];

  const filterValues = ["Status", "Graded", "Submitted On"];

  const SingleSelectHandel = (item) => {
    let message = item;
    switch (message) {
      case "All":
        dispatch(getSingleAssignmentData(assignmentId, users.user_institute));
        break;

      case "Submitted":
        dispatch(
          getSortBySingleAssignmentData(
            assignmentId,
            users.user_institute,
            "status",
            "submitted"
          )
        );
        break;

      case "Pending":
        dispatch(
          getSortBySingleAssignmentData(
            assignmentId,
            users.user_institute,
            "status",
            "pending"
          )
        );
        break;

      case "No":
        dispatch(
          getSortBySingleAssignmentData(
            assignmentId,
            users.user_institute,
            "graded",
            `["submitted","pending"]`
          )
        );
        break;

      case "Yes":
        dispatch(
          getSortBySingleAssignmentData(
            assignmentId,
            users.user_institute,
            "graded",
            "[graded]"
          )
        );
        break;

      case "Recent to Old":
        dispatch(
          getSortBySingleAssignmentData(
            assignmentId,
            users.user_institute,
            "submittedon",
            "rto"
          )
        );
        break;

      case "Old to Recent":
        dispatch(
          getSortBySingleAssignmentData(
            assignmentId,
            users.user_institute,
            "submitttedon",
            "otr"
          )
        );
        break;

      default:
        dispatch(getSingleAssignmentData(assignmentId, users.user_institute));
    }
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
        });
      });
    return { filterData: filterData, heading: heading };
  };
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
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/school-admin-course" title="Courses" />
          <BreadcrumbItem
            to={`/edit-course/${courseRouteID}`}
            title="Edit Course"
          />
          <BreadcrumbItem
            to={`/view-classroom/${classroomRouteID}`}
            title="Classrooms"
          />
          <BreadcrumbItem
            to={`/view-assignment/${assignmentId}`}
            title="View Assignment"
          />
        </Breadcrumb>
        <div className="PageTopHead PTH-TeacherAssignmentView mt-20">
          <div className="PTH-Item">
            {TeacherView && (
              <p className="text-sm w-300">{TeacherView.title}</p>
            )}
          </div>
          <div className="PTH-Item">
            <SingleSelectDropdown
              selectGroup={selectGroup}
              filterValues={filterValues}
              SingleSelectHandel={(item) => SingleSelectHandel(item)}
            />
          </div>

          <div className="PTH-Item P-Right">
            <SearchControl
              classNameWrappper="tableSearchbar"
              id="search"
              onChange={(evt) => searchInputHandel(evt)}
              name="search"
              placeholder="Student Search"
            />
          </div>
        </div>

        <div className="row mt-50">
          <div className="col-md-6 col-xs-12">
            {TeacherView && (
              <p className="sub-heading text-xxs w-500 dgray">
                {TeacherView.classroom_data_course}
              </p>
            )}
            {TeacherView && (
              <p className="sub-heading text-xxs w-500 dgray">
                {TeacherView.classroom_data_classroomname}
              </p>
            )}
          </div>
          <div className="col-md-6 col-xs-12 text-right">
            {TeacherView && (
              <p className="sub-heading text-xxs w-300 gray">
                {" "}
                Created at :{" "}
                {moment(TeacherView.createdAt).format("Do MMMM YYYY h:mm a")}
              </p>
            )}
          </div>
        </div>

        <div className="gridTable GridWithBottomBtn mt-20">
          <table>
            <thead>
              <tr>
                <th></th>
                <th width="30%">Student Details</th>
                <th width="30%">Submitted on</th>
                <th width="25%">Grade & Remarks</th>
                <th width="15%">Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {StudentAssignmentSubmittedData.length ? (
                StudentAssignmentSubmittedData.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>
                        <div className="profileImgWrap">
                          <a
                            href={`/profile/${item.userData_username}`}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <img
                              src={
                                item.userData_profile_picture === undefined ||
                                  item.userData_profile_picture === null ||
                                  item.userData_profile_picture === ""
                                  ? DummyProfile
                                  : item.userData_profile_picture
                              }
                              alt="user profile"
                            />
                          </a>
                        </div>
                      </td>
                      <td data-column="Student Details">
                        <p>{item.userData_fullname}</p> {/*Name */}
                        <p>Admission:{item.userData_admission_no}</p>{" "}
                        {/*admission number */}
                        <p>{item.userData_email}</p> {/*emaoil */}
                        <p>{item.userData_contact}</p> {/*phone */}
                      </td>
                      <td data-column="Submitted on">
                        {item.submittedAssignmentData_status === "pending" ? (
                          <p></p>
                        ) : (
                          <p className="gray">
                            {moment(
                              item.submittedAssignmentData_updatedAt
                            ).format("Do MMMM YYYY h:mm a")}
                          </p>
                        )}
                      </td>
                      <td data-column="Remarks">
                        {item.submittedAssignmentData_remarks}
                        {item.submittedAssignmentData_grade ? (
                          <p>{item.submittedAssignmentData_grade}</p>
                        ) : (
                          ""
                        )}
                      </td>
                      <td data-column="Status">
                        <p className="secondary">
                          {item.submittedAssignmentData_status}
                        </p>
                      </td>

                      <td>
                        <div className="actionBtnCustom">
                          <div className="groupBtn">
                            <button onClick={() => ViewSelection(item._id)}>
                              View
                            </button>

                            {item.submittedAssignmentData_status ===
                              "pending" ? (
                              <p></p>
                            ) : (
                              <button
                                onClick={() => GradeSelection(item._id)}
                              >
                                Grade
                              </button>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5">
                    <NoDataAvailable title="No Records Found." />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <button
          className="button btn-o-primary primary btn-sm"
          onClick={downloadXLSX}
        >
          Download Excelsheet
        </button>
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
