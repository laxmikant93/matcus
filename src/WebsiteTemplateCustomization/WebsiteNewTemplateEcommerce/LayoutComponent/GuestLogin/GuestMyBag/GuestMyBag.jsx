import React from 'react'
import './guestmybag.scss'
import ProductImg from '../../../assets/images/bestSeller1.png'
import SelectInput from '../../../../../Common/Form/SelectInput'
import { useEffect } from 'react'
import { getGuestCartDetail, guestCartUpdate, resetGuestCartUpdatel } from '../../../../../store/actions/ecommerce/action/guestIndex'
import { useDispatch, useSelector } from 'react-redux'
import DefaultImage from '../../../assets/images/Product_default.jpg'
import { priceCalculator } from '../../../CommonComponent/commonFunction/PriceCalculator'
import AppLinkUrl from '../../../../../Common/AppLink/AppLinkUrl'
import CODavailable from '../../../CommonComponent/CommonJsx/COD/CODavailable'

const GuestMyBag = () => {
  const {
    user, guestCustomerCartData, productDetails, guestCustomerCartsuccess, businessInfoSuccess, guestCustomerCartloading, guestCartUpdateloading, guestCartUpdateSuccess,
    businessInfoData, currency } = useSelector((state) => {
      return {
        user: state.user,
        subdomainuser: state.subdomainuser,
        guestCustomerCartData: state.guestDataReducer.guestCustomerCart.data.data,
        guestCustomerCartloading: state.guestDataReducer.guestCustomerCart.loading,
        guestCustomerCartsuccess: state.guestDataReducer.guestCustomerCart.success,
        guestCartUpdateSuccess: state.guestDataReducer.guestCartUpdate.success,
        guestCartUpdateloading: state.guestDataReducer.guestCartUpdate.loading,
        businessInfoSuccess: state.businessInfo.ecomWebsite.success,
        // businessinfo: state.businessInfo.getInstituiteData.data,
        businessInfoData: state.businessInfo.ecomWebsite.data,
        currency: state.currencyList,
        productDetails: state.productList.customerproductDetail.data.product,

      }
    });
  const dispatch = useDispatch();



  // useEffect(() => {
  //   let guestUuidData = localStorage.getItem("Uuid_For_Guest_Login");

  //   dispatch(getGuestCartDetail(guestUuidData, user.user_business));
  // }, []);
  useEffect(() => {
    if (localStorage.getItem("Uuid_For_Guest_Login") && businessInfoSuccess && businessInfoData) {
      let guestUuidData = localStorage.getItem("Uuid_For_Guest_Login");
      dispatch(getGuestCartDetail(guestUuidData, businessInfoData._id));
    }

  }, [businessInfoData]);


  const convertToIndianFormat = (val) => {
    let resp = '';
    let prev = 0;
    let curr = 3;
    let out = [];
    if (val || val == 0) {
      resp = val.toString().split('').reverse();
      if (resp.length >= 3) {
        while (curr <= resp.length + 1) {
          const str = resp.slice(prev, curr);
          out = [...out, ...str, ','];
          prev = curr;
          curr = curr + 2;
        }
        out = out.reverse()
        out = out.join("").substring(1);
        return out;
      }
    }
    return val;
  }

  const removefromCartHandler = (_id, varId) => {
    let guestUuidData = localStorage.getItem("Uuid_For_Guest_Login");

    dispatch(guestCartUpdate(_id, varId, "remove", guestUuidData, businessInfoData._id));
    // dispatch(cartUpdate(_id, varId, "remove", user._id, user.user_business));
  };

  const changeQtyHandle = (id, type, varId) => {
    let guestUuidData = localStorage.getItem("Uuid_For_Guest_Login");

    if (type === "plus") {
      dispatch(guestCartUpdate(id, varId, "quantity", guestUuidData, businessInfoData._id));

    } else {
      dispatch(guestCartUpdate(id, varId, "quantityDesc", guestUuidData, businessInfoData._id));

    }
  }

  // console.log(guestCartUpdateSuccess)
  useEffect(() => {
    return () => {
      if (guestCartUpdateSuccess) {
        dispatch(resetGuestCartUpdatel())
      }
    }
  }, [dispatch, guestCartUpdateSuccess])


  const getPrice = (val) => {
    if (currency) {
      if (currency.selectedCurrency && currency.selectedCurrency.data.rate) return `${currency.selectedCurrency.data.symbol ? currency.selectedCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.selectedCurrency.data.commision, currency.selectedCurrency.data.rate))}`;
      else return `${currency.primaryCurrency.data.symbol ? currency.primaryCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.primaryCurrency.data.commision, currency.primaryCurrency.data.rate))}`;
    }
    return val;
  }
  return (
    <div className='guest-bag-wrapper'>

      {/* {/ {guestCustomerCartsuccess && guestCustomerCartData.length} /} */}
      {/* {/ <h1 className="top-heading"><span className="darkHeading">My Bag &nbsp;</span><span className="cart-item-heading">{guestCustomerCartsuccess && guestCustomerCartData.length} {guestCustomerCartData.length === 1 ? ' item' : ' item(s)'}</span></h1> /} */}

      {/* {/ cart container wrapper /} */}
      {/* {/ {guestCustomerCartsuccess && guestCustomerCartData.length > 0((map))} /} */}
      {guestCustomerCartsuccess && guestCustomerCartData && guestCustomerCartData.length > 0 ? guestCustomerCartData.map((pr, i) => {
        return (
          <div className='guest-cart-address-wrap mt-25'>
            <div className='cart-order-list-wraper'>
              <div className='cart-order-leftSidebar'>

                {/* <p className='cart-order-p'> */}


                {/* </p> */}
                <div className='price-div mb-5' >
                  <p className='capitalize'>{pr.product.variationName}</p>
                </div>
                <div className='price-div'>
                  {pr.product.discountPercentage > 0 ? (
                    <>
                      {
                        pr.product.defaultVariation ? (

                          <>
                            {pr.product?.discount_by_percent ?
                              <>
                                <p className='prodcutDescription-heading'>{getPrice((100 - pr.product.discountPercentage) / 100 * (pr.product.price))}</p><p className='best-seller-discount'><del>{getPrice(pr.product.price)}</del></p><p className='best-seller-percentage'>{`${pr.product.discountPercentage}%`}</p>
                              </>
                              :
                              <>
                                <p className='prodcutDescription-heading'>{getPrice(pr.product.price - pr.product.discountPercentage)}</p>
                                <p className='best-seller-discount'><del>{getPrice(pr.product.price)}</del></p>
                                <p className='best-seller-percentage'>{`Rs.${pr.product.discountPercentage}`}</p>
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
                </div>
                {/* {console.log(pr?.product?.variant_scheme)} */}
                <div className='order-change-value-wrap'>


                  { }
                  <div className='order-change-value-wrap-rightSidebar'>
                    <p className='order-count-value'>
                      {guestCustomerCartloading === true ? " " : pr.quantity > 1 ?
                        <button className='sign plus' disabled={guestCartUpdateloading} onClick={() => changeQtyHandle(pr.cartId, 'minus', pr.product._id, pr.product.stock, pr.quantity)} >&#8722;</button>
                        : ""
                      }
                      <span className='count'> {pr.quantity}</span>
                      {/* <button className='sign plus' onClick={() => changeQtyHandle(pr.cartId, 'plus', pr.product._id, pr.product.stock, pr.quantity)}>&#43;</button> */}
                      {pr.quantity === pr.product.stock ?
                        ""
                        // <button className={`sign plus ${pr.quantity === pr.product.stock ? 'btn-disable' : ''}`} disabled>&#43;</button>
                        :
                        <button className='sign plus' disabled={guestCartUpdateloading} onClick={() => { changeQtyHandle(pr.cartId, 'plus', pr.product._id, pr.product.stock, pr.quantity) }}>&#43;</button>
                      }
                    </p>
                  </div>

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
              <div className='cart-order-rightSidebar'>
                <img src={pr.product.productPicture && pr.product.productPicture.length > 0 ? pr.product.productPicture[0] : DefaultImage} alt="cartImage" />

              </div>
            </div>
            <div className='guest-bottom-btn-wrapper'>
              <hr className='hori-line' />
              <div className='btn-wrapper'>
                <button className='btn-bottom buttoncart-btn btn-left' onClick={() => { removefromCartHandler(pr.cartId, pr.product._id) }}>Remove</button>
                {/* {/ <button className='btn-bottom buttoncart-btn btn-right '>Move to Wishlist</button> /} */}
              </div>
            </div>
          </div>
        )
      })
        :
        <div className='loadingGridData'>Cart is Empty.</div>
      }
    </div>


  )
}

export default GuestMyBag