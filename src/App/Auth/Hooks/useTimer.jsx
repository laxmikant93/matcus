import { useState } from 'react'

/**
 * 
 * @param {*} postfix : Pass a string to associate the string with timer. 
 * @returns This hook returns an array of counter and timmer start method. Tmmer start method take an parameter
 * @default : Default is 's'
 */
export const useDownTimer = (postfix = "s") => {
  const [timerCount, settimerCount] = useState(null);
  // Callback for taking input
  // downtime should be in seconds
  const setTimerCount = (downtime = 60) => {
    let timeInterval;
    let inpuTime = downtime;
    // Set timer count
    if (timerCount === null) {
      settimerCount(inpuTime)
    }

    // Code executing in every one secons
    timeInterval = setInterval(() => {
      inpuTime = inpuTime - 1

      settimerCount(inpuTime)

      // Remove time interval
      if (downtime > 0 && inpuTime < 1) {
        clearInterval(timeInterval)
      }
    }, 1000)

  }

  return [
    `${timerCount}${postfix}`,
    setTimerCount
  ]
}
export default useDownTimer