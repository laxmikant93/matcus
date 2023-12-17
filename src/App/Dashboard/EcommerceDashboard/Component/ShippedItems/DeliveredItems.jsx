import React, { useRef, useState, useEffect } from 'react'
import { useDetectOutsideClick } from '../../../../../Common/DetectOutsideClick/useDetectOutsideClick'
import CheckboxInput from '../../../../../Common/Form/CheckboxInput'
import SelectInput from '../../../../../Common/Form/SelectInput'
import Testimage from '../../assets/images/image1.png'
import SelfShippingPopup from '../../pages/SelfShipping/SelfShippingPopup'
import EDropdown from '../EDropdown'
import EDropDownShowMore from '../EDropDownShowMore'
import './shippeditems.scss';
import { useDispatch, useSelector } from 'react-redux'
import { customerOrderDetail, getItemSuborders, getShipItems, updateSubOrderFailAndDelivered } from '../../../../../store/actions/ecommerce/action/cartOrder';
import TrackingDetailPopup from '../TrackingDetailPopup/TrackingDetailpopup'
// import FailedOrderShippingSinglePopup from '../../pages/SelfShipping/FailedOrderShippingSinglePopup';
import FailedOrderShippingSinglePopup from '../../pages/SelfShipping/FailedOrderSingleShippingPopup'

