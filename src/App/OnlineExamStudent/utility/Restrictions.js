import React, { useState, useEffect } from 'react'
import WarningModal from './WarningModal';
import { useSelector, useDispatch } from 'react-redux';
import AppLinkUrl from "../../../Common/AppLink/AppLinkUrl";
import { UserToken, Userid } from "../../../Common/UserElement";
import {
  patchSubmitExam,
  patchExamAnswer,
  resetWarningTimer,
  updateTimer
} from "../../../store/actions/onlineexamstudent";

let windowSwitch = [];
let warningCount = 0;

function Restriction({ examid, hideWarning, payload }) {

  const userToken = UserToken()
  const userId = Userid()
  const dispatch = useDispatch()
  const { submitId, accessibilityMode } = useSelector(state => {
    return {
      submitId: state.onlineexamstudent.detail.submittedInfo._id,
      accessibilityMode: state.onlineexamstudent.detail.accessibilityMode,
      questions: state.onlineexamstudent.attemptedQuestion.data.questions
    }
  })


  // LOCAL STATE
  const [data, setData] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [fire, setFire] = useState(false)
  const [warningModal, setWarningModal] = useState(false)


  // INITIATE COMPONENT
  useEffect(() => {
    handleRightClick()
    handleHistoryData()
    handleButtonEvent()
    let observer
    if (!hideWarning) {
      observer = setInterval(() => {
        if (!document.fullscreenElement && !warningModal) {
          autoTerminate()
          showWarningModal()
        }
      }, 1000)
    }
    return () => {
      clearInterval(observer)
      warningCount = 0
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // AUTO TERMINATE EXAM 
  const autoTerminate = () => {
    if (accessibilityMode === "Strict" && warningCount === 1) {
      dispatch(patchSubmitExam(submitId, { isTerminated: true, payload, endExam: new Date() }));
    } else if (accessibilityMode === "Moderate" && warningCount === 5) {
      dispatch(patchSubmitExam(submitId, { isTerminated: true, payload, endExam: new Date() }));
    }
  }


  // UPDATE COMPONENT
  useEffect(() => {
    if (loaded) {
      fetch(
        `${AppLinkUrl.getApiBaseUrl()}exam/examInfoForStudent?examid=${examid}&studentid=${userId}`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: userToken,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => dispatch(updateTimer(data)))
        .then(windowSwitch.push(new Date()))
        .then(dispatch(patchExamAnswer(submitId, { windowSwitch })))
        .then(showWarningModal())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examid, loaded, dispatch, userId, userToken])


  // MONITOR USER ACTIVITY 
  const handleUserActivity = () => {
    if (!loaded && document.visibilityState === "visible") {
      setData(true)
    }
    if (!data && document.visibilityState === "hidden") {
      setData(true)
      setLoaded(true)
    }
  };
  document.addEventListener("visibilitychange", handleUserActivity, false);


  // DISABLE BACK BUTTON
  const handleHistoryData = () => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  }


  // DISABLE MOUSE RIGHT CLICK 
  const handleRightClick = () => {
    document.addEventListener(
      "contextmenu",
      function (e) {
        e.preventDefault();
      },
      false
    );
  }

  // DISABLE DOUBLE CLICK
  document.addEventListener('dblclick', function (event) {
    event.preventDefault();
    event.stopPropagation();
  }, true);


  // DISABLE BUTTON EVENTS 
  const handleButtonEvent = () => {
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "F1" ||
        e.key === "F2" ||
        e.key === "F3" ||
        e.key === "F4" ||
        e.key === "F5" ||
        e.key === "F6" ||
        e.key === "F7" ||
        e.key === "F8" ||
        e.key === "F9" ||
        e.key === "F10" ||
        e.key === "F11" ||
        // e.key === "F12" ||
        e.key === "Escape" ||
        (e.ctrlKey && e.key === "R") ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "J")
      ) {
        e.preventDefault()
        e.stopPropagation();
        showWarningModal()
        windowSwitch.push(new Date())
      }
    });
  }

  if (warningModal && !fire && !loaded) {
    setFire(true)
    dispatch(patchExamAnswer(submitId, { startWarningCounter: true }));
  }

  // SHOW WARNING POPUP
  const showWarningModal = () => {
    setWarningModal(true)
  }


  // HIDE WARNING POPUP
  const hideWarningModal = () => {
    setFire(false)
    setWarningModal(false)
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      warningCount = warningCount + 1
    }
    dispatch(resetWarningTimer())
    dispatch(patchExamAnswer(submitId, { warningCount, startWarningCounter: false }))
  }


  return (
    <>
      {warningModal && <WarningModal show={warningModal} warningCount={warningCount} hideWarningModal={hideWarningModal} />}
    </>
  )

}


export default Restriction