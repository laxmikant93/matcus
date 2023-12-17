import React from "react";
import SectionHeader from '../SectionImports/SectionHeader'
import SectionFooter from '../SectionImports/SectionFooter'
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../CommonComponent/global.styled";
const WebsiteLayout_Vespertine = ({ children }) => {

  const themeGlobal = {
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
        FontSize: `56px`,
        FontWeight: `700`,
        LineHeight: `68px`,
        FontFamily: ``,
        Url: '',
        FontStyle: `Normal`,
        LetterSpacing: ``,
      },
      h2: {
        FontSize: `32px`,
        FontWeight: `700`,
        LineHeight: `42px`,
        FontFamily: ``,
        Url: '',
        FontStyle: ``,
        LetterSpacing: ``,
      },
      h3: {
        FontSize: `18px`,
        FontWeight: `500`,
        LineHeight: `24px`,
        FontFamily: ``,
        Url: '',
        FontStyle: ``,
        LetterSpacing: ``,
      },
      h4: {
        FontSize: `20px`,
        FontWeight: `700`,
        LineHeight: `30px`,
        FontFamily: ``,
        Url: '',
        FontStyle: ``,
        LetterSpacing: ``,
      },
      h5: {
        FontSize: `16px`,
        FontWeight: `500`,
        LineHeight: `20px`,
        LetterSpacing: ``,
        FontFamily: ``,
        Url: '',
        FontStyle: ``,
      },
      h6: {
        FontSize: `18px`,
        FontWeight: `600`,
        LineHeight: `24px`,
        LetterSpacing: ``,
        FontFamily: ``,
        Url: '',
        FontStyle: ``,
      },
      regular: {
        FontSize: `16px`,
        FontWeight: `400`,
        LineHeight: `28px`,
        LetterSpacing: ``,
        FontFamily: ``,
        Url: '',
        FontStyle: ``,
      },
      anchor: {
        FontWeight: '500',
        FontSize: '16px',
        LineHeight: '1.24',
        LetterSpacing: ``,
        FontFamily: ``,
        FontStyle: ``,
      },
    },
    headerThemeColor: {
      Background: `#FFFFFF`,
      h4: {
        Color: '#343F64',
      },
      h5: {
        Color: '#4E616B',
      },
      ButtonLogin: {
        Background: `#343F64`,
        Color: `#FFFFFF`,
        BorderColor: `#343F64`,
        Hover: {
          Background: `#343F64`,
          Color: `#E9DB89`,
          BorderColor: `#343F64`,
        },
        Active: {
          Background: `#343F64`,
          Color: `#E9DB89`,
          BorderColor: `#343F64`,
        }
      },
      ButtonSignup: {
        Background: `#FFFFFF`,
        BorderColor: `#343F64`,
        Color: `#343F64`,
        Hover: {
          Background: `#343F64`,
          Color: `#E9DB89`,
          BorderColor: `#343F64`,
        },
        Active: {
          Background: `#343F64`,
          Color: `#E9DB89`,
          BorderColor: `#343F64`,
        }
      },
      NavMenu: {
        Background: `#343F64`,
        Color: `#FFFFFF`,
        Hover: {
          Color: `#E9DB89`,
        },
        ScrollIcon: {
          Color: `#FFFFFF`,
          Hover: {
            Color: `#E9DB89`,
          }
        }
      },
    },
    footerThemeColor: {
      Background: `#343F64`,
      Logo: {
        Background: `#FFFFFF`,
      },
      h4: {
        Color: '#FFFFFF',
      },
      h5: {
        Color: '#FFFFFF',
      },
      h6: {
        Color: '#FFFFFF',
      },
      a: {
        Color: `#FFFFFF`,
        Hover: {
          Color: `#E9DB89`,
        }
      },
      Copyright: {
        Color: `#FFFFFF`,
      }
    },
    headerThemeTypo: {
      h4: {
        FontSize: `20px`,
        FontWeight: `700`,
        LineHeight: `30px`,
        LetterSpacing: ``,
        FontFamily: ``,
        Url: '',
        FontStyle: ``,
      },
      h5: {
        FontSize: `16px`,
        FontWeight: `500`,
        LineHeight: `20px`,
        LetterSpacing: ``,
        FontFamily: ``,
        Url: '',
        FontStyle: ``,
      },
      Button: {
        FontWeight: `500`,
        FontSize: `15px`,
        LineHeight: `18px`,
        LetterSpacing: ``,
        FontFamily: ``,
        Url: '',
        FontStyle: ``,
      },
      NavMenu: {
        FontWeight: `500`,
        FontSize: `16px`,
        LineHeight: `20px`,
        LetterSpacing: ``,
        FontFamily: ``,
        Url: '',
        FontStyle: ``,
      }
    },
    footerThemeTypo: {
      h4: {
        FontSize: `20px`,
        FontWeight: `700`,
        LineHeight: `30px`,
        LetterSpacing: ``,
        FontFamily: ``,
        Url: '',
        FontStyle: ``,
      },
      h5: {
        FontSize: `16px`,
        FontWeight: `500`,
        LineHeight: `20px`,
        LetterSpacing: ``,
        FontFamily: ``,
        Url: '',
        FontStyle: ``,
      },
      h6: {
        FontSize: `16px`,
        FontWeight: `500`,
        LineHeight: `24px`,
        LetterSpacing: ``,
        FontFamily: ``,
        Url: '',
        FontStyle: ``,
      },
      a: {
        FontWeight: '400',
        FontSize: '14px',
        LineHeight: '20px',
        LetterSpacing: ``,
        FontFamily: ``,
        Url: '',
        FontStyle: ``,
      },
      Copyright: {
        FontWeight: '400',
        FontSize: '10px',
        LineHeight: '15px',
        LetterSpacing: ``,
        FontFamily: ``,
        Url: '',
        FontStyle: ``,
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
      Map: {
        Height: `300px`
      },
      SocialMediaIcon: {
        Width: `38px`,
        Height: `38px`,
      },
    },
    bodyThemeColor: {
      Background: `#FFFFFF`,
      typography: {
        Color: `#202020`,
        HeadingColor: `#343F64`,
        SubHeadingColor: `#4E616B`,
        LinkColor: `#343F64`,
        Hover: {
          LinkColor: `#4E616B`,
        }
      },
      Button: {
        Background: `#343F64`,
        Color: `#FFFFFF`,
        Hover: {
          Background: `#4E616B`,
          Color: `#E9DB89`,
        }
      }
    }
  }
  const theme = {
    Header: {
      component: "Vespertine_Header",
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
          Url: themeGlobal.typography.h2.Url,
          FontStyle: themeGlobal.typography.h2.FontStyle,
          LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
          Alignment: `center`,
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
            BorderColor: themeGlobal.color.alpha,
            Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
          }
        },
        ViewMoreSection: {
          MarginTop: `32px`,
        }
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
            Background: themeGlobal.color.alpha,
            BottomSpace: `-8px`,
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

        SectionHead: {
          MarginBottom: `40px`,
          Alignment: `center`,
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
            Url: themeGlobal.typography.h2.Url,
            FontStyle: themeGlobal.typography.h2.FontStyle,
            LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
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
          h4: {
            FontWeight: themeGlobal.typography.h4.FontWeight,
            FontSize: themeGlobal.typography.h4.FontSize,
            LineHeight: themeGlobal.typography.h4.LineHeight,
            Url: themeGlobal.typography.h4.Url,
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
            Url: themeGlobal.typography.h5.Url,
            FontStyle: themeGlobal.typography.h5.FontStyle,
            LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
            Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
          },
          p: {
            FontWeight: themeGlobal.typography.regular.FontWeight,
            FontSize: themeGlobal.typography.regular.FontSize,
            LineHeight: themeGlobal.typography.regular.LineHeight,
            Url: themeGlobal.typography.regular.Url,
            FontFamily: themeGlobal.typography.regular.FontFamily,
            FontStyle: themeGlobal.typography.regular.FontStyle,
            LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
            Color: themeGlobal.bodyThemeColor.typography.Color,
          },
          MessageDeskSectionHead: {
            MarginBottom: `40px`,
            Alignment: `center`,
            BorderBottom: {
              BorderWidth: `2px`,
              Background: themeGlobal.color.alpha,
              BottomSpace: `-8px`,
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
            Url: themeGlobal.typography.regular.Url,
            FontStyle: themeGlobal.typography.h2.FontStyle,
            LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
            Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            Alignment: `center`,
            BorderBottom: {
              BorderWidth: `2px`,
              Background: themeGlobal.color.alpha,
              BottomSpace: `-8px`,
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
            Alignment: `center`,
          },
          MissionHead: {
            MarginBottom: `40px`,
            Alignment: `center`,
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
            Url: themeGlobal.typography.h2.Url,
            FontStyle: themeGlobal.typography.h2.FontStyle,
            LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
            Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
            Alignment: `center`,
            BorderBottom: {
              BorderWidth: `2px`,
              Background: themeGlobal.color.alpha,
              BottomSpace: `-8px`,
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
            Alignment: `center`,
          },
          VisionHead: {
            MarginBottom: `40px`,
            Alignment: `center`,
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
    Principal: {
      PrincipalHero: {
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
          Url: themeGlobal.typography.h5.Url,
          FontFamily: themeGlobal.typography.h5.FontFamily,
          FontStyle: themeGlobal.typography.h5.FontStyle,
          LetterSpacing: themeGlobal.typography.h5.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.SubHeadingColor,
        },
        p: {
          FontWeight: themeGlobal.typography.regular.FontWeight,
          FontSize: themeGlobal.typography.regular.FontSize,
          LineHeight: themeGlobal.typography.regular.LineHeight,
          Url: themeGlobal.typography.regular.Url,
          FontFamily: themeGlobal.typography.regular.FontFamily,
          FontStyle: themeGlobal.typography.regular.FontStyle,
          LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.Color,
          PaddingTop: `24px`,
        },
        PrincipalProfileImage: {
          Width: `200px`,
          Height: `200px`,
          BorderRadius: `50%`,
          MarginBottom: `24px`,
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
            BorderColor: themeGlobal.color.alpha,
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
          MarginBottom: `10px`,
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
            BorderColor: themeGlobal.color.alpha,
            Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
          }
        }
      },
      TeamPage: {
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
          MarginBottom: `10px`,
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
          Url: themeGlobal.typography.h2.Url,
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
        p: {
          FontWeight: themeGlobal.typography.regular.FontWeight,
          FontSize: themeGlobal.typography.regular.FontSize,
          LineHeight: themeGlobal.typography.regular.LineHeight,
          FontFamily: themeGlobal.typography.regular.FontFamily,
          Url: themeGlobal.typography.regular.Url,
          FontStyle: themeGlobal.typography.regular.FontStyle,
          LetterSpacing: themeGlobal.typography.regular.LetterSpacing,
          Color: themeGlobal.bodyThemeColor.typography.Color,
          MarginTop: `20px`,
        },
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
          MarginTop: `48px`,
          Hover: {
            Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
            BorderColor: themeGlobal.color.alpha,
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
          Background: `rgba(32, 32, 32, 0.1)`,
          BorderBottom: {
            Height: `2px`,
            Background: themeGlobal.color.alphaSemiLight,
            BottomSpace: `-10px`,
          },
        },
      },
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
    Gallery: {
      GalleryHero: {
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
        ViewMoreSneekPeakButton: {
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
            BorderColor: themeGlobal.color.alpha,
            Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
          }
        }
      },
      GalleryPage: {
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
          Color: themeGlobal.bodyThemeColor.typography.HeadingColor,
        }
      },
      GalleryListSection: {
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
          Url: themeGlobal.typography.h2.Url,
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
          BorderColor: themeGlobal.color.alpha,
          BorderRadius: `4px`,
          Color: themeGlobal.bodyThemeColor.Button.Color,
          PaddingY: `8px`,
          PaddingX: `24px`,
          Hover: {
            Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
            BorderColor: themeGlobal.color.alpha,
            Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
          },
          Active: {
            Background: themeGlobal.bodyThemeColor.Button.Hover.Background,
            BorderColor: themeGlobal.color.alpha,
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
              BorderColor: themeGlobal.color.alpha,
              Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
            }
          }
        }
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
      FaqsPage: {
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
      VacancyPage: {
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
            BorderColor: themeGlobal.color.alpha,
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
            BorderColor: themeGlobal.color.alpha,
            Color: themeGlobal.bodyThemeColor.Button.Hover.Color,
          }
        }
      },
    },
    Announcement: {
      AnnouncementPage: {
        h2: {
          FontWeight: themeGlobal.typography.h2.FontWeight,
          FontSize: themeGlobal.typography.h2.FontSize,
          LineHeight: themeGlobal.typography.h2.LineHeight,
          FontFamily: themeGlobal.typography.h2.FontFamily,
          Url: themeGlobal.typography.h2.Url,
          FontStyle: themeGlobal.typography.h2.FontStyle,
          LetterSpacing: themeGlobal.typography.h2.LetterSpacing,
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
            BorderColor: themeGlobal.color.alpha,
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
        bodyBackground: '#ffffff',
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

  const HeaderToRender = SectionHeader[theme.Header.component];
  const FooterToRender = SectionFooter[theme.Footer.component];

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <HeaderToRender />
        {children}
        <FooterToRender />
      </ThemeProvider>
    </React.Fragment>
  )
}
export default WebsiteLayout_Vespertine