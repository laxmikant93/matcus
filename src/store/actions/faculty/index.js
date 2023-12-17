import { setCommonError } from "../commonerror";
import { FACULTYTYPE } from "./actionType";
import FacultyRequest from "./FacultyRequest";

export const getFacultyData = () => {
  return (dispatch) => {
    dispatch({
      type: FACULTYTYPE.FACULTY_LOADED,
      payload: "",
    });

    FacultyRequest.get(
      FacultyRequest.facultyEndpoint.faculty,
      (success) => {
     
        dispatch({
          type: FACULTYTYPE.FACULTY_LOADED,
          payload: success.data.data,
        });
      },
      (error) => {}
    );
  };
};

// export const postStudentData = (data) => {
//   return (dispatch) => {
//     dispatch({
//       type: STUDENTTYPE.STUDENT_INVITE,
//       payload: {},
//     });

//     StudentRequest.post(
//       StudentRequest.studentEndpoint.student,
//       data,
//       (success) => {
//         dispatch({
//           type: STUDENTTYPE.STUDENT_INVITE,
//           payload: success.data.data,
//         });
//       },
//       (error) => {
//         dispatch(setCommonError(error.message));
//       }
//     );
//   };
// };

export const deleteFacultyData = (id) => {
  return (dispatch) => {
    dispatch({
      type: FACULTYTYPE.FACULTY_DELETE,
      payload: {},
    });

    FacultyRequest.delete(
      FacultyRequest.facultyEndpoint.deleteFaculty.replace("__FacultyId__", id),
      (success) => {
        dispatch({
          type: FACULTYTYPE.FACULTY_DELETE,
          payload: success.data.data.id,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

// export const editAnnouncementData = (id) => {
//   return (dispatch) => {
//     dispatch({
//       type: ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_EDIT,
//       payload: {},
//     });

//     announcementRequest.AnnouncementUpdate(
//       announcementRequest.AnnouncementEndpoint.updateAnnouncement,
//       id,
//       (success) => {

//         dispatch({
//           type: ANNOUNCEMENT_LIST_AT.ANNOUNCEMENT_EDIT,
//           payload: success.data.data.id,
//         });
//       },
//       (error) => {}
//     );
//   };
// };
