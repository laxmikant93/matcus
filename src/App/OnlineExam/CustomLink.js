import React from 'react'


const CustomLink = ({ title, onChildClick }) => {
  return <li className="text-xxs gray w-300 buttonbreadcrumb">
    <button className="btnText " onClick={onChildClick}>{title}</button>
  </li>
}


export default CustomLink
