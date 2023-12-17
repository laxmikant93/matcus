import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import Auth from '../../../Classes/Auth';
import AppLinkUrl from '../../../Common/AppLink/AppLinkUrl';
import { useDetectOutsideClick } from '../../../Common/DetectOutsideClick/useDetectOutsideClick';
import { getAllCategoryList } from '../../../store/actions/ecomAdmin';
import { readCart } from '../../../store/actions/ecommerce/action/cartOrder';
import { clearAllCategory, showAddCat, showAddSubCat, showAddSubSubCat, CategoryPush, SubCategoryPush, SubSubCategoryPush } from '../../../store/actions/catergoryFilter';

const MSideNavbar = ({ sidenavRef, show }) => {
  // const dropRef = useRef()
  const dispatch = useDispatch();
  const history = useNavigate();
  const [totalItems, setTotalItems] = useState(0);
  const [categoryMenu, setCategoryMenu] = useDetectOutsideClick(sidenavRef, -1)
  const [showMenu, setShowMenu] = useDetectOutsideClick(sidenavRef, -1);
  const [showSubMenu, setShowSubMenu] = useDetectOutsideClick(sidenavRef, -1);

  const RedirectHandle = (item) => {
    history(item)
  }

  const handleCategoryMenu = (index) => {
    // Storage.setJson('menu', categoryMenu === index ? -1 : index)
    categoryMenu === index && setCategoryMenu(-1);
    showMenu === index && setShowMenu(-1);
    setCategoryMenu(categoryMenu === index ? -1 : index);
  }
  const handleShowMenu = (index) => {
    // Storage.setJson('menu', showMenu === index ? -1 : index)
    showMenu === index && setShowSubMenu(-1);
    setShowMenu(showMenu === index ? -1 : index);
    setShowSubMenu(showSubMenu === index ? -1 : index);
  }

  const handleShowSubMenu = (index) => {
    // Storage.setJson('menu', showMenu === index ? -1 : index)
    setShowSubMenu(showSubMenu === index ? -1 : index);
  }

  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  const user = useSelector((state) => state.user);
  const subdomainuser = useSelector((state) => state.subdomainuser);
  const { customerCart } = useSelector((state) => state.orderCartList);
  const { data, success } = useSelector((state) => state.businessInfo.ecomWebsite);
  const { getAllData, getloading, getsuccess, getbusinessInfoData, getbusinessInfoSuccess, getbusinessInfoloading } = useSelector((state) => {
    return {
      getAllData: state.ecomAdmin.list.data,
      getloading: state.ecomAdmin.list.loading,
      getsuccess: state.ecomAdmin.list.success,
      getbusinessInfoData: state.businessInfo.ecomWebsite.data,
      getbusinessInfoSuccess: state.businessInfo.ecomWebsite.success,
      getbusinessInfoloading: state.businessInfo.ecomWebsite.loading,
    };
  })

  useEffect(() => {
    if (getbusinessInfoData && getbusinessInfoData._id) {
      dispatch(getAllCategoryList(getbusinessInfoData._id))

    }
  }, [dispatch, getbusinessInfoData])

  const handle = (item) => {
    // shopDropdown && setShopDropdown(false)
    // setSearch("")
    history(item)
  }

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
  const handleSubCategoryNavbarFilter = (subCategoryitem) => {
    dispatch(clearAllCategory())
    dispatch(SubCategoryPush(subCategoryitem._id))
    dispatch(showAddSubCat(subCategoryitem._id))
    if (subCategoryitem.subsubcategories.length > 0) {
      for (let i = 0; i < subCategoryitem.subsubcategories.length; i++) {
        dispatch(showAddSubSubCat(subCategoryitem.subsubcategories[i]._id))
      }
    }
    history("/products")
  }
  const handleSubSubCategoryNavbarFilter = (subsubitem) => {
    dispatch(clearAllCategory())
    dispatch(SubSubCategoryPush(subsubitem))
    dispatch(showAddSubSubCat(subsubitem._id))
    history("/products")
  }

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
    if (customerCart.success === true && customerCart.data && customerCart.data.cartProduct && customerCart.data.cartProduct.length > 0) {

      const iTot = customerCart.data.cartProduct.reduce((tot, curr, i) => {
        return tot + curr.quantity;
      }, 0);
      setTotalItems(iTot);
    }
  }, [customerCart]);

  const logoutHandler = () => {
    // console.log("lijne 114")
    Auth.logout()
    history("/customer-login");
  };

  const ShopMenuList = getsuccess && getAllData?.data && getAllData?.data.filter((item) => item.show_on_header === false);

  return (
    <React.Fragment>
      <div ref={sidenavRef} className={`SideNavbar-wrapper ${show ? "active" : ""}`}>
        <div className="LoginSign-wrap">

          {(Auth.isSubdomainLogin() && AppLinkUrl.subdomain()) || (Auth.isLogin() && AppLinkUrl.privateDomain()) ? (

            <>
              {
                Auth.isSubdomainLogin() ? (
                  <h5>Hello {subdomainuser.user_fullname}</h5>

                ) : (
                  <h5>Hello {user.user_fullname}</h5>
                )

              }
            </>

          ) :
            <React.Fragment>
              <h4>Welcome Guest</h4>
              <ul className="login-btn">
                <li><button className='btn-link' onClick={() => handle('/customer-login')}>Login</button></li>/
                <li><button className='btn-link' onClick={() => handle('/customer-signup')}>Sign Up</button></li>
              </ul>
            </React.Fragment>
          }
        </div>
        <ul className='SideNavbar'>
          <li className={`list ${splitLocation[1] === "" ? "active" : ""}`}><button onClick={() => handle('/')}> Home</button></li>

          {
            getbusinessInfoSuccess && getbusinessInfoData?.show_shop_on_header ? (
              <li className={`list ${splitLocation[1] === "products" ? "active" : ""}`}>
                <React.Fragment>
                  <div className="Category-btn">
                    <button
                      onClick={() => handle('/products')}
                    >Shop</button>
                    {
                      ShopMenuList && ShopMenuList.length > 0 ?
                        (
                          categoryMenu === "categoryShop" ? (
                            <button onClick={() => handleCategoryMenu(`categoryShop`)}><i className="icon">&#8722;</i></button>
                          ) : (
                            <button onClick={() => handleCategoryMenu(`categoryShop`)}><i className="icon">&#43;</i></button>
                          )
                        ) : ""
                    }
                  </div>

                  {
                    categoryMenu === "categoryShop" && (
                      getsuccess && getAllData.data && getAllData.data.length > 0 ? (
                        <ul className="shopcategory-wrap">
                          {getAllData?.data.map((Categoryitem, key) => (
                            !Categoryitem?.show_on_header && (
                              <>
                                <li className="shopcategory-List" key={key}>
                                  <div className="Category-btn">
                                    <button onClick={() => handleCategoryNavbarFilter(Categoryitem)}>{Categoryitem?.categoryName}</button>
                                    {
                                      getsuccess && Categoryitem?.subcategories && Categoryitem?.subcategories.length > 0 && (
                                        showMenu === `${key + "categorysshop"}` ? (
                                          <button onClick={() => handleShowMenu(`${key + "categorysshop"}`)}><i className="icon">&#8722;</i></button>
                                        ) : (
                                          <button onClick={() => handleShowMenu(`${key + "categorysshop"}`)}><i className="icon">&#43;</i></button>
                                        )
                                      )
                                    }
                                  </div>
                                  {
                                    showMenu === `${key + "categorysshop"}` && (
                                      <React.Fragment>
                                        <ul className="subcategories-wrap">
                                          {
                                            getsuccess && Categoryitem?.subcategories && Categoryitem?.subcategories.length > 0 &&
                                            Categoryitem?.subcategories.map((subCategoryitem, Arraykey) => {
                                              return (
                                                <li className="" key={Arraykey + "secondshop"}>
                                                  <div className="subcategory-list">
                                                    <button onClick={() => handleSubCategoryNavbarFilter(subCategoryitem)}>{subCategoryitem?.subCategoryName}</button>
                                                    {
                                                      getsuccess && subCategoryitem?.subsubcategories && subCategoryitem?.subsubcategories.length > 0 && (
                                                        showSubMenu === `${Arraykey + "secondshop"}` ? (
                                                          <button onClick={() => handleShowSubMenu(`${Arraykey + "secondshop"}`)}><i className="icon">&#8722;</i></button>
                                                        ) : (
                                                          <button onClick={() => handleShowSubMenu(`${Arraykey + "secondshop"}`)}><i className="icon">&#43;</i></button>
                                                        )
                                                      )
                                                    }
                                                  </div>
                                                  {
                                                    showSubMenu === `${Arraykey + "secondshop"}` && (
                                                      <ul className="subsubcategory">
                                                        {
                                                          getsuccess && subCategoryitem?.subsubcategories && subCategoryitem?.subsubcategories.length > 0 && (
                                                            subCategoryitem?.subsubcategories.map((subsubitem, Arraykey) => (
                                                              <>
                                                                <li key={`${Arraykey + "secondshop"}`} className="subsubcategory-list">
                                                                  {/* <NavLink to={`/category/${subsubitem?.slug}`}>{subsubitem?.subSubCategoryName}</NavLink> */}
                                                                  <button onClick={() => handleSubSubCategoryNavbarFilter(subsubitem)}>{subsubitem?.subSubCategoryName}</button>
                                                                </li>
                                                              </>
                                                            ))
                                                          )
                                                        }
                                                      </ul>
                                                    )
                                                  }
                                                </li>
                                              )
                                            }
                                            )
                                          }
                                        </ul>
                                      </React.Fragment>
                                    )
                                  }
                                </li>
                              </>
                            )
                          ))}
                        </ul>
                      ) : ""
                    )
                  }
                </React.Fragment>
              </li>
            ) : ""
          }
          {
            getsuccess ? (
              getAllData?.data.map((Categoryitem, key) => (
                Categoryitem?.show_on_header && (
                  <React.Fragment>
                    <li className="list" key={key}>
                      <div className="Category-btn">
                        <button onClick={() => handleCategoryNavbarFilter(Categoryitem)}>{Categoryitem?.categoryName}</button>
                        {
                          getsuccess && Categoryitem?.subcategories && Categoryitem?.subcategories.length > 0 && (
                            categoryMenu === `${key + "category"}` ? (
                              <button onClick={() => handleCategoryMenu(`${key + "category"}`)}><i className="icon">&#8722;</i></button>
                            ) : (
                              <button onClick={() => handleCategoryMenu(`${key + "category"}`)}><i className="icon">&#43;</i></button>
                            )
                          )
                        }
                      </div>
                      {
                        categoryMenu === `${key + "category"}` && (
                          <React.Fragment>
                            <ul className="subcategories-wrap">
                              {/*console.log(Categoryitem.subcategories, "line154")*/}
                              {
                                getsuccess && Categoryitem?.subcategories && Categoryitem?.subcategories.length > 0 &&
                                Categoryitem?.subcategories.map((subCategoryitem, Arraykey) => {
                                  return (
                                    <li className="" key={Arraykey + "second"}>
                                      <div className="subcategory-list">
                                        <button onClick={() => handleSubCategoryNavbarFilter(subCategoryitem)}>{subCategoryitem?.subCategoryName}</button>
                                        {
                                          getsuccess && subCategoryitem?.subsubcategories && subCategoryitem?.subsubcategories.length > 0 && (
                                            showMenu === `${Arraykey + "second"}` ? (
                                              <button onClick={() => handleShowMenu(`${Arraykey + "second"}`)}><i className="icon">&#8722;</i></button>
                                            ) : (
                                              <button onClick={() => handleShowMenu(`${Arraykey + "second"}`)}><i className="icon">&#43;</i></button>
                                            )
                                          )
                                        }
                                      </div>
                                      {
                                        showMenu === `${Arraykey + "second"}` && (
                                          <ul className="subsubcategory">
                                            {
                                              getsuccess && subCategoryitem?.subsubcategories && subCategoryitem?.subsubcategories.length > 0 && (
                                                subCategoryitem?.subsubcategories.map((subsubitem, Arraykey) => (
                                                  <>
                                                    <li key={`${Arraykey + "second"}`} className="subsubcategory-list">
                                                      {/* <NavLink to={`/category/${subsubitem?.slug}`}>{subsubitem?.subSubCategoryName}</NavLink> */}
                                                      <button onClick={() => handleSubSubCategoryNavbarFilter(subsubitem)}>{subsubitem?.subSubCategoryName}</button>
                                                    </li>
                                                  </>
                                                ))
                                              )
                                            }
                                          </ul>
                                        )
                                      }
                                    </li>
                                  )
                                }
                                )
                              }
                              {/* {
                                Categoryitem?.subcategories.length > 0 ? (
                                  getsuccess && Categoryitem?.subcategories && Categoryitem?.subcategories.length >= 1 &&
                                  (Categoryitem?.subcategories.map((subCategoryitem) => (
                                    <li>{subCategoryitem}</li>
                                  ))
                                  )
                                ) : ""
                              } */}
                            </ul>
                          </React.Fragment>
                        )
                      }
                      {/* {
                        Categoryitem.subcategories.length > 0 ? (
                          <>

                          </>
                        ) : ("")
                      } */}
                    </li>
                  </React.Fragment>
                )
              ))
            ) : ("")
          }
          <li className={`list bg-Link ${splitLocation[1] === "ecom-aboutus" ? "active" : ""}`}><button onClick={() => handle('/ecom-aboutus')}>About Us</button></li>
          <li className={`list bg-Link ${splitLocation[1] === "ecom-contactus" ? "active" : ""}`}><button onClick={() => handle('/ecom-contactus')}>Contact us</button></li>
          {(Auth.isSubdomainLogin() && AppLinkUrl.subdomain()) || (Auth.isLogin() && AppLinkUrl.privateDomain()) ? (
            <React.Fragment>
              <li className={`list ${splitLocation[1] === "ecom-orderlist" ? "active" : ""}`}><button onClick={() => handle('/ecom-myOrders')}>My Orders</button></li>
              <li className={`list ${splitLocation[1] === "ecom-contactus" ? "active" : ""}`}><button onClick={() => { logoutHandler() }}>Logout</button></li>
            </React.Fragment>
          ) : ""
          }
        </ul>
      </div>
    </React.Fragment>
  )
}

export default MSideNavbar