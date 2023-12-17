/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import moment from "moment"
import React, { useEffect } from "react"
import Modal from "../../../../Common/Modal"
import ModalBody from "../../../../Common/Modal/ModalBody"
import ModalHeader from "../../../../Common/Modal/ModalHeader"



const StudentHolidayView = ({ manageHolidayModal, onclose, holidayDetails }) => {
  const closeModalState = () => {
    onclose()
  }

  const getClassroomName = (holidayDetails) => {
    return holidayDetails.classroomInfo?.length > 0 ? holidayDetails.classroomInfo[0].coursename : ''
  }
  return (
    <React.Fragment>
      <ModalBody>
        <Modal show={manageHolidayModal}>
          <ModalHeader
            title="Holiday"
            closeButton={true}
            onclose={closeModalState}
          />
          <ModalBody>
            <div className="LeaveRequest-Wrapper">
              <p className="text-xs w-600">
                {holidayDetails.classroomInfo ?
                  !holidayDetails.classroomInfo.length ? ""
                    : holidayDetails.classroomInfo && holidayDetails.classroomInfo.length == 1 ? getClassroomName(holidayDetails)
                      : holidayDetails.classroomInfo.length + ' Classrooms' : ""}</p>
              <div className="LR-Time-Details">
                <div className="LR-Time-From">
                  <p className="text-2xs w-300">FROM</p>
                  <p className="text-xxs w-500">{moment(holidayDetails.startFrom).format('DD MMM YYYY')}</p>
                </div>
                <div className="LR-Time-To">
                  <p className="text-2xs w-300">TO</p>
                  <p className="text-xxs w-500">{moment(holidayDetails.endOn).format('DD MMM YYYY')}</p>
                </div>
              </div>
              <div className="LR-Mail-Body">
                <h3>{holidayDetails.holidayTitle}</h3>
                <p>
                  {holidayDetails.shortIntro}
                </p>
              </div>
            </div>
          </ModalBody>

        </Modal>
      </ModalBody>
    </React.Fragment>
  )
}
export default StudentHolidayView
