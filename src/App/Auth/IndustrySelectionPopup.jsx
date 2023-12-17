import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import AppLink from '../../Common/AppLink';
import FormInput from '../../Common/Form/FormInput';
import Modals from '../../Common/Modals';
import ModalsBody from '../../Common/Modals/ModalsBody';
import ModalsHeader from "../../Common/Modals/ModalsHeader";
import './industrySelectionPopup.scss'

const IndustrySelectionPopup = ({ onclose, createref, handleTick }) => {

  const closeModal = () => {
    onclose();
  }
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedCategoryId, setSelectedCategoryId] = useState("")
  const listData = [
    {
      id: 1,
      text: "Kirana Store & Grocery",
      icon: 'kirana'
    },
    {
      id: 2,
      text: "Fashion Apparels, Shoes & Accessories",
      icon: 'fashion'
    },
    {
      id: 3,
      text: "Home Decor",
      icon: 'home'
    },
    {
      id: 4,
      text: "Gift Shop",
      icon: 'gift'
    },
    {
      id: 5,
      text: "Fruit & Vegetables",
      icon: 'fruit'
    },
    {
      id: 6,
      text: "Books & Stationery Products",
      icon: 'books'
    },
    {
      id: 7,
      text: "Electronics",
      icon: 'electronics'
    },
  ]
  const handleClick = (text, id) => {
    setSelectedCategory(text)
    setSelectedCategoryId(id)
  }

  useEffect(() => {
    if (selectedCategoryId) {
      handleSave();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoryId])

  const handleChange = (e) => {
    let inputValue = e.target.value
    setSelectedCategory(inputValue)
  }
  const handleBlank = () => {
    setSelectedCategory("")
  }
  const handleSave = () => {
    handleTick(selectedCategory)
    closeModal()
  }
  return (

    <Modals ref={createref} Position="center" slide="center" ClosePopUp={() => closeModal()} ModalsSize={'modal-s'}>
      <ModalsHeader title='Choose business category' />
      <ModalsBody >
        <div className='industry-container'>
          <div className='industry-body-wrapper '>

            {
              listData.map((list) => {
                return (
                  <div className={`list-wrapper cursor-pointer`} key={list.id} onClick={() => handleClick(list.text, list.id)}>
                    <div className='industry-leftside'>
                      <div className='industry-circle'>
                        <i className={`icons ${list.icon} ${selectedCategory === list.text ? "activeIcon" : ""} `}></i>
                      </div>
                    </div>
                    <div className='industry-rightside' >
                      <p className={`text-xs w-400 base capitalize ${selectedCategory === list.text ? "selectActive" : ""}`}>{list.text}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className='industry-selection-bottom'>
            <hr className='hr' />
            <p className='text-xs w-500 primary'>Business category is not listed</p>
            <div className='industry-input-div mt-10'>
              <div className="formFieldwrap industry-input ">
                <FormInput
                  type="text"
                  // label="name"
                  value={selectedCategory}
                  onChange={handleChange}
                  onKeyUp={handleChange}
                  id="business category"
                  name="business_category"
                  placeholder="Enter your business category"
                  maxLength="80"
                />
              </div>
              <div className='businessbtn-div'>
                <div className='btn-circle' onClick={handleBlank}>
                  <i className='icons cross'></i>
                </div>
                <div className={`btn-circle  ${selectedCategory ? "btn-circle-active" : ""}`} onClick={handleSave}>
                  {
                    selectedCategory ? (<i className='white'>&#10003;</i>) : (<i> &#10003;</i>)
                  }
                </div>
              </div>
            </div>
          </div>

        </div>
      </ModalsBody>
    </Modals>
  )
}

export default IndustrySelectionPopup