import Request from "../../../Classes/Request";

class UserInfoRequest extends Request {
  constructor() {
    super();
    this.userinforequest = {
      //userInfo: super.url("/user/?institute=__Id__&activeRole=__Role__"),
      userInfo: super.url("/userrolemicro?institute=__Id__&role=__Role__&kind=__KIND__&limit=__LIMIT__&skip=__SKIP__&industry=LMS", "commonservices"),
      getsingledata: super.url("authorization-middleware/user/__UserId__?institute=__INS__&industry=LMS", "middleware"),
      getsingledatafaculty: super.url("/authorization-middleware/user/__UserId__?industry=LMS", "middleware"),
      updateUserInfo: super.url("/user/?user1=__UserId__&owner=__Owner__&institute=__INS__"),
      deleteUserInfo: super.url("/userrolemicro/__UserId__", "commonservices"),
      sortTeacherList: super.url("/userrolemicro?institute=__ID__&role=__ROLEID__&status=__STATUS__&kind=__KIND__&limit=__LIMIT__&skip=__SKIP__&industry=LMS", "commonservices"),
      getNotLoggedTeacherData: super.url("/userrolemicro?institute=__ID__&role=__ROLEID__&invite=true&kind=__KIND__&industry=LMS", "commonservices"),
      getDataByCoursesAndClassroomsForTeacher: super.url('/userrolemicro?institute=__ID__&role=__ROLE__&course=[__COURSESARRAY__]&kind=__KIND__&limit=__LIMIT__&skip=__SKIP__&industry=LMS', "commonservices"),
      getStudentFilterByCourses: super.url('/userrolemicro?institute=__INSID__&role=__ROLE__&course=[__STUCOURSEARRAY__]&kind=__KIND__&limit=__LIMIT__&skip=__SKIP__&industry=LMS', "commonservices"),
      getAllCoursesForStudentFilter: super.url('/invitationhistorymicro/?institute=__INSID__&forUI=courseList'),
      searchUserInfo: super.url("/userrolemicro?institute=__Id__&role=__Role__&kind=__KIND__&search=__SEARCH__&limit=__LIMIT__&skip=__SKIP__&industry=LMS", "commonservices"),
      postExcelSheetColumns: super.url("/userrolemicro/downloadExcel", "commonservices")
    };
  }
}
export default new UserInfoRequest();
