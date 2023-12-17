import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllClassroomSubjects,
} from "../../../../store/actions/admincourse";
const MultipleClassroomsLevel = ({ onSelectedValue, _id }) => {
  const dispatch = useDispatch()
  const { user, classroomSubjectSuccess, classroomSubjectsDetails, holidayDetails, holidayDetailsSuccess } = useSelector((state) => {
    return {
      user: state.user,
      classroomSubjectsDetails: state.admincourse.getAllClassroomSubjects.data,
      classroomSubjectSuccess:
        state.admincourse.getAllClassroomSubjects.success,
      holidayDetails: state.holidayCalendar.getSingleHoliday.data,
      holidayDetailsSuccess: state.holidayCalendar.getSingleHoliday.success,
    }
  })

  const [classrooms, setClassrooms] = useState([])
  const [isFilled, setIsFilled] = useState(false)
  if (_id && holidayDetailsSuccess && holidayDetails && !isFilled) {
    setIsFilled(true)
    setClassrooms(holidayDetails.classroomId)
  }
  const handleClassroomCheck = (e) => {
    let selectedClassrooms = classrooms
    let { checked, value } = e.target;
    if (checked) {
      selectedClassrooms.push(value)
    } else {
      let data = classrooms;
      let index = data.indexOf(value);
      data.splice(index, 1);
    }
    setClassrooms([...selectedClassrooms])
  }

  useEffect(() => {
    onSelectedValue(classrooms)
  }, [classrooms, onSelectedValue])
  useEffect(() => {
    if (user.user_activeRole === process.env.REACT_APP_TEACHER) {
      dispatch(getAllClassroomSubjects(user.user_institute, user._id));
    } else {
      dispatch(getAllClassroomSubjects(user.user_institute));
    }
  }, [dispatch, user._id, user.user_activeRole, user.user_institute])
  return (
    <React.Fragment>
      <div className="chooseHolidayLevelList mt-20">
        <div className="input-custom-type mt-10">
          {
            classroomSubjectSuccess ? (
              classroomSubjectsDetails.length ?
                (classroomSubjectsDetails.map((item, key) => {
                  return (
                    <React.Fragment key={key}>
                      <label className={classrooms.includes(
                        item._id
                      ) ? "mb-10 active" : "mb-10"}>
                        <input type="checkbox" value={item._id} onChange={handleClassroomCheck} name={key}
                          defaultChecked={classrooms.includes(
                            item._id
                          )}
                          checked={classrooms.includes(
                            item._id
                          )} />
                        {item.coursename}
                      </label>
                    </React.Fragment>
                  )
                })
                ) : <div className="loadingGridData">No Classrooms.</div>
            ) : <div className="loadingGridData">Loading...</div>}

        </div>
      </div>
    </React.Fragment>
  )
}

export default MultipleClassroomsLevel