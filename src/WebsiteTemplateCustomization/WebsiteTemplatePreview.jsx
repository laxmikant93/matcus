import SectionBody from '../WebsiteTemplateCustomization/SectionImports/SectionBody'
import AboutPages from '../WebsiteTemplateCustomization/PageImports/AboutUs'
import TeamPages from '../WebsiteTemplateCustomization/PageImports/Team'
import AdmissionPages from '../WebsiteTemplateCustomization/PageImports/Admission'
import FeeStructurePages from '../WebsiteTemplateCustomization/PageImports/FeeStructure'
import FacilityPages from '../WebsiteTemplateCustomization/PageImports/Facility'
import AnnouncementsPages from '../WebsiteTemplateCustomization/PageImports/Announcements'
import VacancyPages from '../WebsiteTemplateCustomization/PageImports/Vacancy'
import FaqsPages from '../WebsiteTemplateCustomization/PageImports/Faqs'
import ContactPages from '../WebsiteTemplateCustomization/PageImports/Contact'
import GalleryPages from '../WebsiteTemplateCustomization/PageImports/Gallery'
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components'
import SectionHeader from '../WebsiteTemplateCustomization/SectionImports/SectionHeader'
import SectionFooter from '../WebsiteTemplateCustomization/SectionImports/SectionFooter'
import { useSelector } from 'react-redux'
import ComponentLoader from '../Common/Loader/ComponentLoader'
import { useDispatch } from 'react-redux'
import { getGalleryAlbum, selectRouteForPreview } from '../store/actions/WebsiteTemplate'
import WebsiteTypoStyle from './CommonComponent/WebsiteTypoStyle';

import Headroom from 'react-headroom';
import styled from 'styled-components';
import SuccessMessagePopup from '../Common/SuccessMessagePopup'
import MiscellaneousPageComponents from './PageImports/Miscellaneous'

const SectionBodyCustom = styled.div`
min-height: 576px;
position: relative;
`;

