import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useDetectOutsideClick } from '../../../../Common/DetectOutsideClick/useDetectOutsideClick';
import FormError from '../../../../Common/Form/FormError';
import './createzonepopup.scss'


const DeliveryOptions = ({ shippingRates, onSelectOptions, selectedZone, checked, deliveryOptionError }) => {
  const openref = useRef(null);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const handleOpenDrop = () => {
    setOpenDropDown(!openDropDown)

  }
  const handleSelect = (item, key) => {
    let array = selectedOptions
    let itemArray = selectedItems
    if (selectedOptions.includes(key)) {
      let index = array.indexOf(key)
      let indexItem = array.indexOf(item)
      array.splice(index, 1)
      itemArray.splice(indexItem, 1)
    } else {
      array.push(key)
      itemArray.push(item)
    }
    setSelectedOptions([...array])
    setSelectedItems([...itemArray])
  }
  useEffect(() => {
    if (selectedZone) {
      setSelectedItems(selectedZone.available_shippings ? selectedZone.available_shippings : [])
      setSelectedOptions(selectedZone.key ? selectedZone.key : [])
    }
  }, [selectedZone])
  // useEffect(() => {

  // }, [selectedItems, selectedOptions])
  useEffect(() => {
    if (checked) {
      setSelectedItems([])
      setSelectedOptions([])
    }
  }, [checked])
  const handleApply = () => {
    onSelectOptions({
      key: selectedOptions,
      selectedItems: selectedItems,
      popup: openDropDown
    })
    setOpenDropDown(false)
  }
  return (
    <React.Fragment>

      <div className='categoryContainer '>
        <p className='base delivery-text-lable'>Select Delivery Options</p>
        <div className="category-dropdown mb-4 ">
          <button className="categoryDropDpwn-btn" onClick={handleOpenDrop} disabled={checked}>
            {selectedItems.length > 0 ? `${selectedItems.length} Selected` : "Select Delivery Option"}
            <i className={`icon-openIcon icons icon-dropdown icons-s ${openDropDown ? 'rotate-icon' : ''}`}> </i> </button>
          <div className={`dropdown-content shipping-dropndown-content ${openDropDown ? '' : 'displayShow '}`} ref={openref}>
            <React.Fragment>
              {
                shippingRates.length > 0 ? (
                  shippingRates.map((item, key) => {
                    return (
                      <>
                        <ul
                          key={key}
                        // onClick={() => handleSelect(item, key)}
                        >

                          <li className="shippinglist-li" onClick={() => handleSelect(item, item.key)}>
                            <div className='shipping-list-wrap'>
                              <div className='shipping-chebox-wrap'>
                                <input
                                  // label="Select Delivery Options"
                                  type="checkbox"
                                  name={item.categoryName}
                                  value={item._id}
                                  checked={selectedOptions.includes(item.key)}
                                  // checked={category.includes(item._id)}
                                  // onChange={() => handleSelect(item, item.key)}
                                  className="base"
                                />
                                <p className='text-xs w-400 base'>{item.shipping_option_name}</p>
                              </div>

                              <div className='shipping-rate-wrap'  >
                                <p className='text-xs w-400 gray'>{item.rate}</p>
                              </div>
                            </div>
                          </li>

                        </ul>

                      </>
                    )

                  })


                ) : "No Found."

              }
              {/* make it true in disable state  */}
              <div className='apply-btn-wrap' aria-disabled={selectedOptions.length === 0} onClick={handleApply}>
                <button className='button button-primary btn-block btn-2xs btn-oval'>Apply</button>
              </div>
            </React.Fragment>
          </div>

        </div>
        <FormError show={deliveryOptionError} error="Delivery Option required." />
      </div>
    </React.Fragment>
  )
}
export default DeliveryOptions