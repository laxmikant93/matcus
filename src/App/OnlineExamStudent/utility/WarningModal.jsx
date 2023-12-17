import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Modal from "../../../Common/Modal";
import ModalHeader from "../../../Common/Modal/ModalHeader";
import ModalBody from "../../../Common/Modal/ModalBody";
import ModalFooter from "../../../Common/Modal/ModalFooter";
import { patchSubmitExam } from "../../../store/actions/onlineexamstudent";

function WarningModal({ show, warningCount, hideWarningModal }) {

  const dispatch = useDispatch()

  const { submitId, detail, payload, warningTimer } = useSelector(state => {
    return {
      detail: state.onlineexamstudent.detail,
      payload: state.onlineexamstudent.attemptedQuestion.data,
      submitId: state.onlineexamstudent.detail.submittedInfo._id,
      warningTimer: state.onlineexamstudent.detail.warningTimer
    }
  })

  const [counter, setCounter] = useState(warningTimer ? warningTimer : 60)

  useEffect(() => {
    let interval = setInterval(() => {
      setCounter(counter - 1)
    }, 1000);
    if (counter === 0) {
      clearInterval(interval)
      dispatch(patchSubmitExam(submitId, { isTerminated: true, ...payload, endExam: new Date() }));
    }
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter])


  return (
    <Modal
      className="restrictedExamWarningPopup"
      show={show}
    >
      <ModalHeader
        className="red"
        title="Warning !"
      />
      <ModalBody>
        {detail.accessibilityMode === "Strict" &&
          <p className="text-xs gray">
            You are not allowed to <strong> minimize </strong> the test window. If you minimize the window again,
            your attempted answers will be auto-submitted and the test will be terminated. To stay on the test window, click OK.
          </p>
        }{detail.accessibilityMode === "Moderate" &&
          <p className="text-xs gray">
            {5 - warningCount} attempts left. Every time you try to change the window, your teacher will
            be notified. To stay on the test window, click OK.
          </p>
        }
      </ModalBody>
      <ModalFooter>
        <p>{counter}</p>
        <button onClick={hideWarningModal} className="button button-red  btn-sm  mt-20">
          Ok
        </button>
      </ModalFooter>
    </Modal>
  )
}


export default WarningModal