const WebsiteTemplatePreview = () => {
  const { pathname, theme, themeSuccess } = useSelector((state) => {
    return {
      pathname: state.websiteTemplate.route,
      theme: state.websiteTemplate.getTemplate.data,
      themeSuccess: state.websiteTemplate.getTemplate.success,
      themeLoading: state.websiteTemplate.getTemplate.loading,
      themeGlobal: state.websiteTemplate.getTemplate.data.themeGlobal,
    }
  })
  // const themeGlobal = {
  //   bodyComponent: "Defaultine_Body",
  //   color: {
  //     alpha: `rgba(38, 51, 93, 0.8)`,
  //     alphaLight: `#EBECF0`,
  //     alphaSemiLight: `#4E616B`,
  //     beta: `#E9DB89`,
  //     betaLight: ``,
  //     betaSemiLight: ``,
  //     background: ``,
  //     base: `#202020`,
  //     white: `#fff`,
  //   },
  //   typography: {
  //     h1: {
  //       FontSize: `56px`,
  //       FontWeight: `700`,
  //       LineHeight: `68px`,
  //       FontFamily: ``,
  //       FontStyle: `Normal`,
  //       LetterSpacing: ``,
  //     },
  //     h2: {
  //       FontSize: `32px`,
  //       FontWeight: `700`,
  //       LineHeight: `42px`,
  //       FontFamily: ``,
  //       FontStyle: `Normal`,
  //       LetterSpacing: ``,
  //     },
  //     h3: {
  //       FontSize: `18px`,
  //       FontWeight: `500`,
  //       LineHeight: `24px`,
  //       FontFamily: ``,
  //       FontStyle: `Normal`,
  //       LetterSpacing: ``,
  //     },
  //     h4: {
  //       FontSize: `20px`,
  //       FontWeight: `700`,
  //       LineHeight: `30px`,
  //       FontFamily: ``,
  //       FontStyle: `Normal`,
  //       LetterSpacing: ``,
  //     },
  //     h5: {
  //       FontSize: `16px`,
  //       FontWeight: `500`,
  //       LineHeight: `20px`,
  //       FontFamily: ``,
  //       FontStyle: `Normal`,
  //       LetterSpacing: ``,
  //     },
  //     h6: {
  //       FontSize: `18px`,
  //       FontWeight: `600`,
  //       LineHeight: `24px`,
  //       FontFamily: ``,
  //       FontStyle: `Normal`,
  //       LetterSpacing: ``,
  //     },
  //     regular: {
  //       FontSize: `16px`,
  //       FontWeight: `400`,
  //       LineHeight: `28px`,
  //       FontFamily: ``,
  //       FontStyle: `Normal`,
  //       LetterSpacing: ``,
  //     },
  //     anchor: {
  //       FontWeight: '500',
  //       FontSize: '16px',
  //       LineHeight: '1.24',
  //       FontFamily: ``,
  //       FontStyle: `Normal`,
  //       LetterSpacing: ``,
  //     },
  //   },
  //   headerThemeColor: {
  //     Background: `#FFFFFF`,
  //     h4: {
  //       Color: '#202020',
  //     },
  //     h5: {
  //       Color: '#202020',
  //     },
  //     ButtonLogin: {
  //       Background: `#FFFFFF`,
  //       Color: `rgba(38, 51, 93, 0.8)`,
  //       BorderColor: `rgba(38, 51, 93, 0.8)`,
  //       Hover: {
  //         Background: `rgba(38, 51, 93, 0.8)`,
  //         Color: `#FFFFFF`,
  //         BorderColor: `rgba(38, 51, 93, 0.8)`,
  //       },
  //       Active: {
  //         Background: `rgba(38, 51, 93, 0.8)`,
  //         Color: `#FFFFFF`,
  //         BorderColor: `rgba(38, 51, 93, 0.8)`,
  //       }
  //     },
  //     ButtonSignup: {
  //       Background: `rgba(38, 51, 93, 0.8)`,
  //       BorderColor: `rgba(38, 51, 93, 0.8)`,
  //       Color: `#FFFFFF`,
  //       Hover: {
  //         Background: `rgba(38, 51, 93, 0.8)`,
  //         Color: `#FFFFF`,
  //         BorderColor: `rgba(38, 51, 93, 0.8)`,
  //       },
  //       Active: {
  //         Background: `rgba(38, 51, 93, 0.8)`,
  //         Color: `#FFFFF`,
  //         BorderColor: `rgba(38, 51, 93, 0.8)`,
  //       }
  //     },
  //     NavMenu: {
  //       Background: `rgba(38, 51, 93, 0.05)`,
  //       Color: `#1A090D`,
  //       Hover: {
  //         Color: `#26335D`,
  //       },
  //       Active: {
  //         Color: `#26335D`,
  //       },
  //       ScrollIcon: {
  //         Color: `#1A090D`,
  //         Hover: {
  //           Color: `#26335D`,
  //         }
  //       }
  //     },
  //   },
  //   footerThemeColor: {
  //     Background: `#343F64`,
  //     Logo: {
  //       Background: `#FFFFFF`,
  //     },
  //     h4: {
  //       Color: '#FFFFFF',
  //     },
  //     h5: {
  //       Color: '#FFFFFF',
  //     },
  //     h6: {
  //       Color: '#FFFFFF',
  //     },
  //     li: {
  //       Color: '#FFFFFF',
  //     },
  //     a: {
  //       Color: `#FFFFFF`,
  //       Hover: {
  //         Color: `#E9DB89`,
  //       }
  //     },
  //     Copyright: {
  //       Color: `#FFFFFF`,
  //     }
  //   },
  //   headerThemeTypo: {
  //     h4: {
  //       FontSize: `24px`,
  //       FontWeight: `600`,
  //       LineHeight: `36px`,
  //       LetterSpacing: ``,
  //       FontFamily: ``,
  //       FontStyle: ``,
  //     },
  //     h5: {
  //       FontSize: `16px`,
  //       FontWeight: `500`,
  //       LineHeight: `20px`,
  //       LetterSpacing: ``,
  //       FontFamily: ``,
  //       FontStyle: ``,
  //     },
  //     Button: {
  //       FontWeight: `400`,
  //       FontSize: `15px`,
  //       LineHeight: `22px`,
  //       LetterSpacing: ``,
  //       FontFamily: ``,
  //       FontStyle: ``,
  //     },
  //     NavMenu: {
  //       FontWeight: `500`,
  //       FontSize: `16px`,
  //       LineHeight: `24px`,
  //       LetterSpacing: ``,
  //       FontFamily: ``,
  //       FontStyle: ``,
  //       Active: {
  //         FontWeight: `600`,
  //       }
  //     }
  //   },
  //   footerThemeTypo: {
  //     h4: {
  //       FontSize: `20px`,
  //       FontWeight: `700`,
  //       LineHeight: `30px`,
  //       LetterSpacing: ``,
  //       FontFamily: ``,
  //       FontStyle: ``,
  //     },
  //     h5: {
  //       FontSize: `16px`,
  //       FontWeight: `500`,
  //       LineHeight: `20px`,
  //       LetterSpacing: ``,
  //       FontFamily: ``,
  //       FontStyle: ``,
  //     },
  //     h6: {
  //       FontSize: `16px`,
  //       FontWeight: `500`,
  //       LineHeight: `24px`,
  //       LetterSpacing: ``,
  //       FontFamily: ``,
  //       FontStyle: ``,
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
  //       FontWeight: '400',
  //       FontSize: '14px',
  //       LineHeight: '20px',
  //       LetterSpacing: ``,
  //       FontFamily: ``,
  //       FontStyle: ``,
  //     },
  //     Copyright: {
  //       FontWeight: '400',
  //       FontSize: '10px',
  //       LineHeight: '15px',
  //       LetterSpacing: ``,
  //       FontFamily: ``,
  //       FontStyle: ``,
  //     }
  //   },
  //   headerThemeUtilities: {
  //     Logo: {
  //       Width: '80px',
  //       Height: '80px',
  //     },
  //     h4: {
  //       TextTransform: 'uppercase',
  //       TextAlignment: 'left',
  //     },
  //     h5: {
  //       TextTransform: 'uppercase',
  //       TextAlignment: 'left',
  //     },
  //     li: {
  //       TextTransform: 'uppercase',
  //       TextAlignment: 'left',
  //     },
  //     Button: {
  //       PaddingY: '8px',
  //       PaddingX: '16px',
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
  //     li: {
  //       TextTransform: `uppercase`,
  //       TextAlignment: ``,
  //     },
  //     a: {
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
  //     Background: `#FFFFFF`,
  //     typography: {
  //       Color: `#202020`,
  //       HeadingColor: `#343F64`,
  //       SubHeadingColor: `#4E616B`,
  //       LinkColor: `#343F64`,
  //       Hover: {
  //         LinkColor: `#4E616B`,
  //       }
  //     },
  //     Button: {
  //       Background: `#343F64`,
  //       Color: `#FFFFFF`,
  //       Hover: {
  //         Background: `#4E616B`,
  //         Color: `#E9DB89`,
  //       }
  //     }
  //   }
  // }
  // const theme = {
  //   Header: {
  //     component: "Defaultine_Header",
  //     Background: themeGlobal.headerThemeColor.Background,
  //     Logo: {
  //       Width: themeGlobal.headerThemeUtilities.Logo.Width,
  //       Height: themeGlobal.headerThemeUtilities.Logo.Height,
  //     },
  //     h4: {
  //       FontSize: themeGlobal.headerThemeTypo.h4.FontSize,
  //       FontWeight: themeGlobal.headerThemeTypo.h4.FontWeight,
  //       LineHeight: themeGlobal.headerThemeTypo.h4.LineHeight,
  //       FontFamily: themeGlobal.headerThemeTypo.h4.FontFamily,
  //       FontStyle: themeGlobal.headerThemeTypo.h4.FontStyle,
  //       LetterSpacing: themeGlobal.headerThemeTypo.h4.LetterSpacing,
  //       Color: themeGlobal.headerThemeColor.h4.Color,
  //       TextTransform: themeGlobal.headerThemeUtilities.h4.TextTransform,
  //       TextAlignment: themeGlobal.headerThemeUtilities.h4.TextAlignment,
  //     },
  //     h5: {
  //       FontSize: themeGlobal.headerThemeTypo.h5.FontSize,
  //       FontWeight: themeGlobal.headerThemeTypo.h5.FontWeight,
  //       LineHeight: themeGlobal.headerThemeTypo.h5.LineHeight,
  //       FontFamily: themeGlobal.headerThemeTypo.h5.FontFamily,
  //       FontStyle: themeGlobal.headerThemeTypo.h5.FontStyle,
  //       LetterSpacing: themeGlobal.headerThemeTypo.h5.LetterSpacing,
  //       Color: themeGlobal.headerThemeColor.h5.Color,
  //       TextTransform: themeGlobal.headerThemeUtilities.h5.TextTransform,
  //       TextAlignment: themeGlobal.headerThemeUtilities.h5.TextAlignment,
  //     },
  //     NavAuth: {
  //       ButtonLogin: {
  //         FontSize: themeGlobal.headerThemeTypo.Button.FontSize,
  //         FontWeight: themeGlobal.headerThemeTypo.Button.FontWeight,
  //         LineHeight: themeGlobal.headerThemeTypo.Button.LineHeight,
  //         FontFamily: themeGlobal.headerThemeTypo.Button.FontFamily,
  //         FontStyle: themeGlobal.headerThemeTypo.Button.FontStyle,
  //         LetterSpacing: themeGlobal.headerThemeTypo.Button.LetterSpacing,
  //         PaddingY: themeGlobal.headerThemeUtilities.Button.PaddingY,
  //         PaddingX: themeGlobal.headerThemeUtilities.Button.PaddingX,
  //         Background: themeGlobal.headerThemeColor.ButtonLogin.Background,
  //         BorderColor: themeGlobal.headerThemeColor.ButtonLogin.BorderColor,
  //         BorderRadius: themeGlobal.headerThemeUtilities.Button.BorderRadius,
  //         Color: themeGlobal.headerThemeColor.ButtonLogin.Color,
  //         Hover: {
  //           Background: themeGlobal.headerThemeColor.ButtonLogin.Hover.Background,
  //           Color: themeGlobal.headerThemeColor.ButtonLogin.Hover.Color,
  //           BorderColor: themeGlobal.headerThemeColor.ButtonLogin.Hover.BorderColor,
  //         },
  //         Active: {
  //           Background: themeGlobal.headerThemeColor.ButtonLogin.Active.Background,
  //           Color: themeGlobal.headerThemeColor.ButtonLogin.Active.Color,
  //           BorderColor: themeGlobal.headerThemeColor.ButtonLogin.Active.BorderColor,
  //         }
  //       },
  //       ButtonSignup: {
  //         FontSize: themeGlobal.headerThemeTypo.Button.FontSize,
  //         FontWeight: themeGlobal.headerThemeTypo.Button.FontWeight,
  //         LineHeight: themeGlobal.headerThemeTypo.Button.LineHeight,
  //         FontFamily: themeGlobal.headerThemeTypo.Button.FontFamily,
  //         FontStyle: themeGlobal.headerThemeTypo.Button.FontStyle,
  //         LetterSpacing: themeGlobal.headerThemeTypo.Button.LetterSpacing,
  //         PaddingY: themeGlobal.headerThemeUtilities.Button.PaddingY,
  //         PaddingX: themeGlobal.headerThemeUtilities.Button.PaddingX,
  //         Background: themeGlobal.headerThemeColor.ButtonSignup.Background,
  //         BorderColor: themeGlobal.headerThemeColor.ButtonSignup.BorderColor,
  //         BorderRadius: themeGlobal.headerThemeUtilities.Button.BorderRadius,
  //         Color: themeGlobal.headerThemeColor.ButtonSignup.Color,
  //         Hover: {
  //           Background: themeGlobal.headerThemeColor.ButtonSignup.Hover.Background,
  //           Color: themeGlobal.headerThemeColor.ButtonSignup.Hover.Color,
  //           BorderColor: themeGlobal.headerThemeColor.ButtonSignup.Hover.BorderColor,
  //         },
  //         Active: {
  //           Background: themeGlobal.headerThemeColor.ButtonSignup.Active.Background,
  //           Color: themeGlobal.headerThemeColor.ButtonSignup.Active.Color,
  //           BorderColor: themeGlobal.headerThemeColor.ButtonSignup.Active.BorderColor,
  //         }
  //       }
  //     },
  //     NavMenuWrapper: {
  //       Background: themeGlobal.headerThemeColor.NavMenu.Background,
  //       NavMenuCustom: {
  //         MenuGap: themeGlobal.headerThemeUtilities.NavMenu.MenuGap,
  //         FontSize: themeGlobal.headerThemeTypo.NavMenu.FontSize,
  //         FontWeight: themeGlobal.headerThemeTypo.NavMenu.FontWeight,
  //         LineHeight: themeGlobal.headerThemeTypo.NavMenu.LineHeight,
  //         FontFamily: themeGlobal.headerThemeTypo.NavMenu.FontFamily,
  //         FontStyle: themeGlobal.headerThemeTypo.NavMenu.FontStyle,
  //         LetterSpacing: themeGlobal.headerThemeTypo.NavMenu.LetterSpacing,
  //         Color: themeGlobal.headerThemeColor.NavMenu.Color,
  //         Hover: {
  //           Color: themeGlobal.headerThemeColor.NavMenu.Hover.Color,
  //         },
  //         Active: {
  //           Color: themeGlobal.headerThemeColor.NavMenu.Active.Color,
  //           FontWeight: themeGlobal.headerThemeTypo.NavMenu.Active.FontWeight,
  //         },
  //         NavMenuScrollIcon: {
  //           BorderColor: themeGlobal.headerThemeColor.NavMenu.ScrollIcon.Color,
  //           Hover: {
  //             BorderColor: themeGlobal.headerThemeColor.NavMenu.ScrollIcon.Hover.Color,
  //           }
  //         }
  //       }
  //     }
  //   },
  //   Footer: {
  //     component: 'Defaultine_Footer',
  //     Background: themeGlobal.footerThemeColor.Background,
  //     h4: {
  //       FontWeight: themeGlobal.footerThemeTypo.h4.FontWeight,
  //       FontSize: themeGlobal.footerThemeTypo.h4.FontSize,
  //       LineHeight: themeGlobal.footerThemeTypo.h4.LineHeight,
  //       FontFamily: themeGlobal.footerThemeTypo.h4.FontFamily,
  //       FontStyle: themeGlobal.footerThemeTypo.h4.FontStyle,
  //       LetterSpacing: themeGlobal.footerThemeTypo.h4.LetterSpacing,
  //       Color: themeGlobal.footerThemeColor.h4.Color,
  //       TextTransform: themeGlobal.footerThemeUtilities.h4.TextTransform,
  //       TextAlignment: themeGlobal.footerThemeUtilities.h4.TextAlignment,
  //     },
  //     h5: {
  //       FontWeight: themeGlobal.footerThemeTypo.h5.FontWeight,
  //       FontSize: themeGlobal.footerThemeTypo.h5.FontSize,
  //       LineHeight: themeGlobal.footerThemeTypo.h5.LineHeight,
  //       FontFamily: themeGlobal.footerThemeTypo.h5.FontFamily,
  //       FontStyle: themeGlobal.footerThemeTypo.h5.FontStyle,
  //       LetterSpacing: themeGlobal.footerThemeTypo.h5.LetterSpacing,
  //       Color: themeGlobal.footerThemeColor.h5.Color,
  //       TextTransform: themeGlobal.footerThemeUtilities.h5.TextTransform,
  //       TextAlignment: themeGlobal.footerThemeUtilities.h5.TextAlignment,
  //     },
  //     h6: {
  //       FontWeight: themeGlobal.footerThemeTypo.h6.FontWeight,
  //       FontSize: themeGlobal.footerThemeTypo.h6.FontSize,
  //       LineHeight: themeGlobal.footerThemeTypo.h6.LineHeight,
  //       FontFamily: themeGlobal.footerThemeTypo.h6.FontFamily,
  //       FontStyle: themeGlobal.footerThemeTypo.h6.FontStyle,
  //       LetterSpacing: themeGlobal.footerThemeTypo.h6.LetterSpacing,
  //       Color: themeGlobal.footerThemeColor.h6.Color,
  //       TextTransform: themeGlobal.footerThemeUtilities.h6.TextTransform,
  //       TextAlignment: themeGlobal.footerThemeUtilities.h6.TextAlignment,
  //     },
  //     li: {
  //       FontWeight: themeGlobal.footerThemeTypo.li.FontWeight,
  //       FontSize: themeGlobal.footerThemeTypo.li.FontSize,
  //       LineHeight: themeGlobal.footerThemeTypo.li.LineHeight,
  //       FontFamily: themeGlobal.footerThemeTypo.li.FontFamily,
  //       FontStyle: themeGlobal.footerThemeTypo.li.FontStyle,
  //       LetterSpacing: themeGlobal.footerThemeTypo.li.LetterSpacing,
  //       Color: themeGlobal.footerThemeColor.li.Color,
  //       TextTransform: themeGlobal.footerThemeUtilities.li.TextTransform,
  //       TextAlignment: themeGlobal.footerThemeUtilities.li.TextAlignment,
  //     },
  //     a: {
  //       FontWeight: themeGlobal.footerThemeTypo.a.FontWeight,
  //       FontSize: themeGlobal.footerThemeTypo.a.FontSize,
  //       LineHeight: themeGlobal.footerThemeTypo.a.LineHeight,
  //       FontFamily: themeGlobal.footerThemeTypo.a.FontFamily,
  //       FontStyle: themeGlobal.footerThemeTypo.a.FontStyle,
  //       LetterSpacing: themeGlobal.footerThemeTypo.a.LetterSpacing,
  //       Color: themeGlobal.footerThemeColor.a.Color,
  //       TextTransform: themeGlobal.footerThemeUtilities.a.TextTransform,
  //       TextAlignment: themeGlobal.footerThemeUtilities.a.TextAlignment,
  //       Hover: {
  //         Color: themeGlobal.footerThemeColor.a.Hover.Color,
  //       }
  //     },
  //     MapContainer: {
  //       Height: themeGlobal.footerThemeUtilities.Map.Height,
  //     },
  //     SocialMediaIconListItem: {
  //       Width: themeGlobal.footerThemeUtilities.SocialMediaIcon.Width,
  //       Height: themeGlobal.footerThemeUtilities.SocialMediaIcon.Height,
  //     },
  //     CopyrightSectionItem: {
  //       FontWeight: themeGlobal.footerThemeTypo.Copyright.FontWeight,
  //       FontSize: themeGlobal.footerThemeTypo.Copyright.FontSize,
  //       LineHeight: themeGlobal.footerThemeTypo.Copyright.LineHeight,
  //       FontFamily: themeGlobal.footerThemeTypo.Copyright.FontFamily,
  //       FontStyle: themeGlobal.footerThemeTypo.Copyright.FontStyle,
  //       LetterSpacing: themeGlobal.footerThemeTypo.Copyright.LetterSpacing,
  //       Color: themeGlobal.footerThemeColor.Copyright.Color,
  //     }
  //   },
  //   Banner: {
  //     Background: `rgba(255, 255, 255, 0.5)`,
  //     a: {
  //       FontWeight: themeGlobal.typography.anchor.FontWeight,
  //       FontSize: themeGlobal.typography.anchor.FontSize,
  //       LineHeight: themeGlobal.typography.anchor.LineHeight,
  //       FontFamily: themeGlobal.typography.anchor.FontFamily,
  //       FontStyle: themeGlobal.typography.anchor.FontStyle,
  //       LetterSpacing: themeGlobal.typography.anchor.LetterSpacing,
  //       Background: themeGlobal.bodyThemeColor.Button.Background,
  //       BorderColor: `#343F64`,
  //       BorderRadius: `4px`,
  //       Color: themeGlobal.bodyThemeColor.typography.LinkColor,
  //       PaddingY: `10px`,
  //       PaddingX: `40px`,
  //       Hover: {
  //         Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //         BorderColor: `#343F64`,
  //         Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //       }
  //     },
  //     h1: {
  //       FontWeight: themeGlobal.typography.h1.FontWeight,
  //       FontSize: themeGlobal.typography.h1.FontSize,
  //       LineHeight: themeGlobal.typography.h1.LineHeight,
  //       FontFamily: themeGlobal.typography.h1.FontFamily,
  //       FontStyle: themeGlobal.typography.h1.FontStyle,
  //       LetterSpacing: themeGlobal.typography.h1.LetterSpacing,
  //       Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //     },
  //     h3: {
  //       FontWeight: `400`,
  //       FontSize: `12px`,
  //       LineHeight: `18px`,
  //       FontFamily: themeGlobal.typography.h3.FontFamily,
  //       FontStyle: themeGlobal.typography.h3.FontStyle,
  //       LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
  //       Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //     },
  //     Dots: {
  //       Color: `rgba(32, 32, 32, 0.5)`,
  //       Active: {
  //         Color: `rgba(38, 51, 93, 0.8)`,
  //       }
  //     },
  //     SliderImage: {
  //       Height: `480px`,
  //     },
  //     SlickArrowColor: {
  //       Color: `#fff`,
  //       Hover: {
  //         Color: `#E9DB89`,
  //       }
  //     },
  //     BannerOverlay: {
  //       Top: `auto`,
  //       Bottom: `0`,
  //       Right: `139px`,
  //       Left: `auto`,
  //       width: `388px`,
  //       Background: `rgba(255, 255, 255, 0.8)`,
  //       Padding: `16px`,
  //       BorderRadius: `0`,
  //     },
  //   },
  //   AboutUs: {
  //     AboutUsHero: {
  //       h2: {
  //         FontWeight: themeGlobal.typography.h2.FontWeight,
  //         FontSize: themeGlobal.typography.h2.FontSize,
  //         LineHeight: themeGlobal.typography.h2.LineHeight,
  //         FontFamily: themeGlobal.typography.h2.FontFamily,
  //         FontStyle: themeGlobal.typography.h2.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //         Alignment: `center`,
  //       },
  //       h3: {
  //         FontWeight: themeGlobal.typography.h3.FontWeight,
  //         FontSize: themeGlobal.typography.h3.FontSize,
  //         LineHeight: themeGlobal.typography.h3.LineHeight,
  //         FontFamily: themeGlobal.typography.h3.FontFamily,
  //         FontStyle: themeGlobal.typography.h3.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //         Alignment: `center`,
  //       },
  //       p: {
  //         FontWeight: themeGlobal.typography.regular.FontWeight,
  //         FontSize: themeGlobal.typography.regular.FontSize,
  //         LineHeight: themeGlobal.typography.regular.LineHeight,
  //         FontFamily: themeGlobal.typography.regular.FontFamily,
  //         FontStyle: themeGlobal.typography.regular.FontStyle,
  //         LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.Color,
  //         Alignment: `center`,
  //       },
  //       SectionHead: {
  //         MarginBottom: `20px`,
  //         Alignment: `center`,
  //       },
  //       SectionGrid: {
  //         Background: `#EBECF0`,
  //       },
  //       BorderBottom: {
  //         BorderWidth: `2px`,
  //         Background: `#343F64`,
  //         BottomSpace: `-8px`,
  //       },
  //       ViewMoreButton: {
  //         FontWeight: `500`,
  //         FontSize: `inherit`,
  //         LineHeight: `inherit`,
  //         Background: themeGlobal.bodyThemeColor.Button.Background,
  //         BorderColor: `transparent`,
  //         BorderRadius: `0`,
  //         Color: themeGlobal.bodyThemeColor.Button.Color,
  //         PaddingY: `0`,
  //         PaddingX: `0`,
  //         TextDecoration: `underline`,
  //         Hover: {
  //           Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //           BorderColor: `transparent`,
  //           Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //         }
  //       },
  //       ViewMoreSection: {
  //         MarginTop: `32px`,
  //       }
  //     },
  //     AboutUsPage: {
  //       h2: {
  //         FontWeight: themeGlobal.typography.h2.FontWeight,
  //         FontSize: themeGlobal.typography.h2.FontSize,
  //         LineHeight: themeGlobal.typography.h2.LineHeight,
  //         FontFamily: themeGlobal.typography.h2.FontFamily,
  //         FontStyle: themeGlobal.typography.h2.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //         Color: `rgba(38, 51, 93, 0.8)`,
  //         Alignment: `center`,
  //       },
  //       h3: {
  //         FontWeight: themeGlobal.typography.h3.FontWeight,
  //         FontSize: themeGlobal.typography.h3.FontSize,
  //         LineHeight: themeGlobal.typography.h3.LineHeight,
  //         FontFamily: themeGlobal.typography.h3.FontFamily,
  //         FontStyle: themeGlobal.typography.h3.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //         Alignment: `center`,
  //       },
  //       h4: {
  //         FontWeight: themeGlobal.typography.h4.FontWeight,
  //         FontSize: themeGlobal.typography.h4.FontSize,
  //         LineHeight: themeGlobal.typography.h4.LineHeight,
  //         FontFamily: themeGlobal.headerThemeTypo.h4.FontFamily,
  //         FontStyle: themeGlobal.headerThemeTypo.h4.FontStyle,
  //         LetterSpacing: themeGlobal.headerThemeTypo.h4.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //         Alignment: `center`,
  //       },
  //       h5: {
  //         FontWeight: themeGlobal.typography.h5.FontWeight,
  //         FontSize: themeGlobal.typography.h5.FontSize,
  //         LineHeight: themeGlobal.typography.h5.LineHeight,
  //         FontFamily: themeGlobal.headerThemeTypo.h5.FontFamily,
  //         FontStyle: themeGlobal.headerThemeTypo.h5.FontStyle,
  //         LetterSpacing: themeGlobal.headerThemeTypo.h5.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //         Alignment: `center`,
  //       },
  //       p: {
  //         FontWeight: themeGlobal.typography.regular.FontWeight,
  //         FontSize: themeGlobal.typography.regular.FontSize,
  //         LineHeight: themeGlobal.typography.regular.LineHeight,
  //         FontFamily: themeGlobal.typography.regular.FontFamily,
  //         FontStyle: themeGlobal.typography.regular.FontStyle,
  //         LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
  //         Color: `#202020`,
  //         Alignment: `center`,
  //       },
  //       SectionHead: {
  //         MarginBottom: `20px`,
  //         Alignment: `center`,
  //       },
  //       SectionGrid: {
  //         Background: `#EBECF0`,
  //       },
  //       BorderBottom: {
  //         BorderWidth: `2px`,
  //         Background: `#343F64`,
  //         BottomSpace: `-8px`,
  //       },
  //       MessageProfileImage: {
  //         Width: `160px`,
  //         Height: `160px`,
  //         BorderRadius: `50%`,
  //         MarginBottom: `24px`,
  //       },
  //       Dots: {
  //         Color: `rgba(32, 32, 32, 0.5)`,
  //         Active: {
  //           Color: `rgba(38, 51, 93, 0.8)`,
  //         }
  //       },
  //       SlickArrowColor: {
  //         Color: `rgba(38, 51, 93, 0.8)`,
  //         Hover: {
  //           Color: `rgba(38, 51, 93, 0.8)`,
  //         }
  //       },
  //       MissionSection: {
  //         Background: themeGlobal.color.alphaLight,
  //         BorderRadius: `20px`,
  //         MissionHead: {
  //           MarginBottom: `40px`,
  //           Alignment: `center`,
  //         }
  //       },
  //       VisionSection: {
  //         Background: themeGlobal.color.alphaLight,
  //         BorderRadius: `20px`,
  //         VisionHead: {
  //           MarginBottom: `40px`,
  //           Alignment: `center`,
  //         }
  //       }
  //     },
  //   },
  //   // Notice: {
  //   //   NoticeBoardHero: {
  //   //     a: {
  //   //       FontWeight: themeGlobal.typography.anchor.FontWeight,
  //   //       FontSize: themeGlobal.typography.anchor.FontSize,
  //   //       LineHeight: themeGlobal.typography.anchor.LineHeight,
  //   //       FontFamily: themeGlobal.typography.anchor.FontFamily,
  //   //       FontStyle: themeGlobal.typography.anchor.FontStyle,
  //   //       LetterSpacing: themeGlobal.typography.anchor.LetterSpacing,
  //   //       Color: themeGlobal.bodyThemeColor.typography.LinkColor,
  //   //       Hover: {
  //   //         Color: themeGlobal.bodyThemeColor.typography.Hover.LinkColor,
  //   //       }
  //   //     },
  //   //     PaddingY: `16px`,
  //   //     ContentBox: {
  //   //       width: `100%`,
  //   //     },
  //   //   },
  //   // },
  //   Principal: {
  //     PrincipalHero: {
  //       h4: {
  //         FontWeight: themeGlobal.typography.h4.FontWeight,
  //         FontSize: themeGlobal.typography.h4.FontSize,
  //         LineHeight: themeGlobal.typography.h4.LineHeight,
  //         FontFamily: themeGlobal.headerThemeTypo.h4.FontFamily,
  //         FontStyle: themeGlobal.headerThemeTypo.h4.FontStyle,
  //         LetterSpacing: themeGlobal.headerThemeTypo.h4.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h5: {
  //         FontWeight: themeGlobal.typography.h5.FontWeight,
  //         FontSize: themeGlobal.typography.h5.FontSize,
  //         LineHeight: themeGlobal.typography.h5.LineHeight,
  //         FontFamily: themeGlobal.headerThemeTypo.h5.FontFamily,
  //         FontStyle: themeGlobal.headerThemeTypo.h5.FontStyle,
  //         LetterSpacing: themeGlobal.headerThemeTypo.h5.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //       },
  //       p: {
  //         FontWeight: themeGlobal.typography.regular.FontWeight,
  //         FontSize: themeGlobal.typography.regular.FontSize,
  //         LineHeight: themeGlobal.typography.regular.LineHeight,
  //         FontFamily: themeGlobal.typography.regular.FontFamily,
  //         FontStyle: themeGlobal.typography.regular.FontStyle,
  //         LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
  //         Color: `#343F64`,
  //         PaddingTop: `24px`,
  //       },

  //       ViewMoreMessageButton: {
  //         FontWeight: `500`,
  //         FontSize: `inherit`,
  //         LineHeight: `inherit`,
  //         Background: themeGlobal.bodyThemeColor.Button.Background,
  //         BorderColor: `transparent`,
  //         BorderRadius: `0`,
  //         Color: themeGlobal.bodyThemeColor.Button.Color,
  //         PaddingY: `0`,
  //         PaddingX: `0`,
  //         TextDecoration: `underline`,
  //         Hover: {
  //           Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //           BorderColor: `transparent`,
  //           Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //         }
  //       },
  //       PrincipalProfileImage: {
  //         Width: `160px`,
  //         Height: `160px`,
  //         BorderRadius: `50%`,
  //         MarginBottom: `24px`,
  //       },
  //       Dots: {
  //         Color: `rgba(32, 32, 32, 0.5)`,
  //         Active: {
  //           Color: `rgba(38, 51, 93, 0.8)`,
  //         }
  //       },
  //       SlickArrowColor: {
  //         Color: `rgba(38, 51, 93, 0.8)`,
  //         Hover: {
  //           Color: `rgba(38, 51, 93, 0.8)`,
  //         }
  //       },
  //     }
  //   },
  //   Team: {
  //     TeamHero: {
  //       h2: {
  //         FontWeight: themeGlobal.typography.h2.FontWeight,
  //         FontSize: themeGlobal.typography.h2.FontSize,
  //         LineHeight: themeGlobal.typography.h2.LineHeight,
  //         FontFamily: themeGlobal.typography.h2.FontFamily,
  //         FontStyle: themeGlobal.typography.h2.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //         Alignment: `left`,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h3: {
  //         FontWeight: themeGlobal.typography.h3.FontWeight,
  //         FontSize: themeGlobal.typography.h3.FontSize,
  //         LineHeight: themeGlobal.typography.h3.LineHeight,
  //         FontFamily: themeGlobal.typography.h3.FontFamily,
  //         FontStyle: themeGlobal.typography.h3.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
  //         Alignment: `center`,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //       },
  //       h4: {
  //         FontWeight: themeGlobal.typography.h4.FontWeight,
  //         FontSize: themeGlobal.typography.h4.FontSize,
  //         LineHeight: themeGlobal.typography.h4.LineHeight,
  //         FontFamily: themeGlobal.typography.h4.FontFamily,
  //         FontStyle: themeGlobal.typography.h4.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //         MarginBottom: `10px`,
  //       },
  //       h5: {
  //         FontWeight: themeGlobal.typography.h5.FontWeight,
  //         FontSize: themeGlobal.typography.h5.FontSize,
  //         LineHeight: themeGlobal.typography.h5.LineHeight,
  //         FontFamily: themeGlobal.typography.h5.FontFamily,
  //         FontStyle: themeGlobal.typography.h5.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //       },
  //       TeamAlbumHomeCard: {
  //         BorderWidth: `0`,
  //         BorderColor: `transparent`,
  //         BorderRadius: `8px`,
  //         Height: `381px`,
  //         Background: `rgba(38, 51, 93, 0.05)`,
  //         Padding: `54px`,
  //         TeamAlbumHomeCardOverlay: {
  //           PaddingY: `0`,
  //           PaddingX: `0`,
  //           PrimaryBorderBottom: {
  //             Height: `1px`,
  //             Background: `transparent`,
  //             Bottom: `-5px`,
  //           },
  //         }
  //       },
  //       ViewMoreTeamButton: {
  //         FontWeight: `500`,
  //         FontSize: `15px`,
  //         LineHeight: `22px`,
  //         Background: themeGlobal.bodyThemeColor.Button.Background,
  //         BorderColor: `rgba(38, 51, 93, 0.8)`,
  //         BorderRadius: `4px`,
  //         Color: themeGlobal.bodyThemeColor.Button.Color,
  //         PaddingY: `8px`,
  //         PaddingX: `32px`,
  //         MarginTop: `48px`,
  //         Hover: {
  //           Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //           BorderColor: `transparent`,
  //           Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //         }
  //       }
  //     },
  //     TeamPage: {
  //       h2: {
  //         FontWeight: themeGlobal.typography.h2.FontWeight,
  //         FontSize: themeGlobal.typography.h2.FontSize,
  //         LineHeight: themeGlobal.typography.h2.LineHeight,
  //         FontFamily: themeGlobal.typography.h2.FontFamily,
  //         FontStyle: themeGlobal.typography.h2.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //         Alignment: `center`,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h3: {
  //         FontWeight: themeGlobal.typography.h3.FontWeight,
  //         FontSize: themeGlobal.typography.h3.FontSize,
  //         LineHeight: themeGlobal.typography.h3.LineHeight,
  //         FontFamily: themeGlobal.typography.h3.FontFamily,
  //         FontStyle: themeGlobal.typography.h3.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
  //         Alignment: `center`,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //       },
  //       h4: {
  //         FontWeight: themeGlobal.typography.h4.FontWeight,
  //         FontSize: themeGlobal.typography.h4.FontSize,
  //         LineHeight: themeGlobal.typography.h4.LineHeight,
  //         FontFamily: themeGlobal.typography.h4.FontFamily,
  //         FontStyle: themeGlobal.typography.h4.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //         MarginBottom: `10px`,
  //       },
  //       h5: {
  //         FontWeight: themeGlobal.typography.h5.FontWeight,
  //         FontSize: themeGlobal.typography.h5.FontSize,
  //         LineHeight: themeGlobal.typography.h5.LineHeight,
  //         FontFamily: themeGlobal.typography.h5.FontFamily,
  //         FontStyle: themeGlobal.typography.h5.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //       },
  //       TeamAlbumCard: {
  //         BorderWidth: `0`,
  //         BorderColor: `transparent`,
  //         BorderRadius: `8px`,
  //         Height: `381px`,
  //         Background: `rgba(38, 51, 93, 0.05)`,
  //         Padding: `54px`,
  //         TeamAlbumCardOverlay: {
  //           PaddingY: `0`,
  //           PaddingX: `0`,
  //           PrimaryBorderBottom: {
  //             Height: `1px`,
  //             Background: `transparent`,
  //             Bottom: `-5px`,
  //           },
  //         }
  //       },
  //     },
  //   },
  //   Facility: {
  //     FacilitiesHero: {
  //       h2: {
  //         FontWeight: themeGlobal.typography.h2.FontWeight,
  //         FontSize: themeGlobal.typography.h2.FontSize,
  //         LineHeight: themeGlobal.typography.h2.LineHeight,
  //         FontFamily: themeGlobal.typography.h2.FontFamily,
  //         FontStyle: themeGlobal.typography.h2.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //         Alignment: `left`,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h3: {
  //         FontWeight: themeGlobal.typography.h3.FontWeight,
  //         FontSize: themeGlobal.typography.h3.FontSize,
  //         LineHeight: themeGlobal.typography.h3.LineHeight,
  //         FontFamily: themeGlobal.typography.h3.FontFamily,
  //         FontStyle: themeGlobal.typography.h3.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
  //         Alignment: `center`,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //       },
  //       h4: {
  //         FontWeight: themeGlobal.typography.h4.FontWeight,
  //         FontSize: themeGlobal.typography.h4.FontSize,
  //         LineHeight: themeGlobal.typography.h4.LineHeight,
  //         FontFamily: themeGlobal.typography.h4.FontFamily,
  //         FontStyle: themeGlobal.typography.h4.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       p: {
  //         FontWeight: themeGlobal.typography.regular.FontWeight,
  //         FontSize: themeGlobal.typography.regular.FontSize,
  //         LineHeight: themeGlobal.typography.regular.LineHeight,
  //         FontFamily: themeGlobal.typography.regular.FontFamily,
  //         FontStyle: themeGlobal.typography.regular.FontStyle,
  //         LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
  //         Color: `rgba(32, 32, 32, 0.6)`,
  //       },
  //       ViewMoreFacilitiesButton: {
  //         FontWeight: `500`,
  //         FontSize: `15px`,
  //         LineHeight: `22px`,
  //         Background: themeGlobal.bodyThemeColor.Button.Background,
  //         BorderColor: `rgba(38, 51, 93, 0.8)`,
  //         BorderRadius: `4px`,
  //         Color: themeGlobal.bodyThemeColor.Button.Color,
  //         PaddingY: `8px`,
  //         PaddingX: `32px`,
  //         MarginTop: `48px`,
  //         Hover: {
  //           Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //           BorderColor: `transparent`,
  //           Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //         }
  //       },
  //       FacilitiesSliderDescription: {
  //         Padding: `14px`,
  //         Background: `#fff`,
  //         BorderBottom: {
  //           Height: `2px`,
  //           Background: `transparent`,
  //           BottomSpace: `-10px`,
  //         },
  //       },
  //     },
  //     FacilityPage: {
  //       h2: {
  //         FontWeight: themeGlobal.typography.h2.FontWeight,
  //         FontSize: themeGlobal.typography.h2.FontSize,
  //         LineHeight: themeGlobal.typography.h2.LineHeight,
  //         FontFamily: themeGlobal.typography.h2.FontFamily,
  //         FontStyle: themeGlobal.typography.h2.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //         Alignment: `left`,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h3: {
  //         FontWeight: themeGlobal.typography.h3.FontWeight,
  //         FontSize: themeGlobal.typography.h3.FontSize,
  //         LineHeight: themeGlobal.typography.h3.LineHeight,
  //         FontFamily: themeGlobal.typography.h3.FontFamily,
  //         FontStyle: themeGlobal.typography.h3.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
  //         Alignment: `center`,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //       },
  //       h4: {
  //         FontWeight: themeGlobal.typography.h4.FontWeight,
  //         FontSize: themeGlobal.typography.h4.FontSize,
  //         LineHeight: themeGlobal.typography.h4.LineHeight,
  //         FontFamily: themeGlobal.typography.h4.FontFamily,
  //         FontStyle: themeGlobal.typography.h4.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       p: {
  //         FontWeight: themeGlobal.typography.regular.FontWeight,
  //         FontSize: themeGlobal.typography.regular.FontSize,
  //         LineHeight: themeGlobal.typography.regular.LineHeight,
  //         FontFamily: themeGlobal.typography.regular.FontFamily,
  //         FontStyle: themeGlobal.typography.regular.FontStyle,
  //         LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
  //         Color: `rgba(32, 32, 32, 0.6)`,
  //       },
  //       FacilitiesDescription: {
  //         Padding: `14px`,
  //         Background: `#fff`,
  //         BorderBottom: {
  //           Height: `2px`,
  //           Background: `transparent`,
  //           BottomSpace: `-10px`,
  //         },
  //       },
  //     },
  //   },
  //   Gallery: {
  //     GalleryHero: {
  //       h2: {
  //         FontWeight: themeGlobal.typography.h2.FontWeight,
  //         FontSize: themeGlobal.typography.h2.FontSize,
  //         LineHeight: themeGlobal.typography.h2.LineHeight,
  //         FontFamily: themeGlobal.typography.h2.FontFamily,
  //         FontStyle: themeGlobal.typography.h2.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //         Alignment: `left`,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h3: {
  //         FontWeight: themeGlobal.typography.h3.FontWeight,
  //         FontSize: themeGlobal.typography.h3.FontSize,
  //         LineHeight: themeGlobal.typography.h3.LineHeight,
  //         FontFamily: themeGlobal.typography.h3.FontFamily,
  //         FontStyle: themeGlobal.typography.h3.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
  //         Alignment: `center`,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //       },
  //       h6: {
  //         FontWeight: themeGlobal.typography.h6.FontWeight,
  //         FontSize: themeGlobal.typography.h6.FontSize,
  //         LineHeight: themeGlobal.typography.h6.LineHeight,
  //         FontFamily: themeGlobal.typography.h6.FontFamily,
  //         FontStyle: themeGlobal.typography.h6.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
  //         Alignment: `center`,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       ViewMoreGalleryButton: {
  //         FontWeight: `500`,
  //         FontSize: `15px`,
  //         LineHeight: `22px`,
  //         Background: themeGlobal.bodyThemeColor.Button.Background,
  //         BorderColor: `rgba(38, 51, 93, 0.8)`,
  //         BorderRadius: `4px`,
  //         Color: themeGlobal.bodyThemeColor.Button.Color,
  //         PaddingY: `8px`,
  //         PaddingX: `32px`,
  //         MarginTop: `48px`,
  //         Hover: {
  //           Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //           BorderColor: `transparent`,
  //           Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //         }
  //       },
  //       GalleryCaption: {
  //         Background: `rgba(9, 51, 81, 0.6)`,
  //       }
  //     },
  //     GalleryPage: {
  //       h2: {
  //         FontWeight: themeGlobal.typography.h2.FontWeight,
  //         FontSize: themeGlobal.typography.h2.FontSize,
  //         LineHeight: themeGlobal.typography.h2.LineHeight,
  //         FontFamily: themeGlobal.typography.h2.FontFamily,
  //         FontStyle: themeGlobal.typography.h2.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //         Alignment: `left`,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h3: {
  //         FontWeight: themeGlobal.typography.h3.FontWeight,
  //         FontSize: themeGlobal.typography.h3.FontSize,
  //         LineHeight: themeGlobal.typography.h3.LineHeight,
  //         FontFamily: themeGlobal.typography.h3.FontFamily,
  //         FontStyle: themeGlobal.typography.h3.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
  //         Alignment: `center`,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //       },
  //       h6: {
  //         FontWeight: themeGlobal.typography.h6.FontWeight,
  //         FontSize: themeGlobal.typography.h6.FontSize,
  //         LineHeight: themeGlobal.typography.h6.LineHeight,
  //         FontFamily: themeGlobal.typography.h6.FontFamily,
  //         FontStyle: themeGlobal.typography.h6.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
  //         Alignment: `center`,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       GalleryCaption: {
  //         Background: `rgba(9, 51, 81, 0.6)`,
  //       }
  //     },
  //     GalleryListSection: {
  //       h2: {
  //         FontWeight: themeGlobal.typography.h2.FontWeight,
  //         FontSize: themeGlobal.typography.h2.FontSize,
  //         LineHeight: themeGlobal.typography.h2.LineHeight,
  //         FontFamily: themeGlobal.typography.h2.FontFamily,
  //         FontStyle: themeGlobal.typography.h2.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //         Alignment: `center`,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h4: {
  //         FontWeight: themeGlobal.typography.h4.FontWeight,
  //         FontSize: themeGlobal.typography.h4.FontSize,
  //         LineHeight: themeGlobal.typography.h4.LineHeight,
  //         FontFamily: themeGlobal.typography.h4.FontFamily,
  //         FontStyle: themeGlobal.typography.h4.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       GalleryListFilter: {
  //         MarginBottom: `40px`,
  //       },
  //       GalleryListFilterButton: {
  //         FontWeight: `500`,
  //         FontSize: `15px`,
  //         LineHeight: `18px`,
  //         Background: themeGlobal.bodyThemeColor.Button.Background,
  //         BorderColor: `#343F64`,
  //         BorderRadius: `4px`,
  //         Color: themeGlobal.bodyThemeColor.Button.Color,
  //         PaddingY: `8px`,
  //         PaddingX: `24px`,
  //         Hover: {
  //           Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //           BorderColor: `#343F64`,
  //           Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //         },
  //         Active: {
  //           Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //           BorderColor: `#343F64`,
  //           Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //         }
  //       }
  //     },
  //   },
  //   Contact: {
  //     ContactHero: {
  //       h2: {
  //         FontWeight: themeGlobal.typography.h2.FontWeight,
  //         FontSize: themeGlobal.typography.h2.FontSize,
  //         LineHeight: themeGlobal.typography.h2.LineHeight,
  //         FontFamily: themeGlobal.typography.h2.FontFamily,
  //         FontStyle: themeGlobal.typography.h2.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h3: {
  //         FontWeight: themeGlobal.typography.h3.FontWeight,
  //         FontSize: themeGlobal.typography.h3.FontSize,
  //         LineHeight: themeGlobal.typography.h3.LineHeight,
  //         FontFamily: themeGlobal.typography.h3.FontFamily,
  //         FontStyle: themeGlobal.typography.h3.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //       },
  //       p: {
  //         FontWeight: themeGlobal.typography.regular.FontWeight,
  //         FontSize: themeGlobal.typography.regular.FontSize,
  //         LineHeight: themeGlobal.typography.regular.LineHeight,
  //         FontFamily: themeGlobal.typography.regular.FontFamily,
  //         FontStyle: themeGlobal.typography.regular.FontStyle,
  //         LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
  //         Color: `#202020`,
  //         MarginBottom: `10px`,
  //       },
  //       ContactHomeHeroAddress: {
  //         AddressIcon: {
  //           Background: `rgba(38, 51, 93, 0.8)`
  //         },
  //         PhoneIcon: {
  //           Background: `rgba(38, 51, 93, 0.8)`
  //         },
  //         MailIcon: {
  //           Background: `rgba(38, 51, 93, 0.8)`
  //         }
  //       },
  //       ContactHomeHeroForm: {
  //         PlaceHolder: {
  //           FontWeight: `400`,
  //           FontSize: `14px`,
  //           LineHeight: `21px`,
  //           TextDecoration: `underline`,
  //           Color: `rgba(32, 32, 32, 0.6)`,
  //         },
  //         Input: {
  //           BorderColor: `rgba(55, 125, 239, 0.2)`,
  //           Color: `#343F64`,
  //           FontWeight: `400`,
  //           FontSize: `14px`,
  //           LineHeight: `21px`,
  //         },
  //         SubmitButton: {
  //           FontWeight: `400`,
  //           FontSize: `18px`,
  //           LineHeight: `24px`,
  //           Background: themeGlobal.bodyThemeColor.Button.Background,
  //           BorderColor: `rgba(38, 51, 93, 0.8)`,
  //           BorderRadius: `4px`,
  //           Color: themeGlobal.bodyThemeColor.Button.Color,
  //           PaddingY: `10px`,
  //           PaddingX: `40px`,
  //           Hover: {
  //             Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //             BorderColor: `rgba(38, 51, 93, 0.8)`,
  //             Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //           }
  //         }
  //       }
  //     },
  //     ContactPage: {
  //       h2: {
  //         FontWeight: themeGlobal.typography.h2.FontWeight,
  //         FontSize: themeGlobal.typography.h2.FontSize,
  //         LineHeight: themeGlobal.typography.h2.LineHeight,
  //         FontFamily: themeGlobal.typography.h2.FontFamily,
  //         FontStyle: themeGlobal.typography.h2.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h3: {
  //         FontWeight: themeGlobal.typography.h3.FontWeight,
  //         FontSize: themeGlobal.typography.h3.FontSize,
  //         LineHeight: themeGlobal.typography.h3.LineHeight,
  //         FontFamily: themeGlobal.typography.h3.FontFamily,
  //         FontStyle: themeGlobal.typography.h3.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //         BorderBottom: {
  //           BorderWidth: `2px`,
  //           Background: `#4E616B`,
  //           BottomSpace: `-8px`,
  //         }
  //       },
  //       h6: {
  //         FontWeight: themeGlobal.typography.h6.FontWeight,
  //         FontSize: themeGlobal.typography.h6.FontSize,
  //         LineHeight: themeGlobal.typography.h6.LineHeight,
  //         FontFamily: themeGlobal.typography.h6.FontFamily,
  //         FontStyle: themeGlobal.typography.h6.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       a: {
  //         FontWeight: themeGlobal.typography.anchor.FontWeight,
  //         FontSize: themeGlobal.typography.anchor.FontSize,
  //         LineHeight: themeGlobal.typography.anchor.LineHeight,
  //         FontFamily: themeGlobal.typography.anchor.FontFamily,
  //         FontStyle: themeGlobal.typography.anchor.FontStyle,
  //         LetterSpacing: themeGlobal.typography.anchor.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.LinkColor,
  //         Hover: {
  //           Color: themeGlobal.bodyThemeColor.typography.Hover.LinkColor,
  //         }
  //       },
  //       p: {
  //         FontWeight: themeGlobal.typography.regular.FontWeight,
  //         FontSize: themeGlobal.typography.regular.FontSize,
  //         LineHeight: themeGlobal.typography.regular.LineHeight,
  //         FontFamily: themeGlobal.typography.regular.FontFamily,
  //         FontStyle: themeGlobal.typography.regular.FontStyle,
  //         LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
  //         Color: `#343F64`,
  //       },
  //       ContactHead: {
  //         MarginBottom: `40px`,
  //         Alignment: `left`,
  //       },
  //       AddressIcon: {
  //         Background: `#343F64`
  //       },
  //       PhoneIcon: {
  //         Background: `#343F64`
  //       },
  //       MailIcon: {
  //         Background: `#343F64`
  //       }
  //     },
  //   },
  //   Admission: {
  //     AdmissionHero: {
  //       h2: {
  //         FontWeight: themeGlobal.typography.h2.FontWeight,
  //         FontSize: themeGlobal.typography.h2.FontSize,
  //         LineHeight: themeGlobal.typography.h2.LineHeight,
  //         FontFamily: themeGlobal.typography.h2.FontFamily,
  //         FontStyle: themeGlobal.typography.h2.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //         Alignment: `left`,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h4: {
  //         FontWeight: themeGlobal.typography.h4.FontWeight,
  //         FontSize: themeGlobal.typography.h4.FontSize,
  //         LineHeight: themeGlobal.typography.h4.LineHeight,
  //         FontFamily: themeGlobal.typography.h4.FontFamily,
  //         FontStyle: themeGlobal.typography.h4.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       p: {
  //         FontWeight: themeGlobal.typography.regular.FontWeight,
  //         FontSize: themeGlobal.typography.regular.FontSize,
  //         LineHeight: themeGlobal.typography.regular.LineHeight,
  //         FontFamily: themeGlobal.typography.regular.FontFamily,
  //         FontStyle: themeGlobal.typography.regular.FontStyle,
  //         LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
  //         Color: `rgba(32, 32, 32, 0.6)`,
  //       },
  //       AdmissionHomeHeroHead: {
  //         Alignment: `left`,
  //       },
  //       AdmissionItem: {
  //         Background: `#FFFFFF`,
  //       },
  //       AdmissionItemCaption: {
  //         Padding: `14px`,
  //       },
  //       ApplyNowButton: {
  //         FontWeight: `600`,
  //         FontSize: `14px`,
  //         LineHeight: `20px`,
  //         Background: themeGlobal.bodyThemeColor.Button.Background,
  //         BorderColor: `rgba(38, 51, 93, 0.8)`,
  //         BorderRadius: `24px`,
  //         Color: themeGlobal.bodyThemeColor.Button.Color,
  //         PaddingY: `8px`,
  //         PaddingX: `16px`,
  //         MarginTop: `10px`,
  //         Hover: {
  //           Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //           BorderColor: `transparent`,
  //           Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //         }
  //       },
  //       ViewMoreAdmissionHeroButton: {
  //         FontWeight: `500`,
  //         FontSize: `15px`,
  //         LineHeight: `22px`,
  //         Background: themeGlobal.bodyThemeColor.Button.Background,
  //         BorderColor: `rgba(38, 51, 93, 0.8)`,
  //         BorderRadius: `4px`,
  //         Color: themeGlobal.bodyThemeColor.Button.Color,
  //         PaddingY: `8px`,
  //         PaddingX: `32px`,
  //         MarginTop: `48px`,
  //         Hover: {
  //           Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //           BorderColor: `transparent`,
  //           Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //         }
  //       },
  //       ViewMoreAdmissionHeroSection: {
  //         Alignment: `center`
  //       }
  //     },
  //     AdmissionPage: {
  //       h2: {
  //         FontWeight: themeGlobal.typography.h2.FontWeight,
  //         FontSize: themeGlobal.typography.h2.FontSize,
  //         LineHeight: themeGlobal.typography.h2.LineHeight,
  //         FontFamily: themeGlobal.typography.h2.FontFamily,
  //         FontStyle: themeGlobal.typography.h2.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //         Alignment: `left`,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h4: {
  //         FontWeight: themeGlobal.typography.h4.FontWeight,
  //         FontSize: themeGlobal.typography.h4.FontSize,
  //         LineHeight: themeGlobal.typography.h4.LineHeight,
  //         FontFamily: themeGlobal.typography.h4.FontFamily,
  //         FontStyle: themeGlobal.typography.h4.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       p: {
  //         FontWeight: themeGlobal.typography.regular.FontWeight,
  //         FontSize: themeGlobal.typography.regular.FontSize,
  //         LineHeight: themeGlobal.typography.regular.LineHeight,
  //         FontFamily: themeGlobal.typography.regular.FontFamily,
  //         FontStyle: themeGlobal.typography.regular.FontStyle,
  //         LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
  //         Color: `rgba(32, 32, 32, 0.6)`,
  //       },
  //       AdmissionHead: {
  //         Alignment: `left`,
  //       },
  //       AdmissionItem: {
  //         Background: `#FFFFFF`,
  //       },
  //       AdmissionItemCaption: {
  //         Padding: `14px`,
  //       },
  //       ApplyNowButton: {
  //         FontWeight: `600`,
  //         FontSize: `14px`,
  //         LineHeight: `20px`,
  //         Background: themeGlobal.bodyThemeColor.Button.Background,
  //         BorderColor: `rgba(38, 51, 93, 0.8)`,
  //         BorderRadius: `24px`,
  //         Color: themeGlobal.bodyThemeColor.Button.Color,
  //         PaddingY: `8px`,
  //         PaddingX: `16px`,
  //         MarginTop: `10px`,
  //         Hover: {
  //           Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //           BorderColor: `transparent`,
  //           Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //         }
  //       }
  //     },
  //   },
  //   FeeStructure: {
  //     FeeStructureHero: {
  //       h2: {
  //         FontWeight: themeGlobal.typography.h2.FontWeight,
  //         FontSize: themeGlobal.typography.h2.FontSize,
  //         LineHeight: themeGlobal.typography.h2.LineHeight,
  //         FontFamily: themeGlobal.typography.h2.FontFamily,
  //         FontStyle: themeGlobal.typography.h2.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //         Alignment: `left`,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h3: {
  //         FontWeight: themeGlobal.typography.h3.FontWeight,
  //         FontSize: themeGlobal.typography.h3.FontSize,
  //         LineHeight: themeGlobal.typography.h3.LineHeight,
  //         FontFamily: themeGlobal.typography.h3.FontFamily,
  //         FontStyle: themeGlobal.typography.h3.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //       },
  //       h6: {
  //         FontWeight: themeGlobal.typography.h6.FontWeight,
  //         FontSize: themeGlobal.typography.h6.FontSize,
  //         LineHeight: themeGlobal.typography.h6.LineHeight,
  //         FontFamily: themeGlobal.typography.h6.FontFamily,
  //         FontStyle: themeGlobal.typography.h6.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       p: {
  //         FontWeight: themeGlobal.typography.regular.FontWeight,
  //         FontSize: themeGlobal.typography.regular.FontSize,
  //         LineHeight: themeGlobal.typography.regular.LineHeight,
  //         FontFamily: themeGlobal.typography.regular.FontFamily,
  //         FontStyle: themeGlobal.typography.regular.FontStyle,
  //         LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
  //         Color: `rgba(32, 32, 32, 0.6)`,
  //       },
  //       FeeStructureHeroHead: {
  //         MarginBottom: `24px`,
  //         Alignment: `left`,
  //       },
  //       ViewFeeButton: {
  //         FontWeight: `400`,
  //         FontSize: `14px`,
  //         LineHeight: `21px`,
  //         Background: themeGlobal.bodyThemeColor.Button.Background,
  //         BorderColor: `transparent`,
  //         BorderRadius: `0`,
  //         Color: themeGlobal.bodyThemeColor.Button.Color,
  //         PaddingY: `0`,
  //         PaddingX: `0`,
  //         MarginTop: `8px`,
  //         TextDecoration: `underline`,
  //         Hover: {
  //           Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //           BorderColor: `transparent`,
  //           Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //         }
  //       },
  //       ViewMoreFeeStructureHeroButton: {
  //         FontWeight: `500`,
  //         FontSize: `15px`,
  //         LineHeight: `22px`,
  //         Background: themeGlobal.bodyThemeColor.Button.Background,
  //         BorderColor: `rgba(38, 51, 93, 0.8)`,
  //         BorderRadius: `4px`,
  //         Color: themeGlobal.bodyThemeColor.Button.Color,
  //         PaddingY: `8px`,
  //         PaddingX: `32px`,
  //         MarginTop: `48px`,
  //         TextDecoration: `normal`,
  //         Hover: {
  //           Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //           BorderColor: `transparent`,
  //           Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //         }
  //       },
  //       ViewMoreFeeStructureHeroSection: {
  //         Alignment: `left`
  //       }
  //     },
  //     FeeStructurePage: {
  //       h2: {
  //         FontWeight: themeGlobal.typography.h2.FontWeight,
  //         FontSize: themeGlobal.typography.h2.FontSize,
  //         LineHeight: themeGlobal.typography.h2.LineHeight,
  //         FontFamily: themeGlobal.typography.h2.FontFamily,
  //         FontStyle: themeGlobal.typography.h2.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //         Alignment: `left`,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h3: {
  //         FontWeight: themeGlobal.typography.h3.FontWeight,
  //         FontSize: themeGlobal.typography.h3.FontSize,
  //         LineHeight: themeGlobal.typography.h3.LineHeight,
  //         FontFamily: themeGlobal.typography.h3.FontFamily,
  //         FontStyle: themeGlobal.typography.h3.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //       },
  //       h6: {
  //         FontWeight: themeGlobal.typography.h6.FontWeight,
  //         FontSize: themeGlobal.typography.h6.FontSize,
  //         LineHeight: themeGlobal.typography.h6.LineHeight,
  //         FontFamily: themeGlobal.typography.h6.FontFamily,
  //         FontStyle: themeGlobal.typography.h6.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       p: {
  //         FontWeight: themeGlobal.typography.regular.FontWeight,
  //         FontSize: themeGlobal.typography.regular.FontSize,
  //         LineHeight: themeGlobal.typography.regular.LineHeight,
  //         FontFamily: themeGlobal.typography.regular.FontFamily,
  //         FontStyle: themeGlobal.typography.regular.FontStyle,
  //         LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
  //         Color: `rgba(32, 32, 32, 0.6)`,
  //       },
  //       FeeStructurePageHead: {
  //         MarginBottom: `24px`,
  //         Alignment: `left`,
  //       },
  //       ViewFeeButton: {
  //         FontWeight: `400`,
  //         FontSize: `14px`,
  //         LineHeight: `21px`,
  //         Background: themeGlobal.bodyThemeColor.Button.Background,
  //         BorderColor: `transparent`,
  //         BorderRadius: `0`,
  //         Color: themeGlobal.bodyThemeColor.Button.Color,
  //         PaddingY: `0`,
  //         PaddingX: `0`,
  //         MarginTop: `8px`,
  //         TextDecoration: `underline`,
  //         Hover: {
  //           Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //           BorderColor: `transparent`,
  //           Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //         }
  //       },
  //     },
  //   },
  //   Notice: {
  //     NoticeBoardHero: {
  //       a: {
  //         FontWeight: themeGlobal.typography.anchor.FontWeight,
  //         FontSize: themeGlobal.typography.anchor.FontSize,
  //         LineHeight: themeGlobal.typography.anchor.LineHeight,
  //         FontFamily: themeGlobal.typography.anchor.FontFamily,
  //         FontStyle: themeGlobal.typography.anchor.FontStyle,
  //         LetterSpacing: themeGlobal.typography.anchor.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.LinkColor,
  //         Hover: {
  //           Color: themeGlobal.bodyThemeColor.typography.Hover.LinkColor,
  //         }
  //       },
  //       PaddingY: `16px`,
  //       ContentBox: {
  //         width: `100%`,
  //       },
  //       h2: {
  //         FontWeight: themeGlobal.typography.h2.FontWeight,
  //         FontSize: themeGlobal.typography.h2.FontSize,
  //         LineHeight: themeGlobal.typography.h2.LineHeight,
  //         FontFamily: themeGlobal.typography.h2.FontFamily,
  //         FontStyle: themeGlobal.typography.h2.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //         Alignment: `left`,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h3: {
  //         FontWeight: themeGlobal.typography.h3.FontWeight,
  //         FontSize: themeGlobal.typography.h3.FontSize,
  //         LineHeight: themeGlobal.typography.h3.LineHeight,
  //         FontFamily: themeGlobal.typography.h3.FontFamily,
  //         FontStyle: themeGlobal.typography.h3.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //       },
  //       h4: {
  //         FontWeight: themeGlobal.typography.h4.FontWeight,
  //         FontSize: themeGlobal.typography.h4.FontSize,
  //         LineHeight: themeGlobal.typography.h4.LineHeight,
  //         FontFamily: themeGlobal.typography.h4.FontFamily,
  //         FontStyle: themeGlobal.typography.h4.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h6: {
  //         FontWeight: themeGlobal.typography.h6.FontWeight,
  //         FontSize: themeGlobal.typography.h6.FontSize,
  //         LineHeight: themeGlobal.typography.h6.LineHeight,
  //         FontFamily: themeGlobal.typography.h6.FontFamily,
  //         FontStyle: themeGlobal.typography.h6.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       p: {
  //         FontWeight: themeGlobal.typography.regular.FontWeight,
  //         FontSize: themeGlobal.typography.regular.FontSize,
  //         LineHeight: themeGlobal.typography.regular.LineHeight,
  //         FontFamily: themeGlobal.typography.regular.FontFamily,
  //         FontStyle: themeGlobal.typography.regular.FontStyle,
  //         LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
  //         Color: `rgba(32, 32, 32, 0.6)`,
  //       },
  //       MiscellaneousHeroHead: {
  //         Alignment: `left`,
  //       },
  //       MiscellaneousHeroGrid: {
  //         Background: `rgba(9, 51, 81, 0.1)`,
  //         PaddingY: `36px`,
  //         PaddingX: `102px`,
  //       },
  //       MiscellaneousItem: {
  //         Background: `#fff`,
  //         Padding: `20px`,
  //       },
  //       DownloadButton: {
  //         FontWeight: `400`,
  //         FontSize: `14px`,
  //         LineHeight: `21px`,
  //         Background: themeGlobal.bodyThemeColor.Button.Background,
  //         BorderColor: `transparent`,
  //         BorderRadius: `0`,
  //         Color: themeGlobal.bodyThemeColor.Button.Color,
  //         PaddingY: `0`,
  //         PaddingX: `0`,
  //         MarginTop: `8px`,
  //         TextDecoration: `underline`,
  //         Hover: {
  //           Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //           BorderColor: `transparent`,
  //           Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //         }
  //       },
  //       ViewMoreMiscellaneousHeroButton: {
  //         FontWeight: `500`,
  //         FontSize: `15px`,
  //         LineHeight: `22px`,
  //         Background: themeGlobal.bodyThemeColor.Button.Background,
  //         BorderColor: `rgba(38, 51, 93, 0.8)`,
  //         BorderRadius: `4px`,
  //         Color: themeGlobal.bodyThemeColor.Button.Color,
  //         PaddingY: `8px`,
  //         PaddingX: `32px`,
  //         MarginTop: `48px`,
  //         TextDecoration: `normal`,
  //         Hover: {
  //           Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //           BorderColor: `transparent`,
  //           Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //         }
  //       },
  //       ViewMoreMiscellaneousHeroSection: {
  //         Alignment: `center`
  //       }
  //     },
  //   },
  //   Testimonial: {
  //     TestimonialHero: {
  //       h2: {
  //         FontWeight: themeGlobal.typography.h2.FontWeight,
  //         FontSize: themeGlobal.typography.h2.FontSize,
  //         LineHeight: themeGlobal.typography.h2.LineHeight,
  //         FontFamily: themeGlobal.typography.h2.FontFamily,
  //         FontStyle: themeGlobal.typography.h2.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //         Alignment: `left`,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h3: {
  //         FontWeight: themeGlobal.typography.h3.FontWeight,
  //         FontSize: themeGlobal.typography.h3.FontSize,
  //         LineHeight: themeGlobal.typography.h3.LineHeight,
  //         FontFamily: themeGlobal.typography.h3.FontFamily,
  //         FontStyle: themeGlobal.typography.h3.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //       },
  //       h4: {
  //         FontWeight: themeGlobal.typography.h4.FontWeight,
  //         FontSize: themeGlobal.typography.h4.FontSize,
  //         LineHeight: themeGlobal.typography.h4.LineHeight,
  //         FontFamily: themeGlobal.typography.h4.FontFamily,
  //         FontStyle: themeGlobal.typography.h4.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h5: {
  //         FontWeight: themeGlobal.typography.h5.FontWeight,
  //         FontSize: themeGlobal.typography.h5.FontSize,
  //         LineHeight: themeGlobal.typography.h5.LineHeight,
  //         FontFamily: themeGlobal.typography.h5.FontFamily,
  //         FontStyle: themeGlobal.typography.h5.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //       },
  //       h6: {
  //         FontWeight: themeGlobal.typography.h6.FontWeight,
  //         FontSize: themeGlobal.typography.h6.FontSize,
  //         LineHeight: themeGlobal.typography.h6.LineHeight,
  //         FontFamily: themeGlobal.typography.h6.FontFamily,
  //         FontStyle: themeGlobal.typography.h6.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       p: {
  //         FontWeight: themeGlobal.typography.regular.FontWeight,
  //         FontSize: themeGlobal.typography.regular.FontSize,
  //         LineHeight: themeGlobal.typography.regular.LineHeight,
  //         FontFamily: themeGlobal.typography.regular.FontFamily,
  //         FontStyle: themeGlobal.typography.regular.FontStyle,
  //         LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
  //         Color: `rgba(32, 32, 32, 0.6)`,
  //       },
  //       TestimonialHeroHead: {
  //         Alignment: `left`,
  //       },
  //       TestimonialHeroGrid: {
  //         Background: `rgba(9, 51, 81, 0.1)`,
  //         PaddingY: `36px`,
  //         PaddingX: `102px`,
  //       },
  //       TestimonialItem: {
  //         Background: `#fff`,
  //         Padding: `20px`,
  //       },
  //       ViewMoreTestimonialHeroButton: {
  //         FontWeight: `500`,
  //         FontSize: `15px`,
  //         LineHeight: `22px`,
  //         Background: themeGlobal.bodyThemeColor.Button.Background,
  //         BorderColor: `rgba(38, 51, 93, 0.8)`,
  //         BorderRadius: `4px`,
  //         Color: themeGlobal.bodyThemeColor.Button.Color,
  //         PaddingY: `8px`,
  //         PaddingX: `32px`,
  //         MarginTop: `48px`,
  //         TextDecoration: `normal`,
  //         Hover: {
  //           Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //           BorderColor: `transparent`,
  //           Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //         }
  //       },
  //       ViewMoreTestimonialHeroSection: {
  //         Alignment: `center`
  //       },

  //       Dots: {
  //         Color: `rgba(32, 32, 32, 0.5)`,
  //         Active: {
  //           Color: `rgba(38, 51, 93, 0.8)`,
  //         }
  //       },
  //       SlickArrowColor: {
  //         Color: `rgba(38, 51, 93, 0.8)`,
  //         Hover: {
  //           Color: `rgba(38, 51, 93, 0.8)`,
  //         }
  //       },
  //     },
  //   },
  //   Faqs: {
  //     FaqsHero: {
  //       h2: {
  //         FontWeight: themeGlobal.typography.h2.FontWeight,
  //         FontSize: themeGlobal.typography.h2.FontSize,
  //         LineHeight: themeGlobal.typography.h2.LineHeight,
  //         FontFamily: themeGlobal.typography.h2.FontFamily,
  //         FontStyle: themeGlobal.typography.h2.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h6: {
  //         FontWeight: themeGlobal.typography.h6.FontWeight,
  //         FontSize: themeGlobal.typography.h6.FontSize,
  //         LineHeight: themeGlobal.typography.h6.LineHeight,
  //         FontFamily: themeGlobal.typography.h6.FontFamily,
  //         FontStyle: themeGlobal.typography.h6.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       p: {
  //         FontWeight: themeGlobal.typography.regular.FontWeight,
  //         FontSize: themeGlobal.typography.regular.FontSize,
  //         LineHeight: themeGlobal.typography.regular.LineHeight,
  //         FontFamily: themeGlobal.typography.regular.FontFamily,
  //         FontStyle: themeGlobal.typography.regular.FontStyle,
  //         LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
  //         Color: `#343F64`,
  //       },

  //       FaqsHomeHeroHead: {
  //         MarginBottom: `40px`,
  //         Alignment: `center`,
  //       },
  //       FaqListItem: {
  //         BorderColor: `#4E616B`,
  //       },
  //       ViewMoreFaqsHeroButton: {
  //         FontWeight: `400`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Background: themeGlobal.bodyThemeColor.Button.Background,
  //         BorderColor: `#343F64`,
  //         BorderRadius: `4px`,
  //         Color: themeGlobal.bodyThemeColor.Button.Color,
  //         PaddingY: `10px`,
  //         PaddingX: `40px`,
  //         Hover: {
  //           Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //           BorderColor: `#343F64`,
  //           Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //         }
  //       },
  //       ViewMoreFaqsHeroSection: {
  //         Alignment: `left`,
  //         MarginTop: `32px`,
  //       }
  //     },
  //     FaqsPage: {
  //       h2: {
  //         FontWeight: themeGlobal.typography.h2.FontWeight,
  //         FontSize: themeGlobal.typography.h2.FontSize,
  //         LineHeight: themeGlobal.typography.h2.LineHeight,
  //         FontFamily: themeGlobal.typography.h2.FontFamily,
  //         FontStyle: themeGlobal.typography.h2.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h3: {
  //         FontWeight: themeGlobal.typography.h3.FontWeight,
  //         FontSize: themeGlobal.typography.h3.FontSize,
  //         LineHeight: themeGlobal.typography.h3.LineHeight,
  //         FontFamily: themeGlobal.typography.h3.FontFamily,
  //         FontStyle: themeGlobal.typography.h3.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //         TextDecoration: `underline`,
  //       },
  //       h6: {
  //         FontWeight: themeGlobal.typography.h6.FontWeight,
  //         FontSize: themeGlobal.typography.h6.FontSize,
  //         LineHeight: themeGlobal.typography.h6.LineHeight,
  //         FontFamily: themeGlobal.typography.h6.FontFamily,
  //         FontStyle: themeGlobal.typography.h6.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       p: {
  //         FontWeight: themeGlobal.typography.regular.FontWeight,
  //         FontSize: themeGlobal.typography.regular.FontSize,
  //         LineHeight: themeGlobal.typography.regular.LineHeight,
  //         FontFamily: themeGlobal.typography.regular.FontFamily,
  //         FontStyle: themeGlobal.typography.regular.FontStyle,
  //         LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
  //         Color: `#4E616B`,
  //       },

  //       FaqsHead: {
  //         MarginBottom: `40px`,
  //         Alignment: `center`,
  //       },
  //       FaqListItem: {
  //         BorderColor: `rgba(52, 63, 100, 0.1)`,
  //       },
  //     },
  //   },
  //   Vacancy: {
  //     VacancyHero: {
  //       h2: {
  //         FontWeight: themeGlobal.typography.h2.FontWeight,
  //         FontSize: themeGlobal.typography.h2.FontSize,
  //         LineHeight: themeGlobal.typography.h2.LineHeight,
  //         FontFamily: themeGlobal.typography.h2.FontFamily,
  //         FontStyle: themeGlobal.typography.h2.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //         Alignment: `left`,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h3: {
  //         FontWeight: themeGlobal.typography.h3.FontWeight,
  //         FontSize: themeGlobal.typography.h3.FontSize,
  //         LineHeight: themeGlobal.typography.h3.LineHeight,
  //         FontFamily: themeGlobal.typography.h3.FontFamily,
  //         FontStyle: themeGlobal.typography.h3.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //       },
  //       h4: {
  //         FontWeight: themeGlobal.typography.h4.FontWeight,
  //         FontSize: themeGlobal.typography.h4.FontSize,
  //         LineHeight: themeGlobal.typography.h4.LineHeight,
  //         FontFamily: themeGlobal.typography.h4.FontFamily,
  //         FontStyle: themeGlobal.typography.h4.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       p: {
  //         FontWeight: themeGlobal.typography.regular.FontWeight,
  //         FontSize: themeGlobal.typography.regular.FontSize,
  //         LineHeight: themeGlobal.typography.regular.LineHeight,
  //         FontFamily: themeGlobal.typography.regular.FontFamily,
  //         FontStyle: themeGlobal.typography.regular.FontStyle,
  //         LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
  //         Color: `rgba(32, 32, 32, 0.6)`,
  //       },
  //       VacancyHeroHead: {
  //         Alignment: `left`,
  //       },
  //       VacancyItem: {
  //         Background: `#FFFFFF`,
  //       },
  //       VacancyItemCaption: {
  //         PaddingY: `18px`,
  //         PaddingX: `14px`,
  //       },
  //       ApplyNowButton: {
  //         FontWeight: `600`,
  //         FontSize: `14px`,
  //         LineHeight: `20px`,
  //         Background: themeGlobal.bodyThemeColor.Button.Background,
  //         BorderColor: `rgba(38, 51, 93, 0.8)`,
  //         BorderRadius: `24px`,
  //         Color: themeGlobal.bodyThemeColor.Button.Color,
  //         PaddingY: `8px`,
  //         PaddingX: `16px`,
  //         MarginTop: `10px`,
  //         Hover: {
  //           Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //           BorderColor: `transparent`,
  //           Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //         }
  //       },
  //       ViewMoreVacancyHeroButton: {
  //         FontWeight: `500`,
  //         FontSize: `15px`,
  //         LineHeight: `22px`,
  //         Background: themeGlobal.bodyThemeColor.Button.Background,
  //         BorderColor: `rgba(38, 51, 93, 0.8)`,
  //         BorderRadius: `4px`,
  //         Color: themeGlobal.bodyThemeColor.Button.Color,
  //         PaddingY: `8px`,
  //         PaddingX: `32px`,
  //         MarginTop: `48px`,
  //         Hover: {
  //           Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //           BorderColor: `transparent`,
  //           Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //         }
  //       },
  //       ViewMoreVacancyHeroSection: {
  //         Alignment: `center`
  //       }
  //     },
  //     VacancyPage: {
  //       h2: {
  //         FontWeight: themeGlobal.typography.h2.FontWeight,
  //         FontSize: themeGlobal.typography.h2.FontSize,
  //         LineHeight: themeGlobal.typography.h2.LineHeight,
  //         FontFamily: themeGlobal.typography.h2.FontFamily,
  //         FontStyle: themeGlobal.typography.h2.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //         Alignment: `left`,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h3: {
  //         FontWeight: themeGlobal.typography.h3.FontWeight,
  //         FontSize: themeGlobal.typography.h3.FontSize,
  //         LineHeight: themeGlobal.typography.h3.LineHeight,
  //         FontFamily: themeGlobal.typography.h3.FontFamily,
  //         FontStyle: themeGlobal.typography.h3.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //       },
  //       h4: {
  //         FontWeight: themeGlobal.typography.h4.FontWeight,
  //         FontSize: themeGlobal.typography.h4.FontSize,
  //         LineHeight: themeGlobal.typography.h4.LineHeight,
  //         FontFamily: themeGlobal.typography.h4.FontFamily,
  //         FontStyle: themeGlobal.typography.h4.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       p: {
  //         FontWeight: themeGlobal.typography.regular.FontWeight,
  //         FontSize: themeGlobal.typography.regular.FontSize,
  //         LineHeight: themeGlobal.typography.regular.LineHeight,
  //         FontFamily: themeGlobal.typography.regular.FontFamily,
  //         FontStyle: themeGlobal.typography.regular.FontStyle,
  //         LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
  //         Color: `rgba(32, 32, 32, 0.6)`,
  //       },
  //       VacancyHeroHead: {
  //         Alignment: `center`,
  //       },
  //       VacancyItem: {
  //         Background: `#FFFFFF`,
  //       },
  //       VacancyItemCaption: {
  //         PaddingY: `18px`,
  //         PaddingX: `14px`,
  //       },
  //       ApplyNowButton: {
  //         FontWeight: `600`,
  //         FontSize: `14px`,
  //         LineHeight: `20px`,
  //         Background: themeGlobal.bodyThemeColor.Button.Background,
  //         BorderColor: `rgba(38, 51, 93, 0.8)`,
  //         BorderRadius: `24px`,
  //         Color: themeGlobal.bodyThemeColor.Button.Color,
  //         PaddingY: `8px`,
  //         PaddingX: `16px`,
  //         MarginTop: `10px`,
  //         Hover: {
  //           Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //           BorderColor: `transparent`,
  //           Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //         }
  //       },
  //       ViewMoreVacancyHeroButton: {
  //         FontWeight: `500`,
  //         FontSize: `15px`,
  //         LineHeight: `22px`,
  //         Background: themeGlobal.bodyThemeColor.Button.Background,
  //         BorderColor: `rgba(38, 51, 93, 0.8)`,
  //         BorderRadius: `4px`,
  //         Color: themeGlobal.bodyThemeColor.Button.Color,
  //         PaddingY: `8px`,
  //         PaddingX: `32px`,
  //         MarginTop: `48px`,
  //         Hover: {
  //           Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //           BorderColor: `transparent`,
  //           Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //         }
  //       },
  //       ViewMoreVacancyHeroSection: {
  //         Alignment: `center`
  //       }
  //     },
  //   },
  //   Announcement: {
  //     AnnouncementHero: {
  //       h2: {
  //         FontWeight: themeGlobal.typography.h2.FontWeight,
  //         FontSize: themeGlobal.typography.h2.FontSize,
  //         LineHeight: themeGlobal.typography.h2.LineHeight,
  //         FontFamily: themeGlobal.typography.h2.FontFamily,
  //         FontStyle: themeGlobal.typography.h2.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //         Alignment: `left`,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h3: {
  //         FontWeight: themeGlobal.typography.h3.FontWeight,
  //         FontSize: themeGlobal.typography.h3.FontSize,
  //         LineHeight: themeGlobal.typography.h3.LineHeight,
  //         FontFamily: themeGlobal.typography.h3.FontFamily,
  //         FontStyle: themeGlobal.typography.h3.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
  //         Alignment: `center`,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //       },
  //       h6: {
  //         FontWeight: themeGlobal.typography.h6.FontWeight,
  //         FontSize: themeGlobal.typography.h6.FontSize,
  //         LineHeight: themeGlobal.typography.h6.LineHeight,
  //         FontFamily: themeGlobal.typography.h6.FontFamily,
  //         FontStyle: themeGlobal.typography.h6.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
  //         Alignment: `left`,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       ViewMoreAnnouncementButton: {
  //         FontWeight: `500`,
  //         FontSize: `15px`,
  //         LineHeight: `22px`,
  //         Background: themeGlobal.bodyThemeColor.Button.Background,
  //         BorderColor: `rgba(38, 51, 93, 0.8)`,
  //         BorderRadius: `4px`,
  //         Color: themeGlobal.bodyThemeColor.Button.Color,
  //         PaddingY: `8px`,
  //         PaddingX: `32px`,
  //         MarginTop: `48px`,
  //         Hover: {
  //           Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
  //           BorderColor: `transparent`,
  //           Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
  //         }
  //       },
  //       AnnouncementCaption: {
  //         Background: `rgba(0, 0, 0, 0.5)`,
  //       }
  //     },
  //     AnnouncementPage: {
  //       h2: {
  //         FontWeight: themeGlobal.typography.h2.FontWeight,
  //         FontSize: themeGlobal.typography.h2.FontSize,
  //         LineHeight: themeGlobal.typography.h2.LineHeight,
  //         FontFamily: themeGlobal.typography.h2.FontFamily,
  //         FontStyle: themeGlobal.typography.h2.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //         Alignment: `left`,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       h3: {
  //         FontWeight: themeGlobal.typography.h3.FontWeight,
  //         FontSize: themeGlobal.typography.h3.FontSize,
  //         LineHeight: themeGlobal.typography.h3.LineHeight,
  //         FontFamily: themeGlobal.typography.h3.FontFamily,
  //         FontStyle: themeGlobal.typography.h3.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
  //         Alignment: `center`,
  //         Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //       },
  //       h6: {
  //         FontWeight: themeGlobal.typography.h6.FontWeight,
  //         FontSize: themeGlobal.typography.h6.FontSize,
  //         LineHeight: themeGlobal.typography.h6.LineHeight,
  //         FontFamily: themeGlobal.typography.h6.FontFamily,
  //         FontStyle: themeGlobal.typography.h6.FontStyle,
  //         LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
  //         Alignment: `left`,
  //         Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //       },
  //       AnnouncementCaption: {
  //         Background: `rgba(0, 0, 0, 0.5)`,
  //       }
  //     },
  //   },
  //   Global: {
  //     Modal: {
  //       ModalCloseWtc: {
  //         Color: themeGlobal.color.alpha,
  //         Hover: {
  //           Color: themeGlobal.color.beta,
  //         }
  //       },
  //       ModalHeadWtc: {
  //         h2: {
  //           FontWeight: themeGlobal.typography.h2.FontWeight,
  //           FontSize: themeGlobal.typography.h2.FontSize,
  //           LineHeight: themeGlobal.typography.h2.LineHeight,
  //           FontFamily: themeGlobal.typography.h2.FontFamily,
  //           FontStyle: themeGlobal.typography.h2.FontStyle,
  //           LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //           Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //           Alignment: `left`,
  //         },
  //         h3: {
  //           FontWeight: themeGlobal.typography.h3.FontWeight,
  //           FontSize: themeGlobal.typography.h3.FontSize,
  //           LineHeight: themeGlobal.typography.h3.LineHeight,
  //           FontFamily: themeGlobal.typography.h3.FontFamily,
  //           FontStyle: themeGlobal.typography.h3.FontStyle,
  //           LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
  //           Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //           Alignment: `left`,
  //         }
  //       },
  //       ModalBodyWTC: {
  //         h2: {
  //           FontWeight: themeGlobal.typography.h2.FontWeight,
  //           FontSize: themeGlobal.typography.h2.FontSize,
  //           LineHeight: themeGlobal.typography.h2.LineHeight,
  //           FontFamily: themeGlobal.typography.h2.FontFamily,
  //           FontStyle: themeGlobal.typography.h2.FontStyle,
  //           LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
  //           Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
  //           Alignment: `left`,
  //         },
  //         h3: {
  //           FontWeight: themeGlobal.typography.h3.FontWeight,
  //           FontSize: themeGlobal.typography.h3.FontSize,
  //           LineHeight: themeGlobal.typography.h3.LineHeight,
  //           FontFamily: themeGlobal.typography.h3.FontFamily,
  //           FontStyle: themeGlobal.typography.h3.FontStyle,
  //           LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
  //           Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
  //           Alignment: `left`,
  //         },
  //         p: {
  //           FontWeight: themeGlobal.typography.regular.FontWeight,
  //           FontSize: themeGlobal.typography.regular.FontSize,
  //           LineHeight: themeGlobal.typography.regular.LineHeight,
  //           FontFamily: themeGlobal.typography.regular.FontFamily,
  //           FontStyle: themeGlobal.typography.regular.FontStyle,
  //           LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
  //           Color: themeGlobal.color.alphaSemiLight,
  //           Alignment: `left`,
  //         }
  //       }
  //     },
  //     scrollbar: {
  //       scrollbarWidth: '10px',
  //       scrollbarTrackBackground: '#000',
  //       scrollbarThumbBorderRadius: '0',
  //       scrollbarThumbBackground: themeGlobal.color.alpha,
  //       scrollbarThumbBackgroundHover: themeGlobal.color.beta,
  //     },
  //     body: {
  //       bodyBackground: '#FFFFFF',
  //       bodyFont: `'Poppins', sans - serif`,
  //       bodyFontSize: '16px',
  //       bodyFontWeight: '600',
  //       bodyColor: '#8B417D',
  //       bodyLetterSpacing: 'normal',
  //     },
  //     container: {
  //       containerMaxWidth: '1140px',
  //     }
  //   },
  // }
  // const menuItemOptions = {
  //   "/": {
  //     titleKey: undefined, // No key availabel for home
  //     title: "Home",
  //     component: SectionBody["Defaultine_Body"],
  //     // component: SectionBody["Vespertine_Body"],
  //   },
  //   "/aboutus": {
  //     titleKey: undefined, // No key availabel for about menu option
  //     title: "About",
  //     component: AboutPages["Defaultine_AboutUsPage"],
  //     // component: AboutPages["Vespertine_AboutUsPage"],
  //   },
  //   "/faculty": {
  //     titleKey: "teamhead", // For dynamic header menu faculty option
  //     title: "Team",
  //     component: TeamPages["Defaultine_TeamPage"],
  //     // component: TeamPages["Vespertine_TeamPage"],
  //   },

  //   "/admission": {
  //     titleKey: "admissionhead", // For dynamic header menu faculty option
  //     title: "Admission",
  //     component: AdmissionPages["Defaultine_AdmissionPage"],
  //     // component: AdmissionPages["Vespertine_AdmissionPage"],
  //   },
  //   "/feestructure": {
  //     titleKey: "feestructurehead", // For dynamic header menu faculty option
  //     title: "Fee Structure",
  //     component: FeeStructurePages["Defaultine_FeeStructurePage"],
  //     // component: FeeStructurePages["Vespertine_FeeStructurePage"],
  //   },
  //   "/services": {
  //     titleKey: "Facilityhead", // For dynamic header menu faculty option
  //     title: "Facility",
  //     // component: FacilityPages[themeSuccess ? theme.Facility.FacilityPage.component : "Vespertine_FacilityPage"],
  //     component: FacilityPages["Defaultine_FacilityPage"],
  //   },
  //   "/announcements": {
  //     titleKey: "Announcementshead", // For dynamic header menu faculty option
  //     title: "Announcements",
  //     component: AnnouncementsPages["Defaultine_AnnouncementsPage"],
  //     // component: AnnouncementsPages["Vespertine_AnnouncementsPage"],
  //   },
  //   "/vacancy": {
  //     titleKey: "Vacancyshead", // For dynamic header menu faculty option
  //     title: "Vacancy",
  //     component: VacancyPages["Defaultine_VacancyPage"],
  //     // component: VacancyPages["Vespertine_VacancyPage"],
  //   },
  //   "/faqs": {
  //     titleKey: "Faqshead", // For dynamic header menu faculty option
  //     title: "Faqs",
  //     component: FaqsPages["Defaultine_FaqsPage"],
  //     // component: FaqsPages["Vespertine_FaqsPage"],
  //   },
  //   "/contactus": {
  //     titleKey: "Contacthead", // For dynamic header menu faculty option
  //     title: "Contact",
  //     component: ContactPages["Defaultine_ContactPage"],
  //     // component: ContactPages["Vespertine_ContactPage"],
  //   },
  //   "/gallery": {
  //     titleKey: "Galleryhead", // For dynamic header menu faculty option
  //     title: "Gallery",
  //     component: GalleryPages["Defaultine_GalleryPage"],
  //     // component: GalleryPages["Vespertine_GalleryPage"],
  //   },
  //   // "/gallery-list": {
  //   //       titleKey: "GalleryListhead", // For dynamic header menu faculty option
  //   //       title: "GalleryList",
  //   //       component: GalleryListPages["Vespertine_GalleryListPage"],
  //   // },
  //   // "/gallery-list": {
  //   //   titleKey: "GalleryListhead", // For dynamic header menu faculty option
  //   //   title: "GalleryList",
  //   //   component: GalleryListPages[themeSuccess ? theme.Gallery.GalleryPage.component : "Vespertine_GalleryListPage"],
  //   // },
  //   // "/admission": {
  //   //   titleKey: "admissionhead", // For dynamic header menu admission option
  //   //   title: "Admissions",
  //   //   component: Admissions,
  //   // },
  //   // "/feestructure": {
  //   //   titleKey: "feehead", // For dynamic header menu feestructure option
  //   //   title: "Fee Structure",
  //   //   component: FeeStructure,
  //   // },
  //   // "/services": {
  //   //   titleKey: "servicehead", // For dynamic header menu services option
  //   //   title: "Services",
  //   //   component: Service,
  //   // },
  //   // "/announcements": {
  //   //   titleKey: "announcementhead", // For dynamic header menu announcements option
  //   //   title: "Announcement",
  //   //   component: WebsiteAnnouncement,
  //   // },
  //   // "/gallery": {
  //   //   titleKey: "galleryhead", // For dynamic header menu gallery option
  //   //   title: "Gallery",
  //   //   component: WebsiteGallery,
  //   // },
  //   // "/faqs": {
  //   //   titleKey: "faqhead", // For dynamic header menu faqs option
  //   //   title: "FAQs",
  //   //   component: Faqs,
  //   // },
  //   // "/miscellaneous": {
  //   //   titleKey: "noticehead", // For dynamic header menu notice option
  //   //   title: " Miscellaneous",
  //   //   component: WebsiteMiscellaneous,
  //   // },
  //   // "/vacancy": {
  //   //   titleKey: "vacancyhead", // For dynamic header menu vacancy option
  //   //   title: "Vacancy",
  //   //   component: WebsiteVacancy,
  //   // },
  //   // "/book_Appointment": {
  //   //   titleKey: "", // For dynamic header menu vacancy option
  //   //   title: "BookAppointment",
  //   //   component: WebsiteBookAppointment,
  //   // },
  //   // "/contactus": {
  //   //   titleKey: "", //  No key availabel for contact menu option
  //   //   title: "Contact",
  //   //   component: Contactus,
  //   // },
  // };
  const menuItemOptions = {
    "/": {
      titleKey: undefined, // No key availabel for home
      title: "Home",
      component: SectionBody[themeSuccess ? theme.themeGlobal.component : "Vespertine_Body"],
    },
    "/aboutus": {
      titleKey: undefined, // No key availabel for about menu option
      title: "About",
      component: AboutPages[themeSuccess ? theme.AboutUs.AboutUsPage.component : "Vespertine_AboutUsPage"],
    },
    "/faculty": {
      titleKey: "teamhead", // For dynamic header menu faculty option
      title: "Team",
      component: TeamPages[themeSuccess ? theme.Team.TeamPage.component : "Vespertine_TeamPage"],
    },

    "/admission": {
      titleKey: "admissionhead", // For dynamic header menu faculty option
      title: "Admission",
      component: AdmissionPages[themeSuccess ? theme.Admission.AdmissionPage.component : "Vespertine_AdmissionPage"],
    },
    "/feestructure": {
      titleKey: "feestructurehead", // For dynamic header menu faculty option
      title: "Fee Structure",
      component: FeeStructurePages[themeSuccess ? theme.FeeStructure.FeeStructurePage.component : "Vespertine_FeeStructurePage"],
    },
    "/services": {
      titleKey: "Facilityhead", // For dynamic header menu faculty option
      title: "Facility",
      component: FacilityPages[themeSuccess ? theme.Facility.FacilityPage.component : "Vespertine_FacilityPage"],
    },
    "/announcements": {
      titleKey: "Announcementshead", // For dynamic header menu faculty option
      title: "Announcements",
      component: AnnouncementsPages[themeSuccess ? theme.Announcement.AnnouncementPage.component : "Vespertine_AnnouncementsPage"],
    },
    "/vacancy": {
      titleKey: "Vacancyshead", // For dynamic header menu faculty option
      title: "Vacancy",
      component: VacancyPages[themeSuccess ? theme.Vacancy.VacancyPage.component : "Vespertine_VacancyPage"],
    },
    "/faqs": {
      titleKey: "Faqshead", // For dynamic header menu faculty option
      title: "Faqs",
      component: FaqsPages[themeSuccess ? theme.Faqs.FaqsPage.component : "Vespertine_FaqsPage"],
    },
    "/contactus": {
      titleKey: "Contacthead", // For dynamic header menu faculty option
      title: "Contact",
      component: ContactPages[themeSuccess ? theme.Contact.ContactPage.component : "Vespertine_ContactPage"],
    },
    "/gallery": {
      titleKey: "Galleryhead", // For dynamic header menu faculty option
      title: "Gallery",
      component: GalleryPages[themeSuccess ? theme.Gallery.GalleryPage.component : "Vespertine_GalleryPage"],
    },
    "/miscellaneous":{
      titleKey: "noticehead", // No key availabel for privacy option
      title: "Miscellanous",
      component: MiscellaneousPageComponents[themeSuccess ? theme.themeGlobal.component === "Vespertine_Body" ? "Vaspertine_MiscellaneousPage" : "Vaspertine_MiscellaneousPage" : "Vaspertine_MiscellaneousPage"],
  
    }
    // "/admission": {
    //   titleKey: "admissionhead", // For dynamic header menu admission option
    //   title: "Admissions",
    //   component: Admissions,
    // },
    // "/feestructure": {
    //   titleKey: "feehead", // For dynamic header menu feestructure option
    //   title: "Fee Structure",
    //   component: FeeStructure,
    // },
    // "/services": {
    //   titleKey: "servicehead", // For dynamic header menu services option
    //   title: "Services",
    //   component: Service,
    // },
    // "/announcements": {
    //   titleKey: "announcementhead", // For dynamic header menu announcements option
    //   title: "Announcement",
    //   component: WebsiteAnnouncement,
    // },
    // "/gallery": {
    //   titleKey: "galleryhead", // For dynamic header menu gallery option
    //   title: "Gallery",
    //   component: WebsiteGallery,
    // },
    // "/faqs": {
    //   titleKey: "faqhead", // For dynamic header menu faqs option
    //   title: "FAQs",
    //   component: Faqs,
    // },
    // "/miscellaneous": {
    //   titleKey: "noticehead", // For dynamic header menu notice option
    //   title: " Miscellaneous",
    //   component: WebsiteMiscellaneous,
    // },
    // "/vacancy": {
    //   titleKey: "vacancyhead", // For dynamic header menu vacancy option
    //   title: "Vacancy",
    //   component: WebsiteVacancy,
    // },
    // "/book_Appointment": {
    //   titleKey: "", // For dynamic header menu vacancy option
    //   title: "BookAppointment",
    //   component: WebsiteBookAppointment,
    // },
    // "/contactus": {
    //   titleKey: "", //  No key availabel for contact menu option
    //   title: "Contact",
    //   component: Contactus,
    // },
  };
  const dispatch = useDispatch()
  const HeaderToRender = SectionHeader[themeSuccess && theme.Header.component ? theme.Header.component : "Vespertine_Header"];
  const FooterToRender = SectionFooter[themeSuccess && theme.Footer.component ? theme.Footer.component : 'Vespertine_Footer'];
  const BodyToRender = SectionBody[themeSuccess && theme.themeGlobal.component]
  const selectedRoute = () => {
    const menuItem = menuItemOptions[pathname];
    let MenuComponent;
    if (menuItem) {
      MenuComponent = menuItem.component;
    }
    if (pathname === "/" || !menuItem) {
      return (
        <React.Fragment><BodyToRender /></React.Fragment>
      );
    } else {
      return <MenuComponent />;
    }
  };
  useEffect(() => {
    dispatch(selectRouteForPreview("/", true))
  }, [dispatch])
  useEffect(() => {
    if (themeSuccess) {
      dispatch(getGalleryAlbum(themeSuccess && theme.instituteData._id))
    }
  }, [dispatch, theme.instituteData._id, themeSuccess])
  return (
    <React.Fragment>
      <SuccessMessagePopup />
      {themeSuccess ? <ThemeProvider theme={theme}>
        <WebsiteTypoStyle />
        {/* <Headroom style={{
          WebkitTransition: 'all .5s ease-in-out',
          MozTransition: 'all .5s ease-in-out',
          OTransition: 'all .5s ease-in-out',
          transition: 'all .5s ease-in-out'
        }}> */}
          <HeaderToRender preview={true} />
        {/* </Headroom> */}
        <SectionBodyCustom>
          {selectedRoute()}
        </SectionBodyCustom>
        <FooterToRender preview={true} />
      </ThemeProvider> : <ComponentLoader />}
    </React.Fragment>
  )
}

export default WebsiteTemplatePreview