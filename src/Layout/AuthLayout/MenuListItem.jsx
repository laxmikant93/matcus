import React, { useState } from 'react'
import AppLink from '../../Common/AppLink';
import { useLocation } from "react-router-dom";

import sidebarMenuList from "./sidebarmenu.json";
import InstituteMenuListItem from './InstituteMenuListItem';
import TeacherMenuListItem from './TeacherMenuListItem';
import StudentMenuListItem from './StudentMenuListItem';
import { useSelector } from "react-redux";
import EcommerceMenuListItem from './EcommerceMenuListItem';
import EmployeeMenuListItem from './EmployeeMenuListItem';
import ServicesMenuListItem from './ServicesMenuListItem';

const MenuListItem = () => {
  const { user } = useSelector((state) => {
    return {
      user: state.user,
    };
  });

  // const { pathname } = useLocation()
  // const [showMenu, setShowMenu] = useState(-1);
  // function handleShowMenu(key) {
  //   setShowMenu(showMenu === key ? -1 : key);
  // }
  return (
    <React.Fragment>
      {
        user.user_business_type === "LMS" ?
          <>
            {user.user_activeRole === process.env.REACT_APP_TEACHER
              ? <TeacherMenuListItem />
              : user.user_activeRole === process.env.REACT_APP_STUDENT
                ? <StudentMenuListItem /> : user.user_activeRole === process.env.REACT_APP_EMPLOYEE ?
                  <EmployeeMenuListItem />
                  : <InstituteMenuListItem />}
          </>
          : user.user_business_type === "Ecommerce"
            ?
            <EcommerceMenuListItem />
            : user.user_business_type === "Services" ?
              <ServicesMenuListItem />
              : ""


      }



    </React.Fragment>
    // <ul className="menuList">
    //   {sidebarMenuList.map((sidebarMenuOption, key) => {
    //     return (

    //       <li key={key} className={`menuListItem`} onClick={() => handleShowMenu(key)}>
    //         <AppLink to="#" class={showMenu === key ? "active" : ""}>
    //           <span className="iconCustom">
    //             <i className="menuIcon home"></i>
    //           </span>
    //           <span className="title">{sidebarMenuOption.menuName}</span>
    //         </AppLink>
    //         <ul className="subMenuList">
    //           {
    //             sidebarMenuOption.subMenus && sidebarMenuOption.subMenus.length && showMenu === key &&
    //             sidebarMenuOption.subMenus.map((item, optKey) => {
    //               return (
    //                 <li key={optKey} className="subMenuListItem">
    //                   <AppLink to="#" class={showMenu === optKey ? "active" : ""}>
    //                     <span className="title">{item.menuName}</span>
    //                   </AppLink>
    //                 </li>
    //               )
    //             })

    //           }
    //         </ul>
    //       </li>
    //     );
    //   })}
    // </ul>
  )
}

export default MenuListItem