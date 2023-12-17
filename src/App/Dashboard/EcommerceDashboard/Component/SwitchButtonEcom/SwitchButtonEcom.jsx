import React from 'react';
import './switchButton.scss';

const SwitchButtonEcom = ({ id, InputChange, isFeatured }) => {
  return (

    <React.Fragment >
      <div className='switch-container'>
        <div className='switch-div'>
          <input type="checkbox" id={id} checked={isFeatured} onChange={InputChange} /><label for={id}>Toggle</label>
        </div>
      </div>
    </React.Fragment >
  )
}

export default SwitchButtonEcom