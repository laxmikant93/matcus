import React from 'react';
import './tabs.scss';

const Tabs = ({ toggleState, handleToggleState }) => {
  return (
    <React.Fragment>
      <div className='tab-head'>
        <div className={`tab ${toggleState === 1 ? 'active-tab' : ''}`} onClick={() => { handleToggleState(1) }}>Upload Media</div>
        <div className={`tab ${toggleState === 2 ? 'active-tab' : ''}`} onClick={() => { handleToggleState(2) }}>Unsplash</div>
        {/* <div className={`tab ${toggleState === 3 ? 'active-tab' : ''}`} onClick={() => { handleToggleState(3) }}>Pixabay</div> */}
        <div className={`tab ${toggleState === 4 ? 'active-tab' : ''}`} onClick={() => { handleToggleState(4) }}>My Files</div>

      </div>
    </React.Fragment>
  )
}

export default Tabs