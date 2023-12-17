import React from 'react';
import './messageDisplay.scss';

const MessageDisplay = ({ type, text }) => {
  return (
    <div className='message-wrap'>
      <div className='message-container'>
        <div className={`message ${type === 'success' ? 'message-success' : type === 'error' ? 'message-error' : ''} `}>
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}

export default MessageDisplay