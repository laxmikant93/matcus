import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Modal from '../../../../Common/Modal'
import ModalBody from '../../../../Common/Modal/ModalBody'
import ModalFooter from '../../../../Common/Modal/ModalFooter'
import ModalHeader from '../../../../Common/Modal/ModalHeader'

const StudentListModal = ({ show, onclose }) => {
  const { studentsList, studentsListLoading } = useSelector((state) => {
    return {
      studentsList: state.onlineClasses.studentList.data,
      singleClasssuccess: state.onlineClasses.singleClass.success,
      studentsListLoading: state.onlineClasses.studentList.loading,
    }
  })
  const closeModalState = () => {
    onclose();
  }
  const [studentListLength, setstudentListLength] = useState()
  useEffect(() => {
    if (studentsList && !studentsListLoading) {
      const slength = studentsList.filter(sl => sl.isAssigned === "yes")
      setstudentListLength(slength)

    }
  }, [studentsList, studentsListLoading])
  return (
    <React.Fragment>
      <Modal show={show}>
        {studentsList && studentListLength &&
          <ModalHeader
            title={`${studentListLength.length} Attending Students`}
            closeButton={true}
            onclose={closeModalState}
          />}

        <ModalBody>
          {studentsListLoading ? (
            <p>Loading</p>
          ) : (
            studentsList.map((student) => {
              return (
                <React.Fragment>
                  {student.isAssigned === "yes" ? (
                    <div className="mb-20">
                      <p>FullName: {student.fullname}</p>
                      <p>Email: {student.email}</p>
                    </div>
                  ) : (
                    ""
                  )}
                </React.Fragment>
              );
            })
          )}
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
}

export default StudentListModal