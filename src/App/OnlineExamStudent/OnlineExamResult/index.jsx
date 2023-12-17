import React, { useEffect } from "react";
import OnlineExamHeader from "../OnlineExamResult/OnlineExamHeader";
import OnlineExamQuesList from "../OnlineExamResult/OnlineExamQuesList";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import { examResult, resetOESResult } from "../../../store/actions/onlineexamstudent";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ErrorBoundary from "../../../Classes/ErrorBoundary";
import { examResultShow } from "../../../store/actions/onlineexam";
import "../OnlineExamStudent.scss";


const OnlineExamResult = (props) => {

  const { _examId } = useParams();
  const { _studentId } = useParams();

  const dispatch = useDispatch();
  // const { student, adminresult, teacherresult } = props && props.history.location && props.history.location.state ? props.history.location.state : ""
  const { user } = useSelector((state) => {
    return {
      user: state.user,
    };
  });

  useEffect(() => {
    if (window.location.pathname.includes("student")) {
      dispatch(examResult(_examId, user._id));
    }
    // else if (adminresult || teacherresult) {
    //   dispatch(examResultShow(_examId, _studentId));
    // }
  }, [dispatch, _examId, user, _studentId]);

  useEffect(() => {
    return () => {
      dispatch(resetOESResult())
    }
  }, [dispatch])

  return (
    <ErrorBoundary url="/dashboard/student/online-test">
      <React.Fragment>
        <OnlineExamHeader
          props={props} />
        <ErrorBoundary url="/dashboard/student/online-test">
          <OnlineExamQuesList
            props={props} />
        </ErrorBoundary>
      </React.Fragment>
    </ErrorBoundary>
  );
};

export default OnlineExamResult;
