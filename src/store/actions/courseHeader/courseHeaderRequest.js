import Request from "../../../Classes/Request";

class courseHeaderRequest extends Request {
  constructor() {
    super();
    this.courseHeaderEndpoint = {
      courseHeaderRead: super.url("/courseheaderMicro/?institute=__ID__"),
      postCourseHeader: super.url("/courseheaderMicro"),
      updateCourseHeader: super.url("/courseheaderMicro/__Id__")
    };
  }
}
export default new courseHeaderRequest();
