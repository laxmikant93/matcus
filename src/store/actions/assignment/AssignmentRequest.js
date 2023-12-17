import Request from "../../../Classes/Request";

class AssignmentRequest extends Request {
  constructor() {
    super();
    this.assignmentsEndpoint = {
      postAssignment: super.url("/assignmentmicro/createAssignment"),
      getAssignmentList: super.url(
        "/submittedassignmentsmicro/?student=__ID__&$populate[]=assignment"
      ),
      getAssignment: super.url("/assignmentmicro/getAssignment/?institute=__INS__&owner=__ID__"),
      getAssignmentCreatedBy: super.url(
        "/assignmentmicro/getAssignment?institute=__INS__&owner=__ID__&createdBy=[__NAME__]"
      ),

      // assignment_Assigned: super.url(
      //   "classroomassigned/?forUI=createdByList&institute=__INSID__&owner=__USERID__&createdFor=assignment"
      // ),
      assignment_Assigned: super.url(
        "classroomAssign/createdByList?institute=__INSID__&owner=__USERID__&createdFor=assignment"
      ),

      assignmentSortByRTO1: super.url(
        "/assignmentmicro/getAssignment?institute=__INS__&owner=__ID__&createdon=rto"
      ),
      assignmentSortBy_OTR1: super.url(
        "/assignmentmicro/getAssignment?institute=__INS__&owner=__ID__&createdon=otr"
      ),
      assignmentSortByRTO2: super.url(
        "/assignmentmicro/getAssignment?institute=__INS__&owner=__ID__&updatedon=otr"
      ),
      assignmentSortBy_OTR2: super.url(
        "/assignmentmicro/getAssignment?institute=__INS__&owner=__ID__&updatedon=rto"
      ),
      assignmentSortByRTO3: super.url(
        "/assignmentmicro/getAssignment?institute=__INS__&owner=__ID__&duedate=rto"
      ),
      assignmentSortBy_OTR3: super.url(
        "/assignmentmicro/getAssignment?institute=__INS__&owner=__ID__&duedate=otr"
      ),
      getSearchAssignment: super.url(
        "/assignmentmicro/getAssignment?institute=__INS__&owner=__ID__&search=__VALUE__"
      ),

      getSingleAssignment: super.url(
        "/submittedassignmentsmicro/?assignment=__ASSIGNMENTID__&institute=__INSID__"
      ),
      getSingleAssignmentClassroom: super.url(
        "/submittedassignmentsmicro/?assignment=__ASSIGNMENTID__&institute=__INSID__&classroom=[__CLASSID__]&course=[__COURSEID__]"
      ),

      getAssignmentClassroomView: super.url(
        "/assignmentmicro/getAssignment?institute=__INS__&classroom=[__ID__]&$limit=50"
      ), //&sort=createdAt
      getSearchSingleAssignment: super.url(
        "/submittedassignmentsmicro/?institute=__INS__&assignment=__ID__&search=__VAL__"
      ),
      getSortBySingleAssignment: super.url(
        "/submittedassignmentsmicro/?institute=__INS__&assignment=__ID__&__STATE__=__VAL__"
      ),

      AssignmentRemark: super.url("submittedassignmentsmicro/__ID__"),
      deleteAssignment: super.url("/assignmentmicro/delete/__ID__"),
      updateAssignment: super.url("/assignmentmicro/update/__ID__"),
      singleAssignmentData: super.url("/assignment/__ID__"),
      assignment_Course_Classroom: super.url(
        "/assignment/?owner=__USERID__&institute=__INSID__&course=[__COURSE__]&classroom=[__CLASSROOM__]"
      ),
      sortByGradedNo: super.url(
        "/submittedassignmentsmicro/?assignment=__ASSIGNMENTID__&institute=__INSID__&graded=[submitted,pending]"
      ),
      sortByGradedYes: super.url(
        "/submittedassignmentsmicro/?assignment=__ASSIGNMENTID__&institute=__INSID__&graded=[graded]"
      ),
      sortByRTO_viewAssignment: super.url(
        "/submittedassignmentsmicro/?assignment=__ASSIGNMENTID__&institute=__INSID__&submittedon=rto"
      ),
      sortByOTR_viewAssignment: super.url(
        "/submittedassignmentsmicro/?assignment=__ASSIGNMENTID__&institute=__INSID__&submittedon=otr"
      ),
      sortBySubmittedStatus: super.url(
        "/submittedassignmentsmicro/?assignment=__ASSIGNMENTID__&institute=__INSID__&status=submitted"
      ),
      sortByPendingStatus: super.url(
        "/submittedassignmentsmicro/?assignment=__ASSIGNMENTID__&institute=__INSID__&status=pending"
      ),
      addAssignmentNotification: super.url("/notifications/addAssignment/id","commonservices"),
      removeAssignmentNotification: super.url("/notifications/CancelAssignment/id","commonservices"),
      editAssignmentNotification: super.url("/notifications/EditAssignment/id","commonservices"),
      assignAssignmentNotification: super.url("/notifications/assignAssignment/id?assign=_assign_&assignBy=_assignBy_","commonservices"),
      gradeAssignmentNotification: super.url("/notifications/gradeAssignment/id","commonservices")
    };
  }
}
export default new AssignmentRequest();
