import React, { useEffect, useState } from "react";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  checkExamInformation,
  resetCheckStudentExam,
  resetOnlineExam,
} from "../../../store/actions/onlineexam";
import CheckQuestionList from "./CheckQuestionsList";
import moment from "moment";
import ErrorBoundary from "../../../Classes/ErrorBoundary";
import { DynamicClassroomHeader, DynamicCourseHeader } from "../../../Common/UserElement";
import { courseID } from "../../../Constant/auth";
import Storage from "../../../Classes/Storage";

const TeacherTestCheck = () => {
  const { _examId, _studentId } = useParams();
  const dispatch = useDispatch();
  const [courseRouteID, setCourseID] = useState("");
  const [classroomRouteID, setClassroomID] = useState("");
  const [ObtainedMarks, SetObtainedMarks] = useState("");
  const { user, TeacherTestData, checkExamStateDetails, questionsCheck } =
    useSelector((state) => {
      return {
        user: state.user,
        TeacherTestData: state.onlineexam.checkTest.data,
        questionsCheck: state.onlineexam.checkTest.data.questions,
        checkExamStateDetails: state.onlineexam.checkTest,
      };
    });
  useEffect(() => {
    if (Storage.alive(courseID)) {
      setCourseID(Storage.getJson(courseID));
    }
    if (Storage.alive("__wz_clsrom__")) {
      setClassroomID(Storage.getJson("__wz_clsrom__"))
    }
  }, []);
  const [attemptedQues, setAttemptedQues] = useState("");
  useEffect(() => {
    if (checkExamStateDetails.success) {
      let stuMarks = questionsCheck.map((data) => {
        return parseInt(
          data.recievedMarks !== 9999 && data.recievedMarks
            ? data.recievedMarks
            : 0
        );
      });
      let totalAmount = stuMarks.reduce((a, b) => a + b, 0);
      const validTotalAmount = totalAmount ? totalAmount : 0;
      SetObtainedMarks(validTotalAmount);
      let attemptedQuestions = 0;
      for (let index = 0; index < questionsCheck.length; index++) {
        const element = questionsCheck[index];
        let attempted =
          element.selectedOptions && element.selectedOptions.length > 0 ? 1 : 0;
        // let totalAns = + attempted
        attemptedQuestions = attemptedQuestions + attempted;
      }
      setAttemptedQues(attemptedQuestions);
    }
  }, [checkExamStateDetails.success, questionsCheck]);

  const totalStudentMarks = (data) => {
    SetObtainedMarks(data);
  };
  useEffect(() => {
    return () => {
      dispatch(resetOnlineExam());
    };
  }, [dispatch]);
  useEffect(() => {
    dispatch(checkExamInformation(_examId, _studentId));
    dispatch(resetCheckStudentExam());
  }, [dispatch, _examId, _studentId]);
  return (
    <ErrorBoundary url="/dashboard/teacher-online-test">
      <React.Fragment>
        <React.Fragment>
          {
            user.user_activeRole === process.env.REACT_APP_TEACHER ?
              <Breadcrumb>
                <BreadcrumbItem to="/" title="Dashboard" />
                <BreadcrumbItem
                  to="/dashboard/teacher-online-test"
                  title="Online Tests"
                />
                <BreadcrumbItem
                  to={{
                    pathname: `/dashboard/teacher/online-exam/submission/${TeacherTestData._id}`,
                    state: { submission: "submission" },
                  }}
                  title="Submission List"
                />
                <BreadcrumbItem
                  to="#"
                  title="Check Test"
                />
              </Breadcrumb> :
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
                  to={{
                    pathname: `/admin/submission/${TeacherTestData._id}`,
                    state: { submission: "submission" },
                  }}
                  title="Submission List"
                />
                <BreadcrumbItem
                  to="#"
                  title="Check Test"
                />
              </Breadcrumb>
          }

          <div className="teacherExamReviewWrapper">
            {checkExamStateDetails.success ? (
              <React.Fragment>
                <div className="TER-headerFirst">
                  <div className="TER-headerLeft">
                    <p className="text-sm w-500 dgray">
                      {TeacherTestData.title}
                    </p>
                    <p className="text-xxs dgray w-400">
                      {TeacherTestData.courseInfo
                        ? TeacherTestData.courseInfo.coursename
                        : ""}
                    </p>
                    <p className="text-xxs dgray w-400">
                      {TeacherTestData.classroomInfo
                        ? TeacherTestData.classroomInfo.classroomname
                        : ""}
                    </p>
                  </div>
                  <div className="TER-headerRight">
                    <p className="text-xs w-500 dgray">
                      {TeacherTestData.userInfo.fullname}
                    </p>
                    <p className="text-xxs dgray w-400">
                      {TeacherTestData.userInfo.email}
                    </p>
                  </div>
                </div>
                <div className="TER-headerSecond">
                  <div className="TER-headerLeft">
                    <div className="TER-headerLeftItem text-xxs">
                      <span className="gray w-300">Started on</span>
                      {moment(TeacherTestData.quizon).format(
                        "Do MMMM YYYY"
                      )}&nbsp;&nbsp;&nbsp;
                      {moment(TeacherTestData.quizon).format(
                        "h:mm a"
                      )}
                    </div>
                    <div className="TER-headerLeftItem text-xxs">
                      <span className="text-xxs gray w-300">Submitted on</span>
                      <span>
                        {moment(
                          TeacherTestData.submittedInfo.submittedOn
                        ).format("Do MMMM YYYY")}&nbsp;&nbsp;&nbsp;
                        {moment(
                          TeacherTestData.submittedInfo.submittedOn
                        ).format("h:mm a")}
                      </span>
                    </div>
                    <div className="TER-headerLeftItem text-xxs">
                      <span className="text-xxs gray w-300">
                        Duration in min.
                      </span>
                      {TeacherTestData.estimatedtime}
                    </div>
                  </div>

                  <div className="TER-headerRight text-right">
                    <div className="TER-headerRightItem">
                      No. of{" "}
                      {TeacherTestData.question.length > 1
                        ? "Questions"
                        : "Question"}
                      <span className="text-xxs gray w-300">
                        {TeacherTestData.question.length}
                      </span>
                    </div>
                    <div className="TER-headerRightItem">
                      <span className="text-xxs gray w-300">Total Marks</span>
                      {TeacherTestData.totalmarks}
                    </div>
                  </div>
                </div>
                <div className="TER-headerThird">
                  <div className="TER-headerleft">
                    <p className="text-xxs w-400 gray">Questions Attempted</p>
                    <p className="text-xs w-500 mgray">
                      <span className="w-500 red">{attemptedQues}</span>/
                      {TeacherTestData.question.length}
                    </p>
                  </div>
                  <div className="TER-headerleft text-right">
                    <p className="text-xxs w-400 gray">Total Marks Obtained</p>
                    <p className="text-xs w-500 mgray">
                      {/* <span className="w-500 red">{!TeacherTestData.recievedMarks ? "28" : TeacherTestData.recievedMarks}</span>/{TeacherTestData.totalmarks} */}
                      <span className="w-500 red">{ObtainedMarks}</span>/
                      {TeacherTestData.totalmarks}
                    </p>
                  </div>
                </div>
                <ErrorBoundary url="/dashboard/teacher-online-test">
                  <CheckQuestionList totalStudentMarks={totalStudentMarks} />
                </ErrorBoundary>
              </React.Fragment>
            ) : (
              <div className="loadingGridData">
                <i className="ed-loadingGrid"></i>
              </div>
            )}
          </div>
        </React.Fragment>
      </React.Fragment>
    </ErrorBoundary>
  );
};

export default TeacherTestCheck;
