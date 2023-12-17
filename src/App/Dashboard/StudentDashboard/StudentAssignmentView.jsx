/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import { IconAttachment } from "../../../Common/Icon";
import FormTextArea from "../../../Common/Form/FormTextArea";
import UploadFile from "../../../Common/Upload";
import {
  getSingleAssignmentInfoData,
  postAssignmentData,
} from "../../../store/actions/studentAssignment";
import { useNavigate, useParams } from "react-router";
import moment from "moment";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import "./StudentDashboard.scss";
export default function StudentAssignmentView() {
  const { _assignmentId, _classroomId, _subjectId } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const {
    users,
    assignmentInfoData,
    studentAssignmentSubmit,
    studentAssignmentLoading,
  } = useSelector((state) => {
    return {
      users: state.user,
      assignmentInfoData: state.studentassigment.singleassignmentread,
      studenInfoData: state.studentassigment.studentinfo.data,
      studentAssignmentSubmit: state.studentassigment.create.success,
      studentAssignmentLoading: state.studentassigment.create.loading,
    };
  });

  useEffect(() => {
    dispatch(
      getSingleAssignmentInfoData(
        users._id,
        users.user_institute,
        _assignmentId
      )
    );
  }, [_assignmentId, dispatch, users]);

  const [StudentAnswer, setStudentAnswer] = useState("");
  const [imgLink1, setImgLink1] = useState("");
  const [isFilled, setisFilled] = useState(false);
  const [imglink, setImglink] = useState("");

  if (assignmentInfoData.success && !isFilled) {
    setisFilled(true);
    setStudentAnswer(
      assignmentInfoData.data.submittedAssignmentData_description
    );
    setImgLink1(assignmentInfoData.data.submittedAssignmentData_attachment);
  }

  const handelInput = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    switch (inputName) {
      case "StudentAnswer":
        setStudentAnswer(inputValue);
        break;
      default:
        break;
    }
  };

  const uploadImage1 = (data) => {
    let imgData = data.location;
    setImglink(imgData);
  };
  const removeUploadImage1 = () => {
    setImgLink1("");
  };
  const removeImgLink = () => {
    setImglink("");
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handelSubmit = (e) => {
    e.preventDefault();
    if (imglink || StudentAnswer) {
      dispatch(postAssignmentData(AssignmentSubmitData()));
      setIsSubmitted(true);
      ResetForm();
      // history("/dashboard/student-assignments")
    } else {
      history("/dashboard/student-assignments");
    }
  };

  if (isSubmitted && studentAssignmentSubmit) {
    setIsSubmitted(false);
    if (_classroomId && _subjectId) {
      history(`/dashboard/student/${_classroomId}/view-classroom/${_subjectId}`, { state: "Assignment" });
    } else {
      history("/dashboard/student-assignments");
    }
  }

  const AssignmentSubmitData = () => {
    return {
      attachment: imglink,
      student: users._id,
      assignment: _assignmentId,
      description: StudentAnswer,
    };
  };

  const ResetForm = () => {
    setStudentAnswer("");
    setImgLink1("");
  };

  const postId = useParams();
  let date = new Date().toISOString();

  useEffect(() => {
    if (date >= assignmentInfoData.data.assignmentData_duedate) {
      if (_classroomId && _subjectId) {

        history(`/dashboard/student/${_classroomId}/view-classroom/${_subjectId}`);
      } else {
        history("/dashboard/student-assignments");
      }
    }
  }, [assignmentInfoData.data.assignmentData_duedate])
  return (
    <>
      <React.Fragment>
        <Breadcrumb>
          {
            _classroomId && _subjectId ?
              <React.Fragment>
                <BreadcrumbItem to="/" title="Dashboard" />
                <BreadcrumbItem
                  to="/dashboard/student-classroom-list"
                  title="Classroom"
                />
                <BreadcrumbItem
                  to={`/dashboard/student-subjects-list/${_classroomId}`}
                  title="Subjects"
                />
                <BreadcrumbItem
                  to={`/dashboard/student/${_classroomId}/view-classroom/${_subjectId}`}
                  title="View Subject"
                />
                <BreadcrumbItem
                  to={`/dashboard/student-assignment-view-classroom/${postId._assignmentId}/${_classroomId}/${_subjectId}`}
                  title="View Assignment"
                />
              </React.Fragment>
              :
              <React.Fragment>
                <BreadcrumbItem to="/" title="Dashboard" />
                <BreadcrumbItem
                  to="/dashboard/student-assignments"
                  title="Assignment "
                />
                <BreadcrumbItem
                  to={`/dashboard/student-assignment-view/${postId._assignmentId}`}
                  title="View Assignment"
                />
              </React.Fragment>
          }

        </Breadcrumb>
        <div className="pageHeaderTop studentRole">
          <div className="row mt-20">
            <div className="col-xs-12 col-md-6 mt-20">
              <h2 className="heading text-sm dgray w-300">
                {assignmentInfoData.data.assignmentData_title}
              </h2>
              <p className="sub-heading text-xxs base ">
                {assignmentInfoData.data.courseData_coursename}
              </p>
              <p className="sub-heading text-xxs base ">
                {assignmentInfoData.data.classroomData_classroomname}
              </p>
            </div>
            <div className="col-xs-12 col-md-6 mt-20 text-right">
              <h2 className="heading text-xxs w-300 gray">Due Date</h2>
              <p className="sub-heading text-xxs">
                On or before{" "}
                {moment(
                  assignmentInfoData.data.assignmentData_duedate
                ).format("Do MMMM YYYY h:mm a")}
              </p>
            </div>
          </div>
        </div>
        <div className="row mt-30">
          <div className="col-md-12 col-xs-12">
            <div className="assignment-description">
              <h3 className="text-xs">Assignment Description</h3>
              <p className="text-xxs mt-8">
                {assignmentInfoData.data.assignmentData_description}
              </p>
            </div>
          </div>
        </div>
        <div className="row mt-30">
          <div className="col-xs-12">
            <div className="attached-assignment">
              <h3 className="text-xs">Attachment</h3>
              <div className="attachment mt-8">
                {assignmentInfoData.data.assignmentData_fileupload === "" ? (
                  <React.Fragment></React.Fragment>
                ) : (
                  <a
                    className="w-500 text-xxs"
                    href={assignmentInfoData.data.assignmentData_fileupload}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download Attachment
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-10">
          <div className="col-xs-12">
            <hr />
            <h3 className="mt-50">Attachment Assignment Below</h3>
          </div>
          <div className="col-xs-12">
            <form onSubmit={handelSubmit}>
              <div className="assignment-answer mt-10">
                <div className="formFieldwrap">
                  <FormTextArea
                    label="Write your answer"
                    name="StudentAnswer"
                    rows="4"
                    placeholder="Put your thinking cap on and dive into this assignment."
                    defaultValue={StudentAnswer}
                    onChange={handelInput}
                    onKeyUp={handelInput}
                  />
                </div>
              </div>
              <div className="upload-student-assignment">
                <div className="file-upload-input">
                  <div className="labelcst-wrapper">
                    <h3 className="labelcst text-xs capitalize mb-3">
                      Upload file
                    </h3>
                    <p className="text-xxs mt-3 mt-8">
                      Accept only .JPG or .PNG, .xlsx, .PDF and Word file.
                      Maximum file size 5 MB.
                    </p>
                  </div>

                  <div className="attached-assignment">
                    <div className="attachment mt-8">
                      <div className="formFieldwrap">
                        <UploadFile
                          label="Upload file"
                          size={5}
                          onUploaded={uploadImage1}
                          isFileImage={true}
                          hidenFileName={true}
                          invalidError={() => removeUploadImage1()}
                          IconFileUploadClass="icon-file-upload base i-xs"
                        />
                      </div>
                    </div>
                    <span className="w-600 text-xxs">
                      {imglink ? (
                        <>
                          <i className="ed-icon icon-attachment gray i-xs"></i>
                          <a href={imglink} target="_blank" rel="noreferrer">
                            View Attachment
                          </a>
                        </>
                      ) : (
                        ""
                      )}
                    </span>
                    {imglink && (
                      <button
                        type="button"
                        className="button btn-xs btn-o-red red"
                        onClick={removeImgLink}
                      >
                        {" "}
                        Remove
                      </button>
                    )}
                    <span className="w-600 text-xxs">
                      {imgLink1 ? (
                        <div>
                          <i className="ed-icon icon-attachment gray i-xs"></i>
                          <a href={imgLink1} target="_blank" rel="noreferrer">
                            View Attachment
                          </a>
                        </div>
                      ) : (
                        ""
                      )}
                    </span>
                    {imgLink1 && (
                      <button
                        type="button"
                        className="button btn-sm btn-o-red red mt-8"
                        onClick={removeUploadImage1}
                      >
                        {" "}
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-20">
                {studentAssignmentLoading ? (
                  <button className="button btn-md button-theme" type="button">
                    Submiting Assignment...
                  </button>
                ) : (
                  <button className="button btn-md button-theme" type="submit">
                    Submit Assignment
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    </>
  );
}
