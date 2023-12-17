import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './wishlist.scss';
import Imgae1 from '../../assets/images/bestseller2.png'
import { getWishList, wishListToCart } from '../../../../store/actions/ecommerce/action/collection';
import { useNavigate } from 'react-router-dom';
// import { getSavedCustomer } from '../../../../store/actions/ecommerce/action/auth';
import ComponentLoader from '../../../../Common/Loader/ComponentLoader';
import MobileBar from '../../CommonComponent/CommonJsx/MobileBar/MobileBar';
import { Link } from 'react-router-dom';
import AppLinkUrl from '../../../../Common/AppLink/AppLinkUrl';
import { convertToIndianFormat } from '../../../../CommonFunctions/helperFunction';
import DefaultImage from '../../assets/images/Product_default.jpg'
import { priceCalculator } from '../../CommonComponent/commonFunction/PriceCalculator';
import Auth from '../../../../Classes/Auth';
import { cartOperations } from '../../../../store/actions/ecommerce/action/cartOrder';
import { showSuccessPopup } from '../../../../store/actions/successmessagepopup';
import WishListPopUp from './WishListPopUp';

const WishList = () => {
  const wishListRef = useRef(null)
  const [itemList, setItemList] = useState('');

  // const { customerDetail } = useSelector((state) => state.ecomAuth);
  const user = useSelector((state) => state.user);
  const subdomainuser = useSelector((state) => state.subdomainuser);
  const { customerWishList } = useSelector((state) => state.collectionList);
  const currency = useSelector((state) => state.currencyList);
  const dispatch = useDispatch();
  const history = useNavigate();

  // useEffect(() => {
  //   dispatch(getSavedCustomer());
  // }, []);

  useEffect(() => {
    // if (customerDetail.success === true) {

    //   if (customerDetail.data && customerDetail.data.data && customerDetail.data.data._id) {
    //     dispatch(getWishList({ userId: customerDetail.data.data._id, status: "readWishList" }));
    //   }
    //   if (!customerDetail.data || !customerDetail.data.data || !customerDetail.data.data._id) {
    //     history('/customer-login');
    //   }
    // }
    if ((AppLinkUrl.privateDomain() && user._id) || (!AppLinkUrl.privateDomain() && subdomainuser._id)) {
      dispatch(getWishList({ userId: AppLinkUrl.privateDomain() ? user._id : subdomainuser._id, status: "readWishList" }));
    }
    if ((AppLinkUrl.privateDomain() && !user._id) || (!AppLinkUrl.privateDomain() && !subdomainuser._id)) {
      history('/customer-login');
    }
  }, [subdomainuser, history, user, dispatch]);

  useEffect(() => {
    if (customerWishList.success === true) {

      setItemList([...customerWishList.data]);
    }
  }, [customerWishList]);

  const wishlistToCartHandler = (id) => {
    const body = {
      userId: AppLinkUrl.privateDomain() ? user._id : subdomainuser._id,
      variationId: id,
      business: AppLinkUrl.privateDomain() ? user.user_business : subdomainuser.user_business
    }
    dispatch(wishListToCart(body));
    history('/ecom-cart');
  };

  // const loop = [1, 2, 3, 4, 5];

  // page scroll to top


  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const getPrice = (val) => {
    if (currency) {
      if (currency.selectedCurrency && currency.selectedCurrency.data.rate) return `${currency.selectedCurrency.data.symbol ? currency.selectedCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.selectedCurrency.data.commision, currency.selectedCurrency.data.rate))}`;
      else return `${currency.primaryCurrency.data.symbol ? currency.primaryCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.primaryCurrency.data.commision, currency.primaryCurrency.data.rate))}`;
    }
    return val;
  }
  // }, [])
  const removeFromWishListHandler = (_id) => {
    // console.log(showProductDetails);
    // console.log(subdomainuser);
    // console.log(user);
    // if (showProductDetails && showProductDetails._id) {
    const userId = AppLinkUrl.privateDomain() ? user._id : subdomainuser._id;
    // if (AppLinkUrl.privateDomain() ? AppLinkUrl.isLogin() : AppLinkUrl.subdomainuser()) {

    let body = {}
    body = { status: "remove from wishList", productId: _id, userId, quantity: 1 };

    dispatch(cartOperations(body));
    let array = itemList
    array = array.filter((item) => item._id !== _id)
    setItemList([...array])
    dispatch(showSuccessPopup("Removed Successfully."))
  }

  // let varvariationDetails = variationDetails;
  // if (varNames.length > 0 && varValues.length > 0) {
  //   varNames.forEach((v, i) => {
  //     const opt = varvariationDetails.filter(vl => vl[varNames[i].toLowerCase().split(" ").join("")] === varValues[i]);
  //     varvariationDetails = opt;
  //   });
  // }

  // if (customerDetail.data && customerDetail.data.data && customerDetail.data.data._id) {
  //   if (varvariationDetails.length === 1) {
  //     let body = { status: "add to wishList", productId: varvariationDetails[0]._id, userId: customerDetail.data.data._id, quantity: 1 }
  //     dispatch(cartOperations(body));
  //   } else {
  //     setPopupMessage('Please select all the variationDetails');
  //     setShowPopup(true);
  //     setTimeout(() => {
  //       setShowPopup(false);
  //     }, 2000);
  //   }
  // } else {
  //   if (varvariationDetails.length === 1) {
  //     const obj = { productId: variationDetails[0]._id, status: 'wishlist' };
  //     localStorage.setItem('cart', JSON.stringify(obj));
  //     history('/customer-login');
  //   } else {
  //     setPopupMessage('Please select all the variationDetails');
  //     setShowPopup(true);
  //     setTimeout(() => {
  //       setShowPopup(false);
  //     }, 2000);
  //   }
  // }
  // const [woshL]
  const WishListBadgeOpen = () => {
    wishListRef.current.open()
  }
  const WishListBadgeClose = () => {
    wishListRef.current.close()
  }



  return (
    <React.Fragment>
      <div className='containerTrue pb-45 '>
        <div className='wishlist-container'>
          <h3 className='heading-top'>My Wishlist <span className='items-number'>{itemList && itemList.length}</span></h3>
          {customerWishList.success ? <div className='wishlist-grid-wrapper'>
            {
              itemList && itemList.length > 0 ? itemList.map((v, i) => {
                return (
                  <div className='wishlist-wrap' key={i}>
                    <div className='wishlist-image-div CardOverLay'>
                      <Link to={`/products/${v?.slug}`}>
                        <img src={v.productPicture && v.productPicture.length > 0 ? v.productPicture[0] : DefaultImage} alt="" />
                      </Link>
                      <button className='remove-btn' onClick={() => { removeFromWishListHandler(v._id) }}><i className='remove-icon'></i></button>

                    </div>


                    <div className='wishlist-details-div'>
                      <p>{v.variationName}</p>
                      {v?.discountPercentage > 0 ?
                        <>
                          {v?.defaultVariation ?
                            <>
                              {v?.discount_by_percent ?
                                <p>{getPrice((100 - v.discountPercentage) / 100 * (v.price))}.00</p>
                                :
                                <p>{getPrice(v.price - v.discountPercentage)}.00</p>
                              }
                            </>
                            :
                            <>
                              {v?.discount_by_percent ?
                                <p>{getPrice((100 - v.discountPercentage) / 100 * (v.price + v.salePrice))}.00</p>
                                :
                                <p>{getPrice((v.price + v.salePrice) - v.discountPercentage)}.00</p>
                              }
                            </>
                          }
                        </>
                        :
                        <>
                          {v?.defaultVariation ?
                            <p>{getPrice(v.price)}.00</p>
                            :
                            <p>{getPrice(v.price + v.salePrice)}.00</p>
                          }
                        </>
                      }

                      {/* <button className='buttonTrue btnTrue-o-primary btn-sm wishlist-btn' onClick={() => { wishlistToCartHandler(v._id) }}>MOVE TO BAG</button> */}
                      <button className='buttonTrue btnTrue-o-primary btn-sm wishlist-btn' onClick={() => wishlistToCartHandler(v?._id)}>MOVE TO BAG</button>


                    </div>

                  </div>
                )
              }) :
                <div className='loadingGridData'>No Items Found.</div>
            }
          </div> : <ComponentLoader />}
        </div>
      </div>
      {/* <WishListPopUp wishListRef={wishListRef} close={() => WishListBadgeClose()} /> */}
    </React.Fragment>
  )
}

export default WishList