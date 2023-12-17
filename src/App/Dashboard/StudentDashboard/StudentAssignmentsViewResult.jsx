import React, { useEffect } from "react";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import { useSelector, useDispatch } from "react-redux";
import { getSingleAssignmentInfoData } from "../../../store/actions/studentAssignment";
import { useParams } from "react-router";
import moment from "moment";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";

export default function StudentAssignmentsViewResult() {
  const { _assignmentId, _classroomId, _subjectId } = useParams();
  const dispatch = useDispatch();
  const { users, assignmentInfoData } = useSelector((state) => {
    return {
      users: state.user,
      assignmentInfoData: state.studentassigment.singleassignmentread,
      studenInfoData: state.studentassigment.studentinfo.data,
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

  const postId = useParams();

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
                  to={`/dashboard/student-assignment-view-result-classroom/${postId._assignmentId}/${_classroomId}/${_subjectId}`}
                  title="View Result"
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
                  to={`/dashboard/student-assignment-view-result/${postId._assignmentId}`}
                  title="View Result"
                />
              </React.Fragment>
          }


        </Breadcrumb>
        <div className="PageTopHead V-Align-Top PTH-StudentAssignViewResult mt-20">
          <div className="PTH-Item">
            <p className="text-sm base w-300">
              {assignmentInfoData.data.assignmentData_title}
            </p>
            <p className="text-xxs mgray w-300">
              {assignmentInfoData.data.courseData_coursename}
            </p>
            <p className="text-xxs mgray w-300">
              {assignmentInfoData.data.classroomData_classroomname}
            </p>
            <div className="assignment-detail mt-8">
              <p className="text-xxs">
                <span className="lgray">Due Date:&nbsp;&nbsp;</span>
                {moment(
                  assignmentInfoData.data.assignment_data_duedate
                ).format("Do MMMM YYYY h:mm a")}
              </p>
              <p className="text-xxs">
                <span className="lgray">Submitted on:&nbsp;&nbsp;</span>
                {moment(
                  assignmentInfoData.data.assignmentData_updatedAt
                ).format("Do MMMM YYYY h:mm a")}
              </p>
            </div>
          </div>
          <div className="PTH-Item P-Right">
            <p className="lgray text-xxs">Your Grade</p>
            <p className="text-sm secondary w-600 text-center">
              {" "}
              {assignmentInfoData.data.submittedAssignmentData_grade}
            </p>
            {/* <h2 className="heading text-xxs w-300 gray">Due Date</h2>
              <p className="sub-heading text-xxs w-300 base">
                On or before{" "}
                {moment(assignmentInfoData.data.assignmentData_duedate).format(
                  "Do MMMM YYYY h:mm a"
                )}
              </p> */}
          </div>
        </div>
        <div className="assignment-answer mt-30">
          <p className="text-xxs w-300 lgray">Your answer</p>
          <p className="text-xxs w-300 base">
            {assignmentInfoData.data.submittedAssignmentData_description}
          </p>
        </div>
        <div className="attached-assignment mt-30">
          <p className="text-xxs w-300 lgray">Your attached file</p>
          <div className="attachment">
            {assignmentInfoData.data.submittedAssignmentData_attachment ===
              "" ? (
              <></>
            ) : (
              <a
                className="button btn-xs btn-o-primary primary mt-10"
                href={
                  assignmentInfoData.data.submittedAssignmentData_attachment
                }
                target="_blank"
                rel="noreferrer"
              >
                View Attachment
              </a>
            )}
          </div>
        </div>
        <div className="student-assignment-remarks mt-30">
          <p className="text-xxs w-300 lgray">Remarks</p>
          <p className="text-xxs w-300 base">
            {assignmentInfoData.data.submittedAssignmentData_remarks}
          </p>
        </div>
      </React.Fragment>
    </>
  );
}
