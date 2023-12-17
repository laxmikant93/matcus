import React, { useState } from 'react'
import SettingMenus from './SettingContent';
import "./themesidebar.scss"
import MenuList from "./menu.json"
import Main from './Main';
import PagesContent from './PagesContent';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { getSingleTemplateForEdit, resetActivateWebsiteTemplate, resetSingleTemplateForEdit } from '../store/actions/WebsiteTemplate';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import ComponentLoader from '../Common/Loader/ComponentLoader';

import TemplateSettingLayout from "./ServiceTemplateSettingLayout";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getSingleTemplateForServiceEdit, resetSingleTemplateForEdit } from '../store/actions/serviceWebsiteTemplate';
import ComponentLoader from '../Common/Loader/ComponentLoader';
import { useParams } from 'react-router-dom';
import ThemeContent from './ThemeContent';
const ServiceThemeSidebar = () => {
  const {_id}=useParams()
  const dispatch = useDispatch()
  const [dropdown, setDropdown] = useState(-1);
  const { user, firstTimeSuccess, editorSuccess, theme } = useSelector((state) => {
    return {
      user: state.user,
      firstTimeSuccess: state.serviceTemplate.getTemplate.firstTimeSuccess,
      theme: state.serviceTemplate.getTemplate.data,
      editorSuccess: state.serviceTemplate.getTemplate.editorSuccess
    }
  })
  function DropHandle(index) {
    setDropdown(dropdown === index ? -1 : index);
  }
  // const { _id } = useParams()

  // useEffect(() => {
  //   return () => {
  //     dispatch(resetSingleTemplateForEdit())
  //   }
  // }, [dispatch])
  useEffect(() => {
    dispatch(getSingleTemplateForServiceEdit(user._id, user.user_business, user.user_business_type, _id,"subdomain", user.user_institute_institute_subdomain))
    // dispatch(getSingleTemplateForEdit("subdomain", user.user_institute_institute_subdomain))

  }, [_id, dispatch, user._id, user.user_business, user.user_business_type, user.user_institute_institute_subdomain])
  return (
    <React.Fragment>
      {/* {templateSuccess ? */}
      {
        firstTimeSuccess && editorSuccess ?
          <TemplateSettingLayout>
            <div className="side-head">
              <h3>Service</h3>
            </div>
            <div className="dropList">
              {MenuList.map((item, index) => (
                <>
                  <div className={`list ${index === dropdown ? "active" : ""}`} key="index" onClick={() => DropHandle(index)}>
                    <i className={item.icon}></i>{item.listname}
                  </div>
                  {dropdown === index &&
                    <>
                      {
                        item.component === "SettingMenus" ? <SettingMenus onUpdateSetting={() => DropHandle(index)} /> :
                          item.component === "Pages" ? <PagesContent /> :
                          item.component==="Themes"?<ThemeContent/>:
                          ""
                      }
                    </>
                  }

                </>
              ))}
            </div>
          </TemplateSettingLayout>
          : <ComponentLoader />
      }

    </React.Fragment >

  )
}

export default ServiceThemeSidebar