import Request from "../../../Classes/Request";

class OnlineExamStudentRequest extends Request {
  constructor() {
    super();
    this.onlineExamStudentRequest = {
      examDetail: super.url(
        "exam/examInfoForStudent?examid=__EXAMID__&studentid=__STUDENTID__"
      ),
      examResult: super.url(
        "exam/viewResult?examid=__EXAMID__&studentid=__STUDENTID__"
      ),
      postStudentExam: super.url("/exam/submitExam"),
      patchGraceRequest: super.url("/exam/requestGracetime?examId=__EXAMID__&studentId=__STUDENTID__"),
      patchExamAnswer: super.url("/exam/submitExam/__SUBMITID__"),
      patchSubmitExam: super.url("/exam/finalSubmitExam/__SUBMITID__"),
      getPatchAnswer: super.url("exam/examInfoForStudent?examid=__EXAMID__&studentid=__STUDENTID__"),
      getAssignTo: super.url("exam/assignToFillter?studentId=__STUDENTID__&instituteId=__INSID__"),
    };
  }
}

export default new OnlineExamStudentRequest();
