import React, { useEffect, useRef, useState, useLayoutEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import logo from '../assets/icons/JuShop.svg';
import Bag from '../assets/icons/bag.svg';
import Heart from '../assets/icons/heart2.svg';
import Profile from '../assets/icons/profile.svg';
import Search from '../assets/icons/search.svg';
import image1 from '../assets/images/bestSeller1.png'
import './header.scss';
import { getFileteredProductList } from '../../../store/actions/ecommerce/action/product';
import { getAllCategoryList } from '../../../store/actions/ecomAdmin/index';
import { getCustomerLogout, getSavedCustomer } from '../../../store/actions/ecommerce/action/auth';
import { useDetectOutsideClick } from '../../../Common/DetectOutsideClick/useDetectOutsideClick';
import Auth from '../../../Classes/Auth';
import { customerOrderDetailReset, Getcart, readCart, resetCart } from '../../../store/actions/ecommerce/action/cartOrder';
import { useLocation } from 'react-router-dom';
import AppLinkUrl from '../../../Common/AppLink/AppLinkUrl';
import DropdownMenu from './DropdownMenu';
import TabNavbar from './TabNav/TabNavbar';
import MSideNavbar from './MSideNavbar';
import AppLink from '../../../Common/AppLink';
import SearchControl from '../../../Common/SearchControl';
import { clearAllCategory, showAddCat, showAddSubCat, showAddSubSubCat, CategoryPush, clearSearchFilter } from '../../../store/actions/catergoryFilter';
import { resetWishlist } from '../../../store/actions/ecommerce/action/collection';
import { debounce } from '../../../Common/ImageUploader/UnsplashSection/commonFunction';
import { getGuestCartDetail, guestafterlogincart } from '../../../store/actions/ecommerce/action/guestIndex';
import CurrencySelector from './CurrencySelector/CurrencySelector';
import { getCurrencyList } from '../../../store/actions/ecommerce/action/currency';
import Storage from '../../../Classes/Storage';
import RibbonHeader from './RibbonHeader/RibbonHeader';

const Header = ({ filters }) => {
  const searchRef = useRef(null)
  const dropRef = useRef(null);
  let refDrop = useRef(null);
  let sidenavRef = useRef(null)
  // const { categoryslug, subcategoryslug, subsubcategoryslug } = useParams();

  const [openDropDown, setOpenDropDown] = useDetectOutsideClick(dropRef, false);
  const [search, setSearch] = useState('');
  const [searchFind, setSearchFind] = useState(true);
  const [innerWindow, setWindow] = useState({
    width: undefined,
  });
  const [totalItems, setTotalItems] = useState(0);
  const [searchIcon, setSearchIcon] = useDetectOutsideClick(searchRef, false);
  const [dropdown, setDropdown] = useState(false)
  const [shopDropdown, setShopDropdown] = useState(false)
  const [MoreDropdown, setMoreDropdown] = useState(false)
  const [hoverId, setHoverId] = useState("")
  const [moreHoverId, setMoreHoverId] = useState("")
  const [MoreCategory, setMoreCategory] = useState(false)


  // const { customerDetail } = useSelector((state) => state.ecomAuth);
  const user = useSelector((state) => state.user);
  const subdomainuser = useSelector((state) => state.subdomainuser);
  const { customerCart } = useSelector((state) => state.orderCartList);
  const { data, success } = useSelector((state) => state.businessInfo.ecomWebsite);
  const { getAllData, getloading, getsuccess, getbusinessInfoData, customerCartData, customerCartSuccess, clearSearch, businessInfoSuccess,
    businessInfoData, guestCustomerCartData, guestCustomerCartSuccess, guestLoginCartDataSuccess } = useSelector((state) => {
      return {
        getAllData: state.ecomAdmin.list.data,
        getloading: state.ecomAdmin.list.loading,
        getsuccess: state.ecomAdmin.list.success,
        getbusinessInfoData: state.businessInfo.ecomWebsite.data,
        customerCartData: state.orderCartList.customerCart.data.data,
        customerCartSuccess: state.orderCartList.customerCart.success,
        clearSearch: state.catergoryFilter.clearStateSearch,
        businessInfoSuccess: state.businessInfo.ecomWebsite.success,
        businessInfoData: state.businessInfo.ecomWebsite.data,
        guestCustomerCartData: state.guestDataReducer.guestCustomerCart.data.data,
        guestCustomerCartSuccess: state.guestDataReducer.guestCustomerCart.success,
        guestLoginCartDataSuccess: state.guestDataReducer.guestLoginCartData.success,

        // getbusinessInfoSuccess: state.businessInfo.ecomWebsite.success,
        // getbusinessInfoloading: state.businessInfo.ecomWebsite.loading,
      };
    })
  // window.addEventListener("resize", function () {
  //   setWindow(this.innerWidth)
  // })
  // console.log(getbusinessInfoData, "getbusinessInfoData")
  useLayoutEffect(() => {
    dispatch(resetCart());
    dispatch(customerOrderDetailReset());
    dispatch(resetWishlist());
    if (AppLinkUrl.privateDomain()) {
      dispatch(getCurrencyList(AppLinkUrl.getHost(), 'domain'));
    } else {
      dispatch(getCurrencyList(AppLinkUrl.subdomain(), 'subdomain'));
    }
  }, []);
  useEffect(() => {
    function handleResize() {
      setWindow({
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.addEventListener("resize", handleResize);
  }, [])
  // useEffect(() => {
  //   dispatch(getGuestCartDetail("1SUITANDJEANS8799878", user.user_business));
  // }, []);


  useEffect(() => {
    if (localStorage.getItem("Uuid_For_Guest_Login") && businessInfoSuccess && businessInfoData) {
      let guestUuidData = localStorage.getItem("Uuid_For_Guest_Login");
      dispatch(getGuestCartDetail(guestUuidData, businessInfoData._id));
    }

  }, [businessInfoData]);

  useEffect(() => {
    const handler = (e) => {
      if (dropdown && shopDropdown && MoreDropdown && MoreCategory && refDrop.current && !refDrop.current.contains(e.target)) {
        setDropdown(false)
        setMoreDropdown(false)
        setShopDropdown(false)
        setMoreCategory(false)
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [setDropdown])

  const MouseEnter = (id) => {
    setDropdown(true)
    setMoreDropdown(true)
    setShopDropdown(true)
    setMoreCategory(true)
    setHoverId(id)
    setMoreHoverId(id)
  }
  const MouseLeave = () => {
    setDropdown(false)
    setMoreDropdown(false)
    setShopDropdown(false)
    setMoreCategory(false)
    setHoverId("")
    setMoreHoverId("")
  }
  const CloseDropdown = () => {
    dropdown && setDropdown(false)
    MoreDropdown && setMoreDropdown(false)
    shopDropdown && setShopDropdown(false)
    MoreCategory && setMoreCategory(false)
  }


  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
  }, [user, subdomainuser]);

  useEffect(() => {
    if (getbusinessInfoData && getbusinessInfoData._id) {
      dispatch(getAllCategoryList(getbusinessInfoData._id))

    }
  }, [dispatch, getbusinessInfoData])



  // useEffect(() => {
  //   // if (customerDetail.data && customerDetail.data.data && customerDetail.data.data._id) {
  //   //   dispatch(readCart({ userId: customerDetail.data.data._id, status: "readAddToCart" }));
  //   // }
  //   if (AppLinkUrl.privateDomain()) {
  //     if (user && user._id) {
  //       dispatch(readCart({ userId: user._id, status: "readAddToCart" }));
  //     }
  //   } else {
  //     if (subdomainuser && subdomainuser._id) {
  //       dispatch(readCart({ userId: subdomainuser._id, status: "readAddToCart" }));
  //     }
  //   }
  // }, [subdomainuser, user, dispatch]);
  useEffect(() => {
    if (AppLinkUrl.privateDomain() && Auth.isLogin()) {
      dispatch(Getcart(user.user_business, user._id))
    } else if (AppLinkUrl.subdomain() && Auth.isSubdomainLogin()) {
      dispatch(Getcart(subdomainuser._id, subdomainuser.user_business))
    }

  }, [user, subdomainuser])
  // useEffect(() => {
  //   // if (customerCart.success === true && customerCart.data && customerCart.data.cartProduct && customerCart.data.cartProduct.length > 0) {

  //   //   const iTot = customerCart.data.cartProduct.reduce((tot, curr, i) => {
  //   //     return tot + curr.quantity;
  //   //   }, 0);
  //   //   setTotalItems(iTot);
  //   // }
  //   if (customerCart.success && customerCart.data.length) {
  //     setTotalItems(customerCart.data.length);
  //   }
  // }, [customerCart]);

  const showDropDown = () => {
    setOpenDropDown(prev => !prev)
  }
  const handleSearch = () => {
    setSearchIcon(!searchIcon)
  }
  const [show, setShow] = useDetectOutsideClick(sidenavRef, false);

  const handleShowMenu = () => {
    setShow(prev => !prev);
  }


  const getSearchData = (value) => {
    setSearchFind(true);
    // setSearchIcon(false);
    if (value && businessInfoSuccess && businessInfoData) {
      history(`/products/?search=sr${value}`);
      dispatch(getFileteredProductList(businessInfoData._id, (value), { limit: 12, skip: 0 }));
    } else {
      if (window.location.href.includes("?search=")) {
        history(`/products`);
      }
      setSearchIcon(false);
      dispatch(getFileteredProductList(businessInfoData._id, (value), { limit: 12, skip: 0 }));
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optimizedFn = useCallback(debounce(getSearchData), []);

  // const searchHandler = (e) => {
  //   setSearchFind(true);
  //   setSearchIcon(false);
  //   setSearch(e.target.value)
  //   if (e.target.value === "") {
  //     setSearchFind(false);
  //   }
  //   history(`/products/?search=sr${search}`);

  // }

  // useEffect(() => {
  //   if (search) {
  //     history(`/products/?search=sr${search}`);
  //   }
  //   else {
  //     if (!searchFind && !search) {
  //       history(`/products`);
  //     }
  //   }
  // }, [history, search, searchFind])

  useEffect(() => {
    /*  setSearch("") */
    if (clearSearch.status) {
      setSearch("");
      dispatch(clearSearchFilter(false))
    }

  }, [clearSearch])

  const handle = (item) => {
    // console.log(item)
    setSearch("")
    if ('/customer-login') {
      localStorage.removeItem("Guest_new_userId")
      // localStorage.removeItem("Uuid_For_Guest_Login")
      localStorage.removeItem("Guest_shipping_address_Id")
    }
    if (window.location.pathname.includes("/ecom-orderDetails")) {
      // console.log("true")
      localStorage.removeItem("Guest_new_userId")
      localStorage.removeItem("Uuid_For_Guest_Login")
      localStorage.removeItem("Guest_shipping_address_Id")
    }
    dispatch(clearAllCategory())
    history(item)
    setOpenDropDown(false)
  }
  const handleforGuestbag = (item) => {
    setSearch("")
    dispatch(clearAllCategory())
    history(item)
    if (window.location.pathname.includes("/ecom-orderDetails")) {
      // console.log("true")
      localStorage.removeItem("Guest_new_userId")
      localStorage.removeItem("Uuid_For_Guest_Login")
      localStorage.removeItem("Guest_shipping_address_Id")
    }
  }
  const dynamicRoute = () => {
    if (window.location.host.includes("my_app")) {
      return ".my_app.com:3000"
    } else if (window.location.host.includes("getmelight")) {
      return ".getmelight.com"
    } else if (window.location.host.includes("unicated")) {
      return ".unicated.com"
    } else if (window.location.host.includes("edneed")) {
      return ".edneed.com"
    } else {
      return ".edneed.com"
    }
  }
  const logoutHandler = () => {
 
    if (AppLinkUrl.subdomain()) {
      Auth.subdomainlogout()
      window.location.href = `http://${AppLinkUrl.subdomain()}${dynamicRoute()}`
    } else {
      Auth.logout()
      return window.location.href = "/";
    }
  };

  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");
  const splitLocation1 = pathname.split("/category/");

  const handleCategoryNavbarFilter = (Categoryitem) => {
    dispatch(clearAllCategory())
    dispatch(CategoryPush(Categoryitem._id))
    dispatch(showAddCat(Categoryitem._id))
    if (Categoryitem.subcategories.length > 0) {
      for (let i = 0; i < Categoryitem.subcategories.length; i++) {
        dispatch(showAddSubCat(Categoryitem.subcategories[i]._id))
        if (Categoryitem.subcategories[i].subsubcategories.length > 0) {
          dispatch(showAddSubSubCat(Categoryitem.subcategories[i]._id))
        }
      }
    }
    history("/products")
  }

  const ShowMoreButton = getsuccess && getAllData?.data && getAllData?.data.filter((item) => item.show_on_header === true).slice(3);

  const ribbinHead = businessInfoSuccess && businessInfoData?.language?.multipleLanguage;
  // console.log(user._id)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSearchIcon(false);
  }

  // console.log(subdomainuser.user_business)

  let guestUserId = localStorage.getItem("Uuid_For_Guest_Login");
  useEffect(() => {
    // console.log(guestUserId)


    if (guestUserId && ((Auth.isLogin() && AppLinkUrl.privateDomain()) || (Auth.isSubdomainLogin() && AppLinkUrl.subdomain()))) {
      dispatch(guestafterlogincart(guestUserId, AppLinkUrl.privateDomain() ? user._id : subdomainuser._id, AppLinkUrl.privateDomain() ? user.user_business : subdomainuser.user_business))
      // localStorage.removeItem("Uuid_For_Guest_Login")

    }
  }, [dispatch, guestUserId, subdomainuser._id, subdomainuser.user_business, subdomainuser.user_businessdd, user._id, user.user_business])

  // console.log(guestLoginCartDataSuccess, "dushyant")

  useEffect(() => {
    // console.log(guestLoginCartDataSuccess)
    if (guestLoginCartDataSuccess && ((Auth.isLogin() && AppLinkUrl.privateDomain()) || (Auth.isSubdomainLogin() && AppLinkUrl.subdomain()))) {
      localStorage.removeItem("Uuid_For_Guest_Login")
    }
  }, [guestLoginCartDataSuccess])

  return (
    <React.Fragment>
      <header className={searchIcon ? "show" : "hide"}>
        {
          ribbinHead && <RibbonHeader />
        }
        <div onMouseLeave={MouseLeave} ref={refDrop} className="header-wrapper">
          <div className='containerTrue'>
            <div className='header-container'>
              <div className='logo' onClick={() => handle('/')}>
                <Link to={''}><img src={success && data.business_logo ? data.business_logo : logo} alt="logo" /></Link>
              </div>
              <button className='humburgar-btn' onClick={handleShowMenu}>
                <span className='hamLine'></span>
                <span className='hamLine'></span>
                <span className='hamLine'></span>
              </button>
              {
                innerWindow.width > 992 ? (
                  <div ref={sidenavRef} className={`bumrurgar-navbar-container ${show ? "displayShow" : ""}`}>
                    <div className='left-nav'>
                      <ul className='nav-bar-ul'>
                        <li onMouseEnter={MouseLeave} className={splitLocation[1] === "Home" ? "active" : ""}><button onClick={() => handle('/')}> Home</button></li>
                        {
                          businessInfoSuccess && businessInfoData.show_shop_on_header ? (
                            <li
                              ref={refDrop}
                              onMouseEnter={() => MouseEnter("shop")}
                              className={`list ${splitLocation[1] === "products" ? "active" : ""}`}
                            >
                              <React.Fragment>
                                <button
                                  ref={refDrop}
                                  onMouseEnter={() => MouseEnter("shop")}
                                  onClick={() => handle('/products')}
                                >{businessInfoData.shop_name ? businessInfoData.shop_name : "Shop"}</button>
                                {
                                  getsuccess && getAllData?.data && getAllData?.data.length > 0 && getAllData?.data.map((item) => {
                                    return (
                                      !item?.show_on_header ? (
                                        <TabNavbar
                                          refDrop={refDrop}
                                          MouseLeave={MouseLeave}
                                          shopDropdown={shopDropdown}
                                          hoverId={hoverId}
                                          successData={getsuccess}
                                          getAllData={getAllData}
                                        />
                                      ) : ""
                                    )
                                  })
                                }
                              </React.Fragment>
                            </li>
                          ) : ""
                        }

                        {
                          getsuccess && getAllData?.data && getAllData?.data.filter((item) => item.show_on_header === true).slice(0, 3).map((Categoryitem, key) => (
                            <React.Fragment >
                              <li className={`${splitLocation1[Categoryitem?._id] === Categoryitem?.categoryName ? "active" : ""}`} key={key} >
                                <button
                                  // to={`/category/${Categoryitem.slug}`}
                                  onMouseEnter={() => MouseEnter(Categoryitem?._id)}
                                  onClick={() => handleCategoryNavbarFilter(Categoryitem)}
                                >{Categoryitem?.categoryName}</button>
                                {
                                  Categoryitem.subcategories.length > 0 ? (
                                    <>
                                      <DropdownMenu
                                        refDrop={refDrop}
                                        MouseLeave={MouseLeave}
                                        hoverId={hoverId}
                                        dropdown={dropdown}
                                        Successdata={getsuccess}
                                        Categoryitem={Categoryitem}
                                      />
                                    </>
                                  ) : ("")
                                }
                              </li>
                            </React.Fragment>
                          ))
                        }
                        <li onMouseEnter={MouseLeave} className={splitLocation[1] === "ecom-aboutus" ? "active" : ""}><button onClick={() => handle('/ecom-aboutus')}>About Us</button></li>
                        <li onMouseEnter={MouseLeave} className={splitLocation[1] === "ecom-contactus" ? "active" : ""}><button onClick={() => handle('/ecom-contactus')}>Contact us</button></li>
                        <li >
                          {
                            <>
                              {
                                ShowMoreButton && ShowMoreButton.length > 0 ? (
                                  <button
                                    ref={refDrop}
                                    onMouseEnter={() => MouseEnter("MoreOptionvisible")}
                                    onClick={CloseDropdown}
                                  >More</button>
                                ) : ""
                              }
                              {
                                ShowMoreButton && ShowMoreButton.length > 0 ? (
                                  <ul onMouseLeave={MouseLeave} ref={refDrop} className={`more-option ${MoreDropdown && hoverId === "MoreOptionvisible" ? "MoreOptionvisible" : "invisible"}`}>
                                    {
                                      getsuccess ? (
                                        ShowMoreButton.map((Categoryitem) => (
                                          <>
                                            <li className="dropList" key={Categoryitem._id}>
                                              <button
                                                ref={refDrop}
                                                onClick={() => handleCategoryNavbarFilter(Categoryitem)}
                                                onMouseEnter={() => setMoreHoverId(Categoryitem._id)}
                                                className="buttonList"
                                              >
                                                {Categoryitem?.categoryName}
                                              </button>
                                              {
                                                Categoryitem?.subcategories.length > 0 ? (
                                                  <DropdownMenu
                                                    refDrop={refDrop}
                                                    dropdownPosition="Right"
                                                    MouseLeave={MouseLeave}
                                                    dropdown={MoreCategory}
                                                    hoverId={moreHoverId}
                                                    Successdata={getsuccess}
                                                    Categoryitem={Categoryitem}
                                                  />
                                                ) : ""
                                              }
                                            </li>
                                          </>
                                        ))
                                      ) : ("")
                                    }
                                  </ul>

                                ) : ""

                              }
                            </>
                          }
                        </li>
                      </ul>
                    </div>
                    {/* {
                innerWindow > 992 ? (
                  <div className='search-div'>
                    <input
                      type="search"
                      placeholder='Search for products and more'
                      value={search}
                      onChange={(e) => { e.key !== 'Enter' && setSearch(e.target.value) }}
                      onKeyDown={(e) => { e.key === 'Enter' && searchHandler() }}
                    />
                    <div className='search-icon-div'>
                      <i onClick={search && searchHandler} className=' ed-icon i-s gray icon-search'></i>
                    </div>
                  </div>
                ) : ""} */}
                  </div>
                ) : ""
              }



              {/* <div className='search-div'>
              <input
                type="search"
                placeholder='Search products'
                value={search}
                onChange={(e) => { e.key !== 'Enter' && searchHandler(e) }}
                onKeyDown={(e) => { e.key === 'Enter' && searchHandler(e) }}

              />
              <div className='search-icon-div'>
                <i onClick={search && searchHandler} className=' ed-icon i-s gray icon-search'></i>
              </div>
            </div> */}
              {/* {
              innerWindow < 992 ? (
                <div className='search-div'>
                  <input
                    type="search"
                    placeholder='Search for products and more'
                    value={search}
                    onChange={(e) => { e.key !== 'Enter' && setSearch(e.target.value) }}
                    onKeyDown={(e) => { e.key === 'Enter' && searchHandler() }}
                  />
                  <div className='search-icon-div'>
                    <i onClick={search && searchHandler} className=' ed-icon i-s gray icon-search'></i>
                  </div>
                </div>
              ) : ""
            } */}

              <div className='right-nav' onMouseEnter={MouseLeave}>
                <div>
                  <CurrencySelector />
                </div>
                <div className='right-div'>
                  {/* <img src={Search} alt="" onClick={handleSearch} /> */}
                  <button onClick={handleSearch}><i className="icon-search"></i></button>
                </div>
                {
                  innerWindow.width > 500 && (
                    <div className='right-div'>
                      {/* <img src={Profile} alt="" onClick={showDropDown} /> */}
                      <button onClick={showDropDown}><i className='icon-user'></i></button>
                      <ul ref={dropRef} className={`profile-lis-ul ${openDropDown ? "displayShow-dropDown" : ""}`}>

                        {(Auth.isSubdomainLogin() && AppLinkUrl.subdomain()) || (Auth.isLogin() && AppLinkUrl.privateDomain()) ?
                          <React.Fragment>
                            <li><button className='li-btn-link' onClick={() => handle('/ecom-myprofile')}>My Account</button></li>
                            <li><button className='li-btn-link' onClick={() => handle('/ecom-myOrders')}>My Orders</button></li>
                            <li><button className='li-btn-link' onClick={() => handle('/ecom-wishlist')}>My Wishlist</button></li>
                            <li><button className='li-btn-link' onClick={() => { logoutHandler() }}>Logout</button></li>
                          </React.Fragment>
                          :
                          <React.Fragment>
                            <li><button className='li-btn-link' onClick={() => handle('/customer-login')}>Login</button></li>
                            <li><button className='li-btn-link' onClick={() => handle('/customer-signup')}>Sign Up</button></li>
                          </React.Fragment>
                        }
                      </ul>
                    </div>
                  )
                }
                {/* <div className='right-div' >
                <button className='right-div' onClick={() => handle('/ecom-wishlist')}>
                <img src={Heart} onClick={() => handle('/ecom-wishlist')} alt="" />
                <p onClick={() => handle('/ecom-wishlist')} className={` ${splitLocation[1] === "ecom-wishlist" ? "wishlistActive" : "whishlist-p"} `} > </p>

                </button>
              </div> */}
                <div className='right-div'>
                  <div className='right-div-bag' >

                    {(Auth.isLogin() && AppLinkUrl.privateDomain()) || (Auth.isSubdomainLogin() && AppLinkUrl.subdomain()) ?
                      <div className="bag-image">
                        {/* <img onClick={() => handle('/ecom-cart')} src={Bag} alt="" /> */}

                        <button onClick={() => handle('/ecom-cart')}><i className="icon-cart"></i></button>
                        {
                          customerCartSuccess && customerCartData.length > 0 && (<div className='count-div'>
                            <span>{customerCartData.length}</span>
                          </div>)}
                      </div>
                      :
                      <div className="bag-image">
                        {/* <img onClick={() => handle('/ecom-cart')} src={Bag} alt="" /> */}

                        <button onClick={() => handleforGuestbag("/guestlogin")}><i className="icon-cart"></i></button>
                        {
                          guestCustomerCartSuccess && guestCustomerCartData.length > 0 && (<div className='count-div'>
                            <span>{guestCustomerCartData.length}</span>
                          </div>
                          )
                        }
                      </div>
                    }




                    {/* <p onClick={() => handle('/ecom-cart')} className={` ${splitLocation[1] === "ecom-cart" ? "wishlistActive" : "whishlist-p"} `}>Bag</p> */}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={`search-overlay ${searchIcon ? "active" : ""}`}>
        <div ref={searchRef} className={`search-div ${searchIcon ? "active" : ""}  ${ribbinHead ? "ribbinTrue" : ""}`}>
          <div className='containerTrue'>
            {/* <SearchControl
              type="search"
              placeholder='Search for products and more'
              value={search}
              onChange={(e) => { e.key !== 'Enter' && setSearch(e.target.value) }}
              onKeyDown={(e) => { e.key === 'Enter' && searchHandler() }}
            /> */}
            {searchIcon ? <form onSubmit={(e) => handleFormSubmit(e)}>
              <input
                type="search"
                placeholder='Search for products and more'
                onChange={(e) => { e.key !== 'Enter' && optimizedFn(e.target.value) }}
                onKeyDown={(e) => { e.key === 'Enter' && setSearchIcon(false) }}
                autoFocus={true}
              />
              <button className="search-close-icon" type="reset" onClick={() => optimizedFn("")}>&#215;</button>
            </form> : ""}
            <div className='search-icon-div'>
              <i className=' ed-icon i-s gray icon-search'></i>
            </div>
          </div>
        </div>
      </div>
      {
        innerWindow.width < 992 ? (
          <div className={`sidenav-overlay ${show ? "active" : ""}`}>
            <MSideNavbar
              sidenavRef={sidenavRef}
              show={show}
            />
          </div>
        ) : ""
      }


    </React.Fragment>
  )
}

export default Header