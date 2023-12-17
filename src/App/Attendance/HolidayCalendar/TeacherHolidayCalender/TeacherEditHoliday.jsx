import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Modal from "../../../../Common/Modal";
import ModalBody from "../../../../Common/Modal/ModalBody";
import ModalHeader from "../../../../Common/Modal/ModalHeader";
import { resetEditHoliday, resetGetSingleHoliday } from "../../../../store/actions/holidayCalender";
import CreateEditHoliday from "../CreateEditHolidayCalender/CreateEditHoliday";

const TeacherEditHoliday = ({ show, onClose, _id, month }) => {
  const { editHolidaySuccess } = useSelector((state) => {
    return {
      editHolidaySuccess: state.holidayCalendar.editHoliday.success,
    }
  })
  const dispatch = useDispatch()
  if (editHolidaySuccess) {
    onClose()
    setTimeout(() => {
      dispatch(resetEditHoliday())

    }, 200)
  }
  const closeModal = () => {
    onClose()
  }
  useEffect(() => {
    return () => {
      dispatch(resetGetSingleHoliday())
    }
  }, [dispatch])
  return (
    <React.Fragment>
      <Modal show={show}>
        <ModalHeader
          closeButton={true}
          onclose={closeModal}
        />
        <ModalBody>
          <CreateEditHoliday _id={_id} month={month} closeEditModal={closeModal} />
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
}

export default TeacherEditHoliday