import { useState } from "react";
import { useSelector } from "react-redux";



const useTheme = () => {
  const {themeGlobal}=useSelector((state)=>state.serviceTemplate.getTemplate.data )
    // const [theme,setTheme]=useState("")
    // const themeGlobal = {
    //   color: {
    //     alpha: `#006f9c`,
    //     alphaSemiLight: `#4E616B`,
    //     alphaLight: `#EBECF0`,
    //     beta: `#FDEDE1`,
    //     betaSemiLight: ``,
    //     betaLight: ``,
    //     background: ``,
    //     base: `#202020`,
    //     baseSemiLight: `rgba(32, 32, 32, 0.6)`,
    //     baseLight: `rgba(32, 32, 32, 0.4)`,
    //     universal: `#FFFFFF`,
    //   },
    //   typography: {
    //     h1: {
    //       FontSize: `36px`,
    //       FontWeight: `700`,
    //       LineHeight: `49px`,
    //       FontFamily: ``,
    //       Url: '',
    //       FontStyle: `Normal`,
    //       LetterSpacing: ``,
    //     },
    //     h2: {
    //       FontSize: `32px`,
    //       FontWeight: `700`,
    //       LineHeight: `48px`,
    //       FontFamily: ``,
    //       Url: '',
    //       FontStyle: ``,
    //       LetterSpacing: ``,
    //     },
    //     h3: {
    //       FontSize: `18px`,
    //       FontWeight: `500`,
    //       LineHeight: `20px`,
    //       FontFamily: ``,
    //       Url: '',
    //       FontStyle: ``,
    //       LetterSpacing: ``,
    //     },
    //     h4: {
    //       FontSize: `24px`,
    //       FontWeight: `600`,
    //       LineHeight: `20px`,
    //       FontFamily: ``,
    //       Url: '',
    //       FontStyle: ``,
    //       LetterSpacing: ``,
    //     },
    //     h5: {
    //       FontSize: `18px`,
    //       FontWeight: `500`,
    //       LineHeight: `20px`,
    //       LetterSpacing: ``,
    //       FontFamily: ``,
    //       Url: '',
    //       FontStyle: ``,
    //     },
    //     h6: {
    //       FontSize: `16px`,
    //       FontWeight: `600`,
    //       LineHeight: `24px`,
    //       LetterSpacing: ``,
    //       FontFamily: ``,
    //       Url: '',
    //       FontStyle: ``,
    //     },
    //     regular: {
    //       FontSize: `16px`,
    //       FontWeight: `400`,
    //       LineHeight: `24px`,
    //       LetterSpacing: ``,
    //       FontFamily: ``,
    //       Url: '',
    //       FontStyle: ``,
    //     },
    //     anchor: {
    //       FontWeight: '500',
    //       FontSize: '16px',
    //       LineHeight: '1.24',
    //       LetterSpacing: ``,
    //       FontFamily: ``,
    //       FontStyle: ``,
    //     },
    //   },
    //   headerThemeColor: {
    //     Background: `#FFFFFF`,
    //     h4: {
    //       Color: '#006f9c',
    //     },
    //     h5: {
    //       Color: '#4E616B',
    //     },
    //     h6: {
    //       Color: '#006f9c',
    //     },
    //     p: {
    //       Color: '#f48631',
    //     },
    //     a: {
    //       Color: '#f48631',
    //     },
    //     ButtonLogin: {
    //       Background: `#006f9c`,
    //       Color: `#FFFFFF`,
    //       BorderColor: `#006f9c`,
    //       Hover: {
    //         Background: `#006f9c`,
    //         Color: `#FDEDE1`,
    //         BorderColor: `#006f9c`,
    //       },
    //       Active: {
    //         Background: `#006f9c`,
    //         Color: `#FDEDE1`,
    //         BorderColor: `#006f9c`,
    //       }
    //     },
    //     BookAppoinmentButton: {
    //       Background: `#FDEDE1`,
    //       Color: `#006f9c`,
    //       BorderColor: `transparent`,
    //       Hover: {
    //         Background: `#FFFFFF`,
    //         Color: `#006f9c`,
    //         BorderColor: `transparent`,
    //       }
    //     },
    //     ButtonSignup: {
    //       Background: `#FFFFFF`,
    //       BorderColor: `#006f9c`,
    //       Color: `#006f9c`,
    //       Hover: {
    //         Background: `#006f9c`,
    //         Color: `#FDEDE1`,
    //         BorderColor: `#006f9c`,
    //       },
    //       Active: {
    //         Background: `#006f9c`,
    //         Color: `#FDEDE1`,
    //         BorderColor: `#006f9c`,
    //       }
    //     },
    //     NavMenu: {
    //       Background: `#006f9c`,
    //       Color: `#FFFFFF`,
    //       Hover: {
    //         Color: `#FDEDE1`,
    //       },
    //       ScrollIcon: {
    //         Color: `#FFFFFF`,
    //         Hover: {
    //           Color: `#FDEDE1`,
    //         }
    //       }
    //     },
    //   },
    //   footerThemeColor: {
    //     Background: `#006f9c`,
    //     Logo: {
    //       Background: `#FFFFFF`,
    //     },
    //     h2: {
    //       Color: '#FCFEFE',
    //     },
    //     h3: {
    //       Color: '#FCFEFE',
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
    //     a: {
    //       Color: `#FCFEFE`,
    //       Hover: {
    //         Color: `#FDEDE1`,
    //       }
    //     },
    //     Copyright: {
    //       Color: `#FFFFFF`,
    //     }
    //   },
    //   headerThemeTypo: {
    //     h4: {
    //       FontSize: `24px`,
    //       FontWeight: `700`,
    //       LineHeight: `33px`,
    //       LetterSpacing: ``,
    //       FontFamily: ``,
    //       Url: '',
    //       FontStyle: ``,
    //     },
    //     h5: {
    //       FontSize: `16px`,
    //       FontWeight: `500`,
    //       LineHeight: `20px`,
    //       LetterSpacing: ``,
    //       FontFamily: ``,
    //       Url: '',
    //       FontStyle: ``,
    //     },
    //     h6: {
    //       FontSize: `14px`,
    //       FontWeight: `500`,
    //       LineHeight: `16px`,
    //       LetterSpacing: ``,
    //       FontFamily: ``,
    //       Url: '',
    //       FontStyle: ``,
    //     },
    //     p: {
    //       FontSize: `14px`,
    //       FontWeight: `500`,
    //       LineHeight: `16px`,
    //       LetterSpacing: ``,
    //       FontFamily: ``,
    //       Url: '',
    //       FontStyle: ``,
    //     },
    //     Button: {
    //       FontWeight: `500`,
    //       FontSize: `15px`,
    //       LineHeight: `18px`,
    //       LetterSpacing: ``,
    //       FontFamily: ``,
    //       Url: '',
    //       FontStyle: ``,
    //     },
    //     BookAppoinmentButton: {
    //       FontWeight: `700`,
    //       FontSize: `16px`,
    //       LineHeight: `22px`,
    //       LetterSpacing: ``,
    //       FontFamily: ``,
    //       Url: '',
    //       FontStyle: ``,
    //     },
    //     NavMenu: {
    //       FontWeight: `500`,
    //       FontSize: `16px`,
    //       LineHeight: `20px`,
    //       LetterSpacing: ``,
    //       FontFamily: ``,
    //       Url: '',
    //       FontStyle: ``,
    //     }
    //   },
    //   footerThemeTypo: {
    //     h2: {
    //       FontSize: `18px`,
    //       FontWeight: `700`,
    //       LineHeight: `25px`,
    //       LetterSpacing: ``,
    //       FontFamily: ``,
    //       Url: '',
    //       FontStyle: ``,
    //     },
    //     h3: {
    //       FontSize: `16px`,
    //       FontWeight: `400`,
    //       LineHeight: `24px`,
    //       LetterSpacing: ``,
    //       FontFamily: ``,
    //       Url: '',
    //       FontStyle: ``,
    //     },
    //     h4: {
    //       FontSize: `18px`,
    //       FontWeight: `600`,
    //       LineHeight: `25px`,
    //       LetterSpacing: ``,
    //       FontFamily: ``,
    //       Url: '',
    //       FontStyle: ``,
    //     },
    //     h5: {
    //       FontSize: `16px`,
    //       FontWeight: `500`,
    //       LineHeight: `20px`,
    //       LetterSpacing: ``,
    //       FontFamily: ``,
    //       Url: '',
    //       FontStyle: ``,
    //     },
    //     h6: {
    //       FontSize: `16px`,
    //       FontWeight: `500`,
    //       LineHeight: `24px`,
    //       LetterSpacing: ``,
    //       FontFamily: ``,
    //       Url: '',
    //       FontStyle: ``,
    //     },
    //     p: {
    //       FontWeight: '400',
    //       FontSize: '14px',
    //       LineHeight: '20px',
    //       LetterSpacing: ``,
    //       FontFamily: ``,
    //       Url: '',
    //       FontStyle: ``,
    //     },
    //     a: {
    //       FontWeight: '400',
    //       FontSize: '16px',
    //       LineHeight: '26px',
    //       LetterSpacing: ``,
    //       FontFamily: ``,
    //       Url: '',
    //       FontStyle: ``,
    //     },
    //     Copyright: {
    //       FontWeight: '400',
    //       FontSize: '16px',
    //       LineHeight: '22px',
    //       LetterSpacing: ``,
    //       FontFamily: ``,
    //       Url: '',
    //       FontStyle: ``,
    //     }
    //   },
    //   headerThemeUtilities: {
    //     Logo: {
    //       Width: '84px',
    //       Height: '84px',
    //     },
    //     h2: {
    //       TextTransform: 'capitalize',
    //       TextAlignment: 'left',
    //     },
    //     h3: {
    //       TextTransform: 'capitalize',
    //       TextAlignment: 'left',
    //     },
    //     h4: {
    //       TextTransform: 'capitalize',
    //       TextAlignment: 'left',
    //     },
    //     h5: {
    //       TextTransform: 'uppercase',
    //       TextAlignment: 'left',
    //     },
    //     h6: {
    //       TextTransform: 'uppercase',
    //       TextAlignment: 'left',
    //     },
    //     p: {
    //       TextTransform: '',
    //       TextAlignment: 'left',
    //     },
    //     Button: {
    //       PaddingY: '10px',
    //       PaddingX: '14px',
    //       BorderRadius: '4px',
    //     },
    //     BookAppoinmentButton: {
    //       PaddingY: '8px',
    //       PaddingX: '24px',
    //       BorderRadius: '50px',
    //       TextTransform: 'uppercase',
    //       TextAlignment: '',
    //     },
    //     NavMenu: {
    //       MenuGap: `28px`,
    //     }
    //   },
    //   footerThemeUtilities: {
    //     Logo: {
    //       Width: `74px`,
    //       Height: "74px",
    //       BorderRadius: "0",
    //       PaddingX: "4px",
    //       PaddingY: "4px",
    //     },
    //     h2: {
    //       TextTransform: `uppercase`,
    //       TextAlignment: ``,
    //     },
    //     h3: {
    //       TextTransform: `uppercase`,
    //       TextAlignment: ``,
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
    //     Map: {
    //       Height: `157px`
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
    //       HeadingColor: `#006f9c`,
    //       SubHeadingColor: `#f48631`,
    //       LinkColor: `#f48631`,
    //       Hover: {
    //         LinkColor: `#006f9c`,
    //       }
    //     },
    //     Button: {
    //       Background: `#006f9c`,
    //       Color: `#FDEDE1`,
    //       Hover: {
    //         Background: `#FDEDE1`,
    //         Color: `#006f9c`,
    //       }
    //     }
    //   }
    // }
    const theme = {
      Header: {
        component: "TheTranquill_Header",
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
          Url: themeGlobal.headerThemeTypo.h4.Url,
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
          Url: themeGlobal.headerThemeTypo.h5.Url,
          FontStyle: themeGlobal.headerThemeTypo.h5.FontStyle,
          LetterSpacing: themeGlobal.headerThemeTypo.h5.LetterSpacing,
          Color: themeGlobal.headerThemeColor.h5.Color,
          TextTransform: themeGlobal.headerThemeUtilities.h5.TextTransform,
          TextAlignment: themeGlobal.headerThemeUtilities.h5.TextAlignment,
        },
        h6: {
          FontSize: themeGlobal.headerThemeTypo.h6.FontSize,
          FontWeight: themeGlobal.headerThemeTypo.h6.FontWeight,
          LineHeight: themeGlobal.headerThemeTypo.h6.LineHeight,
          FontFamily: themeGlobal.headerThemeTypo.h6.FontFamily,
          Url: themeGlobal.headerThemeTypo.h6.Url,
          FontStyle: themeGlobal.headerThemeTypo.h6.FontStyle,
          LetterSpacing: themeGlobal.headerThemeTypo.h6.LetterSpacing,
          Color: themeGlobal.headerThemeColor.h6.Color,
          TextTransform: themeGlobal.headerThemeUtilities.h6.TextTransform,
          TextAlignment: themeGlobal.headerThemeUtilities.h6.TextAlignment,
        },
        p: {
          FontSize: themeGlobal.headerThemeTypo.p.FontSize,
          FontWeight: themeGlobal.headerThemeTypo.p.FontWeight,
          LineHeight: themeGlobal.headerThemeTypo.p.LineHeight,
          FontFamily: themeGlobal.headerThemeTypo.p.FontFamily,
          Url: themeGlobal.headerThemeTypo.p.Url,
          FontStyle: themeGlobal.headerThemeTypo.p.FontStyle,
          LetterSpacing: themeGlobal.headerThemeTypo.p.LetterSpacing,
          Color: themeGlobal.headerThemeColor.p.Color,
          TextTransform: themeGlobal.headerThemeUtilities.p.TextTransform,
          TextAlignment: themeGlobal.headerThemeUtilities.p.TextAlignment,
        },
        NavAuth: {
          ButtonLogin: {
            FontSize: themeGlobal.headerThemeTypo.Button.FontSize,
            FontWeight: themeGlobal.headerThemeTypo.Button.FontWeight,
            LineHeight: themeGlobal.headerThemeTypo.Button.LineHeight,
            FontFamily: themeGlobal.headerThemeTypo.Button.FontFamily,
            Url: themeGlobal.headerThemeTypo.Button.Url,
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
            Url: themeGlobal.headerThemeTypo.Button.Url,
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
            Url: themeGlobal.headerThemeTypo.NavMenu.Url,
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
          },
          BookAppoinmentButton: {
            FontSize: themeGlobal.headerThemeTypo.BookAppoinmentButton.FontSize,
            FontWeight: themeGlobal.headerThemeTypo.BookAppoinmentButton.FontWeight,
            LineHeight: themeGlobal.headerThemeTypo.BookAppoinmentButton.LineHeight,
            FontFamily: themeGlobal.headerThemeTypo.BookAppoinmentButton.FontFamily,
            Url: themeGlobal.headerThemeTypo.BookAppoinmentButton.Url,
            FontStyle: themeGlobal.headerThemeTypo.BookAppoinmentButton.FontStyle,
            LetterSpacing: themeGlobal.headerThemeTypo.BookAppoinmentButton.LetterSpacing,
            PaddingY: themeGlobal.headerThemeUtilities.BookAppoinmentButton.PaddingY,
            PaddingX: themeGlobal.headerThemeUtilities.BookAppoinmentButton.PaddingX,
            Background: themeGlobal.headerThemeColor.BookAppoinmentButton.Background,
            BorderColor: themeGlobal.headerThemeColor.BookAppoinmentButton.BorderColor,
            BorderRadius: themeGlobal.headerThemeUtilities.BookAppoinmentButton.BorderRadius,
            Color: themeGlobal.headerThemeColor.BookAppoinmentButton.Color,
            Hover: {
              Background: themeGlobal.headerThemeColor.BookAppoinmentButton.Hover.Background,
              Color: themeGlobal.headerThemeColor.BookAppoinmentButton.Hover.Color,
              BorderColor: themeGlobal.headerThemeColor.BookAppoinmentButton.Hover.BorderColor,
            },
          }
        }
      },
      Footer: {
        component: 'Vespertine_Footer',
        Background: themeGlobal.footerThemeColor.Background,
        Logo: {
          Background: themeGlobal.footerThemeColor.Logo.Background,
          Width: themeGlobal.footerThemeUtilities.Logo.Width,
          Height: themeGlobal.footerThemeUtilities.Logo.Height,
          BorderRadius: themeGlobal.footerThemeUtilities.Logo.BorderRadius,
          PaddingX: themeGlobal.footerThemeUtilities.Logo.PaddingX,
          PaddingY: themeGlobal.footerThemeUtilities.Logo.PaddingY,
        },
        h2: {
          FontWeight: themeGlobal.footerThemeTypo.h2.FontWeight,
          FontSize: themeGlobal.footerThemeTypo.h2.FontSize,
          LineHeight: themeGlobal.footerThemeTypo.h2.LineHeight,
          FontFamily: themeGlobal.footerThemeTypo.h2.FontFamily,
          Url: themeGlobal.footerThemeTypo.h2.Url,
          FontStyle: themeGlobal.footerThemeTypo.h2.FontStyle,
          LetterSpacing: themeGlobal.footerThemeTypo.h2.LetterSpacing,
          Color: themeGlobal.footerThemeColor.h2.Color,
          TextTransform: themeGlobal.footerThemeUtilities.h2.TextTransform,
          TextAlignment: themeGlobal.footerThemeUtilities.h2.TextAlignment,
        },
        h3: {
          FontWeight: themeGlobal.footerThemeTypo.h3.FontWeight,
          FontSize: themeGlobal.footerThemeTypo.h3.FontSize,
          LineHeight: themeGlobal.footerThemeTypo.h3.LineHeight,
          FontFamily: themeGlobal.footerThemeTypo.h3.FontFamily,
          Url: themeGlobal.footerThemeTypo.h3.Url,
          FontStyle: themeGlobal.footerThemeTypo.h3.FontStyle,
          LetterSpacing: themeGlobal.footerThemeTypo.h3.LetterSpacing,
          Color: themeGlobal.footerThemeColor.h3.Color,
          TextTransform: themeGlobal.footerThemeUtilities.h3.TextTransform,
          TextAlignment: themeGlobal.footerThemeUtilities.h3.TextAlignment,
        },
        h4: {
          FontWeight: themeGlobal.footerThemeTypo.h4.FontWeight,
          FontSize: themeGlobal.footerThemeTypo.h4.FontSize,
          LineHeight: themeGlobal.footerThemeTypo.h4.LineHeight,
          FontFamily: themeGlobal.footerThemeTypo.h4.FontFamily,
          Url: themeGlobal.footerThemeTypo.h4.Url,
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
          Url: themeGlobal.footerThemeTypo.h5.Url,
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
          Url: themeGlobal.footerThemeTypo.h6.Url,
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
          Url: themeGlobal.footerThemeTypo.a.Url,
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
          Url: themeGlobal.footerThemeTypo.Copyright.Url,
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
          Url: themeGlobal.typography.anchor.Url,
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
            BorderColor: themeGlobal.color.alpha,
            Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
          }
        },
        h1: {
          FontWeight: themeGlobal.typography.h1.FontWeight,
          FontSize: themeGlobal.typography.h1.FontSize,
          LineHeight: themeGlobal.typography.h1.LineHeight,
          FontFamily: themeGlobal.typography.h1.FontFamily,
          Url: themeGlobal.typography.h1.Url,
          FontStyle: themeGlobal.typography.h1.FontStyle,
          LetterSpacing: themeGlobal.typography.h1.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
        },
        h3: {
          FontWeight: themeGlobal.typography.h3.FontWeight,
          FontSize: themeGlobal.typography.h3.FontSize,
          LineHeight: themeGlobal.typography.h3.LineHeight,
          FontFamily: themeGlobal.typography.h3.FontFamily,
          Url: themeGlobal.typography.h3.Url,
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
          Height: `560px`,
        },
        SlickArrowColor: {
          Color: themeGlobal.color.universal,
          Hover: {
            Color: themeGlobal.color.beta,
          }
        },
        BannerOverlay: {
          Top: `180px`,
          MinWidth: `319px`,
          MaxWidth: `510px`,
          Background: themeGlobal.color.alphaLight,
          Padding: `36px`,
          BorderRadius: `0`,
        },
      },
      AboutUsHero: {
        h2: {
          FontWeight: themeGlobal.typography.h2.FontWeight,
          FontSize: themeGlobal.typography.h2.FontSize,
          LineHeight: themeGlobal.typography.h2.LineHeight,
          FontFamily: themeGlobal.typography.h2.FontFamily,
          Url: themeGlobal.typography.h2.Url,
          FontStyle: themeGlobal.typography.h2.FontStyle,
          LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
          Alignment: `center`,
          TextTransform: `uppercase`,
        },
        h3: {
          FontWeight: themeGlobal.typography.h3.FontWeight,
          FontSize: themeGlobal.typography.h3.FontSize,
          LineHeight: themeGlobal.typography.h3.LineHeight,
          Url: themeGlobal.typography.h3.Url,
          FontFamily: themeGlobal.typography.h3.FontFamily,
          FontStyle: themeGlobal.typography.h3.FontStyle,
          LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
          Alignment: `center`,
          TextTransform: `uppercase`,
        },
        p: {
          FontWeight: themeGlobal.typography.regular.FontWeight,
          FontSize: themeGlobal.typography.regular.FontSize,
          LineHeight: themeGlobal.typography.regular.LineHeight,
          FontFamily: themeGlobal.typography.regular.FontFamily,
          Url: themeGlobal.typography.regular.Url,
          FontStyle: themeGlobal.typography.regular.FontStyle,
          LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.Color,
          Alignment: `center`,
        },
        SectionHead: {
          MarginBottom: `20px`,
          Alignment: `center`,
        },
        BorderBottom: {
          BorderWidth: `2px`,
          Background: themeGlobal.color.alpha,
          BottomSpace: `-8px`,
        },
        ViewMoreButton: {
          FontWeight: `600`,
          FontSize: `16px`,
          LineHeight: `22px`,
          Color: themeGlobal.bodyThemeColor.typography.LinkColor,
          Hover: {
            Color: themeGlobal.bodyThemeColor.typography.Hover.LinkColor,
          }
        },
        ViewMoreSection: {
          MarginTop: `32px`,
        },
        SectionHeroBorderBottomL: {
          Background: `#FDEDE1`
        },
        SectionHeroBorderBottomM: {
          Background: `#006f9c`
        },
        SectionHeroBorderBottomR: {
          Background: `#f48631`
        }
      },
      TeamHero: {
        h2: {
          FontWeight: themeGlobal.typography.h2.FontWeight,
          FontSize: themeGlobal.typography.h2.FontSize,
          LineHeight: themeGlobal.typography.h2.LineHeight,
          Url: themeGlobal.typography.h2.Url,
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
          Url: themeGlobal.typography.h3.Url,
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
          Url: themeGlobal.typography.h4.Url,
          FontStyle: themeGlobal.typography.h4.FontStyle,
          LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
        },
        h5: {
          FontWeight: themeGlobal.typography.h5.FontWeight,
          FontSize: themeGlobal.typography.h5.FontSize,
          LineHeight: themeGlobal.typography.h5.LineHeight,
          FontFamily: themeGlobal.typography.h5.FontFamily,
          Url: themeGlobal.typography.h5.Url,
          FontStyle: themeGlobal.typography.h5.FontStyle,
          LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
        },
        h6: {
          FontWeight: themeGlobal.typography.h6.FontWeight,
          FontSize: themeGlobal.typography.h6.FontSize,
          LineHeight: themeGlobal.typography.h6.LineHeight,
          FontFamily: themeGlobal.typography.h6.FontFamily,
          Url: themeGlobal.typography.h6.Url,
          FontStyle: themeGlobal.typography.h6.FontStyle,
          LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
        },
        p: {
          FontWeight: themeGlobal.typography.regular.FontWeight,
          FontSize: themeGlobal.typography.regular.FontSize,
          LineHeight: themeGlobal.typography.regular.LineHeight,
          FontFamily: themeGlobal.typography.regular.FontFamily,
          Url: themeGlobal.typography.regular.Url,
          FontStyle: themeGlobal.typography.regular.FontStyle,
          LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
        },
        TeamAlbumHomeCard: {
          TeamAlbumHomeCardOverlay: {
            Background: `#FDEDE1`,
            PaddingY: `12px`,
            PaddingX: `22px`,
            PrimaryBorderBottom: {
              Height: `1px`,
              Background: themeGlobal.color.alpha,
              Bottom: `-5px`,
            },
          }
        },
        ViewMoreButton: {
          FontWeight: `600`,
          FontSize: `16px`,
          LineHeight: `22px`,
          Color: themeGlobal.bodyThemeColor.typography.LinkColor,
          Hover: {
            Color: themeGlobal.bodyThemeColor.typography.Hover.LinkColor,
          }
        },
        ViewMoreSection: {
          MarginTop: `32px`,
        },
        ViewMoreSectionDivider: {
          Background: `#FDEDE1`,
        },
        ViewProfileButton: {
          FontWeight: `400`,
          FontSize: `16px`,
          LineHeight: `22px`,
          Background: themeGlobal.bodyThemeColor.Button.Background,
          BorderColor: themeGlobal.bodyThemeColor.Button.Background,
          BorderRadius: `0px 0px 5px 5px`,
          Color: themeGlobal.bodyThemeColor.Button.Color,
          PaddingY: `8px`,
          PaddingX: `40px`,
          Hover: {
            Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
            BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
            Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
          }
        },
        Dots: {
          Color: `#f48631`,
          Active: {
            Color: `#006f9c`,
          }
        },
        SlickArrowColor: {
          Color: `#f48631`,
          Hover: {
            Color: `#006f9c`,
          }
        },
      },
      MessageHero: {
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
        MessageProfileImage: {
          Width: `447px`,
          Height: `495px`,
          BorderRadius: `12px`,
        },
        Dots: {
          Color: `#f48631`,
          Active: {
            Color: `#006f9c`,
          }
        },
        SlickArrowColor: {
          Color: `#f48631`,
          Hover: {
            Color: `#006f9c`,
          }
        },
      },
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
        FacilitiesMenuButton: {
          FontWeight: `400`,
          FontSize: `16px`,
          LineHeight: `22px`,
          Background: 'transparent',
          BorderColor: `rgba(38, 51, 93, 0.8)`,
          BorderRadius: `4px`,
          Color: themeGlobal.bodyThemeColor.Button.Background,
          PaddingY: `24px`,
          PaddingX: `30px`,
          Active: {
            Background: themeGlobal.bodyThemeColor.Button.Background,
            Color: themeGlobal.bodyThemeColor.Button.Color,
          }
        },
        FacilitiesViewAllButton: {
          FontWeight: `400`,
          FontSize: `16px`,
          LineHeight: `22px`,
          Background: '#FDEDE1',
          Color: `#006f9c`,
          PaddingY: `16px`,
          PaddingX: `30px`,
        },
        ViewMoreButton: {
          FontWeight: `600`,
          FontSize: `16px`,
          LineHeight: `22px`,
          Color: themeGlobal.bodyThemeColor.typography.LinkColor,
          Hover: {
            Color: themeGlobal.bodyThemeColor.typography.Hover.LinkColor,
          }
        },
        ViewMoreSection: {
          MarginTop: `32px`,
        },
        ViewMoreSectionDivider: {
          Background: `#FDEDE1`,
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
        SectionHeroBorderBottomL: {
          Background: `#FDEDE1`
        },
        SectionHeroBorderBottomM: {
          Background: `#006f9c`
        },
        SectionHeroBorderBottomR: {
          Background: `#f48631`
        }
      },
      FacilitiesPage: {
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
        FacilitiesMenuButton: {
          FontWeight: `400`,
          FontSize: `16px`,
          LineHeight: `22px`,
          Background: 'transparent',
          BorderColor: `rgba(38, 51, 93, 0.8)`,
          BorderRadius: `4px`,
          Color: themeGlobal.bodyThemeColor.Button.Background,
          PaddingY: `24px`,
          PaddingX: `30px`,
          Active: {
            Background: themeGlobal.bodyThemeColor.Button.Background,
            Color: themeGlobal.bodyThemeColor.Button.Color,
          }
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
        SectionHeroBorderBottomL: {
          Background: `#FDEDE1`
        },
        SectionHeroBorderBottomM: {
          Background: `#006f9c`
        },
        SectionHeroBorderBottomR: {
          Background: `#f48631`
        }
      },
      CategoryHero: {
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
        ViewMoreButton: {
          FontWeight: `600`,
          FontSize: `16px`,
          LineHeight: `22px`,
          Color: themeGlobal.bodyThemeColor.typography.LinkColor,
          Hover: {
            Color: themeGlobal.bodyThemeColor.typography.Hover.LinkColor,
          }
        },
        ViewMoreSection: {
          MarginTop: `32px`,
        },
        ViewMoreSectionDivider: {
          Background: `#FDEDE1`,
        },
        CatergoryCaption: {
          Background: `linear-gradient(180deg, rgba(217, 217, 217, 0) 45.64%, #006f9c 106.1%)`,
        },
  
        Dots: {
          Color: `#f48631`,
          Active: {
            Color: `#006f9c`,
          }
        },
        SlickArrowColor: {
          Color: `#f48631`,
          Hover: {
            Color: `#006f9c`,
          }
        },
      },
      CategoryPage: {
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
        ViewMoreButton: {
          FontWeight: `600`,
          FontSize: `16px`,
          LineHeight: `22px`,
          Color: themeGlobal.bodyThemeColor.typography.LinkColor,
          Hover: {
            Color: themeGlobal.bodyThemeColor.typography.Hover.LinkColor,
          }
        },
        ViewMoreSection: {
          MarginTop: `32px`,
        },
        ViewMoreSectionDivider: {
          Background: `#FDEDE1`,
        },
        CategoryCaption: {
          Background: `linear-gradient(180deg, rgba(217, 217, 217, 0) 45.64%, #006f9c 106.1%)`,
        }
      },
      ServiceHero: {
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
        ViewMoreButton: {
          FontWeight: `600`,
          FontSize: `16px`,
          LineHeight: `22px`,
          Color: themeGlobal.bodyThemeColor.typography.LinkColor,
          Hover: {
            Color: themeGlobal.bodyThemeColor.typography.Hover.LinkColor,
          }
        },
        ViewMoreSection: {
          MarginTop: `32px`,
        },
        ViewMoreSectionDivider: {
          Background: `#FDEDE1`,
        },
        ServiceHeroCaption: {
          Background: `linear-gradient(180deg, rgba(217, 217, 217, 0) 45.64%, #006f9c 106.1%)`,
        },
  
        Dots: {
          Color: `#f48631`,
          Active: {
            Color: `#006f9c`,
          }
        },
        SlickArrowColor: {
          Color: `#f48631`,
          Hover: {
            Color: `#006f9c`,
          }
        },
      },
      ServicePage: {
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
        ServicePageCaption: {
          Background: `linear-gradient(180deg, rgba(217, 217, 217, 0) 45.64%, #006f9c 106.1%)`,
        },
      },
      ServicePageDetails: {
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
        h5: {
          FontWeight: themeGlobal.typography.h5.FontWeight,
          FontSize: themeGlobal.typography.h5.FontSize,
          LineHeight: themeGlobal.typography.h5.LineHeight,
          FontFamily: themeGlobal.typography.h5.FontFamily,
          FontStyle: themeGlobal.typography.h5.FontStyle,
          LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
          Alignment: `left`,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
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
        ServicePageDetailsMenuButton: {
          FontWeight: `400`,
          FontSize: `16px`,
          LineHeight: `22px`,
          Background: 'transparent',
          BorderColor: `rgba(38, 51, 93, 0.8)`,
          BorderRadius: `4px`,
          Color: themeGlobal.bodyThemeColor.Button.Background,
          PaddingY: `24px`,
          PaddingX: `30px`,
          Active: {
            Background: themeGlobal.bodyThemeColor.Button.Background,
            Color: themeGlobal.bodyThemeColor.Button.Color,
          },
          Hover: {
            Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
            Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
          }
        },
        ServicePageDetailsDescription: {
          Padding: `14px`,
          Background: `#fff`,
          BorderBottom: {
            Height: `2px`,
            Background: `transparent`,
            BottomSpace: `-10px`,
          },
        },
  
        SectionHeroBorderBottomL: {
          Background: `#FDEDE1`
        },
        SectionHeroBorderBottomM: {
          Background: `#006f9c`
        },
        SectionHeroBorderBottomR: {
          Background: `#f48631`
        },
        BookingButton: {
          FontSize: `16px`,
          FontWeight: `700`,
          LineHeight: `22px`,
          FontFamily: ``,
          Url: ``,
          FontStyle: ``,
          LetterSpacing: ``,
          PaddingY: `13px`,
          PaddingX: `30px`,
          Background: themeGlobal.bodyThemeColor.Button.Background,
          BorderColor: themeGlobal.bodyThemeColor.Button.Background,
          BorderRadius: `50px`,
          Color: themeGlobal.bodyThemeColor.Button.Color,
          Hover: {
            Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
            Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
            BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
          },
        },
        TeamAlbumHomeCard: {
          TeamAlbumHomeCardOverlay: {
            Background: `#FDEDE1`,
            PaddingY: `12px`,
            PaddingX: `22px`,
            PrimaryBorderBottom: {
              Height: `1px`,
              Background: themeGlobal.color.alpha,
              Bottom: `-5px`,
            },
          }
        },
        ViewProfileButton: {
          FontWeight: `400`,
          FontSize: `16px`,
          LineHeight: `22px`,
          Background: themeGlobal.bodyThemeColor.Button.Background,
          BorderColor: themeGlobal.bodyThemeColor.Button.Background,
          BorderRadius: `0px 0px 5px 5px`,
          Color: themeGlobal.bodyThemeColor.Button.Color,
          PaddingY: `8px`,
          PaddingX: `40px`,
          Hover: {
            Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
            BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
            Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
          }
        },
      },
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
        ViewMoreButton: {
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
          Background: `linear-gradient(180deg, rgba(217, 217, 217, 0) 45.64%, #006f9c 106.1%)`,
        }
      },
      GalleryPage: {
        h2: {
          FontWeight: themeGlobal.typography.h2.FontWeight,
          FontSize: themeGlobal.typography.h2.FontSize,
          LineHeight: themeGlobal.typography.h2.LineHeight,
          FontFamily: themeGlobal.typography.h2.FontFamily,
          FontStyle: themeGlobal.typography.h2.FontStyle,
          LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
          Alignment: `center`,
          TextTransform: `capitalize`,
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
          TextTransform: `uppercase`,
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
          Color: '#FFFFFF',
        },
        h4: {
          FontWeight: themeGlobal.typography.h4.FontWeight,
          FontSize: themeGlobal.typography.h4.FontSize,
          LineHeight: themeGlobal.typography.h4.LineHeight,
          FontFamily: themeGlobal.typography.h4.FontFamily,
          Url: themeGlobal.typography.h4.Url,
          FontStyle: themeGlobal.typography.h4.FontStyle,
          LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
        },
  
        GalleryCaption: {
          Background: `linear-gradient(180deg, rgba(217, 217, 217, 0) 45.64%, #006f9c 106.1%)`,
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
          TextTransform: `capitalize`,
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
          TextTransform: `uppercase`,
          Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
        },
        GalleryListFilter: {
          MarginBottom: `40px`,
        },
        GalleryListAlbumItemOverlay: {
          Background: `linear-gradient(180deg, rgba(217, 217, 217, 0) 0%, #6474CF 100%)`,
        },
        GalleryListFilterButton: {
          FontWeight: `500`,
          FontSize: `15px`,
          LineHeight: `18px`,
          Background: themeGlobal.bodyThemeColor.Background,
          BorderColor: themeGlobal.bodyThemeColor.Button.Background,
          BorderRadius: `4px`,
          Color: themeGlobal.bodyThemeColor.Button.Background,
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
          },
        },
      },
      TestimonialPageListSection: {
        h2: {
          FontWeight: themeGlobal.typography.h2.FontWeight,
          FontSize: themeGlobal.typography.h2.FontSize,
          LineHeight: themeGlobal.typography.h2.LineHeight,
          FontFamily: themeGlobal.typography.h2.FontFamily,
          FontStyle: themeGlobal.typography.h2.FontStyle,
          LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
          Alignment: `center`,
          TextTransform: `capitalize`,
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
          TextTransform: `uppercase`,
          Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
        },
        p: {
          FontWeight: themeGlobal.typography.regular.FontWeight,
          FontSize: themeGlobal.typography.regular.FontSize,
          LineHeight: themeGlobal.typography.regular.LineHeight,
          FontFamily: themeGlobal.typography.regular.FontFamily,
          Url: themeGlobal.typography.regular.Url,
          FontStyle: themeGlobal.typography.regular.FontStyle,
          LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
          Alignment: `center`,
          TextTransform: ``,
          Color: themeGlobal.bodyThemeColor.typography.Color,
        },
        h6: {
          FontWeight: themeGlobal.typography.h6.FontWeight,
          FontSize: themeGlobal.typography.h6.FontSize,
          LineHeight: themeGlobal.typography.h6.LineHeight,
          FontFamily: themeGlobal.typography.h6.FontFamily,
          FontStyle: themeGlobal.typography.h6.FontStyle,
          LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
          Alignment: `center`,
          TextTransform: `capitalize`,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
        },
  
      },
      AboutUsPage: {
        h2: {
          FontWeight: themeGlobal.typography.h2.FontWeight,
          FontSize: themeGlobal.typography.h2.FontSize,
          LineHeight: themeGlobal.typography.h2.LineHeight,
          FontFamily: themeGlobal.typography.h2.FontFamily,
          Url: themeGlobal.typography.h2.Url,
          FontStyle: themeGlobal.typography.h2.FontStyle,
          LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
          Alignment: `center`,
          TextTransform: `capitalize`,
        },
        h3: {
          FontWeight: themeGlobal.typography.h3.FontWeight,
          FontSize: themeGlobal.typography.h3.FontSize,
          LineHeight: themeGlobal.typography.h3.LineHeight,
          FontFamily: themeGlobal.typography.h3.FontFamily,
          Url: themeGlobal.typography.h3.Url,
          FontStyle: themeGlobal.typography.h3.FontStyle,
          LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
          Alignment: `center`,
          TextTransform: `uppercase`,
        },
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
        SectionHead: {
          MarginBottom: `40px`,
          Alignment: `center`,
        },
        AboutSection: {
          Background: `#FDEDE1`,
        },
        FounderMessage: {
          MessageProfileImage: {
            Width: `447px`,
            Height: `495px`,
            BorderRadius: `12px`,
          },
          Dots: {
            Color: `#f48631`,
            Active: {
              Color: `#006f9c`,
            }
          },
          SlickArrowColor: {
            Color: `#f48631`,
            Hover: {
              Color: `#006f9c`,
            }
          },
        },
        MissionSection: {
          MissionHead: {
            MarginBottom: `20px`,
            Alignment: `center`,
          }
        },
        VisionSection: {
          VisionHead: {
            MarginBottom: `20px`,
            Alignment: `center`,
          }
        },
        SectionHeroBorderBottomL: {
          Background: `#FDEDE1`
        },
        SectionHeroBorderBottomM: {
          Background: `#006f9c`
        },
        SectionHeroBorderBottomR: {
          Background: `#f48631`
        }
      },
      NoticeBoardPage: {
        h2: {
          FontWeight: themeGlobal.typography.h2.FontWeight,
          FontSize: themeGlobal.typography.h2.FontSize,
          LineHeight: themeGlobal.typography.h2.LineHeight,
          FontFamily: themeGlobal.typography.h2.FontFamily,
          Url: themeGlobal.typography.h2.Url,
          FontStyle: themeGlobal.typography.h2.FontStyle,
          LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
          Alignment: `center`,
          TextTransform: ``,
        },
        h3: {
          FontWeight: themeGlobal.typography.h3.FontWeight,
          FontSize: themeGlobal.typography.h3.FontSize,
          LineHeight: themeGlobal.typography.h3.LineHeight,
          FontFamily: themeGlobal.typography.h3.FontFamily,
          Url: themeGlobal.typography.h3.Url,
          FontStyle: themeGlobal.typography.h3.FontStyle,
          LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
          Alignment: `center`,
          TextTransform: `uppercase`,
        },
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
        SectionHead: {
          MarginBottom: `40px`,
          Alignment: `center`,
        },
        CenterOfExcellence: {
  
  
          SectionHeroBorderBottomL: {
            Background: `#FDEDE1`
          },
          SectionHeroBorderBottomM: {
            Background: `#006f9c`
          },
          SectionHeroBorderBottomR: {
            Background: `#f48631`
          }
        }
      },
      Notice: {
        NoticeBoardHero: {
          a: {
            FontWeight: themeGlobal.typography.anchor.FontWeight,
            FontSize: themeGlobal.typography.anchor.FontSize,
            LineHeight: themeGlobal.typography.anchor.LineHeight,
            FontFamily: themeGlobal.typography.anchor.FontFamily,
            Url: themeGlobal.typography.anchor.Url,
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
        },
      },
      TeamPage: {
        h2: {
          FontWeight: themeGlobal.typography.h2.FontWeight,
          FontSize: themeGlobal.typography.h2.FontSize,
          LineHeight: themeGlobal.typography.h2.LineHeight,
          Url: themeGlobal.typography.h2.Url,
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
          Url: themeGlobal.typography.h3.Url,
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
          Url: themeGlobal.typography.h4.Url,
          FontStyle: themeGlobal.typography.h4.FontStyle,
          LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
        },
        h5: {
          FontWeight: themeGlobal.typography.h5.FontWeight,
          FontSize: themeGlobal.typography.h5.FontSize,
          LineHeight: themeGlobal.typography.h5.LineHeight,
          FontFamily: themeGlobal.typography.h5.FontFamily,
          Url: themeGlobal.typography.h5.Url,
          FontStyle: themeGlobal.typography.h5.FontStyle,
          LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
        },
        h6: {
          FontWeight: themeGlobal.typography.h6.FontWeight,
          FontSize: themeGlobal.typography.h6.FontSize,
          LineHeight: themeGlobal.typography.h6.LineHeight,
          FontFamily: themeGlobal.typography.h6.FontFamily,
          Url: themeGlobal.typography.h6.Url,
          FontStyle: themeGlobal.typography.h6.FontStyle,
          LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
        },
        p: {
          FontWeight: themeGlobal.typography.regular.FontWeight,
          FontSize: themeGlobal.typography.regular.FontSize,
          LineHeight: themeGlobal.typography.regular.LineHeight,
          FontFamily: themeGlobal.typography.regular.FontFamily,
          Url: themeGlobal.typography.regular.Url,
          FontStyle: themeGlobal.typography.regular.FontStyle,
          LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
        },
        TeamAlbumHomeCard: {
          TeamAlbumHomeCardOverlay: {
            Background: `#FDEDE1`,
            PaddingY: `12px`,
            PaddingX: `22px`,
            PrimaryBorderBottom: {
              Height: `1px`,
              Background: themeGlobal.color.alpha,
              Bottom: `-5px`,
            },
          }
        },
        ViewProfileButton: {
          FontWeight: `400`,
          FontSize: `16px`,
          LineHeight: `22px`,
          Background: themeGlobal.bodyThemeColor.Button.Background,
          BorderColor: themeGlobal.bodyThemeColor.Button.Background,
          BorderRadius: `0px 0px 5px 5px`,
          Color: themeGlobal.bodyThemeColor.Button.Color,
          PaddingY: `8px`,
          PaddingX: `40px`,
          Hover: {
            Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
            BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
            Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
          }
        },
        Dots: {
          Color: `#f48631`,
          Active: {
            Color: `#006f9c`,
          }
        },
        SlickArrowColor: {
          Color: `#f48631`,
          Hover: {
            Color: `#006f9c`,
          }
        },
      },
      EmpanelmentPage: {
        h2: {
          FontWeight: themeGlobal.typography.h2.FontWeight,
          FontSize: themeGlobal.typography.h2.FontSize,
          LineHeight: themeGlobal.typography.h2.LineHeight,
          Url: themeGlobal.typography.h2.Url,
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
          Url: themeGlobal.typography.h3.Url,
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
          Url: themeGlobal.typography.h4.Url,
          FontStyle: themeGlobal.typography.h4.FontStyle,
          LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
          Alignment: `center`,
        },
      },
      ProfilePage: {
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
        h6: {
          FontWeight: themeGlobal.typography.h6.FontWeight,
          FontSize: themeGlobal.typography.h6.FontSize,
          LineHeight: themeGlobal.typography.h6.LineHeight,
          FontFamily: themeGlobal.headerThemeTypo.h6.FontFamily,
          FontStyle: themeGlobal.headerThemeTypo.h6.FontStyle,
          LetterSpacing: themeGlobal.headerThemeTypo.h6.LetterSpacing,
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
          PaddingTop: `24px`,
        },
        ProfilePageCard: {
          Background: `#FFF`,
          BorderRadius: `12px`
        },
        ProfilePageCardHead: {
          Background: `#FDEDE1`,
          PaddingY: `12px`,
          PaddingX: `24px`,
        },
        ProfilePageCardBody: {
          Background: `#FFF`,
          PaddingY: `12px`,
          PaddingX: `24px`,
        },
        BookingButton: {
          FontSize: `16px`,
          FontWeight: `700`,
          LineHeight: `22px`,
          FontFamily: ``,
          Url: ``,
          FontStyle: ``,
          LetterSpacing: ``,
          PaddingY: `13px`,
          PaddingX: `30px`,
          Background: themeGlobal.bodyThemeColor.Button.Background,
          BorderColor: themeGlobal.bodyThemeColor.Button.Background,
          BorderRadius: `50px`,
          Color: themeGlobal.bodyThemeColor.Button.Color,
          Hover: {
            Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
            Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
            BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
          },
        },
        AvalibilityTable: {
          BorderColor: themeGlobal.bodyThemeColor.typography.HeadingColor,
          td: {
            Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            Background: themeGlobal.bodyThemeColor.typography.HeadingColor,
          }
        }
      },
      Facility: {
  
        FacilityPage: {
          h2: {
            FontWeight: themeGlobal.typography.h2.FontWeight,
            FontSize: themeGlobal.typography.h2.FontSize,
            LineHeight: themeGlobal.typography.h2.LineHeight,
            FontFamily: themeGlobal.typography.h2.FontFamily,
            Url: themeGlobal.typography.h2.Url,
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
            Url: themeGlobal.typography.h4.Url,
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
      ContactHero: {
        h2: {
          FontWeight: themeGlobal.typography.h2.FontWeight,
          FontSize: themeGlobal.typography.h2.FontSize,
          LineHeight: themeGlobal.typography.h2.LineHeight,
          FontFamily: themeGlobal.typography.h2.FontFamily,
          Url: themeGlobal.typography.h2.Url,
          FontStyle: themeGlobal.typography.h2.FontStyle,
          LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
          Alignment: `center`,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
          TextTransform: `capitalize`,
        },
        h3: {
          FontWeight: themeGlobal.typography.h3.FontWeight,
          FontSize: themeGlobal.typography.h3.FontSize,
          LineHeight: themeGlobal.typography.h3.LineHeight,
          FontFamily: themeGlobal.typography.h3.FontFamily,
          Url: themeGlobal.typography.h3.Url,
          FontStyle: themeGlobal.typography.h3.FontStyle,
          LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
          Alignment: `center`,
          Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
          TextTransform: `uppercase`,
        },
        h4: {
          FontWeight: themeGlobal.typography.h4.FontWeight,
          FontSize: themeGlobal.typography.h4.FontSize,
          LineHeight: themeGlobal.typography.h4.LineHeight,
          FontFamily: themeGlobal.typography.h4.FontFamily,
          Url: themeGlobal.typography.h4.Url,
          FontStyle: themeGlobal.typography.h4.FontStyle,
          LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
        },
        h5: {
          FontWeight: themeGlobal.typography.h5.FontWeight,
          FontSize: themeGlobal.typography.h5.FontSize,
          LineHeight: themeGlobal.typography.h5.LineHeight,
          FontFamily: themeGlobal.typography.h5.FontFamily,
          Url: themeGlobal.typography.h5.Url,
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
        Icon: {
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor
        },
      },
      ContactPage: {
        h2: {
          FontWeight: themeGlobal.typography.h2.FontWeight,
          FontSize: themeGlobal.typography.h2.FontSize,
          LineHeight: themeGlobal.typography.h2.LineHeight,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
          FontFamily: themeGlobal.typography.h2.FontFamily,
          Url: themeGlobal.typography.h2.Url,
          FontStyle: themeGlobal.typography.h2.FontStyle,
          LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
        },
        h3: {
          FontWeight: themeGlobal.typography.h3.FontWeight,
          FontSize: themeGlobal.typography.h3.FontSize,
          LineHeight: themeGlobal.typography.h3.LineHeight,
          FontFamily: themeGlobal.typography.h3.FontFamily,
          Url: themeGlobal.typography.h3.Url,
          FontStyle: themeGlobal.typography.h3.FontStyle,
          LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
          BorderBottom: {
            BorderWidth: `2px`,
            Background: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
            BottomSpace: `-8px`,
          }
        },
        h6: {
          FontWeight: themeGlobal.typography.h6.FontWeight,
          FontSize: themeGlobal.typography.h6.FontSize,
          LineHeight: themeGlobal.typography.h6.LineHeight,
          FontFamily: themeGlobal.typography.h6.FontFamily,
          Url: themeGlobal.typography.h6.Url,
          FontStyle: themeGlobal.typography.h6.FontStyle,
          LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
        },
        a: {
          FontWeight: themeGlobal.typography.anchor.FontWeight,
          FontSize: themeGlobal.typography.anchor.FontSize,
          LineHeight: themeGlobal.typography.anchor.LineHeight,
          FontFamily: themeGlobal.typography.anchor.FontFamily,
          Url: themeGlobal.typography.anchor.Url,
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
          Url: themeGlobal.typography.regular.Url,
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
      FormContactHero: {
        h2: {
          FontWeight: themeGlobal.typography.h2.FontWeight,
          FontSize: themeGlobal.typography.h2.FontSize,
          LineHeight: themeGlobal.typography.h2.LineHeight,
          FontFamily: themeGlobal.typography.h2.FontFamily,
          Url: themeGlobal.typography.h2.Url,
          FontStyle: themeGlobal.typography.h2.FontStyle,
          LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
          Alignment: `center`,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
          TextTransform: `capitalize`,
        },
        h3: {
          FontWeight: themeGlobal.typography.h3.FontWeight,
          FontSize: themeGlobal.typography.h3.FontSize,
          LineHeight: themeGlobal.typography.h3.LineHeight,
          FontFamily: themeGlobal.typography.h3.FontFamily,
          Url: themeGlobal.typography.h3.Url,
          FontStyle: themeGlobal.typography.h3.FontStyle,
          LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
          Alignment: `center`,
          Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
          TextTransform: `uppercase`,
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
            FontWeight: `700`,
            FontSize: `16px`,
            LineHeight: `22px`,
            Background: themeGlobal.bodyThemeColor.Button.Background,
            BorderColor: themeGlobal.bodyThemeColor.Button.Background,
            BorderRadius: `8px`,
            Color: themeGlobal.bodyThemeColor.Button.Color,
            PaddingY: `13px`,
            PaddingX: `40px`,
            Hover: {
              Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
              BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
              Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
            }
          }
        }
      },
      Admission: {
        AdmissionHero: {
          h2: {
            FontWeight: themeGlobal.typography.h2.FontWeight,
            FontSize: themeGlobal.typography.h2.FontSize,
            LineHeight: themeGlobal.typography.h2.LineHeight,
            Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            FontFamily: themeGlobal.typography.h2.FontFamily,
            Url: themeGlobal.typography.h2.Url,
            FontStyle: themeGlobal.typography.h2.FontStyle,
            LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
          },
          h4: {
            FontWeight: themeGlobal.typography.h4.FontWeight,
            FontSize: themeGlobal.typography.h4.FontSize,
            LineHeight: themeGlobal.typography.h4.LineHeight,
            FontFamily: themeGlobal.typography.h4.FontFamily,
            Url: themeGlobal.typography.h4.Url,
            FontStyle: themeGlobal.typography.h4.FontStyle,
            LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
            Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
          },
          h5: {
            FontWeight: themeGlobal.typography.h5.FontWeight,
            FontSize: themeGlobal.typography.h5.FontSize,
            LineHeight: themeGlobal.typography.h5.LineHeight,
            FontFamily: themeGlobal.typography.h5.FontFamily,
            Url: themeGlobal.typography.h5.Url,
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
              BorderColor: themeGlobal.color.alpha,
              Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
            }
          },
          ViewMoreAdmissionHeroSection: {
            Alignment: `left`
          }
        },
        AdmissionPage: {
          h2: {
            FontWeight: themeGlobal.typography.h2.FontWeight,
            FontSize: themeGlobal.typography.h2.FontSize,
            LineHeight: themeGlobal.typography.h2.LineHeight,
            Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            FontFamily: themeGlobal.typography.h2.FontFamily,
            Url: themeGlobal.typography.h2.Url,
            FontStyle: themeGlobal.typography.h2.FontStyle,
            LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
          },
          h6: {
            FontWeight: themeGlobal.typography.h6.FontWeight,
            FontSize: themeGlobal.typography.h6.FontSize,
            LineHeight: themeGlobal.typography.h6.LineHeight,
            FontFamily: themeGlobal.typography.h6.FontFamily,
            Url: themeGlobal.typography.h6.Url,
            FontStyle: themeGlobal.typography.h6.FontStyle,
            LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
            Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
          },
          p: {
            FontWeight: themeGlobal.typography.regular.FontWeight,
            FontSize: themeGlobal.typography.regular.FontSize,
            LineHeight: themeGlobal.typography.regular.LineHeight,
            FontFamily: themeGlobal.typography.regular.FontFamily,
            Url: themeGlobal.typography.regular.Url,
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
              BorderColor: themeGlobal.color.alpha,
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
              BorderColor: themeGlobal.color.beta,
              Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
            }
          },
          ViewDetailAdmissionModalBody: {
            h6: {
              FontWeight: themeGlobal.typography.h6.FontWeight,
              FontSize: themeGlobal.typography.h6.FontSize,
              LineHeight: themeGlobal.typography.h6.LineHeight,
              FontFamily: themeGlobal.typography.h6.FontFamily,
              Url: themeGlobal.typography.h6.Url,
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
              Url: themeGlobal.typography.regular.Url,
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
                BorderColor: themeGlobal.color.alpha,
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
                BorderColor: themeGlobal.color.alpha,
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
                BorderColor: themeGlobal.color.alpha,
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
            Url: themeGlobal.typography.h2.Url,
            FontStyle: themeGlobal.typography.h2.FontStyle,
            LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
          },
          h6: {
            FontWeight: themeGlobal.typography.h6.FontWeight,
            FontSize: themeGlobal.typography.h6.FontSize,
            LineHeight: themeGlobal.typography.h6.LineHeight,
            FontFamily: themeGlobal.typography.h6.FontFamily,
            Url: themeGlobal.typography.h6.Url,
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
              BorderColor: themeGlobal.color.alpha,
              Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
            }
          },
          ViewMoreFeeStructureHeroSection: {
            Alignment: `left`
          }
        },
        FeeStructurePage: {
  
          h2: {
            FontWeight: themeGlobal.typography.h2.FontWeight,
            FontSize: themeGlobal.typography.h2.FontSize,
            LineHeight: themeGlobal.typography.h2.LineHeight,
            Alignment: `center`,
            Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            FontFamily: themeGlobal.typography.h2.FontFamily,
            Url: themeGlobal.typography.h2.Url,
            FontStyle: themeGlobal.typography.h2.FontStyle,
            LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
          },
          h4: {
            FontWeight: themeGlobal.typography.h4.FontWeight,
            FontSize: themeGlobal.typography.h4.FontSize,
            LineHeight: themeGlobal.typography.h4.LineHeight,
            FontFamily: themeGlobal.typography.h4.FontFamily,
            Url: themeGlobal.typography.h4.Url,
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
            Url: themeGlobal.typography.regular.Url,
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
              Url: themeGlobal.typography.h4.Url,
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
              Url: themeGlobal.typography.h5.Url,
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
              Url: themeGlobal.typography.h6.Url,
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
              Url: themeGlobal.typography.regular.Url,
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
                BorderColor: themeGlobal.color.alpha,
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
      FaqsPage: {
        h2: {
          FontWeight: themeGlobal.typography.h2.FontWeight,
          FontSize: themeGlobal.typography.h2.FontSize,
          LineHeight: themeGlobal.typography.h2.LineHeight,
          FontFamily: themeGlobal.typography.h2.FontFamily,
          Url: themeGlobal.typography.h2.Url,
          FontStyle: themeGlobal.typography.h2.FontStyle,
          LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
          Alignment: `center`,
          TextTransform: `uppercase`,
        },
        h3: {
          FontWeight: themeGlobal.typography.h3.FontWeight,
          FontSize: themeGlobal.typography.h3.FontSize,
          LineHeight: themeGlobal.typography.h3.LineHeight,
          Url: themeGlobal.typography.h3.Url,
          FontFamily: themeGlobal.typography.h3.FontFamily,
          FontStyle: themeGlobal.typography.h3.FontStyle,
          LetterSpacing: themeGlobal.typography.h3.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
          Alignment: `center`,
          TextTransform: `uppercase`,
        },
        h6: {
          FontWeight: themeGlobal.typography.h6.FontWeight,
          FontSize: themeGlobal.typography.h6.FontSize,
          LineHeight: themeGlobal.typography.h6.LineHeight,
          FontFamily: themeGlobal.typography.h6.FontFamily,
          Url: themeGlobal.typography.h6.Url,
          FontStyle: themeGlobal.typography.h6.FontStyle,
          LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
        },
        p: {
          FontWeight: themeGlobal.typography.regular.FontWeight,
          FontSize: themeGlobal.typography.regular.FontSize,
          LineHeight: themeGlobal.typography.regular.LineHeight,
          FontFamily: themeGlobal.typography.regular.FontFamily,
          Url: themeGlobal.typography.regular.Url,
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
      Faqs: {
        FaqsHero: {
          h2: {
            FontWeight: themeGlobal.typography.h2.FontWeight,
            FontSize: themeGlobal.typography.h2.FontSize,
            LineHeight: themeGlobal.typography.h2.LineHeight,
            Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            FontFamily: themeGlobal.typography.h2.FontFamily,
            Url: themeGlobal.typography.h2.Url,
            FontStyle: themeGlobal.typography.h2.FontStyle,
            LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
          },
          h6: {
            FontWeight: themeGlobal.typography.h6.FontWeight,
            FontSize: themeGlobal.typography.h6.FontSize,
            LineHeight: themeGlobal.typography.h6.LineHeight,
            FontFamily: themeGlobal.typography.h6.FontFamily,
            Url: themeGlobal.typography.h6.Url,
            FontStyle: themeGlobal.typography.h6.FontStyle,
            LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
            Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
          },
          p: {
            FontWeight: themeGlobal.typography.regular.FontWeight,
            FontSize: themeGlobal.typography.regular.FontSize,
            LineHeight: themeGlobal.typography.regular.LineHeight,
            FontFamily: themeGlobal.typography.regular.FontFamily,
            Url: themeGlobal.typography.regular.Url,
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
              BorderColor: themeGlobal.color.alpha,
              Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
            }
          },
          ViewMoreFaqsHeroSection: {
            Alignment: `left`,
            MarginTop: `32px`,
          }
        },
      },
  
      VacancyPage: {
        h2: {
          FontWeight: themeGlobal.typography.h2.FontWeight,
          FontSize: themeGlobal.typography.h2.FontSize,
          LineHeight: themeGlobal.typography.h2.LineHeight,
          FontFamily: themeGlobal.typography.h2.FontFamily,
          FontStyle: themeGlobal.typography.h2.FontStyle,
          LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
          Alignment: `center`,
          TextTransform: `capitalize`,
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
          TextTransform: `uppercase`,
          Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
        },
        h4: {
          FontWeight: themeGlobal.typography.h4.FontWeight,
          FontSize: themeGlobal.typography.h4.FontSize,
          LineHeight: themeGlobal.typography.h4.LineHeight,
          FontFamily: themeGlobal.typography.h4.FontFamily,
          FontStyle: themeGlobal.typography.h4.FontStyle,
          LetterSpacing: themeGlobal.typography.h4.LetterSpacing,
          Alignment: `left`,
          TextTransform: `capitalize`,
          Color: `#FFFFFF`,
        },
        h5: {
          FontWeight: themeGlobal.typography.h5.FontWeight,
          FontSize: themeGlobal.typography.h5.FontSize,
          LineHeight: themeGlobal.typography.h5.LineHeight,
          FontFamily: themeGlobal.typography.h5.FontFamily,
          FontStyle: themeGlobal.typography.h5.FontStyle,
          LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
          Alignment: `left`,
          TextTransform: `capitalize`,
          Color: `#FFFFFF`,
        },
        h6: {
          FontWeight: themeGlobal.typography.h6.FontWeight,
          FontSize: themeGlobal.typography.h6.FontSize,
          LineHeight: themeGlobal.typography.h6.LineHeight,
          FontFamily: themeGlobal.typography.h6.FontFamily,
          Url: themeGlobal.typography.h6.Url,
          FontStyle: themeGlobal.typography.h6.FontStyle,
          LetterSpacing: themeGlobal.typography.h6.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
        },
        p: {
          FontWeight: themeGlobal.typography.regular.FontWeight,
          FontSize: themeGlobal.typography.regular.FontSize,
          LineHeight: themeGlobal.typography.regular.LineHeight,
          FontFamily: themeGlobal.typography.regular.FontFamily,
          Url: themeGlobal.typography.regular.Url,
          FontStyle: themeGlobal.typography.regular.FontStyle,
          LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
          Color: `#FFFFFF`,
        },
        CardOverlay: {
          Background: `linear-gradient(180deg, rgba(217, 217, 217, 0) 45.64%, #006f9c 106.1%)`,
          Hover: {
            Background: `rgba(0, 111, 156, 0.8)`,
          }
        },
        VacancyHead: {
          MarginBottom: `48px`,
          Alignment: `center`,
        },
        VacancyListItem: {
          BorderColor: themeGlobal.color.alphaSemiLight,
        },
        OverlayApplyNowButton: {
          FontWeight: `400`,
          FontSize: `15px`,
          LineHeight: `18px`,
          Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
          BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
          BorderRadius: `4px`,
          Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
          PaddingY: `10px`,
          PaddingX: `40px`,
          Hover: {
            Background: themeGlobal.bodyThemeColor.Button.Background,
            BorderColor: themeGlobal.bodyThemeColor.Button.Background,
            Color: themeGlobal.bodyThemeColor.Button.Color,
          }
        },
        OverlayViewButton: {
          FontWeight: `400`,
          FontSize: `15px`,
          LineHeight: `18px`,
          Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
          BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
          BorderRadius: `4px`,
          Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
          PaddingY: `10px`,
          PaddingX: `40px`,
          Hover: {
            Background: themeGlobal.bodyThemeColor.Button.Background,
            BorderColor: themeGlobal.bodyThemeColor.Button.Background,
            Color: themeGlobal.bodyThemeColor.Button.Color,
          }
        },
        VacancyDetailModal: {
          // h6: {
          //   Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
          // },
          p: {
            Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
          }
        }
      },
      Vacancy: {
        VacancyHero: {
          h2: {
            FontWeight: themeGlobal.typography.h2.FontWeight,
            FontSize: themeGlobal.typography.h2.FontSize,
            LineHeight: themeGlobal.typography.h2.LineHeight,
            Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            FontFamily: themeGlobal.typography.h2.FontFamily,
            Url: themeGlobal.typography.h2.Url,
            FontStyle: themeGlobal.typography.h2.FontStyle,
            LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
          },
          h6: {
            FontWeight: themeGlobal.typography.h6.FontWeight,
            FontSize: themeGlobal.typography.h6.FontSize,
            LineHeight: themeGlobal.typography.h6.LineHeight,
            FontFamily: themeGlobal.typography.h6.FontFamily,
            Url: themeGlobal.typography.h6.Url,
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
              BorderColor: themeGlobal.color.alpha,
              Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
            }
          },
          ViewMoreVacancyHeroSection: {
            Alignment: `left`,
            MarginTop: `32px`,
          }
        },
      },
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
        h2: {
          FontWeight: themeGlobal.typography.h2.FontWeight,
          FontSize: themeGlobal.typography.h2.FontSize,
          LineHeight: themeGlobal.typography.h2.LineHeight,
          FontFamily: themeGlobal.typography.h2.FontFamily,
          FontStyle: themeGlobal.typography.h2.FontStyle,
          LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
          Alignment: `center`,
          TextTransform: ``,
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
          TextTransform: `uppercase`,
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
          TextTransform: ``,
          Color: `#FFFFFF`,
        },
        p: {
          FontWeight: themeGlobal.typography.regular.FontWeight,
          FontSize: themeGlobal.typography.regular.FontSize,
          LineHeight: themeGlobal.typography.regular.LineHeight,
          FontFamily: themeGlobal.typography.regular.FontFamily,
          FontStyle: themeGlobal.typography.regular.FontStyle,
          LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
          Color: `#FFFFFF`,
          PaddingTop: `24px`,
        },
        CardOverlay: {
          Background: `linear-gradient(180deg, rgba(217, 217, 217, 0) 45.64%, #006f9c 106.1%)`,
          Hover: {
            Background: `rgba(0, 111, 156, 0.8)`,
          }
        },
        OverlayDownloadButton: {
          FontWeight: `400`,
          FontSize: `15px`,
          LineHeight: `18px`,
          Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
          BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
          BorderRadius: `4px`,
          Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
          PaddingY: `10px`,
          PaddingX: `40px`,
          Hover: {
            Background: themeGlobal.bodyThemeColor.Button.Background,
            BorderColor: themeGlobal.bodyThemeColor.Button.Background,
            Color: themeGlobal.bodyThemeColor.Button.Color,
          }
        }
      },
      MiscellaneousPage: {
        h2: {
          FontWeight: themeGlobal.typography.h2.FontWeight,
          FontSize: themeGlobal.typography.h2.FontSize,
          LineHeight: themeGlobal.typography.h2.LineHeight,
          FontFamily: themeGlobal.typography.h2.FontFamily,
          FontStyle: themeGlobal.typography.h2.FontStyle,
          LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
          Alignment: `center`,
          TextTransform: ``,
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
          TextTransform: `uppercase`,
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
          TextTransform: ``,
          Color: `#FFFFFF`,
        },
        p: {
          FontWeight: themeGlobal.typography.regular.FontWeight,
          FontSize: themeGlobal.typography.regular.FontSize,
          LineHeight: themeGlobal.typography.regular.LineHeight,
          FontFamily: themeGlobal.typography.regular.FontFamily,
          FontStyle: themeGlobal.typography.regular.FontStyle,
          LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
          Color: `#FFFFFF`,
          PaddingTop: `24px`,
        },
        CardOverlay: {
          Background: `linear-gradient(180deg, rgba(217, 217, 217, 0) 45.64%, #006f9c 106.1%)`,
          Hover: {
            Background: `rgba(0, 111, 156, 0.8)`,
          }
        },
        OverlayDownloadButton: {
          FontWeight: `400`,
          FontSize: `15px`,
          LineHeight: `18px`,
          Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
          BorderColor: themeGlobal.bodyThemeColor.Button.Hover.Background,
          BorderRadius: `4px`,
          Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
          PaddingY: `10px`,
          PaddingX: `40px`,
          Hover: {
            Background: themeGlobal.bodyThemeColor.Button.Background,
            BorderColor: themeGlobal.bodyThemeColor.Button.Background,
            Color: themeGlobal.bodyThemeColor.Button.Color,
          }
        }
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
              Url: themeGlobal.typography.h2.Url,
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
              Url: themeGlobal.typography.h3.Url,
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
              Url: themeGlobal.typography.h2.Url,
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
              Url: themeGlobal.typography.h3.Url,
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
              Url: themeGlobal.typography.regular.Url,
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
        },
      
      },
    } 

//   useEffect(() => {
//     return resetOtpSendStates;
//   }, []);
  return [theme];
};

export default useTheme;
