import React from 'react';
import './timeInput.scss';

const TimeInput = () => {
  return (
    <React.Fragment>
      <div className='timeInput'>
        <input type="time" placeholder="10:00" required="required" />
        <div className='v-line'> </div>
        <div className='select-div'>
          <select name="time" id="time">
            <option value="am">AM</option>
            <option value="pm">PM</option>
          </select>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TimeInput