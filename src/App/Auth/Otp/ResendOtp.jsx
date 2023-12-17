/* eslint-disable no-unused-vars */
import { string, bool } from 'prop-types';
import React, { useState, useEffect } from 'react';
import useSendOtp from '../Hooks/useSendOtp';
import useDownTimer from '../Hooks/useTimer';

const ResendOtp = ({ children, mobile, countrycode, autoStart }) => {

  const mainText = "Haven't received the OTP yet?"; // Main text
  const timerText = "You can request a new one in"; // Secondary text to show with timer
  const resentOtpText = "Haven't received the OTP yet? Request new OTP"; // Request OTP action
  const retryOtpText = "Failled !! Retry"; // Request OTP action
  const timerCount = 60; // Default is 60

  const [autoStartTimer, setAutoStartTimer] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [isLoading, isError, isSuccess, errorMessage, sendOtp] = useSendOtp()
  const [counttime, startTime] = useDownTimer();


  // Show timmer action
  const timmerAction = React.useCallback(function () {
    setShowTimer(true) // Show timmer
    startTime(timerCount) // Timmer will start from 60
  }, [startTime]);


  // Resend OTP action
  const requestNewOtp = React.useCallback(function () {
    sendOtp(countrycode, mobile) // Executing send OTP action
    timmerAction()
  }, [countrycode, mobile, sendOtp, timmerAction]);

  // Auto start time, while OTP enter input is visible to user
  useEffect(() => {
    if (autoStartTimer !== autoStart) {
      timmerAction()
      setAutoStartTimer(autoStart)
    }

  }, [autoStartTimer, requestNewOtp, autoStart, timmerAction])


  // Hide timer and related text
  useEffect(() => {
    if (counttime === "1s") {
      setShowTimer(false)
    }
  }, [counttime])

  // Reset all variables
  useEffect(() => {
    return () => {

      setAutoStartTimer(false)
      setShowTimer(false)
    }
  }, [])

  // when mobile is not available
  // when mobile is incorrect
  if (!mobile || mobile.length < 9) {
    return <React.Fragment></React.Fragment>
  }



  // child component rendering
  if (children) {
    return children({
      mainText,
      timerText,
      resentOtpText,
      timerCount: counttime,
      showTimer,
      resendAction: requestNewOtp,
      loading: isLoading,
      error: isError,
      success: isSuccess
    })
  }



  return (
    <div>
      {
        showTimer ?
          <div className='text-xxs'>
            {mainText}
            <br />
            {timerText} <span className="text-red">{counttime}</span>
          </div>
          :
          isError ?
            <button type="button" className="btnText primary" onClick={() => requestNewOtp()} name="resend">{retryOtpText}</button>
            :
            <button type="button" className="btnText primary" onClick={() => requestNewOtp()} name="resend">{resentOtpText}</button>
      }
    </div>
  )
}

ResendOtp.defaultProps = {
  mobile: undefined,
  showTimer: false
}

ResendOtp.propTypes = {
  mobile: string.isRequired,
  showTimer: bool
}

export default ResendOtp
