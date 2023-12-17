import React, { useState, useRef, useEffect } from 'react';
import ArrowDown from '../assets/icons/arrow-down.svg';
import './eDropdown.scss'

const EDropdown = ({ menuName, menuOptions, selectOption }) => {
  const [openDrop, setOpenDrop] = useState(false);
  const handleClick = () => {
    setOpenDrop(current => !current);
  }
  // define mutable val in .current object
  const node = useRef();
  // Track events outside scope
  const clickOutside = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click

    setOpenDrop(false)
  }

  // Do something after component renders
  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);

    // clean up function before running new effect
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    }
  }, [openDrop])


  return (
    <React.Fragment>
      <div class="dropdown">
        <button ref={node} class="dropbtn" onClick={handleClick}> {menuName}
          <span>
            <img src={ArrowDown} width="10px" height="10px" alt=""
              className={` ${openDrop ? 'rotate-arrow' : ''}`} />
          </span>

        </button>
        <ul className={`dropdown-content  ${openDrop ? 'show-option' : ''}`}>
          <button key={-1} onClick={() => selectOption('all')} className="dropDown-list">{"All"}</button >
          {
            menuOptions.length > 0 ? menuOptions.map((option, index) => {
              return (
                <button key={index} onClick={() => selectOption(option)} className={'dropDown-list'}>{option}</button>
              )
            }) :
              <p className='text-regf w-400 dropDown-no-list'>No List found</p>

          }
        </ul>
      </div>


    </React.Fragment >
  )
}

export default EDropdown