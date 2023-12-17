import Request from "../../../Classes/Request";

class reportCardRequest extends Request {
  constructor() {
    super();
    this.reportCardEndPoint = {
      createNewGrade: super.url("/reportCard/grade/?institute=__ID__"),
      getGrades: super.url("/reportCard/getGrade/?institute=__ID__"),
      updateGrades: super.url("/reportCard/grade/__ID__"),
      createTerm: super.url("/reportCard/term"),
      getResult: super.url(
        "/reportCard/report/getReportcardById?institute=__INSID__&course=__COURSEID__&termId=__TERMID__"
      ),
      getTermList: super.url("reportCard/report/getReportcardById?institute=__ID__&course=__ID__"),
      getStudentReport: super.url("/reportCard/report/getReportcard?institute=__ID__&reportCardId=__ID__"),
      updateStudentReport:super.url("/reportCard/report/__ID__")
    };
  }
}

export default new reportCardRequest();
