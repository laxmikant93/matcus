import React, { useState, useEffect } from 'react';
import './acceptorderpopup.scss'
import AppLink from '../../../../../Common/AppLink'
import CheckboxInput from '../../../../../Common/Form/CheckboxInput'
import Modals from '../../../../../Common/Modals'
import ModalBody from '../../../../../Common/Modals/ModalsBody'
import ModalsHeader from '../../../../../Common/Modals/ModalsHeader'
import NoDataAvailable from '../../../../../Common/NoDataAvailable'
import DeleteConfirmPop from '../DeleteConfirmPop/DeleteConfirmPop'
import Testimage from '../../assets/images/image1.png'
import ModalsFooter from '../../../../../Common/Modals/ModalsFooter'
import SelfShippingPopup from '../../pages/SelfShipping/SelfShippingPopup'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { customerOrderDetail, getItemSuborders } from '../../../../../store/actions/ecommerce/action/cartOrder'
import { useParams } from 'react-router-dom';

const AcceptOrderPopup = ({ openref, onclose }) => {
  const openselfshipping = useRef(null);
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [orderDetail, setOrderDetails] = useState('');


  const { customerOrderDetail: detail } = useSelector((state) => state.orderCartList);
  const { shippingOrderSuccess, shippingOrderLoading, getItemSubordersSuccess, getItemSubordersData } = useSelector((state) => {
    return {
      shippingOrderLoading: state.orderCartList.adminOrderList.loading,
      shippingOrderSuccess: state.orderCartList.adminOrderList.success,
      getItemSubordersSuccess: state.orderCartList.getSubOrderdList.success,
      getItemSubordersData: state.orderCartList.getSubOrderdList.data,

    }
  })

  const [subOrderDetailsAnOrder, setSubOrderDetailsAnOrder] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [selected, setSelected] = useState([]);
  // checked={checked.showOnHeader} onChange={(e) => showOnMenuList(e, "header")}

  useEffect(() => {
    if (getItemSubordersSuccess && getItemSubordersData) {
      setSubOrderDetailsAnOrder(getItemSubordersData)
      setTempData(getItemSubordersData)

    }
  }, [getItemSubordersData])

  useEffect(() => {
    // dispatch(customerOrderDetail(orderId));
    dispatch(getItemSuborders(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
    if (detail.success === true) {
      setOrderDetails(detail.data);
    }
  }, [detail, orderId]);

  const handleDecre = (item) => {
    let d = []
    let data = subOrderDetailsAnOrder;
    for (let i = 0; i < data.length; i++) {
      if (data[i].suborderData.length > 1 && item._id === data[i]._id) {
        let val = { _id: data[i]._id, suborderData: [] };
        for (let j = 0; j < data[i].suborderData.length - 1; j++) {
          val.suborderData.push(data[i].suborderData[j])
        }
        d.push(val)
      }
      else {
        d.push(data[i])
      }
    }
    // console.log(d, subOrderDetailsAnOrder)
    setSubOrderDetailsAnOrder(d)
  }

  const setSelectedFunc = () => {
    setSelected([])
  }

  const handleIncre = (item, length) => {
    let data = tempData;
    for (let i = 0; i < data.length; i++) {
      if (item._id === data[i]._id && length < data[i].suborderData.length) {

        let val = { _id: data[i]._id, suborderData: [] };
        for (let j = 0; j < length + 1; j++) {
          val.suborderData.push(data[i].suborderData[j])
        }
        let v = [];
        for (let k = 0; k < subOrderDetailsAnOrder.length; k++) {
          if (subOrderDetailsAnOrder[k]._id === val._id) {
            v.push(val)
          }
          else {
            v.push(subOrderDetailsAnOrder[k])
          }
        }
        setSubOrderDetailsAnOrder(v)
      }
    }
  }
  const checkBoxHandle = (value) => {
    if (!selected.includes(value)) {
      let inputFields = selected
      inputFields.push(value)
      setSelected([...selected])
    } else {
      let inputFields = selected
      let a = inputFields.filter((fil) => fil !== value)
      setSelected(a)
    }
  }

  // console.log(selected, subOrderDetailsAnOrder)

  const closeModal = () => {
    onclose();
    setSelected([])
  }

  const onOpenSelfShipping = (e) => {

    if (selected && selected.length > 0) {
      openref.current.close()
      openselfshipping.current.open()
      // setSelected([])
    }

  }

  const onCloseSelfShipping = () => {
    openselfshipping.current.close()
    setSelected([])
  }

  const handleSelectAllCheckboxes = (e) => {
    let inputChecked = e.target.checked;
    let array = subOrderDetailsAnOrder;
    let value = array.map((item) => {
      return (
        item._id
      );
    })
    if (inputChecked) {
      setSelected([...value]);
    }
    else {
      setSelected([]);
    }
  }

  return (
    <div>
      <Modals ref={openref} Position="center" slide="top" ClosePopUp={() => closeModal()} ModalsSize={'modal-l'}>

        <ModalsHeader title={'Select the items to ship'} />
        <ModalBody className="accept-order-container">
          <div className="gridListTable accept-order-table-container ">
            <ul className="gridHeader">
              {/* <li className="col col-1">&nbsp;</li> */}
              <li className="col col-1 cheqbox-item " data-head="">
                <CheckboxInput
                  className={"eComm-checkbox"}
                  onChange={handleSelectAllCheckboxes}
                  checked={subOrderDetailsAnOrder && selected && selected?.length === subOrderDetailsAnOrder?.length}
                />
              </li>
              <li className="col col-4"> NAME </li>
              <li className="col col-2 ">PRICE</li>
              <li className="col col-3">SKU</li>
              <li className="col col-2">QUANTITY</li>
            </ul>
            <div className="gridBody">
              {subOrderDetailsAnOrder && subOrderDetailsAnOrder.length ?
                subOrderDetailsAnOrder.map((item, key) => {
                  return (
                    <>
                      <div className="gridRow accept-oreder-row" key={key}>
                        <ul className="topInfo">
                          <li className="col col-1 cheqbox-item " data-head="">
                            <CheckboxInput
                              className={"eComm-checkbox"}
                              key={item._id}
                              onChange={(e) => { checkBoxHandle(item._id) }}
                              checked={selected.includes(item._id)}
                            />
                          </li>
                          <li className="col col-4 accept-ordertable-image-wrapper" data-head="NAME">
                            <div className="userDetails">
                              <div className='product-image-wraper-div'>
                                <img src={item?.suborderData[0]?.productData?.productPicture.length ? item?.suborderData[0]?.productData?.productPicture[0] : Testimage} alt="productImage" className='img-response' />
                              </div>
                              <div className="profileDetails">
                                <div className="profile-name">
                                  <p className='base text-xs w-500'>{item?.suborderData[0]?.productData?.variationName}</p>
                                  {/* <p className='base text-2xs w-500'>Black/Extra Large</p> */}
                                  {/* {item?.suborderData[0]?.productData?.discountPercentage > 0 ?
                                    <>
                                      {item?.suborderData[0]?.productData?.defaultVariation ?
                                        <>
                                          {item?.suborderData[0]?.productData?.discount_by_percent ?
                                            <p className='text-xxs gray w-600'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                              {Math.ceil((100 - item?.suborderData[0]?.productData?.discountPercentage) / 100 * (item?.suborderData[0]?.productData?.price))}
                                            </span></p>
                                            :
                                            <p className='text-xxs gray w-600'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                              {Math.ceil(item?.suborderData[0]?.productData?.price - item?.suborderData[0]?.productData?.discountPercentage)}
                                            </span></p>
                                          }
                                        </>
                                        :
                                        <>
                                          {item?.discount_by_percent ?
                                            <p className='text-xxs gray w-600'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                              {Math.ceil((100 - item?.suborderData[0]?.productData?.discountPercentage) / 100 * (item?.suborderData[0]?.productData?.price + item?.suborderData[0]?.productData?.salePrice))}
                                            </span></p>
                                            :
                                            <p className='text-xxs gray w-600'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                              {Math.ceil((item?.suborderData[0]?.productData?.price + item?.suborderData[0]?.productData?.salePrice) - item?.suborderData[0]?.productData?.discountPercentage)}
                                            </span></p>
                                          }
                                        </>
                                      }
                                    </>
                                    :
                                    <>
                                      {item?.suborderData[0]?.productData?.defaultVariation ?
                                        <p className='text-xxs gray w-600'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                          {item?.suborderData[0]?.productData?.price}
                                        </span></p>
                                        :
                                        <p className='text-xxs gray w-600'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                          {item?.suborderData[0]?.productData?.price + item?.suborderData[0]?.productData?.salePrice}
                                        </span></p>
                                      }
                                    </>
                                  } */}
                                  <p className='base text-2xs w-500'>
                                    {item?.suborderData[0]?.productData.variant_scheme && item?.suborderData[0]?.productData.variant_scheme.length ?
                                      item?.suborderData[0]?.productData.variant_scheme.map((varItem, key) => {
                                        return (
                                          <React.Fragment key={key}>
                                            {key !== 0 ? " /" : ""}  {varItem?.value}
                                          </React.Fragment>
                                        );
                                      }) : ""
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>

                          </li>
                          <li className="col col-2 prize-div " data-head="PRICE">
                            <div className='order-list-th-wrapper'>
                              <p className='text-xxs gray w-600'>

                                {item?.suborderData[0]?.productData?.discountPercentage > 0 ?
                                  <>
                                    {item?.suborderData[0]?.productData?.defaultVariation ?
                                      <>
                                        {item?.suborderData[0]?.productData?.discount_by_percent ?
                                          <p className='text-xxs gray w-600'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                            {Math.ceil((100 - item?.suborderData[0]?.productData?.discountPercentage) / 100 * (item?.suborderData[0]?.productData?.price))}
                                          </span></p>
                                          :
                                          <p className='text-xxs gray w-600'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                            {Math.ceil(item?.suborderData[0]?.productData?.price - item?.suborderData[0]?.productData?.discountPercentage)}
                                          </span></p>
                                        }
                                      </>
                                      :
                                      <>
                                        {item?.discount_by_percent ?
                                          <p className='text-xxs gray w-600'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                            {Math.ceil((100 - item?.suborderData[0]?.productData?.discountPercentage) / 100 * (item?.suborderData[0]?.productData?.price + item?.suborderData[0]?.productData?.salePrice))}
                                          </span></p>
                                          :
                                          <p className='text-xxs gray w-600'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                            {Math.ceil((item?.suborderData[0]?.productData?.price + item?.suborderData[0]?.productData?.salePrice) - item?.suborderData[0]?.productData?.discountPercentage)}
                                          </span></p>
                                        }
                                      </>
                                    }
                                  </>
                                  :
                                  <>
                                    {item?.suborderData[0]?.productData?.defaultVariation ?
                                      <p className='text-xxs gray w-600'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                        {item?.suborderData[0]?.productData?.price}
                                      </span></p>
                                      :
                                      <p className='text-xxs gray w-600'><span>&nbsp; &#8377;</span> <span className='w-400'>
                                        {item?.suborderData[0]?.productData?.price + item?.suborderData[0]?.productData?.salePrice}
                                      </span></p>
                                    }
                                  </>
                                }
                              </p>
                            </div>
                          </li>
                          <li className="col col-3" data-head="SKU">
                            <div className='order-list-th-wrapper'>
                              <p className='text-xxs gray w-600'>{item?.suborderData[0]?.productData?.SKU}</p>
                            </div>
                          </li>
                          <li className="col col-2" data-head="QUANTITY">
                            <div className='order-list-th-wrapper'>
                              <div className='order-quantity-wrapper inline between-xs between-lg'>
                                <button type='button' className='base  order-quantity-number' onClick={() => handleDecre(item)}>-</button>
                                <p className='base text-xxs order-quantity-number '>{item?.suborderData?.length}</p>
                                <button type='button' className='base  order-quantity-number ' onClick={() => handleIncre(item, item.suborderData.length)}> +</button>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </>
                  )
                }) : ""
              }

              {/* <div className="gridRow accept-oreder-row" key={''}>
                <ul className="topInfo">
                  <li className="col col-1 cheqbox-item " data-head="">
                    <CheckboxInput
                      className={"eComm-checkbox"}
                    />
                  </li>
                  <li className="col col-4 accept-ordertable-image-wrapper" data-head="NAME">
                    <div className="userDetails">
                      <div className='product-image-wraper-div'>
                        <img src={Testimage} alt="productImage" />
                      </div>
                      <div className="profileDetails">
                        <div className="profile-name">
                          <p className='base text-xs w-500'>Roadster Tshirt</p>
                          <p className='base text-2xs w-500'>Black/Extra Large</p>
                        </div>
                      </div>
                    </div>

                  </li>
                  <li className="col col-2 prize-div " data-head="PRICE">
                    <div className='order-list-th-wrapper'>
                      <p className='text-xxs gray w-600'>₹150</p>
                    </div>
                  </li>
                  <li className="col col-3" data-head="SKU">
                    <div className='order-list-th-wrapper'>
                      <p className='text-xxs gray w-600'>122112311323434</p>
                    </div>
                  </li>
                  <li className="col col-2" data-head="QUANTITY">
                    <div className='order-list-th-wrapper'>
                      <div className='order-quantity-wrapper inline between-xs between-lg'>
                        <span className='base  order-quantity-number  '>-</span>
                        <p className='base text-xxs order-quantity-number '>02</p>
                        <span className='base  order-quantity-number '> +</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="gridRow accept-oreder-row" key={''}>
                <ul className="topInfo">
                  <li className="col col-1 cheqbox-item " data-head="">
                    <CheckboxInput
                      className={"eComm-checkbox"}
                    />
                  </li>
                  <li className="col col-4 accept-ordertable-image-wrapper" data-head="NAME">
                    <div className="userDetails">
                      <div className='product-image-wraper-div'>
                        <img src={Testimage} alt="productImage" />
                      </div>
                      <div className="profileDetails">
                        <div className="profile-name">
                          <p className='base text-xs w-500'>Roadster Tshirt</p>
                          <p className='base text-2xs w-500'>Black/Extra Large</p>
                        </div>
                      </div>
                    </div>

                  </li>
                  <li className="col col-2 prize-div " data-head="PRICE">
                    <div className='order-list-th-wrapper'>
                      <p className='text-xxs gray w-600'>₹150</p>
                    </div>
                  </li>
                  <li className="col col-3" data-head="SKU">
                    <div className='order-list-th-wrapper'>
                      <p className='text-xxs gray w-600'>122112311323434</p>
                    </div>
                  </li>
                  <li className="col col-2" data-head="QUANTITY">
                    <div className='order-list-th-wrapper'>
                      <div className='order-quantity-wrapper inline between-xs between-lg'>
                        <span className='base  order-quantity-number  '>-</span>
                        <p className='base text-xxs order-quantity-number '>02</p>
                        <span className='base  order-quantity-number '> +</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div> */}


              {/* <NoDataAvailable title="No Records Found." /> */}

              {/* <div className="loadingGridData">
                <i className="ed-loadingGrid"></i>
              </div> */}

            </div>
          </div>
          <div className="accept-order-footer-wrapper">
            <div className='inline between-lg between-xs align-center accept-order-footer-item '>
              <p className='base text-xs w-400'>*Select the items and their quantities to ship</p>
              <button type='button' className='button button-primary   btn-xs btn-oval' onClick={(e) => onOpenSelfShipping(e)}>Ship items</button>
            </div>
          </div>
        </ModalBody>

      </Modals>
      {
        <SelfShippingPopup openref={openselfshipping} onclose={onCloseSelfShipping} selected={selected} subOrderDetailsAnOrder={subOrderDetailsAnOrder} orderId={orderId} />
      }
    </div >
  )
}

export default AcceptOrderPopup