import React, { useEffect, useState, useRef } from "react";
import QuestionList from "./QuestionList/QuestionList";
import QuestionListHeader from "./QuestionListHeader";
import QuestionListSubHeader from "./QuestionListSubHeader";
import { useDispatch, useSelector } from "react-redux";
import { useDetectOutsideClick } from "../../Common/DetectOutsideClick/useDetectOutsideClick";
import {
  examInformation,
  resetOnlineExamStudent,
} from "../../store/actions/onlineexamstudent";
import { useParams } from "react-router-dom";
import ErrorBoundary from "../../Classes/ErrorBoundary";
import AppLinkUrl from "../../Common/AppLink/AppLinkUrl";
import "./OnlineExamStudent.scss";

const OnlineExamStudent = (props) => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const [propData, setPropData] = useState({});

  const { user, detail, loading, ExamLoadedsuccess } = useSelector((state) => {
    return {
      user: state.user,
      detail: state.onlineexamstudent.detail,
      loading: state.onlineexamstudent.loading,
      ExamLoadedsuccess: state.onlineexamstudent.successExamLoaded,
    };
  });

  useEffect(() => {
    dispatch(examInformation(_id, user._id));
  }, [dispatch, _id, user]);

  useEffect(() => {
    return () => {
      dispatch(resetOnlineExamStudent());
      AppLinkUrl.privateDomain() && window.location.reload();
    };
  }, [dispatch]);
  const dropdownRef = useRef(null);
  const [MobileMenuOnline, setMobileMenuOnline] = useDetectOutsideClick(
    dropdownRef,
    false
  );

  const mobileonlinedotMenu = () => {
    setMobileMenuOnline(!MobileMenuOnline);
  };

  return (
    <ErrorBoundary url="/">
      <div className="edContainer">
        {loading ? (
          <div className="loadingGridData">
            <i className="ed-loadingGrid"></i>
          </div>
        ) : (
          <React.Fragment>
            <div
              className="onlineExamCollapesMenu"
              onClick={mobileonlinedotMenu}
              ref={dropdownRef}
            ></div>
            {
              <div
                className={`QuestionListHeadWrapper ${MobileMenuOnline ? "active" : "inactive"
                  }`}
              >
                <ErrorBoundary url="/">
                  <QuestionListHeader propData={propData} />
                </ErrorBoundary>
                <ErrorBoundary url="/">
                  <QuestionListSubHeader />
                </ErrorBoundary>
              </div>
            }
            <ErrorBoundary url="/">
              {ExamLoadedsuccess && detail.question.length > 0 ? (
                <QuestionList
                  onUpdated={(data) => setPropData(data)}
                  props={props}
                />
              ) : (
                <div className="loadingGridData">No Questions.</div>
              )}
            </ErrorBoundary>
          </React.Fragment>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default OnlineExamStudent;
