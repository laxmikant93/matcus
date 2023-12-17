import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../../Common/Breadcrumb/BreadcrumbItem';
import GrayAuthTheme from '../../../../Common/Theme/GrayAuthTheme';
import { dynamicMenuHeaders, getMenuHeaderList, getMenuHeaderListReset, updateMenuHeader, updateMenuHeaderReset } from '../../../../store/actions/menuHeader';
import EyeIcon from '../../../../assets/Icons/password-eye.svg'
import EyeIconClose from '../../../../assets/Icons/password-eye-close.svg'
import './menuHeader.scss'

const MenuHeader = () => {

  const { insId, subdomain, dynamicSubHeaders, menuOptions, menuOptionsData, menuOptionsSuccess,
    patchdynamicHeaderSuccess, patchdynamicHeaderLoading } = useSelector((state) => {
      return {
        insId: state.user.user_institute,
        subdomain: state.user.user_institute_institute_subdomain,
        menuOptionsData: state.menuHeader.getMenuHeaderList.data,
        menuOptions: state.menuHeader.getMenuHeaderList.data.dynamic_header,
        menuOptionsSuccess: state.menuHeader.getMenuHeaderList.success,
        patchdynamicHeaderSuccess: state.menuHeader.updateMenuHeader.success,
        patchdynamicHeaderLoading: state.menuHeader.updateMenuHeader.loading,
        dynamicSubHeaders: state.menuHeader.heading,

      }
    })

  const [menuList, setMenuList] = useState([]);
  useEffect(() => {
    if (menuOptionsSuccess) {
      setMenuList([...menuOptions])
    }
  }, [menuOptions, menuOptionsSuccess])
  let history = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenuHeaderList(insId));
    dispatch(dynamicMenuHeaders(subdomain))
  }, [dispatch, insId, subdomain])

  useEffect(() => {
    if (menuOptionsSuccess && menuOptionsData) {
      setMenuList(menuOptions);
    }
  }, [menuOptions, menuOptionsData, menuOptionsSuccess])

  const handleMenuOption = (key, state) => {
    let array = menuList
    if (state === "check") {
      array[key]["isActive"] = true;
      setMenuList([...array]);
    } else if (state === "uncheck") {
      array[key]["isActive"] = false;
      setMenuList([...array]);
    }
  }
  const handleUpdateButton = () => {
    dispatch(updateMenuHeader(menuList, insId));
  }

  useEffect(() => {
    if (patchdynamicHeaderSuccess) {
      history("/");
    }
    return () => {
      dispatch(getMenuHeaderListReset());
      dispatch(updateMenuHeaderReset());
    }
  }, [dispatch, history, patchdynamicHeaderSuccess])

  const handleCancelButton = () => {
    history("/");
  }

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/menu-header-list" title="Home & Menu" />
      </Breadcrumb>
      <div className="PageTopHead  mt-30">
        <div className="PTH-Item">
          <h1 className="text-xl w-300">
            Home Page Section Settings
          </h1>
          <p className="text-xs w-300">
            You can set visibility or hidden below sections.
          </p>
        </div>

        <div className="gridBody menuHeaderBody">
          <li className='menuHeaderLi mainCategory'>Header</li>
          {
            menuOptionsSuccess ?
              menuList.length && menuList.map((item, i) => {
                return (
                  <div className="gridRow" key={i}>
                    <ul className="menuHeaderTopInfo">
                      {
                        item.title === "Home" ?
                          <li className='menuHeaderLi mainCategory'
                          >
                            {item.title}
                          </li> : <li className='Selected menuHeaderLi'
                            onClick={item.isActive ? () => handleMenuOption(i, "uncheck") : () => handleMenuOption(i, "check")}>
                            {dynamicSubHeaders[item.titleKey] || item.title}
                            <div className='iconWraper'>
                              <span className={`${item.isActive ? "eye" : "eyeclose"} icon`}>
                                <img src={item.isActive ? EyeIcon : EyeIconClose} alt="Active - Eye" />
                              </span>
                            </div>
                          </li>
                      }
                    </ul >
                  </div>
                )
              })
              :
              <div className="loadingGridData">
                <i className="ed-loadingGrid"></i>
              </div>
          }
        </div>
        <div className="removePopBtn pt-0 mt-0">
          {patchdynamicHeaderLoading ?
            <button
              className="button button-red btn-sm"
            >
              Updating...
            </button>
            :
            <button
              className="button button-red btn-sm"
              onClick={() => handleUpdateButton()}
            >
              Update Sections
            </button>}

          <button
            className="button btn-o-gray btn-sm"
            onClick={() => handleCancelButton()}
          >
            Cancel
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default MenuHeader;
