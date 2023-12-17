import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './cart.scss';
import CartImage from '../../assets/images/cartImage.png';
import CartOrdersDetails from '../../CommonComponent/CommonJsx/CartOrders/CartOrders';
import RadioAddress from '../../CommonComponent/CommonJsx/Address/RadioAddress';
import { getSavedCustomer } from '../../../../store/actions/ecommerce/action/auth';
import AddressPopUp from '../../CommonComponent/CommonJsx/AddressPopUp/AddressPopUp';
import ChangeAddress from '../../CommonComponent/CommonJsx/changeAddress/ChangeAddress';
import AddressList from '../../CommonComponent/CommonJsx/AddressList/AddressList';
import { addressListOperation, addressListOperationReset, cartOperations, cartToWishlist, cartUpdate, createOrderFromCart, getAddressList, Getcart, getShippingDetails, readCart, resetCart } from '../../../../store/actions/ecommerce/action/cartOrder';
import AppLink from '../../../../Common/AppLink';
import DeleteConfirm from '../../CommonComponent/CommonJsx/DeleteConfirmPop/DeleteConfirmPop';
import Toast from '../../CommonComponent/CommonJsx/Toast/Toast';
import ComponentLoader from '../../../../Common/Loader/ComponentLoader';
import MobileBar from '../../CommonComponent/CommonJsx/MobileBar/MobileBar';
import CODavailable from '../../CommonComponent/CommonJsx/COD/CODavailable';
import AppLinkUrl from '../../../../Common/AppLink/AppLinkUrl';
import Auth from '../../../../Classes/Auth';
import DefaultImage from '../../assets/images/Product_default.jpg'
import Shipping from '../../CommonComponent/CommonJsx/Shipping/Shipping';
import { convertToIndianFormat } from '../../../../CommonFunctions/helperFunction';
import { priceCalculator } from '../../CommonComponent/commonFunction/PriceCalculator';
import CountryFlagDropdown from '../../../../Common/CountryFlag';
import DemoDropdown from '../../../../Common/CountryFlag/demo';
import DeliveryNotAvailableToast from '../../CommonComponent/CommonJsx/DeliveryNotAvailable/DeliveryNotAvailableToast';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productTotal, setProductTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [addressList, setAddresssList] = useState([]);
  const [selectedAddress, setSelectedAddresss] = useState('');
  const [fullname, setFullname] = useState('');
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState(91);
  const [pinCode, setPinCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [userAddress, setuserAddress] = useState('');
  const [userAddress1, setuserAddress1] = useState('');
  const [addressType, setAddressType] = useState('home');
  const [landmark, setLandmark] = useState('');
  const [codStatus, setCodStatus] = useState(true);
  const [disableContinueButton, setDisableContinueButton] = useState(false);

  const [cartCount, setCartCount] = useState(1);
  // open delete pop 
  const [deletePop, setDeletePop] = useState(false);
  // open wishlist pop
  const [wishlistPop, setWishlistPop] = useState(false);
  // change address state
  const [changeAddress, setChangeAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [addData, setAddData] = useState('');
  const [check, setCheck] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [qtyLoading, setQtyLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  //////////////////POPUP
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  // const { customerDetail } = useSelector((state) => state.ecomAuth);
  // const user = useSelector((state) => state.user);
  // const subdomainuser = useSelector((state) => state.subdomainuser);
  // const { customerCart, customerAddressList } = useSelector((state) => state.orderCartList);
  const { data, success } = useSelector((state) => state.businessInfo.ecomWebsite);
  const { user, subdomainuser, productDetails, ecomWebsite, customerproductDetailLoading, customerCartData, customerAddressListData, shippingDetails, shippingDetailsSuccess, cartLoading,
    customerAddressListSuccess, customerCartSuccess, customerAddressList, customerproductDetailSuccess, postSuccess, variationDetails, postLoading, currency } = useSelector((state) => {
      return {
        user: state.user,
        subdomainuser: state.subdomainuser,
        customerproductDetailLoading: state.productList.customerproductDetail.loading,
        customerproductDetailSuccess: state.productList.customerproductDetail.success,
        variationDetails: state.productList.customerproductDetail.data.variation,
        productDetails: state.productList.customerproductDetail.data.product,
        // ecomWebsite: state.businessInfo.ecomWebsite,
        customerCartData: state.orderCartList.customerCart.data.data,
        customerCartSuccess: state.orderCartList.customerCart.success,
        postLoading: state.orderCartList.customerCart.postLoading,
        cartLoading: state.orderCartList.customerCartQuantity.loading,
        postSuccess: state.orderCartList.customerCart.postSuccess,
        customerAddressListData: state.orderCartList.customerAddressList.data,
        customerAddressListSuccess: state.orderCartList.customerAddressList.success,
        currency: state.currencyList,
        shippingDetailsSuccess: state.orderCartList.shippingDetails.success,
        shippingDetails: state.orderCartList.shippingDetails.data
      }
    });
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    dispatch(getSavedCustomer());
    // console.log(subdomainuser);
    // console.log(user);
  }, []);

  // const finalPrice = ((productDetails?.salePrice === 0) && (productDetails?.price > 0))
  // const CODAvilable = data?.data && data.data?.cod_price_limitation && data.data.cash_on_delivery_enabled && customerCartData?.product?.cod && (data?.data?.cash_on_delivery_price_limit > (finalPrice ? productDetails?.price : productDetails?.salePrice));
  // console.log(data, data?.cod_price_limitation, "dsjfjsdfhsv")
  useEffect(() => {
    // if (customerDetail.data && customerDetail.data.data && customerDetail.data.data._id) {
    //   dispatch(readCart({ userId: customerDetail.data.data._id, status: "readAddToCart" }));
    //   dispatch(getAddressList(customerDetail.data.data._id));
    // }
    if (AppLinkUrl.privateDomain()) {
      if (user && user._id) {
        dispatch(getAddressList(user._id));
      }
    } else {
      if (subdomainuser && subdomainuser._id) {
        dispatch(getAddressList(subdomainuser._id));
      }
    }
  }, [subdomainuser, user, dispatch]);

  useEffect(() => {
    // if (customerDetail.success === true) {

    //   if (!customerDetail.data || !customerDetail.data.data || !customerDetail.data.data._id) {
    //     history('/customer-login');
    //   }
    // }
    if (AppLinkUrl.privateDomain()) {
      if (!user || !user._id) {
        history('/customer-login');
      }
    } else {
      if (!subdomainuser || !subdomainuser._id) {
        history('/customer-login');
      }
    }
  }, [user, subdomainuser, history]);

  // useEffect(() => {
  //   if (customerCartSuccess === true && customerCartData && customerCartData.data.cartProduct && customerCartData.data.cartProduct.length > 0) {

  //     setCartItems([...customerCartData.data.cartProduct]);
  //     const pTot = customerCartData.data.cartProduct.reduce((tot, curr, i) => {
  //       return tot + curr.price * curr.quantity;
  //     }, 0);
  //     const iTot = customerCartData.data.cartProduct.reduce((tot, curr, i) => {
  //       return tot + curr.quantity;
  //     }, 0);
  //     const dTot = customerCartData.data.cartProduct.reduce((tot, curr, i) => {
  //       if (curr.discountPercentage > 0) {
  //         return tot + Math.floor((curr.price * curr.discountPercentage) / 100) * curr.quantity;
  //       } else {
  //         return tot
  //       }
  //     }, 0);
  //     setTotalDiscount(dTot);
  //     setTotalItems(iTot);
  //     setProductTotal(pTot);
  //     setGrandTotal(pTot + customerCartData.data.deliveryFees - dTot);
  //   }
  //   if (customerCartSuccess && customerCartData.data && customerCartData.data.length) {
  //     setCartItems([...customerCartData.data])
  //   }
  // }, [customerCartData]);

  useEffect(() => {

    if (customerAddressListSuccess === true && customerAddressListData) {
      setAddresssList([...customerAddressListData]);
      setSelectedAddresss(customerAddressListData.length > 0 ? customerAddressListData[customerAddressListData.length - 1] : '');
    };
  }, [customerAddressListData, customerAddressListSuccess])

  //  add address modal 
  const cartModal = () => {
    setShowModal(!showModal);
    ClearEditHandler()
  }

  const cartModalClose = () => {
    setShowError(false)
    setShowModal(false);
    setChangeAddress(true);
    ClearEditHandler();
    setAddData("");
  }

  useEffect(() => {
    if (AppLinkUrl.privateDomain() && Auth.isLogin()) {
      dispatch(Getcart(user._id, user.user_business))
    } else if (AppLinkUrl.subdomain() && Auth.isSubdomainLogin()) {
      dispatch(Getcart(subdomainuser._id, subdomainuser.user_business))
    }

  }, [user, subdomainuser])

  const selectAddressHandler = (id) => {
    for (let i = 0; i < addressList.length; i++) {
      if (id === addressList[i]._id) {
        setSelectedAddresss(addressList[i]);
      }
    }
    // setChangeAddress(false);
  };

  const saveAddressHandler = () => {
    const _id = AppLinkUrl.privateDomain() ? user.user_business : subdomainuser.user_business;
    // const _id = customerDetail.data.business.length > 0 ? customerDetail.data.business[0]._id : customerDetail.data.business._id
    let body = { businessShopId: _id };
    if (fullname && mobile && pinCode && city && state && userAddress) {
      if (fullname) {
        body.name = fullname.trim();

      }
      if (mobile) {
        body.phone = mobile;
      }
      if (countryCode) {
        body.countryCode = countryCode;
      }
      if (pinCode) {
        body.pinCode = pinCode.trim();

      }
      if (country) {
        body.country = country
      }
      if (city) {
        body.city = city.trim();

      }
      if (state) {
        body.state = state.trim();

      }
      if (userAddress) {
        body.fullAddress = userAddress;
      }
      if (userAddress1) {
        body.addressLineTwo = userAddress1;
      }
      if (landmark) {
        body.landmark = landmark;

      }
      if (addressType) {
        body.addressType = addressType;

      }
      if (Object.keys(addData).length > 0) {
        body._id = addData._id;
        AppLinkUrl.privateDomain() ? dispatch(addressListOperation(body, 'update', user._id)) :
          dispatch(addressListOperation(body, 'update', subdomainuser._id));
        ClearEditHandler()
        setShowModal(false);
        setChangeAddress(true);
      } else {
        AppLinkUrl.privateDomain() ? dispatch(addressListOperation(body, 'create', user._id)) :
          dispatch(addressListOperation(body, 'create', subdomainuser._id));
        ClearEditHandler()
        setShowModal(false);
        setChangeAddress(true);
      }
    }
    else {
      setShowError(true);
    }

    // window.location.reload();
  }
  const EditHandler = (data) => {
    setFullname(data.name)
    setMobile(data.phone)
    setPinCode(data.pinCode)
    setCity(data.city)
    setState(data.state)
    setuserAddress(data.fullAddress)
    setuserAddress1(data.addressLineTwo)
    setLandmark(data.landmark)
    setCountry(data.country)
  }
  const ClearEditHandler = () => {
    setFullname("")
    setMobile('')
    setPinCode("")
    setCity("")
    setState("")
    setCountry("")
    setuserAddress("")
    setLandmark("")
    setShowError(false);
  }
  const editAddressHandler = (id) => {
    setShowModal(!showModal);
    if (addressList && addressList.length > 0) {
      for (let i = 0; i < addressList.length; i++) {
        if (addressList[i]._id === id) {
          setAddData({ ...addressList[i] });
          EditHandler({ ...addressList[i] })

        }
      }
    }
    setEditAddress(true);
  };

  const deleteAddressHandler = (id) => {
    cartModalClose();
    dispatch(addressListOperation(id, 'delete'));
  };

  // changeAddress modal
  const changeAddressModal = () => {
    setChangeAddress(!changeAddress);
  }
  const changeAddressModalClose = () => {
    setChangeAddress(false);
  }

  const removefromCartHandler = async (_id, varId) => {

    dispatch(cartUpdate(_id, varId, "remove", AppLinkUrl.privateDomain() ? user._id : subdomainuser._id, AppLinkUrl.privateDomain() ? user.user_business : subdomainuser.user_business));
    // // window.location.reload();
    // setShowPopup(true);
    // setPopupMessage('1 item moved to removed.');
    // setTimeout(() => {
    //   setShowPopup(false);
    //   setPopupMessage('');
    // }, 2000);
    // setCartItems(resp.cartProduct);
    // const pTot = resp.cartProduct.reduce((tot, curr, i) => {
    //   return tot + curr.price * curr.quantity;
    // }, 0);
    // const iTot = resp.cartProduct.reduce((tot, curr, i) => {
    //   return tot + curr.quantity;
    // }, 0);
    // const dTot = resp.cartProduct.reduce((tot, curr, i) => {
    //   if (curr.discountPercentage > 0) {
    //     return tot + Math.floor((curr.price * curr.discountPercentage) / 100) * curr.quantity;
    //   } else {
    //     return tot
    //   }
    // }, 0);
    // setTotalDiscount(dTot);
    // setTotalItems(iTot);
    // setProductTotal(pTot);
    // setGrandTotal(pTot + customerCartData.data.deliveryFees - dTot);
  };

  const transferToWishlistHandler = async (id) => {
    const user = AppLinkUrl.privateDomain() ? user._id : subdomainuser._id;
    const business = AppLinkUrl.privateDomain() ? user.user_business : subdomainuser.user_business;
    let body = { variation: id, user, business };
    const resp = await dispatch(cartToWishlist(body));
    // window.location.reload();
    // history('/ecom-wishlist')
    // setShowPopup(true);
    // setPopupMessage('1 item moved to wishlist.');
    // setTimeout(() => {
    //   setShowPopup(false);
    //   setPopupMessage('');

    // }, 2000);
    // setCartItems(resp.cartProduct);
    // const pTot = resp.cartProduct.reduce((tot, curr, i) => {
    //   return tot + curr.price * curr.quantity;
    // }, 0);
    // const iTot = resp.cartProduct.reduce((tot, curr, i) => {
    //   return tot + curr.quantity;
    // }, 0);
    // const dTot = resp.cartProduct.reduce((tot, curr, i) => {
    //   if (curr.discountPercentage > 0) {
    //     return tot + Math.floor((curr.price * curr.discountPercentage) / 100) * curr.quantity;
    //   } else {
    //     return tot
    //   }
    // }, 0);
    // setTotalDiscount(dTot);
    // setTotalItems(iTot);
    // setProductTotal(pTot);
    // setGrandTotal(pTot + customerCartData.data.deliveryFees - dTot);
  };

  const [disablePlusIcon, setDisablePlusIcon] = useState(false);

  const changeQtyHandler = async (_id, action, varId, stock, quantity) => {
    // if (quantity <= stock) {
    if (action === 'plus') {
      dispatch(cartUpdate(_id, varId, "quantity", AppLinkUrl.privateDomain() ? user._id : subdomainuser._id, AppLinkUrl.privateDomain() ? user.user_business : subdomainuser.user_business));
    }
    // }
    // else {
    //   setDisablePlusIcon(true);
    // }

    if (action === 'minus') {

      dispatch(cartUpdate(_id, varId, "quantityDesc", AppLinkUrl.privateDomain() ? user._id : subdomainuser._id, AppLinkUrl.privateDomain() ? user.user_business : subdomainuser.user_business));
    }

    //////////////REMOVE THIS API AFTER CHANGE CART QTY API CORRECTION FROM BACKEND
    // let bodyRem = { status: "removeAddToCart", cartId: id, userId: customerDetail.data.data._id };
    // dispatch(cartOperations(bodyRem));

    // setCartItems(resp.cartProduct);
    // if (resp) {
    //   const pTot = resp.cartProduct.reduce((tot, curr, i) => {
    //     return tot + curr.price * curr.quantity;
    //   }, 0);
    //   const iTot = resp.cartProduct.reduce((tot, curr, i) => {
    //     return tot + curr.quantity;
    //   }, 0);
    //   const dTot = resp.cartProduct.reduce((tot, curr, i) => {
    //     if (curr.discountPercentage > 0) {
    //       return tot + Math.floor((curr.price * curr.discountPercentage) / 100) * curr.quantity;
    //     } else {
    //       return tot
    //     }
    //   }, 0);

    //   setTotalDiscount(dTot);
    //   setTotalItems(iTot);
    //   setProductTotal(pTot);
    //   setGrandTotal(pTot + customerCartData.data.deliveryFees - dTot);
    // }
    // window.location.reload();
  };

  const codStatusHandler = (v) => {
    setCodStatus(v);
  };

  const [loading, setLoading] = useState(false);

  const orderFromCartHandler = () => {
    if ((Auth.isLogin() && AppLinkUrl.privateDomain()) || (Auth.isSubdomainLogin() && AppLinkUrl.subdomain())) {
      if (selectedAddress && customerCartData.length > 0) {

        setLoading(true)
        let body = {
          status: "Cart Product",
          userId: AppLinkUrl.subdomain() ? subdomainuser._id : user._id,
          businessShopId: AppLinkUrl.subdomain() ? subdomainuser.user_business : user.user_business,
          total: grandTotal,
          orderAddress: selectedAddress._id,
          order_payment_method: codStatus ? 'cashOnDelivery' : "online",
        };
        // dispatch(createOrderFromCart(body, history));
        history(`/ecom-paymode/${selectedAddress._id}`);

        // window.location.reload();
      } else if (!selectedAddress) {
        setShowPopup(true);
        setPopupMessage('Please Select address.');
        setTimeout(() => {
          setShowPopup(false);
          setPopupMessage('');
        }, 2000);
      } else if (grandTotal === 0) {
        setShowPopup(true);
        setPopupMessage('Minimum 1 product is required.');
        setTimeout(() => {
          setShowPopup(false);
          setPopupMessage('');
        }, 2000);
      }
    }
    // if (customerDetail.data.business._id) {
    //   _id = customerDetail.data.business._id;
    // } else {
    //   _id = customerDetail.data.business[0]._id;
    // }

    // window.location.reload();
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (customerCartSuccess && customerCartData && customerCartData.length) {
      let data = customerCartData.every((i) => !i?.product?.stock <= 0)
      if (data) {
        setDisableContinueButton(false);
      }
      else {
        setDisableContinueButton(true);
      }
    }
  }, [customerCartData, customerCartSuccess])

  const getPrice = (val) => {
    if (currency) {
      if (currency.selectedCurrency && currency.selectedCurrency.data.rate) return `${currency.selectedCurrency.data.symbol ? currency.selectedCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.selectedCurrency.data.commision, currency.selectedCurrency.data.rate))}`;
      else return `${currency.primaryCurrency.data.symbol ? currency.primaryCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.primaryCurrency.data.commision, currency.primaryCurrency.data.rate))}`;
    }
    return val;
  }

  useEffect(() => {
    if (selectedAddress && data && success) {
      dispatch(getShippingDetails(data._id, selectedAddress.pinCode, selectedAddress.country, selectedAddress.state))
    }
  }, [data, dispatch, selectedAddress, success])

  const [deliveryFees, setDeliveryFees] = useState(0)

  const handleShippingRate = (val) => {
    setDeliveryFees(val)
  }

  useEffect(() => {console.log(customerCartData)},[customerCartData])
  const CodDefault = data && data?.cash_on_delivery_enabled && !data?.cod_price_limitation;

  // console.log(CodDefault, "810line")


  return (
    <React.Fragment>
      <div className='mt-20'>
        <div className='containerTrue pb-45 '>
          <div className='trueTheme-cart-container'>
            <div className='cart-top-area-wrapper'>
              <div className='cart-top-heading-div'>
                {
                  customerCartSuccess && <h1 className='top-heading'><span className='darkHeading'>My Bag &nbsp;</span><span className='cart-item-heading'>{customerCartData.length}{customerCartData.length === 1 ? ' item' : ' item(s)'}</span></h1>
                }
              </div>
              <div className='cart-top-tost-div'>
                {showPopup && <Toast text={popupMessage} />}
              </div>
            </div>
            {customerCartSuccess ? <div className='truetheme-cart-wrappper'>
              <div className='trueTheme-cart-leftSidebar'>
                {
                  !check ?
                    (
                      <>
                        <div className='cart-address-wrap'>
                          {
                            addressList && addressList.length < 1 ?
                              (
                                <div className='cart-address-container'>
                                  <div className='cart-add-left'>
                                    <p className='no-delivery-p'>No Delivery Address</p>
                                  </div>
                                  <div className='cart-address-right'>
                                    <button className='buttonTrue btnTrue-o-primary btn-sm' onClick={cartModal}>ADD ADDRESS</button>
                                    {
                                      showModal &&
                                      <AddressPopUp
                                        submitHandler={saveAddressHandler}
                                        onClose={cartModalClose}
                                        show={showModal}
                                        fullname={(vl) => { setFullname(vl) }}
                                        mobile={(vl) => { setMobile(vl) }}
                                        pinCode={(vl) => { setPinCode(vl) }}
                                        city={(vl) => { setCity(vl) }}
                                        state={(vl) => { setState(vl) }}
                                        country={(vl) => { setCountry(vl) }}
                                        countryV={country}
                                        address={(vl) => { setuserAddress(vl) }}
                                        address1={(vl) => { setuserAddress1(vl) }}
                                        landmark={(vl) => { setLandmark(vl) }}
                                        fullnameV={fullname}
                                        mobileV={mobile}
                                        code={countryCode}
                                        setCountryCode={(val) => setCountryCode(val)}
                                        pinCodeV={pinCode}
                                        cityV={city}
                                        stateV={state}
                                        userAddressV={userAddress}
                                        userAddressV1={userAddress1}
                                        landmarkV={landmark}
                                        data={addData && addData}
                                        showError={showError}
                                      />
                                    }
                                  </div>
                                </div>
                              )
                              : (
                                < div className='cart-changeAddress-container'>
                                  {/* <div className='cart-changeAddress-left' > */}
                                  {
                                    selectedAddress ?
                                      <div className='cart-changeAddress-left' onClick={() => { selectAddressHandler(selectedAddress._id) }}>
                                        <RadioAddress key={selectedAddress._id} {...selectedAddress} selected={true} />
                                      </div> :
                                      <div className='cart-changeAddress-left' onClick={() => { selectAddressHandler(addressList[0]._id) }}>
                                        <RadioAddress key={addressList[0]._id} {...addressList[0]} selected={true} />
                                      </div>
                                  }
                                  {/* </div> */}
                                  <div className='cart-changeAddress-right'>
                                    <button className='buttonTrue btnTrue-o-primary btn-xs' onClick={changeAddressModal} >Change Address</button>
                                    {
                                      changeAddress &&
                                      <ChangeAddress
                                        addAddress={cartModal}
                                        selectAddress={(id) => { selectAddressHandler(id) }}
                                        onClose={changeAddressModalClose}
                                        list={addressList}
                                        show={changeAddress}
                                        editAddress={(id) => { editAddressHandler(id) }}
                                        deleteAddress={(id) => { deleteAddressHandler(id) }}
                                        selected={selectedAddress._id}
                                      />
                                    }
                                    {
                                      editAddress &&
                                      <AddressPopUp
                                        submitHandler={saveAddressHandler}
                                        onClose={cartModalClose}
                                        show={showModal}
                                        fullname={(vl) => { setFullname(vl) }}
                                        mobile={(vl) => { setMobile(vl) }}
                                        pinCode={(vl) => { setPinCode(vl) }}
                                        city={(vl) => { setCity(vl) }}
                                        state={(vl) => { setState(vl) }}
                                        address={(vl) => { setuserAddress(vl) }}
                                        address1={(vl) => { setuserAddress1(vl) }}
                                        landmark={(vl) => { setLandmark(vl) }}
                                        fullnameV={fullname}
                                        mobileV={mobile}
                                        code={countryCode}
                                        setCountryCode={(val) => setCountryCode(val)}
                                        pinCodeV={pinCode}
                                        country={(vl) => { setCountry(vl) }}
                                        countryV={country}
                                        cityV={city}
                                        stateV={state}
                                        userAddressV={userAddress}
                                        userAddressV1={userAddress1}
                                        landmarkV={landmark}
                                        data={addData && addData}
                                        showError={showError}
                                      />
                                    }
                                    {
                                      <AddressPopUp
                                        submitHandler={saveAddressHandler}
                                        onClose={cartModalClose}
                                        show={showModal}
                                        fullname={(vl) => { setFullname(vl) }}
                                        mobile={(vl) => { setMobile(vl) }}
                                        pinCode={(vl) => { setPinCode(vl) }}
                                        city={(vl) => { setCity(vl) }}
                                        state={(vl) => { setState(vl) }}
                                        address={(vl) => { setuserAddress(vl) }}
                                        address1={(vl) => { setuserAddress1(vl) }}
                                        landmark={(vl) => { setLandmark(vl) }}
                                        country={(vl) => setCountry(vl)}
                                        countryV={country}
                                        fullnameV={fullname}
                                        mobileV={mobile}
                                        code={countryCode}
                                        setCountryCode={(val) => setCountryCode(val)}
                                        pinCodeV={pinCode}
                                        cityV={city}
                                        stateV={state}
                                        userAddressV={userAddress}
                                        userAddressV1={userAddress1}
                                        landmarkV={landmark}
                                        data={addData && addData}
                                        showError={showError}
                                      />
                                    }
                                  </div>
                                </div>
                              )
                          }
                        </div>
                        {
                          customerCartSuccess && customerCartData && customerCartData.length > 0 ? customerCartData.map((pr, i) => {
                            return (
                              <div className='cart-address-wrap mt-10 pb-0' key={i}>
                                <div className='cart-order-list-wraper'>
                                  <div className='cart-order-leftSidebar'>
                                    <p className='cart-order-p'>{pr.product.variationName} </p>
                                    <div className='price-div'>
                                      {/* <p className='darkHeading'>Rs. {Math.ceil(pr.product.price * (100 - pr.product.discountPercentage) / 100)}</p> */}
                                      {pr.product.discountPercentage > 0 ? (
                                        <>
                                          {
                                            pr.product.defaultVariation ? (

                                              <>
                                                {pr.product?.discount_by_percent ?
                                                  <>
                                                    <p className='prodcutDescription-heading'>{getPrice((100 - pr.product.discountPercentage) / 100 * (pr.product.price))}</p>
                                                    <p className='best-seller-discount'><del>{getPrice(pr.product.price)}</del></p>
                                                    <p className='best-seller-percentage'>{`${pr.product.discountPercentage}%`}</p>
                                                  </>
                                                  :
                                                  <>
                                                    <p className='prodcutDescription-heading'>{getPrice(pr.product.price - pr.product.discountPercentage)}</p>
                                                    <p className='best-seller-discount'><del>{getPrice(pr.product.price)}</del></p>
                                                    <p className='best-seller-percentage'>{getPrice(pr.product.discountPercentage)}</p>
                                                  </>
                                                }
                                              </>

                                            ) : (
                                              <>
                                                {pr.product?.discount_by_percent ?
                                                  <>
                                                    <p className='prodcutDescription-heading'>{getPrice((100 - pr.product.discountPercentage) / 100 * (pr.product.price + pr.product.salePrice))}</p>
                                                    <p className='best-seller-discount'><del>{getPrice(pr.product.salePrice + pr.product.price)}</del></p>
                                                    <p className='best-seller-percentage'>{`${pr.product.discountPercentage}%`}</p>
                                                  </>
                                                  :
                                                  <>
                                                    <p className='prodcutDescription-heading'>{getPrice((pr.product.price + pr.product.salePrice) - pr.product.discountPercentage)}</p>
                                                    <p className='best-seller-discount'><del>{getPrice(pr.product.salePrice + pr.product.price)}</del></p>
                                                    <p className='best-seller-percentage'>{`Rs.${pr.product.discountPercentage}`}</p>
                                                  </>
                                                }
                                              </>

                                            )}
                                        </>
                                      ) : (
                                        <>
                                          {pr.product.defaultVariation ? (
                                            <p className='prodcutDescription-heading'>{getPrice(pr.product.price)}</p>
                                          ) : (
                                            <p className='prodcutDescription-heading'>{getPrice(pr.product.salePrice + pr.product.price)}</p>
                                          )

                                          }

                                          {/* <p className='best-seller-discount'><del>{`Rs.${variationDetails[0].price}`}</del></p>
                                            <p className='best-seller-percentage'>{`${variationDetails[0].discountPercentage}%`}</p> */}
                                        </>
                                      )

                                      }
                                      {/* <p className='darkHeading'>Rs. {pr.product.price}</p>
                                      {pr.product.discountPercentage > 0 && <><p className='best-seller-discount'><del>{`Rs.${pr.product.price}`}</del></p>
                                        <p className='best-seller-percentage'>{`${pr.product.discountPercentage > 0 && pr.product.discountPercentage}%`}</p></>} */}
                                    </div>
                                    <div className='order-change-value-wrap'>
                                      {/* {pr.size && pr.size !== null && <div className='order-change-value-wrap-leftSidebar'>
                                      <div className='order-border'>
                                        <span>Size:</span><span>{pr.size}</span>
                                      </div>
                                    </div>} */}
                                      <div className='order-change-value-wrap-rightSidebar'>
                                        {!pr.product.stock || pr.product.stock === 0 ? "Out Of Stock"
                                          :
                                          <div className='order-border px-10'>
                                            <p className='order-count-value'>
                                              {pr.quantity > 1 ?
                                                <button className='sign plus' disabled={cartLoading}
                                                  onClick={() => { changeQtyHandler(pr.cartId, 'minus', pr.product._id, pr.product.stock, pr.quantity) }}>&#8722;</button>
                                                :
                                                ""
                                                // <button className={`sign plus ${pr.quantity === pr.product.stock ? 'btn-disable' : ''}`} disabled>&#8722;</button>
                                              }

                                              <span className='count'>{pr.quantity}</span>
                                              {pr.quantity === pr.product.stock ?
                                                ""
                                                // <button className={`sign plus ${pr.quantity === pr.product.stock ? 'btn-disable' : ''}`} disabled>&#43;</button>
                                                :
                                                <button className='sign plus' disabled={cartLoading} onClick={() => { changeQtyHandler(pr.cartId, 'plus', pr.product._id, pr.product.stock, pr.quantity) }}>&#43;</button>
                                              }

                                            </p>
                                          </div>
                                        }

                                      </div>
                                      <br />

                                    </div>
                                    <div className="input-group-prepend">
                                      {pr && pr.product && pr.product.variant_scheme.map((item) => {
                                        return (<div className='input-item-div'>
                                          <span className='input-type '> {item.title}  :  </span> <span className='input-category '>{item.value}</span>
                                        </div>
                                        )
                                      })}
                                    </div>
                                    
                                  </div>
                                  {/* <AppLink to={`/ecom-productPage/${pr.variationId}`} key={i}> */}
                                  <div className='cart-order-rightSidebar'>
                                    <img src={pr.product.productPicture && pr.product.productPicture.length > 0 ? pr.product.productPicture[0] : DefaultImage} alt="cartImage" />
                                  </div>
                                  {/* </AppLink> */}
                                </div>
                                <div className='category-wrap'>
                                  {/* loop start here */}
                                  {pr.variationOption && pr.variationOption.length > 0 && pr.variationOption.map((v) => {
                                    return (<div className='category-div'>
                                      <p>{v && v !== null && v.toUpperCase() + v.slice(1)}</p>
                                    </div>)
                                  })}
                                </div>
                                <div className='bottom-btn-wrapper'>
                                  <hr className='hori-line' />
                                  <div className='btn-wrapper'>
                                    <button className='btn-bottom buttoncart-btn btn-left' onClick={() => {
                                      removefromCartHandler(pr.cartId, pr.product._id)
                                    }}>Remove</button>
                                    <button className='btn-bottom buttoncart-btn btn-right' onClick={() => { transferToWishlistHandler(pr.product._id) }}>Move to Wishlist</button>
                                    {/* <button className='btn-bottom btn-left buttoncart-btn' onClick={() => { setDeletePop(true) }}>Remove</button>
                                  {
                                    deletePop && <DeleteConfirm onClosePop={setDeletePop} heading="Delete Confirmation" para="Are you sure you want to delete this address?" btntext="Delete" />
                                  }
                                  <button className='btn-bottom btn-right buttoncart-btn' onClick={() => { setWishlistPop(true) }}  >Move to Wishlist</button>
                                  {
                                    wishlistPop && <DeleteConfirm onClosePop={setWishlistPop} heading="Move 1 item to wishlist" para={"Are you sure you want to move 1 item from bag."} btntext="MOVE TO WISHLIST" wishlist={true} />
                                  } */}
                                  </div>
                                </div>
                              </div>
                            )
                          })
                            :
                            <div className='loadingGridData'>Cart is Empty.</div>
                        }
                      </>
                    )
                    :
                    (
                      <div>
                        <AddressList address={addressList} />
                      </div>
                    )

                }
              </div>
              <div className='vLine'></div>
              <div className='trueTheme-cart-rightSidebar'>
                <div className='shipping-container'>
                  <div className='shipping-wrap'>
                    {
                      shippingDetailsSuccess && shippingDetails && shippingDetails?.available_shippings?.length > 0
                      ?<Shipping shippingRate={handleShippingRate} apiHit={true} />:<DeliveryNotAvailableToast title={"Our service is not available in this location"}/>
                    }
                    
                  </div>
                </div>
                <CartOrdersDetails
                  loading={loading}
                  submitCart={() => { orderFromCartHandler() }}
                  discount={totalDiscount}
                  priceDetail={customerCartData}
                  prodTot={productTotal}
                  grTot={grandTotal}
                  codStatus={customerCartData}
                  codOption={(v) => { codStatusHandler(v) }}
                  page="Cart"
                  deliveryFees={deliveryFees}
                  disabled={disableContinueButton}
                  shippingDetails={shippingDetails}
                  shippingDetailsSuccess={shippingDetailsSuccess}
                  shippingValid={shippingDetailsSuccess && shippingDetails && shippingDetails?.available_shippings?.length > 0}
                // cartId={customerCartSuccess && customerCartData[0].cartId}
                />
              </div>
            </div>
              :
              <ComponentLoader />
            }
          </div>
        </div>
      </div>
    </React.Fragment >
  )
}

export default Cart