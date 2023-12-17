import React from 'react'
import Modals from '../../../../../Common/Modals'
import ModalsHeader from '../../../../../Common/Modals/ModalsHeader';
import ModalsBody from '../../../../../Common/Modals/ModalsBody';
import FormInput from '../../../../../Common/Form/FormInput';
import { useState } from 'react';
import ValidationFile from '../../../../../Classes/ValidationFile';
import ValidationUtils from '../../../../../Classes/ValidationUtils';
import FormError from '../../../../../Common/Form/FormError';
import { useDispatch } from 'react-redux';
import { shippingDetails, updateSuorderId, getItemSuborders, customerOrderDetail, getShipItems, postShippingPartner } from '../../../../../store/actions/ecommerce/action/cartOrder';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import './selfShippingPopUp.scss'
import Box from './box.png'
import { useRef } from 'react';
import { useDetectOutsideClick } from '../../../../../Common/DetectOutsideClick/useDetectOutsideClick';
import EDropDownShowMore from './../../Component/EDropDownShowMore';
import { findInstituteInformation } from '../../../../../store/actions/instituteregistration/action';
const SelfShippingPopup = ({ openref, onclose, orderId, selected, subOrderDetailsAnOrder }) => {
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const { shippingOrderLoading, shippingOrderSuccess, updateShipSuccess } = useSelector((state) => {
    return {
      shippingOrderLoading: state.orderCartList.updateShipOrder.loading,
      shippingOrderSuccess: state.orderCartList.updateShipOrder.success,
      updateShipSuccess: state.orderCartList.updateShipOrder.success
    }
  })
  const users = useSelector((state) => state.user);

  const getInstituiteInfoData = useSelector((state) => state.manageinstituteinfo)

  const [showDropDown, setShowDropDown] = useDetectOutsideClick(dropdownRef, false);
  const [deliveryPartnerName, setDeliveryPartnerName] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [trackingURL, setTrackingURL] = useState("");
  const [textbox, setTextBox] = useState(false);
  const [otherDeliveryPartner, setOtherDeliveryPartner] = useState("");
  const [selfShip, setSelfShip] = useState(true);
  const [shipping, selectShipping] = useState([{ deliveryPartnerName: "", trackingURL: "" }]);
  const [uniq, setUnique] = useState([])

  //error states

  const [deliveryPartnerNameError, setDeliveryPartnerNameError] = useState(false);
  const [trackingIdError, setTrackingIdError] = useState(false);
  const [otherDeliveryPartnerError, setOtherDeliveryPartnerError] = useState(false);
  const [all, setAll] = useState([])

  // console.log("line 40 selfShippingpopup",selected,subOrderDetailsAnOrder)
  const [state, setState] = useState([{ deliveryPartnerName: "DTDC", trackingURL: "https://www.dtdc.in/tracking/shipment-tracking.asp" },
  { deliveryPartnerName: "DELHIVERY", trackingURL: "https://www.delhivery.com/" },
  { deliveryPartnerName: "FED", trackingURL: "https://www.fedex.com/en-in/tracking.html" }
  ])

  const ResetAll = () => {
    setDeliveryPartnerName("");
    setTrackingId("");
    setTrackingURL("");
    setTextBox(false);
    setOtherDeliveryPartner("");
    setDeliveryPartnerNameError(false);
    setTrackingIdError(false);
    setOtherDeliveryPartnerError(false);
  }
  const handleShowDropDown = (e) => {
    setShowDropDown(!showDropDown)
  }
  const closeModal = () => {
    onclose();
    ResetAll();
  }

  useEffect(() => {
    setAll([]);
    /* setState([]); */
    dispatch(findInstituteInformation(users.user_institute, users.user_business_type));
  }, [users]);

  useEffect(() => {
    // console.log(getInstituiteInfoData)
    if (getInstituiteInfoData && getInstituiteInfoData?.data?.shipTrackingPartner) {
      // console.log("::",getInstituiteInfoData, getInstituiteInfoData?.data?.shipTrackingPartner)
      /* if(state.some(r=> all.includes(r))){
        console.log(state,all,state.some(r=> all.includes(r)))
        setAll(getInstituiteInfoData?.data?.shipTrackingPartner)
      } */
      setAll([]);
      setState([]);
      // console.log("all",all,"\nstate",state)
      setAll(getInstituiteInfoData?.data?.shipTrackingPartner)
      setState([{ deliveryPartnerName: "DTDC", trackingURL: "https://www.dtdc.in/tracking/shipment-tracking.asp" },
      { deliveryPartnerName: "DELHIVERY", trackingURL: "https://www.delhivery.com/" },
      { deliveryPartnerName: "FED", trackingURL: "https://www.fedex.com/en-in/tracking.html" }
      ])
      /* if(state.some(r=> all.includes(r))){
          console.log(state,all,state.some(r=> all.includes(r)))
          setAll(getInstituiteInfoData?.data?.shipTrackingPartner)
        } */
      // setState(current => [...current,getInstituiteInfoData?.data?.shipTrackingPartner]);
      setState([...state, ...all]);
    }


  }, [getInstituiteInfoData])
  useEffect(() => {
    const uniqueIds = [];
    const uniqueEmployees = state.filter(element => {
      const isDuplicate = uniqueIds.includes(element.deliveryPartnerName);
      if (!isDuplicate) {
        uniqueIds.push(element.deliveryPartnerName);
        return true;
      }
      return false;
    });
    setUnique(uniqueEmployees)
  }, [state])

  const handleSelect = (e) => {
    let inputValue = e.target.value;
    setDeliveryPartnerName(inputValue);
    setDeliveryPartnerNameError(ValidationUtils.isEmpty(inputValue));
    if (inputValue === "Others") {
      setTextBox(true);
      setTrackingURL("");
    }
    else {
      setTextBox(false);
    }
    setOtherDeliveryPartnerError(false);
  }

  const handleInputs = (e) => {
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    let inputName = e.target.name;
    console.log("inputValue", value, inputName)
    switch (inputName) {
      case "partner":
        setOtherDeliveryPartner(value);
        setOtherDeliveryPartnerError(ValidationUtils.isEmpty(value));
        break
      case "trackID":
        setTrackingId(value);
        setTrackingIdError(ValidationUtils.isEmpty(value));
        break;
      default:
        setTrackingURL(value);
    }
  }

  const validOtherPartner = () => {
    let isValid = true;
    if (deliveryPartnerName === "Others") {
      if (ValidationUtils.isEmpty(otherDeliveryPartner)) {
        isValid = false;
        setOtherDeliveryPartnerError(true);
      }
      else {
        isValid = true;
      }
    }
    else {
      isValid = true;
    }
    return isValid;
  }

  const handleDoneButton = () => {
    let validPartner = validOtherPartner();
    if (validPartner) {
      setTextBox(false);
      // setDeliveryPartnerName(otherDeliveryPartner);
      setState(current => [...current, { deliveryPartnerName: otherDeliveryPartner, trackingURL: "" }]);
      setOtherDeliveryPartner("");
    }
  }




  const handleAddButton = () => {
    if (ValidationUtils.isEmpty(deliveryPartnerName)) {
      setDeliveryPartnerNameError(true);
    }
    if (ValidationUtils.isEmpty(trackingId)) {
      setTrackingIdError(true);
    }

    if (ValidationUtils.isNotEmpty(deliveryPartnerName) && ValidationUtils.isNotEmpty(trackingId)) {
      const shipData = {
        shipping_partner: deliveryPartnerName,
        shipping_tracking_id: trackingId,
        tracking_url: trackingURL,
        status: "Shipped",
        order_shipping_date: new Date(),
        selfShip: selfShip
      };
      let deta = { status: "Shipped" }
      dispatch(shippingDetails(orderId, deta))
      let data = { shipData: shipData, selectedVariation: selected, subOrderDetailsAnOrder: subOrderDetailsAnOrder, orderId: orderId };
      // console.log("line no 139",data)
      dispatch(updateSuorderId(orderId, data));
      /*    dispatch(getItemSuborders(orderId));
      dispatch(customerOrderDetail(orderId)); */

      if (deliveryPartnerName === "DELHIVERY" || deliveryPartnerName === "DTDC" || deliveryPartnerName === "FED") {
        // console.log("")
      }
      else {
        let a = {
          deliveryPartnerName: deliveryPartnerName,
          trackingURL: trackingURL
        };
        dispatch(postShippingPartner(users?.user_institute, a))
      }
    }
  }

  const handlesel = (val, url) => {
    setDeliveryPartnerName(val);
    setTrackingURL(url)
    setShowDropDown(!showDropDown)
  }
  // useEffect(()=>{
  //     if(updateShipSuccess && orderId){
  // dispatch(getItemSuborders(orderId));
  //       dispatch(customerOrderDetail(orderId));
  //       dispatch(getShipItems(orderId));
  //     }
  // },[updateShipSuccess,orderId])

  useEffect(() => {
    if (shippingOrderSuccess) {
      openref.current.close();
      ResetAll();
      // console.log( setSelectedFunc)
      onclose();



    }
  }, [openref, shippingOrderSuccess])

  /*  useEffect(() => {
     if (deliveryPartnerName && deliveryPartnerName === "DTDC") {
       setTrackingURL("https://www.dtdc.in/tracking/shipment-tracking.asp");
     }
     else if (deliveryPartnerName && deliveryPartnerName === "DELHIVERY") {
       setTrackingURL("https://www.delhivery.com/");
     }
     else if (deliveryPartnerName && deliveryPartnerName === "FED") {
       setTrackingURL("https://www.fedex.com/en-in/tracking.html");
     }
   }, [deliveryPartnerName]) */
  // console.log(state)
  return (
    <React.Fragment>
      <Modals ref={openref} Position="center" slide="top" ClosePopUp={() => closeModal()} ModalsSize={'modal-s'}>
        <ModalsHeader title={'Ship Order Via'} />
        <ModalsBody>
          <div className='self-shipping-main-container'>
            {/* <div className='inline selfship-wrapper'> */}
            <div className='inline selfship-wrapper'>
              <img src={Box} alt="" />
              <p className='text-xs w-400 black'> Self Ship</p>
            </div>
            <hr className='mt-25' />
            <div>
              <p className='mt-15 track-heading'> Add Tracking Details</p>
              <div className='inline shipping-track-wrapper'>
                <div className='shipping-track-left-item'>
                  <p>  Shipping Partner<span className='track-star'>*</span></p>
                  <div className='delivery-partner-downcontainer'>
                    <button className='addProduct-align-div' onClick={handleShowDropDown}>{deliveryPartnerName ? deliveryPartnerName : "Select Delivery Partner"}</button>
                    <div className='drowpdown-container'>
                      {
                        showDropDown ? (
                          <EDropDownShowMore>
                            <ul>
                              {uniq && uniq.map((elem, key) => {
                                return (<>
                                  <li value={elem.deliveryPartnerName} onClick={() => handlesel(elem.deliveryPartnerName, elem.trackingURL)} name="partner">{elem.deliveryPartnerName}</li>
                                </>
                                )
                              })}
                              {/* <li value="DTDC" onClick={()=>handlesel("DTDC")} name="partner">DTDC</li>
                              <li value="FED EX" onClick={()=>handlesel("FED EX")} name="partner">FED EX</li>
                              <li value="DELHIVERY" onClick={()=>handlesel("DELHIVERY")} name="partner">DELHIVERY</li> */}

                              <li className='other-option-div'>Others</li>
                              <li className='add-partner-wrapper'>
                                <div className='input-wrapper-item'>
                                  <input className='dilvery-partner-input ' placeholder="Delivery Partner Name" type="text"
                                    value={otherDeliveryPartner}
                                    name="partner" onChange={handleInputs} />
                                </div>

                                <button className='button-div' onClick={handleDoneButton}>Done</button>
                              </li>
                            </ul>
                          </EDropDownShowMore>) : ''
                      }
                    </div>
                  </div>

                  {/*                 <select
                    className='addProduct-align-div '
                    onChange={handleSelect}
                    value={deliveryPartnerName}
                  >
                    {!deliveryPartnerName &&
                      <option value=''>Select Delivery Partner</option>}
                    <option value='DTDC'>DTDC</option>
                    <option value='FED'>FED EX</option>
                    <option value='DELHIVERY'>DELHIVERY</option>
                
                    {deliveryPartnerName && deliveryPartnerName !== "Others" && deliveryPartnerName !== "DELHIVERY"
                      && deliveryPartnerName !== "FED" && deliveryPartnerName !== "DTDC" ?
                      <option value={deliveryPartnerName}>{deliveryPartnerName}</option>
                      :
                      <option value='Others'>Others</option>
                    }
                  </select> */}
                  <FormError
                    show={deliveryPartnerNameError}
                    error="please select shipping partner"
                  />

                </div>
                <div className='shipping-track-right-item'>
                  <p> Tracking ID<span className='track-star'>*</span></p>
                  <div className='mt-5'>
                    <input className='track-id-item ' name='trackID' type="text" placeholder='eg. 12384956325' onChange={handleInputs} value={trackingId} />
                    <FormError
                      show={trackingIdError}
                      error="please enter tracking ID"
                    />
                  </div>

                </div>

              </div>

              <div className='inline between-xs between-lg mt-10 shipping-dropdown-wrapper'>



                {/* <div >

                  <FormInput
                    type='text'
                    name='trackID'


                  />
                  <FormError
                    show={trackingIdError}
                    error="please enter tracking ID"
                  />
                </div> */}
              </div>
              {/* <div className='inline between-xs between-lg'>

              </div> */}


              {textbox &&
                <>
                  <FormInput
                    type='text' placeholder='Delivery Partner Name'
                    name='partner'
                    value={otherDeliveryPartner}
                    onChange={handleInputs}
                  />
                  <FormError
                    show={otherDeliveryPartnerError}
                    error="please enter partner name"
                  />
                  <button className='button btn-3xs button-primary mt-2 mb-10' onClick={handleDoneButton}>
                    Done
                  </button>
                </>
              }


              <div>
                <p className='text-xs w-400 base'> Tracking URL</p>
                <FormInput
                  type='text' placeholder='https://www.canadapost.ca/cpotools/apps/track/personal/findByTrackNumber?trackingNumber=xfvsdfsdf '
                  name='trackURL'
                  value={trackingURL}
                  onChange={handleInputs}
                />
              </div>
            </div>
            <p className='shipping-popup-note mt-5'><span className='mr-5 text-3xs w-400'>Note :</span><span className='text-3xs'>These details will be shown to your user for them to track their order</span></p>

            <div className='payment-btn-wrapper'>
              {shippingOrderLoading ?
                <button className='primary ship-button-block ship-button '
                >Adding...</button>
                :
                <button className='ship-button-block ship-button'
                  onClick={handleAddButton}
                >Add & Ship</button>
              }

            </div>
            {/* done button  */}
            {/* <div className='payment-btn-wrapper'  >
              <button className='button btn-xs button-primary ship-button-block ship-button'>Done</button>
            </div> */}

            {/* </div> */}
          </div>
        </ModalsBody>
      </Modals>
    </React.Fragment>
  )
}

export default SelfShippingPopup
