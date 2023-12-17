import moment from "moment";
import { bool, number, string } from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import DummyProfile from "./DummyProfile.png";
import { useSelector, useDispatch } from "react-redux";
import {
  checkStudentExam,
  getStudentListSubmittedExam,
} from "../../../store/actions/onlineexam";
import { subscriberToTopic } from "../../../firebase/subscribetopic";
import { messaging } from "../../../firebase/messaginInit";

function TeacherSubmissionListItem({
  studentName,
  studentImage,
  status,
  mark,
  totalMarks,
  checked,
  finalCheck,
  examID,
  studentID,
  submitId,
  isQuestionSubjective,
  studentProfile,
  studentEmail,
  studentAdmission,
  contact,
  Autosubmit,
  updatedOn,
  submittedTime,
  props,
}) {
  const { checkExamState, users } = useSelector((state) => {
    return {
      users: state.user,
      checkExamState: state.onlineexam.checkStudentExam,
    };
  });

  async function firenotification() {
    if (messaging) {
      messaging.onMessage((payload) => {
        dispatch(getStudentListSubmittedExam(_id));
      });
      if (users._id) {
        const firebaseToken = await messaging.getToken();
        subscriberToTopic(firebaseToken, users._id);
      }
    }
  }

  document.addEventListener('dblclick', function (event) {
    // alert("double click");
    event.preventDefault();
    event.stopPropagation();
  }, true);


  useEffect(() => {
    firenotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();

  function calculatePercentage() {
    let percentage = 0;
    if (mark > 0 && totalMarks > 0) {
      percentage = (mark / totalMarks) * 100;
      percentage = percentage.toFixed(2);
    }
    return percentage;
  }
  const { _id } = useParams();
  const optionalData = () => {
    return {
      optional: "",
    };
  };
  const history = useNavigate();
  const handleNextPage = (submitId, examID, studentID) => {
    if (!checked) {
      dispatch(checkStudentExam(submitId, optionalData()));
      setTimeout(() => {
        history(
          `/dashboard/teacher/online-exam/${examID}/submission/${studentID}`,
          { submission: "submission" }
        );
      }, 300);
    } else {
      history(
        `/dashboard/teacher/online-exam/${examID}/submission/${studentID}`,
        { submission: "submission" }
      );
    }
  };

  return (
    <ul className="topInfo">
      <li className="col col-2">
        <div className="profileImgWrap">
          {studentImage ? (
            <a
              href={`/profile/${studentProfile}`}
              target="_blank"
              rel="noreferrer"
            >
              <img className="ListTableImg" src={studentImage} alt="data" />
            </a>
          ) : (
            <a
              href={`/profile/${studentProfile}`}
              target="_blank"
              rel="noreferrer"
            >
              <img className="ListTableImg" src={DummyProfile} alt="data" />
            </a>
          )}
        </div>
      </li>
      <li className="col col-2" data-column="Student Name">
        <a href={`/profile/${studentProfile}`} target="_blank" rel="noreferrer">
          {studentName}
        </a>
        <p>{studentEmail}</p>
        <p>{studentAdmission}</p>
        <p>{contact}</p>
      </li>
      <li className="col col-2" data-column="Marks">
        {status === "Participated" && !isQuestionSubjective ? (
          <div>
            <span className="secondary">{checked ? mark : "-"}</span>
            <span className="dgray">
              {status === "" ? "" : "/" + totalMarks}
            </span>
          </div>
        ) : status === "Participated" && isQuestionSubjective ? (
          <div>
            {checked && finalCheck ? (
              <React.Fragment>
                <span className="secondary">{mark}</span>
                <span className="dgray">
                  {status === "" ? "-" : "/" + totalMarks}
                </span>
              </React.Fragment>
            ) : (
              "-"
            )}
          </div>
        ) : status === "Participating" ? (
          "-"
        ) : (
          ""
        )}
      </li>
      <li className="col col-2" data-column="Percentile">
        {status === "Participated" && !isQuestionSubjective
          ? checked
            ? `${calculatePercentage()}%`
            : "-"
          : status === "Participated" && isQuestionSubjective
            ? checked && finalCheck
              ? `${calculatePercentage()}%`
              : "-"
            : ""}
      </li>
      <li className="col col-2" data-column="Checked On">
        {status === "Participated" && !isQuestionSubjective ? (
          <div>
            {checked ? (
              <div>
                <p>{moment(updatedOn).format("Do MMM YYYY")}</p>
                <p>{moment(updatedOn).format("h:mm a")}</p>
              </div>
            ) : (
              "-"
            )}
          </div>
        ) : status === "Participated" && isQuestionSubjective ? (
          <div>
            {checked && finalCheck ? (
              <div>
                <p>{moment(updatedOn).format("Do MMM YYYY")}</p>
                <p>{moment(updatedOn).format("h:mm a")}</p>
              </div>
            ) : (
              "-"
            )}
          </div>
        ) : (
          ""
        )}
      </li>
      <li className="col col-2" data-column="Submitted On">
        <p>{moment(submittedTime).format("DD MMM YYYY hh:mm A")}</p>
      </li>
      <li className="col col-2 actionCols">
        <div className="actionBtn">
          {status === "Participated" && isQuestionSubjective ? (
            <div>
              <button
                onClick={() => handleNextPage(submitId, examID, studentID)}
                className={`btn-square ${checked && finalCheck
                  ? ""
                  : ""
                  }`}
                hidden
              >
                {checked && finalCheck ?
                  <span className="cssIcon">
                    <i className="ed-eye"></i>
                  </span> :
                  <span className="cssIcon">
                    <i className="ed-grade"></i>
                  </span>
                }
              </button>
            </div>
          ) : status === "Participated" ? (
            <div>
              <button
                onClick={() => handleNextPage(submitId, examID, studentID)}
                className={`btn-square ${checked
                  ? ""
                  : ""
                  }`}
                hidden
              >
                {checked ?
                  <span className="cssIcon">
                    <i className="ed-eye"></i>
                  </span>
                  : <span className="cssIcon">
                    <i className="ed-grade"></i>
                  </span>}
              </button>
            </div>
          ) : status === "Participated" && checkExamState.loading ? (
            <div>
              <button
                className={`${checked
                  ? "button btn-o-secondary btn-xs"
                  : "button btn-o-secondary btn-xs"
                  }`}
                hidden
              >
                Checking...
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </li>
    </ul>
  );
}

TeacherSubmissionListItem.defaultProps = {
  studentName: undefined,
  studentImage: undefined,
  studentAdmission: undefined,
  status: "",
  mark: 0,
  totalMarks: 0,
  updatedOn: undefined,
  checked: false,
  isQuestionSubjective: false,
  studentEmail: undefined,
  contact: undefined,
};

TeacherSubmissionListItem.propTypes = {
  studentName: string.isRequired,
  studentImage: string,
  studentAdmission: string,
  status: string.isRequired,
  mark: number,
  totalMarks: number,
  updatedOn: string,
  checked: bool,
  isQuestionSubjective: bool,
  studentEmail: string,
  contact: number,
};

export default TeacherSubmissionListItem;
