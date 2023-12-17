import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import "./DonutChart.scss";
import { DynamicClassroomHeader, DynamicCourseHeader } from "../../../Common/UserElement";
import { courseID } from "../../../Constant/auth"
import Card from "../../../Common/Card";
import CardHeader from "../../../Common/Card/CardHeader";
import CardBody from "../../../Common/Card/CardBody";
import FormInput from "../../../Common/Form/FormInput";

const OnlineExamHeader = (props) => {
  const { _examId } = useParams();
  const { _studentId } = useParams();
  // const { student, adminresult, teacherresult, submission } =
  //   props.props &&
  //   props.props.history.location &&
  //   props.props.history.location.state;

  const { users, Result, viewResult } = useSelector((state) => {
    if (window.location.pathname.includes('student')) {
      return {
        users: state.user,
        Result: state.onlineexamstudent.examresult,
        viewResult: state.onlineexamstudent.examresult.data,
      };
    }
    // else if (adminresult || teacherresult) {
    //   return {
    //     users: state.user,
    //     Result: state.onlineexam.examresult,
    //     viewResult: state.onlineexam.examresult.data,
    //   };
    // }
  });

  function calculatePercentage() {
    let percentage = 0;
    if (viewResult.submittedInfo.marksObtained && viewResult.totalmarks) {
      percentage =
        (viewResult.submittedInfo.marksObtained / viewResult.totalmarks) * 100;
      percentage = percentage.toFixed(2);
    }
    return percentage;
  }
  const { ClassroomDetail } = useSelector((state) => {
    return {
      ClassroomDetail: state.classroomDetail.classrooomData.data,
    };
  });

  return (
    <React.Fragment>
      {/* {"adminresult" ? (
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem
            to="/school-admin-course"
            title={DynamicCourseHeader()}
          />
          <BreadcrumbItem
            to={`/edit-course/${courseID}`}
            title={"Edit " + DynamicCourseHeader()}
          />
          <BreadcrumbItem
            to={`/view-classroom/${ClassroomDetail.data_classroomInfo}`}
            title={DynamicClassroomHeader()}
          />
        </Breadcrumb>
      ) : "teacherresult" ? (
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem
            to="/dashboard/teacher-online-test"
            title="Online Test"
          />
          <BreadcrumbItem
            to={{
              pathname: `/dashboard/teacher/online-exam/submission/${_examId}`,
              state: { submission: "submission" },
            }}
            title="Submission List"
          />
        </Breadcrumb>
      ) : ( */}
      {/* window.location.pathname.includes('student') && ( */}
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem
          to="/dashboard/student/online-test"
          title="Online Tests"
        />
      </Breadcrumb>
      {/* ) */}
      {/* )} */}
      <div className="StudentExamResultWrapper">

        {Result.successResultLoaded ? (
          <React.Fragment>
            <div className="SER-headerFirst">
              <div className="SER-headerLeft">
                <p className="text-sm w-500 dgray">{viewResult.title}</p>
                <p className="text-xxs dgray w-400">
                  {viewResult.courseInfo
                    ? viewResult.courseInfo.coursename
                    : ""}
                </p>
                <p className="text-xxs dgray w-400">
                  {viewResult.classroomInfo
                    ? viewResult.classroomInfo.classroomname
                    : ""}
                </p>
              </div>
              <div className="SER-headerRight">
                <p className="text-xs w-500 dgray">
                  {viewResult.userInfo ? viewResult.userInfo.fullname : ""}
                </p>
                <p className="text-xxs dgray w-400">
                  {viewResult.userInfo ? viewResult.userInfo.email : ""}
                </p>
              </div>
            </div>
            <div className="SER-headerSecond">
              <div className="SER-headerLeft">
                <div className="SER-headerLeftItem text-xxs">
                  <span className="gray w-300">Started on</span>
                  {moment(viewResult.quizon).format("Do MMMM YYYY h:mm a")}
                </div>
                <div className="SER-headerLeftItem text-xxs">
                  <span className="text-xxs gray w-300">Submitted on</span>
                  <span>
                    {moment(viewResult.submittedInfo.submittedOn).format(
                      "Do MMMM YYYY h:mm a"
                    )}
                  </span>
                </div>
                <div className="SER-headerLeftItem text-xxs">
                  <span className="text-xxs gray w-300">Duration in min.</span>
                  {viewResult.estimatedtime}
                </div>
              </div>

              <div className="SER-headerRight text-right">
                <div className="SER-headerRightItem">
                  <span className="text-xxs gray w-300">
                    No. of{" "}
                    {viewResult.question.length > 1 ? "Questions" : "Question"}
                  </span>
                  {viewResult.questions.length}
                </div>
                <div className="SER-headerRightItem">
                  <span className="text-xxs gray w-300">Total Marks</span>
                  {viewResult.totalmarks}
                </div>
              </div>
            </div>
            <div className="SER-headerThird mt-20">
              <div
                className="donut-chart"
                style={{ "--value": `${calculatePercentage()}%` }}
              ></div>
              <div className="chartCalculatedMarks">
                <div className="obtainedMarks">
                  <p className="text-xxs w-400 gray">Total Marks Obtained</p>
                  <p className="text-xs w-500 mgray">
                    <span className="w-500 purple">
                      {" "}
                      {viewResult.submittedInfo.marksObtained}
                    </span>
                    /{viewResult.totalmarks}
                  </p>
                </div>
                <div className="obtainedPercentile mt-10">
                  <p className="text-xxs w-400 gray">Percentage</p>
                  <p className="text-xs w-500 mgray">
                    <span className="w-500 purple">
                      {" "}
                      {calculatePercentage()}%
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div className="loadingGridData">
            <i className="ed-loadingGrid"></i>
          </div>
        )}
      </div>

    </React.Fragment>
  );
};

export default OnlineExamHeader;
