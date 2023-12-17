
import React, { useRef } from 'react'
import "./styles.css";
import Modal from "./DemoModal";

const DemoModal = () => {
  const modal = useRef(null)
  return (
    <>
      <div className='App mt-90'>
        <button onClick={() => modal.current.open()}>ascaacs</button>
      </div>
      <Modal ref={modal}>x cnjsnddncujnds</Modal>
    </>
  )
}

export default DemoModal


