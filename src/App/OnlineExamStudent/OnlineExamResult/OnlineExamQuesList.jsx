import React from "react";
import Card from "../../../Common/Card";
import CardBody from "../../../Common/Card/CardBody";
import CardHeader from "../../../Common/Card/CardHeader";
import { useSelector } from "react-redux";

const OnlineExamQuesList = (props) => {
  // const { student, adminresult, teacherresult } = props.props && props.props.history.location && props.props.history.location.state

  const { studentResultData, studentResult, resultInfo } = useSelector(
    (state) => {
      if (window.location.pathname.includes('student')) {
        return {
          studentResultData: state.onlineexamstudent.examresult.data.questions,
          studentResult: state.onlineexamstudent.examresult,
          resultInfo: state.onlineexamstudent.examresult.data,
        };
      }
      // else if (adminresult || teacherresult) {
      //   return {
      //     studentResultData: state.onlineexam.examresult.data.questions,
      //     studentResult: state.onlineexam.examresult,
      //     resultInfo: state.onlineexam.examresult.data,
      //   };
      // }
    }
  );

  return (
    <React.Fragment>
      {studentResult.successResultLoaded ? (
        <div className="view-student-exam-result">
          {studentResultData.map((TeacherTest, key) => {
            return (
              <Card
                key={key}
                className="borderCstm cardPadding mt-20 attempted"
              >
                <CardHeader>
                  <p className="Qhead base text-xs w-500 mb-5">
                    {TeacherTest.questiontitle}
                  </p>
                </CardHeader>
                <CardBody>
                  <div className="q-option-area mb-5">
                    <div className="input-custom-type">
                      {TeacherTest.questiontype === "subjective" ? (
                        <p className="text-xs dgray mt-10">
                          {TeacherTest.selectedOptions &&
                            TeacherTest.selectedOptions.length > 0
                            ? TeacherTest.selectedOptions[0]
                            : ""}
                        </p>
                      ) : (
                        TeacherTest.options.map((TestAnswerOpt, optionKey) => {
                          return (
                            <label
                              key={optionKey}
                              className={`${TeacherTest.questiontype === "multi"
                                ? `small  
                                  ${TeacherTest.selectedOptions &&
                                TeacherTest.selectedOptions.includes(
                                  TestAnswerOpt
                                )
                                && "s-active"
                                }`
                                : `small 
                                  ${TeacherTest.selectedOptions &&
                                TeacherTest.selectedOptions[0] ===
                                TestAnswerOpt
                                && "s-active"
                                }`
                                }`}
                            >
                              {TeacherTest.questiontype === "single" && (
                                <input
                                  type="radio"
                                  name={key}
                                  readOnly
                                  disabled
                                  defaultChecked={
                                    TeacherTest.selectedOptions &&
                                      TeacherTest.selectedOptions[0] ===
                                      TestAnswerOpt
                                      ? true
                                      : false
                                  }
                                />
                              )}
                              {TeacherTest.questiontype === "multi" && (
                                <input
                                  type="checkbox"
                                  name={key}
                                  disabled
                                  defaultChecked={
                                    TeacherTest.selectedOptions &&
                                      TeacherTest.selectedOptions.includes(
                                        TestAnswerOpt
                                      )
                                      ? true
                                      : false
                                  }
                                />
                              )}
                              {TeacherTest.questiontype === "tf" && (
                                <input
                                  type="radio"
                                  name={key}
                                  disabled
                                  defaultChecked={
                                    TeacherTest.selectedOptions &&
                                      TeacherTest.selectedOptions[0] ===
                                      TestAnswerOpt
                                      ? true
                                      : false
                                  }
                                />
                              )}
                              {TestAnswerOpt}
                              <span className="small"></span>
                              {
                                resultInfo.showResult ?
                                  <span
                                    className={`text-xxs ${TeacherTest.answer.includes(TestAnswerOpt)
                                      ? "answer-t-status"
                                      : "answer-f-status"
                                      }`}
                                  >
                                    {`${TeacherTest.answer.includes(TestAnswerOpt)
                                      ? "Correct"
                                      : TeacherTest.selectedOptions
                                        ? TeacherTest.selectedOptions
                                          .map((item) =>
                                            item === TestAnswerOpt
                                              ? "Incorrect"
                                              : ""
                                          )
                                          .toString()
                                          .replaceAll(",", "")
                                        : ""
                                      } `}
                                  </span> :
                                  <span
                                    className={`text-xxs ${TeacherTest.answer.includes(TestAnswerOpt)
                                      ? "answer-t-status"
                                      : "answer-f-status"
                                      }`}
                                  >
                                    {TeacherTest.answer.includes(TestAnswerOpt)
                                      ? "Correct" : "Incorrect"}
                                  </span>
                              }
                            </label>
                          );
                        })
                      )}
                    </div>
                    {TeacherTest.fileUpload ? (
                      <a
                        href={TeacherTest.fileUpload}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button btn-xs button-secondary mt-10"
                      >
                        <i className="ed-icon icon-attachment i-s white"></i>
                        Question Attachment
                      </a>
                    ) : (
                      ""
                    )}
                    {TeacherTest.fileUploads ? (
                      <a
                        href={TeacherTest.fileUploads}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button btn-xs button-purple mt-10"
                      >
                        <i className="ed-icon icon-attachment i-s white"></i>
                        Answer Attachment
                      </a>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="total-ques-marks text-xxs w-400">
                    <span className="gray w-300">Marks</span>&nbsp;&nbsp;
                    {TeacherTest.recievedMarks ? TeacherTest.recievedMarks : 0}/
                    {TeacherTest.marks}
                  </div>
                </CardBody>
              </Card>
            );
          })}
          <p className="text-xs purple w-600 mt-20">
            {resultInfo.submittedInfo &&
              resultInfo.submittedInfo.optional !== ""
              ? "Comment"
              : ""}
          </p>
          <p className="text-xxs w-500 ">
            {resultInfo.submittedInfo ? resultInfo.submittedInfo.optional : ""}
          </p>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default OnlineExamQuesList;
