import React, { useState } from 'react'
// import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
// import ValidationFile from '../Classes/ValidationFile'
// import FormError from '../Common/Form/FormError'
// import FormInput from '../Common/Form/FormInput'
// import InputColorPicker from '../Common/Form/InputColorPicker'
import { getSelectedTemplateData } from '../store/actions/serviceWebsiteTemplate'
// import FormInput from "../Common/From/FormInput"
import "./themesidebar.scss"
// import TypographyContent from './ThemeCustomize'
import ThemeCustomize from './ThemeCustomize'
import { useParams } from 'react-router-dom'

const ThemeContent = () => {
  const { themeSuccess, theme, createUserThemeSuccess, createUserThemeLoading, defaultthemes, userthemes, themeGlobalData, user } = useSelector((state) => {
    return {
      theme: state.serviceTemplate.getTemplate.data,
      themeSuccess: state.serviceTemplate.getTemplate.success,
      // themeGlobalData: state.serviceTemplate.getTemplate.data,
      // themeData: state.serviceTemplate.getTemplate.data.themeData,
      user: state.user,
      userthemes: state.serviceTemplate.getTemplate.data.userthemes,
      defaultthemes: state.serviceTemplate.getTemplate.data.defaultthemes,
      // createUserThemeLoading: state.serviceTemplate.edit.loading,
      // createUserThemeSuccess: state.serviceTemplate.edit.success
    }
  })
  const {_id}=useParams()
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

  const getThemeData = (item, specific) => {
    dispatch(getSelectedTemplateData(user.user_institute, user.user_business_type, item._id, user._id, _id, specific))
  }
  const updateUserTheme = (item) => {
    setEditTheme(true)
    dispatch(getSelectedTemplateData(user.user_institute, user.user_business_type, item._id, user._id, _id, false))

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
                  <div className={`theme-grid ${item.theme_Name ? item.theme_Name : ""}`} key={key} onClick={() => getThemeData(item, true)}>
                    <div className={`item ${item.theme_Name ? "" : ""}`}></div>
                    <div className="item"></div>
                    <div className="item"></div>
                    <div className={`item select-theme ${item?.ActivatedTheme ? "active" : ""}`} >
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
            userthemes?.length ?
              userthemes?.map((item, key) => {
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
                        <i className="icon-check" onClick={() => getThemeData(item, false)}></i>
                      </div>
                    </div>
                  </div>
                )
              }) : ""
          }
            {/* <h1>hihihihihi</h1> */}
          <ThemeCustomize themedrop={themedrop} handleThemeDrop={() => handleThemeDrop()} handleThemeDropFalse={() => handleThemeDropFalse()} editTheme={editTheme} />

        </div>

      </div>
    </>
  )
}

export default ThemeContent