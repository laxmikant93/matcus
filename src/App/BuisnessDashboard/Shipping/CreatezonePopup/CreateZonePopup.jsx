import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import ValidationFile from '../../../../Classes/ValidationFile'
import CheckboxInput from '../../../../Common/Form/CheckboxInput'
import FormError from '../../../../Common/Form/FormError'
import FormInput from '../../../../Common/Form/FormInput'
import FormTextArea from '../../../../Common/Form/FormTextArea'
import Modals from '../../../../Common/Modals'
import ModalBody from '../../../../Common/Modals/ModalsBody'
import ModalHeader from '../../../../Common/Modals/ModalsHeader'
import RangeSilder from '../RangeSlider/RangeSilder'
import './createzonepopup.scss'
import DeliveryOptions from './DeliveryOptions'
const CreateZonePopup = ({ openpopup, onclose, onCreateZone, selectedZone, zoneIndex, shippingRates }) => {
  const closeModal = () => {
    onclose();
    setRange(0)
    setDeliveryCharge(0)
    setPinCodes([])
    setCreateZoneTab('Distance')
  }
  const [error, setError] = useState(false)
  const [createZoneTab, setCreateZoneTab] = useState("Distance");
  const [range, setRange] = useState(0)
  const [deliveryCharge, setDeliveryCharge] = useState(0)
  const [checked, setChecked] = useState(false)
  const [pinCodes, setPinCodes] = useState([])
  const [pinCode, setPinCode] = useState("")
  const [deliveryPopup, setDeliveryPopup] = useState(false)
  const [selectedDeliveryOptions, setSelectedDeliveryOptions] = useState([])
  const [selectedKeys, setSelectedKeys] = useState([])
  const symbolsArray = ["e", "E", "+", "-", "."]
  useEffect(() => {
    // console.log(selectedZone, zoneIndex)
    if (selectedZone) {
      setCreateZoneTab(selectedZone.ZoneType ? selectedZone.ZoneType : "Distance")
      setRange(parseInt(selectedZone.range) ? parseInt(selectedZone.range) : 0)
      setDeliveryCharge(selectedZone.deliveryCharges ? parseInt(selectedZone.deliveryCharges) : 0)
      setPinCodes(selectedZone.pincodes ? selectedZone.pincodes : [])
      setChecked(selectedZone.restriction ? selectedZone.restriction : false)
    }
  }, [selectedZone, zoneIndex])
  const [pinCodeInputWrapper, setPinCodeInputWrapper] = useState(false);
  const handleCheck = (e) => {
    let checked = e.target.checked
    setDeliveryOptionError(false)
    setError(false)
    if (checked) {
      setChecked(true)
      setDeliveryCharge(0)
      setSelectedDeliveryOptions([])
      setSelectedKeys([])
    } else {
      setChecked(false)

    }
  }
  const handleInput = (e) => {
    setError(false)
    setDeliveryCharge(parseInt(e.target.value))
  }

  const handleSelect = (val) => {
    setDeliveryOptionError(false)
    setSelectedDeliveryOptions(val.selectedItems ? val.selectedItems : [])
    setSelectedKeys(val.key ? val.key : [])
    setDeliveryPopup(val.popup)
  }
  const handleCreateZone = (currentTab) => {
    setCreateZoneTab(currentTab)
  }
  const [deliveryOptionError, setDeliveryOptionError] = useState(false)
  const isFormValid = () => {
    let isValid = false
    if (createZoneTab === "Pincodes") {
      if (pinCodes.length > 0) {
        if (checked) {
          isValid = true
        } else {
          if (ValidationFile.isNotEmpty(deliveryCharge) && selectedDeliveryOptions.length > 0) {
            isValid = true
          }

        }
      }
    } else {
      if (checked) {
        isValid = true
      } else {
        if (ValidationFile.isNotEmpty(deliveryCharge) && selectedDeliveryOptions.length > 0) {
          isValid = true
        }
      }
    }
    return isValid
  }
  const createZone = () => {
    setError(true)
    const formValid = isFormValid()
    if (!checked) {
      if (selectedDeliveryOptions.length > 0) {

      } else {
        setDeliveryOptionError(true)
      }
    }
    if (formValid) {
      if (createZoneTab === "Pincodes") {
        let array = pinCodes
        if (pinCode !== "") {
          array.push(pinCode)
          setPinCodes([...array])
          onCreateZone({
            range: range,
            restriction: checked,
            deliveryCharges: deliveryCharge,
            ZoneType: createZoneTab,
            pincodes: pinCodes,
            key: selectedKeys,
            available_shippings: selectedDeliveryOptions
          })
        } else {
          onCreateZone({
            range: range,
            restriction: checked,
            deliveryCharges: deliveryCharge,
            ZoneType: createZoneTab,
            pincodes: array,
            key: selectedKeys,
            available_shippings: selectedDeliveryOptions
          })
        }
      } else {
        onCreateZone({
          range: range,
          restriction: checked,
          deliveryCharges: deliveryCharge,
          ZoneType: createZoneTab,
          pincodes: pinCodes,
          key: selectedKeys,
          available_shippings: selectedDeliveryOptions
        })
      }
      setRange(0)
      setDeliveryCharge(0)
      setPinCodes([])
      setError(false)
      setCreateZoneTab('Distance')
    }


  }


  const handleDelete = (i) => {
    let array = pinCodes
    array.splice(i, 1)
    setPinCodes([...array])
  }
  const handlePinCode = (e) => {
    let inputValue = e.target.value
    setError(false)
    setPinCode(ValidationFile.spaceNotAccept(inputValue))

  }
  const handleRemove = (e) => {
    // if (!inputValue) {
    // if (key === "Backspace") {
    if (pinCodes.length > 0) {
      handleDelete(pinCodes.length - 1)
    }
    // }
    // }
  }
  const handleSave = (e) => {
    let key = e.key
    setPinCode("")
    let inputValue = e.target.value
    let array = pinCodes
    if (inputValue) {
      if (key === 'Enter') {
        array.push(inputValue)
        setPinCodes([...array])
      }
    }
  }
  const [metaInputWrapper, setMetaInputWrapper] = useState(false);

  const inputelement = useRef(null);
  console.log(inputelement);


  // useEffect(()=>{
  //   inputelement.current.focus();
  // },[])

 const setupPincode = ()=> {
 setPinCodeInputWrapper(!pinCodeInputWrapper)
 inputelement.current.focus()
 }

  return (
    <div>
      <Modals ref={openpopup} Position="center" slide="top" ClosePopUp={() => closeModal()} ModalsSize={'modal-m'}>
        <ModalHeader title={'Create Zones'} />
        <ModalBody className='createZone-body'>
          <div className='createZone-wrapper'>
            <div className='inline align-center create-zone-header-div pT-5 pb-2 '>
              <label className={` labeltab ${createZoneTab === "Distance" ? ' primary' : 'dgray'}`} >
                <input
                  className='mr-10'
                  type="radio"
                  name="distance"
                  onChange={() => handleCreateZone("Distance")}
                  checked={createZoneTab === "Distance"}
                />
                Distance
              </label>

              <label className={`labeltab ${createZoneTab === "Pincodes" ? ' primary' : 'dgray'}`}>
                <input
                  className='mr-10'
                  type="radio"
                  name="pincode"
                  checked={createZoneTab === "Pincodes"}
                  onChange={() => handleCreateZone("Pincodes")}
                />
                Pincodes
              </label>
            </div>

            <div className='distanceRange-wrapper'>
              <span className='text-xxs w-400 dgray pt-3 '>{
                createZoneTab === "Distance" ?
                  "Set a distance range for delivery options."
                  : "Set a range of pincodes for delivery option should visible."
              }</span>
              <div className={`rangeSlider-wrapper ${createZoneTab === "Distance" ? 'active-content' : 'content '}`}>
                <RangeSilder selectRange={(val) => setRange(val)} range={range} />

                <div className='inline align-center set-distance-div pT-30  '>
                  <span className='text-xs w-400 base '>Distance in Kilometeres (Km)</span>
                  <div className="formFieldwrap">
                    <FormInput
                      type="number"
                      onChange={(e) => setRange(e.target.value)}
                      onKeyUp={(e) => setRange(e.target.value)}
                      id="shipping_name"
                      name="title"
                      value={range}
                      placeholder="eg : 10km "
                      maxLength="80"
                      onKeyDown={(e) =>
                        symbolsArray.includes(e.key) && e.preventDefault()
                      }
                    />
                  </div>
                </div>
              </div>
              <div className={`rangeSlider-wrapper ${createZoneTab === "Pincodes" ? 'active-content' : 'content '}`}>
                <div className='pincode-input-wrapper mt-25'>
                  {/* <FormTextArea
                    type="text"
                    name="Message"
                    rows="4"
                    placeholder="e.g., 110059"
                  /> */}
                  <div className={`meta-keywords-wrapper ${metaInputWrapper ? 'meta-keywords-border' : ''}`}
                    // className={`meta-keywords-wrapper meta-keywords-border`}
                    onClick={setupPincode}>


                    {/* <p className="placeholder  text-xxs w-300">Enter meta keywords</p>
                      <p className="text-xxs w-500 base" > hello people</p> */}
                    <div className="meta-keywords-wrap">
                      {
                        pinCodes.length > 0 ? pinCodes.map((options, key) => (
                          <div className="chips-container" >
                            <div role={'button'} onClick={() => handleDelete(key)} className="chip-button"><span className="chip-name">{options}</span> <i className="icon-chipCross "></i></div>
                          </div>
                        )) : ""
                      }
                      <div className="input-container">
                        <input
                         autoFocus={true}
                          type="number"
                          placeholder="e.g., 110059"
                          value={pinCode} onChange={handlePinCode}
                          onKeyUp={handlePinCode}
                          onKeyDown={(e) => e.key === "Enter" ? handleSave(e) : e.key === "Backspace" && !e.target.value && handleRemove(e)}
                          name="meta_input" className="meta-keyword-input"
                          ref={inputelement}
                        />
                      </div>

                    </div>
                  </div>
                  <p className='text-2xs w-400 lgray mt-3 mb-3'>Seperate different Pincodes using ”,”. For eg.- 110059, 110069, 110080 etc</p>
                  <FormError show={error && !pinCodes.length} error={pinCode ? "Press enter button to save pincode." : "Pin Codes required."} />

                </div>









              </div>
              <div className='shipping-item-chid-div mt-20'>
                <div className='shippingBox-checkbox-wrap'>
                  <CheckboxInput
                    label={"Shipping not available for this zone"}
                    LabelClass={`text-2xs  shippingaviablelabel  ${checked ? 'base w-500' : 'gray w-400 '}`}
                    className={"shipping-checkbox"}
                    checked={checked}
                    onChange={(e) => handleCheck(e)}

                  />
                </div>
                <div className='dilvery-charge-input-wrapper mt-15'>
                  <div className='formFieldwrap'>
                    <FormInput
                      type="number"
                      placeholder={checked ? 'NA' : ''}
                      className={`dilvery-charge-input`}
                      label="Extra Delivery Charges"
                      labelPosition={'top'}
                      value={deliveryCharge === 0 ? "" : deliveryCharge}
                      onChange={handleInput}
                      onKeyUp={handleInput}
                      onKeyDown={(e) =>
                        symbolsArray.includes(e.key) && e.preventDefault()
                      }
                      disabled={checked ? true : false}
                    />
                    {
                      checked ? '' : <span className='ruppe-symbol-text'>&#8377;</span>
                    }
                    <FormError show={error && !checked && !deliveryCharge} error="Delivery Charge required." />
                  </div>

                  {/* <span className='ruppe-symbol-text'>&#8377;</span> */}

                  <DeliveryOptions deliveryOptionError={deliveryOptionError} shippingRates={shippingRates} checked={checked} onSelectOptions={handleSelect} selectedZone={selectedZone} />


                </div>


                <button className='button button-primary btn-xs mt-8' onClick={createZone}>{zoneIndex ? "Update" : "Create"}</button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modals>
    </div>
  )
}

export default CreateZonePopup