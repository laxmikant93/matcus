import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getStudentData, getStudentDataReset } from "../../store/actions/editstudentlist"


const useCourseStudents = () => {

  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.user)
  const studentDataList = useSelector(state => state.editstudentlist.list.data)
  const [studentList, setStudentList] = useState()

  const getStudentList = (course) => {
    dispatch(getStudentData(userInfo.user_institute, course))
  }

  useEffect(() => {
    setStudentList(studentDataList)
    return () => {
      getStudentDataReset()
    }
  }, [studentDataList])

  return [studentList, getStudentList]

}

export default useCourseStudents;
