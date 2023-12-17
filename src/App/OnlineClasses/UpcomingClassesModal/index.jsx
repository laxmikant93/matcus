import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../../Common/Modal';
import ModalBody from '../../../Common/Modal/ModalBody';
import ModalFooter from '../../../Common/Modal/ModalFooter';
import ModalHeader from '../../../Common/Modal/ModalHeader';
import "./UpcomingDate.scss";

const UpcomingClassesModal = ({ show, onclose }) => {

  const { upComingData, upComingDataSuccess, classDetails } = useSelector((state) => {
    return {
      upComingData: state.studentjoinclass.upcomingClasses.data.dataUpcoming,
      classDetails: state.studentjoinclass.upcomingClasses.data,
      upComingDataSuccess: state.studentjoinclass.upcomingClasses.success
    }
  })
  const closeModalState = () => {
    onclose();
  }



  return (
    <React.Fragment>
      <Modal show={show}
        ModalSize={'modal-l'}
      >
        <ModalHeader
          title={upComingDataSuccess && classDetails && classDetails.onlineclasses_data && classDetails.onlineclasses_data.topic}
          closeButton={true}
          onclose={closeModalState}
        />
        <div className="classDataNamestudent">
          <p>{upComingDataSuccess && classDetails && classDetails.course_data && classDetails.course_data.coursename}, {upComingDataSuccess && classDetails && classDetails.classroom_data && classDetails.classroom_data.classroomname} </p>
          <p> {moment(upComingDataSuccess && classDetails && classDetails.onlineclasses_data.class_timing).format("h:mm A")} - {moment(upComingDataSuccess && classDetails && classDetails.onlineclasses_data.class_timing)
            .add(upComingDataSuccess && classDetails && classDetails.onlineclasses_data.duration, "m")
            .format("h:mm A")} | {upComingDataSuccess && classDetails && classDetails.onlineclasses_data.duration} Mins </p>
          <p>{upComingDataSuccess && classDetails && classDetails.onlineclasses_data && classDetails.onlineclasses_data.createdBy}</p>

        </div>
        <ModalBody className="EditService-MBody upcomingdateModalui">

          {upComingDataSuccess ? (
            upComingData.length ? (
              upComingData.map((item) => {
                return (
                  <React.Fragment>
                    <h1 className='MonthaNameModal mt-20 text-xs base w-300 '>{item.key}</h1>
                    <React.Fragment>
                      {item.data.map((itemDate) => {
                        return (
                          <div className='DateDesignmodal text-xxs'>
                            <p >
                              {moment(itemDate).format(" ddd")}
                            </p>
                            <h3 className=" text-xxs w-600">
                              {moment(itemDate).format("D")}
                            </h3>

                          </div>
                        )
                      })}
                    </React.Fragment>
                  </React.Fragment>
                )
              })) : "No records"
          ) : "Loading..."}
        </ModalBody>
        <ModalFooter>

        </ModalFooter>
      </Modal>
    </React.Fragment>
  )
}
export default UpcomingClassesModal;