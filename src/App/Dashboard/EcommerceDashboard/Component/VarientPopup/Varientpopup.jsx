import React, { useState } from 'react'
import { useRef } from 'react';
import CheckboxInput from '../../../../../Common/Form/CheckboxInput';
import UseOutsideClick from '../../../../../Common/UseOutsideClick';
import EDropDownShowMore from '../EDropDownShowMore';
import './varientPopup.scss';

const Varientpopup = () => {
  const dropdownRef = useRef(null);
  const [showDropColl,setShowDropColl] = useState(false);
  const handlePopup = ()=> {
    setShowDropColl(!showDropColl)
  }

const dropDownValue = [
  {
  id:1,
  value: 'black'
},
{
  id:2,
  value: 'green'
},
{
  id:3,
  value: 'blue'
},
{
  id:4,
  value: 'red'
},
{
  id:5,
  value: 'pink'
},

]

  return (
    <div className='varientPopup-container'>
          <div className='varientpop-wrapper'>
            <button className={`filter-dropDown-btn ${showDropColl ? 'btn-border-active' : '' }`} onClick={handlePopup}>
              <span className={`text-2xs w-500 base ${showDropColl? 'primary':''}`}>Filter by</span><i className={`ed-icon icon-arrowd   base ${showDropColl ? 'icon-rotate' : '' }`}></i>
              </button>
              <div className={`dropDown-content ${showDropColl ? 'displayShow' : ''}`}  >
              {
               dropDownValue.map(({id,value})=> (
                <div className='filter-option-wrap'>
                <CheckboxInput
                 label={value}
                 multiLoop={true}
                 LabelClass={"label-heading eComm-checkbox-center label-heading-margin"}
                 className={"eComm-checkbox"}
                />
              </div>
               ))
 
                   }
                <div className='filter-option-btn-wrap text-center'>
                  <button className='button button-primary btn-xs btn-block btn-oval'>Apply</button>
                </div>
             </div>
         </div>
    </div>
  )
}

export default Varientpopup