// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useParams } from "react-router-dom";
// import { examInformation } from "../../store/actions/onlineexamstudent";
// const StudentExamRoute = () => {
//   const dispatch = useDispatch();
//   const { _id } = useParams()
//   const { users, ExamLoadedsuccess, examDetail } = useSelector((state) => {
//     return {
//       users: state.user,
//       ExamLoadedsuccess: state.onlineexamstudent.successExamLoaded,
//       examDetail: state.onlineexamstudent.detail,
//     }
//   });

//   useEffect(() => {
//     dispatch(examInformation(_id, users._id));
//   }, [dispatch, _id, users]);

//   const redirectToSection = () => {
//     return (ExamLoadedsuccess && examDetail && examDetail.submittedInfo) ?
//       <Navigate to={`/dashboard/student-online-test/${_id}`} />
//       :
//       <Navigate to={`/dashboard/student/exam-instruction/${_id}`} />
//   }

//   return (
//     <React.Fragment>
//       <div style={{ padding: 100 }}>
//         {
//           !ExamLoadedsuccess ?
//             <div className="loadingGridData"><i className="ed-loadingGrid"></i></div>
//             :
//             ExamLoadedsuccess && redirectToSection()
//         }
//       </div>
//     </React.Fragment>
//   );
// };

// export default StudentExamRoute;
