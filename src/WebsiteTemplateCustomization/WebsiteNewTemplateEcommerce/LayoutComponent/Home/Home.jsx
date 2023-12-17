import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './home.scss';
import Slider from "react-slick";
import HeroImage from '../../assets/images/heroImage.png';
import Tshirt from '../../assets/images/tshirt.png';
import Tops from '../../assets/images/tops.png';
import Dress from '../../assets/images/dress.png';
import BestSeller1 from '../../assets/images/bestSeller1.png';
import BestSeller2 from '../../assets/images/bestseller2.png';
import BestSeller3 from '../../assets/images/bestSeller3.png';
import BestSeller4 from '../../assets/images/bestSeller4.png';
import NewArrival1 from '../../assets/images/newArrival1.png';
import NewArrival2 from '../../assets/images/newArrival2.png';
import NewArrival3 from '../../assets/images/newArrival3.png';
import NewArrival4 from '../../assets/images/newArrival4.png';
import { getSavedCustomer } from '../../../../store/actions/ecommerce/action/auth';
import { getFileteredProductList, getHomeProductSList, resetProductDetailsPage } from '../../../../store/actions/ecommerce/action/product';
import AppLink from '../../../../Common/AppLink';
import MobileBar from '../../CommonComponent/CommonJsx/MobileBar/MobileBar';
import { Link, useNavigate } from 'react-router-dom';
import ComponentLoader from '../../../../Common/Loader/ComponentLoader';
import { cartOperations, Postcart } from '../../../../store/actions/ecommerce/action/cartOrder';
import AppLinkUrl from '../../../../Common/AppLink/AppLinkUrl';
import DefaultImage from '../../assets/images/Product_default.jpg';
import Ribbon from '../../CommonComponent/CommonJsx/Ribbon/Ribbon';
import { CategoryPush, SubCategoryPush, SubSubCategoryPush, showAddSubSubCat, showAddSubCat, showAddCat, clearAllCategory } from '../../../../store/actions/catergoryFilter';
import { CollectionPush } from '../../../../store/actions/collectionfilter';
import { convertToIndianFormat } from '../../../../CommonFunctions/helperFunction';
import { priceCalculator } from '../../CommonComponent/commonFunction/PriceCalculator';

