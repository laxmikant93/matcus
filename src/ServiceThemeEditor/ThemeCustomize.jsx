import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import ValidationFile from '../Classes/ValidationFile'
import FormError from '../Common/Form/FormError'
import FormInput from '../Common/Form/FormInput'
import { createWebsiteTemplateUserTheme, editWebsiteTemplateTheme, resetCreateWebsiteTemplate, updateDynamicWebsiteThemeTemplate } from '../store/actions/serviceWebsiteTemplate'

import HeaderCustomize from './CustomSection/HeaderCustomize'
import BodyCustomize from './CustomSection/BodyCustomize'
import FooterCustomize from './CustomSection/FooterCustomize'
import { useParams } from 'react-router-dom'
const ThemeCustomize = ({ themedrop, handleThemeDrop, editTheme }) => {
  const {_id}=useParams()
  
  const { themeSuccess, theme, themeData, editThemeSuccess, editThemeLoading, createUserThemeSuccess, createUserThemeLoading, themeGlobalData, user } = useSelector((state) => {
    return {
      theme: state.serviceTemplate.getTemplate.data,
      themeData: state.serviceTemplate.getTemplate.data,
      themeSuccess: state.serviceTemplate.getTemplate.success,
      themeGlobalData: state.serviceTemplate.getTemplate.data,
      user: state.user,
      userthemes: state.serviceTemplate.getTemplate.data.userthemes,
      defaultthemes: state.serviceTemplate.getTemplate.data.defaultthemes,
      createUserThemeLoading: state.serviceTemplate.edit.loading,
      createUserThemeSuccess: state.serviceTemplate.edit.success,

      editThemeSuccess: state.serviceTemplate.edit.success,
      editThemeLoading: state.serviceTemplate.edit.loading,
    }
  })
  const [dropdown, setDropdown] = useState(-1)
  const handleDropDown = (index) => {
    setDropdown(dropdown === index ? -1 : index);
  }
  const array = [{

    "id": 1,
    "listname": "Header",
    "icon": "icon-themeheader",
    "component": "HeaderCustomize"

  },
  {
    "id": 1,
    "listname": "Body",
    "icon": "icon-themebody",
    "component": "BodyCustomize"
  },

  {
    "id": 1,
    "listname": "Footer",
    "icon": "icon-themefooter",
    "component": "FooterCustomize"
  }]
  const [headerData, setHeaderData] = useState({})

  const [bodyData, setBodyData] = useState({})

  const [footerData, setFooterData] = useState({})
  const [prevTheme, setPrevTheme] = useState({})

  const [themeName, setThemeName] = useState("")
  const dispatch = useDispatch()
  const [themeNameError, setThemeNameError] = useState("")
  function ThemeDropHandle() {
    setPrevTheme(theme)
    handleThemeDrop()

  }

  const handleThemeName = (e) => {
    let value = e.target.value
    setThemeName(ValidationFile.spaceNotAccept(value))
    setThemeNameError(ValidationFile.isEmpty(ValidationFile.spaceNotAccept(value)))
  }
  const handleSave = () => {
    if (ValidationFile.isEmpty(themeName)) {
      setThemeNameError(true)
    }
    if (ValidationFile.isNotEmpty(themeName)) {
      const themeGlobal = {
        color: {
          alpha: `#006f9c`,
          alphaSemiLight: `#4E616B`,
          alphaLight: `#EBECF0`,
          beta: `#FDEDE1`,
          betaSemiLight: ``,
          betaLight: ``,
          background: ``,
          base: `#202020`,
          baseSemiLight: `rgba(32, 32, 32, 0.6)`,
          baseLight: `rgba(32, 32, 32, 0.4)`,
          universal: `#FFFFFF`,
        },
        typography: {
          h1: {
            FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h1.FontSize : "",
            FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h1.FontWeight : "",
            LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h1.LineHeight : "",
            FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h1.FontFamily : "",
            FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h1.FontStyle : "",
            LetterSpacing: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h1.LetterSpacing : "",
          },
          h2: {
            FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h2.FontSize : "",
            FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h2.FontWeight : "",
            LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h2.LineHeight : "",
            FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h2.FontFamily : "",
            FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h2.FontStyle : "",
            LetterSpacing: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h2.LetterSpacing : "",
          },
          h3: {
            FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h3.FontSize : "",
            FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h3.FontWeight : "",
            LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h3.LineHeight : "",
            FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h3.FontFamily : "",
            FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h3.FontStyle : "",
            LetterSpacing: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h3.LetterSpacing : "",
          },
          h4: {
            FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h4.FontSize : "",
            FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h4.FontWeight : "",
            LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h4.LineHeight : "",
            FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h4.FontFamily : "",
            FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h4.FontStyle : "",
            LetterSpacing: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h4.LetterSpacing : "",
          },
          h5: {
            FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h5.FontSize : "",
            FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h5.FontWeight : "",
            LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h5.LineHeight : "",
            FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h5.FontFamily : "",
            FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h5.FontStyle : "",
            LetterSpacing: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h5.LetterSpacing : "",
          },
          h6: {
            FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h6.FontSize : "",
            FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h6.FontWeight : "",
            LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h6.LineHeight : "",
            FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h6.FontFamily : "",
            FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h6.FontStyle : "",
            LetterSpacing: bodyData && bodyData.bodyTypo?.h6.LetterSpacing,
          },
          regular: {
            FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.regular.FontSize : "",
            FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.regular.FontWeight : "",
            LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.regular.LineHeight : "",
            FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.regular.FontFamily : "",
            FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.regular.FontStyle : "",
            LetterSpacing: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.regular.LetterSpacing : "",
          },
          anchor: {
            FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.anchor.FontSize : "",
            FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.anchor.FontWeight : "",
            LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.anchor.LineHeight : "",
            FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.anchor.FontFamily : "",
            FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.anchor.FontStyle : "",
            LetterSpacing: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.anchor.LetterSpacing : "",
          },
        },
        headerThemeColor: {
          Background: headerData.HeaderBackground ? headerData.HeaderBackground : "",
          h4: {
            Color: headerData.headingColor ? headerData.headingColor : "",
          },
          h5: {
            Color: headerData.headingColor ? headerData.headingColor : "",
          },
          h6: {
            Color: '#006f9c',
          },
          p: {
            Color: '#f48631',
          },
          a: {
            Color: '#f48631',
          },
          ButtonLogin: {
            Background: headerData.loginBackground ? headerData.loginBackground : "",
            Color: headerData.loginColor,
            BorderColor: headerData.loginBorderColor ? headerData.loginBorderColor : "",
            Hover: {
              Background: headerData.loginHoverBackground ? headerData.loginHoverBackground : "",
              Color: headerData.loginHoverColor ? headerData.loginHoverColor : "",
              BorderColor: headerData.loginHoverBorderColor ? headerData.loginHoverBorderColor : "",
            },
            Active: {
              Background: headerData.loginActiveBackground ? headerData.loginActiveBackground : "",
              Color: headerData.loginActiveColor ? headerData.loginActiveColor : "",
              BorderColor: headerData.loginActiveBorderColor ? headerData.loginActiveBorderColor : "",
            }
          },
          BookAppoinmentButton: {
            Background: `#FDEDE1`,
            Color: `#006f9c`,
            BorderColor: `transparent`,
            Hover: {
              Background: `#FFFFFF`,
              Color: `#006f9c`,
              BorderColor: `transparent`,
            }
          },
          ButtonSignup: {
            Background: headerData.SignUpBackground ? headerData.SignUpBackground : "",
            BorderColor: headerData.SignUpBorderColor ? headerData.SignUpBorderColor : "",
            Color: headerData.SignUpColor ? headerData.SignUpColor : "",
            Hover: {
              Background: headerData.SignUpHoverBackground ? headerData.SignUpHoverBackground : "",
              Color: headerData.SignUpHoverColor ? headerData.SignUpHoverColor : "",
              BorderColor: headerData.SignUpHoverBorderColor ? headerData.SignUpHoverBorderColor : "",
            },
            Active: {
              Background: headerData.SignUpActiveBackground ? headerData.SignUpActiveBackground : "",
              Color: headerData.SignUpActiveColor ? headerData.SignUpActiveColor : "",
              BorderColor: headerData.SignUpActiveBorderColor ? headerData.SignUpActiveBorderColor : "",
            }
          },
          NavMenu: {
            Background: headerData.navMenuBackground ? headerData.navMenuBackground : "",
            Color: headerData.navMenuColor ? headerData.navMenuColor : "",
            Hover: {
              Color: headerData.navMenuHoverColor ? headerData.navMenuHoverColor : "",
            },
            Active: {
              Color: `#26335D`,
            },
            ScrollIcon: {
              Color: headerData.navMenuScrollIconColor ? headerData.navMenuScrollIconColor : "",
              Hover: {
                Color: headerData.navMenuScrollIconHoverColor ? headerData.navMenuScrollIconHoverColor : "",
              }
            }
          },
        },
        footerThemeColor: {
          Background: footerData.FooterBackground ? footerData.FooterBackground : "",
          Logo: {
            Background: footerData.logoBackGround ? footerData.logoBackGround : "",
          },
          h2: {
            Color: footerData.heading4Color ? footerData.heading4Color : "",
          },
          h3: {
            Color: footerData.heading4Color ? footerData.heading4Color : "",
          },
          h4: {
            Color: footerData.heading4Color ? footerData.heading4Color : "",
          },
          h5: {
            Color: footerData.heading4Color ? footerData.heading4Color : "",
          },
          h6: {
            Color: footerData.heading4Color ? footerData.heading4Color : "",
          },
          a: {
            Color: footerData.LinkColor ? footerData.LinkColor : "",
            Hover: {
              Color: footerData.LinkHovercolor ? footerData.LinkHovercolor : "",
            }
          },
          Copyright: {
            Color: footerData.copyrightColor ? footerData.copyrightColor : "",
          }
        },
        headerThemeTypo: {
          h4: {
            FontSize: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontSize : "",
            FontWeight: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontWeight : "",
            LineHeight: headerData && headerData.typographyValues ? headerData.typographyValues.h4.LineHeight : "",
            FontFamily: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontFamily : "",
            FontStyle: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontStyle : "",
            LetterSpacing: headerData && headerData.typographyValues ? headerData.typographyValues.h4.LetterSpacing : "",
          },
          h6: {
            FontSize: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontSize : "",
            FontWeight: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontWeight : "",
            LineHeight: headerData && headerData.typographyValues ? headerData.typographyValues.h4.LineHeight : "",
            FontFamily: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontFamily : "",
            FontStyle: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontStyle : "",
            LetterSpacing: headerData && headerData.typographyValues ? headerData.typographyValues.h4.LetterSpacing : "",
          },
          h5: {
            FontSize: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.FontSize : "",
            FontWeight: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.FontWeight : "",
            LineHeight: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.LineHeight : "",
            FontFamily: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.FontFamily : "",
            FontStyle: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.FontStyle : "",
            LetterSpacing: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.LetterSpacing : "",
          },
          p: {
            FontSize: `14px`,
            FontWeight: `500`,
            LineHeight: `16px`,
            LetterSpacing: ``,
            FontFamily: ``,
            Url: '',
            FontStyle: ``,
          },
          Button: {
            FontSize: headerData && headerData.typographyValues ? headerData.typographyValues.Button.FontSize : "",
            FontWeight: headerData && headerData.typographyValues ? headerData.typographyValues.Button.FontWeight : "",
            LineHeight: headerData && headerData.typographyValues ? headerData.typographyValues.Button.LineHeight : "",
            FontFamily: headerData && headerData.typographyValues ? headerData.typographyValues.Button.FontFamily : "",
            FontStyle: headerData && headerData.typographyValues ? headerData.typographyValues.Button.FontStyle : "",
            LetterSpacing: headerData && headerData.typographyValues ? headerData.typographyValues.Button.LetterSpacing : "",
          },
          BookAppoinmentButton: {
            FontWeight: `700`,
            FontSize: `16px`,
            LineHeight: `22px`,
            LetterSpacing: ``,
            FontFamily: ``,
            Url: '',
            FontStyle: ``,
          },
          NavMenu: {
            FontSize: headerData && headerData.typographyValues ? headerData.typographyValues.NavMenu.FontSize : "",
            FontWeight: headerData && headerData.typographyValues ? headerData.typographyValues.NavMenu.FontWeight : "",
            LineHeight: headerData && headerData.typographyValues ? headerData.typographyValues.NavMenu.LineHeight : "",
            FontFamily: headerData && headerData.typographyValues ? headerData.typographyValues.NavMenu.FontFamily : "",
            FontStyle: headerData && headerData.typographyValues ? headerData.typographyValues.NavMenu.FontStyle : "",
            LetterSpacing: headerData && headerData.typographyValues ? headerData.typographyValues.NavMenu.LetterSpacing : "",
            Active: {
              FontWeight: `600`,
            }
          }
        },
        footerThemeTypo: {
          h2: {
            FontSize: `18px`,
            FontWeight: `700`,
            LineHeight: `25px`,
            LetterSpacing: ``,
            FontFamily: ``,
            Url: '',
            FontStyle: ``,
          },
          h3: {
            FontSize: `16px`,
            FontWeight: `400`,
            LineHeight: `24px`,
            LetterSpacing: ``,
            FontFamily: ``,
            Url: '',
            FontStyle: ``,
          },
          h4: {
            FontSize: footerData && footerData.typographyValues ? footerData.typographyValues.h4.FontSize : "",
            FontWeight: footerData && footerData.typographyValues ? footerData.typographyValues.h4.FontWeight : "",
            LineHeight: footerData && footerData.typographyValues ? footerData.typographyValues.h4.LineHeight : "",
            FontFamily: footerData && footerData.typographyValues ? footerData.typographyValues.h4.FontFamily : "",
            FontStyle: footerData && footerData.typographyValues ? footerData.typographyValues.h4.FontStyle : "",
            LetterSpacing: footerData && footerData.typographyValues ? footerData.typographyValues.h4.LetterSpacing : "",
          },
          h5: {
            FontSize: footerData && footerData.typographyValues ? footerData.typographyValues.h5.FontSize : "",
            FontWeight: footerData && footerData.typographyValues ? footerData.typographyValues.h5.FontWeight : "",
            LineHeight: footerData && footerData.typographyValues ? footerData.typographyValues.h5.LineHeight : "",
            FontFamily: footerData && footerData.typographyValues ? footerData.typographyValues.h5.FontFamily : "",
            FontStyle: footerData && footerData.typographyValues ? footerData.typographyValues.h5.FontStyle : "",
            LetterSpacing: footerData && footerData.typographyValues ? footerData.typographyValues.h5.LetterSpacing : "",
          },
          h6: {
            FontSize: footerData && footerData.typographyValues ? footerData.typographyValues.h6.FontSize : "",
            FontWeight: footerData && footerData.typographyValues ? footerData.typographyValues.h6.FontWeight : "",
            LineHeight: footerData && footerData.typographyValues ? footerData.typographyValues.h6.LineHeight : "",
            FontFamily: footerData && footerData.typographyValues ? footerData.typographyValues.h6.FontFamily : "",
            FontStyle: footerData && footerData.typographyValues ? footerData.typographyValues.h6.FontStyle : "",
            LetterSpacing: footerData && footerData.typographyValues ? footerData.typographyValues.h6.LetterSpacing : "",
          },
          p: {
            FontWeight: '400',
            FontSize: '14px',
            LineHeight: '20px',
            LetterSpacing: ``,
            FontFamily: ``,
            Url: '',
            FontStyle: ``,
          },
          a: {
            FontSize: footerData && footerData.typographyValues ? footerData.typographyValues.a.FontSize : "",
            FontWeight: footerData && footerData.typographyValues ? footerData.typographyValues.a.FontWeight : "",
            LineHeight: footerData && footerData.typographyValues ? footerData.typographyValues.a.LineHeight : "",
            FontFamily: footerData && footerData.typographyValues ? footerData.typographyValues.a.FontFamily : "",
            FontStyle: footerData && footerData.typographyValues ? footerData.typographyValues.a.FontStyle : "",
            LetterSpacing: footerData && footerData.typographyValues ? footerData.typographyValues.a.LetterSpacing : "",
          },
          Copyright: {
            FontSize: footerData && footerData.typographyValues ? footerData.typographyValues.Copyright.FontSize : "",
            FontWeight: footerData && footerData.typographyValues ? footerData.typographyValues.Copyright.FontWeight : "",
            LineHeight: footerData && footerData.typographyValues ? footerData.typographyValues.Copyright.LineHeight : "",
            FontFamily: footerData && footerData.typographyValues ? footerData.typographyValues.Copyright.FontFamily : "",
            FontStyle: footerData && footerData.typographyValues ? footerData.typographyValues.Copyright.FontStyle : "",
            LetterSpacing: footerData && footerData.typographyValues ? footerData.typographyValues.Copyright.LetterSpacing : "",
          }
        },
        headerThemeUtilities: {
          Logo: {
            Width: '84px',
            Height: '84px',
          },
          h2: {
            TextTransform: 'capitalize',
            TextAlignment: 'left',
          },
          h3: {
            TextTransform: 'capitalize',
            TextAlignment: 'left',
          },
          h4: {
            TextTransform: 'capitalize',
            TextAlignment: 'left',
          },
          h5: {
            TextTransform: 'uppercase',
            TextAlignment: 'left',
          },
          h6: {
            TextTransform: 'uppercase',
            TextAlignment: 'left',
          },
          p: {
            TextTransform: '',
            TextAlignment: 'left',
          },
          Button: {
            PaddingY: '10px',
            PaddingX: '14px',
            BorderRadius: '4px',
          },
          BookAppoinmentButton: {
            PaddingY: '8px',
            PaddingX: '24px',
            BorderRadius: '50px',
            TextTransform: 'uppercase',
            TextAlignment: '',
          },
          NavMenu: {
            MenuGap: `28px`,
          }
        },
        footerThemeUtilities: {
          Logo: {
            Width: `74px`,
            Height: "74px",
            BorderRadius: "0",
            PaddingX: "4px",
            PaddingY: "4px",
          },
          h2: {
            TextTransform: `uppercase`,
            TextAlignment: ``,
          },
          h3: {
            TextTransform: `uppercase`,
            TextAlignment: ``,
          },
          h4: {
            TextTransform: `uppercase`,
            TextAlignment: ``,
          },
          h5: {
            TextTransform: `uppercase`,
            TextAlignment: ``,
          },
          h6: {
            TextTransform: `uppercase`,
            TextAlignment: ``,
          },
          a: {
            TextTransform: `uppercase`,
            TextAlignment: ``,
          },
          Map: {
            Height: `157px`
          },
          SocialMediaIcon: {
            Width: `38px`,
            Height: `38px`,
          },
        },
        bodyThemeColor: {
          Background: bodyData.websiteBackground,
          typography: {
            Color: bodyData.RegularTextColor ? bodyData.RegularTextColor : "",
            HeadingColor: bodyData.HeadingTextColor ? bodyData.HeadingTextColor : "",
            SubHeadingColor: bodyData.SubHeadingTextColor ? bodyData.SubHeadingTextColor : "",
            LinkColor: bodyData.HyperlinkTextColor ? bodyData.HyperlinkTextColor : "",
            Hover: {
              LinkColor: bodyData.HyperlinkHoverColor ? bodyData.HyperlinkHoverColor : "",
            }
          },
          Button: {
            Background: bodyData.ButtonBackground ? bodyData.ButtonBackground : "",
            Color: bodyData.ButtonText ? bodyData.ButtonText : "",
            Hover: {
              Background: bodyData.ButtonHoverBackground ? bodyData.ButtonHoverBackground : "",
              Color: bodyData.ButtonHoverTextColor ? bodyData.ButtonHoverTextColor : "",
            }
          }
        }
      }
      console.log(themeGlobal, "jiji")
    
      if (editTheme) {
       
        dispatch(editWebsiteTemplateTheme({
          themes: themeGlobal,themeBody:themeGlobal, industry: user.user_business_type, theme_Name: themeName, owner: user._id,business:user.user_institute,
          institute: user.user_institute, template: _id, theme: themeData.themeData._id, primaryColor: headerData.navMenuBackground,
          secondaryColor: headerData.navMenuHoverColor,
          tertiaryColor: bodyData.websiteBackground
        }))
      } else {
        dispatch(createWebsiteTemplateUserTheme({
           theme: themeGlobal, themeCategory: user.user_business_type, theme_Name: themeName, owner: user._id,
          business: user.user_institute,institute: user.user_institute, template: _id, primaryColor: headerData.navMenuBackground,
          secondaryColor: headerData.navMenuHoverColor,
          tertiaryColor: bodyData.websiteBackground
        }))
      }
    }
  }
  const handleCancel = () => {
    setThemeNameError(false)
    setThemeName("")
    handleThemeDrop()
    dispatch(updateDynamicWebsiteThemeTemplate(prevTheme))
  }

  useEffect(() => {
    if (themeSuccess) {
      let headerDataSuccess = {
        typographyValues: themeData.themeGlobal.headerThemeTypo,
        HeaderBackground: themeData.themeGlobal.headerThemeColor.Background,
        headingColor: themeData.themeGlobal.headerThemeColor.h4.Color,

        loginBackground: themeData.themeGlobal.headerThemeColor.ButtonLogin.Background,
        loginColor: themeData.themeGlobal.headerThemeColor.ButtonLogin.Color,
        loginBorderColor: themeData.themeGlobal.headerThemeColor.ButtonLogin.BorderColor,
        loginHoverBackground: themeData.themeGlobal.headerThemeColor.ButtonLogin.Hover.Background,
        loginHoverColor: themeData.themeGlobal.headerThemeColor.ButtonLogin.Hover.Color,
        loginHoverBorderColor: themeData.themeGlobal.headerThemeColor.ButtonLogin.Hover.BorderColor,
        loginActiveBackground: themeData.themeGlobal.headerThemeColor.ButtonLogin.Active.Background,
        loginActiveColor: themeData.themeGlobal.headerThemeColor.ButtonLogin.Active.Color,
        loginActiveBorderColor: themeData.themeGlobal.headerThemeColor.ButtonLogin.Active.BorderColor,


        SignUpBackground: themeData.themeGlobal.headerThemeColor.ButtonSignup.Background,
        SignUpColor: themeData.themeGlobal.headerThemeColor.ButtonSignup.Color,
        SignUpBorderColor: themeData.themeGlobal.headerThemeColor.ButtonSignup.BorderColor,
        SignUpHoverBackground: themeData.themeGlobal.headerThemeColor.ButtonSignup.Hover.Background,
        SignUpHoverColor: themeData.themeGlobal.headerThemeColor.ButtonSignup.Hover.Color,
        SignUpHoverBorderColor: themeData.themeGlobal.headerThemeColor.ButtonSignup.Hover.BorderColor,
        SignUpActiveBackground: themeData.themeGlobal.headerThemeColor.ButtonSignup.Active.Background,
        SignUpActiveColor: themeData.themeGlobal.headerThemeColor.ButtonSignup.Active.Color,
        SignUpActiveBorderColor: themeData.themeGlobal.headerThemeColor.ButtonSignup.Active.BorderColor,

        navMenuBackground: themeData.themeGlobal.headerThemeColor.NavMenu.Background,
        navMenuHoverColor: themeData.themeGlobal.headerThemeColor.NavMenu.Hover.Color,
        navMenuColor: themeData.themeGlobal.headerThemeColor.NavMenu.Color,
        navMenuScrollIconColor: themeData.themeGlobal.headerThemeColor.NavMenu.ScrollIcon.Color,
        navMenuScrollIconHoverColor: themeData.themeGlobal.headerThemeColor.NavMenu.ScrollIcon.Hover.Color,
      }
      let bodyDataSuccess = {
        websiteBackground: themeData.themeGlobal.bodyThemeColor.Background,
        bodyTypo: themeData.themeGlobal.typography,
        RegularTextColor: themeData.themeGlobal.bodyThemeColor.typography.Color,
        HeadingTextColor: themeData.themeGlobal.bodyThemeColor.typography.HeadingColor,
        SubHeadingTextColor: themeData.themeGlobal.bodyThemeColor.typography.SubHeadingColor,
        HyperlinkTextColor: themeData.themeGlobal.bodyThemeColor.typography.LinkColor,
        HyperlinkHoverColor: themeData.themeGlobal.bodyThemeColor.typography?.Hover?.LinkColor,
        ButtonBackground: themeData.themeGlobal.bodyThemeColor.Button.Background,
        ButtonText: themeData.themeGlobal.bodyThemeColor.Button.Color,
        ButtonHoverBackground: themeData.themeGlobal.bodyThemeColor.Button?.Hover?.Background,
        ButtonHoverTextColor: themeData.themeGlobal.bodyThemeColor.Button?.Hover?.Color
      }
      let footerSuccess = {
        FooterBackground: themeData.themeGlobal.footerThemeColor.Background,
        LinkColor: themeData.themeGlobal.footerThemeColor.a.Color,
        LinkHovercolor: themeData.themeGlobal.footerThemeColor.a.Hover.Color,
        logoBackGround: themeData.themeGlobal.footerThemeColor.Logo.Background,
        heading4Color: themeData.themeGlobal.footerThemeColor.h4.Color,
        heading5Color: themeData.themeGlobal.footerThemeColor.h5.Color,
        heading6Color: themeData.themeGlobal.footerThemeColor.h6.Color,
        copyrightColor: themeData.themeGlobal.footerThemeColor.Copyright.Color,
        typography: themeData.themeGlobal.footerThemeTypo
      }
      setThemeName(themeData.themename)
      setHeaderData(headerDataSuccess)
      setBodyData(bodyDataSuccess)
      setFooterData(footerSuccess)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeSuccess])
  const handleLoadHeaderData = (values) => {
    setHeaderData(values)
  }
  const handleLoadBodyData = (values) => {
    setBodyData(values)

  }
  const handleLoadFooterData = (values) => {
    setFooterData(values)
  }

  useEffect(() => {
    // const themeGlobal = {
    //   color: {
    //     alpha: `#343F64`,
    //     alphaSemiLight: `#4E616B`,
    //     alphaLight: `#EBECF0`,
    //     beta: `#E9DB89`,
    //     betaSemiLight: ``,
    //     betaLight: ``,
    //     background: ``,
    //     base: `#202020`,
    //     baseSemiLight: `rgba(32,
    //     32,
    //     32,
    //     0.6)`,
    //     baseLight: `rgba(32,
    //     32,
    //     32,
    //     0.4)`,
    //     universal: `#FFFFFF`,
    //   },
    //   typography: {
    //     h1: {
    //       FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h1.FontSize : "",
    //       FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h1.FontWeight : "",
    //       LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h1.LineHeight : "",
    //       FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h1.FontFamily : "",
    //       FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h1.FontStyle : "",
    //       LetterSpacing: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h1.LetterSpacing : "",
    //     },
    //     h2: {
    //       FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h2.FontSize : "",
    //       FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h2.FontWeight : "",
    //       LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h2.LineHeight : "",
    //       FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h2.FontFamily : "",
    //       FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h2.FontStyle : "",
    //       LetterSpacing: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h2.LetterSpacing : "",
    //     },
    //     h3: {
    //       FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h3.FontSize : "",
    //       FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h3.FontWeight : "",
    //       LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h3.LineHeight : "",
    //       FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h3.FontFamily : "",
    //       FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h3.FontStyle : "",
    //       LetterSpacing: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h3.LetterSpacing : "",
    //     },
    //     h4: {
    //       FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h4.FontSize : "",
    //       FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h4.FontWeight : "",
    //       LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h4.LineHeight : "",
    //       FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h4.FontFamily : "",
    //       FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h4.FontStyle : "",
    //       LetterSpacing: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h4.LetterSpacing : "",
    //     },
    //     h5: {
    //       FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h5.FontSize : "",
    //       FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h5.FontWeight : "",
    //       LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h5.LineHeight : "",
    //       FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h5.FontFamily : "",
    //       FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h5.FontStyle : "",
    //       LetterSpacing: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h5.LetterSpacing : "",
    //     },
    //     h6: {
    //       FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h6.FontSize : "",
    //       FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h6.FontWeight : "",
    //       LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h6.LineHeight : "",
    //       FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h6.FontFamily : "",
    //       FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h6.FontStyle : "",
    //       LetterSpacing: bodyData && bodyData.bodyTypo?.h6.LetterSpacing,
    //     },
    //     regular: {
    //       FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.regular.FontSize : "",
    //       FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.regular.FontWeight : "",
    //       LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.regular.LineHeight : "",
    //       FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.regular.FontFamily : "",
    //       FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.regular.FontStyle : "",
    //       LetterSpacing: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.regular.LetterSpacing : "",
    //     },
    //     anchor: {
    //       FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.anchor.FontSize : "",
    //       FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.anchor.FontWeight : "",
    //       LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.anchor.LineHeight : "",
    //       FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.anchor.FontFamily : "",
    //       FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.anchor.FontStyle : "",
    //       LetterSpacing: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.anchor.LetterSpacing : "",
    //     },
    //   },
    //   headerThemeColor: {
    //     Background: headerData.HeaderBackground ? headerData.HeaderBackground : "",
    //     h4: {
    //       Color: headerData.headingColor ? headerData.headingColor : "",
    //     },
    //     h5: {
    //       Color: '#4E616B',
    //     },
    //     ButtonLogin: {
    //       Background: headerData.loginBackground ? headerData.loginBackground : "",
    //       Color: headerData.loginColor,
    //       BorderColor: headerData.loginBorderColor ? headerData.loginBorderColor : "",
    //       Hover: {
    //         Background: headerData.loginHoverBackground?headerData.loginHoverBackground:"",
    //         Color: headerData.loginHoverColor? headerData.loginHoverColor:"",
    //         BorderColor: headerData.loginHoverBorderColor? headerData.loginHoverBorderColor:"",
    //       },
    //       Active: {
    //         Background: headerData.loginActiveBackground? headerData.loginActiveBackground:"",
    //         Color: headerData.loginActiveColor?headerData.loginActiveColor:"",
    //         BorderColor: headerData.loginActiveBorderColor?headerData.loginActiveBorderColor:"",
    //       }
    //     },
    //     ButtonSignup: {
    //       Background: headerData.SignUpBackground?headerData.SignUpBackground:"",
    //       BorderColor: headerData.SignUpBorderColor?headerData.SignUpBorderColor:"",
    //       Color: headerData.SignUpColor?headerData.SignUpColor:"",
    //       Hover: {
    //         Background: headerData.SignUpHoverBackground?headerData.SignUpHoverBackground:"",
    //         Color: headerData.SignUpHoverColor?headerData.SignUpHoverColor:"",
    //         BorderColor: headerData.SignUpHoverBorderColor?headerData.SignUpHoverBorderColor:"",
    //       },
    //       Active: {
    //         Background: headerData.SignUpActiveBackground?headerData.SignUpActiveBackground:"",
    //         Color: headerData.SignUpActiveColor? headerData.SignUpActiveColor:"",
    //         BorderColor: headerData.SignUpActiveBorderColor? headerData.SignUpActiveBorderColor:"",
    //       }
    //     },
    //     NavMenu: {
    //       Background: headerData.navMenuBackground?headerData.navMenuBackground:"",
    //       Color: headerData.navMenuColor?headerData.navMenuColor:"",
    //       Hover: {
    //         Color: headerData.navMenuHoverColor?headerData.navMenuHoverColor:"",
    //       },
    //       Active: {
    //         Color: `#26335D`,
    //       },
    //       ScrollIcon: {
    //         Color: headerData.navMenuScrollIconColor?headerData.navMenuScrollIconColor:"",
    //         Hover: {
    //           Color: headerData.navMenuScrollIconHoverColor?headerData.navMenuScrollIconHoverColor:"",
    //         }
    //       }
    //     },
    //   },
    //   footerThemeColor: {
    //     Background: footerData.FooterBackground?footerData.FooterBackground:"",
    //     Logo: {
    //       Background: footerData.logoBackGround?footerData.logoBackGround:"",
    //     },
    //     h4: {
    //       Color: footerData.heading4Color?footerData.heading4Color:"",
    //     },
    //     h5: {
    //       Color: footerData.heading5Color?footerData.heading5Color:"",
    //     },
    //     h6: {
    //       Color: footerData.heading6Color?footerData.heading6Color:"",
    //     },
    //     a: {
    //       Color: footerData.LinkColor?footerData.LinkColor:"",
    //       Hover: {
    //         Color: footerData.LinkHovercolor?footerData.LinkHovercolor:"",
    //       }
    //     },
    //     li: {
    //       Color: '#FFFFFF',
    //     },
    //     Copyright: {
    //       Color: footerData.copyrightColor?footerData.copyrightColor:"",
    //     }
    //   },
    //   headerThemeTypo: {
    //     h4: {
    //       FontSize: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontSize : "",
    //       FontWeight: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontWeight : "",
    //       LineHeight: headerData && headerData.typographyValues ? headerData.typographyValues.h4.LineHeight : "",
    //       FontFamily: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontFamily : "",
    //       FontStyle: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontStyle : "",
    //       LetterSpacing: headerData && headerData.typographyValues ? headerData.typographyValues.h4.LetterSpacing : "",
    //     },
    //     h6: {
    //       FontSize: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontSize : "",
    //       FontWeight: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontWeight : "",
    //       LineHeight: headerData && headerData.typographyValues ? headerData.typographyValues.h4.LineHeight : "",
    //       FontFamily: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontFamily : "",
    //       FontStyle: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontStyle : "",
    //       LetterSpacing: headerData && headerData.typographyValues ? headerData.typographyValues.h4.LetterSpacing : "",
    //     },
    //     h5: {
    //       FontSize: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.FontSize : "",
    //       FontWeight: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.FontWeight : "",
    //       LineHeight: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.LineHeight : "",
    //       FontFamily: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.FontFamily : "",
    //       FontStyle: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.FontStyle : "",
    //       LetterSpacing: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.LetterSpacing : "",
    //     },
    //     Button: {
    //       FontSize: headerData && headerData.typographyValues ? headerData.typographyValues.Button.FontSize : "",
    //       FontWeight: headerData && headerData.typographyValues ? headerData.typographyValues.Button.FontWeight : "",
    //       LineHeight: headerData && headerData.typographyValues ? headerData.typographyValues.Button.LineHeight : "",
    //       FontFamily: headerData && headerData.typographyValues ? headerData.typographyValues.Button.FontFamily : "",
    //       FontStyle: headerData && headerData.typographyValues ? headerData.typographyValues.Button.FontStyle : "",
    //       LetterSpacing: headerData && headerData.typographyValues ? headerData.typographyValues.Button.LetterSpacing : "",
    //     },
    //     NavMenu: {
    //       FontSize: headerData && headerData.typographyValues ? headerData.typographyValues.NavMenu.FontSize : "",
    //       FontWeight: headerData && headerData.typographyValues ? headerData.typographyValues.NavMenu.FontWeight : "",
    //       LineHeight: headerData && headerData.typographyValues ? headerData.typographyValues.NavMenu.LineHeight : "",
    //       FontFamily: headerData && headerData.typographyValues ? headerData.typographyValues.NavMenu.FontFamily : "",
    //       FontStyle: headerData && headerData.typographyValues ? headerData.typographyValues.NavMenu.FontStyle : "",
    //       LetterSpacing: headerData && headerData.typographyValues ? headerData.typographyValues.NavMenu.LetterSpacing : "",
    //       Active: {
    //         FontWeight: `600`,
    //       }
    //     }
    //   },
    //   footerThemeTypo: {
    //     h4: {
    //       FontSize: footerData && footerData.typographyValues ? footerData.typographyValues.h4.FontSize : "",
    //       FontWeight: footerData && footerData.typographyValues ? footerData.typographyValues.h4.FontWeight : "",
    //       LineHeight: footerData && footerData.typographyValues ? footerData.typographyValues.h4.LineHeight : "",
    //       FontFamily: footerData && footerData.typographyValues ? footerData.typographyValues.h4.FontFamily : "",
    //       FontStyle: footerData && footerData.typographyValues ? footerData.typographyValues.h4.FontStyle : "",
    //       LetterSpacing: footerData && footerData.typographyValues ? footerData.typographyValues.h4.LetterSpacing : "",
    //     },
    //     h5: {
    //       FontSize: footerData && footerData.typographyValues ? footerData.typographyValues.h5.FontSize : "",
    //       FontWeight: footerData && footerData.typographyValues ? footerData.typographyValues.h5.FontWeight : "",
    //       LineHeight: footerData && footerData.typographyValues ? footerData.typographyValues.h5.LineHeight : "",
    //       FontFamily: footerData && footerData.typographyValues ? footerData.typographyValues.h5.FontFamily : "",
    //       FontStyle: footerData && footerData.typographyValues ? footerData.typographyValues.h5.FontStyle : "",
    //       LetterSpacing: footerData && footerData.typographyValues ? footerData.typographyValues.h5.LetterSpacing : "",
    //     },
    //     h6: {
    //       FontSize: footerData && footerData.typographyValues ? footerData.typographyValues.h6.FontSize : "",
    //       FontWeight: footerData && footerData.typographyValues ? footerData.typographyValues.h6.FontWeight : "",
    //       LineHeight: footerData && footerData.typographyValues ? footerData.typographyValues.h6.LineHeight : "",
    //       FontFamily: footerData && footerData.typographyValues ? footerData.typographyValues.h6.FontFamily : "",
    //       FontStyle: footerData && footerData.typographyValues ? footerData.typographyValues.h6.FontStyle : "",
    //       LetterSpacing: footerData && footerData.typographyValues ? footerData.typographyValues.h6.LetterSpacing : "",
    //     },
    //     li: {
    //       FontSize: `14px`,
    //       FontWeight: `400`,
    //       LineHeight: `21px`,
    //       LetterSpacing: ``,
    //       FontFamily: ``,
    //       FontStyle: ``,
    //     },
    //     a: {
    //       FontSize: footerData && footerData.typographyValues ? footerData.typographyValues.a.FontSize : "",
    //       FontWeight: footerData && footerData.typographyValues ? footerData.typographyValues.a.FontWeight : "",
    //       LineHeight: footerData && footerData.typographyValues ? footerData.typographyValues.a.LineHeight : "",
    //       FontFamily: footerData && footerData.typographyValues ? footerData.typographyValues.a.FontFamily : "",
    //       FontStyle: footerData && footerData.typographyValues ? footerData.typographyValues.a.FontStyle : "",
    //       LetterSpacing: footerData && footerData.typographyValues ? footerData.typographyValues.a.LetterSpacing : "",
    //     },
    //     Copyright: {
    //       FontSize: footerData && footerData.typographyValues ? footerData.typographyValues.Copyright.FontSize : "",
    //       FontWeight: footerData && footerData.typographyValues ? footerData.typographyValues.Copyright.FontWeight : "",
    //       LineHeight: footerData && footerData.typographyValues ? footerData.typographyValues.Copyright.LineHeight : "",
    //       FontFamily: footerData && footerData.typographyValues ? footerData.typographyValues.Copyright.FontFamily : "",
    //       FontStyle: footerData && footerData.typographyValues ? footerData.typographyValues.Copyright.FontStyle : "",
    //       LetterSpacing: footerData && footerData.typographyValues ? footerData.typographyValues.Copyright.LetterSpacing : "",
    //     }
    //   },
    //   headerThemeUtilities: {
    //     Logo: {
    //       Width: '86px',
    //       Height: '86px',
    //     },
    //     h4: {
    //       TextTransform: 'uppercase',
    //       TextAlignment: 'left',
    //     },
    //     h5: {
    //       TextTransform: 'uppercase',
    //       TextAlignment: 'left',
    //     },
    //     Button: {
    //       PaddingY: '10px',
    //       PaddingX: '14px',
    //       BorderRadius: '4px',
    //     },
    //     NavMenu: {
    //       MenuGap: `28px`,
    //     }
    //   },
    //   footerThemeUtilities: {
    //     Logo: {
    //       Width: `80px`,
    //       Height: "80px",
    //       BorderRadius: "50%",
    //       PaddingX: "10px",
    //       PaddingY: "10px",
    //     },
    //     h4: {
    //       TextTransform: `uppercase`,
    //       TextAlignment: ``,
    //     },
    //     h5: {
    //       TextTransform: `uppercase`,
    //       TextAlignment: ``,
    //     },
    //     h6: {
    //       TextTransform: `uppercase`,
    //       TextAlignment: ``,
    //     },
    //     a: {
    //       TextTransform: `uppercase`,
    //       TextAlignment: ``,
    //     },
    //     li: {
    //       TextTransform: `uppercase`,
    //       TextAlignment: ``,
    //     },
    //     Map: {
    //       Height: `300px`
    //     },
    //     SocialMediaIcon: {
    //       Width: `38px`,
    //       Height: `38px`,
    //     },
    //   },
    //   bodyThemeColor: {
    //     Background: bodyData.websiteBackground,
    //     typography: {
    //       Color: bodyData.RegularTextColor?bodyData.RegularTextColor:"",
    //       HeadingColor: bodyData.HeadingTextColor?bodyData.HeadingTextColor:"",
    //       SubHeadingColor: bodyData.SubHeadingTextColor? bodyData.SubHeadingTextColor:"",
    //       LinkColor: bodyData.HyperlinkTextColor?bodyData.HyperlinkTextColor:"",
    //       Hover: {
    //         LinkColor: bodyData.HyperlinkHoverColor?bodyData.HyperlinkHoverColor:"",
    //       }
    //     },
    //     Button: {
    //       Background: bodyData.ButtonBackground?bodyData.ButtonBackground:"",
    //       Color: bodyData.ButtonText?bodyData.ButtonText:"",
    //       Hover: {
    //         Background: bodyData.ButtonHoverBackground?bodyData.ButtonHoverBackground:"",
    //         Color: bodyData.ButtonHoverTextColor?bodyData.ButtonHoverTextColor:"",
    //       }
    //     }
    //   }
    // }
    const themeGlobal = {
      color: {
        alpha: `#006f9c`,
        alphaSemiLight: `#4E616B`,
        alphaLight: `#EBECF0`,
        beta: `#FDEDE1`,
        betaSemiLight: ``,
        betaLight: ``,
        background: ``,
        base: `#202020`,
        baseSemiLight: `rgba(32, 32, 32, 0.6)`,
        baseLight: `rgba(32, 32, 32, 0.4)`,
        universal: `#FFFFFF`,
      },
      typography: {
        h1: {
          FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h1.FontSize : "",
          FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h1.FontWeight : "",
          LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h1.LineHeight : "",
          FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h1.FontFamily : "",
          FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h1.FontStyle : "",
          LetterSpacing: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h1.LetterSpacing : "",
        },
        h2: {
          FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h2.FontSize : "",
          FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h2.FontWeight : "",
          LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h2.LineHeight : "",
          FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h2.FontFamily : "",
          FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h2.FontStyle : "",
          LetterSpacing: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h2.LetterSpacing : "",
        },
        h3: {
          FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h3.FontSize : "",
          FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h3.FontWeight : "",
          LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h3.LineHeight : "",
          FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h3.FontFamily : "",
          FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h3.FontStyle : "",
          LetterSpacing: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h3.LetterSpacing : "",
        },
        h4: {
          FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h4.FontSize : "",
          FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h4.FontWeight : "",
          LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h4.LineHeight : "",
          FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h4.FontFamily : "",
          FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h4.FontStyle : "",
          LetterSpacing: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h4.LetterSpacing : "",
        },
        h5: {
          FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h5.FontSize : "",
          FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h5.FontWeight : "",
          LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h5.LineHeight : "",
          FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h5.FontFamily : "",
          FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h5.FontStyle : "",
          LetterSpacing: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h5.LetterSpacing : "",
        },
        h6: {
          FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h6.FontSize : "",
          FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h6.FontWeight : "",
          LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h6.LineHeight : "",
          FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h6.FontFamily : "",
          FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo.h6.FontStyle : "",
          LetterSpacing: bodyData && bodyData.bodyTypo?.h6.LetterSpacing,
        },
        regular: {
          FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.regular.FontSize : "",
          FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.regular.FontWeight : "",
          LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.regular.LineHeight : "",
          FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.regular.FontFamily : "",
          FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.regular.FontStyle : "",
          LetterSpacing: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.regular.LetterSpacing : "",
        },
        anchor: {
          FontSize: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.anchor.FontSize : "",
          FontWeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.anchor.FontWeight : "",
          LineHeight: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.anchor.LineHeight : "",
          FontFamily: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.anchor.FontFamily : "",
          FontStyle: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.anchor.FontStyle : "",
          LetterSpacing: bodyData && bodyData.bodyTypo ? bodyData.bodyTypo?.anchor.LetterSpacing : "",
        },
      },
      headerThemeColor: {
        Background: headerData.HeaderBackground ? headerData.HeaderBackground : "",
        h4: {
          Color: headerData.headingColor ? headerData.headingColor : "",
        },
        h5: {
          Color: headerData.headingColor ? headerData.headingColor : "",
        },
        h6: {
          Color: '#006f9c',
        },
        p: {
          Color: '#f48631',
        },
        a: {
          Color: '#f48631',
        },
        ButtonLogin: {
          Background: headerData.loginBackground ? headerData.loginBackground : "",
          Color: headerData.loginColor,
          BorderColor: headerData.loginBorderColor ? headerData.loginBorderColor : "",
          Hover: {
            Background: headerData.loginHoverBackground ? headerData.loginHoverBackground : "",
            Color: headerData.loginHoverColor ? headerData.loginHoverColor : "",
            BorderColor: headerData.loginHoverBorderColor ? headerData.loginHoverBorderColor : "",
          },
          Active: {
            Background: headerData.loginActiveBackground ? headerData.loginActiveBackground : "",
            Color: headerData.loginActiveColor ? headerData.loginActiveColor : "",
            BorderColor: headerData.loginActiveBorderColor ? headerData.loginActiveBorderColor : "",
          }
        },
        BookAppoinmentButton: {
          Background: `#FDEDE1`,
          Color: `#006f9c`,
          BorderColor: `transparent`,
          Hover: {
            Background: `#FFFFFF`,
            Color: `#006f9c`,
            BorderColor: `transparent`,
          }
        },
        ButtonSignup: {
          Background: headerData.SignUpBackground ? headerData.SignUpBackground : "",
          BorderColor: headerData.SignUpBorderColor ? headerData.SignUpBorderColor : "",
          Color: headerData.SignUpColor ? headerData.SignUpColor : "",
          Hover: {
            Background: headerData.SignUpHoverBackground ? headerData.SignUpHoverBackground : "",
            Color: headerData.SignUpHoverColor ? headerData.SignUpHoverColor : "",
            BorderColor: headerData.SignUpHoverBorderColor ? headerData.SignUpHoverBorderColor : "",
          },
          Active: {
            Background: headerData.SignUpActiveBackground ? headerData.SignUpActiveBackground : "",
            Color: headerData.SignUpActiveColor ? headerData.SignUpActiveColor : "",
            BorderColor: headerData.SignUpActiveBorderColor ? headerData.SignUpActiveBorderColor : "",
          }
        },
        NavMenu: {
          Background: headerData.navMenuBackground ? headerData.navMenuBackground : "",
          Color: headerData.navMenuColor ? headerData.navMenuColor : "",
          Hover: {
            Color: headerData.navMenuHoverColor ? headerData.navMenuHoverColor : "",
          },
          Active: {
            Color: `#26335D`,
          },
          ScrollIcon: {
            Color: headerData.navMenuScrollIconColor ? headerData.navMenuScrollIconColor : "",
            Hover: {
              Color: headerData.navMenuScrollIconHoverColor ? headerData.navMenuScrollIconHoverColor : "",
            }
          }
        },
      },
      footerThemeColor: {
        Background: footerData.FooterBackground ? footerData.FooterBackground : "",
        Logo: {
          Background: footerData.logoBackGround ? footerData.logoBackGround : "",
        },
        h2: {
          Color: footerData.heading4Color ? footerData.heading4Color : "",
        },
        h3: {
          Color: footerData.heading4Color ? footerData.heading4Color : "",
        },
        h4: {
          Color: footerData.heading4Color ? footerData.heading4Color : "",
        },
        h5: {
          Color: footerData.heading4Color ? footerData.heading4Color : "",
        },
        h6: {
          Color: footerData.heading4Color ? footerData.heading4Color : "",
        },
        a: {
          Color: footerData.LinkColor ? footerData.LinkColor : "",
          Hover: {
            Color: footerData.LinkHovercolor ? footerData.LinkHovercolor : "",
          }
        },
        Copyright: {
          Color: footerData.copyrightColor ? footerData.copyrightColor : "",
        }
      },
      headerThemeTypo: {
        h4: {
          FontSize: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontSize : "",
          FontWeight: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontWeight : "",
          LineHeight: headerData && headerData.typographyValues ? headerData.typographyValues.h4.LineHeight : "",
          FontFamily: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontFamily : "",
          FontStyle: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontStyle : "",
          LetterSpacing: headerData && headerData.typographyValues ? headerData.typographyValues.h4.LetterSpacing : "",
        },
        h6: {
          FontSize: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontSize : "",
          FontWeight: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontWeight : "",
          LineHeight: headerData && headerData.typographyValues ? headerData.typographyValues.h4.LineHeight : "",
          FontFamily: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontFamily : "",
          FontStyle: headerData && headerData.typographyValues ? headerData.typographyValues.h4.FontStyle : "",
          LetterSpacing: headerData && headerData.typographyValues ? headerData.typographyValues.h4.LetterSpacing : "",
        },
        h5: {
          FontSize: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.FontSize : "",
          FontWeight: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.FontWeight : "",
          LineHeight: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.LineHeight : "",
          FontFamily: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.FontFamily : "",
          FontStyle: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.FontStyle : "",
          LetterSpacing: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.LetterSpacing : "",
        },
        p: {
          FontSize: `14px`,
          FontWeight: `500`,
          LineHeight: `16px`,
          LetterSpacing: ``,
          FontFamily: ``,
          Url: '',
          FontStyle: ``,
        },
        Button: {
          FontSize: headerData && headerData.typographyValues ? headerData.typographyValues.Button.FontSize : "",
          FontWeight: headerData && headerData.typographyValues ? headerData.typographyValues.Button.FontWeight : "",
          LineHeight: headerData && headerData.typographyValues ? headerData.typographyValues.Button.LineHeight : "",
          FontFamily: headerData && headerData.typographyValues ? headerData.typographyValues.Button.FontFamily : "",
          FontStyle: headerData && headerData.typographyValues ? headerData.typographyValues.Button.FontStyle : "",
          LetterSpacing: headerData && headerData.typographyValues ? headerData.typographyValues.Button.LetterSpacing : "",
        },
        BookAppoinmentButton: {
          FontWeight: `700`,
          FontSize: `16px`,
          LineHeight: `22px`,
          LetterSpacing: ``,
          FontFamily: ``,
          Url: '',
          FontStyle: ``,
        },
        NavMenu: {
          FontSize: headerData && headerData.typographyValues ? headerData.typographyValues.NavMenu.FontSize : "",
          FontWeight: headerData && headerData.typographyValues ? headerData.typographyValues.NavMenu.FontWeight : "",
          LineHeight: headerData && headerData.typographyValues ? headerData.typographyValues.NavMenu.LineHeight : "",
          FontFamily: headerData && headerData.typographyValues ? headerData.typographyValues.NavMenu.FontFamily : "",
          FontStyle: headerData && headerData.typographyValues ? headerData.typographyValues.NavMenu.FontStyle : "",
          LetterSpacing: headerData && headerData.typographyValues ? headerData.typographyValues.NavMenu.LetterSpacing : "",
          Active: {
            FontWeight: `600`,
          }
        }
      },
      footerThemeTypo: {
        h2: {
          FontSize: `18px`,
          FontWeight: `700`,
          LineHeight: `25px`,
          LetterSpacing: ``,
          FontFamily: ``,
          Url: '',
          FontStyle: ``,
        },
        h3: {
          FontSize: `16px`,
          FontWeight: `400`,
          LineHeight: `24px`,
          LetterSpacing: ``,
          FontFamily: ``,
          Url: '',
          FontStyle: ``,
        },
        h4: {
          FontSize: footerData && footerData.typographyValues ? footerData.typographyValues.h4.FontSize : "",
          FontWeight: footerData && footerData.typographyValues ? footerData.typographyValues.h4.FontWeight : "",
          LineHeight: footerData && footerData.typographyValues ? footerData.typographyValues.h4.LineHeight : "",
          FontFamily: footerData && footerData.typographyValues ? footerData.typographyValues.h4.FontFamily : "",
          FontStyle: footerData && footerData.typographyValues ? footerData.typographyValues.h4.FontStyle : "",
          LetterSpacing: footerData && footerData.typographyValues ? footerData.typographyValues.h4.LetterSpacing : "",
        },
        h5: {
          FontSize: footerData && footerData.typographyValues ? footerData.typographyValues.h5.FontSize : "",
          FontWeight: footerData && footerData.typographyValues ? footerData.typographyValues.h5.FontWeight : "",
          LineHeight: footerData && footerData.typographyValues ? footerData.typographyValues.h5.LineHeight : "",
          FontFamily: footerData && footerData.typographyValues ? footerData.typographyValues.h5.FontFamily : "",
          FontStyle: footerData && footerData.typographyValues ? footerData.typographyValues.h5.FontStyle : "",
          LetterSpacing: footerData && footerData.typographyValues ? footerData.typographyValues.h5.LetterSpacing : "",
        },
        h6: {
          FontSize: footerData && footerData.typographyValues ? footerData.typographyValues.h6.FontSize : "",
          FontWeight: footerData && footerData.typographyValues ? footerData.typographyValues.h6.FontWeight : "",
          LineHeight: footerData && footerData.typographyValues ? footerData.typographyValues.h6.LineHeight : "",
          FontFamily: footerData && footerData.typographyValues ? footerData.typographyValues.h6.FontFamily : "",
          FontStyle: footerData && footerData.typographyValues ? footerData.typographyValues.h6.FontStyle : "",
          LetterSpacing: footerData && footerData.typographyValues ? footerData.typographyValues.h6.LetterSpacing : "",
        },
        p: {
          FontWeight: '400',
          FontSize: '14px',
          LineHeight: '20px',
          LetterSpacing: ``,
          FontFamily: ``,
          Url: '',
          FontStyle: ``,
        },
        a: {
          FontSize: footerData && footerData.typographyValues ? footerData.typographyValues.a.FontSize : "",
          FontWeight: footerData && footerData.typographyValues ? footerData.typographyValues.a.FontWeight : "",
          LineHeight: footerData && footerData.typographyValues ? footerData.typographyValues.a.LineHeight : "",
          FontFamily: footerData && footerData.typographyValues ? footerData.typographyValues.a.FontFamily : "",
          FontStyle: footerData && footerData.typographyValues ? footerData.typographyValues.a.FontStyle : "",
          LetterSpacing: footerData && footerData.typographyValues ? footerData.typographyValues.a.LetterSpacing : "",
        },
        Copyright: {
          FontSize: footerData && footerData.typographyValues ? footerData.typographyValues.Copyright.FontSize : "",
          FontWeight: footerData && footerData.typographyValues ? footerData.typographyValues.Copyright.FontWeight : "",
          LineHeight: footerData && footerData.typographyValues ? footerData.typographyValues.Copyright.LineHeight : "",
          FontFamily: footerData && footerData.typographyValues ? footerData.typographyValues.Copyright.FontFamily : "",
          FontStyle: footerData && footerData.typographyValues ? footerData.typographyValues.Copyright.FontStyle : "",
          LetterSpacing: footerData && footerData.typographyValues ? footerData.typographyValues.Copyright.LetterSpacing : "",
        }
      },
      headerThemeUtilities: {
        Logo: {
          Width: '84px',
          Height: '84px',
        },
        h2: {
          TextTransform: 'capitalize',
          TextAlignment: 'left',
        },
        h3: {
          TextTransform: 'capitalize',
          TextAlignment: 'left',
        },
        h4: {
          TextTransform: 'capitalize',
          TextAlignment: 'left',
        },
        h5: {
          TextTransform: 'uppercase',
          TextAlignment: 'left',
        },
        h6: {
          TextTransform: 'uppercase',
          TextAlignment: 'left',
        },
        p: {
          TextTransform: '',
          TextAlignment: 'left',
        },
        Button: {
          PaddingY: '10px',
          PaddingX: '14px',
          BorderRadius: '4px',
        },
        BookAppoinmentButton: {
          PaddingY: '8px',
          PaddingX: '24px',
          BorderRadius: '50px',
          TextTransform: 'uppercase',
          TextAlignment: '',
        },
        NavMenu: {
          MenuGap: `28px`,
        }
      },
      footerThemeUtilities: {
        Logo: {
          Width: `74px`,
          Height: "74px",
          BorderRadius: "0",
          PaddingX: "4px",
          PaddingY: "4px",
        },
        h2: {
          TextTransform: `uppercase`,
          TextAlignment: ``,
        },
        h3: {
          TextTransform: `uppercase`,
          TextAlignment: ``,
        },
        h4: {
          TextTransform: `uppercase`,
          TextAlignment: ``,
        },
        h5: {
          TextTransform: `uppercase`,
          TextAlignment: ``,
        },
        h6: {
          TextTransform: `uppercase`,
          TextAlignment: ``,
        },
        a: {
          TextTransform: `uppercase`,
          TextAlignment: ``,
        },
        Map: {
          Height: `157px`
        },
        SocialMediaIcon: {
          Width: `38px`,
          Height: `38px`,
        },
      },
      bodyThemeColor: {
        Background: bodyData.websiteBackground,
        typography: {
          Color: bodyData.RegularTextColor ? bodyData.RegularTextColor : "",
          HeadingColor: bodyData.HeadingTextColor ? bodyData.HeadingTextColor : "",
          SubHeadingColor: bodyData.SubHeadingTextColor ? bodyData.SubHeadingTextColor : "",
          LinkColor: bodyData.HyperlinkTextColor ? bodyData.HyperlinkTextColor : "",
          Hover: {
            LinkColor: bodyData.HyperlinkHoverColor ? bodyData.HyperlinkHoverColor : "",
          }
        },
        Button: {
          Background: bodyData.ButtonBackground ? bodyData.ButtonBackground : "",
          Color: bodyData.ButtonText ? bodyData.ButtonText : "",
          Hover: {
            Background: bodyData.ButtonHoverBackground ? bodyData.ButtonHoverBackground : "",
            Color: bodyData.ButtonHoverTextColor ? bodyData.ButtonHoverTextColor : "",
          }
        }
      }
    }
    dispatch(updateDynamicWebsiteThemeTemplate({ themeGlobal: themeGlobal }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyData, footerData, headerData, headerData.HeaderBackground, headerData.SignUpActiveBackground, headerData.SignUpActiveBorderColor, headerData.SignUpActiveColor, headerData.SignUpBackground, headerData.SignUpColor, headerData.SignUpHoverBackground, headerData.SignUpHoverBorderColor, headerData.SignUpHoverColor, headerData.headingColor, headerData.loginActiveBackground, headerData.loginActiveBorderColor, headerData.loginActiveColor, headerData.loginBackground, headerData.loginColor, headerData.loginHoverBackground, headerData.loginHoverBorderColor, headerData.loginHoverColor, headerData.navMenuBackground])


  useEffect(() => {
    if (createUserThemeSuccess || editThemeSuccess) {
      handleThemeDrop(false)
      // dispatch(resetCreateWebsiteTemplate())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createUserThemeSuccess, dispatch])
  return (
    <React.Fragment>
      <div className="custom-themedrop">
        <div onClick={ThemeDropHandle} className={`select_colorwrap ${themedrop ? "active" : ""}`}>
          <i className="icon-custom_theme"></i>
          {editTheme ? "Update your own" : "Create your own"}
        </div>
        {themedrop ? (
          <React.Fragment>
            {themeSuccess ? <>
              <ul className="Typography-wrap">
                <div className="sub-dropList">
                  {array.map((item, key) => (
                    <React.Fragment>
                      <div className={`list  ${key === dropdown ? "active" : ""}`} key="id" onClick={() => handleDropDown(key)}>
                        <i className={item.icon}></i>{item.listname}
                      </div>

                      {dropdown === key &&
                        <>
                          {
                            item.component === "HeaderCustomize" ? <HeaderCustomize onLoadHeaderData={(values) => handleLoadHeaderData(values)} /> :
                              item.component === "BodyCustomize" ? <BodyCustomize onLoadBodyData={(values) => handleLoadBodyData(values)} /> :
                                item.component === "FooterCustomize" ? <FooterCustomize onLoadFooterData={(values) => handleLoadFooterData(values)} /> : ""

                          }
                        </>
                      }
                    </React.Fragment>
                  ))}
                </div>
              </ul>

              <div className='formFieldwrap'>
                <FormInput placeholder="Write Your Theme Name" className="mb-20" onChange={handleThemeName} value={themeName} />
                <FormError show={themeNameError} error="Theme name required." />
              </div>
              <div className="group-btn">
                {
                  createUserThemeLoading || editThemeLoading ?

                    <button className="button btn-xs button-primary mr-10">Loading...</button> :
                    <React.Fragment>
                      {editTheme ? <button className="button btn-xs button-primary mr-10" onClick={handleSave}>Update</button> : <button className="button btn-xs button-primary mr-10" onClick={handleSave}>Save</button>}
                      <button className="button btn-xs btn-o-gray" onClick={handleCancel}>Cancel</button>
                    </React.Fragment>
                }

              </div>
            </> : "Loading..."}
          </React.Fragment>
        )
          : ""
        }
        <div className="border-bottomList"></div>
      </div>
    </React.Fragment>
  )
}
export default ThemeCustomize