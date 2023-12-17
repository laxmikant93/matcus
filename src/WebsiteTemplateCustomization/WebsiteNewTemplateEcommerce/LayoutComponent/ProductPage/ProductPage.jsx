import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './productPage.scss';
// import TshirtImage from '../../assets/images/pTshirt.png';
// import Image from '../../assets/images/image200.png';
// import Image2 from '../../assets/images/image.jpg';
import Slider from "react-slick";
// import CODIcon from '../../assets/images/codIcon.png'
import { getCustomerProductDetail } from '../../../../store/actions/ecommerce/action/product';
// import { getSavedCustomer } from '../../../../store/actions/ecommerce/action/auth';
import { cartOperations, Postcart } from '../../../../store/actions/ecommerce/action/cartOrder';
// import Header from '../../HeaderLayout/Header';
// import Footer from '../../FooterLayout/Footer';
// import MobileBar from '../../CommonComponent/CommonJsx/MobileBar/MobileBar';
import CODavailable from '../../CommonComponent/CommonJsx/COD/CODavailable';
import Toast from '../../CommonComponent/CommonJsx/Toast/Toast';
import AppLinkUrl from '../../../../Common/AppLink/AppLinkUrl';
import { getWishList } from '../../../../store/actions/ecommerce/action/collection';
import Auth from '../../../../Classes/Auth';
import ThreeDotLoader from '../../../../Common/ThreeDotLoader/ThreeDotLoader';
import DefaultImage from '../../assets/images/Product_default.jpg'
import Share from '../../CommonComponent/CommonJsx/Share/Share';
import { convertToIndianFormat } from '../../../../CommonFunctions/helperFunction';
import { priceCalculator } from '../../CommonComponent/commonFunction/PriceCalculator';
import ReviewAndRating from './ReviewAndRating/ReviewAndRating';
// import GuestLogin from '../GuestLogin';
import { getGuestCartDetail, postCartForGuest } from '../../../../store/actions/ecommerce/action/guestIndex';
import { v4 as uuid } from 'uuid';


