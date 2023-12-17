import React from "react";
import AppLink from "../../Common/AppLink";
import Storage from "../../Classes/Storage";

import StudentMenus from "./sidebarmenu_student.json";
import { useLocation } from "react-router-dom";
import { useState } from "react";
const StudentMenuListItem = () => {

  const { pathname } = useLocation()
  const [showMenu, setShowMenu] = useState(-1);
  const [showSubMenu, setShowSubMenu] = useState(-1);

  const handleShowMenu = (index) => {
    Storage.setJson('menu', showMenu === index ? -1 : index)
    showMenu === index && setShowSubMenu(-1);
    setShowMenu(showMenu === index ? -1 : index);

  }

  const handleShowSubMenu = (index) => {
    Storage.setJson('menu', showMenu === index ? -1 : index)
    setShowSubMenu(showSubMenu === index ? -1 : index);
  }
  return (
    <ul className={`menuList`}>
      {
        StudentMenus.map((item, key) => {
          return (
            <li className={`menuListItem`}>
              {
                item.subMenuItem && item.subMenuItem.length >= 1
                  ?
                  <button type="button" className={`caret ${showMenu === key + "first" ? "active" : ""}`} onClick={() => handleShowMenu(`${key + "first"}`)}>
                    <span className="iconCustom">
                      <i className={`menuIcon ${item.Icon}`}></i>
                    </span>
                    <span className="title">{item.menuName}</span>
                  </button>
                  :
                  <AppLink
                    to={item.menuLink}
                    className={pathname === item.menuLink ? "active" : ""}
                  >
                    <span className="iconCustom">
                      <i className={`menuIcon ${item.Icon}`}></i>
                    </span>
                    <span className="title">{item.menuName}</span>
                  </AppLink>
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
                              <AppLink to={subMenuItem1.menuLink} className={pathname === subMenuItem1.menuLink ? "active" : ""}>
                                <span className="title">{subMenuItem1.menuName}</span>
                              </AppLink>
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
                                            <AppLink to={subMenuItem2.menuLink} className={pathname === subMenuItem2.menuLink ? "active" : ""}>
                                              <span className="title">{subMenuItem2.menuName}</span>
                                            </AppLink>}
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
  );
};

export default StudentMenuListItem;
