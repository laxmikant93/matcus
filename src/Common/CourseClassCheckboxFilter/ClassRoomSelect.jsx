import React from 'react'
import ClassRoomOption from './ClassRoomOption';

const ClassRoomSelect = ({ show, classroomData }) => {


  if (!show) {
    return <React.Fragment></React.Fragment>
  }

  return (
    <ul>
      {classroomData.length > 0 &&
        classroomData.map((classRoomItem, index) => {
          return (
            <ClassRoomOption title={classRoomItem.classroomname} courseid={classRoomItem.course} classroomid={classRoomItem._id} />
          );
        })}
    </ul>
  )
}

export default ClassRoomSelect
