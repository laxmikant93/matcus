import React, { useEffect, useRef, useState } from 'react';
import './dropDown.scss';

const TrueThemeDropDown = ({ name, options, handleFilters, status }) => {
  const [opendrop, setOpendrop] = useState(false);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (status) {
      setSelected(status);
    }
  }, [status]);

  const selectionHandler = (name, opt) => {
    setSelected(opt);

    handleFilters(name, opt);
  };

  const handleOpenDropDown = () => {
    setOpendrop(opendrop => !opendrop)
  }

  // define mutable val in .current object
  const ref = useRef(null);
  // Track events outside scope
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpendrop(false);
    }
  };

  // Do something after component renders
  const handleShowValue = () => {
  
  }

  return (
    <React.Fragment>
      <div className="theme-dropdown">
        <p className='DropDownHeading' ref={ref} onClick={handleOpenDropDown}>

          <span className='heading'>{selected ? selected : name}</span>
          {/* <span className='selected-value'>{selected}</span> */}
          <span><i className={`icon-openIcon icons icons-s ${opendrop ? "rotate-icon" : ""}`}></i></span></p>
        <div className={`dropdown-content ${opendrop ? "dropdown-show" : ""}`}>
          <ul>
            {
              options && options.length > 0 && options.map((opt, index) => {
                return (
                  // <React.Fragment >
                  <li
                    value={opt}
                    name={opt}
                    onClick={() => { selectionHandler(name, opt) }}
                    key={index}
                  >
                    {opt}
                  </li>
                  // </React.Fragment>
                )
              })
            }
          </ul>
        </div>
      </div>
    </React.Fragment >
  )
}

export default TrueThemeDropDown