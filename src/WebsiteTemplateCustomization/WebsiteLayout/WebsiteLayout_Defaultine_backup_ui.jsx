import React from "react";
import SectionHeader from '../SectionImports/SectionHeader'
import SectionFooter from '../SectionImports/SectionFooter'
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../CommonComponent/Global.styled";
const WebsiteLayout_Defaultine = ({ children }) => {

  const themeGlobal = {
    bodyComponent: "Defaultine_Body",
    color: {
      alpha: `#343F64`,
      alphaLight: `#EBECF0`,
      alphaSemiLight: `#4E616B`,
      beta: `#E9DB89`,
      betaLight: ``,
      betaSemiLight: ``,
      background: ``,
      base: `#202020`,
      white: `#fff`,
    },
    typography: {
      h1: {
        FontSize: `56px`,
        FontWeight: `700`,
        LineHeight: `68px`,
      },
      h2: {
        FontSize: `32px`,
        FontWeight: `700`,
        LineHeight: `42px`,
      },
      h3: {
        FontSize: `18px`,
        FontWeight: `500`,
        LineHeight: `24px`,
      },
      h4: {
        FontSize: `20px`,
        FontWeight: `700`,
        LineHeight: `30px`,
      },
      h5: {
        FontSize: `16px`,
        FontWeight: `500`,
        LineHeight: `20px`,
      },
      h6: {
        FontSize: `18px`,
        FontWeight: `600`,
        LineHeight: `24px`,
      },
      regular: {
        FontSize: `16px`,
        FontWeight: `400`,
        LineHeight: `28px`,
      },
      anchor: {
        FontWeight: '500',
        FontSize: '16px',
        LineHeight: '1.24',
      },
    }

  }
  const theme = {
    Header: {
      component: "Defaultine_Header",
      Logo: {
        Width: '86px',
        Height: '86px',
      },
      h4: {
        FontWeight: `20px`,
        FontSize: `20px`,
        LineHeight: `30px`,
        Color: `#343F64`,
        TextTransform: 'uppercase',
      },
      h5: {
        FontWeight: `500`,
        FontSize: `16px`,
        LineHeight: `20px`,
        Color: `#4E616B`,
      },
      NavAuth: {
        ButtonLogin: {
          FontSize: '15px',
          FontWeight: '500',
          LineHeight: '22px',
          PaddingY: '8px',
          PaddingX: '16px',
          Background: '#FFFFFF',
          BorderColor: `#26335DCC`,
          BorderRadius: '6px',
          Color: `#26335DCC`,
          Hover: {
            Background: `#26335DCC`,
            Color: `#FFFFFF`,
            BorderColor: `transparent`,
          },
          Active: {
            Background: `#26335DCC`,
            Color: `#FFFFFF`,
            BorderColor: `transparent`,
          }

        },
        Buttonsignup: {
          FontSize: '15px',
          FontWeight: '500',
          LineHeight: '22px',
          PaddingY: '8px',
          PaddingX: '16px',
          Background: '#26335DCC',
          BorderColor: `transparent`,
          BorderRadius: '6px',
          Color: `#ffffff`,
          Hover: {
            Background: `#fff`,
            Color: `#26335DCC`,
            BorderColor: `#26335DCC`,
          },
          Active: {
            Background: `#fff`,
            Color: `#26335DCC`,
            BorderColor: `#26335DCC`,
          }
        }
      },
      NavMenuWrapper: {
        Background: `rgba(38, 51, 93, 0.05)`,
        NavMenuCustom: {
          MenuGap: '24px',
          FontWeight: '500',
          FontSize: '16px',
          LineHeight: '24px',
          Color: `#1A090D`,
          LetterSpacing: `normal`,
          Hover: {
            Color: `#26335D`,
          },
          Active: {
            Color: `#26335D`,
            FontWeight: '700',
          },
          NavMenuScrollIcon: {
            BorderColor: `#1A090D`,
            Hover: {
              BorderColor: `#26335D`,
            }
          }
        }
      }
    },
    Footer: {
      component: 'Defaultine_Footer',
      Background: `#343F64`,
      h4: {
        FontWeight: `20px`,
        FontSize: `20px`,
        LineHeight: `30px`,
        Color: `#fff`,
      },
      h5: {
        FontWeight: `500`,
        FontSize: `16px`,
        LineHeight: `20px`,
        Color: `#fff`,
      },
      h6: {
        FontWeight: `600`,
        FontSize: `12px`,
        LineHeight: `24px`,
        TextTransform: `uppercase`,
        Color: `#fff`,
      },
      li: {
        FontWeight: `400`,
        FontSize: `14px`,
        LineHeight: `21px`,
        TextTransform: `ca`,
        Color: `#fff`,
      },
      a: {
        FontWeight: '500',
        FontSize: '16px',
        LineHeight: '1.24',
        Color: `#FFFFFF`,
        Hover: {
          Color: `#E9DB89`,
        }
      },
      MapContainer: {
        Height: `200px`
      },
      SocialMediaIconListItem: {
        Width: `32px`,
        Height: `32px`,
      },
      CopyrightSectionItem: {
        FontWeight: `400`,
        FontSize: `10px`,
        LineHeight: `15px`,
        Color: `#fff`,
      }
    },
    Banner: {
      Background: `rgba(255, 255, 255, 0.5)`,
      a: {
        FontWeight: `400`,
        FontSize: `18px`,
        LineHeight: `24px`,
        Background: `#343F64`,
        BorderColor: `#343F64`,
        BorderRadius: `4px`,
        Color: `#ffffff`,
        PaddingY: `10px`,
        PaddingX: `40px`,
        Hover: {
          Background: `#343F64`,
          BorderColor: `#343F64`,
          Color: `#E9DB89`,
        }
      },
      h1: {
        FontWeight: `600`,
        FontSize: `18px`,
        LineHeight: `27px`,
        Color: `#1A090D`,
      },
      h3: {
        FontWeight: `400`,
        FontSize: `12px`,
        LineHeight: `18px`,
        Color: `#1A090D`,
      },
      Dots: {
        Color: `rgba(32, 32, 32, 0.5)`,
        Active: {
          Color: `#26335D`,
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
          FontWeight: `600`,
          FontSize: `24px`,
          LineHeight: `36px`,
          Color: `#26335D`,
          Alignment: `center`,
        },
        h3: {
          FontWeight: `500`,
          FontSize: `18px`,
          LineHeight: `24px`,
          Color: `#4E616B`,
          Alignment: `center`,
        },
        p: {
          FontWeight: `400`,
          FontSize: `16px`,
          LineHeight: `24px`,
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
        ViewMoreButton: {
          FontWeight: `500`,
          FontSize: `inherit`,
          LineHeight: `inherit`,
          Background: `transparent`,
          BorderColor: `transparent`,
          BorderRadius: `0`,
          Color: `#26335D`,
          PaddingY: `0`,
          PaddingX: `0`,
          TextDecoration: `underline`,
          Hover: {
            Background: `transparent`,
            BorderColor: `transparent`,
            Color: `#26335D`,
          }
        },
        ViewMoreSection: {
          MarginTop: `32px`,
        }
      },
      AboutUsPage: {
        h2: {
          FontWeight: `600`,
          FontSize: `24px`,
          LineHeight: `36px`,
          Color: `#26335D`,
          Alignment: `center`,
        },
        h3: {
          FontWeight: `500`,
          FontSize: `18px`,
          LineHeight: `24px`,
          Color: `#4E616B`,
          Alignment: `center`,
        },
        h4: {
          FontWeight: `700`,
          FontSize: `24px`,
          LineHeight: `29px`,
          Color: `#26335D`,
          Alignment: `center`,
        },
        h5: {
          FontWeight: `500`,
          FontSize: `20px`,
          LineHeight: `24px`,
          Color: `#26335D`,
          Alignment: `center`,
        },
        p: {
          FontWeight: `400`,
          FontSize: `16px`,
          LineHeight: `24px`,
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
            Color: `#26335D`,
          }
        },
        SlickArrowColor: {
          Color: `#26335D`,
          Hover: {
            Color: `#26335D`,
          }
        },
      },
    },
    Notice: {
      NoticeBoardHero: {
        a: {
          FontWeight: '500',
          FontSize: '16px',
          LineHeight: '1.24',
          Color: `#26335D`,
        },
        PaddingY: `16px`,
        ContentBox: {
          width: `100%`,
        },
      },
    },
    Message: {
      MessageDeskHomeHeroSection: {
        h4: {
          FontWeight: `20px`,
          FontSize: `20px`,
          LineHeight: `30px`,
          Color: `#343F64`,
        },
        h5: {
          FontWeight: `500`,
          FontSize: `16px`,
          LineHeight: `20px`,
          Color: `#4E616B`,
        },
        p: {
          FontWeight: `400`,
          FontSize: `16px`,
          LineHeight: `28px`,
          Color: `#343F64`,
          PaddingTop: `24px`,
        },

        ViewMoreButton: {
          FontWeight: `500`,
          FontSize: `inherit`,
          LineHeight: `inherit`,
          Background: `transparent`,
          BorderColor: `transparent`,
          BorderRadius: `0`,
          Color: `#26335D`,
          PaddingY: `0`,
          PaddingX: `0`,
          TextDecoration: `underline`,
          Hover: {
            Background: `transparent`,
            BorderColor: `transparent`,
            Color: `#26335D`,
          }
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
            Color: `#26335D`,
          }
        },
        SlickArrowColor: {
          Color: `#26335D`,
          Hover: {
            Color: `#26335D`,
          }
        },
      }
    },
    Team: {
      TeamHero: {
        h2: {
          FontWeight: `600`,
          FontSize: `24px`,
          LineHeight: `36px`,
          Alignment: `left`,
          Color: `#26335D`,
        },
        h3: {
          FontWeight: `500`,
          FontSize: `18px`,
          LineHeight: `24px`,
          Alignment: `center`,
          Color: `#4E616B`,
        },
        h4: {
          FontWeight: `500`,
          FontSize: `20px`,
          LineHeight: `23px`,
          Color: `#000000`,
          MarginBottom: `10px`,
        },
        h5: {
          FontWeight: `400`,
          FontSize: `16px`,
          LineHeight: `19px`,
          Color: `#202020`,
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
          Background: `#FFFFFF`,
          BorderColor: `#26335D`,
          BorderRadius: `4px`,
          Color: `#26335D`,
          PaddingY: `8px`,
          PaddingX: `32px`,
          MarginTop: `48px`,
          Hover: {
            Background: `#26335D`,
            BorderColor: `transparent`,
            Color: `#FFFFFF`,
          }
        }
      },
      TeamPage: {
        h2: {
          FontWeight: `600`,
          FontSize: `24px`,
          LineHeight: `36px`,
          Alignment: `center`,
          Color: `#26335D`,
        },
        h3: {
          FontWeight: `400`,
          FontSize: `16px`,
          LineHeight: `24px`,
          Alignment: `center`,
          Color: `#202020`,
        },
        h4: {
          FontWeight: `500`,
          FontSize: `20px`,
          LineHeight: `23px`,
          Color: `#000000`,
          MarginBottom: `10px`,
        },
        h5: {
          FontWeight: `400`,
          FontSize: `16px`,
          LineHeight: `19px`,
          Color: `#202020`,
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
      },
    },
    Facility: {
      FacilitiesHero: {
        h2: {
          FontWeight: `600`,
          FontSize: `24px`,
          LineHeight: `36px`,
          Alignment: `left`,
          Color: `#26335D`,
        },
        h3: {
          FontWeight: `500`,
          FontSize: `18px`,
          LineHeight: `24px`,
          Alignment: `center`,
          Color: `#4E616B`,
        },
        h4: {
          FontWeight: `500`,
          FontSize: `20px`,
          LineHeight: `30px`,
          Color: `#000000`,
        },
        p: {
          FontWeight: `400`,
          FontSize: `16px`,
          LineHeight: `24px`,
          Color: `rgba(32, 32, 32, 0.6)`,
        },
        ViewMoreFacilitiesButton: {
          FontWeight: `500`,
          FontSize: `15px`,
          LineHeight: `22px`,
          Background: `#FFFFFF`,
          BorderColor: `#26335D`,
          BorderRadius: `4px`,
          Color: `#26335D`,
          PaddingY: `8px`,
          PaddingX: `32px`,
          MarginTop: `48px`,
          Hover: {
            Background: `#26335D`,
            BorderColor: `transparent`,
            Color: `#FFFFFF`,
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
      },
      FacilitiesPage: {
        h2: {
          FontWeight: `600`,
          FontSize: `24px`,
          LineHeight: `36px`,
          Alignment: `left`,
          Color: `#26335D`,
        },
        h3: {
          FontWeight: `500`,
          FontSize: `18px`,
          LineHeight: `24px`,
          Alignment: `center`,
          Color: `#4E616B`,
        },
        h4: {
          FontWeight: `500`,
          FontSize: `20px`,
          LineHeight: `30px`,
          Color: `#000000`,
        },
        p: {
          FontWeight: `400`,
          FontSize: `16px`,
          LineHeight: `24px`,
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
          FontWeight: `600`,
          FontSize: `24px`,
          LineHeight: `36px`,
          Alignment: `left`,
          Color: `#26335D`,
        },
        h3: {
          FontWeight: `500`,
          FontSize: `18px`,
          LineHeight: `24px`,
          Alignment: `center`,
          Color: `#4E616B`,
        },
        h6: {
          FontWeight: `500`,
          FontSize: `18px`,
          LineHeight: `27px`,
          Alignment: `center`,
          Color: `#FFFFFF`,
        },
        ViewMoreGalleryButton: {
          FontWeight: `500`,
          FontSize: `15px`,
          LineHeight: `22px`,
          Background: `#FFFFFF`,
          BorderColor: `#26335D`,
          BorderRadius: `4px`,
          Color: `#26335D`,
          PaddingY: `8px`,
          PaddingX: `32px`,
          MarginTop: `48px`,
          Hover: {
            Background: `#26335D`,
            BorderColor: `transparent`,
            Color: `#FFFFFF`,
          }
        },
        GalleryCaption: {
          Background: `rgba(9, 51, 81, 0.6)`,
        }
      },
      GalleryPage: {
        h2: {
          FontWeight: `600`,
          FontSize: `24px`,
          LineHeight: `36px`,
          Alignment: `left`,
          Color: `#26335D`,
        },
        h3: {
          FontWeight: `500`,
          FontSize: `18px`,
          LineHeight: `24px`,
          Alignment: `center`,
          Color: `#4E616B`,
        },
        h6: {
          FontWeight: `500`,
          FontSize: `18px`,
          LineHeight: `27px`,
          Alignment: `center`,
          Color: `#FFFFFF`,
        },
        GalleryCaption: {
          Background: `rgba(9, 51, 81, 0.6)`,
        }
      },
      GalleryListSection: {
        h2: {
          FontWeight: `700`,
          FontSize: `32px`,
          LineHeight: `42px`,
          Alignment: `center`,
          Color: `#343F64`,
        },
        h4: {
          FontWeight: `20px`,
          FontSize: `20px`,
          LineHeight: `30px`,
          Color: `#fff`,
        },
        GalleryListFilter: {
          MarginBottom: `40px`,
        },
        GalleryListFilterButton: {
          FontWeight: `500`,
          FontSize: `15px`,
          LineHeight: `18px`,
          Background: `#fff`,
          BorderColor: `#343F64`,
          BorderRadius: `4px`,
          Color: `#343F64`,
          PaddingY: `8px`,
          PaddingX: `24px`,
          Hover: {
            Background: `#343F64`,
            BorderColor: `#343F64`,
            Color: `#E9DB89`,
          },
          Active: {
            Background: `#343F64`,
            BorderColor: `#343F64`,
            Color: `#E9DB89`,
          }
        }
      },
    },
    Contact: {
      ContactHero: {
        h2: {
          FontWeight: `400`,
          FontSize: `48px`,
          LineHeight: `72px`,
          Color: `#202020`,
        },
        h3: {
          FontWeight: `400`,
          FontSize: `16px`,
          LineHeight: `24px`,
          Color: `#202020`,
        },
        p: {
          FontWeight: `400`,
          FontSize: `16px`,
          LineHeight: `28px`,
          Color: `#202020`,
          MarginBottom: `10px`,
        },
        ContactHomeHeroAddress: {
          AddressIcon: {
            Background: `#26335D`
          },
          PhoneIcon: {
            Background: `#26335D`
          },
          MailIcon: {
            Background: `#26335D`
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
            Background: `#26335D`,
            BorderColor: `#26335D`,
            BorderRadius: `4px`,
            Color: `#fff`,
            PaddingY: `10px`,
            PaddingX: `40px`,
            Hover: {
              Background: `#FFF`,
              BorderColor: `#26335D`,
              Color: `#26335D`,
            }
          }
        }
      },
      ContactPage: {
        h2: {
          FontWeight: `700`,
          FontSize: `32px`,
          LineHeight: `42px`,
          Color: `#343F64`,
        },
        h3: {
          FontWeight: `500`,
          FontSize: `18px`,
          LineHeight: `24px`,
          Color: `#343F64`,
          BorderBottom: {
            BorderWidth: `2px`,
            Background: `#4E616B`,
            BottomSpace: `-8px`,
          }
        },
        h6: {
          FontWeight: `600`,
          FontSize: `18px`,
          LineHeight: `24px`,
          Color: `#343F64`,
        },
        a: {
          FontWeight: '500',
          FontSize: '16px',
          LineHeight: '1.24',
          Color: `#343F64`,
        },
        p: {
          FontWeight: '500',
          FontSize: '16px',
          LineHeight: '1.24',
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
          FontWeight: `600`,
          FontSize: `24px`,
          LineHeight: `36px`,
          Alignment: `left`,
          Color: `#26335D`,
        },
        h4: {
          FontWeight: `700`,
          FontSize: `14px`,
          LineHeight: `24px`,
          Color: `#202020`,
        },
        p: {
          FontWeight: `400`,
          FontSize: `14px`,
          LineHeight: `24px`,
          Color: `rgba(32, 32, 32, 0.6)`,
        },
        AdmissionHeroHead: {
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
          Background: `#FFFFFF`,
          BorderColor: `#26335D`,
          BorderRadius: `24px`,
          Color: `#26335D`,
          PaddingY: `8px`,
          PaddingX: `16px`,
          MarginTop: `10px`,
          Hover: {
            Background: `#26335D`,
            BorderColor: `transparent`,
            Color: `#FFFFFF`,
          }
        },
        ViewMoreAdmissionHeroButton: {
          FontWeight: `500`,
          FontSize: `15px`,
          LineHeight: `22px`,
          Background: `#FFFFFF`,
          BorderColor: `#26335D`,
          BorderRadius: `4px`,
          Color: `#26335D`,
          PaddingY: `8px`,
          PaddingX: `32px`,
          MarginTop: `48px`,
          Hover: {
            Background: `#26335D`,
            BorderColor: `transparent`,
            Color: `#FFFFFF`,
          }
        },
        ViewMoreAdmissionHeroSection: {
          Alignment: `center`
        }
      },
      AdmissionPage: {
        h2: {
          FontWeight: `600`,
          FontSize: `24px`,
          LineHeight: `36px`,
          Alignment: `left`,
          Color: `#26335D`,
        },
        h4: {
          FontWeight: `700`,
          FontSize: `14px`,
          LineHeight: `24px`,
          Color: `#202020`,
        },
        p: {
          FontWeight: `400`,
          FontSize: `14px`,
          LineHeight: `24px`,
          Color: `rgba(32, 32, 32, 0.6)`,
        },
        AdmissionPageHead: {
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
          Background: `#FFFFFF`,
          BorderColor: `#26335D`,
          BorderRadius: `24px`,
          Color: `#26335D`,
          PaddingY: `8px`,
          PaddingX: `16px`,
          MarginTop: `10px`,
          Hover: {
            Background: `#26335D`,
            BorderColor: `transparent`,
            Color: `#FFFFFF`,
          }
        }
      },
    },
    FeeStructure: {
      FeeStructureHero: {
        h2: {
          FontWeight: `600`,
          FontSize: `24px`,
          LineHeight: `36px`,
          Alignment: `left`,
          Color: `#26335D`,
        },
        h3: {
          FontWeight: `300`,
          FontSize: `16px`,
          LineHeight: `24px`,
          Color: `rgba(32, 32, 32, 0.6)`,
        },
        h6: {
          FontWeight: `600`,
          FontSize: `18px`,
          LineHeight: `24px`,
          Color: `#202020`,
        },
        p: {
          FontWeight: `400`,
          FontSize: `14px`,
          LineHeight: `24px`,
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
          Background: `transparent`,
          BorderColor: `transparent`,
          BorderRadius: `0`,
          Color: `#26335D`,
          PaddingY: `0`,
          PaddingX: `0`,
          MarginTop: `8px`,
          TextDecoration: `underline`,
          Hover: {
            Background: `transparent`,
            BorderColor: `transparent`,
            Color: `#26335D`,
          }
        },
        ViewMoreFeeStructureHeroButton: {
          FontWeight: `500`,
          FontSize: `15px`,
          LineHeight: `22px`,
          Background: `#FFFFFF`,
          BorderColor: `#26335D`,
          BorderRadius: `4px`,
          Color: `#26335D`,
          PaddingY: `8px`,
          PaddingX: `32px`,
          MarginTop: `48px`,
          TextDecoration: `normal`,
          Hover: {
            Background: `#26335D`,
            BorderColor: `transparent`,
            Color: `#FFFFFF`,
          }
        },
        ViewMoreFeeStructureHeroSection: {
          Alignment: `left`
        }
      },
      FeeStructurePage: {
        h2: {
          FontWeight: `600`,
          FontSize: `24px`,
          LineHeight: `36px`,
          Alignment: `left`,
          Color: `#26335D`,
        },
        h3: {
          FontWeight: `300`,
          FontSize: `16px`,
          LineHeight: `24px`,
          Color: `rgba(32, 32, 32, 0.6)`,
        },
        h6: {
          FontWeight: `600`,
          FontSize: `18px`,
          LineHeight: `24px`,
          Color: `#202020`,
        },
        p: {
          FontWeight: `400`,
          FontSize: `14px`,
          LineHeight: `24px`,
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
          Background: `transparent`,
          BorderColor: `transparent`,
          BorderRadius: `0`,
          Color: `#26335D`,
          PaddingY: `0`,
          PaddingX: `0`,
          MarginTop: `8px`,
          TextDecoration: `underline`,
          Hover: {
            Background: `transparent`,
            BorderColor: `transparent`,
            Color: `#26335D`,
          }
        },
      },
    },
    Miscellaneous: {
      MiscellaneousHero: {
        h2: {
          FontWeight: `600`,
          FontSize: `24px`,
          LineHeight: `36px`,
          Alignment: `left`,
          Color: `#26335D`,
        },
        h3: {
          FontWeight: `300`,
          FontSize: `16px`,
          LineHeight: `24px`,
          Color: `rgba(32, 32, 32, 0.6)`,
        },
        h4: {
          FontWeight: `600`,
          FontSize: `20px`,
          LineHeight: `30px`,
          Color: `#26335D`,
        },
        h6: {
          FontWeight: `600`,
          FontSize: `18px`,
          LineHeight: `24px`,
          Color: `#202020`,
        },
        p: {
          FontWeight: `300`,
          FontSize: `14px`,
          LineHeight: `24px`,
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
          Background: `transparent`,
          BorderColor: `transparent`,
          BorderRadius: `0`,
          Color: `#26335D`,
          PaddingY: `0`,
          PaddingX: `0`,
          MarginTop: `8px`,
          TextDecoration: `underline`,
          Hover: {
            Background: `transparent`,
            BorderColor: `transparent`,
            Color: `#26335D`,
          }
        },
        ViewMoreMiscellaneousHeroButton: {
          FontWeight: `500`,
          FontSize: `15px`,
          LineHeight: `22px`,
          Background: `#FFFFFF`,
          BorderColor: `#26335D`,
          BorderRadius: `4px`,
          Color: `#26335D`,
          PaddingY: `8px`,
          PaddingX: `32px`,
          MarginTop: `48px`,
          TextDecoration: `normal`,
          Hover: {
            Background: `#26335D`,
            BorderColor: `transparent`,
            Color: `#FFFFFF`,
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
          FontWeight: `600`,
          FontSize: `24px`,
          LineHeight: `36px`,
          Alignment: `left`,
          Color: `#26335D`,
        },
        h3: {
          FontWeight: `300`,
          FontSize: `16px`,
          LineHeight: `24px`,
          Color: `rgba(32, 32, 32, 0.6)`,
        },
        h4: {
          FontWeight: `500`,
          FontSize: `16px`,
          LineHeight: `20px`,
          Color: `#26335D`,
        },
        h5: {
          FontWeight: `300`,
          FontSize: `14px`,
          LineHeight: `20px`,
          Color: `rgba(32, 32, 32, 0.6)`,
        },
        h6: {
          FontWeight: `600`,
          FontSize: `18px`,
          LineHeight: `24px`,
          Color: `#202020`,
        },
        p: {
          FontWeight: `300`,
          FontSize: `14px`,
          LineHeight: `24px`,
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
          Background: `#FFFFFF`,
          BorderColor: `#26335D`,
          BorderRadius: `4px`,
          Color: `#26335D`,
          PaddingY: `8px`,
          PaddingX: `32px`,
          MarginTop: `48px`,
          TextDecoration: `normal`,
          Hover: {
            Background: `#26335D`,
            BorderColor: `transparent`,
            Color: `#FFFFFF`,
          }
        },
        ViewMoreTestimonialHeroSection: {
          Alignment: `center`
        },

        Dots: {
          Color: `rgba(32, 32, 32, 0.5)`,
          Active: {
            Color: `#26335D`,
          }
        },
        SlickArrowColor: {
          Color: `#26335D`,
          Hover: {
            Color: `#26335D`,
          }
        },
      },
    },
    Faqs: {
      FaqsHero: {
        h2: {
          FontWeight: `700`,
          FontSize: `32px`,
          LineHeight: `42px`,
          Color: `#343F64`,
        },
        h6: {
          FontWeight: `600`,
          FontSize: `18px`,
          LineHeight: `24px`,
          Color: `#343F64`,
        },
        p: {
          FontWeight: `400`,
          FontSize: `16px`,
          LineHeight: `28px`,
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
          Background: `#343F64`,
          BorderColor: `#343F64`,
          BorderRadius: `4px`,
          Color: `#ffffff`,
          PaddingY: `10px`,
          PaddingX: `40px`,
          Hover: {
            Background: `#343F64`,
            BorderColor: `#343F64`,
            Color: `#E9DB89`,
          }
        },
        ViewMoreFaqsHeroSection: {
          Alignment: `left`,
          MarginTop: `32px`,
        }
      },
      FaqsPage: {
        h2: {
          FontWeight: `700`,
          FontSize: `32px`,
          LineHeight: `42px`,
          Color: `#343F64`,
        },
        h6: {
          FontWeight: `600`,
          FontSize: `18px`,
          LineHeight: `24px`,
          Color: `#343F64`,
        },
        p: {
          FontWeight: `400`,
          FontSize: `16px`,
          LineHeight: `28px`,
          Color: `#343F64`,
        },

        FaqsHead: {
          MarginBottom: `40px`,
          Alignment: `left`,
        },
        FaqListItem: {
          BorderColor: `#4E616B`,
        },
      },
    },
    Vacancy: {
      VacancyHero: {
        h2: {
          FontWeight: `600`,
          FontSize: `24px`,
          LineHeight: `36px`,
          Alignment: `left`,
          Color: `#26335D`,
        },
        h3: {
          FontWeight: `300`,
          FontSize: `16px`,
          LineHeight: `24px`,
          Color: `rgba(32, 32, 32, 0.6)`,
        },
        h4: {
          FontWeight: `700`,
          FontSize: `14px`,
          LineHeight: `24px`,
          Color: `#202020`,
        },
        p: {
          FontWeight: `400`,
          FontSize: `14px`,
          LineHeight: `24px`,
          Color: `rgba(32, 32, 32, 0.6)`,
        },
        VacancyHeroHead: {
          Alignment: `left`,
        },
        VacancyItem: {
          Background: `#FFFFFF`,
        },
        VacancyItemCaption: {
          Padding: `14px`,
        },
        ApplyNowButton: {
          FontWeight: `600`,
          FontSize: `14px`,
          LineHeight: `20px`,
          Background: `#FFFFFF`,
          BorderColor: `#26335D`,
          BorderRadius: `24px`,
          Color: `#26335D`,
          PaddingY: `8px`,
          PaddingX: `16px`,
          MarginTop: `10px`,
          Hover: {
            Background: `#26335D`,
            BorderColor: `transparent`,
            Color: `#FFFFFF`,
          }
        },
        ViewMoreVacancyHeroButton: {
          FontWeight: `500`,
          FontSize: `15px`,
          LineHeight: `22px`,
          Background: `#FFFFFF`,
          BorderColor: `#26335D`,
          BorderRadius: `4px`,
          Color: `#26335D`,
          PaddingY: `8px`,
          PaddingX: `32px`,
          MarginTop: `48px`,
          Hover: {
            Background: `#26335D`,
            BorderColor: `transparent`,
            Color: `#FFFFFF`,
          }
        },
        ViewMoreVacancyHeroSection: {
          Alignment: `center`
        }
      },
      VacancyPage: {
        h2: {
          FontWeight: `700`,
          FontSize: `32px`,
          LineHeight: `42px`,
          Color: `#343F64`,
        },
        h6: {
          FontWeight: `600`,
          FontSize: `18px`,
          LineHeight: `24px`,
          Color: `#fff`,
        },
        p: {
          FontWeight: `400`,
          FontSize: `16px`,
          LineHeight: `28px`,
          Color: `#fff`,
        },
        VacancyHead: {
          MarginBottom: `40px`,
          Alignment: `center`,
        },
        VacancyListItem: {
          BorderColor: `#4E616B`,
        },
        OverlayApplyNowButton: {
          FontWeight: `400`,
          FontSize: `15px`,
          LineHeight: `18px`,
          Background: `#E9DB89`,
          BorderColor: `#E9DB89`,
          BorderRadius: `4px`,
          Color: `#343F64`,
          PaddingY: `10px`,
          PaddingX: `40px`,
          Hover: {
            Background: `#343F64`,
            BorderColor: `#343F64`,
            Color: `#E9DB89`,
          }
        },
        OverlayViewButton: {
          FontWeight: `400`,
          FontSize: `15px`,
          LineHeight: `18px`,
          Background: `#E9DB89`,
          BorderColor: `#E9DB89`,
          BorderRadius: `4px`,
          Color: `#343F64`,
          PaddingY: `10px`,
          PaddingX: `40px`,
          Hover: {
            Background: `#343F64`,
            BorderColor: `#343F64`,
            Color: `#E9DB89`,
          }
        }
      },
    },
    Announcement: {
      AnnouncementHero: {
        h2: {
          FontWeight: `600`,
          FontSize: `24px`,
          LineHeight: `36px`,
          Alignment: `left`,
          Color: `#26335D`,
        },
        h3: {
          FontWeight: `500`,
          FontSize: `18px`,
          LineHeight: `24px`,
          Alignment: `center`,
          Color: `#4E616B`,
        },
        h6: {
          FontWeight: `500`,
          FontSize: `18px`,
          LineHeight: `27px`,
          Alignment: `left`,
          Color: `#FFFFFF`,
        },
        ViewMoreAnnouncementButton: {
          FontWeight: `500`,
          FontSize: `15px`,
          LineHeight: `22px`,
          Background: `#FFFFFF`,
          BorderColor: `#26335D`,
          BorderRadius: `4px`,
          Color: `#26335D`,
          PaddingY: `8px`,
          PaddingX: `32px`,
          MarginTop: `48px`,
          Hover: {
            Background: `#26335D`,
            BorderColor: `transparent`,
            Color: `#FFFFFF`,
          }
        },
        AnnouncementCaption: {
          Background: `rgba(0, 0, 0, 0.5)`,
        }
      },
      AnnouncementPage: {
        h2: {
          FontWeight: `600`,
          FontSize: `24px`,
          LineHeight: `36px`,
          Alignment: `left`,
          Color: `#26335D`,
        },
        h3: {
          FontWeight: `500`,
          FontSize: `18px`,
          LineHeight: `24px`,
          Alignment: `center`,
          Color: `#4E616B`,
        },
        h6: {
          FontWeight: `500`,
          FontSize: `18px`,
          LineHeight: `27px`,
          Alignment: `left`,
          Color: `#FFFFFF`,
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
            Color: themeGlobal.color.alpha,
            Alignment: `left`,
          },
          h3: {
            FontWeight: themeGlobal.typography.h3.FontWeight,
            FontSize: themeGlobal.typography.h3.FontSize,
            LineHeight: themeGlobal.typography.h3.LineHeight,
            Color: themeGlobal.color.alphaSemiLight,
            Alignment: `left`,
          }
        },
        ModalBodyWTC: {
          h2: {
            FontWeight: themeGlobal.typography.h2.FontWeight,
            FontSize: themeGlobal.typography.h2.FontSize,
            LineHeight: themeGlobal.typography.h2.LineHeight,
            Color: themeGlobal.color.alpha,
            Alignment: `left`,
          },
          h3: {
            FontWeight: themeGlobal.typography.h3.FontWeight,
            FontSize: themeGlobal.typography.h3.FontSize,
            LineHeight: themeGlobal.typography.h3.LineHeight,
            Color: themeGlobal.color.alphaSemiLight,
            Alignment: `left`,
          },
          p: {
            FontWeight: themeGlobal.typography.regular.FontWeight,
            FontSize: themeGlobal.typography.regular.FontSize,
            LineHeight: themeGlobal.typography.regular.LineHeight,
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
        bodyBackground: '#FFFFFF',
        bodyFont: `'Poppins', sans-serif`,
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
export default WebsiteLayout_Defaultine