import { Fragment, useEffect } from "react";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormTextArea from "../../Common/Form/FormTextArea";
import { patchGraceData } from "../../store/actions/onlineexamstudent";
import ValidationFile from "../../Classes/ValidationFile";
import { useParams } from "react-router-dom";
import FormError from "../../Common/Form/FormError";
import ExamInstruction from "./utility/ExamInstruction";
import withTimer from "./utility/Timer"

const QuestionListSubHeader = ({ counter }) => {

  const [detail, setDetail] = useState()
  const [newexperience, setNewexperience] = useState({
    GraceRequest: {
      value: "",
      isValid: false,
    },
    validation: false,
  });

  const examDetail = useSelector(state => state.onlineexamstudent.detail)
  const { patchGraceDataLoading, users, details } = useSelector((state) => {
    return {
      users: state.user,
      details: state.onlineexamstudent.detail,
      patchGraceDataLoading: state.onlineexamstudent.graceRequest.loading,
    };
  });
  const [instructionModal, setInstructionModal] = useState(true)

  const [readIns, setReadIns] = useState(false)
  useEffect(() => {
    details && setDetail(details)
  }, [details])

  const [expField, setExField] = useState(false);
  const [modalState, setModalState] = useState(false);
  const manageModalState = (mode) => {
    setModalState(!modalState);
  };
  const { _id } = useParams();

  const closeModalState = () => {
    setModalState(false);
  };

  const [GraceRequest, setGraceRequest] = useState("");

  const isFormValid = () => {
    return newexperience.GraceRequest.isValid ? true : false;
  };

  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "GraceRequest":
        return ValidationFile.validEmpty(inputValue);
      default:
        return false;
    }
  };

  const handleInput = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    let newexperienceData = {
      ...newexperience,
      [inputName]: {
        value: inputValue,
        isValid: validationConfirm(inputValue, inputName),
      },
      validation: isFormValid(),
    };
    setNewexperience(newexperienceData);
  };

  const dispatch = useDispatch();

  const GraceSubmitData = () => {
    return {
      graceDiscription: newexperience.GraceRequest.value,
    };
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setExField(true);
    if (isFormValid()) {
      dispatch(patchGraceData(_id, users._id, GraceSubmitData()));
      closeModalState();
    }
    setGraceRequest("");
  };


  let graceButton = false
  if (detail) {
    if (!graceButton && counter < (detail.estimatedtime - detail.graceStartTime) * 60) {
      graceButton = true
    }
    if (graceButton && counter < detail.graceStopTime * 60) {
      graceButton = false
    }
  }
  const handleRead = () => {
    setReadIns(true)
    setInstructionModal(!instructionModal)
  }
  const closeInstructionModal = () => {
    setInstructionModal(false)
    setReadIns(false)
  }

  useEffect(() => {
    if (examDetail && examDetail.submittedInfo && examDetail.submittedInfo.isInstructionReaded) {
      setInstructionModal(false)
    }
  }, [examDetail])

  return (
    <Fragment>
      {
        instructionModal ? <ExamInstruction onclose={closeInstructionModal} show={instructionModal} readIns={readIns} />
          : ""
      }
      {detail && detail.course ? (
        <div className="question-instruction-section">
          <React.Fragment>
            <div className="question-instruction-first">
              <p className="text-xxs gray w-300 mb-3">
                Start on
                <span className="base">
                  {moment(detail.quizon).format("DD MMM. YYYY h:mm a")}
                </span>
              </p>
              <p className="text-xxs gray w-300">
                Duration
                <span className="base">{detail.estimatedtime} Mins.</span>
              </p>
            </div>
            {detail.graceTime ? (
              <React.Fragment>
                <div className="question-instruction-middle">
                  {/*<div className="gradtimebtnMobileViewChange">*/}
                  <div className="gradtimebtnMobileViewChange">
                    {detail.graceTime && <p className="base red">
                      {`Grace ${moment(detail.quizon).add(detail.graceStartTime, "m").format("h:mm a")} - ${moment(detail.quizon).add(detail.estimatedtime, "m").subtract(detail.graceStopTime, "m").format("h:mm a")}`}
                    </p>}
                    <button
                      className="button button-purple btn-sm"
                      onClick={() => manageModalState()}
                      disabled={
                        !graceButton ||
                        detail.submittedInfo.isRequestAccepted ||
                        detail.submittedInfo.isRequestRejected
                      }
                    >
                      Request Grace Time
                    </button>
                  </div>
                  <div className={`modal modalShowing-${modalState}`}>
                    <div className="modalwrapper">
                      <span
                        className="closeModal text-xxs gray"
                        onClick={() => closeModalState()}
                      >
                        X Close
                      </span>
                      <p className="text-xs w-300">Your test is paused.</p>
                      <p className="text-xxs w-300 mt-30">
                        If you need more time to complete the test, you can
                        request grace time from your assigned teacher. If your
                        request is approved, you will be given extra time.
                      </p>
                      <div className="formFieldwrap mt-10">
                        <FormTextArea
                          label="Description"
                          name="GraceRequest"
                          rows="4"
                          placeholder="Type your reason here."
                          maxLength="250"
                          defaultValue={GraceRequest}
                          onChange={handleInput}
                          onKeyUp={handleInput}
                        />
                        <FormError
                          show={!newexperience.GraceRequest.isValid && expField}
                          error="Type here your genuine reason."
                        />
                      </div>
                      {patchGraceDataLoading ? (
                        <button className="button btn-md button-theme">
                          Sending Request....
                        </button>
                      ) : (
                        <React.Fragment>
                          <button
                            className="button btn-md button-theme btn-sm"
                            type="submit"
                            onClick={handelSubmit}
                          >
                            Send Request
                          </button>
                          <button
                            className="button btn-o-red red btn-sm"
                            onClick={() => closeModalState()}
                          >
                            Cancel
                          </button>
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ) : null}
            <div className="question-instruction-last">
              <p className="text-xxs gray w-300 mb-3">
                Total Questions <span>{detail.questions.length}</span>
              </p>
              <p className="text-xxs gray w-300">
                Max. Marks<span>{detail.totalmarks}</span>
              </p>
            </div>
            <button
              className="button button-purple btn-sm"
              onClick={handleRead}>
              Read Instruction
            </button>
          </React.Fragment>
        </div>
      ) : null}
    </Fragment>
  );
};

export default withTimer(QuestionListSubHeader);
