import { useState } from "react";
import { useSelector } from "react-redux";
import Request from "../../Classes/Request";
const CourseClassroomRequest = new Request();

const useCourseClassroom = () => {
  const [courseLoading, setCourseLoading] = useState(false);
  const [courseError, setCourseError] = useState(null);
  const [courseList, setCourseList] = useState([]);
  const [courseSuccess, setCourseSuccess] = useState(false);
  // const { user_institute } = useSelector(state => state.user);

  const resetCourseClassroomStates = () => {
    setCourseError(null); // Reset error state
    setCourseSuccess(true); // Reset success state
  };

  const userId = useSelector((state) => state.user._id);
  const activeRole = useSelector((state) => state.user.user_activeRole);
  /**
   *
   * @param {*} instituteId : Required
   * @default : undefined
   */
  const getCourseClassroom = (instituteId = undefined) => {
    const requestUrl =
      activeRole === process.env.REACT_APP_PAGE_OWNER
        ? CourseClassroomRequest.url(
          `invitationhistorymicro/?institute=${instituteId}&forUI=courseList`
        )
        : activeRole === process.env.REACT_APP_STUDENT
          ? CourseClassroomRequest.url(
            `invitationhistorymicro/?institute=${instituteId}&student=${userId}&forUI=courseList`
          )
          : CourseClassroomRequest.url(
            `invitationhistorymicro/?institute=${instituteId}&user=${userId}&forUI=courseList`
          );
    if (instituteId && userId) {
      resetCourseClassroomStates(); // Common reset states method
      setCourseLoading(true); // Enable loading
      // Request to fetch course and classrooms
      CourseClassroomRequest.get(
        requestUrl,
        (success) => {
          setCourseLoading(false); // Disable loading
          setCourseSuccess(true); // Request completed successfully
          setCourseList(success.data); // List of course and classroom
        },
        (error) => {
          setCourseLoading(false); // Disable loading
          setCourseError(error.message); // Error message
        }
      );
    }
  };
  return [
    courseLoading,
    courseError,
    courseList,
    courseSuccess,
    getCourseClassroom,
  ];
};

export default useCourseClassroom;
