import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import ValidationFile from '../Classes/ValidationFile'
import FormError from '../Common/Form/FormError'
import FormInput from '../Common/Form/FormInput'
import InputColorPicker from '../Common/Form/InputColorPicker'
import { createWebsiteTemplateUserTheme, getSelectedTemplateData, resetCreateWebsiteTemplate, updateDynamicWebsiteThemeTemplate } from '../store/actions/WebsiteTemplate'
// import FormInput from "../Common/From/FormInput"
import "./themesidebar.scss"
import TypographyContent from './ThemeCustomize'
import ThemeCustomize from './ThemeCustomize'

const ThemeContent = () => {
  const { themeSuccess, theme, createUserThemeSuccess, createUserThemeLoading, defaultthemes, userthemes, themeGlobalData, user } = useSelector((state) => {
    return {
      theme: state.websiteTemplate.getTemplate.data,
      themeSuccess: state.websiteTemplate.getTemplate.success,
      themeGlobalData: state.websiteTemplate.getTemplate.data,
      themeData: state.websiteTemplate.getTemplate.data.themeData,
      user: state.user,
      userthemes: state.websiteTemplate.getTemplate.data.userthemes,
      defaultthemes: state.websiteTemplate.getTemplate.data.defaultthemes,
      createUserThemeLoading: state.websiteTemplate.edit.loading,
      createUserThemeSuccess: state.websiteTemplate.edit.success
    }
  })
  const dispatch = useDispatch()
  const [themedrop, setThemeDrop] = useState(false)
  const [editTheme, setEditTheme] = useState(false)
  // useEffect(() => {
  //   if (themeSuccess) {
  //     setSelectedThemeGlobal(themeGlobalData.themeGlobal)
  //   }
  // }, [themeGlobalData, themeSuccess])

  const handleThemeDrop = () => {
    setThemeDrop(!themedrop)
    if (editTheme) {
      setEditTheme(false)
    }
  }
  const handleThemeDropFalse = () => {
    setThemeDrop(false)
  }

  const getThemeData = (_id, specific) => {
    dispatch(getSelectedTemplateData(user.user_institute, user.user_business_type, _id, user._id, themeGlobalData._id, specific))
  }
  const updateUserTheme = (item) => {
    setEditTheme(true)
    dispatch(getSelectedTemplateData(user.user_institute, user.user_business_type, item._id, user._id, themeGlobalData._id, false))

    setThemeDrop(!themedrop)
  }



  return (
    <>
      <div className="theme-wrapper">
        <div className="dynamictheme-wrap">

          {
            defaultthemes.length ?
              defaultthemes.map((item, key) => {
                return (
                  <div className={`theme-grid ${item.theme_Name ? item.theme_Name : ""}`} key={key} onClick={() => getThemeData(item._id, true)}>
                    <div className={`item ${item.theme_Name ? "" : ""}`}></div>
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className={`item select-theme ${item.ActivatedTheme ? "active" : ""}`} >
                      <h6>{item.theme_Name}</h6>
                      <i className="icon-check"></i>
                    </div>
                  </div>
                )
              }) : ""
          }
          {/* <div className="theme-grid" onClick={() => selectDefaultTheme("#8B008B", "#4B0082", "#6A5ACD")}>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className={`item select-theme ${active === 1 ? "active" : ""}`} onClick={() => setActive(1)}>
              <h6>Fairy Tale</h6>
              <i className="icon-check"></i>
            </div>
          </div>
         
          <div className="theme-grid" onClick={() => selectDefaultTheme("#FFA500", "#FF4500", "#32CD32")}>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className={`item select-theme ${active === 3 ? "active" : ""}`} onClick={() => setActive(3)} >
              <h6>Fairy Tale</h6>
              <i className="icon-check"></i>
            </div>
          </div> */}
        </div>



        {/* ----------------------------------------------------------------------------------------------------- */}
        <div className="customtheme-wrap">
          {userthemes.length ? <h5 className="w-400 primary text-xs">Your Themes</h5> : ""}
          {
            userthemes.length ?
              userthemes.map((item, key) => {
                return (
                  <div className="theme-grid" key={key}>
                    <div className='item' style={{
                      backgroundColor: `${item.primaryColor}`,
                    }}></div>
                    <div className='item' style={{
                      backgroundColor: `${item.secondaryColor}`,
                    }}></div>
                    <div className='item' style={{
                      backgroundColor: `${item.tertiaryColor}`,
                    }}></div>
                    <div className={`item select-theme ${item.ActivatedTheme ? "active" : ""}`}>
                      <h6>{item.theme_Name}</h6>
                      <div className="icon-wrap">
                        <i className="icon-edit" onClick={() => updateUserTheme(item)}></i>
                        <i className="icon-check" onClick={() => getThemeData(item._id, false)}></i>
                      </div>
                    </div>
                  </div>
                )
              }) : ""
          }

          <ThemeCustomize themedrop={themedrop} handleThemeDrop={() => handleThemeDrop()} handleThemeDropFalse={() => handleThemeDropFalse()} editTheme={editTheme} />

        </div>

      </div>
    </>
  )
}

export default ThemeContent