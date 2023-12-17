import { COURSETYPE } from "./actionType";
import CourseRequest from "./CoursesRequest";
import { setCommonError } from "../commonerror";
import { showSuccessPopup } from "../successmessagepopup";
import CoursesRequest from "./CoursesRequest";
import { DynamicCourseHeader } from "../../../Common/UserElement";
import { updateDashboardStepper } from "../user";

export const postCourseData = (data, dashboard_stepper) => {
  return (dispatch) => {
    dispatch({
      type: COURSETYPE.COURSE_CREATE_ERROR_FALSE,
      courseAC: false,
    });
    CourseRequest.post(
      CourseRequest.coursesEndpoint.postCourse,
      data,
      (success) => {
        if (
          success.data.message ===
          "this coursename already exists,take another name"
        ) {
          dispatch({
            type: COURSETYPE.COURSE_CREATE_ERROR,
            courseAC: true,
          });
        } else {

          let stepperData = {
            addClassroom: true,
            condition: "Classroom",
            industry: "LMS",
            institute: success.data.institute,
            owner: success.data.owner
          }
          CourseRequest.post(
            CourseRequest.coursesEndpoint.dashboardsteppercourse, stepperData,
            (success) => {
              let data = {
                ...dashboard_stepper, addClassroom: true
              }
              dispatch(updateDashboardStepper(data))
            },
            (error) => {

            }
          );

          dispatch({
            type: COURSETYPE.COURSE_CREATE,
            payload: success.data,
          });
          dispatch(showSuccessPopup(`${DynamicCourseHeader()} updated.`));
        }
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const createErrorRemove = () => {
  return (dispatch) => {
    dispatch({
      type: COURSETYPE.COURSE_CREATE_ERROR_FALSE,
      courseAC: false,
    });
  };
};

export const getCourseData = (_id) => {
  return (dispatch) => {
    CourseRequest.get(
      CourseRequest.coursesEndpoint.getCourseInstitute.replace("__ID__", _id),
      (success) => {
        dispatch({
          type: COURSETYPE.COURSE_READ,
          payload: success.data.course,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};
export const getNotAssignedCoursesList = (_id, userId) => {
  return (dispatch) => {
    dispatch({
      type: COURSETYPE.GET_NOT_ASSIGNED_COURSES_LOADING,
      loading: true,
    });
    CourseRequest.get(
      CourseRequest.coursesEndpoint.getNotAssignedCourses.replace("__ID__", _id).replace("__USERID__", userId),
      (success) => {
        dispatch({
          type: COURSETYPE.GET_NOT_ASSIGNED_COURSES,
          payload: success.data.courseData,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const getCourseDataReset = () => {
  return (dispatch) => {
    dispatch({
      type: COURSETYPE.COURSE_READ_RESET,
      payload: {},
    });
  };
};

export const deleteCourseData = (_id) => {
  return (dispatch) => {
    CourseRequest.patch(
      CourseRequest.coursesEndpoint.deleteCourse.replace("__ID__", _id), {},
      (success) => {
        dispatch({
          type: COURSETYPE.COURSE_DELETE,
          payload: { _id },
        });
        dispatch(
          showSuccessPopup(
            "Course deleted, All the assignments and online classes related to this class will be deleted."
          )
        );
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const updateCourseData = (_id, data) => {
  return (dispatch) => {
    CourseRequest.patch(
      CourseRequest.coursesEndpoint.updateCourse.replace("__ID__", _id),
      data,
      (success) => {
        dispatch({
          type: COURSETYPE.COURSE_UPDATE,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
};

export const selectCourseToUpdate = (_id) => {
  return (dispatch) => {
    dispatch({
      type: COURSETYPE.COURSE_UPDATE_SELECTION,
      payload: _id,
    });
  };
};
export const getAssignedMultipleCourses = (insId, studentId, kind) => {
  return (dispatch) => {
    dispatch({
      type: COURSETYPE.GET_MULTIPLE_COURSES_LOADING,
      loading: true
    })
    CourseRequest.get(
      CourseRequest.coursesEndpoint.getAssignedMultipleCourses.replace("__INSID__", insId).replace("__USERID__", studentId).replace("__KIND__", kind),
      (success) => {
        dispatch({
          type: COURSETYPE.GET_MULTIPLE_COURSES,
          payload: success.data.courseAssignedData
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  };
}
export const resetMultipleCourses = () => {
  return (dispatch) => {
    dispatch({
      type: COURSETYPE.RESET_MULTIPLE_COURSES,
      payload: {}
    })
  }
}
export const assignMultipleCourses = (userId, insId, ownerId, kind, data) => {
  return (dispatch) => {
    dispatch({
      type: COURSETYPE.ASSIGN_MULTIPLE_COURSES_LOADING,
      loading: true
    })
    CourseRequest.patch(
      CourseRequest.coursesEndpoint.assignMultipleCourses.replace("__USERID__", userId).replace("__INSID__", insId).replace("__OWNERID__", ownerId).replace("__KIND__", kind),
      data,
      (success) => {
        dispatch({
          type: COURSETYPE.ASSIGN_MULTIPLE_COURSES,
          payload: success.data.data,
        });
      },
      (error) => {
        dispatch(setCommonError(error.message));
      }
    );
  }
}


export const deleteAssignedCourse = (_id) => {
  return dispatch => {
    dispatch({
      type: COURSETYPE.DELETE_ASSIGNED_COURSE_LOADING,
      loading: true
    })
    CoursesRequest.patch(CoursesRequest.coursesEndpoint.deleteAssignedCourse, { id: _id },
      (success) => {

        dispatch({
          type: COURSETYPE.DELETE_ASSIGNED_COURSE,
          payload: _id
        })
        dispatch(showSuccessPopup("Deleted Successfully!!"));
      },
      error => {
        dispatch(setCommonError(error.message))

      }
    );
  }
}