const EcommerceHome = () => {
  // const [slideShowImages, setSlideShowImages] = useState([]);
  const [categories, setCategories] = useState({});
  const [bestSellerProd, setBestSellerProd] = useState([]);
  const [newArrivalProd, setNewArrivalProd] = useState([]);
  const [featuredColl, setFeaturedColl] = useState([]);

  // const { customerDetail } = useSelector((state) => state.ecomAuth);
  // const user = useSelector((state) => state.user);
  // const subdomainuser = useSelector((state) => state.subdomainuser);
  const { homePageproducts } = useSelector((state) => state.productList);
  const { successCart, getAllData,
    getsuccess, currency } = useSelector((state) => {
      return {
        successCart: state.orderCartList.customerCart.success,
        getAllData: state.ecomAdmin.list.data,

        getsuccess: state.ecomAdmin.list.success,
        currency: state.currencyList,
      };
    });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSavedCustomer());
  }, []);

  const { data, success } = useSelector((state) => state.businessInfo.ecomWebsite);
  useEffect(() => {
    if (data && success) {
      dispatch(getFileteredProductList(data._id, "", { limit: 12, skip: (1 - 1) * 10 }));

    }
  }, [data, success])
  useEffect(() => {
    dispatch(resetProductDetailsPage())
  }, [])
  const user = useSelector((state) => state.user);
  const subdomainuser = useSelector((state) => state.subdomainuser);
  useEffect(() => {
    if (homePageproducts.success === true) {

      setCategories(homePageproducts.data.CategoryInfo);
      setBestSellerProd(homePageproducts.data.bestSeller);
      setNewArrivalProd(homePageproducts.data.newarrival);
      setFeaturedColl(homePageproducts.data.featuredCollection)
    }
  }, [homePageproducts])

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    fade: true,
  };
  const bestSeller = [
    {
      id: 1,
      image: BestSeller1,
      name: 'Relaxed Fit Cotton Tshirts',
      price: 1999.0,
      colors: ['red', 'green', 'blue', 'yellow', 'antiquewhite']
    },
    {
      id: 2,
      image: BestSeller2,
      name: 'Relaxed Fit Cotton Tshirts',
      price: 1999.0,
      colors: ['red', 'green', 'blue', 'yellow', 'antiquewhite']
    },
    {
      id: 3,
      image: BestSeller3,
      name: 'Relaxed Fit Cotton Tshirts',
      price: 1999.0,
      colors: ['red', 'green', 'blue', 'yellow', 'antiquewhite']
    },
    {
      id: 4,
      image: BestSeller4,
      name: 'Relaxed Fit Cotton Tshirts',
      price: 1999.0,
      colors: ['red', 'green', 'blue', 'yellow', 'antiquewhite']
    },
    {
      id: 5,
      image: BestSeller1,
      name: 'Relaxed Fit Cotton Tshirts',
      price: 1999.0,
      colors: ['red', 'green', 'blue', 'yellow', 'antiquewhite']
    },
    {
      id: 6,
      image: BestSeller2,
      name: 'Relaxed Fit Cotton Tshirts',
      price: 1999.0,
      colors: ['red', 'green', 'blue', 'yellow', 'antiquewhite']
    },
    {
      id: 7,
      image: BestSeller3,
      name: 'Relaxed Fit Cotton Tshirts',
      price: 1999.0,
      colors: ['red', 'green', 'blue', 'yellow', 'antiquewhite']
    },
    {
      id: 8,
      image: BestSeller4,
      name: 'Relaxed Fit Cotton Tshirts',
      price: 1999.0,
      colors: ['red', 'green', 'blue', 'yellow', 'antiquewhite']
    },
  ];

  const newArrival = [
    {
      id: 1,
      image: NewArrival1,
      name: 'Relaxed Fit Cotton Tshirts',
      price: 1999.0,
      colors: ['red', 'green', 'blue', 'yellow', 'antiquewhite']
    },
    {
      id: 2,
      image: NewArrival2,
      name: 'Relaxed Fit Cotton Tshirts',
      price: 1999.0,
      colors: ['red', 'green', 'blue', 'yellow', 'antiquewhite']
    },
    {
      id: 3,
      image: NewArrival3,
      name: 'Relaxed Fit Cotton Tshirts',
      price: 1999.0,
      colors: ['red', 'green', 'blue', 'yellow', 'antiquewhite']
    },
    {
      id: 4,
      image: NewArrival4,
      name: 'Relaxed Fit Cotton Tshirts',
      price: 1999.0,
      colors: ['red', 'green', 'blue', 'yellow', 'antiquewhite']
    },
    {
      id: 5,
      image: NewArrival1,
      name: 'Relaxed Fit Cotton Tshirts',
      price: 1999.0,
      colors: ['red', 'green', 'blue', 'yellow', 'antiquewhite']
    },
    {
      id: 6,
      image: NewArrival2,
      name: 'Relaxed Fit Cotton Tshirts',
      price: 1999.0,
      colors: ['red', 'green', 'blue', 'yellow', 'antiquewhite']
    },
    {
      id: 7,
      image: NewArrival3,
      name: 'Relaxed Fit Cotton Tshirts',
      price: 1999.0,
      colors: ['red', 'green', 'blue', 'yellow', 'antiquewhite']
    },
    {
      id: 8,
      image: NewArrival4,
      name: 'Relaxed Fit Cotton Tshirts',
      price: 1999.0,
      colors: ['red', 'green', 'blue', 'yellow', 'antiquewhite']
    },
  ];


  useEffect(() => {
    const _id = AppLinkUrl.privateDomain() ? user._id : subdomainuser._id;
    const buisness = AppLinkUrl.privateDomain() ? user.user_business : subdomainuser.user_business;
    if (_id) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      if (cart && cart.productId) {
        if (cart.status === 'addToCart') {
          // let body = { status: "addToCart", productId: cart.productId, userId: _id, quantity: 1 };
          let body = { productId: cart.productId, userId: _id, quantity: 1, business: buisness }
          dispatch(Postcart(body));
          // dispatch(cartOperations(body));
          // localStorage.removeItem('cart');
          // history('/ecom-cart');
        } else {
          let body = { status: "add to wishList", productId: cart.productId, userId: _id, quantity: 1 };
          dispatch(cartOperations(body));
          // localStorage.removeItem('cart');
          // history('/ecom-wishlist');
        }
      }
    }
  }, [user, subdomainuser]);

  useEffect(() => {
    if (successCart === true) {
      localStorage.removeItem('cart');
    }
  }, [successCart])

  // page scroll to top

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const categoryOnShopRedirection = (item) => {
    dispatch(clearAllCategory())
    // console.log("redirection click on shop page", item, "getalldata", getAllData)
    if (item.category_level === 0) {
      if (getAllData && getsuccess) {
        let data = getAllData.data.filter((element) => element._id === item._id)[0];

        if (data && data.subcategories.length > 0) {
          for (let i = 0; i < data.subcategories.length; i++) {
            dispatch(showAddSubCat(data.subcategories[i]._id))
            if (data.subcategories[i].subsubcategories.length > 0) {
              dispatch(showAddSubSubCat(data.subcategories[i].subsubcategories[i]._id))
            }
          }
        }

        dispatch(showAddCat(item._id))
        dispatch(CategoryPush(item._id))

      }
      // console.log("category level 0", item.category_level)
    }
    else if (item.category_level === 1) {
      dispatch(clearAllCategory())
      // console.log("category level 1", item.category_level, item.categoryId._id);
      if (getAllData && getsuccess) {
        let data = getAllData.data.filter((element) => element._id === item.categoryId._id)[0];
        if (data && data.subcategories.length > 0) {

          for (let i = 0; i < data.subcategories.length; i++) {
            if (data.subcategories[i]._id === item._id) {

              // dispatch(showAddSubSubCat(data.subCategoryitem.subsubcategories[i]._id))
              if (data.subcategories[i].subsubcategories.length > 0) {
                for (let i = 0; i < data.subcategories[i].subsubcategories.length; i++) {
                  dispatch(showAddSubSubCat(data.subcategories[i].subsubcategories[i]._id))
                }
              }


            }
          }
        }
      }

      dispatch(SubCategoryPush(item._id))
      dispatch(showAddSubCat(item._id))
    }
    else if (item.category_level === 2) {
      dispatch(clearAllCategory())
      // console.log("category level 2", item.category_level)
      dispatch(SubSubCategoryPush(item))
      dispatch(showAddSubSubCat(item._id))
    }
  }
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  const getPrice = (val) => {
    if (currency) {
      if (currency.selectedCurrency && currency.selectedCurrency.data.rate) return `${currency.selectedCurrency.data.symbol ? currency.selectedCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.selectedCurrency.data.commision, currency.selectedCurrency.data.rate))}`;
      else return `${currency.primaryCurrency.data.symbol ? currency.primaryCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.primaryCurrency.data.commision, currency.primaryCurrency.data.rate))}`;
    }
    return val;
  }

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  console.log(getAllData, "line 324", homePageproducts)
  return (
    <React.Fragment>
      {
        homePageproducts.success ?
          <React.Fragment>
            <div className='home-container'>
              <section className='home-slider-container'>
                {/* <div className='containerTrue'> */}
                <div className='trueTheme-hero-container'>
                  {windowSize.width <= 768 ?
                    <Slider {...settings}>
                      {

                        success && data.banners ? (
                          data.banners.length ?
                            data.banners.map((item, key) => {
                              return (
                                <React.Fragment>
                                  <div className='trueTheme-slider-div'>
                                    <a href={item.business_featured_banner_Url ? item.business_featured_banner_Url : "#"} className='sliderImage'>
                                      <img src={item.business_featured_mobile_banner ? item.business_featured_mobile_banner : item.business_featured_banner ? item.business_featured_banner : HeroImage} alt="" />
                                    </a>

                                  </div>
                                  {/* <h1>
                                {item.business_featured_headline ? item.business_featured_headline : "Ecom Website"}</h1>
                                <h3>{item.business_short_description ? item.business_short_description : "Fashion Website"}</h3> */}
                                </React.Fragment>
                              )
                            }) : <React.Fragment>
                              <div className='heroImage-div'>
                                <img src={HeroImage} alt="" />
                                {/* <div className='heroImage-text'> */}
                                {/* <h1 className='heading'>{"Ecom Website"}</h1>
                                <h3 className='sub-heading'>{"Fashion Website"}</h3> */}
                                {/* </div> */}
                              </div>


                            </React.Fragment>) : <React.Fragment>
                          <div className='heroImage-div'>
                            <img src={HeroImage} alt="" />
                          </div>
                          {/* <h1>{"Ecom Website"}</h1>
                        <h3>{"Fashion Website"}</h3> */}
                        </React.Fragment>

                      }
                      {/*
                <div>
                  <img src={HeroImage} alt="" />
                </div>
                <div>
                  <img src={HeroImage} alt="" />
                </div> */}
                    </Slider>
                    :
                    <Slider {...settings}>
                      {

                        success && data.banners ? (
                          data.banners.length ?
                            data.banners.map((item, key) => {
                              return (
                                <React.Fragment> <div className='trueTheme-slider-div'>
                                  <a href={item.business_featured_banner_Url ? item.business_featured_banner_Url : "#"} className='sliderImage'>
                                    <img src={item.business_featured_banner ? item.business_featured_banner : HeroImage} alt="" />
                                  </a>

                                </div>
                                  {/* <h1>
                                {item.business_featured_headline ? item.business_featured_headline : "Ecom Website"}</h1>
                                <h3>{item.business_short_description ? item.business_short_description : "Fashion Website"}</h3> */}
                                </React.Fragment>
                              )
                            }) : <React.Fragment>
                              <div className='heroImage-div'>
                                <img src={HeroImage} alt="" />
                                {/* <div className='heroImage-text'> */}
                                {/* <h1 className='heading'>{"Ecom Website"}</h1>
                                <h3 className='sub-heading'>{"Fashion Website"}</h3> */}
                                {/* </div> */}
                              </div>


                            </React.Fragment>) : <React.Fragment>
                          <div className='heroImage-div'>
                            <img src={HeroImage} alt="" />
                          </div>
                          {/* <h1>{"Ecom Website"}</h1>
                        <h3>{"Fashion Website"}</h3> */}
                        </React.Fragment>

                      }
                      {/*
                <div>
                  <img src={HeroImage} alt="" />
                </div>
                <div>
                  <img src={HeroImage} alt="" />
                </div> */}
                    </Slider>
                  }
                </div>
                {/* </div> */}
              </section >

              {
                homePageproducts.success && homePageproducts.data.featuredCategoryData && (
                  <section className='category-section'>
                    <div className='containerTrue'>
                      <h1 className='heading-category'>CATEGORIES </h1>
                      <div className='category-container'>
                        {/* {categories && Object.entries(categories).length > 0 ? Object.entries(categories).map((vl, i) => { */}

                        {categories && categories.length > 0 ? categories.map((vl, i) => {
                          return (
                            <Link to="/products" key={i} onClick={() => categoryOnShopRedirection(vl)}>
                              {/* <Link to={`/products?search=sc${vl[1][0]?.subCategoryId}`} key={i}> */}
                              <div className='category-section-image-wrap'>
                                <img src={vl.picture ? vl.picture : DefaultImage} alt="productImage" />

                                {/* <div className='overlay'></div> */}
                                <div className='category-section-text'>
                                  {/* <p className='cateogey-para'>{vl[0]}</p> */}
                                  <p className='cateogey-para'>{vl.categoryName ? vl.categoryName : vl.subCategoryName ? vl.subCategoryName : vl.subSubCategoryName ? vl.subSubCategoryName : ""}</p>
                                </div>
                              </div>
                            </Link>
                          );
                        }) :
                          <>
                            <div className='category-section-image-wrap'>
                              <img src={Tshirt} alt="productImage" />
                              {/* <div className='overlay'></div> */}
                              <div className='category-section-text'>
                                <p className='cateogey-para'>T-Shirts</p>
                              </div>
                            </div>
                            <div className='category-section-image-wrap'>
                              <img src={Tops} alt="" />
                              {/* <div className='overlay'></div> */}
                              <div className='category-section-text'>
                                <p className='cateogey-para'>Tops</p>
                              </div>
                            </div>
                            <div className='category-section-image-wrap'>
                              <img src={Dress} alt="" />
                              {/* <div className='overlay'></div> */}
                              <div className='category-section-text'>
                                <p className='cateogey-para'>Dresses</p>
                              </div>
                            </div>
                            <div className='category-section-image-wrap'>
                              <img src={BestSeller2} alt="" />
                              {/* <div className='overlay'></div> */}
                              <div className='category-section-text'>
                                <p className='cateogey-para'>Jeans</p>
                              </div>
                            </div>
                            {/* <div className='category-section-image-wrap'>
                            <img src={NewArrival4} alt="" />
                            <div className='category-section-text'>
                              <p className='cateogey-para'>Hoodie</p>
                            </div>
                          </div> */}
                          </>
                        }
                        {/* <div className='category-section-image-wrap'>
                <img src={Tshirt} alt="productImage" />
                <div className='overlay'></div>
                <div className='category-section-text'>
                  <p className='cateogey-para'>TSHIRTS</p>
                </div>
              </div>
              <div className='category-section-image-wrap'>
                <img src={Tops} alt="" />
                <div className='overlay'></div>
                <div className='category-section-text'>
                  <p className='cateogey-para'>TOPS</p>
                </div>
              </div>
              <div className='category-section-image-wrap'>
                <img src={Dress} alt="" />
                <div className='overlay'></div>
                <div className='category-section-text'>
                  <p className='cateogey-para'>DRESSES</p>
                </div>
              </div> */}
                      </div>
                    </div>
                  </section>
                )
              }


              {/* best seller section */}
              {
                homePageproducts.success && homePageproducts.data.featuredCollectonData &&
                <>
                  {featuredColl && featuredColl.length === 0 && <>
                    <section className='bestSeller-section'>
                      <div className='containerTrue'>
                        <h1 className='heading-bestSeller'>BEST SELLERS </h1>
                        <div className='bestSeller-container'>
                          {/* best seller loop start here */}
                          {
                            bestSellerProd && bestSellerProd.length > 0 && bestSellerProd[0] !== null ? bestSellerProd.map((options, i) => {
                              return (
                                <Link to={`/products/sc${options.subCategoryId}`} key={i}>
                                  < div className='best-seller-wrapper'>
                                    <div className='best-seller-image-wrap'>
                                      {/* <div className='image' style={{ backgroundImage: `url(${options.productPicture[0]})` }}>
                                  
                                  </div> */}
                                      <img src={options.productPicture[0]} className='image' alt="" />
                                      {/* <img src={options.image} alt="" /> */}
                                    </div>
                                    <div className='best-seller-description-wrap'>
                                      <p className='best-seller-name'>{options.productName}</p>
                                      <div className='price-div'>
                                        <p className='best-seller-price'>Rs.{convertToIndianFormat((getPrice(options.variations[0]?.price * (100 - options.variations[0]?.discountPercentage)) / 100))}</p>
                                        {options.variations[0]?.discountPercentage > 0 && <p className='best-seller-discount'><del>Rs.{convertToIndianFormat(getPrice(options.variations[0]?.price))}</del></p>}
                                        {options.variations[0]?.discountPercentage > 0 && <p className='best-seller-percentage'>({options.variations[0]?.discountPercentage}%)</p>}
                                      </div>

                                      {/* <div className='best-seller-color-wrap'>
                                    {
                            options.colors.map((color, index) => {
                              return (
                                <div key={index} className='best-seller-color-div' style={{ backgroundColor: color }}></div>
                              )
                            })
                          }
                                  </div> */}
                                    </div>

                                    <Ribbon />
                                  </div>
                                </Link>
                              )
                            }) :
                              <>{
                                bestSeller.map((options) => {
                                  return (
                                    < div className='best-seller-wrapper' key={options.id}>
                                      <div className='best-seller-image-wrap'>
                                        {/* <div className='image' style={{ backgroundImage: `url(${options.image})` }}>

                                    </div> */}
                                        <img className='image' src={options.image} alt="" />
                                      </div>
                                      <div className='best-seller-description-wrap'>
                                        <p className='best-seller-name'>{options.name}</p>
                                        <p className='best-seller-price'>{getPrice(options.price)}</p>
                                        {/* <div className='best-seller-color-wrap'>
                                      {
                                        options.colors.map((color, index) => {
                                          return (
                                            <div key={index} className='best-seller-color-div' style={{ backgroundColor: color }}></div>
                                          )
                                        })
                                      }
                                    </div> */}
                                      </div>
                                      <Ribbon />
                                    </div>
                                  )
                                })
                              }
                              </>

                          }
                          {/* best seller loop end here */}
                        </div>
                        <div className='explore-more'>
                          {featuredColl && featuredColl.length !== 0 ?
                            <p ><Link className='explore-more-text' to={'/products/1'}>Explore More  </Link></p>
                            :
                            <p className='explore-more-text' >Explore More</p>
                          }
                          {/* <span>&#x27F6;</span> */}
                        </div>
                      </div>
                    </section>

                    <section className='newArrival-section'>
                      <div className='containerTrue'>
                        <h1 className='heading-newArrival'>New Arrival </h1>
                        <div className='newArrival-container'>
                          {/* best seller loop start here */}
                          {
                            newArrivalProd && newArrivalProd.length > 0 && newArrivalProd[0] !== null ? newArrivalProd.map((options, i) => {
                              return (
                                <Link to={`/products/sc${options.subCategoryId}`} key={i}>
                                  < div className='newArrival-wrapper' key={i}>
                                    <div className='newArrival-image-wrap'>
                                      {/* <div className='image' style={{ backgroundImage: `url(${options.productPicture[0]})` }}>
                                  </div> */}
                                      <img src={options.productPicture[0]} alt="" className='image' />
                                    </div>
                                    <div className='newArrival-description-wrap'>
                                      <p className='newArrival-name'>{options.productName}</p>

                                      <div className='price-div'>
                                        <p className='newArrival-price'>Rs.{convertToIndianFormat(Math.ceil((options.variations[0]?.price * (100 - options.variations[0]?.discountPercentage)) / 100))}</p>
                                        {options.variations[0]?.discountPercentage > 0 && <p className='best-seller-discount'><del>Rs.{convertToIndianFormat(options.variations[0]?.price)}</del></p>}
                                        {options.variations[0]?.discountPercentage > 0 && <p className='best-seller-percentage'>({options.variations[0]?.discountPercentage}%)</p>}
                                      </div>
                                      {/* <div className='newArrival-color-wrap'>
                                    {
                            newArrivalProd.length > 0 && newArrivalProd.map((opt, index) => {
                              return (
                                <div key={index} className='newArrival-color-div' style={{ backgroundColor: opt}}></div>
                              )
                            })
                          }
                                  </div> */}
                                    </div>
                                    <Ribbon />
                                  </div>
                                </Link>
                              )
                            }) :
                              <>
                                {
                                  newArrival.map((options) => {
                                    return (
                                      < div className='newArrival-wrapper' key={options.id}>
                                        <div className='newArrival-image-wrap'>
                                          {/* <div className='image' style={{ backgroundImage: `url(${options.image})` }}>
                                      </div> */}
                                          <img src={options.image} alt="" className='image' />
                                        </div>
                                        <div className='newArrival-description-wrap'>
                                          <p className='newArrival-name'>{options.name}</p>
                                          <p className='newArrival-price'>{getPrice(options.price)}</p>
                                          {/* <div className='newArrival-color-wrap'>
                                        {
                                          options.colors.map((color, index) => {
                                            return (
                                              <div key={index} className='newArrival-color-div' style={{ backgroundColor: color }}></div>
                                            )
                                          })
                                        }
                                      </div> */}
                                        </div>
                                        <Ribbon />
                                      </div>
                                    )
                                  })

                                }</>
                            // <div className='loadingGridData'>No Data Found.</div>

                          }
                          {/* best seller loop end here */}

                        </div>
                      </div>
                      <div className='explore-more'>
                        {featuredColl && featuredColl.length !== 0 ?
                          <p ><Link className='explore-more-text' to={'/products/1'}>Explore More  </Link></p>
                          :
                          <p className='explore-more-text' >Explore More</p>
                        }
                        {/* <span>&#x27F6;</span> */}
                      </div>
                    </section>
                  </>}
                  {featuredColl && featuredColl.length > 0 && featuredColl.map((vl, i) => {
                    return (
                      <section className='bestSeller-section'>
                        <div className='containerTrue'>
                          <h1 className='heading-bestSeller'>{vl.collectionName}</h1>
                          <div className='bestSeller-container'>
                            {/* best seller loop start here */}
                            {
                              vl.productId && vl.productId.length > 0 && vl.productId[0] !== null && vl.productId.map((options, i) => {
                                return (

                                  <Link to={`/products/${options.urlSlug}`} key={i}>
                                    < div className='best-seller-wrapper'>
                                      <div className='best-seller-image-wrap'>
                                        {/* <div className='image' style={{ backgroundImage: `url(${options.productPicture[0] ? options.productPicture[0] : DefaultImage})` }}>
                                    </div> */}
                                        <img className='image' src={options.productPicture[0] ? options.productPicture[0] : DefaultImage} alt="" />
                                      </div>
                                      <div className='best-seller-description-wrap'>
                                        <p className='best-seller-name'>{options.productName}</p>
                                        {/* <div className='price-div'>
                                      <p className='best-seller-price'>Rs.{Math.ceil((options.variations[0]?.price * (100 - options.variations[0]?.discountPercentage)) / 100)}</p>
                                      {options.variations[0]?.discountPercentage > 0 && <p className='best-seller-discount'><del>Rs.{options.variations[0]?.price}</del></p>}
                                      {options.variations[0]?.discountPercentage > 0 && <p className='best-seller-percentage'>({options.variations[0]?.discountPercentage}%)</p>}
                                    </div> */}
                                        <div className='price-div'>
                                          {options.discountPercentage > 0 ?
                                            <p className='prodcutDescription-heading'>{getPrice(options.salePrice)}</p>
                                            :
                                            <p className='prodcutDescription-heading'>{getPrice(options.price)}</p>
                                          }
                                          {options.discountPercentage > 0 && <>
                                            <p className='best-seller-discount'><del>{getPrice(options?.price)}</del></p>
                                            {options?.discount_by_percent ?
                                              <p className='best-seller-percentage'>({options?.discountPercentage}%)</p>
                                              :
                                              <p className='best-seller-percentage'>({getPrice(options?.discountPercentage)})</p>
                                            }
                                          </>}
                                        </div>
                                        {
                                          options?.ribbon ? (
                                            <Ribbon
                                              Ribbon={options}
                                            />
                                          ) : ""
                                        }

                                        {/* <div className='best-seller-color-wrap'>
                                      {
                                options.colors.map((color, index) => {
                                  return (
                                    <div key={index} className='best-seller-color-div' style={{ backgroundColor: color }}></div>
                                  )
                                })
                              }
                                    </div> */}
                                      </div>
                                    </div>
                                  </Link>
                                )
                              })

                            }
                            {/* best seller loop end here */}
                          </div>
                          <div className='explore-more'>
                            <p ><Link className='explore-more-text' to={`/products`} onClick={() => { dispatch(CollectionPush(vl._id)) }}>Explore More </Link></p>
                            {/* <span>&#x27F6;</span> */}
                          </div>
                        </div>
                      </section>
                    )
                  })}
                </>
              }


            </div>
          </React.Fragment>
          : ""}

    </React.Fragment >
  )
}

export default EcommerceHome
