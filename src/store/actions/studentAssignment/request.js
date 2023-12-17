import Request from "../../../Classes/Request";

class AssignmentRequest extends Request {
  constructor() {
    super();
    this.assignmentsEndpoint = {
      postAssignment: super.url("/submittedassignmentsmicro"),
      getStudentAssignmentInfoData: super.url(
        "submittedassignmentsmicro/?student=__STUDENTID__&institute=__INSID__"
      ),
      getSingleAssignmentInfoData: super.url(
        "submittedassignmentsmicro/?student=__STUDENTID__&institute=__INS__&assignment=__ASSIGNMENTID__"
      ),
      getStudentInfo: super.url(
        "courseassigned/?institute=__INSID__&user=__ID__&$populate[]=course"
      ),
      deleteAssignment: super.url("/assignment/__ID__"),
      updateAssignment: super.url("/assignment/__ID__"),
      student_assignment_course_Classroom: super.url(
        "submittedassignmentsmicro/?student=__USERID__&institute=__INSID__&course=[__COURSE__]&classroom=[__CLASSROOM__]"
      ),

      assignmentSortByRTO1: super.url(
        "/submittedassignmentsmicro?institute=__INS__&student=__ID__&createdon=rto"
      ),
      assignmentSortBy_OTR1: super.url(
        "/submittedassignmentsmicro?institute=__INS__&student=__ID__&createdon=otr"
      ),
      assignmentSortByRTO2: super.url(
        "/submittedassignmentsmicro?institute=__INS__&student=__ID__&duedate=otr"
      ),
      assignmentSortBy_OTR2: super.url(
        "/submittedassignmentsmicro?institute=__INS__&student=__ID__&duedate=rto"
      ),
      assignmentSortBySubmited: super.url(
        "/submittedassignmentsmicro?institute=__INS__&student=__ID__&&status=submitted"
      ),
      assignmentSortByPending: super.url(
        "/submittedassignmentsmicro?institute=__INS__&student=__ID__&&status=pending"
      ),
      assignmentSortByGraded: super.url(
        "/submittedassignmentsmicro?institute=__INS__&student=__ID__&&status=graded"
      ),
      assignmentSortByMissed: super.url(
        "/submittedassignmentsmicro?institute=__INS__&student=__ID__&missed=_missed_"
      ),
    };
  }
}
export default new AssignmentRequest();

// assignment: {type: Schema.Types.ObjectId, required:true, ref:'assignment' },
// student: {type: Schema.Types.ObjectId, required:true, ref:'userinfo'},
// status: {type:String ,default:"pending", enum: ['pending', 'submitted']},
// grade: {type: String},
// remarks: {type: String},
// attachment: {type: String},
// description: {type: String}
