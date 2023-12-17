import React from 'react'
import './addNewElement.scss';
const AddNewElement = ({ onClick, title }) => {
  return (
    <div className='addNew-container'>
      <div className="foodmenu-wrapper" >
        <button type='button' className='drapbutton' onClick={onClick}>
          <i className='ed-icon icon-plus-add primary  i-xs mr-2'></i>
          {title ? title : 'Add a new Collection'}
        </button>
      </div>
    </div>
  )
}

export default AddNewElement