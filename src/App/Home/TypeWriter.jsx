import React from 'react'
import Typewriter from 'typewriter-effect';

const TypeWriter = () => {

  return (
    <Typewriter
      options={{
        strings: ['<span style="color: #146efa;">Institute,</span>', '<span style="color: #146efa;">School,</span>', '<span style="color: #146efa;">College,</span>', '<span style="color: #14a032;">Coaching,</span>', '<span style="color: #14a032;">Tution,</span>'],
        autoStart: true,
        loop: true,
      }}
    />
  )
}

export default TypeWriter