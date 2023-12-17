import React from 'react';
import './selectDropDownContainer.scss';

const SelectdropDownContainer = ({ values, onChange }) => {

  const handleOnSelect = (val) => {
    onChange(val);
  }

  return (
    <div className='selectdropDowncontainer-container'>
      <ul >
        {
          values.map((value, key) =>
            <li onClick={() => handleOnSelect(value)} key={key}>{value}</li>
          )
        }

      </ul>
    </div>
  )
}

export default SelectdropDownContainer