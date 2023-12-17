import { TeacherViewClassroomTypes } from "./actionType";
import TeacherViewClassroomRequest from "./TeacherViewClassroomRequest";


// export const getTeacherClassroomOnlineClasses = (insID,ownerId) => {
//   return dispatch => {

//       dispatch({
//           type: TeacherViewClassroomTypes.TEACHER_VIEW_CLASSROOM_ONLINECLASSES_LOADING,
//           payload: [],
//       })

//       TeacherViewClassroomRequest.TeacherViewClassroomEndpont.get(
//         TeacherViewClassroomRequest.TeacherViewClassroomEndpont.getTeacherClassroomsList.replace("__INSID__", insID).replace('__USERID__',ownerId), (success) => {

//           dispatch({
//               type: TeacherClassroomsListActionTypes.TEACHER_CLASSROOMS_LIST_LOADED,
//               payload: success.data.courseInfo
//           })

//       },
//           error => {
//               dispatch(setCommonError(error.message))
//               dispatch({
//                   type: TeacherClassroomsListActionTypes.TEACHER_CLASSROOMS_LIST_ERROR,
//                   payload: []
//               })
//           });

//   }
// }