const DeliveredItems = ({ orderId }) => {
  const dropdownRef = useRef(null);
  const [showDropColl, setShowDropColl] = useState(false);
  const [shipList, setShipList] = useState([]);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const failedpopupref = useRef(null);
  const failedsinglepopupref = useRef(null);

  const { getShipItemsSuccess, getShipItemsData, updateDeliverFailedSubOrderLoaded, updateDeliverFailedSubOrderSuccess, getDeliverItemsSuccess, getDeliverItemsData } = useSelector((state) => {
    return {
      getShipItemsSuccess: state.orderCartList.getShipItemsList.success,
      getShipItemsData: state.orderCartList.getShipItemsList.data,
      updateDeliverFailedSubOrderLoaded: state.orderCartList.updateDeliverFailedSubOrder.loaded,
      updateDeliverFailedSubOrderSuccess: state.orderCartList.updateDeliverFailedSubOrder.success,
      getDeliverItemsSuccess: state.orderCartList.getDeliverItemsList.success,
      getDeliverItemsData: state.orderCartList.getDeliverItemsList.data,
    }
  })

  const [deliveredData, setDeliverData] = useState([]);
  const[propData,setPropData]=useState({});

  // const handleFailedButton = () => {
  //   failedpopupref.current.open()
  // }
  // const onclosepopup=()=>{
  //   failedpopupref.current.close()
  // }

  // const OpenSigleFailedpopup=()=>{
  //   failedsinglepopupref.current.open()
  // }

  // const oncloseSingleFailedpopup=()=>{
  //   failedsinglepopupref.current.close()
  // }

  // console.log(" isAccept:{type:Boolean,default:false}", orderId, "\ngetShipItemsData", getShipItemsData)
  // useEffect(() => {
  //   dispatch(getShipItems(orderId));
  // }, [dispatch, orderId]);

  /* useEffect(() => {
    if (getShipItemsSuccess && getShipItemsData) {
      setShipList(getShipItemsData)
    }
  }, [getShipItemsData]) */

  // const handlePopupCollection = () => {
  //   setShowDropColl(!showDropColl)

  // }
  const openselfshipping = useRef(null);
  const onOpenSelfShipping = () => {
    openselfshipping.current.open()
  }
  const onCloseSelfShipping = () => {
    openselfshipping.current.close()
  }

  const opentrackingdetail = useRef(null)
  /*  const onOpenTrackingDetail = () => {
     opentrackingdetail.current.open()
   }
   const onClosetrackingDetail = () => {
     opentrackingdetail.current.close()
   } */
  /*  const getAllSubOrders=(item)=>{
     console.log("item,item",item.data)
     let all=[];
     if(item?.data?.length>0){
       for(let i=0;i<item.data.length;i++){
             all.push(item.data[0].suborderId)
       }
     }
     // console.log("All..",all)
     setDeliverData(all)
     return all
 } */

  // const loop = [1, 2, 3, 4, 5];
  // const handleInput=(e)=>{
  //     if(e.target.value==="Failed"){
  //       failedsinglepopupref.current.open()
  //     }
  //     if(e.target.value==="Delivered"){
  //       // console.log(e.target.value,deliveredData)
  //       const data = {
  //         status: "Delivered",
  //         order_delivery_date: new Date()
  //       };
  //       // dispatch(shippingDetails(orderId, data));
  //       dispatch(updateSubOrderFailAndDelivered(orderId,{data:data,suborderList:deliveredData}))
  //       setTimeout(()=>{
  //         dispatch(getShipItems(orderId));
  //       },500)
  //     }
  // }

  // useEffect(() => {
  //   if (updateDeliverFailedSubOrderSuccess) {
  //     dispatch(getShipItems(orderId));
  //   }
  // }, [updateDeliverFailedSubOrderSuccess])
  const onClickSendData=(item)=>{
    // console.log("item",item)
    let objResult={"shippingPartner":item?.data[0]?.shipping_partner,
    "trackingId":item?.data[0]?.shipping_tracking_id,
    "trackingUrl":item?.data[0]?.tracking_url
}
// console.log(objResult)
setPropData(objResult)
// return objResult
}

  return (
    <div>
      <div className="gridListTable  ">
        <ul className="gridHeader ship-item-table-header">
          <li className="col col-4 item-lable-heading shipped-item-name-label"> NAME </li>
          <li className="col col-2 item-lable-heading">PRICE</li>
          <li className="col col-2 item-lable-heading">QUANTITY</li>
          <li className="col col-2 item-lable-heading">STATUS</li>
          <li className="col col-2 item-lable-heading" >TRACK</li>
        </ul>
        <div className="gridBody shipped-item-table-wrapper">
          {
            getDeliverItemsData && getDeliverItemsData.map((item) => (
              <div className="gridRow  shipped-item-table-row " key={''}>
                <ul className="topInfo">
                  <li className="col col-4 shipped-item-name-input " data-head="NAME">
                    <div className="userDetails shipped-product-info-wrapper">
                      <div className='product-image-wraper-div'>
                        {/* <img src={Testimage} alt="productImage" /> */}
                        <img src={item.data[0]?.productData?.productPicture[0]} alt="productImage" />
                      </div>
                      <div className="profileDetails">
                        <div className="profile-name">
                          <p className='base text-xs w-500'>{item?.data[0]?.productData?.variationName}</p>
                          <p className='gray  text-2xs w-500'>
                            {item?.data[0]?.productData.variant_scheme && item?.data[0]?.productData.variant_scheme.length ?
                              item?.data[0]?.productData.variant_scheme.map((varItem, key) => {
                                return (
                                  <React.Fragment key={key}>
                                  {key!==0?" /":""}  {varItem?.value} 
                                  </React.Fragment>
                                );
                              }) : ""
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                  </li>
                  <li className="col col-2" data-head="PRICE">
                    <div className='order-list-th-wrapper'>
                      {/* <p className='text-xxs base w-400'>₹150</p> */}

                      {item?.data[0]?.productData?.discountPercentage > 0 ?
                        <>
                          {item?.data[0]?.productData?.defaultVariation ?
                            <>
                              {item?.data[0]?.productData?.discount_by_percent ?
                                <p className='text-xs w-600 mt-8'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                  {Math.ceil((100 - item?.data[0]?.productData?.discountPercentage) / 100 * (item?.data[0]?.productData?.price))}
                                </span></p>
                                :
                                <p className='text-xs w-600 mt-8'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                  {Math.ceil(item?.data[0]?.productData?.price - item?.data[0]?.productData?.discountPercentage)}
                                </span></p>
                              }
                            </>
                            :
                            <>
                              {item?.discount_by_percent ?
                                <p className='text-xs w-600 mt-8'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                  {Math.ceil((100 - item?.data[0]?.productData?.discountPercentage) / 100 * (item?.data[0]?.productData?.price + item?.data[0]?.productData?.salePrice))}
                                </span></p>
                                :
                                <p className='text-xs w-600 mt-8'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                  {Math.ceil((item?.data[0]?.productData?.price + item?.data[0]?.productData?.salePrice) - item?.data[0]?.productData?.discountPercentage)}
                                </span></p>
                              }
                            </>
                          }
                        </>
                        :
                        <>
                          {item?.data[0]?.productData?.defaultVariation ?
                            <p className='text-xs w-600 mt-8'><span>&nbsp; &#8377;</span> <span className='w-400'>
                              {item?.data[0]?.productData?.price}
                            </span></p>
                            :
                            <p className='text-xs w-600 mt-8'><span>&nbsp; &#8377;</span> <span className='w-400'>
                              {item?.data[0]?.productData?.price + item?.data[0]?.productData?.salePrice}
                            </span></p>
                          }
                        </>
                      }
                    </div>
                  </li>
                  <li className="col col-2" data-head="QUANTITY">
                    <div className='order-list-th-wrapper'>
                      <p className='text-xxs base w-400'>{item?.data?.length}</p>
                    </div>
                  </li>
                  <li className="col col-2" data-head="STATUS">
                    <div className='shipped-dropdown-wrapper'>
                      {/* <SelectInput   onChange={handleInput} onClick={()=>getAllSubOrders(item)}>
                        <option value="">{item?.data[0]?.status}</option>
                        <option value="Failed" onClick={()=>OpenSigleFailedpopup()}>Failed</option>
                        {
                        <FailedOrderShippingSinglePopup
                          openref={failedsinglepopupref} orderId={orderId} onclose={() => oncloseSingleFailedpopup()} setShowToast={(val) => setShowToast(val)}
                          item={item} />
                        }
                        <option value="Delivered">Delivered</option>
                      </SelectInput> */}
                      <p>Delivered</p>
                    </div>

                  </li>
                  <li className="col col-2" data-head="TRACK" >
                    <div className='view-tracking-details-wrapper ' onClick={() => { onOpenSelfShipping();onClickSendData(item); }}>
                      <p className='primary text-xxs primary'>View</p>
                      <p className='primary text-xxs primary'>Tracking ID</p>
                    </div>
                    {
                      // <SelfShippingPopup openref={openselfshipping} onclose={onCloseSelfShipping} />
                      <TrackingDetailPopup openref={openselfshipping} onclose={onCloseSelfShipping} shippingPartner={item?.data[0]?.shipping_partner} 
                      trackingId={item?.data[0]?.shipping_tracking_id} 
                      trackingUrl={item?.data[0]?.tracking_url}
                      propData={propData} />

                    }
                  </li>
                </ul>
              </div>
            ))
          }
        </div>
      </div>
    </div >
  )
}

export default DeliveredItems;