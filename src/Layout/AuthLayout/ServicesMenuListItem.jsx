import React, { useEffect, useState } from 'react'
import AppLink from '../../Common/AppLink'
import { useNavigate, useLocation } from "react-router-dom";
import ServicesMenuList from './sidebarmenu_services.json'
import ServicesMenuListForJeevan from './sidebarmenu_services_for_jeevan.json'

import Storage from '../../Classes/Storage';
import { useSelector } from 'react-redux';
const ServicesMenuListItem = () => {
  const { pathname } = useLocation()
  const [showMenu, setShowMenu] = useState(-1);
  const [showSubMenu, setShowSubMenu] = useState(-1);
  const { user } = useSelector((state) => {
    return {
      user: state.user,
    };
  });

  const history = useNavigate()
  const handleShowMenu = (index, name) => {
    Storage.setJson('menu', showMenu === index ? -1 : index)
    showMenu === index && setShowSubMenu(-1);
    setShowMenu(showMenu === index ? -1 : index);

    if (name === "Marketing") {
      history("/marketing")
    }
  }

  const handleShowSubMenu = (index) => {
    Storage.setJson('menu', showMenu === index ? -1 : index)
    setShowSubMenu(showSubMenu === index ? -1 : index);
  }
  // useEffect(() => {
  //   Storage.setJson('menu', showMenu)
  // }, [showMenu])
  useEffect(() => {
    if (Storage.alive('menu')) {
      setShowMenu(Storage.getJson('menu'))
    }
  }, [pathname])
  const [jeevanHospital, setJeevanHospital] = useState(false)
  useEffect(() => {
    if (user.user_business === "630c4f666e84d5687f5b25d6") {
      setJeevanHospital(true)
    }
  }, [user.user_business])
  const [menulistItem, setMenuListItem] = useState(ServicesMenuList)
  useEffect(() => {
    if (jeevanHospital) {
      setMenuListItem(ServicesMenuListForJeevan)
    }
  }, [jeevanHospital])


  return (
    <ul className={`menuList`}>
      {
        menulistItem.map((item, key) => {
          return (
            <li className={`menuListItem`} key={key}>
              {
                item.subMenuItem && item.subMenuItem.length >= 1
                  ?
                  <button type="button" className={`caret ${showMenu === key + "first" ? "active" : ""}`} onClick={() => handleShowMenu(`${key + "first"}`, item.menuName)}>
                    <span className="iconCustom">
                      <i className={`menuIcon ${item.Icon}`}></i>
                    </span>
                    <span className="title">{item.menuName}</span>
                  </button>
                  :
                  item.menuName === "Templates" && !user.user_institute_isOld ? (
                    <AppLink
                      to={item.menuLink}
                      className={pathname === item.menuLink ? "active" : ""}
                    >
                      <span className="iconCustom">
                        <i className={`menuIcon ${item.Icon}`}></i>
                      </span>
                      <span className="title">{item.menuName}</span>
                    </AppLink>) :
                    item.menuName !== "Templates" && (<AppLink
                      to={item.menuLink}
                      className={pathname === item.menuLink ? "active" : ""}
                    >
                      <span className="iconCustom">
                        <i className={`menuIcon ${item.Icon}`}></i>
                      </span>
                      <span className="title">{item.menuName}</span>
                    </AppLink>)

              }
              {
                showMenu === `${key + "first"}` &&
                <ul className={`subMenuList ${showMenu === key + "first" ? "fade" : ""}`}>
                  {
                    item.subMenuItem && item.subMenuItem.length && item.subMenuItem.map((subMenuItem1, Arraykey) => {
                      return (
                        <li className={`subMenuListItem`}  >
                          {
                            subMenuItem1.subMenuItem && subMenuItem1.subMenuItem.length >= 1
                              ?
                              <button type="button" className={`caret ${Arraykey + "second" === showSubMenu ? "active" : ""}`} onClick={() => handleShowSubMenu(`${Arraykey + "second"}`)}>
                                <span className="title">{subMenuItem1.menuName}</span>
                              </button>
                              :
                              subMenuItem1.menuName === "My Templates" && user.user_institute_isOld ? (
                                "") :
                                subMenuItem1.menuName === "Edit Website" && user.user_institute_isOld === true ? (<AppLink to={subMenuItem1.menuLink} className={pathname === subMenuItem1.menuLink ? "active" : ""}>
                                  <span className="title">{subMenuItem1.menuName}</span>
                                </AppLink>) : (
                                  <>
                                    {
                                      subMenuItem1.menuName === "Edit Website" && user.user_institute_isOld === false ? (
                                        ""
                                      ) : (
                                        <AppLink to={subMenuItem1.menuLink} className={pathname === subMenuItem1.menuLink ? "active" : ""}>
                                          <span className="title">{subMenuItem1.menuName}</span>
                                        </AppLink>
                                      )
                                    }
                                  </>

                                )
                          }
                          {
                            showSubMenu === `${Arraykey + "second"}` &&
                            <ul className={`subMenuList ${showSubMenu === `${Arraykey + "second"}` ? "fade" : ""}`}>
                              {
                                subMenuItem1.subMenuItem && subMenuItem1.subMenuItem.length && subMenuItem1.subMenuItem.map((subMenuItem2, Arraykeys) => {
                                  return (
                                    <>
                                      <li className={`subMenuListItem`}>
                                        {
                                          subMenuItem2.subMenuItem && subMenuItem2.subMenuItem.length >= 1
                                            ?
                                            <button type="button" className={`caret ${pathname === subMenuItem2.menuLink ? "active" : ""}`} onClick={() => handleShowMenu(Arraykeys)}>
                                              <span className="title">{subMenuItem2.menuName}</span>
                                            </button>
                                            :
                                            <>
                                              {
                                                subMenuItem2.menuName === "Home & Menu" && user.user_institute_isOld === false ? ("") : (<AppLink to={subMenuItem2.menuLink} className={pathname === subMenuItem2.menuLink ? "active" : ""}>
                                                  <span className="title">{subMenuItem2.menuName}</span>
                                                </AppLink>

                                                )
                                              }
                                            </>
                                        }
                                      </li>
                                    </>
                                  );
                                })
                              }
                            </ul>
                          }
                        </li>
                      );
                    })
                  }

                </ul>
              }
            </li>
          );
        })
      }

    </ul >
  )
}
export default ServicesMenuListItem