const ProductPage = () => {
  const [actImgInd, setActImgInd] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [variationDetailsData, setvariationDetailsData] = useState([]);
  const [varValues, setVarValues] = useState([]);
  const [varNames, setVarNames] = useState([]);
  const [activeSlide2, setActiveSlide2] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [descDropdown, setDescDropdown] = useState(-1);
  const [itemList, setItemList] = useState('');
  const [showProductDetails, setShowProductDetails] = useState({});
  const [variationValueSeletced, setVariationValueSeletced] = useState([]);
  const [imgSetVariation, setImgSetVariation] = useState([]);


  const { user, subdomainuser, productDetails, customerproductDetailLoading, customerproductDetailSuccess, customerCartData,
    customerCartSuccess, postSuccess, businessInfoSuccess, businessInfoData, variationDetails, customerCart, postLoading, guestCustomerCartData, busbusinessInfoDatainessinfo, currency, postGuestAddCartLoading, guestCustomerCartSuccess } = useSelector((state) => {
      return {
        user: state.user,
        subdomainuser: state.subdomainuser,
        customerproductDetailLoading: state.productList.customerproductDetail.loading,
        customerproductDetailSuccess: state.productList.customerproductDetail.success,
        variationDetails: state.productList.customerproductDetail.data.variation,
        productDetails: state.productList.customerproductDetail.data.product,
        customerCartData: state.orderCartList.customerCart.data.data,
        customerCartSuccess: state.orderCartList.customerCart.success,
        postLoading: state.orderCartList.customerCart.postLoading,
        postSuccess: state.orderCartList.customerCart.postSuccess,
        currency: state.currencyList,
        postGuestAddCartLoading: state.guestDataReducer.guestCustomerCart.loading,
        guestCustomerCartData: state.guestDataReducer.guestCustomerCart.data.data,
        guestCustomerCartSuccess: state.guestDataReducer.guestCustomerCart.success,

        businessInfoSuccess: state.businessInfo.ecomWebsite.success,
        // businessinfo: state.businessInfo.getInstituiteData.data,
        businessInfoData: state.businessInfo.ecomWebsite.data,


      }
    });

  const { customerDetail } = useSelector((state) => state.ecomAuth);
  const { ecomWebsite } = useSelector((state) => state.businessInfo);
  const { customerWishList } = useSelector((state) => state.collectionList);

  const { prodId } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const [btnHighlight, setBtnHighlight] = useState(false)




  useEffect(() => {
    if (customerWishList.success === true) {

      setItemList([...customerWishList.data]);
    }
  }, [customerWishList]);

  //small_id =  39423aed-0f03-4
  useEffect(() => {
    if (localStorage.getItem("Uuid_For_Guest_Login") && businessInfoSuccess && businessInfoData) {
      let guestUuidData = localStorage.getItem("Uuid_For_Guest_Login");
      dispatch(getGuestCartDetail(guestUuidData, businessInfoData._id));
    }

  }, [businessInfoData]);
  // useEffect(() => {
  //   let guestUuidData = localStorage.getItem("Uuid_For_Guest_Login");
  //   dispatch(getGuestCartDetail(guestUuidData, user.user_business));
  // }, []);


  useEffect(() => {
    if (customerDetail.success === true) {

      // if (customerDetail.data && customerDetail.data.data && customerDetail.data.data._id) {
      if (AppLinkUrl.privateDomain() && Auth.isLogin()) {
        dispatch(getWishList({ userId: user._id, status: "readWishList" }));
      } else if (AppLinkUrl.subdomain() && Auth.isSubdomainLogin()) {
        dispatch(getWishList({ userId: subdomainuser._id, status: "readWishList" }));
      }
    }
  }, [customerDetail]);


  const checkWishListed = () => {
    if (customerDetail.success === true) {
      if (((AppLinkUrl.privateDomain() && Auth.isLogin()) || (!AppLinkUrl.privateDomain() && Auth.isSubdomainLogin())) && customerWishList.success === true && itemList.length > 0) {
        let a = itemList.some(function (element) {
          return element.productId === prodId
        });
        return a
      }
    }
    else {
      return false
    }
  }

  useEffect(() => {
    checkWishListed()
  }, [itemList]);

  ////// DEFAULT ARIATION SELECTION
  useEffect(() => {
    if (!customerproductDetailLoading &&
      customerproductDetailSuccess && productDetails) {
      let AllTitle = []
      let firstValue = []
      let imgSetData = []
      for (let i = 0; i < productDetails.variant.length; i++) {
        if (productDetails.variant[i].isConnectImg === true) {
          for (let j = 0; j < productDetails.variant[i].imageSet.length; j++) {
            let data = {
              title: productDetails.variant[i].imageSet[j].variant_value,
              images: productDetails.variant[i].imageSet[j].images
            }
            imgSetData.push(data)
          }
          setImgSetVariation(imgSetData)
        }

        AllTitle.push(productDetails.variant[i].title)
        firstValue.push(productDetails.variant[i].value[0])

      }
      setVariationValueSeletced(firstValue)
      VariationSelect(firstValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerproductDetailLoading,
    customerproductDetailSuccess, productDetails])



  useEffect(() => {
    if (!customerproductDetailLoading &&
      customerproductDetailSuccess) {
      VariationSelect(variationValueSeletced)

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variationValueSeletced, customerproductDetailLoading,
    customerproductDetailSuccess])

  const VariationSelect = (value) => {
    for (let i = 0; i < variationDetails.length; i++) {
      let allFound = 0
      for (let j = 0; j < variationDetails[i].variant_scheme.length; j++) {
        if (value.includes(variationDetails[i].variant_scheme[j].value)) {
          allFound = allFound + 1
        }
      }
      if (allFound === variationDetails[i].variant_scheme.length) {
        setShowProductDetails(variationDetails[i])
        break
      }
    }
  }
  const VariationChange = (Item, value) => {
    for (let j = 0; j < Item.value.length; j++) {
      if (variationValueSeletced.includes(Item.value[j])) {
        let index = variationValueSeletced.indexOf(Item.value[j])
        let finalData = variationValueSeletced
        finalData.splice(index, 1, value)
        setVariationValueSeletced([...finalData])
      }
    }
  }

  const settings = {
    // dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    // beforeChange: (current, next) => setActiveSlide(activeSlide => next),
    afterChange: current => setActiveSlide2(activeSlide2 => current),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          // dots: true
          swipeToSlide: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          vertical: false,
          arrows: false,
          swipeToSlide: true,
          infinite: true,
          verticalSwiping: false,
        }
      },
      // {
      //   breakpoint: 480,
      //   settings: {
      //     slidesToShow: 1,
      //     slidesToScroll: 1
      //   }
      // }
    ]
  };

  const handleChangeImage = (index) => {

    setActImgInd(index);
  }

  useEffect(() => {
    setActImgInd(activeSlide2)
  }, [activeSlide2])
  const addToWishListHandler = () => {

    if (showProductDetails && showProductDetails._id) {
      const userId = AppLinkUrl.privateDomain() ? user._id : subdomainuser._id;
      // if (AppLinkUrl.privateDomain() ? AppLinkUrl.isLogin() : AppLinkUrl.subdomainuser()) {
      if ((Auth.isLogin() && AppLinkUrl.privateDomain()) || (Auth.isSubdomainLogin() && AppLinkUrl.subdomain())) {
        let body = {}
        if (btnHighlight) {
          body = { status: "remove from wishList", productId: showProductDetails._id, userId, quantity: 1 };
        } else {
          body = { status: "add to wishList", productId: showProductDetails._id, userId, quantity: 1 };

        }
        dispatch(cartOperations(body));
        if (customerCart && customerCart.success) {
          history('/ecom-wishlist');
        }
      } else {
        history('/customer-login');
      }
    } else {
      setPopupMessage('Please select all the variationDetails');
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
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

    setBtnHighlight(!btnHighlight);
  }

  useEffect(() => {
    if (customerWishList.success && customerWishList.data) {
      for (let index = 0; index < customerWishList.data.length; index++) {
        const element = customerWishList.data[index];
        if (element._id === showProductDetails._id) {
          setBtnHighlight(true);
        }
      }
    }
  }, [customerWishList.data, customerWishList.success, showProductDetails._id])

  const unique_id = uuid();
  const small_id = unique_id.slice(0, 15)


  // const handleSetData = () => {

  //   let authData = localStorage.getItem("Uuid_two");
  //   console.log(authData, "authData")
  //   if (authData === null) {
  //     console.log("datatatatat")
  //     localStorage.setItem("Uuid_two", small_id);
  //   } else {
  //     setGuestUuid(authData)
  //     console.log(authData, "else")
  //     console.log("no else")
  //   }
  // };

  // // console.log(guestCustomerCartData, "datatatatatattattata")


  // console.log(guestUuid, "Uuid")



  const addToCartHandler = (value) => {
    // showProductDetails
    // productDetails

    if (value === "GuestLogin") {
      // console.log("hellooooooooooo")
      // history('/guestlogin');
      // setGuestData(true)
      // history("/guestlogin")
      let guestUuidData = localStorage.getItem("Uuid_For_Guest_Login");
      // console.log(authData, "authData")
      if (guestUuidData === null || guestUuidData === "") {
        // console.log(localStorage.alive("Uuid_For_Guest_Login"))
        // console.log("guest")

        // if (localStorage.alive("Uuid_For_Guest_Login")) {
        localStorage.setItem("Uuid_For_Guest_Login", small_id);
        if (AppLinkUrl.privateDomain()) {
          // console.log("pvt")


          let body = {
            // status: "addToCart",
            guestUserId: small_id, productId: showProductDetails._id, quantity: 1, business: businessInfoData._id
          }
          dispatch(postCartForGuest(body));
        } else {
          // console.log("api hit ")

          let body = {
            // status: "addToCart",
            guestUserId: small_id, productId: showProductDetails._id, quantity: 1, business: businessInfoData._id
          }
          dispatch(postCartForGuest(body));
        }
        // }
      } else {
        // console.log("noguest")

        if (AppLinkUrl.privateDomain()) {
          // console.log("pvt")
          let guestUuidData = localStorage.getItem("Uuid_For_Guest_Login");

          let body = {
            // status: "addToCart",
            guestUserId: guestUuidData, productId: showProductDetails._id, quantity: 1, business: businessInfoData._id
          }
          dispatch(postCartForGuest(body));
        } else {
          // console.log("api hit ")

          let body = {
            // status: "addToCart",
            guestUserId: guestUuidData, productId: showProductDetails._id, quantity: 1, business: businessInfoData._id
          }
          dispatch(postCartForGuest(body));
        }
        // console.log(authData, "else")
        // console.log("no else")
      }
      // };
    } else {
      if (AppLinkUrl.privateDomain() && Auth.isLogin()) {
        let body = {
          // status: "addToCart",
          productId: showProductDetails._id, userId: user._id, quantity: 1, business: user.user_business
        }
        dispatch(Postcart(body));
      } else if (AppLinkUrl.subdomain() && Auth.isSubdomainLogin()) {
        let body = {
          // status: "addToCart",
          productId: showProductDetails._id, userId: subdomainuser._id, quantity: 1, business: subdomainuser.user_business
        }
        dispatch(Postcart(body));
      } else {
        history('/customer-login');
      }

    }

    // let varvariationDetails = variationDetails;
    // if (varNames.length > 0 && varValues.length > 0) {
    //   varNames.forEach((v, i) => {
    //     const opt = varvariationDetails.filter(vl => vl[varNames[i].toLowerCase().split(" ").join("")] === varValues[i]);
    //     varvariationDetails = opt;
    //   });
    // }
    // if (varColor.length > 0 && selectedColor) {
    //   const opt = variationDetails.filter(vl => vl.color === selectedColor);
    //   variationDetails = opt;
    // }
    // if (varSize.length > 0 && selectedSize) {
    //   const opt = variationDetails.filter(vl => vl.size === selectedSize);
    //   variationDetails = opt;
    // }
    // if (customerDetail.data && customerDetail.data.data && customerDetail.data.data._id) {
    //   // if (variationDetails && variationDetails.length > 0 &&
    //   //   ((varSize.length > 0 && selectedSize) || (varSize.length === 0 && !selectedSize)) &&
    //   //   ((varColor.length > 0 && selectedColor) || (varColor.length === 0 && !selectedColor))
    //   // ) {
    //   //   let body = { status: "addToCart", productId: variationDetails[0]._id, userId: customerDetail.data.data._id, quantity: 1 }
    //   //   dispatch(cartOperations(body));

    //   //   history('/ecom-cart');
    //   // }
    //   //   if (varvariationDetails.length === 1) {
    //   //     let body = { status: "addToCart", productId: varvariationDetails[0]._id, userId: customerDetail.data.data._id, quantity: 1 }
    //   //     dispatch(cartOperations(body));
    //   //     history('/ecom-cart');
    //   //   } else {
    //   //     // alert('Please select all the variationDetails');
    //   //     setPopupMessage('Please select all the variationDetails');
    //   //     setShowPopup(true);
    //   //     setTimeout(() => {
    //   //       setShowPopup(false);
    //   //     }, 2000);
    //   //   }
    //   // } else {
    //   //   if (varvariationDetails.length === 1) {
    //   //     const obj = { productId: varvariationDetails[0]._id, status: 'addToCart' };
    //   //     localStorage.setItem('cart', JSON.stringify(obj));
    //   //     history('/customer-login');
    //   //   } else {
    //   //     // alert('Please select all the variationDetails');
    //   //     setPopupMessage('Please select all the variationDetails');
    //   //     setShowPopup(true);
    //   //     setTimeout(() => {
    //   //       setShowPopup(false);
    //   //     }, 2000);
    //   //   }
    //   // }
    //   setBtnHighlight(false);
    // };
  }
  // page scroll to top

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const handleArrowButton = (id) => {
    setDescDropdown(descDropdown === id ? -1 : id);
  }

  const getPrice = (val) => {
    if (currency) {
      if (currency.selectedCurrency && currency.selectedCurrency.data.rate) return `${currency.selectedCurrency.data.symbol ? currency.selectedCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.selectedCurrency.data.commision, currency.selectedCurrency.data.rate))}`;
      else return `${currency.primaryCurrency.data.symbol ? currency.primaryCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.primaryCurrency.data.commision, currency.primaryCurrency.data.rate))}`;
    }
    return val;
  }

  const PushToBag = () => {
    history('/ecom-cart');
  }
  const handleGoToBag = () => {
    history('/guestlogin');
  }

  useEffect(() => {
    // if (!customerproductDetailSuccess) {

    if (AppLinkUrl.privateDomain()) {
      dispatch(getCustomerProductDetail("domain", AppLinkUrl.getHost(), prodId));
    } else {

      dispatch(getCustomerProductDetail("subdomain", AppLinkUrl.subdomain(), prodId));
    }
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prodId]);

  return (
    <React.Fragment>
      {/* <Header /> */}
      <div className='containerTrue pb-45 '>
        <div className='trueTheme-productPage-conatiner'>
          <ul className='trueTheme-breadcrumbs'>
            <li><Link to='/products'><i className='backIcon'></i><span className='back-text'>Back</span></Link></li>
          </ul>
          {
            !customerproductDetailLoading && customerproductDetailSuccess ? <div className='trueTheme-productDescription'>
              <div className='productDescription-leftSidebar-wrapper'>
                <div className='productDescription-leftSidebar'>
                  <div className='product-List-slick'>
                    <Slider {...settings} >

                      {
                        showProductDetails._id && showProductDetails.productPicture.length > 0 ? showProductDetails.productPicture.map((variationDetails, i) => {
                          return (

                            <div key={i} onClick={() => handleChangeImage(i)}>
                              <img src={variationDetails} alt="ProductImage" className='image-slide' />
                            </div>
                          )
                        }) : (
                          <div className='mobile-default'>
                            <img src={DefaultImage} alt="ProductImage" className='image-slide' />
                          </div>
                        )
                      }

                    </Slider>
                  </div>
                  {showPopup && <Toast text={popupMessage} />}
                  <div className='productPage-rightImage-wrap'>
                    <img src={showProductDetails._id && showProductDetails.productPicture.length > 0 ? showProductDetails.productPicture[actImgInd] : productDetails.productPicture.length > 0 ? productDetails.productPicture[actImgInd] : DefaultImage} alt="productimage" />

                    <div className="detailSharIcon-wrap">
                      <Share
                        id={showProductDetails._id}
                        IconClassName="deatilIcon"
                      />
                    </div>
                  </div>
                </div>

              </div>

              <div className='productDescription-rightSidebar'>
                {/* <p className='prodcutDescription-para'><span>Brand: &nbsp;</span><span>HRX</span></p> */}
                <h1 className='prodcutDescription-heading'>{productDetails.productName}</h1>
                {/* <p className='prodcutDescription-para'><span>Rating:&nbsp;</span><span>4.3</span><span className='product-start'>&#9733;</span></p> */}
                {/* <hr className='line' /> */}
                <div className='sku-wrap'>
                  <p className='sku-text-wrap'> <span className='sku-text'> Product SKU Code:</span> <span className='sku-value'>{showProductDetails.SKU}</span></p>
                  <hr className='line' />
                </div>


                <div className='price-div'>
                  {productDetails && productDetails.discountPercentage > 0 ? (
                    <>
                      {
                        productDetails.defaultVariation ? (
                          <>
                            {showProductDetails && showProductDetails.discount_by_percent ?
                              <>
                                <p className='prodcutDescription-heading'>{getPrice((100 - productDetails.discountPercentage) / 100 * (showProductDetails.price))}</p>
                                <p className='best-seller-discount'><del>{getPrice(productDetails.price)}</del></p>
                                <p className='best-seller-percentage'>{`${productDetails.discountPercentage}%`}</p>
                              </>
                              :
                              <>
                                <p className='prodcutDescription-heading'>{getPrice(showProductDetails.price - productDetails.discountPercentage)}</p>
                                <p className='best-seller-discount'><del>{getPrice(productDetails.price)}</del></p>
                                <p className='best-seller-percentage'>{getPrice(productDetails.discountPercentage)}</p>
                              </>

                            }
                          </>

                        ) : (

                          <>
                            {showProductDetails && showProductDetails.discount_by_percent ?
                              <>
                                <p className='prodcutDescription-heading'>{getPrice((100 - productDetails.discountPercentage) / 100 * (showProductDetails.price + productDetails.price))}</p>
                                <p className='best-seller-discount'><del>{getPrice(showProductDetails.price + productDetails.price)}</del></p>
                                <p className='best-seller-percentage'>{`${productDetails.discountPercentage}%`}</p>
                              </>
                              :
                              <>
                                <p className='prodcutDescription-heading'>{getPrice((showProductDetails.price + productDetails.price) - productDetails.discountPercentage)}</p>
                                <p className='best-seller-discount'><del>{getPrice(showProductDetails.price + productDetails.price)}</del></p>
                                <p className='best-seller-percentage'>{getPrice(productDetails.discountPercentage)}</p>
                              </>
                            }
                          </>
                        )
                      }
                    </>
                  ) : (
                    <>
                      {productDetails.defaultVariation ? (
                        <p className='prodcutDescription-heading'>{getPrice(showProductDetails.price)}</p>
                      ) : (
                        <>
                          <p className='prodcutDescription-heading'>{getPrice(showProductDetails.price + productDetails.price)}</p>
                        </>
                      )
                      }
                    </>
                  )

                  }
                  {/* {variationDetails && variationDetails.length === 0 ?
                    <>
                      <p className='prodcutDescription-heading'>Rs.{productDetails.salePrice ? productDetails.salePrice : productDetails.price}</p>
                      {productDetails.discountPercentage > 0 &&
                        <>
                          <p className='best-seller-discount'><del>{`Rs.${productDetails.price}`}</del></p>
                          <p className='best-seller-percentage'>{`${productDetails.discountPercentage}%`}</p>
                        </>
                      }
                    </>
                    :
                    <>
                      <p className='prodcutDescription-heading'>Rs.{variationDetails[0].salePrice}</p>
                      {variationDetails && variationDetails[0]?.discountPercentage > 0 &&
                        <>
                          <p className='best-seller-discount'><del>{`Rs.${variationDetails[0].price}`}</del></p>
                          <p className='best-seller-percentage'>{`${variationDetails[0].discountPercentage}%`}</p>
                        </>
                      }
                    </>
                  } */}
                </div>

                <p className='prodcutDescription-para'>Inc. of all taxes</p>
                {
                  productDetails.variant && productDetails.variant.length > 0 && <hr className='line' />
                }

                <div className='productdes-color'>
                  {
                    productDetails.variant && productDetails.variant.length > 0 && productDetails.variant.map((vl, i) => {
                      return (
                        <div className='productdes-color-con' key={i}>
                          <h3 className='productPage-select-p'>{vl.title}</h3>
                          <div className='category-wrap'>

                            {vl.value.map((option, index) => {
                              return (
                                <>
                                  {/* <div className={varNames.includes(option) && varValues.includes(option) ? 'category-div active' : 'category-div '} key={index} onClick={() => { selectVarHandler(option, option) }}> */}
                                  <div className={variationValueSeletced.includes(option) ? 'category-div active' : 'category-div '} key={index} onClick={() => VariationChange(vl, option)}>
                                    <p>{option}</p>
                                  </div>
                                </>
                              )
                            })
                            }
                          </div>
                        </div>
                      )
                    })
                  }

                </div>
                <hr className='line' />
                <div className='productDes-btn'>
                  {(Auth.isLogin() && AppLinkUrl.privateDomain()) || (Auth.isSubdomainLogin() && AppLinkUrl.subdomain()) ?
                    (
                      postLoading ?
                        <button className={`buttonTrue btnTrue-primary  `} > Loading...</button> :
                        <>{

                          customerCartSuccess && customerCartData.find((item) => item.product._id === showProductDetails._id) ? (
                            <>
                              {/* <button className={`buttonTrue btnTrue-primary  `} onClick={() => handleGoToBag()}><i className={`icon icon-bag i-s`}></i> GO TO BAG</button> */}
                              <button className={`buttonTrue btnTrue-primary  `} onClick={() => PushToBag()}><i className={`icon icon-bag i-s`}></i> VIEW BAG</button>
                            </>
                          ) :
                            (showProductDetails && (!showProductDetails.stock || showProductDetails.stock <= 0)) ||
                              (showProductDetails && showProductDetails?.outOfStock)
                              ?
                              <button className={`buttonTrue btnTrue red  `}>OUT OF STOCK</button> :
                              (

                                <button className={`buttonTrue btnTrue-primary  `} onClick={() => { addToCartHandler() }}><i className={`icon icon-bag i-s`}></i> ADD TO CART</button>
                              )
                        }
                        </>
                    )
                    :

                    (postGuestAddCartLoading ?
                      <button className={`buttonTrue btnTrue-primary  `} > Loading...</button> :
                      <>{

                        guestCustomerCartSuccess && guestCustomerCartData.find((item) => item.product._id === showProductDetails._id) ? (
                          <>
                            <button className={`buttonTrue btnTrue-primary  `} onClick={() => handleGoToBag()}><i className={`icon icon-bag i-s`}></i> GO TO BAG</button>
                            {/* <button className={`buttonTrue btnTrue-primary  `} onClick={() => PushToBag()}><i className={`icon icon-bag i-s`}></i> VIEW BAG</button> */}
                          </>
                        ) :
                          (showProductDetails && (!showProductDetails.stock || showProductDetails.stock <= 0)) ||
                            (showProductDetails && showProductDetails?.outOfStock)
                            ?
                            (<button className={`buttonTrue btnTrue red  `}>OUT OF STOCK</button>) :
                            (

                              <button className={`buttonTrue btnTrue-primary  `} onClick={() => { addToCartHandler("GuestLogin") }}><i className={`icon icon-bag i-s`}></i> ADD TO CART </button>
                            )
                      }
                      </>
                    )
                  }
                  {(Auth.isLogin() && AppLinkUrl.privateDomain()) || (Auth.isSubdomainLogin() && AppLinkUrl.subdomain()) ?

                    <button className={`buttonTrue ${btnHighlight ? 'btn-highlight' : ''}`} onClick={() => addToWishListHandler()}>
                      <i className={`icon    i-s heart-color ${btnHighlight ? 'icon-heartFilled' : 'icon-heart '}  `}>
                      </i>{checkWishListed() ? 'WishListed' : 'Wishlist'}
                    </button>
                    : ""}

                </div>
                <hr className='line' />
                <div className='productDes-lower-div'>
                  {/*  <div className='productDes-details' >
                    <p className='prodcutDescription-lower-p'>Please enter PIN code to check delivery time & Pay on Delivery Availability</p>
                  </div>
                  <hr className='line' />
                   */}
                  <div className='productDes-details'>
                  <CODavailable />
                    <h2 className='p-heading'>Product Details</h2>
                    <div className='prodcutDescription-para sun-editor-output'

                      dangerouslySetInnerHTML={{
                        __html:
                          productDetails.productDescription ? productDetails.productDescription : '',
                      }}
                    ></div>
                    <div className='collapae-container'>
                      {productDetails && productDetails.miscellaneous && productDetails.miscellaneous.length ?
                        productDetails.miscellaneous.map((item, key) => {
                          return (
                            <>
                              <div className='collapse-div' onClick={() => handleArrowButton(item._id)}>
                                <div className='collapse-head'>
                                  <p className='title-heading'>{item.title}</p>
                                  <button >
                                    {descDropdown === item._id ? <i className='icon-dropdown-up'></i> : <i className='icon-dropdown-down'></i>}
                                  </button>
                                </div>
                                {descDropdown === item._id ?
                                  <div className={`collapse-details`}>
                                    <p className='tittle-p' >{item.description}</p>
                                  </div>
                                  : ""
                                }
                              </div>
                              {/* {productDetails.miscellaneous.length > 1 && <hr className='line' />} */}

                            </>
                          );
                        }) :
                        ""
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className='parent-review-container'>
                {businessInfoSuccess && businessInfoData && businessInfoData.write_review === "none" ? "" :
                  <ReviewAndRating prodId={productDetails && productDetails?._id} />
                }
              </div>
            </div> : <ThreeDotLoader center={true} />
          }

        </div>
      </div>
      {/* <Footer /> */}
    </React.Fragment>
  )
}

export default ProductPage