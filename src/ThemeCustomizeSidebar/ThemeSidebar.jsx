import React, { useState } from 'react'
import SettingMenus from './SettingContent';
import ThemeContent from './ThemeContent';
import "./themesidebar.scss"
import MenuList from "./menu.json"
import Main from './Main';
import PagesContent from './PagesContent';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSingleTemplateForEdit, resetActivateWebsiteTemplate, resetSingleTemplateForEdit } from '../store/actions/WebsiteTemplate';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ComponentLoader from '../Common/Loader/ComponentLoader';

import TemplateSettingLayout from "./TemplateSettingLayout";
const ThemeSidebar = () => {
  const [dropdown, setDropdown] = useState(-1);
  const { user, firstTimeSuccess, theme } = useSelector((state) => {
    return {
      user: state.user,
      firstTimeSuccess: state.websiteTemplate.getTemplate.firstTimeSuccess,
      theme: state.websiteTemplate.getTemplate.data
    }
  })
  const dispatch = useDispatch()
  function DropHandle(index) {
    setDropdown(dropdown === index ? -1 : index);
  }
  const { _id } = useParams()

  useEffect(() => {
    return () => {
      dispatch(resetActivateWebsiteTemplate())
      dispatch(resetSingleTemplateForEdit())
    }
  }, [dispatch])
  useEffect(() => {
    if (user.user_business_type === "LMS") {
      dispatch(getSingleTemplateForEdit(user._id, user.user_institute, user.user_business_type, _id))
    } else {
      dispatch(getSingleTemplateForEdit(user._id, user.user_business, user.user_business_type, _id))
    }
  }, [_id, dispatch, user._id, user.user_business, user.user_business_type, user.user_institute])
  return (
    <React.Fragment>
      {/* {templateSuccess ? */}
      {
        firstTimeSuccess ?
          <TemplateSettingLayout>
            <div className="side-head">
              <h3>{theme.themename}</h3>
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
                          item.component === "ThemeContent" ? <ThemeContent /> :
                            item.component === "Pages" ? <PagesContent /> : ""
                      }
                    </>
                  }

                </>
              ))}
            </div>
          </TemplateSettingLayout> : <ComponentLoader />
      }

    </React.Fragment >

  )
}

export default ThemeSidebar