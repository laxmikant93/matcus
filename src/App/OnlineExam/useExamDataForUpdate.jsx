import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Storage from '../../Classes/SessionStorage';
import { getSingleExamDetails, createOnlineExamReset, } from "../../store/actions/onlineexam";


const useExamDataForUpdate = () => {

  const dispatch = useDispatch()
  const onlineExamQuestion = useSelector((state) => state.onlineexam.getSingleExam.data);


  useEffect(() => {
    if (onlineExamQuestion.questions) {
      Storage.setJson("BasicInfo", {
        title: onlineExamQuestion.title,
        description: onlineExamQuestion.description,
        courseInfo: onlineExamQuestion.courseInfo,
        classroomInfo: onlineExamQuestion.classroomInfo,
        attendeeList: onlineExamQuestion.studentSelect
      })
      Storage.setJson("ExamSettings", {
        quizon: onlineExamQuestion.quizon,
        estimatedtime: onlineExamQuestion.estimatedtime,
        totalmarks: onlineExamQuestion.totalmarks,
        graceTime: onlineExamQuestion.graceTime,
        accessibilityMode: onlineExamQuestion.accessibilityMode,
        graceStartTime: onlineExamQuestion.graceStartTime,
        graceStopTime: onlineExamQuestion.graceStopTime,
        instructionData: onlineExamQuestion.instructionData,
        questionInstruction: onlineExamQuestion.questionInstruction,
        reminderTest: onlineExamQuestion.reminderTest,
        resumeTest: onlineExamQuestion.resumeTest,
        estimatedHrs: onlineExamQuestion.estimatedHrs,
        estimatedMins: onlineExamQuestion.estimatedMins,
        examDate: onlineExamQuestion.examDate,
        examTime: onlineExamQuestion.examTime,
        examOnlineDate: onlineExamQuestion.examOnlineDate,
        showResult: onlineExamQuestion.showResult
      })
      Storage.setJson("Questions", { questions: onlineExamQuestion.questions })
    }
    return () => {
      dispatch(createOnlineExamReset())
    }
  }, [dispatch, onlineExamQuestion]);


  const getExamDataForUpdate = (id) => {
    dispatch(getSingleExamDetails(id));
  }

  return [getExamDataForUpdate]

}

export default useExamDataForUpdate;
