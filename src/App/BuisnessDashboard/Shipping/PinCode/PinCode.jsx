import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import FormInput from '../../../../Common/Form/FormInput';
import DeleteConfirmPop from '../../../Dashboard/EcommerceDashboard/Component/DeleteConfirmPop/DeleteConfirmPop';
import EcomToast from '../../../Dashboard/EcommerceDashboard/Component/EcomToast/EcomToast';
// import Toast from '../../../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/CommonComponent/CommonJsx/Toast/Toast';
import CreateZonePopup from '../CreatezonePopup/CreateZonePopup';
import ShoppingCard from '../ShoppingCard/ShoppingCard';
import './pinCode.scss';
import ShippingDeletepopup from './ShippingDeletepopup/ShippingDeletepopup';

const PinCode = ({ shippingRates, onLoadZoneList, isAddCountryOpen }) => {
  const openpopup = useRef(null);
  const symbolsArray = ["e", "E", "+", "-", "."]
  const { user, singleShipping, singleShippingSuccess } = useSelector((state) => {
    return {
      countries: state.countries,
      user: state.user,
      singleShipping: state.shipping.single.data,
      singleShippingSuccess: state.shipping.single.success,
    }
  });
  const [showPopUpMessage, setShowPopUpMessage] = useState("")
  const onOpenRejectOrder = () => {
    if (shippingRates.every((item) => item.shipping_option_name !== "" && item.shipping_title !== "" && item.estimated_delivery_time !== "" && item.rate !== "")) {
      openpopup.current.open()
    } else {
      setShowPopUpMessage("Fill all shipping Rate details.")
      setTimeout(() => {
        setShowPopUpMessage("");
      }, 2000);
    }
  }
  const onCloseRejectOrder = () => {
    openpopup.current.close()
    setSelectedZone({})
    setZoneIndex("")
  }
  const [pinCode, setPinCode] = useState("")
  const handlePinCode = (e) => {
    let value = e.target.value
    setPinCode(parseInt(value))
  }
  // open create zone
  const [createZone, setCreateZone] = useState(false)
  const [zoneList, setZoneList] = useState([])
  const handleCreateZone = (val) => {
    let array = zoneList
    if (zoneIndex !== "") {
      let data = array.map((item, i) => i === zoneIndex ? val : item);
      setZoneList([...data])
      setZoneIndex("")
    } else {
      array.push(val)
      setZoneList([...array])
    }
    onCloseRejectOrder()
  }

  const [deleteId, setDeleteId] = useState("")
  const handleDeleteZone = (key) => {
    openDeletepop.current.open()
    setDeleteId(key)
  }
  const deleteZone = () => {
    let array = zoneList
    array.splice(deleteId, 1)
    setZoneList([...array])
    openDeletepop.current.close()
  }
  const [selectedZone, setSelectedZone] = useState({})
  const [zoneIndex, setZoneIndex] = useState("")
  const editZone = (item, index) => {
    setSelectedZone(item)
    setZoneIndex(index)
    onOpenRejectOrder()
  }

  useEffect(() => {
    onLoadZoneList({
      zoneList: zoneList,
      pinCode: pinCode
    })
  }, [pinCode, zoneList])
  useEffect(() => {
    if (singleShippingSuccess && singleShipping) {
      setZoneList(singleShipping.Zones)
      if (singleShipping?.Zones?.length > 0) {
        setCreateZone(true)
      }
      setPinCode(singleShipping.Store_pincode)
    }
  }, [singleShipping, singleShippingSuccess])
  useEffect(() => {
    if (!isAddCountryOpen) {
      setZoneList([])
    }
  }, [isAddCountryOpen])

  
  const openDeletepop = useRef()
  return (
    <div className='pinCode-section'>
      {showPopUpMessage && <EcomToast text={showPopUpMessage} />}
      <ShoppingCard>

        <div className='inline between-xs between-lg align-center  pincode-section-div  '>
          <span className='text-shippingCountry w-500 base'>Pincode / Distance based delivery</span>

          {
            zoneList.length > 0 ? <button className='button button-primary btn-xs' onClick={() => { onOpenRejectOrder() }}>Create another zone</button> :
              <React.Fragment>
                {
                  createZone ?

                    <button className='button btn-o-gray btn-xs ' onClick={() => { setCreateZone(false) }}>Cancel</button> :

                    <button className='button button-primary  btn-xs' onClick={() => { setCreateZone(true) }}>Setup</button>
                }
              </React.Fragment>
          }



          {

            /* <button className='button button-primary btn-xs '>Create another zone</button> */
          }

        </div>

        {
          createZone && (
            <>
              <hr className='divider' />
              <div className='pincode-createZone-wrapper'>
                <div className='inline align-center mt-15 mb-15 address-pincode-wrapper'>
                  <p className='text-xs w-500 base'>Your Store Address Pincode <span className='red'>*</span></p>
                  <FormInput
                    placeholder="e.g., 110059"
                    onChange={handlePinCode}
                    onkeyUp={handlePinCode}
                    value={pinCode}
                    type="number"
                    onKeyDown={(e) =>
                      symbolsArray.includes(e.key) && e.preventDefault()
                    }
                  />
                </div>
                <hr className='divider' />
                {/* this section will be hide when zone is created */}
                {zoneList.length > 0 ? "" : <div className='pincodeOpenzone'>
                  <span className='text-xs w-500 base'>Create Zones</span>
                  <p className='text-xxs w-400 gray '>Set an area where you want to restrict or add your delivery services</p>
                  <button className='button button-primary btn-xs mt-25' onClick={() => { onOpenRejectOrder() }}
                  // disabled={shippingRates.every((item) => item.shipping_option_name !== "") ? false : true}
                  >Create a zone</button>

                </div>}
                {
                  <CreateZonePopup shippingRates={shippingRates} openpopup={openpopup} onclose={onCloseRejectOrder} onCreateZone={handleCreateZone} selectedZone={selectedZone} zoneIndex={zoneIndex} />
                }
                {zoneList.length > 0 && <div className='showPincodedetails-container'>
                  <div className="gridListTable ">
                    <ul className="gridHeader ">
                      <React.Fragment>
                        <li className=" col col-3"></li>
                        <li className=" col col-2 text-xs w-500">Area by </li>
                        <li className=" col col-3 text-xs w-500 ">Distance/Pincode</li>
                        <li className="col col-3 text-xs w-500 ">Delivery Charges</li>
                        <li className="col col-1 text-xs w-500 "></li>
                      </React.Fragment>
                    </ul>

                    <div className='gridBody varients-after-grid-body '>
                      <div className='gridRow varients-grid-row'>
                        {
                          zoneList.length > 0 ?
                            zoneList.map((item, key) => {
                              return (
                                <ul className="topInfo" >
                                  <li className='col-3'>
                                    <div className='zone-wrap'>
                                      <div className='number-count'>{key + 1}.</div>
                                      <div className='text-wrap'>
                                        <p className='text-xs w-500 base'>Zone {key + 1}</p>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="col col-2">
                                    <p className='text-xs w-300 base'>{item.ZoneType}</p>

                                  </li>
                                  <li className="col col-3">
                                    <p className='text-xs w-300 base'>{item.ZoneType === "Distance" ? `${item.range} Kms` :
                                      // item.pincodes.map((pin, key) => {
                                      //   return `${pin} `
                                      // })
                                      `${item.pincodes.length} Pincodes`
                                    } </p>
                                  </li>
                                  <li className="col col-3">
                                    <p className='text-xs w-300 base'>{
                                      item.restriction ? "Restricted" :
                                        ` ₹ ${item.deliveryCharges}`
                                    }</p>
                                  </li>
                                  <li className="col col-1 text-center">
                                    <div className='icon-wrap'>
                                      <i className='ed-icon primary i-xxs icon-pencial' onClick={() => editZone(item, key)}></i>
                                      <i className='ed-icon primary i-xxs icon-delete' onClick={() => { handleDeleteZone(key) }}></i>

                                    </div>
                                  </li>
                                </ul>
                              )
                            }) : ""
                        }

                      </div>

                    </div>
                  </div>
                </div>}
              </div>
            </>
          )
        }
        <ShippingDeletepopup cancelBokingRef={openDeletepop} deleteZone={deleteZone} />
      </ShoppingCard>
    </div>
  )
}

export default PinCode