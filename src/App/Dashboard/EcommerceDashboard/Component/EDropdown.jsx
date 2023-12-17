import React, { useState, useRef, useEffect, forwardRef } from 'react';
import ArrowDown from '../assets/icons/arrow-down.svg';
import ArrowDownLine from '../assets/icons/arrowThin.svg'
import './eDropdown.scss'
import { useDetectOutsideClick } from '../../../../Common/DetectOutsideClick/useDetectOutsideClick';

// const EDropdown = forwardRef(
//   ({  name, id, type, value, label, children, className, ...props }, ref) => {
//     // const { user } = useSelector((state) => {
//     //   return {
//     //     user: state.user,
//     //   };
//     // });
// const [focusLabel, setFocusLabel] = useState(false)
const EDropdown = ({ menuName, menuOptions, className, arrow, otherClass, selectOption }) => {
  const dropdownRef = useRef(null);
  const [openDrop, setOpenDrop] = useDetectOutsideClick(dropdownRef, false);
  const handleClick = () => {
    setOpenDrop(current => !current);
  }
  // define mutable val in .current object


  // Track events outside scope
  // const clickOutside = (e) => {
  //   if (node.current.contains(e.target)) {
  //     // inside click
  //     return;
  //   }
  //   // outside click

  //   setOpenDrop(false)
  // }

  // Do something after component renders
  // useEffect(() => {
  //   document.addEventListener('mousedown', clickOutside);

  //   // clean up function before running new effect
  //   return () => {
  //     document.removeEventListener('mousedown', clickOutside);
  //   }
  // }, [openDrop])


  return (
    <React.Fragment>
      {/* <div className="cstmSelectWrap"> */}
      {/* <div className={`dropdown ${(focusLabel || value) && "caretup"}`}>
        <div className={`dropdown ${focusLabel === true ? "up" : ""} ${(focusLabel || value) && "caretup"}`}>
          <select
            className={`select-control ${className}`}
            value={value}
            name={name}
            onBlur={() => setFocusLabel(false)}
            id={id}
            onFocus={() => setFocusLabel(true)}
            {...props}
          >
            {children}
          </select>
          <label className={`animLabel ${(label && value) || (focusLabel) ? "show" : "hide"}`} htmlFor={id}>
            {label}
          </label>
        </div> */}
      {/* </div> */}
      <span><img src={arrow ? ArrowDownLine : ArrowDown} width="8px" height="8px" alt="arrow icon" className={`${openDrop ? 'rotate-arrow' : ''}`} /></span>

      <div class="dropdown">
        <button ref={dropdownRef} className={`dropbtn  ${otherClass} ${openDrop ? '' : className}`} onClick={handleClick}><span>{menuName} </span> <span>{arrow ? <i className={`icons  arrowLine ${openDrop ? 'rotate-arrow icons-bg-color ' : ''}`}></i> : <span className={`icons icons-bg-blue arrowThick ${openDrop ? 'rotate-arrow ' : ''}`}></span>}</span> </button>
        <ul className={`dropdown-content  ${openDrop ? 'show-option' : ''}`}>
          <li key={-1} onClick={() => { selectOption('all') }} >{"All"}</li>
          {
            menuOptions?.length > 0 ? menuOptions.map((option, index) => {
              return (
                <li key={index} onClick={() => { selectOption(option) }} >{option}</li>
              )
            }) :
              <p className='text-regf w-400 dropDown-no-list'>No List found</p>

          }
        </ul>
      </div>
    </React.Fragment >
  )
}
// )
export default EDropdown