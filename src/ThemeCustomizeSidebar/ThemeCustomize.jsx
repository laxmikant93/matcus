import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import ValidationFile from '../Classes/ValidationFile'
import FormError from '../Common/Form/FormError'
import FormInput from '../Common/Form/FormInput'
import { createWebsiteTemplateUserTheme, editWebsiteTemplateTheme, resetCreateWebsiteTemplate, updateDynamicWebsiteThemeTemplate } from '../store/actions/WebsiteTemplate'

import HeaderCustomize from './CustomSection/HeaderCustomize'
import BodyCustomize from './CustomSection/BodyCustomize'
import FooterCustomize from './CustomSection/FooterCustomize'
const ThemeCustomize = ({ themedrop, handleThemeDrop, editTheme }) => {
  const { themeSuccess, theme, themeData, editThemeSuccess, editThemeLoading, createUserThemeSuccess, createUserThemeLoading, themeGlobalData, user } = useSelector((state) => {
    return {
      theme: state.websiteTemplate.getTemplate.data,
      themeData: state.websiteTemplate.getTemplate.data,
      themeSuccess: state.websiteTemplate.getTemplate.success,
      themeGlobalData: state.websiteTemplate.getTemplate.data,
      user: state.user,
      userthemes: state.websiteTemplate.getTemplate.data.userthemes,
      defaultthemes: state.websiteTemplate.getTemplate.data.defaultthemes,
      createUserThemeLoading: state.websiteTemplate.edit.loading,
      createUserThemeSuccess: state.websiteTemplate.edit.success,

      editThemeSuccess: state.websiteTemplate.edit.success,
      editThemeLoading: state.websiteTemplate.edit.loading,
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
        component: theme.themeGlobal.component === "Defaultine_Body" ? "Defaultine_Body" : "Vespertine_Body",
        color: {
          alpha: `#343F64`,
          alphaSemiLight: `#4E616B`,
          alphaLight: `#EBECF0`,
          beta: `#E9DB89`,
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
            Color: '#4E616B',
          },
          ButtonLogin: {
            Background: headerData.loginBackground ? headerData.loginBackground : "",
            Color: headerData.loginColor,
            BorderColor: headerData.loginBorderColor ? headerData.loginBorderColor : "",
            Hover: {
              Background: headerData.loginHoverBackground,
              Color: headerData.loginHoverColor,
              BorderColor: headerData.loginHoverBorderColor,
            },
            Active: {
              Background: headerData.loginActiveBackground,
              Color: headerData.loginActiveColor,
              BorderColor: headerData.loginActiveBorderColor,
            }
          },
          ButtonSignup: {
            Background: headerData.SignUpBackground,
            BorderColor: headerData.signUpBorderColor,
            Color: headerData.SignUpColor,
            Hover: {
              Background: headerData.SignUpHoverBackground,
              Color: headerData.SignUpHoverColor,
              BorderColor: headerData.SignUpHoverBorderColor,
            },
            Active: {
              Background: headerData.SignUpActiveBackground,
              Color: headerData.SignUpActiveColor,
              BorderColor: headerData.SignUpActiveBorderColor,
            }
          },
          NavMenu: {
            Background: headerData.navMenuBackground,
            Color: headerData.navMenuColor,
            Hover: {
              Color: headerData.navMenuHoverColor,
            },
            Active: {
              Color: `#26335D`,
            },
            ScrollIcon: {
              Color: headerData.navMenuScrollIconColor,
              Hover: {
                Color: headerData.navMenuScrollIconHoverColor,
              }
            }
          },
        },
        footerThemeColor: {
          Background: footerData.FooterBackground,
          Logo: {
            Background: footerData.logoBackGround,
          },
          h4: {
            Color: footerData.heading4Color,
          },
          h5: {
            Color: footerData.heading5Color,
          },
          h6: {
            Color: footerData.heading6Color,
          },
          a: {
            Color: footerData.LinkColor,
            Hover: {
              Color: footerData.LinkHovercolor,
            }
          },
          li: {
            Color: '#FFFFFF',
          },
          Copyright: {
            Color: footerData.copyrightColor,
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
          h5: {
            FontSize: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.FontSize : "",
            FontWeight: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.FontWeight : "",
            LineHeight: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.LineHeight : "",
            FontFamily: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.FontFamily : "",
            FontStyle: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.FontStyle : "",
            LetterSpacing: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.LetterSpacing : "",
          },
          Button: {
            FontSize: headerData && headerData.typographyValues ? headerData.typographyValues.Button.FontSize : "",
            FontWeight: headerData && headerData.typographyValues ? headerData.typographyValues.Button.FontWeight : "",
            LineHeight: headerData && headerData.typographyValues ? headerData.typographyValues.Button.LineHeight : "",
            FontFamily: headerData && headerData.typographyValues ? headerData.typographyValues.Button.FontFamily : "",
            FontStyle: headerData && headerData.typographyValues ? headerData.typographyValues.Button.FontStyle : "",
            LetterSpacing: headerData && headerData.typographyValues ? headerData.typographyValues.Button.LetterSpacing : "",
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
          li: {
            FontSize: `14px`,
            FontWeight: `400`,
            LineHeight: `21px`,
            LetterSpacing: ``,
            FontFamily: ``,
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
            Width: '86px',
            Height: '86px',
          },
          h4: {
            TextTransform: 'uppercase',
            TextAlignment: 'left',
          },
          h5: {
            TextTransform: 'uppercase',
            TextAlignment: 'left',
          },
          Button: {
            PaddingY: '10px',
            PaddingX: '14px',
            BorderRadius: '4px',
          },
          NavMenu: {
            MenuGap: `28px`,
          }
        },
        footerThemeUtilities: {
          Logo: {
            Width: `80px`,
            Height: "80px",
            BorderRadius: "50%",
            PaddingX: "10px",
            PaddingY: "10px",
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
          li: {
            TextTransform: `uppercase`,
            TextAlignment: ``,
          },
          Map: {
            Height: `300px`
          },
          SocialMediaIcon: {
            Width: `38px`,
            Height: `38px`,
          },
        },
        bodyThemeColor: {
          Background: bodyData.websiteBackground,
          typography: {
            Color: bodyData.RegularTextColor,
            HeadingColor: bodyData.HeadingTextColor,
            SubHeadingColor: bodyData.SubHeadingTextColor,
            LinkColor: bodyData.HyperlinkTextColor,
            Hover: {
              LinkColor: bodyData.HyperlinkHoverColor,
            }
          },
          Button: {
            Background: bodyData.ButtonBackground,
            Color: bodyData.ButtonText,
            Hover: {
              Background: bodyData.ButtonHoverBackground,
              Color: bodyData.ButtonHoverTextColor,
            }
          }
        }
      }
      const dynamic = {
        header: themeSuccess && theme.Header.component && theme.Header.component === "Defaultine_Header" ? "Defaultine_Header" : "Vespertine_Header",
        footer: themeSuccess && theme.Footer.component && theme.Footer.component === "Defaultine_Footer" ? "Defaultine_Footer" : "Vespertine_Footer",
        body: themeSuccess && theme.themeGlobal.component && theme.themeGlobal.component === "Defaultine_Body" ? "Defaultine_Body" : "Vespertine_Body",
        aboutus: themeSuccess && theme.AboutUs.AboutUsPage.component && theme.AboutUs.AboutUsPage.component === "Defaultine_AboutUsPage" ? "Defaultine_AboutUsPage" : "Vespertine_AboutUsPage",
        team: themeSuccess && theme.Team.TeamPage.component && theme.Team.TeamPage.component === "Defaultine_TeamPage" ? "Defaultine_TeamPage" : "Vespertine_TeamPage",
        admission: themeSuccess && theme.Admission.AdmissionPage.component && theme.Admission.AdmissionPage.component === "Defaultine_AdmissionPage" ? "Defaultine_AdmissionPage" : "Vespertine_AdmissionPage",
        feestructure: themeSuccess && theme.FeeStructure.FeeStructurePage.component && theme.FeeStructure.FeeStructurePage.component === "Defaultine_FeeStructurePage" ? "Defaultine_FeeStructurePage" : "Vespertine_FeeStructurePage",
        services: themeSuccess && theme.Facility.FacilityPage.component && theme.Facility.FacilityPage.component === "Defaultine_FacilityPage" ? "Defaultine_FacilityPage" : "Vespertine_FacilityPage",
        announcements: themeSuccess && theme.Announcement.AnnouncementPage.component && theme.Announcement.AnnouncementPage.component === "Defaultine_AnnouncementsPage" ? "Defaultine_AnnouncementsPage" : "Vespertine_AnnouncementsPage",
        vacancy: themeSuccess && theme.Vacancy.VacancyPage.component && theme.Vacancy.VacancyPage.component === "Defaultine_VacancyPage" ? "Defaultine_VacancyPage" : "Vespertine_VacancyPage",
        faqs: themeSuccess && theme.Faqs.FaqsPage.component && theme.Faqs.FaqsPage.component === "Defaultine_FaqsPage" ? "Defaultine_FaqsPage" : "Vespertine_FaqsPage",
        contact: themeSuccess && theme.Contact.ContactPage.component && theme.Contact.ContactPage.component === "Defaultine_ContactPage" ? "Defaultine_ContactPage" : "Vespertine_ContactPage",
        gallery: themeSuccess && theme.Gallery.GalleryPage.component && theme.Gallery.GalleryPage.component === "Defaultine_GalleryPage" ? "Defaultine_GalleryPage" : "Vespertine_GalleryPage"
      }
      if (theme.themeGlobal.component === "Defaultine_Body") {
        let theme = {
          Header: {
            component: "Defaultine_Header",
            Background: themeGlobal.headerThemeColor.Background,
            Logo: {
              Width: themeGlobal.headerThemeUtilities.Logo.Width,
              Height: themeGlobal.headerThemeUtilities.Logo.Height,
            },
            h4: {
              FontSize: themeGlobal.headerThemeTypo.h4.FontSize,
              FontWeight: themeGlobal.headerThemeTypo.h4.FontWeight,
              LineHeight: themeGlobal.headerThemeTypo.h4.LineHeight,
              FontFamily: themeGlobal.headerThemeTypo.h4.FontFamily,
              FontStyle: themeGlobal.headerThemeTypo.h4.FontStyle,
              LetterSpacing: themeGlobal.headerThemeTypo.h4.LetterSpacing,
              Color: themeGlobal.headerThemeColor.h4.Color,
              TextTransform: themeGlobal.headerThemeUtilities.h4.TextTransform,
              TextAlignment: themeGlobal.headerThemeUtilities.h4.TextAlignment,
            },
            h5: {
              FontSize: themeGlobal.headerThemeTypo.h5.FontSize,
              FontWeight: themeGlobal.headerThemeTypo.h5.FontWeight,
              LineHeight: themeGlobal.headerThemeTypo.h5.LineHeight,
              FontFamily: themeGlobal.headerThemeTypo.h5.FontFamily,
              FontStyle: themeGlobal.headerThemeTypo.h5.FontStyle,
              LetterSpacing: themeGlobal.headerThemeTypo.h5.LetterSpacing,
              Color: themeGlobal.headerThemeColor.h5.Color,
              TextTransform: themeGlobal.headerThemeUtilities.h5.TextTransform,
              TextAlignment: themeGlobal.headerThemeUtilities.h5.TextAlignment,
            },
            NavAuth: {
              ButtonLogin: {
                FontSize: themeGlobal.headerThemeTypo.Button.FontSize,
                FontWeight: themeGlobal.headerThemeTypo.Button.FontWeight,
                LineHeight: themeGlobal.headerThemeTypo.Button.LineHeight,
                FontFamily: themeGlobal.headerThemeTypo.Button.FontFamily,
                FontStyle: themeGlobal.headerThemeTypo.Button.FontStyle,
                LetterSpacing: themeGlobal.headerThemeTypo.Button.LetterSpacing,
                PaddingY: themeGlobal.headerThemeUtilities.Button.PaddingY,
                PaddingX: themeGlobal.headerThemeUtilities.Button.PaddingX,
                Background: themeGlobal.headerThemeColor.ButtonLogin.Background,
                BorderColor: themeGlobal.headerThemeColor.ButtonLogin.BorderColor,
                BorderRadius: themeGlobal.headerThemeUtilities.Button.BorderRadius,
                Color: themeGlobal.headerThemeColor.ButtonLogin.Color,
                Hover: {
                  Background: themeGlobal.headerThemeColor.ButtonLogin.Hover.Background,
                  Color: themeGlobal.headerThemeColor.ButtonLogin.Hover.Color,
                  BorderColor: themeGlobal.headerThemeColor.ButtonLogin.Hover.BorderColor,
                },
                Active: {
                  Background: themeGlobal.headerThemeColor.ButtonLogin.Active.Background,
                  Color: themeGlobal.headerThemeColor.ButtonLogin.Active.Color,
                  BorderColor: themeGlobal.headerThemeColor.ButtonLogin.Active.BorderColor,
                }
              },
              ButtonSignup: {
                FontSize: themeGlobal.headerThemeTypo.Button.FontSize,
                FontWeight: themeGlobal.headerThemeTypo.Button.FontWeight,
                LineHeight: themeGlobal.headerThemeTypo.Button.LineHeight,
                FontFamily: themeGlobal.headerThemeTypo.Button.FontFamily,
                FontStyle: themeGlobal.headerThemeTypo.Button.FontStyle,
                LetterSpacing: themeGlobal.headerThemeTypo.Button.LetterSpacing,
                PaddingY: themeGlobal.headerThemeUtilities.Button.PaddingY,
                PaddingX: themeGlobal.headerThemeUtilities.Button.PaddingX,
                Background: themeGlobal.headerThemeColor.ButtonSignup.Background,
                BorderColor: themeGlobal.headerThemeColor.ButtonSignup.BorderColor,
                BorderRadius: themeGlobal.headerThemeUtilities.Button.BorderRadius,
                Color: themeGlobal.headerThemeColor.ButtonSignup.Color,
                Hover: {
                  Background: themeGlobal.headerThemeColor.ButtonSignup.Hover.Background,
                  Color: themeGlobal.headerThemeColor.ButtonSignup.Hover.Color,
                  BorderColor: themeGlobal.headerThemeColor.ButtonSignup.Hover.BorderColor,
                },
                Active: {
                  Background: themeGlobal.headerThemeColor.ButtonSignup.Active.Background,
                  Color: themeGlobal.headerThemeColor.ButtonSignup.Active.Color,
                  BorderColor: themeGlobal.headerThemeColor.ButtonSignup.Active.BorderColor,
                }
              }
            },
            NavMenuWrapper: {
              Background: themeGlobal.headerThemeColor.NavMenu.Background,
              NavMenuCustom: {
                MenuGap: themeGlobal.headerThemeUtilities.NavMenu.MenuGap,
                FontSize: themeGlobal.headerThemeTypo.NavMenu.FontSize,
                FontWeight: themeGlobal.headerThemeTypo.NavMenu.FontWeight,
                LineHeight: themeGlobal.headerThemeTypo.NavMenu.LineHeight,
                FontFamily: themeGlobal.headerThemeTypo.NavMenu.FontFamily,
                FontStyle: themeGlobal.headerThemeTypo.NavMenu.FontStyle,
                LetterSpacing: themeGlobal.headerThemeTypo.NavMenu.LetterSpacing,
                Color: themeGlobal.headerThemeColor.NavMenu.Color,
                Hover: {
                  Color: themeGlobal.headerThemeColor.NavMenu.Hover.Color,
                },
                Active: {
                  Color: themeGlobal.headerThemeColor.NavMenu.Active.Color,
                  FontWeight: themeGlobal.headerThemeTypo.NavMenu.Active.FontWeight,
                },
                NavMenuScrollIcon: {
                  BorderColor: themeGlobal.headerThemeColor.NavMenu.ScrollIcon.Color,
                  Hover: {
                    BorderColor: themeGlobal.headerThemeColor.NavMenu.ScrollIcon.Hover.Color,
                  }
                }
              }
            }
          },
          Footer: {
            component: 'Defaultine_Footer',
            Background: themeGlobal.footerThemeColor.Background,
            h4: {
              FontWeight: themeGlobal.footerThemeTypo.h4.FontWeight,
              FontSize: themeGlobal.footerThemeTypo.h4.FontSize,
              LineHeight: themeGlobal.footerThemeTypo.h4.LineHeight,
              FontFamily: themeGlobal.footerThemeTypo.h4.FontFamily,
              FontStyle: themeGlobal.footerThemeTypo.h4.FontStyle,
              LetterSpacing: themeGlobal.footerThemeTypo.h4.LetterSpacing,
              Color: themeGlobal.footerThemeColor.h4.Color,
              TextTransform: themeGlobal.footerThemeUtilities.h4.TextTransform,
              TextAlignment: themeGlobal.footerThemeUtilities.h4.TextAlignment,
            },
            h5: {
              FontWeight: themeGlobal.footerThemeTypo.h5.FontWeight,
              FontSize: themeGlobal.footerThemeTypo.h5.FontSize,
              LineHeight: themeGlobal.footerThemeTypo.h5.LineHeight,
              FontFamily: themeGlobal.footerThemeTypo.h5.FontFamily,
              FontStyle: themeGlobal.footerThemeTypo.h5.FontStyle,
              LetterSpacing: themeGlobal.footerThemeTypo.h5.LetterSpacing,
              Color: themeGlobal.footerThemeColor.h5.Color,
              TextTransform: themeGlobal.footerThemeUtilities.h5.TextTransform,
              TextAlignment: themeGlobal.footerThemeUtilities.h5.TextAlignment,
            },
            h6: {
              FontWeight: themeGlobal.footerThemeTypo.h6.FontWeight,
              FontSize: themeGlobal.footerThemeTypo.h6.FontSize,
              LineHeight: themeGlobal.footerThemeTypo.h6.LineHeight,
              FontFamily: themeGlobal.footerThemeTypo.h6.FontFamily,
              FontStyle: themeGlobal.footerThemeTypo.h6.FontStyle,
              LetterSpacing: themeGlobal.footerThemeTypo.h6.LetterSpacing,
              Color: themeGlobal.footerThemeColor.h6.Color,
              TextTransform: themeGlobal.footerThemeUtilities.h6.TextTransform,
              TextAlignment: themeGlobal.footerThemeUtilities.h6.TextAlignment,
            },
            li: {
              FontWeight: themeGlobal.footerThemeTypo.li.FontWeight,
              FontSize: themeGlobal.footerThemeTypo.li.FontSize,
              LineHeight: themeGlobal.footerThemeTypo.li.LineHeight,
              FontFamily: themeGlobal.footerThemeTypo.li.FontFamily,
              FontStyle: themeGlobal.footerThemeTypo.li.FontStyle,
              LetterSpacing: themeGlobal.footerThemeTypo.li.LetterSpacing,
              Color: themeGlobal.footerThemeColor.li.Color,
              TextTransform: themeGlobal.footerThemeUtilities.li.TextTransform,
              TextAlignment: themeGlobal.footerThemeUtilities.li.TextAlignment,
            },
            a: {
              FontWeight: themeGlobal.footerThemeTypo.a.FontWeight,
              FontSize: themeGlobal.footerThemeTypo.a.FontSize,
              LineHeight: themeGlobal.footerThemeTypo.a.LineHeight,
              FontFamily: themeGlobal.footerThemeTypo.a.FontFamily,
              FontStyle: themeGlobal.footerThemeTypo.a.FontStyle,
              LetterSpacing: themeGlobal.footerThemeTypo.a.LetterSpacing,
              Color: themeGlobal.footerThemeColor.a.Color,
              TextTransform: themeGlobal.footerThemeUtilities.a.TextTransform,
              TextAlignment: themeGlobal.footerThemeUtilities.a.TextAlignment,
              Hover: {
                Color: themeGlobal.footerThemeColor.a.Hover.Color,
              }
            },
            MapContainer: {
              Height: themeGlobal.footerThemeUtilities.Map.Height,
            },
            SocialMediaIconListItem: {
              Width: themeGlobal.footerThemeUtilities.SocialMediaIcon.Width,
              Height: themeGlobal.footerThemeUtilities.SocialMediaIcon.Height,
            },
            CopyrightSectionItem: {
              FontWeight: themeGlobal.footerThemeTypo.Copyright.FontWeight,
              FontSize: themeGlobal.footerThemeTypo.Copyright.FontSize,
              LineHeight: themeGlobal.footerThemeTypo.Copyright.LineHeight,
              FontFamily: themeGlobal.footerThemeTypo.Copyright.FontFamily,
              FontStyle: themeGlobal.footerThemeTypo.Copyright.FontStyle,
              LetterSpacing: themeGlobal.footerThemeTypo.Copyright.LetterSpacing,
              Color: themeGlobal.footerThemeColor.Copyright.Color,
            }
          },
          Banner: {
            Background: `rgba(255, 255, 255, 0.5)`,
            a: {
              FontWeight: themeGlobal.typography.anchor.FontWeight,
              FontSize: themeGlobal.typography.anchor.FontSize,
              LineHeight: themeGlobal.typography.anchor.LineHeight,
              FontFamily: themeGlobal.typography.anchor.FontFamily,
              FontStyle: themeGlobal.typography.anchor.FontStyle,
              LetterSpacing: themeGlobal.typography.anchor.LetterSpacing,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: `#343F64`,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.typography.LinkColor,
              PaddingY: `10px`,
              PaddingX: `40px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: `#343F64`,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            h1: {
              FontWeight: themeGlobal.typography.h1.FontWeight,
              FontSize: themeGlobal.typography.h1.FontSize,
              LineHeight: themeGlobal.typography.h1.LineHeight,
              FontFamily: themeGlobal.typography.h1.FontFamily,
              FontStyle: themeGlobal.typography.h1.FontStyle,
              LetterSpacing: themeGlobal.typography.h1.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: `400`,
              FontSize: `12px`,
              LineHeight: `18px`,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            Dots: {
              Color: `rgba(32, 32, 32, 0.5)`,
              Active: {
                Color: `rgba(38, 51, 93, 0.8)`,
              }
            },
            SliderImage: {
              Height: `480px`,
            },
            SlickArrowColor: {
              Color: `#fff`,
              Hover: {
                Color: `#E9DB89`,
              }
            },
            BannerOverlay: {
              Top: `auto`,
              Bottom: `0`,
              Right: `139px`,
              Left: `auto`,
              width: `388px`,
              Background: `rgba(255, 255, 255, 0.8)`,
              Padding: `16px`,
              BorderRadius: `0`,
            },
          },
          AboutUs: {
            AboutUsHero: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                Alignment: `center`,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
                Alignment: `center`,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.Color,
                Alignment: `center`,
              },
              SectionHead: {
                MarginBottom: `20px`,
                Alignment: `center`,
              },
              SectionGrid: {
                Background: `#EBECF0`,
              },
              BorderBottom: {
                BorderWidth: `2px`,
                Background: `#343F64`,
                BottomSpace: `-8px`,
              },
              ViewMoreButton: {
                FontWeight: `500`,
                FontSize: `inherit`,
                LineHeight: `inherit`,
                BorderColor: `transparent`,
                BorderRadius: `0`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `0`,
                PaddingX: `0`,
                TextDecoration: `underline`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: `transparent`,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              ViewMoreSection: {
                MarginTop: `32px`,
              }
            },
            AboutUsPage: {
              component: dynamic.aboutus,
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Color: `rgba(38, 51, 93, 0.8)`,
                Alignment: `center`,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
                Alignment: `center`,
              },
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.headerThemeTypo.h4.FontFamily,
                FontStyle: themeGlobal.headerThemeTypo.h4.FontStyle,
                LetterSpacing: themeGlobal.headerThemeTypo.h4.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                Alignment: `center`,
              },
              h5: {
                FontWeight: themeGlobal.typography.h5.FontWeight,
                FontSize: themeGlobal.typography.h5.FontSize,
                LineHeight: themeGlobal.typography.h5.LineHeight,
                FontFamily: themeGlobal.headerThemeTypo.h5.FontFamily,
                FontStyle: themeGlobal.headerThemeTypo.h5.FontStyle,
                LetterSpacing: themeGlobal.headerThemeTypo.h5.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
                Alignment: `center`,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: `#202020`,
                Alignment: `center`,
              },
              SectionHead: {
                MarginBottom: `20px`,
                Alignment: `center`,
              },
              SectionGrid: {
                Background: `#EBECF0`,
              },
              BorderBottom: {
                BorderWidth: `2px`,
                Background: `#343F64`,
                BottomSpace: `-8px`,
              },
              MessageProfileImage: {
                Width: `160px`,
                Height: `160px`,
                BorderRadius: `50%`,
                MarginBottom: `24px`,
              },
              Dots: {
                Color: `rgba(32, 32, 32, 0.5)`,
                Active: {
                  Color: `rgba(38, 51, 93, 0.8)`,
                }
              },
              SlickArrowColor: {
                Color: `rgba(38, 51, 93, 0.8)`,
                Hover: {
                  Color: `rgba(38, 51, 93, 0.8)`,
                }
              },
              MissionSection: {
                Background: themeGlobal.color.alphaLight,
                BorderRadius: `20px`,
                MissionHead: {
                  MarginBottom: `40px`,
                  Alignment: `center`,
                }
              },
              VisionSection: {
                Background: themeGlobal.color.alphaLight,
                BorderRadius: `20px`,
                VisionHead: {
                  MarginBottom: `40px`,
                  Alignment: `center`,
                }
              }
            },
          },
          // Notice: {
          //   NoticeBoardHero: {
          //     a: {
          //       FontWeight: themeGlobal.typography.anchor.FontWeight,
          //       FontSize: themeGlobal.typography.anchor.FontSize,
          //       LineHeight: themeGlobal.typography.anchor.LineHeight,
          //       FontFamily: themeGlobal.typography.anchor.FontFamily,
          //       FontStyle: themeGlobal.typography.anchor.FontStyle,
          //       LetterSpacing: themeGlobal.typography.anchor.LetterSpacing,
          //       Color: themeGlobal.bodyThemeColor.typography.LinkColor,
          //       Hover: {
          //         Color: themeGlobal.bodyThemeColor.typography.Hover.LinkColor,
          //       }
          //     },
          //     PaddingY: `16px`,
          //     ContentBox: {
          //       width: `100%`,
          //     },
          //   },
          // },
          Principal: {
            PrincipalHero: {
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.headerThemeTypo.h4.FontFamily,
                FontStyle: themeGlobal.headerThemeTypo.h4.FontStyle,
                LetterSpacing: themeGlobal.headerThemeTypo.h4.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h5: {
                FontWeight: themeGlobal.typography.h5.FontWeight,
                FontSize: themeGlobal.typography.h5.FontSize,
                LineHeight: themeGlobal.typography.h5.LineHeight,
                FontFamily: themeGlobal.headerThemeTypo.h5.FontFamily,
                FontStyle: themeGlobal.headerThemeTypo.h5.FontStyle,
                LetterSpacing: themeGlobal.headerThemeTypo.h5.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: `#343F64`,
                PaddingTop: `24px`,
              },

              ViewMoreMessageButton: {
                FontWeight: `500`,
                FontSize: `inherit`,
                LineHeight: `inherit`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: `transparent`,
                BorderRadius: `0`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `0`,
                PaddingX: `0`,
                TextDecoration: `underline`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: `transparent`,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              PrincipalProfileImage: {
                Width: `160px`,
                Height: `160px`,
                BorderRadius: `50%`,
                MarginBottom: `24px`,
              },
              Dots: {
                Color: `rgba(32, 32, 32, 0.5)`,
                Active: {
                  Color: `rgba(38, 51, 93, 0.8)`,
                }
              },
              SlickArrowColor: {
                Color: `rgba(38, 51, 93, 0.8)`,
                Hover: {
                  Color: `rgba(38, 51, 93, 0.8)`,
                }
              },
            }
          },
          Team: {
            TeamHero: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `left`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.typography.h4.FontFamily,
                FontStyle: themeGlobal.typography.h4.FontStyle,
                LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                MarginBottom: `10px`,
              },
              h5: {
                FontWeight: themeGlobal.typography.h5.FontWeight,
                FontSize: themeGlobal.typography.h5.FontSize,
                LineHeight: themeGlobal.typography.h5.LineHeight,
                FontFamily: themeGlobal.typography.h5.FontFamily,
                FontStyle: themeGlobal.typography.h5.FontStyle,
                LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              TeamAlbumHomeCard: {
                BorderWidth: `0`,
                BorderColor: `transparent`,
                BorderRadius: `8px`,
                Height: `381px`,
                Background: `rgba(38, 51, 93, 0.05)`,
                Padding: `54px`,
                TeamAlbumHomeCardOverlay: {
                  PaddingY: `0`,
                  PaddingX: `0`,
                  PrimaryBorderBottom: {
                    Height: `1px`,
                    Background: `transparent`,
                    Bottom: `-5px`,
                  },
                }
              },
              ViewMoreTeamButton: {
                FontWeight: `500`,
                FontSize: `15px`,
                LineHeight: `22px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: `rgba(38, 51, 93, 0.8)`,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `8px`,
                PaddingX: `32px`,
                MarginTop: `48px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: `transparent`,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              }
            },
            TeamPage: {
              component: dynamic.team,
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.typography.h4.FontFamily,
                FontStyle: themeGlobal.typography.h4.FontStyle,
                LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                MarginBottom: `10px`,
              },
              h5: {
                FontWeight: themeGlobal.typography.h5.FontWeight,
                FontSize: themeGlobal.typography.h5.FontSize,
                LineHeight: themeGlobal.typography.h5.LineHeight,
                FontFamily: themeGlobal.typography.h5.FontFamily,
                FontStyle: themeGlobal.typography.h5.FontStyle,
                LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              TeamAlbumCard: {
                BorderWidth: `0`,
                BorderColor: `transparent`,
                BorderRadius: `8px`,
                Height: `381px`,
                Background: `rgba(38, 51, 93, 0.05)`,
                Padding: `54px`,
                TeamAlbumCardOverlay: {
                  PaddingY: `0`,
                  PaddingX: `0`,
                  PrimaryBorderBottom: {
                    Height: `1px`,
                    Background: `transparent`,
                    Bottom: `-5px`,
                  },
                }
              },
            },
          },
          Facility: {
            FacilitiesHero: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `left`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.typography.h4.FontFamily,
                FontStyle: themeGlobal.typography.h4.FontStyle,
                LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: `rgba(32, 32, 32, 0.6)`,
              },
              ViewMoreFacilitiesButton: {
                FontWeight: `500`,
                FontSize: `15px`,
                LineHeight: `22px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: `rgba(38, 51, 93, 0.8)`,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `8px`,
                PaddingX: `32px`,
                MarginTop: `48px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: `transparent`,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              FacilitiesSliderDescription: {
                Padding: `14px`,
                Background: `#fff`,
                BorderBottom: {
                  Height: `2px`,
                  Background: `transparent`,
                  BottomSpace: `-10px`,
                },
              },
            },
            FacilityPage: {
              component: dynamic.services,
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `left`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.typography.h4.FontFamily,
                FontStyle: themeGlobal.typography.h4.FontStyle,
                LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: `rgba(32, 32, 32, 0.6)`,
              },
              FacilitiesDescription: {
                Padding: `14px`,
                Background: `#fff`,
                BorderBottom: {
                  Height: `2px`,
                  Background: `transparent`,
                  BottomSpace: `-10px`,
                },
              },
            },
          },
          Gallery: {
            GalleryHero: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `left`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              h6: {
                FontWeight: themeGlobal.typography.h6.FontWeight,
                FontSize: themeGlobal.typography.h6.FontSize,
                LineHeight: themeGlobal.typography.h6.LineHeight,
                FontFamily: themeGlobal.typography.h6.FontFamily,
                FontStyle: themeGlobal.typography.h6.FontStyle,
                LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              ViewMoreGalleryButton: {
                FontWeight: `500`,
                FontSize: `15px`,
                LineHeight: `22px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: `rgba(38, 51, 93, 0.8)`,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `8px`,
                PaddingX: `32px`,
                MarginTop: `48px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: `transparent`,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              GalleryCaption: {
                Background: `rgba(9, 51, 81, 0.6)`,
              }
            },
            GalleryPage: {
              component: dynamic.gallery,
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `left`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              h6: {
                FontWeight: themeGlobal.typography.h6.FontWeight,
                FontSize: themeGlobal.typography.h6.FontSize,
                LineHeight: themeGlobal.typography.h6.LineHeight,
                FontFamily: themeGlobal.typography.h6.FontFamily,
                FontStyle: themeGlobal.typography.h6.FontStyle,
                LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              GalleryCaption: {
                Background: `rgba(9, 51, 81, 0.6)`,
              }
            },
            GalleryListSection: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.typography.h4.FontFamily,
                FontStyle: themeGlobal.typography.h4.FontStyle,
                LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              GalleryListFilter: {
                MarginBottom: `40px`,
              },
              GalleryListFilterButton: {
                FontWeight: `500`,
                FontSize: `15px`,
                LineHeight: `18px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: `#343F64`,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `8px`,
                PaddingX: `24px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: `#343F64`,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                },
                Active: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: `#343F64`,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              }
            },
          },
          Contact: {
            ContactHero: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: `#202020`,
                MarginBottom: `10px`,
              },
              ContactHomeHeroAddress: {
                AddressIcon: {
                  Background: `rgba(38, 51, 93, 0.8)`
                },
                PhoneIcon: {
                  Background: `rgba(38, 51, 93, 0.8)`
                },
                MailIcon: {
                  Background: `rgba(38, 51, 93, 0.8)`
                }
              },
              ContactHomeHeroForm: {
                PlaceHolder: {
                  FontWeight: `400`,
                  FontSize: `14px`,
                  LineHeight: `21px`,
                  TextDecoration: `underline`,
                  Color: `rgba(32, 32, 32, 0.6)`,
                },
                Input: {
                  BorderColor: `rgba(55, 125, 239, 0.2)`,
                  Color: `#343F64`,
                  FontWeight: `400`,
                  FontSize: `14px`,
                  LineHeight: `21px`,
                },
                SubmitButton: {
                  FontWeight: `400`,
                  FontSize: `18px`,
                  LineHeight: `24px`,
                  Background: themeGlobal.bodyThemeColor.Button.Background,
                  BorderColor: `rgba(38, 51, 93, 0.8)`,
                  BorderRadius: `4px`,
                  Color: themeGlobal.bodyThemeColor.Button.Color,
                  PaddingY: `10px`,
                  PaddingX: `40px`,
                  Hover: {
                    Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                    BorderColor: `rgba(38, 51, 93, 0.8)`,
                    Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                  }
                }
              }
            },
            ContactPage: {
              component: dynamic.contact,
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
                BorderBottom: {
                  BorderWidth: `2px`,
                  Background: `#4E616B`,
                  BottomSpace: `-8px`,
                }
              },
              h6: {
                FontWeight: themeGlobal.typography.h6.FontWeight,
                FontSize: themeGlobal.typography.h6.FontSize,
                LineHeight: themeGlobal.typography.h6.LineHeight,
                FontFamily: themeGlobal.typography.h6.FontFamily,
                FontStyle: themeGlobal.typography.h6.FontStyle,
                LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              a: {
                FontWeight: themeGlobal.typography.anchor.FontWeight,
                FontSize: themeGlobal.typography.anchor.FontSize,
                LineHeight: themeGlobal.typography.anchor.LineHeight,
                FontFamily: themeGlobal.typography.anchor.FontFamily,
                FontStyle: themeGlobal.typography.anchor.FontStyle,
                LetterSpacing: themeGlobal.typography.anchor.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.LinkColor,
                Hover: {
                  Color: themeGlobal.bodyThemeColor.typography.Hover.LinkColor,
                }
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: `#343F64`,
              },
              ContactHead: {
                MarginBottom: `40px`,
                Alignment: `left`,
              },
              AddressIcon: {
                Background: `#343F64`
              },
              PhoneIcon: {
                Background: `#343F64`
              },
              MailIcon: {
                Background: `#343F64`
              }
            },
          },
          Admission: {
            AdmissionHero: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `left`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.typography.h4.FontFamily,
                FontStyle: themeGlobal.typography.h4.FontStyle,
                LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: `rgba(32, 32, 32, 0.6)`,
              },
              AdmissionHomeHeroHead: {
                Alignment: `left`,
              },
              AdmissionItem: {
                Background: `#FFFFFF`,
              },
              AdmissionItemCaption: {
                Padding: `14px`,
              },
              ApplyNowButton: {
                FontWeight: `600`,
                FontSize: `14px`,
                LineHeight: `20px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: `rgba(38, 51, 93, 0.8)`,
                BorderRadius: `24px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `8px`,
                PaddingX: `16px`,
                MarginTop: `10px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: `transparent`,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              ViewMoreAdmissionHeroButton: {
                FontWeight: `500`,
                FontSize: `15px`,
                LineHeight: `22px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: `rgba(38, 51, 93, 0.8)`,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `8px`,
                PaddingX: `32px`,
                MarginTop: `48px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: `transparent`,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              ViewMoreAdmissionHeroSection: {
                Alignment: `center`
              }
            },
            AdmissionPage: {
              component: dynamic.admission,
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `left`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.typography.h4.FontFamily,
                FontStyle: themeGlobal.typography.h4.FontStyle,
                LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: `rgba(32, 32, 32, 0.6)`,
              },
              AdmissionHead: {
                Alignment: `left`,
              },
              AdmissionItem: {
                Background: `#FFFFFF`,
              },
              AdmissionItemCaption: {
                Padding: `14px`,
              },
              ApplyNowButton: {
                FontWeight: `600`,
                FontSize: `14px`,
                LineHeight: `20px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: `rgba(38, 51, 93, 0.8)`,
                BorderRadius: `24px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `8px`,
                PaddingX: `16px`,
                MarginTop: `10px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: `transparent`,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              }
            },
          },
          FeeStructure: {
            FeeStructureHero: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `left`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              h6: {
                FontWeight: themeGlobal.typography.h6.FontWeight,
                FontSize: themeGlobal.typography.h6.FontSize,
                LineHeight: themeGlobal.typography.h6.LineHeight,
                FontFamily: themeGlobal.typography.h6.FontFamily,
                FontStyle: themeGlobal.typography.h6.FontStyle,
                LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: `rgba(32, 32, 32, 0.6)`,
              },
              FeeStructureHeroHead: {
                MarginBottom: `24px`,
                Alignment: `left`,
              },
              ViewFeeButton: {
                FontWeight: `400`,
                FontSize: `14px`,
                LineHeight: `21px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: `transparent`,
                BorderRadius: `0`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `0`,
                PaddingX: `0`,
                MarginTop: `8px`,
                TextDecoration: `underline`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: `transparent`,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              ViewMoreFeeStructureHeroButton: {
                FontWeight: `500`,
                FontSize: `15px`,
                LineHeight: `22px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: `rgba(38, 51, 93, 0.8)`,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `8px`,
                PaddingX: `32px`,
                MarginTop: `48px`,
                TextDecoration: `normal`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: `transparent`,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              ViewMoreFeeStructureHeroSection: {
                Alignment: `left`
              }
            },
            FeeStructurePage: {
              component: dynamic.feestructure,
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `left`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              h6: {
                FontWeight: themeGlobal.typography.h6.FontWeight,
                FontSize: themeGlobal.typography.h6.FontSize,
                LineHeight: themeGlobal.typography.h6.LineHeight,
                FontFamily: themeGlobal.typography.h6.FontFamily,
                FontStyle: themeGlobal.typography.h6.FontStyle,
                LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: `rgba(32, 32, 32, 0.6)`,
              },
              FeeStructurePageHead: {
                MarginBottom: `24px`,
                Alignment: `left`,
              },
              ViewFeeButton: {
                FontWeight: `400`,
                FontSize: `14px`,
                LineHeight: `21px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: `transparent`,
                BorderRadius: `0`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `0`,
                PaddingX: `0`,
                MarginTop: `8px`,
                TextDecoration: `underline`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: `transparent`,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
            },
          },
          Notice: {
            NoticeBoardHero: {
              a: {
                FontWeight: themeGlobal.typography.anchor.FontWeight,
                FontSize: themeGlobal.typography.anchor.FontSize,
                LineHeight: themeGlobal.typography.anchor.LineHeight,
                FontFamily: themeGlobal.typography.anchor.FontFamily,
                FontStyle: themeGlobal.typography.anchor.FontStyle,
                LetterSpacing: themeGlobal.typography.anchor.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.LinkColor,
                Hover: {
                  Color: themeGlobal.bodyThemeColor.typography.Hover.LinkColor,
                }
              },
              PaddingY: `16px`,
              ContentBox: {
                width: `100%`,
              },
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `left`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.typography.h4.FontFamily,
                FontStyle: themeGlobal.typography.h4.FontStyle,
                LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h6: {
                FontWeight: themeGlobal.typography.h6.FontWeight,
                FontSize: themeGlobal.typography.h6.FontSize,
                LineHeight: themeGlobal.typography.h6.LineHeight,
                FontFamily: themeGlobal.typography.h6.FontFamily,
                FontStyle: themeGlobal.typography.h6.FontStyle,
                LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: `rgba(32, 32, 32, 0.6)`,
              },
              MiscellaneousHeroHead: {
                Alignment: `left`,
              },
              MiscellaneousHeroGrid: {
                Background: `rgba(9, 51, 81, 0.1)`,
                PaddingY: `36px`,
                PaddingX: `102px`,
              },
              MiscellaneousItem: {
                Background: `#fff`,
                Padding: `20px`,
              },
              DownloadButton: {
                FontWeight: `400`,
                FontSize: `14px`,
                LineHeight: `21px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: `transparent`,
                BorderRadius: `0`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `0`,
                PaddingX: `0`,
                MarginTop: `8px`,
                TextDecoration: `underline`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: `transparent`,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              ViewMoreMiscellaneousHeroButton: {
                FontWeight: `500`,
                FontSize: `15px`,
                LineHeight: `22px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: `rgba(38, 51, 93, 0.8)`,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `8px`,
                PaddingX: `32px`,
                MarginTop: `48px`,
                TextDecoration: `normal`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: `transparent`,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              ViewMoreMiscellaneousHeroSection: {
                Alignment: `center`
              }
            },
          },
          Testimonial: {
            TestimonialHero: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `left`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.typography.h4.FontFamily,
                FontStyle: themeGlobal.typography.h4.FontStyle,
                LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h5: {
                FontWeight: themeGlobal.typography.h5.FontWeight,
                FontSize: themeGlobal.typography.h5.FontSize,
                LineHeight: themeGlobal.typography.h5.LineHeight,
                FontFamily: themeGlobal.typography.h5.FontFamily,
                FontStyle: themeGlobal.typography.h5.FontStyle,
                LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              h6: {
                FontWeight: themeGlobal.typography.h6.FontWeight,
                FontSize: themeGlobal.typography.h6.FontSize,
                LineHeight: themeGlobal.typography.h6.LineHeight,
                FontFamily: themeGlobal.typography.h6.FontFamily,
                FontStyle: themeGlobal.typography.h6.FontStyle,
                LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: `rgba(32, 32, 32, 0.6)`,
              },
              TestimonialHeroHead: {
                Alignment: `left`,
              },
              TestimonialHeroGrid: {
                Background: `rgba(9, 51, 81, 0.1)`,
                PaddingY: `36px`,
                PaddingX: `102px`,
              },
              TestimonialItem: {
                Background: `#fff`,
                Padding: `20px`,
              },
              ViewMoreTestimonialHeroButton: {
                FontWeight: `500`,
                FontSize: `15px`,
                LineHeight: `22px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: `rgba(38, 51, 93, 0.8)`,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `8px`,
                PaddingX: `32px`,
                MarginTop: `48px`,
                TextDecoration: `normal`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: `transparent`,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              ViewMoreTestimonialHeroSection: {
                Alignment: `center`
              },

              Dots: {
                Color: `rgba(32, 32, 32, 0.5)`,
                Active: {
                  Color: `rgba(38, 51, 93, 0.8)`,
                }
              },
              SlickArrowColor: {
                Color: `rgba(38, 51, 93, 0.8)`,
                Hover: {
                  Color: `rgba(38, 51, 93, 0.8)`,
                }
              },
            },
          },
          Faqs: {
            FaqsHero: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h6: {
                FontWeight: themeGlobal.typography.h6.FontWeight,
                FontSize: themeGlobal.typography.h6.FontSize,
                LineHeight: themeGlobal.typography.h6.LineHeight,
                FontFamily: themeGlobal.typography.h6.FontFamily,
                FontStyle: themeGlobal.typography.h6.FontStyle,
                LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: `#343F64`,
              },

              FaqsHomeHeroHead: {
                MarginBottom: `40px`,
                Alignment: `center`,
              },
              FaqListItem: {
                BorderColor: `#4E616B`,
              },
              ViewMoreFaqsHeroButton: {
                FontWeight: `400`,
                FontSize: `18px`,
                LineHeight: `24px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: `#343F64`,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `10px`,
                PaddingX: `40px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: `#343F64`,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              ViewMoreFaqsHeroSection: {
                Alignment: `left`,
                MarginTop: `32px`,
              }
            },
            FaqsPage: {
              component: dynamic.faqs,
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
                TextDecoration: `underline`,
              },
              h6: {
                FontWeight: themeGlobal.typography.h6.FontWeight,
                FontSize: themeGlobal.typography.h6.FontSize,
                LineHeight: themeGlobal.typography.h6.LineHeight,
                FontFamily: themeGlobal.typography.h6.FontFamily,
                FontStyle: themeGlobal.typography.h6.FontStyle,
                LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: `#4E616B`,
              },

              FaqsHead: {
                MarginBottom: `40px`,
                Alignment: `center`,
              },
              FaqListItem: {
                BorderColor: `rgba(52, 63, 100, 0.1)`,
              },
            },
          },
          Vacancy: {
            VacancyHero: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `left`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.typography.h4.FontFamily,
                FontStyle: themeGlobal.typography.h4.FontStyle,
                LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: `rgba(32, 32, 32, 0.6)`,
              },
              VacancyHeroHead: {
                Alignment: `left`,
              },
              VacancyItem: {
                Background: `#FFFFFF`,
              },
              VacancyItemCaption: {
                PaddingY: `18px`,
                PaddingX: `14px`,
              },
              ApplyNowButton: {
                FontWeight: `600`,
                FontSize: `14px`,
                LineHeight: `20px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: `rgba(38, 51, 93, 0.8)`,
                BorderRadius: `24px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `8px`,
                PaddingX: `16px`,
                MarginTop: `10px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: `transparent`,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              ViewMoreVacancyHeroButton: {
                FontWeight: `500`,
                FontSize: `15px`,
                LineHeight: `22px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: `rgba(38, 51, 93, 0.8)`,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `8px`,
                PaddingX: `32px`,
                MarginTop: `48px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: `transparent`,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              ViewMoreVacancyHeroSection: {
                Alignment: `center`
              }
            },
            VacancyPage: {
              component: dynamic.vacancy,
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `left`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.typography.h4.FontFamily,
                FontStyle: themeGlobal.typography.h4.FontStyle,
                LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: `rgba(32, 32, 32, 0.6)`,
              },
              VacancyHeroHead: {
                Alignment: `center`,
              },
              VacancyItem: {
                Background: `#FFFFFF`,
              },
              VacancyItemCaption: {
                PaddingY: `18px`,
                PaddingX: `14px`,
              },
              ApplyNowButton: {
                FontWeight: `600`,
                FontSize: `14px`,
                LineHeight: `20px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: `rgba(38, 51, 93, 0.8)`,
                BorderRadius: `24px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `8px`,
                PaddingX: `16px`,
                MarginTop: `10px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: `transparent`,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              ViewMoreVacancyHeroButton: {
                FontWeight: `500`,
                FontSize: `15px`,
                LineHeight: `22px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: `rgba(38, 51, 93, 0.8)`,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `8px`,
                PaddingX: `32px`,
                MarginTop: `48px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: `transparent`,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              ViewMoreVacancyHeroSection: {
                Alignment: `center`
              }
            },
          },
          Announcement: {
            AnnouncementHero: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `left`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              h6: {
                FontWeight: themeGlobal.typography.h6.FontWeight,
                FontSize: themeGlobal.typography.h6.FontSize,
                LineHeight: themeGlobal.typography.h6.LineHeight,
                FontFamily: themeGlobal.typography.h6.FontFamily,
                FontStyle: themeGlobal.typography.h6.FontStyle,
                LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
                Alignment: `left`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              ViewMoreAnnouncementButton: {
                FontWeight: `500`,
                FontSize: `15px`,
                LineHeight: `22px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: `rgba(38, 51, 93, 0.8)`,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `8px`,
                PaddingX: `32px`,
                MarginTop: `48px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: `transparent`,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              AnnouncementCaption: {
                Background: `rgba(0, 0, 0, 0.5)`,
              }
            },
            AnnouncementPage: {
              component: dynamic.announcements,
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `left`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              h6: {
                FontWeight: themeGlobal.typography.h6.FontWeight,
                FontSize: themeGlobal.typography.h6.FontSize,
                LineHeight: themeGlobal.typography.h6.LineHeight,
                FontFamily: themeGlobal.typography.h6.FontFamily,
                FontStyle: themeGlobal.typography.h6.FontStyle,
                LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
                Alignment: `left`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              AnnouncementCaption: {
                Background: `rgba(0, 0, 0, 0.5)`,
              }
            },
          },
          Global: {
            Modal: {
              ModalCloseWtc: {
                Color: themeGlobal.color.alpha,
                Hover: {
                  Color: themeGlobal.color.beta,
                }
              },
              ModalHeadWtc: {
                h2: {
                  FontWeight: themeGlobal.typography.h2.FontWeight,
                  FontSize: themeGlobal.typography.h2.FontSize,
                  LineHeight: themeGlobal.typography.h2.LineHeight,
                  FontFamily: themeGlobal.typography.h2.FontFamily,
                  FontStyle: themeGlobal.typography.h2.FontStyle,
                  LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                  Alignment: `left`,
                },
                h3: {
                  FontWeight: themeGlobal.typography.h3.FontWeight,
                  FontSize: themeGlobal.typography.h3.FontSize,
                  LineHeight: themeGlobal.typography.h3.LineHeight,
                  FontFamily: themeGlobal.typography.h3.FontFamily,
                  FontStyle: themeGlobal.typography.h3.FontStyle,
                  LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
                  Alignment: `left`,
                }
              },
              ModalBodyWTC: {
                h2: {
                  FontWeight: themeGlobal.typography.h2.FontWeight,
                  FontSize: themeGlobal.typography.h2.FontSize,
                  LineHeight: themeGlobal.typography.h2.LineHeight,
                  FontFamily: themeGlobal.typography.h2.FontFamily,
                  FontStyle: themeGlobal.typography.h2.FontStyle,
                  LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                  Alignment: `left`,
                },
                h3: {
                  FontWeight: themeGlobal.typography.h3.FontWeight,
                  FontSize: themeGlobal.typography.h3.FontSize,
                  LineHeight: themeGlobal.typography.h3.LineHeight,
                  FontFamily: themeGlobal.typography.h3.FontFamily,
                  FontStyle: themeGlobal.typography.h3.FontStyle,
                  LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
                  Alignment: `left`,
                },
                p: {
                  FontWeight: themeGlobal.typography.regular.FontWeight,
                  FontSize: themeGlobal.typography.regular.FontSize,
                  LineHeight: themeGlobal.typography.regular.LineHeight,
                  FontFamily: themeGlobal.typography.regular.FontFamily,
                  FontStyle: themeGlobal.typography.regular.FontStyle,
                  LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                  Color: themeGlobal.color.alphaSemiLight,
                  Alignment: `left`,
                }
              }
            },
            scrollbar: {
              scrollbarWidth: '10px',
              scrollbarTrackBackground: '#000',
              scrollbarThumbBorderRadius: '0',
              scrollbarThumbBackground: themeGlobal.color.alpha,
              scrollbarThumbBackgroundHover: themeGlobal.color.beta,
            },
            body: {
              bodyBackground: themeGlobal.bodyThemeColor.Background,
              bodyFont: `'Poppins', sans - serif`,
              bodyFontSize: '16px',
              bodyFontWeight: '600',
              bodyColor: '#8B417D',
              bodyLetterSpacing: 'normal',
            },
            container: {
              containerMaxWidth: '1140px',
            }
          },
        }
        if (editTheme) {
          let themes = {
            ...theme, themeGlobal: themeGlobal
          }
          dispatch(editWebsiteTemplateTheme({
            ...themes, themes: themes, industry: user.user_business_type, theme_Name: themeName, owner: user._id,
            institute: user.user_institute, template: themeGlobalData._id, theme: themeData.themeData._id, primaryColor: headerData.navMenuBackground,
            secondaryColor: headerData.navMenuHoverColor,
            tertiaryColor: bodyData.websiteBackground
          }))
        } else {
          dispatch(createWebsiteTemplateUserTheme({
            ...theme, themeGlobal: themeGlobal, themeCategory: user.user_business_type, theme_Name: themeName, owner: user._id,
            institute: user.user_institute, template: themeGlobalData._id, primaryColor: headerData.navMenuBackground,
            secondaryColor: headerData.navMenuHoverColor,
            tertiaryColor: bodyData.websiteBackground
          }))
        }
      } else {

        let theme = {
          Header: {
            component: dynamic.header,
            Background: themeGlobal.headerThemeColor.Background,
            Logo: {
              Width: themeGlobal.headerThemeUtilities.Logo.Width,
              Height: themeGlobal.headerThemeUtilities.Logo.Height,
            },
            h4: {
              FontSize: themeGlobal.headerThemeTypo.h4.FontSize,
              FontWeight: themeGlobal.headerThemeTypo.h4.FontWeight,
              LineHeight: themeGlobal.headerThemeTypo.h4.LineHeight,
              FontFamily: themeGlobal.headerThemeTypo.h4.FontFamily,
              FontStyle: themeGlobal.headerThemeTypo.h4.FontStyle,
              LetterSpacing: themeGlobal.headerThemeTypo.h4.LetterSpacing,
              Color: themeGlobal.headerThemeColor.h4.Color,
              TextTransform: themeGlobal.headerThemeUtilities.h4.TextTransform,
              TextAlignment: themeGlobal.headerThemeUtilities.h4.TextAlignment,
            },
            h5: {
              FontSize: themeGlobal.headerThemeTypo.h5.FontSize,
              FontWeight: themeGlobal.headerThemeTypo.h5.FontWeight,
              LineHeight: themeGlobal.headerThemeTypo.h5.LineHeight,
              FontFamily: themeGlobal.headerThemeTypo.h5.FontFamily,
              FontStyle: themeGlobal.headerThemeTypo.h5.FontStyle,
              LetterSpacing: themeGlobal.headerThemeTypo.h5.LetterSpacing,
              Color: themeGlobal.headerThemeColor.h5.Color,
              TextTransform: themeGlobal.headerThemeUtilities.h5.TextTransform,
              TextAlignment: themeGlobal.headerThemeUtilities.h5.TextAlignment,
            },
            NavAuth: {
              ButtonLogin: {
                FontSize: themeGlobal.headerThemeTypo.Button.FontSize,
                FontWeight: themeGlobal.headerThemeTypo.Button.FontWeight,
                LineHeight: themeGlobal.headerThemeTypo.Button.LineHeight,
                FontFamily: themeGlobal.headerThemeTypo.Button.FontFamily,
                FontStyle: themeGlobal.headerThemeTypo.Button.FontStyle,
                LetterSpacing: themeGlobal.headerThemeTypo.Button.LetterSpacing,
                PaddingY: themeGlobal.headerThemeUtilities.Button.PaddingY,
                PaddingX: themeGlobal.headerThemeUtilities.Button.PaddingX,
                Background: themeGlobal.headerThemeColor.ButtonLogin.Background,
                BorderColor: themeGlobal.headerThemeColor.ButtonLogin.BorderColor,
                BorderRadius: themeGlobal.headerThemeUtilities.Button.BorderRadius,
                Color: themeGlobal.headerThemeColor.ButtonLogin.Color,
                Hover: {
                  Background: themeGlobal.headerThemeColor.ButtonLogin.Hover.Background,
                  Color: themeGlobal.headerThemeColor.ButtonLogin.Hover.Color,
                  BorderColor: themeGlobal.headerThemeColor.ButtonLogin.Hover.BorderColor,
                },
                Active: {
                  Background: themeGlobal.headerThemeColor.ButtonLogin.Active.Background,
                  Color: themeGlobal.headerThemeColor.ButtonLogin.Active.Color,
                  BorderColor: themeGlobal.headerThemeColor.ButtonLogin.Active.BorderColor,
                }
              },
              ButtonSignup: {
                FontSize: themeGlobal.headerThemeTypo.Button.FontSize,
                FontWeight: themeGlobal.headerThemeTypo.Button.FontWeight,
                LineHeight: themeGlobal.headerThemeTypo.Button.LineHeight,
                FontFamily: themeGlobal.headerThemeTypo.Button.FontFamily,
                FontStyle: themeGlobal.headerThemeTypo.Button.FontStyle,
                LetterSpacing: themeGlobal.headerThemeTypo.Button.LetterSpacing,
                PaddingY: themeGlobal.headerThemeUtilities.Button.PaddingY,
                PaddingX: themeGlobal.headerThemeUtilities.Button.PaddingX,
                Background: themeGlobal.headerThemeColor.ButtonSignup.Background,
                BorderColor: themeGlobal.headerThemeColor.ButtonSignup.BorderColor,
                BorderRadius: themeGlobal.headerThemeUtilities.Button.BorderRadius,
                Color: themeGlobal.headerThemeColor.ButtonSignup.Color,
                Hover: {
                  Background: themeGlobal.headerThemeColor.ButtonSignup.Hover.Background,
                  Color: themeGlobal.headerThemeColor.ButtonSignup.Hover.Color,
                  BorderColor: themeGlobal.headerThemeColor.ButtonSignup.Hover.BorderColor,
                },
                Active: {
                  Background: themeGlobal.headerThemeColor.ButtonSignup.Active.Background,
                  Color: themeGlobal.headerThemeColor.ButtonSignup.Active.Color,
                  BorderColor: themeGlobal.headerThemeColor.ButtonSignup.Active.BorderColor,
                }
              }
            },
            NavMenuWrapper: {
              Background: themeGlobal.headerThemeColor.NavMenu.Background,
              NavMenuCustom: {
                MenuGap: themeGlobal.headerThemeUtilities.NavMenu.MenuGap,
                FontSize: themeGlobal.headerThemeTypo.NavMenu.FontSize,
                FontWeight: themeGlobal.headerThemeTypo.NavMenu.FontWeight,
                LineHeight: themeGlobal.headerThemeTypo.NavMenu.LineHeight,
                FontFamily: themeGlobal.headerThemeTypo.NavMenu.FontFamily,
                FontStyle: themeGlobal.headerThemeTypo.NavMenu.FontStyle,
                LetterSpacing: themeGlobal.headerThemeTypo.NavMenu.LetterSpacing,
                Color: themeGlobal.headerThemeColor.NavMenu.Color,
                Hover: {
                  Color: themeGlobal.headerThemeColor.NavMenu.Hover.Color,
                },
                NavMenuScrollIcon: {
                  BorderColor: themeGlobal.headerThemeColor.NavMenu.ScrollIcon.Color,
                  Hover: {
                    BorderColor: themeGlobal.headerThemeColor.NavMenu.ScrollIcon.Hover.Color,
                  }
                }
              }
            }
          },
          Footer: {
            component: dynamic.footer,
            Background: themeGlobal.footerThemeColor.Background,
            Logo: {
              Background: themeGlobal.footerThemeColor.Logo.Background,
              Width: themeGlobal.footerThemeUtilities.Logo.Width,
              Height: themeGlobal.footerThemeUtilities.Logo.Height,
              BorderRadius: themeGlobal.footerThemeUtilities.Logo.BorderRadius,
              PaddingX: themeGlobal.footerThemeUtilities.Logo.PaddingX,
              PaddingY: themeGlobal.footerThemeUtilities.Logo.PaddingY,
            },
            h4: {
              FontWeight: themeGlobal.footerThemeTypo.h4.FontWeight,
              FontSize: themeGlobal.footerThemeTypo.h4.FontSize,
              LineHeight: themeGlobal.footerThemeTypo.h4.LineHeight,
              FontFamily: themeGlobal.footerThemeTypo.h4.FontFamily,
              FontStyle: themeGlobal.footerThemeTypo.h4.FontStyle,
              LetterSpacing: themeGlobal.footerThemeTypo.h4.LetterSpacing,
              Color: themeGlobal.footerThemeColor.h4.Color,
              TextTransform: themeGlobal.footerThemeUtilities.h4.TextTransform,
              TextAlignment: themeGlobal.footerThemeUtilities.h4.TextAlignment,
            },
            h5: {
              FontWeight: themeGlobal.footerThemeTypo.h5.FontWeight,
              FontSize: themeGlobal.footerThemeTypo.h5.FontSize,
              LineHeight: themeGlobal.footerThemeTypo.h5.LineHeight,
              FontFamily: themeGlobal.footerThemeTypo.h5.FontFamily,
              FontStyle: themeGlobal.footerThemeTypo.h5.FontStyle,
              LetterSpacing: themeGlobal.footerThemeTypo.h5.LetterSpacing,
              Color: themeGlobal.footerThemeColor.h5.Color,
              TextTransform: themeGlobal.footerThemeUtilities.h5.TextTransform,
              TextAlignment: themeGlobal.footerThemeUtilities.h5.TextAlignment,
            },
            h6: {
              FontWeight: themeGlobal.footerThemeTypo.h6.FontWeight,
              FontSize: themeGlobal.footerThemeTypo.h6.FontSize,
              LineHeight: themeGlobal.footerThemeTypo.h6.LineHeight,
              FontFamily: themeGlobal.footerThemeTypo.h6.FontFamily,
              FontStyle: themeGlobal.footerThemeTypo.h6.FontStyle,
              LetterSpacing: themeGlobal.footerThemeTypo.h6.LetterSpacing,
              Color: themeGlobal.footerThemeColor.h6.Color,
              TextTransform: themeGlobal.footerThemeUtilities.h6.TextTransform,
              TextAlignment: themeGlobal.footerThemeUtilities.h6.TextAlignment,
            },
            a: {
              FontWeight: themeGlobal.footerThemeTypo.a.FontWeight,
              FontSize: themeGlobal.footerThemeTypo.a.FontSize,
              LineHeight: themeGlobal.footerThemeTypo.a.LineHeight,
              FontFamily: themeGlobal.footerThemeTypo.a.FontFamily,
              FontStyle: themeGlobal.footerThemeTypo.a.FontStyle,
              LetterSpacing: themeGlobal.footerThemeTypo.a.LetterSpacing,
              Color: themeGlobal.footerThemeColor.a.Color,
              TextTransform: themeGlobal.footerThemeUtilities.a.TextTransform,
              TextAlignment: themeGlobal.footerThemeUtilities.a.TextAlignment,
              Hover: {
                Color: themeGlobal.footerThemeColor.a.Hover.Color,
              }
            },
            MapContainer: {
              Height: themeGlobal.footerThemeUtilities.Map.Height,
            },
            SocialMediaIconListItem: {
              Width: themeGlobal.footerThemeUtilities.SocialMediaIcon.Width,
              Height: themeGlobal.footerThemeUtilities.SocialMediaIcon.Height,
            },
            CopyrightSectionItem: {
              FontWeight: themeGlobal.footerThemeTypo.Copyright.FontWeight,
              FontSize: themeGlobal.footerThemeTypo.Copyright.FontSize,
              LineHeight: themeGlobal.footerThemeTypo.Copyright.LineHeight,
              FontFamily: themeGlobal.footerThemeTypo.Copyright.FontFamily,
              FontStyle: themeGlobal.footerThemeTypo.Copyright.FontStyle,
              LetterSpacing: themeGlobal.footerThemeTypo.Copyright.LetterSpacing,
              Color: themeGlobal.footerThemeColor.Copyright.Color,
            }
          },
          Banner: {
            Background: themeGlobal.color.base,
            a: {
              FontWeight: themeGlobal.typography.anchor.FontWeight,
              FontSize: themeGlobal.typography.anchor.FontSize,
              LineHeight: themeGlobal.typography.anchor.LineHeight,
              FontFamily: themeGlobal.typography.anchor.FontFamily,
              FontStyle: themeGlobal.typography.anchor.FontStyle,
              LetterSpacing: themeGlobal.typography.anchor.LetterSpacing,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: themeGlobal.color.alpha,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `10px`,
              PaddingX: `40px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            h1: {
              FontWeight: themeGlobal.typography.h1.FontWeight,
              FontSize: themeGlobal.typography.h1.FontSize,
              LineHeight: themeGlobal.typography.h1.LineHeight,
              FontFamily: themeGlobal.typography.h1.FontFamily,
              FontStyle: themeGlobal.typography.h1.FontStyle,
              LetterSpacing: themeGlobal.typography.h1.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            Dots: {
              Color: themeGlobal.color.alpha,
              Active: {
                Color: themeGlobal.color.universal,
              }
            },
            SliderImage: {
              Height: `576px`,
            },
            SlickArrowColor: {
              Color: themeGlobal.color.universal,
              Hover: {
                Color: themeGlobal.color.beta,
              }
            },
            BannerOverlay: {
              Top: `171px`,
              width: `510px`,
              Background: themeGlobal.color.alphaLight,
              Padding: `36px`,
              BorderRadius: `0`,
            },
          },
          AboutUs: {
            AboutUsHero: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                Alignment: `center`,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
                Alignment: `center`,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.Color,
                Alignment: `center`,
              },
              SectionHead: {
                MarginBottom: `40px`,
                Alignment: `center`,
              },
              BorderBottom: {
                BorderWidth: `2px`,
                Background: themeGlobal.color.alpha,
                BottomSpace: `-8px`,
              },
              ViewMoreButton: {
                FontWeight: `400`,
                FontSize: `18px`,
                LineHeight: `24px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: themeGlobal.color.alpha,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `10px`,
                PaddingX: `40px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              ViewMoreSection: {
                MarginTop: `32px`,
              }
            },
            AboutUsPage: {
              component: dynamic.aboutus,
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,

              },
              BorderBottom: {
                BorderWidth: `2px`,
                Background: themeGlobal.color.alpha,
                BottomSpace: `-8px`,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.Color,
              },

              SectionHead: {
                MarginBottom: `40px`,
                Alignment: `center`,
                h3: {
                  BorderBottom: {
                    BorderWidth: `2px`,
                    Background: themeGlobal.color.alpha,
                    BottomSpace: `-8px`,
                  },
                }
              },
              AboutSection: {
                Background: themeGlobal.color.alphaLight,
              },
              MessageDeskSection: {
                h2: {
                  FontWeight: themeGlobal.typography.h2.FontWeight,
                  FontSize: themeGlobal.typography.h2.FontSize,
                  LineHeight: themeGlobal.typography.h2.LineHeight,
                  FontFamily: themeGlobal.typography.h2.FontFamily,
                  FontStyle: themeGlobal.typography.h2.FontStyle,
                  LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                },
                h3: {
                  FontWeight: themeGlobal.typography.h3.FontWeight,
                  FontSize: themeGlobal.typography.h3.FontSize,
                  LineHeight: themeGlobal.typography.h3.LineHeight,
                  FontFamily: themeGlobal.typography.h3.FontFamily,
                  FontStyle: themeGlobal.typography.h3.FontStyle,
                  LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
                  BorderBottom: {
                    BorderWidth: `2px`,
                    Background: themeGlobal.color.alpha,
                    BottomSpace: `-8px`,
                  }
                },
                h4: {
                  FontWeight: themeGlobal.typography.h4.FontWeight,
                  FontSize: themeGlobal.typography.h4.FontSize,
                  LineHeight: themeGlobal.typography.h4.LineHeight,
                  FontFamily: themeGlobal.typography.h4.FontFamily,
                  FontStyle: themeGlobal.typography.h4.FontStyle,
                  LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                },
                h5: {
                  FontWeight: themeGlobal.typography.h5.FontWeight,
                  FontSize: themeGlobal.typography.h5.FontSize,
                  LineHeight: themeGlobal.typography.h5.LineHeight,
                  FontFamily: themeGlobal.typography.h5.FontFamily,
                  FontStyle: themeGlobal.typography.h5.FontStyle,
                  LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
                },
                p: {
                  FontWeight: themeGlobal.typography.regular.FontWeight,
                  FontSize: themeGlobal.typography.regular.FontSize,
                  LineHeight: themeGlobal.typography.regular.LineHeight,
                  FontFamily: themeGlobal.typography.regular.FontFamily,
                  FontStyle: themeGlobal.typography.regular.FontStyle,
                  LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.Color,
                },
                MessageDeskSectionHead: {
                  MarginBottom: `40px`,
                  Alignment: `center`,
                  h3: {
                    BorderBottom: {
                      BorderWidth: `2px`,
                      Background: themeGlobal.color.alpha,
                      BottomSpace: `-8px`,
                    },
                  }
                },
                MessageDeskProfileImage: {
                  Width: `447px`,
                  Height: `495px`,
                  BorderRadius: `20px`,
                },
              },
              MissionSection: {
                Background: themeGlobal.color.alphaLight,
                BorderRadius: `20px`,
                h2: {
                  FontWeight: themeGlobal.typography.h2.FontWeight,
                  FontSize: themeGlobal.typography.h2.FontSize,
                  LineHeight: themeGlobal.typography.h2.LineHeight,
                  FontFamily: themeGlobal.typography.h2.FontFamily,
                  FontStyle: themeGlobal.typography.h2.FontStyle,
                  LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                  Alignment: `center`,
                },
                h3: {
                  FontWeight: themeGlobal.typography.h3.FontWeight,
                  FontSize: themeGlobal.typography.h3.FontSize,
                  LineHeight: themeGlobal.typography.h3.LineHeight,
                  FontFamily: themeGlobal.typography.h3.FontFamily,
                  FontStyle: themeGlobal.typography.h3.FontStyle,
                  LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                  Alignment: `center`,
                },
                p: {
                  FontWeight: themeGlobal.typography.regular.FontWeight,
                  FontSize: themeGlobal.typography.regular.FontSize,
                  LineHeight: themeGlobal.typography.regular.LineHeight,
                  FontFamily: themeGlobal.typography.regular.FontFamily,
                  FontStyle: themeGlobal.typography.regular.FontStyle,
                  LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.Color,
                  Alignment: `center`,
                },
                MissionHead: {
                  MarginBottom: `40px`,
                  Alignment: `center`,
                  h3: {
                    BorderBottom: {
                      BorderWidth: `2px`,
                      Background: themeGlobal.color.alpha,
                      BottomSpace: `-8px`,
                    },
                  }
                }
              },
              VisionSection: {
                Background: themeGlobal.color.alphaLight,
                BorderRadius: `20px`,
                h2: {
                  FontWeight: themeGlobal.typography.h2.FontWeight,
                  FontSize: themeGlobal.typography.h2.FontSize,
                  LineHeight: themeGlobal.typography.h2.LineHeight,
                  FontFamily: themeGlobal.typography.h2.FontFamily,
                  FontStyle: themeGlobal.typography.h2.FontStyle,
                  LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                  Alignment: `center`,
                },
                h3: {
                  FontWeight: themeGlobal.typography.h3.FontWeight,
                  FontSize: themeGlobal.typography.h3.FontSize,
                  LineHeight: themeGlobal.typography.h3.LineHeight,
                  FontFamily: themeGlobal.typography.h3.FontFamily,
                  FontStyle: themeGlobal.typography.h3.FontStyle,
                  LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                  Alignment: `center`,
                },
                p: {
                  FontWeight: themeGlobal.typography.regular.FontWeight,
                  FontSize: themeGlobal.typography.regular.FontSize,
                  LineHeight: themeGlobal.typography.regular.LineHeight,
                  FontFamily: themeGlobal.typography.regular.FontFamily,
                  FontStyle: themeGlobal.typography.regular.FontStyle,
                  LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.Color,
                  Alignment: `center`,
                },
                VisionHead: {
                  MarginBottom: `40px`,
                  Alignment: `center`,
                  h3: {
                    BorderBottom: {
                      BorderWidth: `2px`,
                      Background: themeGlobal.color.alpha,
                      BottomSpace: `-8px`,
                    },
                  }
                }
              }

            },
          },
          Notice: {
            NoticeBoardHero: {
              a: {
                FontWeight: themeGlobal.typography.anchor.FontWeight,
                FontSize: themeGlobal.typography.anchor.FontSize,
                LineHeight: themeGlobal.typography.anchor.LineHeight,
                FontFamily: themeGlobal.typography.anchor.FontFamily,
                FontStyle: themeGlobal.typography.anchor.FontStyle,
                LetterSpacing: themeGlobal.typography.anchor.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.LinkColor,
                Hover: {
                  Color: themeGlobal.bodyThemeColor.typography.Hover.LinkColor ? themeGlobal.bodyThemeColor.typography.Hover.LinkColor : "",
                }
              },
              PaddingY: `16px`,
              ContentBox: {
                width: `100%`,
              },
            },
          },
          Principal: {
            PrincipalHero: {
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.typography.h4.FontFamily,
                FontStyle: themeGlobal.typography.h4.FontStyle,
                LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h5: {
                FontWeight: themeGlobal.typography.h5.FontWeight,
                FontSize: themeGlobal.typography.h5.FontSize,
                LineHeight: themeGlobal.typography.h5.LineHeight,
                FontFamily: themeGlobal.typography.h5.FontFamily,
                FontStyle: themeGlobal.typography.h5.FontStyle,
                LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.Color,
                PaddingTop: `24px`,
              },
              PrincipalProfileImage: {
                Width: `450px`,
                Height: `500px`,
                BorderRadius: `20px`,
              },
              ViewMoreMessageButton: {
                FontWeight: `400`,
                FontSize: `18px`,
                LineHeight: `24px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: themeGlobal.color.alpha,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `10px`,
                PaddingX: `40px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              ViewMoreButtonSection: {
                MarginTop: `48px`,
              }
            }
          },
          Team: {
            TeamHero: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.typography.h4.FontFamily,
                FontStyle: themeGlobal.typography.h4.FontStyle,
                LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                MarginBottom: `10px`,
              },
              BorderBottom: {
                BorderWidth: `2px`,
                Background: themeGlobal.color.alpha,
                BottomSpace: `-8px`,
              },
              h5: {
                FontWeight: themeGlobal.typography.h5.FontWeight,
                FontSize: themeGlobal.typography.h5.FontSize,
                LineHeight: themeGlobal.typography.h5.LineHeight,
                FontFamily: themeGlobal.typography.h5.FontFamily,
                FontStyle: themeGlobal.typography.h5.FontStyle,
                LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              TeamAlbumHomeCard: {
                BorderWidth: `2px`,
                BorderColor: themeGlobal.color.alpha,
                BorderRadius: `24px`,
                Height: `381px`,
                TeamAlbumHomeCardOverlay: {
                  PaddingY: `10px`,
                  PaddingX: `32px`,
                  PrimaryBorderBottom: {
                    Height: `1px`,
                    Background: themeGlobal.color.alpha,
                    Bottom: `-5px`,
                    MarginY: "4px"
                  },
                }
              },
              ViewMoreTeamButton: {
                FontWeight: `400`,
                FontSize: `18px`,
                LineHeight: `24px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: themeGlobal.color.alpha,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `10px`,
                PaddingX: `40px`,
                MarginTop: `48px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              TeamAlbumHomeHeroHead: {
                MarginBottom: '48px',
                Alignment: 'center',
                h3: {
                  BorderBottom: {
                    BorderWidth: `2px`,
                    Background: themeGlobal.color.alpha,
                    BottomSpace: `-8px`,
                  },
                }
              }
            },
            TeamPage: {
              component: dynamic.team,
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              BorderBottom: {
                BorderWidth: `2px`,
                Background: themeGlobal.color.alpha,
                BottomSpace: `-8px`,
              },
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.typography.h4.FontFamily,
                FontStyle: themeGlobal.typography.h4.FontStyle,
                LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                MarginBottom: `10px`,
              },
              h5: {
                FontWeight: themeGlobal.typography.h5.FontWeight,
                FontSize: themeGlobal.typography.h5.FontSize,
                LineHeight: themeGlobal.typography.h5.LineHeight,
                FontFamily: themeGlobal.typography.h5.FontFamily,
                FontStyle: themeGlobal.typography.h5.FontStyle,
                LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              TeamAlbumCard: {
                BorderWidth: `2px`,
                BorderColor: themeGlobal.color.alpha,
                BorderRadius: `24px`,
                Height: `381px`,
                TeamAlbumCardOverlay: {
                  PaddingY: `10px`,
                  PaddingX: `32px`,
                  PrimaryBorderBottom: {
                    Height: `1px`,
                    Background: themeGlobal.color.alpha,
                    Bottom: `-5px`,
                  },
                }
              },
            },
          },
          Facility: {
            FacilitiesHero: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              BorderBottom: {
                BorderWidth: `2px`,
                Background: themeGlobal.color.alpha,
                BottomSpace: `-8px`,
              },
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.typography.h4.FontFamily,
                FontStyle: themeGlobal.typography.h4.FontStyle,
                LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.Color,
                MarginTop: `20px`,
              },
              ViewMoreFacilitiesButton: {
                FontWeight: `400`,
                FontSize: `18px`,
                LineHeight: `24px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: themeGlobal.color.alpha,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `10px`,
                PaddingX: `40px`,
                MarginTop: `48px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              SlickArrowColor: {
                Color: themeGlobal.color.alphaSemiLight,
                Hover: {
                  Color: themeGlobal.color.alpha,
                }
              },
              FacilitiesSliderDescription: {
                Padding: `24px`,
                Background: `rgba(32,
                32,
                32,
                0.1)`,
                BorderBottom: {
                  Height: `2px`,
                  Background: themeGlobal.color.alphaSemiLight,
                  BottomSpace: `-10px`,
                },
              },
            },
            FacilityPage: {
              component: dynamic.services,
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              BorderBottom: {
                BorderWidth: `2px`,
                Background: themeGlobal.color.alpha,
                BottomSpace: `-8px`,
              },
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.typography.h4.FontFamily,
                FontStyle: themeGlobal.typography.h4.FontStyle,
                LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                Alignment: `left`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              li: {
                FontWeight: `400`,
                FontSize: `16px`,
                LineHeight: `28px`,
                Alignment: `left`,
                Color: themeGlobal.bodyThemeColor.typography.Color,
              },
              FacilityListItemImage: {
                Width: `320px`,
                Height: `374px`,
                BorderTopLeftRadius: `25px`,
                BorderBottomLeftRadius: `25px`,
              },
              FacilityListItemContent: {
                Padding: `32px`,
                Background: themeGlobal.color.alphaLight,
                BorderTopRightRadius: `25px`,
                BorderBottomRightRadius: `25px`,
                BorderBottom: {
                  Height: `2px`,
                  Background: themeGlobal.color.alphaSemiLight,
                },
              }
            },
          },
          Gallery: {
            GalleryHero: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              BorderBottom: {
                BorderWidth: `2px`,
                Background: themeGlobal.color.alpha,
                BottomSpace: `-8px`,
              },
              ViewMoreGalleryButton: {
                FontWeight: `400`,
                FontSize: `18px`,
                LineHeight: `24px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: themeGlobal.color.alpha,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `10px`,
                PaddingX: `40px`,
                MarginTop: `48px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              }
            },
            GalleryPage: {
              component: dynamic.gallery,
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              BorderBottom: {
                BorderWidth: `2px`,
                Background: themeGlobal.color.alpha,
                BottomSpace: `-8px`,
              },
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.typography.h4.FontFamily,
                FontStyle: themeGlobal.typography.h4.FontStyle,
                LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              }
            },
            GalleryListSection: {
              component: dynamic.gallery,
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.typography.h4.FontFamily,
                FontStyle: themeGlobal.typography.h4.FontStyle,
                LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              BorderBottom: {
                BorderWidth: `2px`,
                Background: themeGlobal.color.alpha,
                BottomSpace: `-8px`,
              },
              GalleryListFilter: {
                MarginBottom: `40px`,
              },
              GalleryListFilterButton: {
                FontWeight: `500`,
                FontSize: `15px`,
                LineHeight: `18px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: themeGlobal.color.alpha,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `8px`,
                PaddingX: `24px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                },
                Active: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              }
            },
          },
          Contact: {
            ContactHero: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.Color,
                MarginBottom: `10px`,
              },
              ContactHomeHeroAddress: {
                AddressIcon: {
                  Background: themeGlobal.color.alpha
                },
                PhoneIcon: {
                  Background: themeGlobal.color.alpha
                },
                MailIcon: {
                  Background: themeGlobal.color.alpha
                }
              },
              ContactHomeHeroForm: {
                PlaceHolder: {
                  FontWeight: `400`,
                  FontSize: `14px`,
                  LineHeight: `21px`,
                  TextDecoration: `underline`,
                  Color: themeGlobal.color.baseSemiLight,
                },
                Input: {
                  BorderColor: themeGlobal.color.alphaSemiLight,
                  Color: themeGlobal.color.alpha,
                  FontWeight: `400`,
                  FontSize: `14px`,
                  LineHeight: `21px`,
                },
                SubmitButton: {
                  FontWeight: `400`,
                  FontSize: `18px`,
                  LineHeight: `24px`,
                  Background: themeGlobal.bodyThemeColor.Button.Background,
                  BorderColor: themeGlobal.color.alpha,
                  BorderRadius: `4px`,
                  Color: themeGlobal.bodyThemeColor.Button.Color,
                  PaddingY: `10px`,
                  PaddingX: `40px`,
                  Hover: {
                    Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                    BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                    Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                  }
                }
              }
            },
            ContactPage: {
              component: dynamic.contact,
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
                Alignment: `center`,
                BorderBottom: {
                  BorderWidth: `2px`,
                  Background: themeGlobal.color.alphaSemiLight,
                  BottomSpace: `-8px`,
                }
              },
              BorderBottom: {
                BorderWidth: `2px`,
                Background: themeGlobal.color.alphaSemiLight,
                BottomSpace: `-8px`,
              },
              h6: {
                FontWeight: themeGlobal.typography.h6.FontWeight,
                FontSize: themeGlobal.typography.h6.FontSize,
                LineHeight: themeGlobal.typography.h6.LineHeight,
                FontFamily: themeGlobal.typography.h6.FontFamily,
                FontStyle: themeGlobal.typography.h6.FontStyle,
                LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              a: {
                FontWeight: themeGlobal.typography.anchor.FontWeight,
                FontSize: themeGlobal.typography.anchor.FontSize,
                LineHeight: themeGlobal.typography.anchor.LineHeight,
                FontFamily: themeGlobal.typography.anchor.FontFamily,
                FontStyle: themeGlobal.typography.anchor.FontStyle,
                LetterSpacing: themeGlobal.typography.anchor.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.LinkColor,
                Hover: {
                  Color: themeGlobal.bodyThemeColor.typography.Hover.LinkColor,
                }
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.Color,
              },
              ContactHead: {
                MarginBottom: `40px`,
                Alignment: `left`,
              },
              AddressIcon: {
                Background: themeGlobal.color.alpha
              },
              PhoneIcon: {
                Background: themeGlobal.color.alpha
              },
              MailIcon: {
                Background: themeGlobal.color.alpha
              }
            },
          },
          Admission: {
            AdmissionHero: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              },
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.typography.h4.FontFamily,
                FontStyle: themeGlobal.typography.h4.FontStyle,
                LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              BorderBottom: {
                BorderWidth: `2px`,
                Background: themeGlobal.color.alpha,
                BottomSpace: `-8px`,
              },
              h5: {
                FontWeight: themeGlobal.typography.h5.FontWeight,
                FontSize: themeGlobal.typography.h5.FontSize,
                LineHeight: themeGlobal.typography.h5.LineHeight,
                FontFamily: themeGlobal.typography.h5.FontFamily,
                FontStyle: themeGlobal.typography.h5.FontStyle,
                LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
                Alignment: `left`,
                MarginY: `10px`,
                MarginX: `0`,
              },
              AdmissionHomeHeroHead: {
                MarginBottom: `40px`,
                Alignment: `left`,
              },
              ViewMoreAdmissionHeroButton: {
                FontWeight: `400`,
                FontSize: `18px`,
                LineHeight: `24px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: themeGlobal.color.alpha,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `10px`,
                PaddingX: `40px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              ViewMoreAdmissionHeroSection: {
                Alignment: `left`
              }
            },
            AdmissionPage: {
              component: dynamic.admission,
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              BorderBottom: {
                BorderWidth: `2px`,
                Background: themeGlobal.color.alpha,
                BottomSpace: `-8px`,
              },
              h6: {
                FontWeight: themeGlobal.typography.h6.FontWeight,
                FontSize: themeGlobal.typography.h6.FontSize,
                LineHeight: themeGlobal.typography.h6.LineHeight,
                FontFamily: themeGlobal.typography.h6.FontFamily,
                FontStyle: themeGlobal.typography.h6.FontStyle,
                LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.Color,
              },
              AdmissionHead: {
                MarginBottom: `40px`,
                Alignment: `center`,
              },
              AdmissionListItem: {
                BorderColor: themeGlobal.color.alphaSemiLight,
              },
              OverlayDownloadButton: {
                FontWeight: `400`,
                FontSize: `15px`,
                LineHeight: `18px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: themeGlobal.color.beta,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `10px`,
                PaddingX: `40px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              OverlayViewButton: {
                FontWeight: `400`,
                FontSize: `15px`,
                LineHeight: `18px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: themeGlobal.color.alphaLight,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `10px`,
                PaddingX: `40px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              ViewDetailAdmissionModalBody: {
                h6: {
                  FontWeight: themeGlobal.typography.h6.FontWeight,
                  FontSize: themeGlobal.typography.h6.FontSize,
                  LineHeight: themeGlobal.typography.h6.LineHeight,
                  FontFamily: themeGlobal.typography.h6.FontFamily,
                  FontStyle: themeGlobal.typography.h6.FontStyle,
                  LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                  Alignment: "left"
                },
                p: {
                  FontWeight: themeGlobal.typography.regular.FontWeight,
                  FontSize: themeGlobal.typography.regular.FontSize,
                  LineHeight: themeGlobal.typography.regular.LineHeight,
                  FontFamily: themeGlobal.typography.regular.FontFamily,
                  FontStyle: themeGlobal.typography.regular.FontStyle,
                  LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.Color,
                  Alignment: "left"
                },
                ApplyNowButton: {
                  FontWeight: `500`,
                  FontSize: `14px`,
                  LineHeight: `24px`,
                  Background: themeGlobal.bodyThemeColor.Button.Background,
                  BorderColor: themeGlobal.color.alpha,
                  BorderRadius: `4px`,
                  Color: themeGlobal.bodyThemeColor.Button.Color,
                  PaddingY: `6px`,
                  PaddingX: `24px`,
                  Alignment: "center",
                  LetterSpacing: "0.2px",
                  Hover: {
                    Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                    BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                    Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                  }
                },
                DownloadFeeStructureButton: {
                  FontWeight: `500`,
                  FontSize: `14px`,
                  LineHeight: `24px`,
                  Background: themeGlobal.bodyThemeColor.Button.Background,
                  BorderColor: themeGlobal.color.alpha,
                  BorderRadius: `4px`,
                  Color: themeGlobal.bodyThemeColor.Button.Color,
                  PaddingY: `6px`,
                  PaddingX: `24px`,
                  Alignment: "center",
                  LetterSpacing: "0.2px",
                  Hover: {
                    Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                    BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                    Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                  }
                },
                DownloadBrochureButton: {
                  FontWeight: `500`,
                  FontSize: `14px`,
                  LineHeight: `24px`,
                  Background: themeGlobal.bodyThemeColor.Button.Background,
                  BorderColor: themeGlobal.color.alpha,
                  BorderRadius: `4px`,
                  Color: themeGlobal.bodyThemeColor.Button.Color,
                  PaddingY: `6px`,
                  PaddingX: `24px`,
                  Alignment: "center",
                  LetterSpacing: "0.2px",
                  Hover: {
                    Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                    BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                    Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                  }
                }
              }
            },
          },
          FeeStructure: {
            FeeStructureHero: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              BorderBottom: {
                BorderWidth: `2px`,
                Background: themeGlobal.color.alpha,
                BottomSpace: `-8px`,
              },
              h6: {
                FontWeight: themeGlobal.typography.h6.FontWeight,
                FontSize: themeGlobal.typography.h6.FontSize,
                LineHeight: themeGlobal.typography.h6.LineHeight,
                FontFamily: themeGlobal.typography.h6.FontFamily,
                FontStyle: themeGlobal.typography.h6.FontStyle,
                LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              FeeStructureHomeHeroHead: {
                MarginBottom: `40px`,
                Alignment: `center`,
              },
              ViewMoreFeeStructureHeroButton: {
                FontWeight: `400`,
                FontSize: `18px`,
                LineHeight: `24px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: themeGlobal.color.alpha,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `10px`,
                PaddingX: `40px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              ViewMoreFeeStructureHeroSection: {
                Alignment: `left`
              }
            },
            FeeStructurePage: {
              component: dynamic.feestructure,
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              BorderBottom: {
                BorderWidth: `2px`,
                Background: themeGlobal.color.alpha,
                BottomSpace: `-8px`,
              },
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.typography.h4.FontFamily,
                FontStyle: themeGlobal.typography.h4.FontStyle,
                LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                MarginBottom: `10px`,
                Alignment: "center"
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.Color,
                Alignment: "center"
              },
              FeeStructureListCard: {
                Alignment: `center`,
              },
              ViewFeeStructureButton: {
                FontWeight: `500`,
                FontSize: `19px`,
                LineHeight: `34px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: themeGlobal.color.universal,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `0`,
                PaddingX: `0`,
                Alignment: "center",
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: themeGlobal.color.universal,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              FeeStructureModalBody: {
                h4: {
                  FontWeight: themeGlobal.typography.h4.FontWeight,
                  FontSize: themeGlobal.typography.h4.FontSize,
                  LineHeight: themeGlobal.typography.h4.LineHeight,
                  FontFamily: themeGlobal.typography.h4.FontFamily,
                  FontStyle: themeGlobal.typography.h4.FontStyle,
                  LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                  Alignment: "left"
                },
                h5: {
                  FontWeight: themeGlobal.typography.h5.FontWeight,
                  FontSize: themeGlobal.typography.h5.FontSize,
                  LineHeight: themeGlobal.typography.h5.LineHeight,
                  FontFamily: themeGlobal.typography.h5.FontFamily,
                  FontStyle: themeGlobal.typography.h5.FontStyle,
                  LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
                  Alignment: "left"
                },
                h6: {
                  FontWeight: themeGlobal.typography.h6.FontWeight,
                  FontSize: themeGlobal.typography.h6.FontSize,
                  LineHeight: themeGlobal.typography.h6.LineHeight,
                  FontFamily: themeGlobal.typography.h6.FontFamily,
                  FontStyle: themeGlobal.typography.h6.FontStyle,
                  LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                  Alignment: "left"
                },
                p: {
                  FontWeight: themeGlobal.typography.regular.FontWeight,
                  FontSize: themeGlobal.typography.regular.FontSize,
                  LineHeight: themeGlobal.typography.regular.LineHeight,
                  FontFamily: themeGlobal.typography.regular.FontFamily,
                  FontStyle: themeGlobal.typography.regular.FontStyle,
                  LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.Color,
                  Alignment: "left"
                },
                DownloadFileButton: {
                  FontWeight: `500`,
                  FontSize: `14px`,
                  LineHeight: `24px`,
                  Background: themeGlobal.bodyThemeColor.Button.Background,
                  BorderColor: themeGlobal.color.alpha,
                  BorderRadius: `4px`,
                  Color: themeGlobal.bodyThemeColor.Button.Color,
                  PaddingY: `6px`,
                  PaddingX: `24px`,
                  Alignment: "center",
                  LetterSpacing: "0.2px",
                  Hover: {
                    Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                    BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                    Color: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  }
                },
                FeeStructureBreakuplist: {
                  tr: {
                    BorderColor: themeGlobal.color.alphaSemiLight
                  }
                }
              },
            },
          },
          Faqs: {
            FaqsHero: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              },
              h6: {
                FontWeight: themeGlobal.typography.h6.FontWeight,
                FontSize: themeGlobal.typography.h6.FontSize,
                LineHeight: themeGlobal.typography.h6.LineHeight,
                FontFamily: themeGlobal.typography.h6.FontFamily,
                FontStyle: themeGlobal.typography.h6.FontStyle,
                LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              BorderBottom: {
                BorderWidth: `2px`,
                Background: themeGlobal.color.alpha,
                BottomSpace: `-8px`,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.Color,
              },

              FaqsHomeHeroHead: {
                MarginBottom: `40px`,
                Alignment: `center`,
              },
              FaqListItem: {
                BorderColor: themeGlobal.color.alphaSemiLight,
              },
              ViewMoreFaqsHeroButton: {
                FontWeight: `400`,
                FontSize: `18px`,
                LineHeight: `24px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: themeGlobal.color.alpha,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `10px`,
                PaddingX: `40px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              ViewMoreFaqsHeroSection: {
                Alignment: `left`,
                MarginTop: `32px`,
              }
            },
            FaqsPage: {
              component: dynamic.faqs,
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              BorderBottom: {
                BorderWidth: `2px`,
                Background: themeGlobal.color.alpha,
                BottomSpace: `-8px`,
              },
              h6: {
                FontWeight: themeGlobal.typography.h6.FontWeight,
                FontSize: themeGlobal.typography.h6.FontSize,
                LineHeight: themeGlobal.typography.h6.LineHeight,
                FontFamily: themeGlobal.typography.h6.FontFamily,
                FontStyle: themeGlobal.typography.h6.FontStyle,
                LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.Color,
              },

              FaqsHead: {
                MarginBottom: `40px`,
                Alignment: `left`,
              },
              FaqListItem: {
                BorderColor: themeGlobal.color.alphaSemiLight,
              },
            },
          },
          Vacancy: {
            VacancyHero: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              BorderBottom: {
                BorderWidth: `2px`,
                Background: themeGlobal.color.alpha,
                BottomSpace: `-8px`,
              },
              h6: {
                FontWeight: themeGlobal.typography.h6.FontWeight,
                FontSize: themeGlobal.typography.h6.FontSize,
                LineHeight: themeGlobal.typography.h6.LineHeight,
                FontFamily: themeGlobal.typography.h6.FontFamily,
                FontStyle: themeGlobal.typography.h6.FontStyle,
                LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },

              VacancyHomeHeroHead: {
                MarginBottom: `40px`,
                Alignment: `center`,
              },
              VacancyListItem: {
                BorderColor: themeGlobal.color.alphaSemiLight,
              },
              ViewMoreVacancyHeroButton: {
                FontWeight: `400`,
                FontSize: `18px`,
                LineHeight: `24px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: themeGlobal.color.alpha,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `10px`,
                PaddingX: `40px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              ViewMoreVacancyHeroSection: {
                Alignment: `left`,
                MarginTop: `32px`,
              }
            },
            VacancyPage: {
              component: dynamic.vacancy,
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              BorderBottom: {
                BorderWidth: `2px`,
                Background: themeGlobal.color.alpha,
                BottomSpace: `-8px`,
              },
              h6: {
                FontWeight: themeGlobal.typography.h6.FontWeight,
                FontSize: themeGlobal.typography.h6.FontSize,
                LineHeight: themeGlobal.typography.h6.LineHeight,
                FontFamily: themeGlobal.typography.h6.FontFamily,
                FontStyle: themeGlobal.typography.h6.FontStyle,
                LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.Color,
              },
              VacancyHead: {
                MarginBottom: `40px`,
                Alignment: `center`,
              },
              VacancyListItem: {
                BorderColor: themeGlobal.color.alphaSemiLight,
              },
              OverlayApplyNowButton: {
                FontWeight: `400`,
                FontSize: `15px`,
                LineHeight: `18px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: themeGlobal.color.beta,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `10px`,
                PaddingX: `40px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              OverlayViewButton: {
                FontWeight: `400`,
                FontSize: `15px`,
                LineHeight: `18px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: themeGlobal.color.beta,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `10px`,
                PaddingX: `40px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              }
            },
          },
          Announcement: {
            AnnouncementPage: {
              component: dynamic.announcements,
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h6: {
                FontWeight: themeGlobal.typography.h6.FontWeight,
                FontSize: themeGlobal.typography.h6.FontSize,
                LineHeight: themeGlobal.typography.h6.LineHeight,
                FontFamily: themeGlobal.typography.h6.FontFamily,
                FontStyle: themeGlobal.typography.h6.FontStyle,
                LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Alignment: `center`,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              BorderBottom: {
                BorderWidth: `2px`,
                Background: themeGlobal.color.alpha,
                BottomSpace: `-8px`,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.Color,
              },
              AnnouncementHead: {
                MarginBottom: `40px`,
                Alignment: `center`,
              },
              AnnouncementListItem: {
                BorderColor: themeGlobal.color.alphaSemiLight,
              },
              OverlayDownloadButton: {
                FontWeight: `400`,
                FontSize: `15px`,
                LineHeight: `18px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: themeGlobal.color.beta,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `10px`,
                PaddingX: `40px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              }
            },
          },
          Global: {
            Modal: {
              ModalCloseWtc: {
                Color: themeGlobal.color.alpha,
                Hover: {
                  Color: themeGlobal.color.beta,
                }
              },
              ModalHeadWtc: {
                h2: {
                  FontWeight: themeGlobal.typography.h2.FontWeight,
                  FontSize: themeGlobal.typography.h2.FontSize,
                  LineHeight: themeGlobal.typography.h2.LineHeight,
                  FontFamily: themeGlobal.typography.h2.FontFamily,
                  FontStyle: themeGlobal.typography.h2.FontStyle,
                  LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                  Alignment: `left`,
                },
                h3: {
                  FontWeight: themeGlobal.typography.h3.FontWeight,
                  FontSize: themeGlobal.typography.h3.FontSize,
                  LineHeight: themeGlobal.typography.h3.LineHeight,
                  FontFamily: themeGlobal.typography.h3.FontFamily,
                  FontStyle: themeGlobal.typography.h3.FontStyle,
                  LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
                  Alignment: `left`,
                }
              },
              ModalBodyWTC: {
                h2: {
                  FontWeight: themeGlobal.typography.h2.FontWeight,
                  FontSize: themeGlobal.typography.h2.FontSize,
                  LineHeight: themeGlobal.typography.h2.LineHeight,
                  FontFamily: themeGlobal.typography.h2.FontFamily,
                  FontStyle: themeGlobal.typography.h2.FontStyle,
                  LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                  Alignment: `left`,
                },
                h3: {
                  FontWeight: themeGlobal.typography.h3.FontWeight,
                  FontSize: themeGlobal.typography.h3.FontSize,
                  LineHeight: themeGlobal.typography.h3.LineHeight,
                  FontFamily: themeGlobal.typography.h3.FontFamily,
                  FontStyle: themeGlobal.typography.h3.FontStyle,
                  LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
                  Alignment: `left`,
                },
                p: {
                  FontWeight: themeGlobal.typography.regular.FontWeight,
                  FontSize: themeGlobal.typography.regular.FontSize,
                  LineHeight: themeGlobal.typography.regular.LineHeight,
                  FontFamily: themeGlobal.typography.regular.FontFamily,
                  FontStyle: themeGlobal.typography.regular.FontStyle,
                  LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                  Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
                  Alignment: `left`,
                }
              }
            },
            scrollbar: {
              scrollbarWidth: '10px',
              scrollbarTrackBackground: '#000',
              scrollbarThumbBorderRadius: '0',
              scrollbarThumbBackground: themeGlobal.color.alpha,
              scrollbarThumbBackgroundHover: themeGlobal.color.beta,
            },
            body: {
              bodyBackground: themeGlobal.bodyThemeColor.Background,
              bodyFont: `'Poppins', sans-serif`,
              bodyFontSize: '16px',
              bodyFontWeight: '600',
              bodyColor: '#8B417D',
              bodyLetterSpacing: '',
            },
            container: {
              containerMaxWidth: '1140px',
            }
          },
        }
        if (editTheme) {
          let themes = {
            ...theme, themeGlobal: themeGlobal
          }
          dispatch(editWebsiteTemplateTheme({
            ...themes, themes: themes, industry: user.user_business_type, theme_Name: themeName, owner: user._id,
            institute: user.user_institute, template: themeGlobalData._id, theme: themeData.themeData._id, primaryColor: headerData.navMenuBackground,
            secondaryColor: headerData.navMenuHoverColor,
            tertiaryColor: bodyData.websiteBackground
          }))
        } else {
          dispatch(createWebsiteTemplateUserTheme({
            ...theme, themeGlobal: themeGlobal, themeCategory: user.user_business_type, theme_Name: themeName, owner: user._id,
            institute: user.user_institute, template: themeGlobalData._id, primaryColor: headerData.navMenuBackground,
            secondaryColor: headerData.navMenuHoverColor,
            tertiaryColor: bodyData.websiteBackground
          }))
        }
      }

      // if (editTheme) {
      //   let themes = {
      //     ...theme, themeGlobal: themeGlobal
      //   }
      //   dispatch(editWebsiteTemplateTheme({
      //     themes: themes, industry: user.user_business_type, theme_Name: themeName, owner: user._id,
      //     institute: user.user_institute, template: themeGlobalData._id, theme: themeData.themeData._id, primaryColor: headerData.navMenuBackground,
      //     secondaryColor: headerData.navMenuHoverColor,
      //     tertiaryColor: bodyData.websiteBackground
      //   }))
      // } else {
      //   dispatch(createWebsiteTemplateUserTheme({
      //     ...theme, themeGlobal: themeGlobal, themeCategory: user.user_business_type, theme_Name: themeName, owner: user._id,
      //     institute: user.user_institute, template: themeGlobalData._id, primaryColor: headerData.navMenuBackground,
      //     secondaryColor: headerData.navMenuHoverColor,
      //     tertiaryColor: bodyData.websiteBackground
      //   }))
      // }
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
    const themeGlobal = {
      component: theme.themeGlobal.component === "Defaultine_Body" ? "Defaultine_Body" : "Vespertine_Body",
      color: {
        alpha: `#343F64`,
        alphaSemiLight: `#4E616B`,
        alphaLight: `#EBECF0`,
        beta: `#E9DB89`,
        betaSemiLight: ``,
        betaLight: ``,
        background: ``,
        base: `#202020`,
        baseSemiLight: `rgba(32,
        32,
        32,
        0.6)`,
        baseLight: `rgba(32,
        32,
        32,
        0.4)`,
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
          Color: '#4E616B',
        },
        ButtonLogin: {
          Background: headerData.loginBackground ? headerData.loginBackground : "",
          Color: headerData.loginColor,
          BorderColor: headerData.loginBorderColor ? headerData.loginBorderColor : "",
          Hover: {
            Background: headerData.loginHoverBackground,
            Color: headerData.loginHoverColor,
            BorderColor: headerData.loginHoverBorderColor,
          },
          Active: {
            Background: headerData.loginActiveBackground,
            Color: headerData.loginActiveColor,
            BorderColor: headerData.loginActiveBorderColor,
          }
        },
        ButtonSignup: {
          Background: headerData.SignUpBackground,
          BorderColor: headerData.SignUpBorderColor,
          Color: headerData.SignUpColor,
          Hover: {
            Background: headerData.SignUpHoverBackground,
            Color: headerData.SignUpHoverColor,
            BorderColor: headerData.SignUpHoverBorderColor,
          },
          Active: {
            Background: headerData.SignUpActiveBackground,
            Color: headerData.SignUpActiveColor,
            BorderColor: headerData.SignUpActiveBorderColor,
          }
        },
        NavMenu: {
          Background: headerData.navMenuBackground,
          Color: headerData.navMenuColor,
          Hover: {
            Color: headerData.navMenuHoverColor,
          },
          Active: {
            Color: `#26335D`,
          },
          ScrollIcon: {
            Color: headerData.navMenuScrollIconColor,
            Hover: {
              Color: headerData.navMenuScrollIconHoverColor,
            }
          }
        },
      },
      footerThemeColor: {
        Background: footerData.FooterBackground,
        Logo: {
          Background: footerData.logoBackGround,
        },
        h4: {
          Color: footerData.heading4Color,
        },
        h5: {
          Color: footerData.heading5Color,
        },
        h6: {
          Color: footerData.heading6Color,
        },
        a: {
          Color: footerData.LinkColor,
          Hover: {
            Color: footerData.LinkHovercolor,
          }
        },
        li: {
          Color: '#FFFFFF',
        },
        Copyright: {
          Color: footerData.copyrightColor,
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
        h5: {
          FontSize: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.FontSize : "",
          FontWeight: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.FontWeight : "",
          LineHeight: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.LineHeight : "",
          FontFamily: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.FontFamily : "",
          FontStyle: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.FontStyle : "",
          LetterSpacing: headerData && headerData.typographyValues ? headerData.typographyValues?.h5.LetterSpacing : "",
        },
        Button: {
          FontSize: headerData && headerData.typographyValues ? headerData.typographyValues.Button.FontSize : "",
          FontWeight: headerData && headerData.typographyValues ? headerData.typographyValues.Button.FontWeight : "",
          LineHeight: headerData && headerData.typographyValues ? headerData.typographyValues.Button.LineHeight : "",
          FontFamily: headerData && headerData.typographyValues ? headerData.typographyValues.Button.FontFamily : "",
          FontStyle: headerData && headerData.typographyValues ? headerData.typographyValues.Button.FontStyle : "",
          LetterSpacing: headerData && headerData.typographyValues ? headerData.typographyValues.Button.LetterSpacing : "",
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
        li: {
          FontSize: `14px`,
          FontWeight: `400`,
          LineHeight: `21px`,
          LetterSpacing: ``,
          FontFamily: ``,
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
          Width: '86px',
          Height: '86px',
        },
        h4: {
          TextTransform: 'uppercase',
          TextAlignment: 'left',
        },
        h5: {
          TextTransform: 'uppercase',
          TextAlignment: 'left',
        },
        Button: {
          PaddingY: '10px',
          PaddingX: '14px',
          BorderRadius: '4px',
        },
        NavMenu: {
          MenuGap: `28px`,
        }
      },
      footerThemeUtilities: {
        Logo: {
          Width: `80px`,
          Height: "80px",
          BorderRadius: "50%",
          PaddingX: "10px",
          PaddingY: "10px",
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
        li: {
          TextTransform: `uppercase`,
          TextAlignment: ``,
        },
        Map: {
          Height: `300px`
        },
        SocialMediaIcon: {
          Width: `38px`,
          Height: `38px`,
        },
      },
      bodyThemeColor: {
        Background: bodyData.websiteBackground,
        typography: {
          Color: bodyData.RegularTextColor,
          HeadingColor: bodyData.HeadingTextColor,
          SubHeadingColor: bodyData.SubHeadingTextColor,
          LinkColor: bodyData.HyperlinkTextColor,
          Hover: {
            LinkColor: bodyData.HyperlinkHoverColor,
          }
        },
        Button: {
          Background: bodyData.ButtonBackground,
          Color: bodyData.ButtonText,
          Hover: {
            Background: bodyData.ButtonHoverBackground,
            Color: bodyData.ButtonHoverTextColor,
          }
        }
      }
    }
    const dynamic = {
      header: themeSuccess && theme.Header.component && theme.Header.component === "Defaultine_Header" ? "Defaultine_Header" : "Vespertine_Header",
      footer: themeSuccess && theme.Footer.component && theme.Footer.component === "Defaultine_Footer" ? "Defaultine_Footer" : "Vespertine_Footer",
      body: themeSuccess && theme.themeGlobal.component && theme.themeGlobal.component === "Defaultine_Body" ? "Defaultine_Body" : "Vespertine_Body",
      aboutus: themeSuccess && theme.AboutUs.AboutUsPage.component && theme.AboutUs.AboutUsPage.component === "Defaultine_AboutUsPage" ? "Defaultine_AboutUsPage" : "Vespertine_AboutUsPage",
      team: themeSuccess && theme.Team.TeamPage.component && theme.Team.TeamPage.component === "Defaultine_TeamPage" ? "Defaultine_TeamPage" : "Vespertine_TeamPage",
      admission: themeSuccess && theme.Admission.AdmissionPage.component && theme.Admission.AdmissionPage.component === "Defaultine_AdmissionPage" ? "Defaultine_AdmissionPage" : "Vespertine_AdmissionPage",
      feestructure: themeSuccess && theme.FeeStructure.FeeStructurePage.component && theme.FeeStructure.FeeStructurePage.component === "Defaultine_FeeStructurePage" ? "Defaultine_FeeStructurePage" : "Vespertine_FeeStructurePage",
      services: themeSuccess && theme.Facility.FacilityPage.component && theme.Facility.FacilityPage.component === "Defaultine_FacilityPage" ? "Defaultine_FacilityPage" : "Vespertine_FacilityPage",
      announcements: themeSuccess && theme.Announcement.AnnouncementPage.component && theme.Announcement.AnnouncementPage.component === "Defaultine_AnnouncementsPage" ? "Defaultine_AnnouncementsPage" : "Vespertine_AnnouncementsPage",
      vacancy: themeSuccess && theme.Vacancy.VacancyPage.component && theme.Vacancy.VacancyPage.component === "Defaultine_VacancyPage" ? "Defaultine_VacancyPage" : "Vespertine_VacancyPage",
      faqs: themeSuccess && theme.Faqs.FaqsPage.component && theme.Faqs.FaqsPage.component === "Defaultine_FaqsPage" ? "Defaultine_FaqsPage" : "Vespertine_FaqsPage",
      contact: themeSuccess && theme.Contact.ContactPage.component && theme.Contact.ContactPage.component === "Defaultine_ContactPage" ? "Defaultine_ContactPage" : "Vespertine_ContactPage",
      gallery: themeSuccess && theme.Gallery.GalleryPage.component && theme.Gallery.GalleryPage.component === "Defaultine_GalleryPage" ? "Defaultine_GalleryPage" : "Vespertine_GalleryPage"
    }
    if (theme.themeGlobal.component === "Defaultine_Body") {
      let theme = {
        Header: {
          component: "Defaultine_Header",
          Background: themeGlobal.headerThemeColor.Background,
          Logo: {
            Width: themeGlobal.headerThemeUtilities.Logo.Width,
            Height: themeGlobal.headerThemeUtilities.Logo.Height,
          },
          h4: {
            FontSize: themeGlobal.headerThemeTypo.h4.FontSize,
            FontWeight: themeGlobal.headerThemeTypo.h4.FontWeight,
            LineHeight: themeGlobal.headerThemeTypo.h4.LineHeight,
            FontFamily: themeGlobal.headerThemeTypo.h4.FontFamily,
            FontStyle: themeGlobal.headerThemeTypo.h4.FontStyle,
            LetterSpacing: themeGlobal.headerThemeTypo.h4.LetterSpacing,
            Color: themeGlobal.headerThemeColor.h4.Color,
            TextTransform: themeGlobal.headerThemeUtilities.h4.TextTransform,
            TextAlignment: themeGlobal.headerThemeUtilities.h4.TextAlignment,
          },
          h5: {
            FontSize: themeGlobal.headerThemeTypo.h5.FontSize,
            FontWeight: themeGlobal.headerThemeTypo.h5.FontWeight,
            LineHeight: themeGlobal.headerThemeTypo.h5.LineHeight,
            FontFamily: themeGlobal.headerThemeTypo.h5.FontFamily,
            FontStyle: themeGlobal.headerThemeTypo.h5.FontStyle,
            LetterSpacing: themeGlobal.headerThemeTypo.h5.LetterSpacing,
            Color: themeGlobal.headerThemeColor.h5.Color,
            TextTransform: themeGlobal.headerThemeUtilities.h5.TextTransform,
            TextAlignment: themeGlobal.headerThemeUtilities.h5.TextAlignment,
          },
          NavAuth: {
            ButtonLogin: {
              FontSize: themeGlobal.headerThemeTypo.Button.FontSize,
              FontWeight: themeGlobal.headerThemeTypo.Button.FontWeight,
              LineHeight: themeGlobal.headerThemeTypo.Button.LineHeight,
              FontFamily: themeGlobal.headerThemeTypo.Button.FontFamily,
              FontStyle: themeGlobal.headerThemeTypo.Button.FontStyle,
              LetterSpacing: themeGlobal.headerThemeTypo.Button.LetterSpacing,
              PaddingY: themeGlobal.headerThemeUtilities.Button.PaddingY,
              PaddingX: themeGlobal.headerThemeUtilities.Button.PaddingX,
              Background: themeGlobal.headerThemeColor.ButtonLogin.Background,
              BorderColor: themeGlobal.headerThemeColor.ButtonLogin.BorderColor,
              BorderRadius: themeGlobal.headerThemeUtilities.Button.BorderRadius,
              Color: themeGlobal.headerThemeColor.ButtonLogin.Color,
              Hover: {
                Background: themeGlobal.headerThemeColor.ButtonLogin.Hover.Background,
                Color: themeGlobal.headerThemeColor.ButtonLogin.Hover.Color,
                BorderColor: themeGlobal.headerThemeColor.ButtonLogin.Hover.BorderColor,
              },
              Active: {
                Background: themeGlobal.headerThemeColor.ButtonLogin.Active.Background,
                Color: themeGlobal.headerThemeColor.ButtonLogin.Active.Color,
                BorderColor: themeGlobal.headerThemeColor.ButtonLogin.Active.BorderColor,
              }
            },
            ButtonSignup: {
              FontSize: themeGlobal.headerThemeTypo.Button.FontSize,
              FontWeight: themeGlobal.headerThemeTypo.Button.FontWeight,
              LineHeight: themeGlobal.headerThemeTypo.Button.LineHeight,
              FontFamily: themeGlobal.headerThemeTypo.Button.FontFamily,
              FontStyle: themeGlobal.headerThemeTypo.Button.FontStyle,
              LetterSpacing: themeGlobal.headerThemeTypo.Button.LetterSpacing,
              PaddingY: themeGlobal.headerThemeUtilities.Button.PaddingY,
              PaddingX: themeGlobal.headerThemeUtilities.Button.PaddingX,
              Background: themeGlobal.headerThemeColor.ButtonSignup.Background,
              BorderColor: themeGlobal.headerThemeColor.ButtonSignup.BorderColor,
              BorderRadius: themeGlobal.headerThemeUtilities.Button.BorderRadius,
              Color: themeGlobal.headerThemeColor.ButtonSignup.Color,
              Hover: {
                Background: themeGlobal.headerThemeColor.ButtonSignup.Hover.Background,
                Color: themeGlobal.headerThemeColor.ButtonSignup.Hover.Color,
                BorderColor: themeGlobal.headerThemeColor.ButtonSignup.Hover.BorderColor,
              },
              Active: {
                Background: themeGlobal.headerThemeColor.ButtonSignup.Active.Background,
                Color: themeGlobal.headerThemeColor.ButtonSignup.Active.Color,
                BorderColor: themeGlobal.headerThemeColor.ButtonSignup.Active.BorderColor,
              }
            }
          },
          NavMenuWrapper: {
            Background: themeGlobal.headerThemeColor.NavMenu.Background,
            NavMenuCustom: {
              MenuGap: themeGlobal.headerThemeUtilities.NavMenu.MenuGap,
              FontSize: themeGlobal.headerThemeTypo.NavMenu.FontSize,
              FontWeight: themeGlobal.headerThemeTypo.NavMenu.FontWeight,
              LineHeight: themeGlobal.headerThemeTypo.NavMenu.LineHeight,
              FontFamily: themeGlobal.headerThemeTypo.NavMenu.FontFamily,
              FontStyle: themeGlobal.headerThemeTypo.NavMenu.FontStyle,
              LetterSpacing: themeGlobal.headerThemeTypo.NavMenu.LetterSpacing,
              Color: themeGlobal.headerThemeColor.NavMenu.Color,
              Hover: {
                Color: themeGlobal.headerThemeColor.NavMenu.Hover.Color,
              },
              Active: {
                Color: themeGlobal.headerThemeColor.NavMenu.Active.Color,
                FontWeight: themeGlobal.headerThemeTypo.NavMenu.Active.FontWeight,
              },
              NavMenuScrollIcon: {
                BorderColor: themeGlobal.headerThemeColor.NavMenu.ScrollIcon.Color,
                Hover: {
                  BorderColor: themeGlobal.headerThemeColor.NavMenu.ScrollIcon.Hover.Color,
                }
              }
            }
          }
        },
        Footer: {
          component: 'Defaultine_Footer',
          Background: themeGlobal.footerThemeColor.Background,
          h4: {
            FontWeight: themeGlobal.footerThemeTypo.h4.FontWeight,
            FontSize: themeGlobal.footerThemeTypo.h4.FontSize,
            LineHeight: themeGlobal.footerThemeTypo.h4.LineHeight,
            FontFamily: themeGlobal.footerThemeTypo.h4.FontFamily,
            FontStyle: themeGlobal.footerThemeTypo.h4.FontStyle,
            LetterSpacing: themeGlobal.footerThemeTypo.h4.LetterSpacing,
            Color: themeGlobal.footerThemeColor.h4.Color,
            TextTransform: themeGlobal.footerThemeUtilities.h4.TextTransform,
            TextAlignment: themeGlobal.footerThemeUtilities.h4.TextAlignment,
          },
          h5: {
            FontWeight: themeGlobal.footerThemeTypo.h5.FontWeight,
            FontSize: themeGlobal.footerThemeTypo.h5.FontSize,
            LineHeight: themeGlobal.footerThemeTypo.h5.LineHeight,
            FontFamily: themeGlobal.footerThemeTypo.h5.FontFamily,
            FontStyle: themeGlobal.footerThemeTypo.h5.FontStyle,
            LetterSpacing: themeGlobal.footerThemeTypo.h5.LetterSpacing,
            Color: themeGlobal.footerThemeColor.h5.Color,
            TextTransform: themeGlobal.footerThemeUtilities.h5.TextTransform,
            TextAlignment: themeGlobal.footerThemeUtilities.h5.TextAlignment,
          },
          h6: {
            FontWeight: themeGlobal.footerThemeTypo.h6.FontWeight,
            FontSize: themeGlobal.footerThemeTypo.h6.FontSize,
            LineHeight: themeGlobal.footerThemeTypo.h6.LineHeight,
            FontFamily: themeGlobal.footerThemeTypo.h6.FontFamily,
            FontStyle: themeGlobal.footerThemeTypo.h6.FontStyle,
            LetterSpacing: themeGlobal.footerThemeTypo.h6.LetterSpacing,
            Color: themeGlobal.footerThemeColor.h6.Color,
            TextTransform: themeGlobal.footerThemeUtilities.h6.TextTransform,
            TextAlignment: themeGlobal.footerThemeUtilities.h6.TextAlignment,
          },
          li: {
            FontWeight: themeGlobal.footerThemeTypo.li.FontWeight,
            FontSize: themeGlobal.footerThemeTypo.li.FontSize,
            LineHeight: themeGlobal.footerThemeTypo.li.LineHeight,
            FontFamily: themeGlobal.footerThemeTypo.li.FontFamily,
            FontStyle: themeGlobal.footerThemeTypo.li.FontStyle,
            LetterSpacing: themeGlobal.footerThemeTypo.li.LetterSpacing,
            Color: themeGlobal.footerThemeColor.li.Color,
            TextTransform: themeGlobal.footerThemeUtilities.li.TextTransform,
            TextAlignment: themeGlobal.footerThemeUtilities.li.TextAlignment,
          },
          a: {
            FontWeight: themeGlobal.footerThemeTypo.a.FontWeight,
            FontSize: themeGlobal.footerThemeTypo.a.FontSize,
            LineHeight: themeGlobal.footerThemeTypo.a.LineHeight,
            FontFamily: themeGlobal.footerThemeTypo.a.FontFamily,
            FontStyle: themeGlobal.footerThemeTypo.a.FontStyle,
            LetterSpacing: themeGlobal.footerThemeTypo.a.LetterSpacing,
            Color: themeGlobal.footerThemeColor.a.Color,
            TextTransform: themeGlobal.footerThemeUtilities.a.TextTransform,
            TextAlignment: themeGlobal.footerThemeUtilities.a.TextAlignment,
            Hover: {
              Color: themeGlobal.footerThemeColor.a.Hover.Color,
            }
          },
          MapContainer: {
            Height: themeGlobal.footerThemeUtilities.Map.Height,
          },
          SocialMediaIconListItem: {
            Width: themeGlobal.footerThemeUtilities.SocialMediaIcon.Width,
            Height: themeGlobal.footerThemeUtilities.SocialMediaIcon.Height,
          },
          CopyrightSectionItem: {
            FontWeight: themeGlobal.footerThemeTypo.Copyright.FontWeight,
            FontSize: themeGlobal.footerThemeTypo.Copyright.FontSize,
            LineHeight: themeGlobal.footerThemeTypo.Copyright.LineHeight,
            FontFamily: themeGlobal.footerThemeTypo.Copyright.FontFamily,
            FontStyle: themeGlobal.footerThemeTypo.Copyright.FontStyle,
            LetterSpacing: themeGlobal.footerThemeTypo.Copyright.LetterSpacing,
            Color: themeGlobal.footerThemeColor.Copyright.Color,
          }
        },
        Banner: {
          Background: `rgba(255, 255, 255, 0.5)`,
          a: {
            FontWeight: themeGlobal.typography.anchor.FontWeight,
            FontSize: themeGlobal.typography.anchor.FontSize,
            LineHeight: themeGlobal.typography.anchor.LineHeight,
            FontFamily: themeGlobal.typography.anchor.FontFamily,
            FontStyle: themeGlobal.typography.anchor.FontStyle,
            LetterSpacing: themeGlobal.typography.anchor.LetterSpacing,
            Background: themeGlobal.bodyThemeColor.Button.Background,
            BorderColor: `#343F64`,
            BorderRadius: `4px`,
            Color: themeGlobal.bodyThemeColor.typography.LinkColor,
            PaddingY: `10px`,
            PaddingX: `40px`,
            Hover: {
              Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
              BorderColor: `#343F64`,
              Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
            }
          },
          h1: {
            FontWeight: themeGlobal.typography.h1.FontWeight,
            FontSize: themeGlobal.typography.h1.FontSize,
            LineHeight: themeGlobal.typography.h1.LineHeight,
            FontFamily: themeGlobal.typography.h1.FontFamily,
            FontStyle: themeGlobal.typography.h1.FontStyle,
            LetterSpacing: themeGlobal.typography.h1.LetterSpacing,
            Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
          },
          h3: {
            FontWeight: `400`,
            FontSize: `12px`,
            LineHeight: `18px`,
            FontFamily: themeGlobal.typography.h3.FontFamily,
            FontStyle: themeGlobal.typography.h3.FontStyle,
            LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
            Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
          },
          Dots: {
            Color: `rgba(32, 32, 32, 0.5)`,
            Active: {
              Color: `rgba(38, 51, 93, 0.8)`,
            }
          },
          SliderImage: {
            Height: `480px`,
          },
          SlickArrowColor: {
            Color: `#fff`,
            Hover: {
              Color: `#E9DB89`,
            }
          },
          BannerOverlay: {
            Top: `auto`,
            Bottom: `0`,
            Right: `139px`,
            Left: `auto`,
            width: `388px`,
            Background: `rgba(255, 255, 255, 0.8)`,
            Padding: `16px`,
            BorderRadius: `0`,
          },
        },
        AboutUs: {
          AboutUsHero: {
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              Alignment: `center`,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              Alignment: `center`,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.Color,
              Alignment: `center`,
            },
            SectionHead: {
              MarginBottom: `20px`,
              Alignment: `center`,
            },
            SectionGrid: {
              Background: `#EBECF0`,
            },
            BorderBottom: {
              BorderWidth: `2px`,
              Background: `#343F64`,
              BottomSpace: `-8px`,
            },
            ViewMoreButton: {
              FontWeight: `500`,
              FontSize: `inherit`,
              LineHeight: `inherit`,

              BorderColor: `transparent`,
              BorderRadius: `0`,
              Color: themeGlobal.bodyThemeColor.typography.LinkColor,
              PaddingY: `0`,
              PaddingX: `0`,
              TextDecoration: `underline`,
              Hover: {
                BorderColor: `transparent`,
                Color: themeGlobal.bodyThemeColor.typography.Hover.LinkColor,
              }
            },
            ViewMoreSection: {
              MarginTop: `32px`,
            }
          },
          AboutUsPage: {
            component: dynamic.aboutus,
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Color: `rgba(38, 51, 93, 0.8)`,
              Alignment: `center`,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              Alignment: `center`,
            },
            h4: {
              FontWeight: themeGlobal.typography.h4.FontWeight,
              FontSize: themeGlobal.typography.h4.FontSize,
              LineHeight: themeGlobal.typography.h4.LineHeight,
              FontFamily: themeGlobal.headerThemeTypo.h4.FontFamily,
              FontStyle: themeGlobal.headerThemeTypo.h4.FontStyle,
              LetterSpacing: themeGlobal.headerThemeTypo.h4.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              Alignment: `center`,
            },
            h5: {
              FontWeight: themeGlobal.typography.h5.FontWeight,
              FontSize: themeGlobal.typography.h5.FontSize,
              LineHeight: themeGlobal.typography.h5.LineHeight,
              FontFamily: themeGlobal.headerThemeTypo.h5.FontFamily,
              FontStyle: themeGlobal.headerThemeTypo.h5.FontStyle,
              LetterSpacing: themeGlobal.headerThemeTypo.h5.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              Alignment: `center`,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: `#202020`,
              Alignment: `center`,
            },
            SectionHead: {
              MarginBottom: `20px`,
              Alignment: `center`,
            },
            SectionGrid: {
              Background: `#EBECF0`,
            },
            BorderBottom: {
              BorderWidth: `2px`,
              Background: `#343F64`,
              BottomSpace: `-8px`,
            },
            MessageProfileImage: {
              Width: `160px`,
              Height: `160px`,
              BorderRadius: `50%`,
              MarginBottom: `24px`,
            },
            Dots: {
              Color: `rgba(32, 32, 32, 0.5)`,
              Active: {
                Color: `rgba(38, 51, 93, 0.8)`,
              }
            },
            SlickArrowColor: {
              Color: `rgba(38, 51, 93, 0.8)`,
              Hover: {
                Color: `rgba(38, 51, 93, 0.8)`,
              }
            },
            MissionSection: {
              Background: themeGlobal.color.alphaLight,
              BorderRadius: `20px`,
              MissionHead: {
                MarginBottom: `40px`,
                Alignment: `center`,
              }
            },
            VisionSection: {
              Background: themeGlobal.color.alphaLight,
              BorderRadius: `20px`,
              VisionHead: {
                MarginBottom: `40px`,
                Alignment: `center`,
              }
            }
          },
        },
        // Notice: {
        //   NoticeBoardHero: {
        //     a: {
        //       FontWeight: themeGlobal.typography.anchor.FontWeight,
        //       FontSize: themeGlobal.typography.anchor.FontSize,
        //       LineHeight: themeGlobal.typography.anchor.LineHeight,
        //       FontFamily: themeGlobal.typography.anchor.FontFamily,
        //       FontStyle: themeGlobal.typography.anchor.FontStyle,
        //       LetterSpacing: themeGlobal.typography.anchor.LetterSpacing,
        //       Color: themeGlobal.bodyThemeColor.typography.LinkColor,
        //       Hover: {
        //         Color: themeGlobal.bodyThemeColor.typography.Hover.LinkColor,
        //       }
        //     },
        //     PaddingY: `16px`,
        //     ContentBox: {
        //       width: `100%`,
        //     },
        //   },
        // },
        Principal: {
          PrincipalHero: {
            h4: {
              FontWeight: themeGlobal.typography.h4.FontWeight,
              FontSize: themeGlobal.typography.h4.FontSize,
              LineHeight: themeGlobal.typography.h4.LineHeight,
              FontFamily: themeGlobal.headerThemeTypo.h4.FontFamily,
              FontStyle: themeGlobal.headerThemeTypo.h4.FontStyle,
              LetterSpacing: themeGlobal.headerThemeTypo.h4.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h5: {
              FontWeight: themeGlobal.typography.h5.FontWeight,
              FontSize: themeGlobal.typography.h5.FontSize,
              LineHeight: themeGlobal.typography.h5.LineHeight,
              FontFamily: themeGlobal.headerThemeTypo.h5.FontFamily,
              FontStyle: themeGlobal.headerThemeTypo.h5.FontStyle,
              LetterSpacing: themeGlobal.headerThemeTypo.h5.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: `#343F64`,
              PaddingTop: `24px`,
            },

            ViewMoreMessageButton: {
              FontWeight: `500`,
              FontSize: `inherit`,
              LineHeight: `inherit`,
              Background: 'transparent',
              BorderColor: `transparent`,
              BorderRadius: `0`,
              Color: themeGlobal.bodyThemeColor.typography.LinkColor,
              PaddingY: `0`,
              PaddingX: `0`,
              TextDecoration: `underline`,
              Hover: {
                Background: 'transparent',
                BorderColor: `transparent`,
                Color: themeGlobal.bodyThemeColor.typography.Hover.LinkColor,
              }
            },
            PrincipalProfileImage: {
              Width: `160px`,
              Height: `160px`,
              BorderRadius: `50%`,
              MarginBottom: `24px`,
            },
            Dots: {
              Color: `rgba(32, 32, 32, 0.5)`,
              Active: {
                Color: `rgba(38, 51, 93, 0.8)`,
              }
            },
            SlickArrowColor: {
              Color: `rgba(38, 51, 93, 0.8)`,
              Hover: {
                Color: `rgba(38, 51, 93, 0.8)`,
              }
            },
          }
        },
        Team: {
          TeamHero: {
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `left`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            h4: {
              FontWeight: themeGlobal.typography.h4.FontWeight,
              FontSize: themeGlobal.typography.h4.FontSize,
              LineHeight: themeGlobal.typography.h4.LineHeight,
              FontFamily: themeGlobal.typography.h4.FontFamily,
              FontStyle: themeGlobal.typography.h4.FontStyle,
              LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              MarginBottom: `10px`,
            },
            h5: {
              FontWeight: themeGlobal.typography.h5.FontWeight,
              FontSize: themeGlobal.typography.h5.FontSize,
              LineHeight: themeGlobal.typography.h5.LineHeight,
              FontFamily: themeGlobal.typography.h5.FontFamily,
              FontStyle: themeGlobal.typography.h5.FontStyle,
              LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            TeamAlbumHomeCard: {
              BorderWidth: `0`,
              BorderColor: `transparent`,
              BorderRadius: `8px`,
              Height: `381px`,
              Background: `rgba(38, 51, 93, 0.05)`,
              Padding: `54px`,
              TeamAlbumHomeCardOverlay: {
                PaddingY: `0`,
                PaddingX: `0`,
                PrimaryBorderBottom: {
                  Height: `1px`,
                  Background: `transparent`,
                  Bottom: `-5px`,
                },
              }
            },
            ViewMoreTeamButton: {
              FontWeight: `500`,
              FontSize: `15px`,
              LineHeight: `22px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: `rgba(38, 51, 93, 0.8)`,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `8px`,
              PaddingX: `32px`,
              MarginTop: `48px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: `transparent`,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            }
          },
          TeamPage: {
            component: dynamic.team,
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            h4: {
              FontWeight: themeGlobal.typography.h4.FontWeight,
              FontSize: themeGlobal.typography.h4.FontSize,
              LineHeight: themeGlobal.typography.h4.LineHeight,
              FontFamily: themeGlobal.typography.h4.FontFamily,
              FontStyle: themeGlobal.typography.h4.FontStyle,
              LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              MarginBottom: `10px`,
            },
            h5: {
              FontWeight: themeGlobal.typography.h5.FontWeight,
              FontSize: themeGlobal.typography.h5.FontSize,
              LineHeight: themeGlobal.typography.h5.LineHeight,
              FontFamily: themeGlobal.typography.h5.FontFamily,
              FontStyle: themeGlobal.typography.h5.FontStyle,
              LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            TeamAlbumCard: {
              BorderWidth: `0`,
              BorderColor: `transparent`,
              BorderRadius: `8px`,
              Height: `381px`,
              Background: `rgba(38, 51, 93, 0.05)`,
              Padding: `54px`,
              TeamAlbumCardOverlay: {
                PaddingY: `0`,
                PaddingX: `0`,
                PrimaryBorderBottom: {
                  Height: `1px`,
                  Background: `transparent`,
                  Bottom: `-5px`,
                },
              }
            },
          },
        },
        Facility: {
          FacilitiesHero: {
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `left`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            h4: {
              FontWeight: themeGlobal.typography.h4.FontWeight,
              FontSize: themeGlobal.typography.h4.FontSize,
              LineHeight: themeGlobal.typography.h4.LineHeight,
              FontFamily: themeGlobal.typography.h4.FontFamily,
              FontStyle: themeGlobal.typography.h4.FontStyle,
              LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: `rgba(32, 32, 32, 0.6)`,
            },
            ViewMoreFacilitiesButton: {
              FontWeight: `500`,
              FontSize: `15px`,
              LineHeight: `22px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: `rgba(38, 51, 93, 0.8)`,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `8px`,
              PaddingX: `32px`,
              MarginTop: `48px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: `transparent`,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            FacilitiesSliderDescription: {
              Padding: `14px`,
              Background: `#fff`,
              BorderBottom: {
                Height: `2px`,
                Background: `transparent`,
                BottomSpace: `-10px`,
              },
            },
          },
          FacilityPage: {
            component: dynamic.services,
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `left`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            h4: {
              FontWeight: themeGlobal.typography.h4.FontWeight,
              FontSize: themeGlobal.typography.h4.FontSize,
              LineHeight: themeGlobal.typography.h4.LineHeight,
              FontFamily: themeGlobal.typography.h4.FontFamily,
              FontStyle: themeGlobal.typography.h4.FontStyle,
              LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: `rgba(32, 32, 32, 0.6)`,
            },
            FacilitiesDescription: {
              Padding: `14px`,
              Background: `#fff`,
              BorderBottom: {
                Height: `2px`,
                Background: `transparent`,
                BottomSpace: `-10px`,
              },
            },
          },
        },
        Gallery: {
          GalleryHero: {
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `left`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            h6: {
              FontWeight: themeGlobal.typography.h6.FontWeight,
              FontSize: themeGlobal.typography.h6.FontSize,
              LineHeight: themeGlobal.typography.h6.LineHeight,
              FontFamily: themeGlobal.typography.h6.FontFamily,
              FontStyle: themeGlobal.typography.h6.FontStyle,
              LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            ViewMoreGalleryButton: {
              FontWeight: `500`,
              FontSize: `15px`,
              LineHeight: `22px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: `rgba(38, 51, 93, 0.8)`,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `8px`,
              PaddingX: `32px`,
              MarginTop: `48px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: `transparent`,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            GalleryCaption: {
              Background: `rgba(9, 51, 81, 0.6)`,
            }
          },
          GalleryPage: {
            component: dynamic.gallery,
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `left`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            h6: {
              FontWeight: themeGlobal.typography.h6.FontWeight,
              FontSize: themeGlobal.typography.h6.FontSize,
              LineHeight: themeGlobal.typography.h6.LineHeight,
              FontFamily: themeGlobal.typography.h6.FontFamily,
              FontStyle: themeGlobal.typography.h6.FontStyle,
              LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            GalleryCaption: {
              Background: `rgba(9, 51, 81, 0.6)`,
            }
          },
          GalleryListSection: {
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h4: {
              FontWeight: themeGlobal.typography.h4.FontWeight,
              FontSize: themeGlobal.typography.h4.FontSize,
              LineHeight: themeGlobal.typography.h4.LineHeight,
              FontFamily: themeGlobal.typography.h4.FontFamily,
              FontStyle: themeGlobal.typography.h4.FontStyle,
              LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            GalleryListFilter: {
              MarginBottom: `40px`,
            },
            GalleryListFilterButton: {
              FontWeight: `500`,
              FontSize: `15px`,
              LineHeight: `18px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: `#343F64`,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `8px`,
              PaddingX: `24px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: `#343F64`,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              },
              Active: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: `#343F64`,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            }
          },
        },
        Contact: {
          ContactHero: {
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: `#202020`,
              MarginBottom: `10px`,
            },
            ContactHomeHeroAddress: {
              AddressIcon: {
                Background: `rgba(38, 51, 93, 0.8)`
              },
              PhoneIcon: {
                Background: `rgba(38, 51, 93, 0.8)`
              },
              MailIcon: {
                Background: `rgba(38, 51, 93, 0.8)`
              }
            },
            ContactHomeHeroForm: {
              PlaceHolder: {
                FontWeight: `400`,
                FontSize: `14px`,
                LineHeight: `21px`,
                TextDecoration: `underline`,
                Color: `rgba(32, 32, 32, 0.6)`,
              },
              Input: {
                BorderColor: `rgba(55, 125, 239, 0.2)`,
                Color: `#343F64`,
                FontWeight: `400`,
                FontSize: `14px`,
                LineHeight: `21px`,
              },
              SubmitButton: {
                FontWeight: `400`,
                FontSize: `18px`,
                LineHeight: `24px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: `rgba(38, 51, 93, 0.8)`,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `10px`,
                PaddingX: `40px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: `rgba(38, 51, 93, 0.8)`,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              }
            }
          },
          ContactPage: {
            component: dynamic.contact,
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              BorderBottom: {
                BorderWidth: `2px`,
                Background: `#4E616B`,
                BottomSpace: `-8px`,
              }
            },
            h6: {
              FontWeight: themeGlobal.typography.h6.FontWeight,
              FontSize: themeGlobal.typography.h6.FontSize,
              LineHeight: themeGlobal.typography.h6.LineHeight,
              FontFamily: themeGlobal.typography.h6.FontFamily,
              FontStyle: themeGlobal.typography.h6.FontStyle,
              LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            a: {
              FontWeight: themeGlobal.typography.anchor.FontWeight,
              FontSize: themeGlobal.typography.anchor.FontSize,
              LineHeight: themeGlobal.typography.anchor.LineHeight,
              FontFamily: themeGlobal.typography.anchor.FontFamily,
              FontStyle: themeGlobal.typography.anchor.FontStyle,
              LetterSpacing: themeGlobal.typography.anchor.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.LinkColor,
              Hover: {
                Color: themeGlobal.bodyThemeColor.typography.Hover.LinkColor,
              }
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: `#343F64`,
            },
            ContactHead: {
              MarginBottom: `40px`,
              Alignment: `left`,
            },
            AddressIcon: {
              Background: `#343F64`
            },
            PhoneIcon: {
              Background: `#343F64`
            },
            MailIcon: {
              Background: `#343F64`
            }
          },
        },
        Admission: {
          AdmissionHero: {
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `left`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h4: {
              FontWeight: themeGlobal.typography.h4.FontWeight,
              FontSize: themeGlobal.typography.h4.FontSize,
              LineHeight: themeGlobal.typography.h4.LineHeight,
              FontFamily: themeGlobal.typography.h4.FontFamily,
              FontStyle: themeGlobal.typography.h4.FontStyle,
              LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: `rgba(32, 32, 32, 0.6)`,
            },
            AdmissionHomeHeroHead: {
              Alignment: `left`,
            },
            AdmissionItem: {
              Background: `#FFFFFF`,
            },
            AdmissionItemCaption: {
              Padding: `14px`,
            },
            ApplyNowButton: {
              FontWeight: `600`,
              FontSize: `14px`,
              LineHeight: `20px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: `rgba(38, 51, 93, 0.8)`,
              BorderRadius: `24px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `8px`,
              PaddingX: `16px`,
              MarginTop: `10px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: `transparent`,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            ViewMoreAdmissionHeroButton: {
              FontWeight: `500`,
              FontSize: `15px`,
              LineHeight: `22px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: `rgba(38, 51, 93, 0.8)`,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `8px`,
              PaddingX: `32px`,
              MarginTop: `48px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: `transparent`,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            ViewMoreAdmissionHeroSection: {
              Alignment: `center`
            }
          },
          AdmissionPage: {
            component: dynamic.admission,
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `left`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h4: {
              FontWeight: themeGlobal.typography.h4.FontWeight,
              FontSize: themeGlobal.typography.h4.FontSize,
              LineHeight: themeGlobal.typography.h4.LineHeight,
              FontFamily: themeGlobal.typography.h4.FontFamily,
              FontStyle: themeGlobal.typography.h4.FontStyle,
              LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: `rgba(32, 32, 32, 0.6)`,
            },
            AdmissionHead: {
              Alignment: `left`,
            },
            AdmissionItem: {
              Background: `#FFFFFF`,
            },
            AdmissionItemCaption: {
              Padding: `14px`,
            },
            ApplyNowButton: {
              FontWeight: `600`,
              FontSize: `14px`,
              LineHeight: `20px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: `rgba(38, 51, 93, 0.8)`,
              BorderRadius: `24px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `8px`,
              PaddingX: `16px`,
              MarginTop: `10px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: `transparent`,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            }
          },
        },
        FeeStructure: {
          FeeStructureHero: {
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `left`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            h6: {
              FontWeight: themeGlobal.typography.h6.FontWeight,
              FontSize: themeGlobal.typography.h6.FontSize,
              LineHeight: themeGlobal.typography.h6.LineHeight,
              FontFamily: themeGlobal.typography.h6.FontFamily,
              FontStyle: themeGlobal.typography.h6.FontStyle,
              LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: `rgba(32, 32, 32, 0.6)`,
            },
            FeeStructureHeroHead: {
              MarginBottom: `24px`,
              Alignment: `left`,
            },
            ViewFeeButton: {
              FontWeight: `400`,
              FontSize: `14px`,
              LineHeight: `21px`,
              BorderColor: `transparent`,
              BorderRadius: `0`,
              Color: themeGlobal.bodyThemeColor.typography.LinkColor,
              PaddingY: `0`,
              PaddingX: `0`,
              MarginTop: `8px`,
              TextDecoration: `underline`,
              Hover: {
                BorderColor: `transparent`,
                Color: themeGlobal.bodyThemeColor.typography.Hover.LinkColor,
              }
            },
            ViewMoreFeeStructureHeroButton: {
              FontWeight: `500`,
              FontSize: `15px`,
              LineHeight: `22px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: `rgba(38, 51, 93, 0.8)`,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `8px`,
              PaddingX: `32px`,
              MarginTop: `48px`,
              TextDecoration: `normal`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: `transparent`,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            ViewMoreFeeStructureHeroSection: {
              Alignment: `left`
            }
          },
          FeeStructurePage: {
            component: dynamic.feestructure,
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `left`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            h6: {
              FontWeight: themeGlobal.typography.h6.FontWeight,
              FontSize: themeGlobal.typography.h6.FontSize,
              LineHeight: themeGlobal.typography.h6.LineHeight,
              FontFamily: themeGlobal.typography.h6.FontFamily,
              FontStyle: themeGlobal.typography.h6.FontStyle,
              LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: `rgba(32, 32, 32, 0.6)`,
            },
            FeeStructurePageHead: {
              MarginBottom: `24px`,
              Alignment: `left`,
            },
            ViewFeeButton: {
              FontWeight: `400`,
              FontSize: `14px`,
              LineHeight: `21px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: `transparent`,
              BorderRadius: `0`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `0`,
              PaddingX: `0`,
              MarginTop: `8px`,
              TextDecoration: `underline`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: `transparent`,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
          },
        },
        Notice: {
          NoticeBoardHero: {
            a: {
              FontWeight: themeGlobal.typography.anchor.FontWeight,
              FontSize: themeGlobal.typography.anchor.FontSize,
              LineHeight: themeGlobal.typography.anchor.LineHeight,
              FontFamily: themeGlobal.typography.anchor.FontFamily,
              FontStyle: themeGlobal.typography.anchor.FontStyle,
              LetterSpacing: themeGlobal.typography.anchor.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.LinkColor,
              Hover: {
                Color: themeGlobal.bodyThemeColor.typography.Hover.LinkColor,
              }
            },
            PaddingY: `16px`,
            ContentBox: {
              width: `100%`,
            },
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `left`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            h4: {
              FontWeight: themeGlobal.typography.h4.FontWeight,
              FontSize: themeGlobal.typography.h4.FontSize,
              LineHeight: themeGlobal.typography.h4.LineHeight,
              FontFamily: themeGlobal.typography.h4.FontFamily,
              FontStyle: themeGlobal.typography.h4.FontStyle,
              LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h6: {
              FontWeight: themeGlobal.typography.h6.FontWeight,
              FontSize: themeGlobal.typography.h6.FontSize,
              LineHeight: themeGlobal.typography.h6.LineHeight,
              FontFamily: themeGlobal.typography.h6.FontFamily,
              FontStyle: themeGlobal.typography.h6.FontStyle,
              LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: `rgba(32, 32, 32, 0.6)`,
            },
            MiscellaneousHeroHead: {
              Alignment: `left`,
            },
            MiscellaneousHeroGrid: {
              Background: `rgba(9, 51, 81, 0.1)`,
              PaddingY: `36px`,
              PaddingX: `102px`,
            },
            MiscellaneousItem: {
              Background: `#fff`,
              Padding: `20px`,
            },
            DownloadButton: {
              FontWeight: `400`,
              FontSize: `14px`,
              LineHeight: `21px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: `transparent`,
              BorderRadius: `0`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `0`,
              PaddingX: `0`,
              MarginTop: `8px`,
              TextDecoration: `underline`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: `transparent`,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            ViewMoreMiscellaneousHeroButton: {
              FontWeight: `500`,
              FontSize: `15px`,
              LineHeight: `22px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: `rgba(38, 51, 93, 0.8)`,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `8px`,
              PaddingX: `32px`,
              MarginTop: `48px`,
              TextDecoration: `normal`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: `transparent`,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            ViewMoreMiscellaneousHeroSection: {
              Alignment: `center`
            }
          },
        },
        Testimonial: {
          TestimonialHero: {
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `left`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            h4: {
              FontWeight: themeGlobal.typography.h4.FontWeight,
              FontSize: themeGlobal.typography.h4.FontSize,
              LineHeight: themeGlobal.typography.h4.LineHeight,
              FontFamily: themeGlobal.typography.h4.FontFamily,
              FontStyle: themeGlobal.typography.h4.FontStyle,
              LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h5: {
              FontWeight: themeGlobal.typography.h5.FontWeight,
              FontSize: themeGlobal.typography.h5.FontSize,
              LineHeight: themeGlobal.typography.h5.LineHeight,
              FontFamily: themeGlobal.typography.h5.FontFamily,
              FontStyle: themeGlobal.typography.h5.FontStyle,
              LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            h6: {
              FontWeight: themeGlobal.typography.h6.FontWeight,
              FontSize: themeGlobal.typography.h6.FontSize,
              LineHeight: themeGlobal.typography.h6.LineHeight,
              FontFamily: themeGlobal.typography.h6.FontFamily,
              FontStyle: themeGlobal.typography.h6.FontStyle,
              LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: `rgba(32, 32, 32, 0.6)`,
            },
            TestimonialHeroHead: {
              Alignment: `left`,
            },
            TestimonialHeroGrid: {
              Background: `rgba(9, 51, 81, 0.1)`,
              PaddingY: `36px`,
              PaddingX: `102px`,
            },
            TestimonialItem: {
              Background: `#fff`,
              Padding: `20px`,
            },
            ViewMoreTestimonialHeroButton: {
              FontWeight: `500`,
              FontSize: `15px`,
              LineHeight: `22px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: `rgba(38, 51, 93, 0.8)`,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `8px`,
              PaddingX: `32px`,
              MarginTop: `48px`,
              TextDecoration: `normal`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: `transparent`,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            ViewMoreTestimonialHeroSection: {
              Alignment: `center`
            },

            Dots: {
              Color: `rgba(32, 32, 32, 0.5)`,
              Active: {
                Color: `rgba(38, 51, 93, 0.8)`,
              }
            },
            SlickArrowColor: {
              Color: `rgba(38, 51, 93, 0.8)`,
              Hover: {
                Color: `rgba(38, 51, 93, 0.8)`,
              }
            },
          },
        },
        Faqs: {
          FaqsHero: {
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h6: {
              FontWeight: themeGlobal.typography.h6.FontWeight,
              FontSize: themeGlobal.typography.h6.FontSize,
              LineHeight: themeGlobal.typography.h6.LineHeight,
              FontFamily: themeGlobal.typography.h6.FontFamily,
              FontStyle: themeGlobal.typography.h6.FontStyle,
              LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: `#343F64`,
            },

            FaqsHomeHeroHead: {
              MarginBottom: `40px`,
              Alignment: `center`,
            },
            FaqListItem: {
              BorderColor: `#4E616B`,
            },
            ViewMoreFaqsHeroButton: {
              FontWeight: `400`,
              FontSize: `18px`,
              LineHeight: `24px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: `#343F64`,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `10px`,
              PaddingX: `40px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: `#343F64`,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            ViewMoreFaqsHeroSection: {
              Alignment: `left`,
              MarginTop: `32px`,
            }
          },
          FaqsPage: {
            component: dynamic.faqs,
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              TextDecoration: `underline`,
            },
            h6: {
              FontWeight: themeGlobal.typography.h6.FontWeight,
              FontSize: themeGlobal.typography.h6.FontSize,
              LineHeight: themeGlobal.typography.h6.LineHeight,
              FontFamily: themeGlobal.typography.h6.FontFamily,
              FontStyle: themeGlobal.typography.h6.FontStyle,
              LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: `#4E616B`,
            },

            FaqsHead: {
              MarginBottom: `40px`,
              Alignment: `center`,
            },
            FaqListItem: {
              BorderColor: `rgba(52, 63, 100, 0.1)`,
            },
          },
        },
        Vacancy: {
          VacancyHero: {
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `left`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            h4: {
              FontWeight: themeGlobal.typography.h4.FontWeight,
              FontSize: themeGlobal.typography.h4.FontSize,
              LineHeight: themeGlobal.typography.h4.LineHeight,
              FontFamily: themeGlobal.typography.h4.FontFamily,
              FontStyle: themeGlobal.typography.h4.FontStyle,
              LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: `rgba(32, 32, 32, 0.6)`,
            },
            VacancyHeroHead: {
              Alignment: `left`,
            },
            VacancyItem: {
              Background: `#FFFFFF`,
            },
            VacancyItemCaption: {
              PaddingY: `18px`,
              PaddingX: `14px`,
            },
            ApplyNowButton: {
              FontWeight: `600`,
              FontSize: `14px`,
              LineHeight: `20px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: `rgba(38, 51, 93, 0.8)`,
              BorderRadius: `24px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `8px`,
              PaddingX: `16px`,
              MarginTop: `10px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: `transparent`,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            ViewMoreVacancyHeroButton: {
              FontWeight: `500`,
              FontSize: `15px`,
              LineHeight: `22px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: `rgba(38, 51, 93, 0.8)`,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `8px`,
              PaddingX: `32px`,
              MarginTop: `48px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: `transparent`,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            ViewMoreVacancyHeroSection: {
              Alignment: `center`
            }
          },
          VacancyPage: {
            component: dynamic.vacancy,
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `left`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            h4: {
              FontWeight: themeGlobal.typography.h4.FontWeight,
              FontSize: themeGlobal.typography.h4.FontSize,
              LineHeight: themeGlobal.typography.h4.LineHeight,
              FontFamily: themeGlobal.typography.h4.FontFamily,
              FontStyle: themeGlobal.typography.h4.FontStyle,
              LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: `rgba(32, 32, 32, 0.6)`,
            },
            VacancyHeroHead: {
              Alignment: `center`,
            },
            VacancyItem: {
              Background: `#FFFFFF`,
            },
            VacancyItemCaption: {
              PaddingY: `18px`,
              PaddingX: `14px`,
            },
            ApplyNowButton: {
              FontWeight: `600`,
              FontSize: `14px`,
              LineHeight: `20px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: `rgba(38, 51, 93, 0.8)`,
              BorderRadius: `24px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `8px`,
              PaddingX: `16px`,
              MarginTop: `10px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: `transparent`,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            ViewMoreVacancyHeroButton: {
              FontWeight: `500`,
              FontSize: `15px`,
              LineHeight: `22px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: `rgba(38, 51, 93, 0.8)`,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `8px`,
              PaddingX: `32px`,
              MarginTop: `48px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: `transparent`,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            ViewMoreVacancyHeroSection: {
              Alignment: `center`
            }
          },
        },
        Announcement: {
          AnnouncementHero: {
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `left`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            h6: {
              FontWeight: themeGlobal.typography.h6.FontWeight,
              FontSize: themeGlobal.typography.h6.FontSize,
              LineHeight: themeGlobal.typography.h6.LineHeight,
              FontFamily: themeGlobal.typography.h6.FontFamily,
              FontStyle: themeGlobal.typography.h6.FontStyle,
              LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
              Alignment: `left`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            ViewMoreAnnouncementButton: {
              FontWeight: `500`,
              FontSize: `15px`,
              LineHeight: `22px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: `rgba(38, 51, 93, 0.8)`,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `8px`,
              PaddingX: `32px`,
              MarginTop: `48px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: `transparent`,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            AnnouncementCaption: {
              Background: `rgba(0, 0, 0, 0.5)`,
            }
          },
          AnnouncementPage: {
            component: dynamic.announcements,
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `left`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            h6: {
              FontWeight: themeGlobal.typography.h6.FontWeight,
              FontSize: themeGlobal.typography.h6.FontSize,
              LineHeight: themeGlobal.typography.h6.LineHeight,
              FontFamily: themeGlobal.typography.h6.FontFamily,
              FontStyle: themeGlobal.typography.h6.FontStyle,
              LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
              Alignment: `left`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            AnnouncementCaption: {
              Background: `rgba(0, 0, 0, 0.5)`,
            }
          },
        },
        Global: {
          Modal: {
            ModalCloseWtc: {
              Color: themeGlobal.color.alpha,
              Hover: {
                Color: themeGlobal.color.beta,
              }
            },
            ModalHeadWtc: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                Alignment: `left`,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
                Alignment: `left`,
              }
            },
            ModalBodyWTC: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                Alignment: `left`,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
                Alignment: `left`,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: themeGlobal.color.alphaSemiLight,
                Alignment: `left`,
              }
            }
          },
          scrollbar: {
            scrollbarWidth: '10px',
            scrollbarTrackBackground: '#000',
            scrollbarThumbBorderRadius: '0',
            scrollbarThumbBackground: themeGlobal.color.alpha,
            scrollbarThumbBackgroundHover: themeGlobal.color.beta,
          },
          body: {
            bodyBackground: themeGlobal.bodyThemeColor.Background,
            bodyFont: `'Poppins', sans - serif`,
            bodyFontSize: '16px',
            bodyFontWeight: '600',
            bodyColor: '#8B417D',
            bodyLetterSpacing: 'normal',
          },
          container: {
            containerMaxWidth: '1140px',
          }
        },
      }
      dispatch(updateDynamicWebsiteThemeTemplate({ ...theme, themeGlobal: themeGlobal }))
    } else {
      let theme = {
        Header: {
          component: dynamic.header,
          Background: themeGlobal.headerThemeColor.Background,
          Logo: {
            Width: themeGlobal.headerThemeUtilities.Logo.Width,
            Height: themeGlobal.headerThemeUtilities.Logo.Height,
          },
          h4: {
            FontSize: themeGlobal.headerThemeTypo.h4.FontSize,
            FontWeight: themeGlobal.headerThemeTypo.h4.FontWeight,
            LineHeight: themeGlobal.headerThemeTypo.h4.LineHeight,
            FontFamily: themeGlobal.headerThemeTypo.h4.FontFamily,
            FontStyle: themeGlobal.headerThemeTypo.h4.FontStyle,
            LetterSpacing: themeGlobal.headerThemeTypo.h4.LetterSpacing,
            Color: themeGlobal.headerThemeColor.h4.Color,
            TextTransform: themeGlobal.headerThemeUtilities.h4.TextTransform,
            TextAlignment: themeGlobal.headerThemeUtilities.h4.TextAlignment,
          },
          h5: {
            FontSize: themeGlobal.headerThemeTypo.h5.FontSize,
            FontWeight: themeGlobal.headerThemeTypo.h5.FontWeight,
            LineHeight: themeGlobal.headerThemeTypo.h5.LineHeight,
            FontFamily: themeGlobal.headerThemeTypo.h5.FontFamily,
            FontStyle: themeGlobal.headerThemeTypo.h5.FontStyle,
            LetterSpacing: themeGlobal.headerThemeTypo.h5.LetterSpacing,
            Color: themeGlobal.headerThemeColor.h5.Color,
            TextTransform: themeGlobal.headerThemeUtilities.h5.TextTransform,
            TextAlignment: themeGlobal.headerThemeUtilities.h5.TextAlignment,
          },
          NavAuth: {
            ButtonLogin: {
              FontSize: themeGlobal.headerThemeTypo.Button.FontSize,
              FontWeight: themeGlobal.headerThemeTypo.Button.FontWeight,
              LineHeight: themeGlobal.headerThemeTypo.Button.LineHeight,
              FontFamily: themeGlobal.headerThemeTypo.Button.FontFamily,
              FontStyle: themeGlobal.headerThemeTypo.Button.FontStyle,
              LetterSpacing: themeGlobal.headerThemeTypo.Button.LetterSpacing,
              PaddingY: themeGlobal.headerThemeUtilities.Button.PaddingY,
              PaddingX: themeGlobal.headerThemeUtilities.Button.PaddingX,
              Background: themeGlobal.headerThemeColor.ButtonLogin.Background,
              BorderColor: themeGlobal.headerThemeColor.ButtonLogin.BorderColor,
              BorderRadius: themeGlobal.headerThemeUtilities.Button.BorderRadius,
              Color: themeGlobal.headerThemeColor.ButtonLogin.Color,
              Hover: {
                Background: themeGlobal.headerThemeColor.ButtonLogin.Hover.Background,
                Color: themeGlobal.headerThemeColor.ButtonLogin.Hover.Color,
                BorderColor: themeGlobal.headerThemeColor.ButtonLogin.Hover.BorderColor,
              },
              Active: {
                Background: themeGlobal.headerThemeColor.ButtonLogin.Active.Background,
                Color: themeGlobal.headerThemeColor.ButtonLogin.Active.Color,
                BorderColor: themeGlobal.headerThemeColor.ButtonLogin.Active.BorderColor,
              }
            },
            ButtonSignup: {
              FontSize: themeGlobal.headerThemeTypo.Button.FontSize,
              FontWeight: themeGlobal.headerThemeTypo.Button.FontWeight,
              LineHeight: themeGlobal.headerThemeTypo.Button.LineHeight,
              FontFamily: themeGlobal.headerThemeTypo.Button.FontFamily,
              FontStyle: themeGlobal.headerThemeTypo.Button.FontStyle,
              LetterSpacing: themeGlobal.headerThemeTypo.Button.LetterSpacing,
              PaddingY: themeGlobal.headerThemeUtilities.Button.PaddingY,
              PaddingX: themeGlobal.headerThemeUtilities.Button.PaddingX,
              Background: themeGlobal.headerThemeColor.ButtonSignup.Background,
              BorderColor: themeGlobal.headerThemeColor.ButtonSignup.BorderColor,
              BorderRadius: themeGlobal.headerThemeUtilities.Button.BorderRadius,
              Color: themeGlobal.headerThemeColor.ButtonSignup.Color,
              Hover: {
                Background: themeGlobal.headerThemeColor.ButtonSignup.Hover.Background,
                Color: themeGlobal.headerThemeColor.ButtonSignup.Hover.Color,
                BorderColor: themeGlobal.headerThemeColor.ButtonSignup.Hover.BorderColor,
              },
              Active: {
                Background: themeGlobal.headerThemeColor.ButtonSignup.Active.Background,
                Color: themeGlobal.headerThemeColor.ButtonSignup.Active.Color,
                BorderColor: themeGlobal.headerThemeColor.ButtonSignup.Active.BorderColor,
              }
            }
          },
          NavMenuWrapper: {
            Background: themeGlobal.headerThemeColor.NavMenu.Background,
            NavMenuCustom: {
              MenuGap: themeGlobal.headerThemeUtilities.NavMenu.MenuGap,
              FontSize: themeGlobal.headerThemeTypo.NavMenu.FontSize,
              FontWeight: themeGlobal.headerThemeTypo.NavMenu.FontWeight,
              LineHeight: themeGlobal.headerThemeTypo.NavMenu.LineHeight,
              FontFamily: themeGlobal.headerThemeTypo.NavMenu.FontFamily,
              FontStyle: themeGlobal.headerThemeTypo.NavMenu.FontStyle,
              LetterSpacing: themeGlobal.headerThemeTypo.NavMenu.LetterSpacing,
              Color: themeGlobal.headerThemeColor.NavMenu.Color,
              Hover: {
                Color: themeGlobal.headerThemeColor.NavMenu.Hover.Color,
              },
              NavMenuScrollIcon: {
                BorderColor: themeGlobal.headerThemeColor.NavMenu.ScrollIcon.Color,
                Hover: {
                  BorderColor: themeGlobal.headerThemeColor.NavMenu.ScrollIcon.Hover.Color,
                }
              }
            }
          }
        },
        Footer: {
          component: dynamic.footer,
          Background: themeGlobal.footerThemeColor.Background,
          Logo: {
            Background: themeGlobal.footerThemeColor.Logo.Background,
            Width: themeGlobal.footerThemeUtilities.Logo.Width,
            Height: themeGlobal.footerThemeUtilities.Logo.Height,
            BorderRadius: themeGlobal.footerThemeUtilities.Logo.BorderRadius,
            PaddingX: themeGlobal.footerThemeUtilities.Logo.PaddingX,
            PaddingY: themeGlobal.footerThemeUtilities.Logo.PaddingY,
          },
          h4: {
            FontWeight: themeGlobal.footerThemeTypo.h4.FontWeight,
            FontSize: themeGlobal.footerThemeTypo.h4.FontSize,
            LineHeight: themeGlobal.footerThemeTypo.h4.LineHeight,
            FontFamily: themeGlobal.footerThemeTypo.h4.FontFamily,
            FontStyle: themeGlobal.footerThemeTypo.h4.FontStyle,
            LetterSpacing: themeGlobal.footerThemeTypo.h4.LetterSpacing,
            Color: themeGlobal.footerThemeColor.h4.Color,
            TextTransform: themeGlobal.footerThemeUtilities.h4.TextTransform,
            TextAlignment: themeGlobal.footerThemeUtilities.h4.TextAlignment,
          },
          h5: {
            FontWeight: themeGlobal.footerThemeTypo.h5.FontWeight,
            FontSize: themeGlobal.footerThemeTypo.h5.FontSize,
            LineHeight: themeGlobal.footerThemeTypo.h5.LineHeight,
            FontFamily: themeGlobal.footerThemeTypo.h5.FontFamily,
            FontStyle: themeGlobal.footerThemeTypo.h5.FontStyle,
            LetterSpacing: themeGlobal.footerThemeTypo.h5.LetterSpacing,
            Color: themeGlobal.footerThemeColor.h5.Color,
            TextTransform: themeGlobal.footerThemeUtilities.h5.TextTransform,
            TextAlignment: themeGlobal.footerThemeUtilities.h5.TextAlignment,
          },
          h6: {
            FontWeight: themeGlobal.footerThemeTypo.h6.FontWeight,
            FontSize: themeGlobal.footerThemeTypo.h6.FontSize,
            LineHeight: themeGlobal.footerThemeTypo.h6.LineHeight,
            FontFamily: themeGlobal.footerThemeTypo.h6.FontFamily,
            FontStyle: themeGlobal.footerThemeTypo.h6.FontStyle,
            LetterSpacing: themeGlobal.footerThemeTypo.h6.LetterSpacing,
            Color: themeGlobal.footerThemeColor.h6.Color,
            TextTransform: themeGlobal.footerThemeUtilities.h6.TextTransform,
            TextAlignment: themeGlobal.footerThemeUtilities.h6.TextAlignment,
          },
          a: {
            FontWeight: themeGlobal.footerThemeTypo.a.FontWeight,
            FontSize: themeGlobal.footerThemeTypo.a.FontSize,
            LineHeight: themeGlobal.footerThemeTypo.a.LineHeight,
            FontFamily: themeGlobal.footerThemeTypo.a.FontFamily,
            FontStyle: themeGlobal.footerThemeTypo.a.FontStyle,
            LetterSpacing: themeGlobal.footerThemeTypo.a.LetterSpacing,
            Color: themeGlobal.footerThemeColor.a.Color,
            TextTransform: themeGlobal.footerThemeUtilities.a.TextTransform,
            TextAlignment: themeGlobal.footerThemeUtilities.a.TextAlignment,
            Hover: {
              Color: themeGlobal.footerThemeColor.a.Hover.Color,
            }
          },
          MapContainer: {
            Height: themeGlobal.footerThemeUtilities.Map.Height,
          },
          SocialMediaIconListItem: {
            Width: themeGlobal.footerThemeUtilities.SocialMediaIcon.Width,
            Height: themeGlobal.footerThemeUtilities.SocialMediaIcon.Height,
          },
          CopyrightSectionItem: {
            FontWeight: themeGlobal.footerThemeTypo.Copyright.FontWeight,
            FontSize: themeGlobal.footerThemeTypo.Copyright.FontSize,
            LineHeight: themeGlobal.footerThemeTypo.Copyright.LineHeight,
            FontFamily: themeGlobal.footerThemeTypo.Copyright.FontFamily,
            FontStyle: themeGlobal.footerThemeTypo.Copyright.FontStyle,
            LetterSpacing: themeGlobal.footerThemeTypo.Copyright.LetterSpacing,
            Color: themeGlobal.footerThemeColor.Copyright.Color,
          }
        },
        Banner: {
          Background: themeGlobal.color.base,
          a: {
            FontWeight: themeGlobal.typography.anchor.FontWeight,
            FontSize: themeGlobal.typography.anchor.FontSize,
            LineHeight: themeGlobal.typography.anchor.LineHeight,
            FontFamily: themeGlobal.typography.anchor.FontFamily,
            FontStyle: themeGlobal.typography.anchor.FontStyle,
            LetterSpacing: themeGlobal.typography.anchor.LetterSpacing,
            Background: themeGlobal.bodyThemeColor.Button.Background,
            BorderColor: themeGlobal.color.alpha,
            BorderRadius: `4px`,
            Color: themeGlobal.bodyThemeColor.Button.Color,
            PaddingY: `10px`,
            PaddingX: `40px`,
            Hover: {
              Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
              BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
              Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
            }
          },
          h1: {
            FontWeight: themeGlobal.typography.h1.FontWeight,
            FontSize: themeGlobal.typography.h1.FontSize,
            LineHeight: themeGlobal.typography.h1.LineHeight,
            FontFamily: themeGlobal.typography.h1.FontFamily,
            FontStyle: themeGlobal.typography.h1.FontStyle,
            LetterSpacing: themeGlobal.typography.h1.LetterSpacing,
            Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
          },
          h3: {
            FontWeight: themeGlobal.typography.h3.FontWeight,
            FontSize: themeGlobal.typography.h3.FontSize,
            LineHeight: themeGlobal.typography.h3.LineHeight,
            FontFamily: themeGlobal.typography.h3.FontFamily,
            FontStyle: themeGlobal.typography.h3.FontStyle,
            LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
            Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
          },
          Dots: {
            Color: themeGlobal.color.alpha,
            Active: {
              Color: themeGlobal.color.universal,
            }
          },
          SliderImage: {
            Height: `576px`,
          },
          SlickArrowColor: {
            Color: themeGlobal.color.universal,
            Hover: {
              Color: themeGlobal.color.beta,
            }
          },
          BannerOverlay: {
            Top: `171px`,
            width: `510px`,
            Background: themeGlobal.color.alphaLight,
            Padding: `36px`,
            BorderRadius: `0`,
          },
        },
        AboutUs: {
          AboutUsHero: {
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              Alignment: `center`,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              Alignment: `center`,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.Color,
              Alignment: `center`,
            },
            SectionHead: {
              MarginBottom: `40px`,
              Alignment: `center`,
            },
            BorderBottom: {
              BorderWidth: `2px`,
              Background: themeGlobal.color.alpha,
              BottomSpace: `-8px`,
            },
            ViewMoreButton: {
              FontWeight: `400`,
              FontSize: `18px`,
              LineHeight: `24px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: themeGlobal.color.alpha,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `10px`,
              PaddingX: `40px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            ViewMoreSection: {
              MarginTop: `32px`,
            }
          },
          AboutUsPage: {
            component: dynamic.aboutus,
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,

            },
            BorderBottom: {
              BorderWidth: `2px`,
              Background: themeGlobal.color.alpha,
              BottomSpace: `-8px`,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.Color,
            },

            SectionHead: {
              MarginBottom: `40px`,
              Alignment: `center`,
              h3: {
                BorderBottom: {
                  BorderWidth: `2px`,
                  Background: themeGlobal.color.alpha,
                  BottomSpace: `-8px`,
                },
              }
            },
            AboutSection: {
              Background: themeGlobal.color.alphaLight,
            },
            MessageDeskSection: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
                BorderBottom: {
                  BorderWidth: `2px`,
                  Background: themeGlobal.color.alpha,
                  BottomSpace: `-8px`,
                }
              },
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.typography.h4.FontFamily,
                FontStyle: themeGlobal.typography.h4.FontStyle,
                LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              },
              h5: {
                FontWeight: themeGlobal.typography.h5.FontWeight,
                FontSize: themeGlobal.typography.h5.FontSize,
                LineHeight: themeGlobal.typography.h5.LineHeight,
                FontFamily: themeGlobal.typography.h5.FontFamily,
                FontStyle: themeGlobal.typography.h5.FontStyle,
                LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.Color,
              },
              MessageDeskSectionHead: {
                MarginBottom: `40px`,
                Alignment: `center`,
                h3: {
                  BorderBottom: {
                    BorderWidth: `2px`,
                    Background: themeGlobal.color.alpha,
                    BottomSpace: `-8px`,
                  },
                }
              },
              MessageDeskProfileImage: {
                Width: `447px`,
                Height: `495px`,
                BorderRadius: `20px`,
              },
            },
            MissionSection: {
              Background: themeGlobal.color.alphaLight,
              BorderRadius: `20px`,
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                Alignment: `center`,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                Alignment: `center`,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.Color,
                Alignment: `center`,
              },
              MissionHead: {
                MarginBottom: `40px`,
                Alignment: `center`,
                h3: {
                  BorderBottom: {
                    BorderWidth: `2px`,
                    Background: themeGlobal.color.alpha,
                    BottomSpace: `-8px`,
                  },
                }
              }
            },
            VisionSection: {
              Background: themeGlobal.color.alphaLight,
              BorderRadius: `20px`,
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                Alignment: `center`,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                Alignment: `center`,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.Color,
                Alignment: `center`,
              },
              VisionHead: {
                MarginBottom: `40px`,
                Alignment: `center`,
                h3: {
                  BorderBottom: {
                    BorderWidth: `2px`,
                    Background: themeGlobal.color.alpha,
                    BottomSpace: `-8px`,
                  },
                }
              }
            }

          },
        },
        Notice: {
          NoticeBoardHero: {
            a: {
              FontWeight: themeGlobal.typography.anchor.FontWeight,
              FontSize: themeGlobal.typography.anchor.FontSize,
              LineHeight: themeGlobal.typography.anchor.LineHeight,
              FontFamily: themeGlobal.typography.anchor.FontFamily,
              FontStyle: themeGlobal.typography.anchor.FontStyle,
              LetterSpacing: themeGlobal.typography.anchor.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.LinkColor,
              Hover: {
                Color: themeGlobal.bodyThemeColor.typography.Hover.LinkColor ? themeGlobal.bodyThemeColor.typography.Hover.LinkColor : "",
              }
            },
            PaddingY: `16px`,
            ContentBox: {
              width: `100%`,
            },
          },
        },
        Principal: {
          PrincipalHero: {
            h4: {
              FontWeight: themeGlobal.typography.h4.FontWeight,
              FontSize: themeGlobal.typography.h4.FontSize,
              LineHeight: themeGlobal.typography.h4.LineHeight,
              FontFamily: themeGlobal.typography.h4.FontFamily,
              FontStyle: themeGlobal.typography.h4.FontStyle,
              LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h5: {
              FontWeight: themeGlobal.typography.h5.FontWeight,
              FontSize: themeGlobal.typography.h5.FontSize,
              LineHeight: themeGlobal.typography.h5.LineHeight,
              FontFamily: themeGlobal.typography.h5.FontFamily,
              FontStyle: themeGlobal.typography.h5.FontStyle,
              LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.Color,
              PaddingTop: `24px`,
            },
            PrincipalProfileImage: {
              Width: `450px`,
              Height: `500px`,
              BorderRadius: `20px`,
            },
            ViewMoreMessageButton: {
              FontWeight: `400`,
              FontSize: `18px`,
              LineHeight: `24px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: themeGlobal.color.alpha,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `10px`,
              PaddingX: `40px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            ViewMoreButtonSection: {
              MarginTop: `48px`,
            }
          }
        },
        Team: {
          TeamHero: {
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            h4: {
              FontWeight: themeGlobal.typography.h4.FontWeight,
              FontSize: themeGlobal.typography.h4.FontSize,
              LineHeight: themeGlobal.typography.h4.LineHeight,
              FontFamily: themeGlobal.typography.h4.FontFamily,
              FontStyle: themeGlobal.typography.h4.FontStyle,
              LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              MarginBottom: `10px`,
            },
            BorderBottom: {
              BorderWidth: `2px`,
              Background: themeGlobal.color.alpha,
              BottomSpace: `-8px`,
            },
            h5: {
              FontWeight: themeGlobal.typography.h5.FontWeight,
              FontSize: themeGlobal.typography.h5.FontSize,
              LineHeight: themeGlobal.typography.h5.LineHeight,
              FontFamily: themeGlobal.typography.h5.FontFamily,
              FontStyle: themeGlobal.typography.h5.FontStyle,
              LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            TeamAlbumHomeCard: {
              BorderWidth: `2px`,
              BorderColor: themeGlobal.color.alpha,
              BorderRadius: `24px`,
              Height: `381px`,
              TeamAlbumHomeCardOverlay: {
                PaddingY: `10px`,
                PaddingX: `32px`,
                PrimaryBorderBottom: {
                  Height: `1px`,
                  Background: themeGlobal.color.alpha,
                  Bottom: `-5px`,
                  MarginY: "4px"
                },
              }
            },
            ViewMoreTeamButton: {
              FontWeight: `400`,
              FontSize: `18px`,
              LineHeight: `24px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: themeGlobal.color.alpha,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `10px`,
              PaddingX: `40px`,
              MarginTop: `48px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            TeamAlbumHomeHeroHead: {
              MarginBottom: '48px',
              Alignment: 'center',
              h3: {
                BorderBottom: {
                  BorderWidth: `2px`,
                  Background: themeGlobal.color.alpha,
                  BottomSpace: `-8px`,
                },
              }
            }
          },
          TeamPage: {
            component: dynamic.team,
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            BorderBottom: {
              BorderWidth: `2px`,
              Background: themeGlobal.color.alpha,
              BottomSpace: `-8px`,
            },
            h4: {
              FontWeight: themeGlobal.typography.h4.FontWeight,
              FontSize: themeGlobal.typography.h4.FontSize,
              LineHeight: themeGlobal.typography.h4.LineHeight,
              FontFamily: themeGlobal.typography.h4.FontFamily,
              FontStyle: themeGlobal.typography.h4.FontStyle,
              LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              MarginBottom: `10px`,
            },
            h5: {
              FontWeight: themeGlobal.typography.h5.FontWeight,
              FontSize: themeGlobal.typography.h5.FontSize,
              LineHeight: themeGlobal.typography.h5.LineHeight,
              FontFamily: themeGlobal.typography.h5.FontFamily,
              FontStyle: themeGlobal.typography.h5.FontStyle,
              LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            TeamAlbumCard: {
              BorderWidth: `2px`,
              BorderColor: themeGlobal.color.alpha,
              BorderRadius: `24px`,
              Height: `381px`,
              TeamAlbumCardOverlay: {
                PaddingY: `10px`,
                PaddingX: `32px`,
                PrimaryBorderBottom: {
                  Height: `1px`,
                  Background: themeGlobal.color.alpha,
                  Bottom: `-5px`,
                },
              }
            },
          },
        },
        Facility: {
          FacilitiesHero: {
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            BorderBottom: {
              BorderWidth: `2px`,
              Background: themeGlobal.color.alpha,
              BottomSpace: `-8px`,
            },
            h4: {
              FontWeight: themeGlobal.typography.h4.FontWeight,
              FontSize: themeGlobal.typography.h4.FontSize,
              LineHeight: themeGlobal.typography.h4.LineHeight,
              FontFamily: themeGlobal.typography.h4.FontFamily,
              FontStyle: themeGlobal.typography.h4.FontStyle,
              LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.Color,
              MarginTop: `20px`,
            },
            ViewMoreFacilitiesButton: {
              FontWeight: `400`,
              FontSize: `18px`,
              LineHeight: `24px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: themeGlobal.color.alpha,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `10px`,
              PaddingX: `40px`,
              MarginTop: `48px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            SlickArrowColor: {
              Color: themeGlobal.color.alphaSemiLight,
              Hover: {
                Color: themeGlobal.color.alpha,
              }
            },
            FacilitiesSliderDescription: {
              Padding: `24px`,
              Background: `rgba(32,
              32,
              32,
              0.1)`,
              BorderBottom: {
                Height: `2px`,
                Background: themeGlobal.color.alphaSemiLight,
                BottomSpace: `-10px`,
              },
            },
          },
          FacilityPage: {
            component: dynamic.services,
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            BorderBottom: {
              BorderWidth: `2px`,
              Background: themeGlobal.color.alpha,
              BottomSpace: `-8px`,
            },
            h4: {
              FontWeight: themeGlobal.typography.h4.FontWeight,
              FontSize: themeGlobal.typography.h4.FontSize,
              LineHeight: themeGlobal.typography.h4.LineHeight,
              FontFamily: themeGlobal.typography.h4.FontFamily,
              FontStyle: themeGlobal.typography.h4.FontStyle,
              LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
              Alignment: `left`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            li: {
              FontWeight: `400`,
              FontSize: `16px`,
              LineHeight: `28px`,
              Alignment: `left`,
              Color: themeGlobal.bodyThemeColor.typography.Color,
            },
            FacilityListItemImage: {
              Width: `320px`,
              Height: `374px`,
              BorderTopLeftRadius: `25px`,
              BorderBottomLeftRadius: `25px`,
            },
            FacilityListItemContent: {
              Padding: `32px`,
              Background: themeGlobal.color.alphaLight,
              BorderTopRightRadius: `25px`,
              BorderBottomRightRadius: `25px`,
              BorderBottom: {
                Height: `2px`,
                Background: themeGlobal.color.alphaSemiLight,
              },
            }
          },
        },
        Gallery: {
          GalleryHero: {
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            BorderBottom: {
              BorderWidth: `2px`,
              Background: themeGlobal.color.alpha,
              BottomSpace: `-8px`,
            },
            ViewMoreGalleryButton: {
              FontWeight: `400`,
              FontSize: `18px`,
              LineHeight: `24px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: themeGlobal.color.alpha,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `10px`,
              PaddingX: `40px`,
              MarginTop: `48px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            }
          },
          GalleryPage: {
            component: dynamic.gallery,
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            BorderBottom: {
              BorderWidth: `2px`,
              Background: themeGlobal.color.alpha,
              BottomSpace: `-8px`,
            },
            h4: {
              FontWeight: themeGlobal.typography.h4.FontWeight,
              FontSize: themeGlobal.typography.h4.FontSize,
              LineHeight: themeGlobal.typography.h4.LineHeight,
              FontFamily: themeGlobal.typography.h4.FontFamily,
              FontStyle: themeGlobal.typography.h4.FontStyle,
              LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            }
          },
          GalleryListSection: {
            component: dynamic.gallery,
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h4: {
              FontWeight: themeGlobal.typography.h4.FontWeight,
              FontSize: themeGlobal.typography.h4.FontSize,
              LineHeight: themeGlobal.typography.h4.LineHeight,
              FontFamily: themeGlobal.typography.h4.FontFamily,
              FontStyle: themeGlobal.typography.h4.FontStyle,
              LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            BorderBottom: {
              BorderWidth: `2px`,
              Background: themeGlobal.color.alpha,
              BottomSpace: `-8px`,
            },
            GalleryListFilter: {
              MarginBottom: `40px`,
            },
            GalleryListFilterButton: {
              FontWeight: `500`,
              FontSize: `15px`,
              LineHeight: `18px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: themeGlobal.color.alpha,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `8px`,
              PaddingX: `24px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              },
              Active: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            }
          },
        },
        Contact: {
          ContactHero: {
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.Color,
              MarginBottom: `10px`,
            },
            ContactHomeHeroAddress: {
              AddressIcon: {
                Background: themeGlobal.color.alpha
              },
              PhoneIcon: {
                Background: themeGlobal.color.alpha
              },
              MailIcon: {
                Background: themeGlobal.color.alpha
              }
            },
            ContactHomeHeroForm: {
              PlaceHolder: {
                FontWeight: `400`,
                FontSize: `14px`,
                LineHeight: `21px`,
                TextDecoration: `underline`,
                Color: themeGlobal.color.baseSemiLight,
              },
              Input: {
                BorderColor: themeGlobal.color.alphaSemiLight,
                Color: themeGlobal.color.alpha,
                FontWeight: `400`,
                FontSize: `14px`,
                LineHeight: `21px`,
              },
              SubmitButton: {
                FontWeight: `400`,
                FontSize: `18px`,
                LineHeight: `24px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: themeGlobal.color.alpha,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `10px`,
                PaddingX: `40px`,
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              }
            }
          },
          ContactPage: {
            component: dynamic.contact,
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              Alignment: `center`,
              BorderBottom: {
                BorderWidth: `2px`,
                Background: themeGlobal.color.alphaSemiLight,
                BottomSpace: `-8px`,
              }
            },
            BorderBottom: {
              BorderWidth: `2px`,
              Background: themeGlobal.color.alphaSemiLight,
              BottomSpace: `-8px`,
            },
            h6: {
              FontWeight: themeGlobal.typography.h6.FontWeight,
              FontSize: themeGlobal.typography.h6.FontSize,
              LineHeight: themeGlobal.typography.h6.LineHeight,
              FontFamily: themeGlobal.typography.h6.FontFamily,
              FontStyle: themeGlobal.typography.h6.FontStyle,
              LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            a: {
              FontWeight: themeGlobal.typography.anchor.FontWeight,
              FontSize: themeGlobal.typography.anchor.FontSize,
              LineHeight: themeGlobal.typography.anchor.LineHeight,
              FontFamily: themeGlobal.typography.anchor.FontFamily,
              FontStyle: themeGlobal.typography.anchor.FontStyle,
              LetterSpacing: themeGlobal.typography.anchor.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.LinkColor,
              Hover: {
                Color: themeGlobal.bodyThemeColor.typography.Hover.LinkColor,
              }
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.Color,
            },
            ContactHead: {
              MarginBottom: `40px`,
              Alignment: `left`,
            },
            AddressIcon: {
              Background: themeGlobal.color.alpha
            },
            PhoneIcon: {
              Background: themeGlobal.color.alpha
            },
            MailIcon: {
              Background: themeGlobal.color.alpha
            }
          },
        },
        Admission: {
          AdmissionHero: {
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
            },
            h4: {
              FontWeight: themeGlobal.typography.h4.FontWeight,
              FontSize: themeGlobal.typography.h4.FontSize,
              LineHeight: themeGlobal.typography.h4.LineHeight,
              FontFamily: themeGlobal.typography.h4.FontFamily,
              FontStyle: themeGlobal.typography.h4.FontStyle,
              LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            BorderBottom: {
              BorderWidth: `2px`,
              Background: themeGlobal.color.alpha,
              BottomSpace: `-8px`,
            },
            h5: {
              FontWeight: themeGlobal.typography.h5.FontWeight,
              FontSize: themeGlobal.typography.h5.FontSize,
              LineHeight: themeGlobal.typography.h5.LineHeight,
              FontFamily: themeGlobal.typography.h5.FontFamily,
              FontStyle: themeGlobal.typography.h5.FontStyle,
              LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
              Alignment: `left`,
              MarginY: `10px`,
              MarginX: `0`,
            },
            AdmissionHomeHeroHead: {
              MarginBottom: `40px`,
              Alignment: `left`,
            },
            ViewMoreAdmissionHeroButton: {
              FontWeight: `400`,
              FontSize: `18px`,
              LineHeight: `24px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: themeGlobal.color.alpha,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `10px`,
              PaddingX: `40px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            ViewMoreAdmissionHeroSection: {
              Alignment: `left`
            }
          },
          AdmissionPage: {
            component: dynamic.admission,
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            BorderBottom: {
              BorderWidth: `2px`,
              Background: themeGlobal.color.alpha,
              BottomSpace: `-8px`,
            },
            h6: {
              FontWeight: themeGlobal.typography.h6.FontWeight,
              FontSize: themeGlobal.typography.h6.FontSize,
              LineHeight: themeGlobal.typography.h6.LineHeight,
              FontFamily: themeGlobal.typography.h6.FontFamily,
              FontStyle: themeGlobal.typography.h6.FontStyle,
              LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.Color,
            },
            AdmissionHead: {
              MarginBottom: `40px`,
              Alignment: `center`,
            },
            AdmissionListItem: {
              BorderColor: themeGlobal.color.alphaSemiLight,
            },
            OverlayDownloadButton: {
              FontWeight: `400`,
              FontSize: `15px`,
              LineHeight: `18px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: themeGlobal.color.beta,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `10px`,
              PaddingX: `40px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            OverlayViewButton: {
              FontWeight: `400`,
              FontSize: `15px`,
              LineHeight: `18px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: themeGlobal.color.alphaLight,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `10px`,
              PaddingX: `40px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            ViewDetailAdmissionModalBody: {
              h6: {
                FontWeight: themeGlobal.typography.h6.FontWeight,
                FontSize: themeGlobal.typography.h6.FontSize,
                LineHeight: themeGlobal.typography.h6.LineHeight,
                FontFamily: themeGlobal.typography.h6.FontFamily,
                FontStyle: themeGlobal.typography.h6.FontStyle,
                LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                Alignment: "left"
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.Color,
                Alignment: "left"
              },
              ApplyNowButton: {
                FontWeight: `500`,
                FontSize: `14px`,
                LineHeight: `24px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: themeGlobal.color.alpha,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `6px`,
                PaddingX: `24px`,
                Alignment: "center",
                LetterSpacing: "0.2px",
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              DownloadFeeStructureButton: {
                FontWeight: `500`,
                FontSize: `14px`,
                LineHeight: `24px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: themeGlobal.color.alpha,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `6px`,
                PaddingX: `24px`,
                Alignment: "center",
                LetterSpacing: "0.2px",
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              },
              DownloadBrochureButton: {
                FontWeight: `500`,
                FontSize: `14px`,
                LineHeight: `24px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: themeGlobal.color.alpha,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `6px`,
                PaddingX: `24px`,
                Alignment: "center",
                LetterSpacing: "0.2px",
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
                }
              }
            }
          },
        },
        FeeStructure: {
          FeeStructureHero: {
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            BorderBottom: {
              BorderWidth: `2px`,
              Background: themeGlobal.color.alpha,
              BottomSpace: `-8px`,
            },
            h6: {
              FontWeight: themeGlobal.typography.h6.FontWeight,
              FontSize: themeGlobal.typography.h6.FontSize,
              LineHeight: themeGlobal.typography.h6.LineHeight,
              FontFamily: themeGlobal.typography.h6.FontFamily,
              FontStyle: themeGlobal.typography.h6.FontStyle,
              LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            FeeStructureHomeHeroHead: {
              MarginBottom: `40px`,
              Alignment: `center`,
            },
            ViewMoreFeeStructureHeroButton: {
              FontWeight: `400`,
              FontSize: `18px`,
              LineHeight: `24px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: themeGlobal.color.alpha,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `10px`,
              PaddingX: `40px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            ViewMoreFeeStructureHeroSection: {
              Alignment: `left`
            }
          },
          FeeStructurePage: {
            component: dynamic.feestructure,
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            BorderBottom: {
              BorderWidth: `2px`,
              Background: themeGlobal.color.alpha,
              BottomSpace: `-8px`,
            },
            h4: {
              FontWeight: themeGlobal.typography.h4.FontWeight,
              FontSize: themeGlobal.typography.h4.FontSize,
              LineHeight: themeGlobal.typography.h4.LineHeight,
              FontFamily: themeGlobal.typography.h4.FontFamily,
              FontStyle: themeGlobal.typography.h4.FontStyle,
              LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              MarginBottom: `10px`,
              Alignment: "center"
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.Color,
              Alignment: "center"
            },
            FeeStructureListCard: {
              Alignment: `center`,
            },
            ViewFeeStructureButton: {
              FontWeight: `500`,
              FontSize: `19px`,
              LineHeight: `34px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: themeGlobal.color.universal,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `0`,
              PaddingX: `0`,
              Alignment: "center",
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: themeGlobal.color.universal,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            FeeStructureModalBody: {
              h4: {
                FontWeight: themeGlobal.typography.h4.FontWeight,
                FontSize: themeGlobal.typography.h4.FontSize,
                LineHeight: themeGlobal.typography.h4.LineHeight,
                FontFamily: themeGlobal.typography.h4.FontFamily,
                FontStyle: themeGlobal.typography.h4.FontStyle,
                LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                Alignment: "left"
              },
              h5: {
                FontWeight: themeGlobal.typography.h5.FontWeight,
                FontSize: themeGlobal.typography.h5.FontSize,
                LineHeight: themeGlobal.typography.h5.LineHeight,
                FontFamily: themeGlobal.typography.h5.FontFamily,
                FontStyle: themeGlobal.typography.h5.FontStyle,
                LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
                Alignment: "left"
              },
              h6: {
                FontWeight: themeGlobal.typography.h6.FontWeight,
                FontSize: themeGlobal.typography.h6.FontSize,
                LineHeight: themeGlobal.typography.h6.LineHeight,
                FontFamily: themeGlobal.typography.h6.FontFamily,
                FontStyle: themeGlobal.typography.h6.FontStyle,
                LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                Alignment: "left"
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.Color,
                Alignment: "left"
              },
              DownloadFileButton: {
                FontWeight: `500`,
                FontSize: `14px`,
                LineHeight: `24px`,
                Background: themeGlobal.bodyThemeColor.Button.Background,
                BorderColor: themeGlobal.color.alpha,
                BorderRadius: `4px`,
                Color: themeGlobal.bodyThemeColor.Button.Color,
                PaddingY: `6px`,
                PaddingX: `24px`,
                Alignment: "center",
                LetterSpacing: "0.2px",
                Hover: {
                  Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                  Color: themeGlobal.bodyThemeColor.Button.Hover.Background,
                }
              },
              FeeStructureBreakuplist: {
                tr: {
                  BorderColor: themeGlobal.color.alphaSemiLight
                }
              }
            },
          },
        },
        Faqs: {
          FaqsHero: {
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
            },
            h6: {
              FontWeight: themeGlobal.typography.h6.FontWeight,
              FontSize: themeGlobal.typography.h6.FontSize,
              LineHeight: themeGlobal.typography.h6.LineHeight,
              FontFamily: themeGlobal.typography.h6.FontFamily,
              FontStyle: themeGlobal.typography.h6.FontStyle,
              LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            BorderBottom: {
              BorderWidth: `2px`,
              Background: themeGlobal.color.alpha,
              BottomSpace: `-8px`,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.Color,
            },

            FaqsHomeHeroHead: {
              MarginBottom: `40px`,
              Alignment: `center`,
            },
            FaqListItem: {
              BorderColor: themeGlobal.color.alphaSemiLight,
            },
            ViewMoreFaqsHeroButton: {
              FontWeight: `400`,
              FontSize: `18px`,
              LineHeight: `24px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: themeGlobal.color.alpha,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `10px`,
              PaddingX: `40px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            ViewMoreFaqsHeroSection: {
              Alignment: `left`,
              MarginTop: `32px`,
            }
          },
          FaqsPage: {
            component: dynamic.faqs,
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            BorderBottom: {
              BorderWidth: `2px`,
              Background: themeGlobal.color.alpha,
              BottomSpace: `-8px`,
            },
            h6: {
              FontWeight: themeGlobal.typography.h6.FontWeight,
              FontSize: themeGlobal.typography.h6.FontSize,
              LineHeight: themeGlobal.typography.h6.LineHeight,
              FontFamily: themeGlobal.typography.h6.FontFamily,
              FontStyle: themeGlobal.typography.h6.FontStyle,
              LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.Color,
            },

            FaqsHead: {
              MarginBottom: `40px`,
              Alignment: `left`,
            },
            FaqListItem: {
              BorderColor: themeGlobal.color.alphaSemiLight,
            },
          },
        },
        Vacancy: {
          VacancyHero: {
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            BorderBottom: {
              BorderWidth: `2px`,
              Background: themeGlobal.color.alpha,
              BottomSpace: `-8px`,
            },
            h6: {
              FontWeight: themeGlobal.typography.h6.FontWeight,
              FontSize: themeGlobal.typography.h6.FontSize,
              LineHeight: themeGlobal.typography.h6.LineHeight,
              FontFamily: themeGlobal.typography.h6.FontFamily,
              FontStyle: themeGlobal.typography.h6.FontStyle,
              LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },

            VacancyHomeHeroHead: {
              MarginBottom: `40px`,
              Alignment: `center`,
            },
            VacancyListItem: {
              BorderColor: themeGlobal.color.alphaSemiLight,
            },
            ViewMoreVacancyHeroButton: {
              FontWeight: `400`,
              FontSize: `18px`,
              LineHeight: `24px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: themeGlobal.color.alpha,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `10px`,
              PaddingX: `40px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            ViewMoreVacancyHeroSection: {
              Alignment: `left`,
              MarginTop: `32px`,
            }
          },
          VacancyPage: {
            component: dynamic.vacancy,
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            BorderBottom: {
              BorderWidth: `2px`,
              Background: themeGlobal.color.alpha,
              BottomSpace: `-8px`,
            },
            h6: {
              FontWeight: themeGlobal.typography.h6.FontWeight,
              FontSize: themeGlobal.typography.h6.FontSize,
              LineHeight: themeGlobal.typography.h6.LineHeight,
              FontFamily: themeGlobal.typography.h6.FontFamily,
              FontStyle: themeGlobal.typography.h6.FontStyle,
              LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.Color,
            },
            VacancyHead: {
              MarginBottom: `40px`,
              Alignment: `center`,
            },
            VacancyListItem: {
              BorderColor: themeGlobal.color.alphaSemiLight,
            },
            OverlayApplyNowButton: {
              FontWeight: `400`,
              FontSize: `15px`,
              LineHeight: `18px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: themeGlobal.color.beta,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `10px`,
              PaddingX: `40px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            },
            OverlayViewButton: {
              FontWeight: `400`,
              FontSize: `15px`,
              LineHeight: `18px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: themeGlobal.color.beta,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `10px`,
              PaddingX: `40px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            }
          },
        },
        Announcement: {
          AnnouncementPage: {
            component: dynamic.announcements,
            h2: {
              FontWeight: themeGlobal.typography.h2.FontWeight,
              FontSize: themeGlobal.typography.h2.FontSize,
              LineHeight: themeGlobal.typography.h2.LineHeight,
              FontFamily: themeGlobal.typography.h2.FontFamily,
              FontStyle: themeGlobal.typography.h2.FontStyle,
              LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h6: {
              FontWeight: themeGlobal.typography.h6.FontWeight,
              FontSize: themeGlobal.typography.h6.FontSize,
              LineHeight: themeGlobal.typography.h6.LineHeight,
              FontFamily: themeGlobal.typography.h6.FontFamily,
              FontStyle: themeGlobal.typography.h6.FontStyle,
              LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            h3: {
              FontWeight: themeGlobal.typography.h3.FontWeight,
              FontSize: themeGlobal.typography.h3.FontSize,
              LineHeight: themeGlobal.typography.h3.LineHeight,
              FontFamily: themeGlobal.typography.h3.FontFamily,
              FontStyle: themeGlobal.typography.h3.FontStyle,
              LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
              Alignment: `center`,
              Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            },
            BorderBottom: {
              BorderWidth: `2px`,
              Background: themeGlobal.color.alpha,
              BottomSpace: `-8px`,
            },
            p: {
              FontWeight: themeGlobal.typography.regular.FontWeight,
              FontSize: themeGlobal.typography.regular.FontSize,
              LineHeight: themeGlobal.typography.regular.LineHeight,
              FontFamily: themeGlobal.typography.regular.FontFamily,
              FontStyle: themeGlobal.typography.regular.FontStyle,
              LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
              Color: themeGlobal.bodyThemeColor.typography.Color,
            },
            AnnouncementHead: {
              MarginBottom: `40px`,
              Alignment: `center`,
            },
            AnnouncementListItem: {
              BorderColor: themeGlobal.color.alphaSemiLight,
            },
            OverlayDownloadButton: {
              FontWeight: `400`,
              FontSize: `15px`,
              LineHeight: `18px`,
              Background: themeGlobal.bodyThemeColor.Button.Background,
              BorderColor: themeGlobal.color.beta,
              BorderRadius: `4px`,
              Color: themeGlobal.bodyThemeColor.Button.Color,
              PaddingY: `10px`,
              PaddingX: `40px`,
              Hover: {
                Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
                BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
                Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
              }
            }
          },
        },
        Global: {
          Modal: {
            ModalCloseWtc: {
              Color: themeGlobal.color.alpha,
              Hover: {
                Color: themeGlobal.color.beta,
              }
            },
            ModalHeadWtc: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                Alignment: `left`,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
                Alignment: `left`,
              }
            },
            ModalBodyWTC: {
              h2: {
                FontWeight: themeGlobal.typography.h2.FontWeight,
                FontSize: themeGlobal.typography.h2.FontSize,
                LineHeight: themeGlobal.typography.h2.LineHeight,
                FontFamily: themeGlobal.typography.h2.FontFamily,
                FontStyle: themeGlobal.typography.h2.FontStyle,
                LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
                Alignment: `left`,
              },
              h3: {
                FontWeight: themeGlobal.typography.h3.FontWeight,
                FontSize: themeGlobal.typography.h3.FontSize,
                LineHeight: themeGlobal.typography.h3.LineHeight,
                FontFamily: themeGlobal.typography.h3.FontFamily,
                FontStyle: themeGlobal.typography.h3.FontStyle,
                LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
                Alignment: `left`,
              },
              p: {
                FontWeight: themeGlobal.typography.regular.FontWeight,
                FontSize: themeGlobal.typography.regular.FontSize,
                LineHeight: themeGlobal.typography.regular.LineHeight,
                FontFamily: themeGlobal.typography.regular.FontFamily,
                FontStyle: themeGlobal.typography.regular.FontStyle,
                LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
                Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
                Alignment: `left`,
              }
            }
          },
          scrollbar: {
            scrollbarWidth: '10px',
            scrollbarTrackBackground: '#000',
            scrollbarThumbBorderRadius: '0',
            scrollbarThumbBackground: themeGlobal.color.alpha,
            scrollbarThumbBackgroundHover: themeGlobal.color.beta,
          },
          body: {
            bodyBackground: themeGlobal.bodyThemeColor.Background,
            bodyFont: `'Poppins', sans-serif`,
            bodyFontSize: '16px',
            bodyFontWeight: '600',
            bodyColor: '#8B417D',
            bodyLetterSpacing: '',
          },
          container: {
            containerMaxWidth: '1140px',
          }
        },
      }
      dispatch(updateDynamicWebsiteThemeTemplate({ ...theme, themeGlobal: themeGlobal }))
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyData, footerData, headerData, headerData.HeaderBackground, headerData.SignUpActiveBackground, headerData.SignUpActiveBorderColor, headerData.SignUpActiveColor, headerData.SignUpBackground, headerData.SignUpColor, headerData.SignUpHoverBackground, headerData.SignUpHoverBorderColor, headerData.SignUpHoverColor, headerData.headingColor, headerData.loginActiveBackground, headerData.loginActiveBorderColor, headerData.loginActiveColor, headerData.loginBackground, headerData.loginColor, headerData.loginHoverBackground, headerData.loginHoverBorderColor, headerData.loginHoverColor, headerData.navMenuBackground])
  useEffect(() => {
    if (createUserThemeSuccess || editThemeSuccess) {
      handleThemeDrop(false)
      dispatch(resetCreateWebsiteTemplate())
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