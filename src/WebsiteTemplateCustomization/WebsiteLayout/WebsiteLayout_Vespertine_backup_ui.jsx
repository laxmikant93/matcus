import React from "react";
import SectionHeader from '../SectionImports/SectionHeader'
import SectionFooter from '../SectionImports/SectionFooter'
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../CommonComponent/Global.styled";
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
      component: "Vespertine_Header",
      Logo: {
        Width: '86px',
        Height: '86px',
      },
      h4: {
        FontWeight: themeGlobal.typography.h4.FontWeight,
        FontSize: themeGlobal.typography.h4.FontSize,
        LineHeight: themeGlobal.typography.h4.LineHeight,
        Color: themeGlobal.color.alpha,
        TextTransform: 'uppercase',
      },
      h5: {
        FontWeight: themeGlobal.typography.h5.FontWeight,
        FontSize: themeGlobal.typography.h5.FontSize,
        LineHeight: themeGlobal.typography.h5.LineHeight,
        Color: themeGlobal.color.alphaSemiLight,
      },
      NavAuth: {
        ButtonLogin: {
          FontSize: '15px',
          FontWeight: '600',
          LineHeight: '18px',
          PaddingY: '10px',
          PaddingX: '14px',
          Background: themeGlobal.color.alpha,
          BorderColor: themeGlobal.color.alpha,
          BorderRadius: '4px',
          Color: themeGlobal.color.universal,
          Hover: {
            Background: themeGlobal.color.alpha,
            Color: themeGlobal.color.beta,
            BorderColor: themeGlobal.color.alpha,
          },
          Active: {
            Background: themeGlobal.color.alpha,
            Color: themeGlobal.color.beta,
            BorderColor: themeGlobal.color.alpha,
          }

        },
        Buttonsignup: {
          FontSize: '15px',
          FontWeight: '600',
          LineHeight: '18px',
          PaddingY: '10px',
          PaddingX: '14px',
          Background: 'transparent',
          BorderColor: themeGlobal.color.alpha,
          BorderRadius: '4px',
          Color: themeGlobal.color.alpha,
          Hover: {
            Background: themeGlobal.color.universal,
            Color: themeGlobal.color.beta,
            BorderColor: themeGlobal.color.alpha,
          },
          Active: {
            Background: themeGlobal.color.universal,
            Color: themeGlobal.color.beta,
            BorderColor: themeGlobal.color.alpha,
          }
        }
      },
      NavMenuWrapper: {
        Background: themeGlobal.color.alpha,
        NavMenuCustom: {
          MenuGap: '28px',
          FontWeight: '500',
          FontSize: '16px',
          LineHeight: '1.24',
          Color: themeGlobal.color.universal,
          Hover: {
            Color: themeGlobal.color.beta,
          },
          NavMenuScrollIcon: {
            BorderColor: themeGlobal.color.universal,
            Hover: {
              BorderColor: themeGlobal.color.beta,
            }
          }
        }
      }
    },
    Footer: {
      component: 'Vespertine_Footer',
      Background: themeGlobal.color.alpha,
      Logo: {
        Background: "#fff",
        Width: `80px`,
        Height: "80px",
        BorderRadius: "50%",
        PaddingX: "10px",
        PaddingY: "10px",
      },
      h4: {
        FontWeight: themeGlobal.typography.h4.FontWeight,
        FontSize: themeGlobal.typography.h4.FontSize,
        LineHeight: themeGlobal.typography.h4.LineHeight,
        Color: themeGlobal.color.universal,
      },
      h5: {
        FontWeight: themeGlobal.typography.h5.FontWeight,
        FontSize: themeGlobal.typography.h5.FontSize,
        LineHeight: themeGlobal.typography.h5.LineHeight,
        Color: themeGlobal.color.universal,
      },
      h6: {
        FontWeight: themeGlobal.typography.h6.FontWeight,
        FontSize: themeGlobal.typography.h6.FontSize,
        LineHeight: themeGlobal.typography.h6.LineHeight,
        TextTransform: `uppercase`,
        Color: themeGlobal.color.universal,
      },
      a: {
        FontWeight: themeGlobal.typography.anchor.FontWeight,
        FontSize: themeGlobal.typography.anchor.FontSize,
        LineHeight: themeGlobal.typography.anchor.LineHeight,
        Color: themeGlobal.color.universal,
        Hover: {
          Color: themeGlobal.color.beta,
        }
      },
      MapContainer: {
        Height: `300px`
      },
      SocialMediaIconListItem: {
        Width: `48px`,
        Height: `48px`,
      },
      CopyrightSectionItem: {
        FontWeight: `400`,
        FontSize: `10px`,
        LineHeight: `15px`,
        Color: themeGlobal.color.universal,
      }
    },
    Banner: {
      a: {
        FontWeight: themeGlobal.typography.anchor.FontWeight,
        FontSize: themeGlobal.typography.anchor.FontSize,
        LineHeight: themeGlobal.typography.anchor.LineHeight,
        Background: themeGlobal.color.alpha,
        BorderColor: themeGlobal.color.alpha,
        BorderRadius: `4px`,
        Color: themeGlobal.color.universal,
        PaddingY: `10px`,
        PaddingX: `40px`,
        Hover: {
          Background: themeGlobal.color.alpha,
          BorderColor: themeGlobal.color.alpha,
          Color: themeGlobal.color.beta,
        }
      },
      h1: {
        FontWeight: themeGlobal.typography.h1.FontWeight,
        FontSize: themeGlobal.typography.h1.FontSize,
        LineHeight: themeGlobal.typography.h1.LineHeight,
        Color: themeGlobal.color.alpha,
      },
      h3: {
        FontWeight: themeGlobal.typography.h3.FontWeight,
        FontSize: themeGlobal.typography.h3.FontSize,
        LineHeight: themeGlobal.typography.h3.LineHeight,
        Color: themeGlobal.color.alphaSemiLight,
      },
      Background: `#000`,
      Dots: {
        Color: themeGlobal.color.alpha,
        Active: {
          Color: themeGlobal.color.universal,
        }
      },
      SliderImage: {
        Height: `100%`,
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
          Color: themeGlobal.color.alpha,
          Alignment: `center`,
        },
        h3: {
          FontWeight: themeGlobal.typography.h3.FontWeight,
          FontSize: themeGlobal.typography.h3.FontSize,
          LineHeight: themeGlobal.typography.h3.LineHeight,
          Color: themeGlobal.color.alphaSemiLight,
          Alignment: `center`,
        },
        p: {
          FontWeight: themeGlobal.typography.regular.FontWeight,
          FontSize: themeGlobal.typography.regular.FontSize,
          LineHeight: themeGlobal.typography.regular.LineHeight,
          Color: themeGlobal.color.base,
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
          Background: themeGlobal.color.alpha,
          BorderColor: themeGlobal.color.alpha,
          BorderRadius: `4px`,
          Color: themeGlobal.color.universal,
          PaddingY: `10px`,
          PaddingX: `40px`,
          Hover: {
            Background: themeGlobal.color.alpha,
            BorderColor: themeGlobal.color.alpha,
            Color: themeGlobal.color.beta,
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
          Color: themeGlobal.color.alpha,
        },
        h3: {
          FontWeight: themeGlobal.typography.h3.FontWeight,
          FontSize: themeGlobal.typography.h3.FontSize,
          LineHeight: themeGlobal.typography.h3.LineHeight,
          Color: themeGlobal.color.alphaSemiLight,
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
          Color: themeGlobal.color.base,
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
            Color: themeGlobal.color.alpha,
          },
          h3: {
            FontWeight: themeGlobal.typography.h3.FontWeight,
            FontSize: themeGlobal.typography.h3.FontSize,
            LineHeight: themeGlobal.typography.h3.LineHeight,
            Color: themeGlobal.color.alphaSemiLight,

          },
          h4: {
            FontWeight: themeGlobal.typography.h4.FontWeight,
            FontSize: themeGlobal.typography.h4.FontSize,
            LineHeight: themeGlobal.typography.h4.LineHeight,
            Color: themeGlobal.color.alpha,
          },
          h5: {
            FontWeight: themeGlobal.typography.h5.FontWeight,
            FontSize: themeGlobal.typography.h5.FontSize,
            LineHeight: themeGlobal.typography.h5.LineHeight,
            Color: themeGlobal.color.alphaSemiLight,
          },
          p: {
            FontWeight: themeGlobal.typography.regular.FontWeight,
            FontSize: themeGlobal.typography.regular.FontSize,
            LineHeight: themeGlobal.typography.regular.LineHeight,
            Color: themeGlobal.color.base,
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
            Color: themeGlobal.color.alpha,
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
            Color: themeGlobal.color.base,
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
            Color: themeGlobal.color.alpha,
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
            Color: themeGlobal.color.base,
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
          Color: themeGlobal.color.alpha,
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
          Color: themeGlobal.color.alpha,
        },
        h5: {
          FontWeight: themeGlobal.typography.h5.FontWeight,
          FontSize: themeGlobal.typography.h5.FontSize,
          LineHeight: themeGlobal.typography.h5.LineHeight,
          Color: themeGlobal.color.alphaSemiLight,
        },
        p: {
          FontWeight: themeGlobal.typography.regular.FontWeight,
          FontSize: themeGlobal.typography.regular.FontSize,
          LineHeight: themeGlobal.typography.regular.LineHeight,
          Color: themeGlobal.color.alpha,
          PaddingTop: `24px`,
        },
        PrincipalProfileImage: {
          Width: `200px`,
          Height: `200px`,
          BorderRadius: `50%`,
          MarginBottom: `24px`,
        }
      }
    },
    Team: {
      TeamHero: {
        h2: {
          FontWeight: themeGlobal.typography.h2.FontWeight,
          FontSize: themeGlobal.typography.h2.FontSize,
          LineHeight: themeGlobal.typography.h2.LineHeight,
          Alignment: `center`,
          Color: themeGlobal.color.alpha,
        },
        h3: {
          FontWeight: themeGlobal.typography.h3.FontWeight,
          FontSize: themeGlobal.typography.h3.FontSize,
          LineHeight: themeGlobal.typography.h3.LineHeight,
          Alignment: `center`,
          Color: themeGlobal.color.alphaSemiLight,
        },
        h4: {
          FontWeight: themeGlobal.typography.h4.FontWeight,
          FontSize: themeGlobal.typography.h4.FontSize,
          LineHeight: themeGlobal.typography.h4.LineHeight,
          Color: themeGlobal.color.alpha,
          MarginBottom: `10px`,
        },
        h5: {
          FontWeight: themeGlobal.typography.h5.FontWeight,
          FontSize: themeGlobal.typography.h5.FontSize,
          LineHeight: themeGlobal.typography.h5.LineHeight,
          Color: themeGlobal.color.alphaSemiLight,
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
          Background: themeGlobal.color.alpha,
          BorderColor: themeGlobal.color.alpha,
          BorderRadius: `4px`,
          Color: themeGlobal.color.universal,
          PaddingY: `10px`,
          PaddingX: `40px`,
          MarginTop: `48px`,
          Hover: {
            Background: themeGlobal.color.alpha,
            BorderColor: themeGlobal.color.alpha,
            Color: themeGlobal.color.beta,
          }
        }
      },
      TeamPage: {
        h2: {
          FontWeight: themeGlobal.typography.h2.FontWeight,
          FontSize: themeGlobal.typography.h2.FontSize,
          LineHeight: themeGlobal.typography.h2.LineHeight,
          Alignment: `center`,
          Color: themeGlobal.color.alpha,
        },
        h3: {
          FontWeight: themeGlobal.typography.h3.FontWeight,
          FontSize: themeGlobal.typography.h3.FontSize,
          LineHeight: themeGlobal.typography.h3.LineHeight,
          Alignment: `center`,
          Color: themeGlobal.color.alphaSemiLight,
        },
        h4: {
          FontWeight: themeGlobal.typography.h4.FontWeight,
          FontSize: themeGlobal.typography.h4.FontSize,
          LineHeight: themeGlobal.typography.h4.LineHeight,
          Color: themeGlobal.color.alpha,
          MarginBottom: `10px`,
        },
        h5: {
          FontWeight: themeGlobal.typography.h5.FontWeight,
          FontSize: themeGlobal.typography.h5.FontSize,
          LineHeight: themeGlobal.typography.h5.LineHeight,
          Color: themeGlobal.color.alphaSemiLight,
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
          Alignment: `center`,
          Color: themeGlobal.color.alpha,
        },
        h3: {
          FontWeight: themeGlobal.typography.h3.FontWeight,
          FontSize: themeGlobal.typography.h3.FontSize,
          LineHeight: themeGlobal.typography.h3.LineHeight,
          Alignment: `center`,
          Color: themeGlobal.color.alphaSemiLight,
        },
        h4: {
          FontWeight: themeGlobal.typography.h4.FontWeight,
          FontSize: themeGlobal.typography.h4.FontSize,
          LineHeight: themeGlobal.typography.h4.LineHeight,
          Color: themeGlobal.color.alpha,
        },
        p: {
          FontWeight: themeGlobal.typography.regular.FontWeight,
          FontSize: themeGlobal.typography.regular.FontSize,
          LineHeight: themeGlobal.typography.regular.LineHeight,
          Color: themeGlobal.color.alphaSemiLight,
          MarginTop: `20px`,
        },
        a: {
          FontWeight: themeGlobal.typography.anchor.FontWeight,
          FontSize: themeGlobal.typography.anchor.FontSize,
          LineHeight: themeGlobal.typography.anchor.LineHeight,
          Background: themeGlobal.color.alpha,
          BorderColor: themeGlobal.color.alpha,
          BorderRadius: `4px`,
          Color: themeGlobal.color.universal,
          PaddingY: `10px`,
          PaddingX: `40px`,
          MarginTop: `48px`,
          Hover: {
            Background: themeGlobal.color.alpha,
            BorderColor: themeGlobal.color.alpha,
            Color: themeGlobal.color.beta,
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
          Alignment: `center`,
          Color: themeGlobal.color.alpha,
        },
        h4: {
          FontWeight: themeGlobal.typography.h4.FontWeight,
          FontSize: themeGlobal.typography.h4.FontSize,
          LineHeight: themeGlobal.typography.h4.LineHeight,
          Alignment: `left`,
          Color: themeGlobal.color.alpha,

        },
        li: {
          FontWeight: `400`,
          FontSize: `16px`,
          LineHeight: `28px`,
          Alignment: `left`,
          Color: themeGlobal.color.alpha,
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
          Alignment: `center`,
          Color: themeGlobal.color.alpha,
        },
        h3: {
          FontWeight: themeGlobal.typography.h3.FontWeight,
          FontSize: themeGlobal.typography.h3.FontSize,
          LineHeight: themeGlobal.typography.h3.LineHeight,
          Alignment: `center`,
          Color: themeGlobal.color.alphaSemiLight,
        },
        ViewMoreSneekPeakButton: {
          FontWeight: `400`,
          FontSize: `18px`,
          LineHeight: `24px`,
          Background: themeGlobal.color.alpha,
          BorderColor: themeGlobal.color.alpha,
          BorderRadius: `4px`,
          Color: themeGlobal.color.universal,
          PaddingY: `10px`,
          PaddingX: `40px`,
          MarginTop: `48px`,
          Hover: {
            Background: themeGlobal.color.alpha,
            BorderColor: themeGlobal.color.alpha,
            Color: themeGlobal.color.beta,
          }
        }
      },
      GalleryPage: {
        h2: {
          FontWeight: themeGlobal.typography.h2.FontWeight,
          FontSize: themeGlobal.typography.h2.FontSize,
          LineHeight: themeGlobal.typography.h2.LineHeight,
          Alignment: `center`,
          Color: themeGlobal.color.alpha,
        },
        h4: {
          FontWeight: themeGlobal.typography.h4.FontWeight,
          FontSize: themeGlobal.typography.h4.FontSize,
          LineHeight: themeGlobal.typography.h4.LineHeight,
          Color: themeGlobal.color.universal,
        }
      },
      GalleryListSection: {
        h2: {
          FontWeight: themeGlobal.typography.h2.FontWeight,
          FontSize: themeGlobal.typography.h2.FontSize,
          LineHeight: themeGlobal.typography.h2.LineHeight,
          Alignment: `center`,
          Color: themeGlobal.color.alpha,
        },
        h4: {
          FontWeight: themeGlobal.typography.h4.FontWeight,
          FontSize: themeGlobal.typography.h4.FontSize,
          LineHeight: themeGlobal.typography.h4.LineHeight,
          Color: themeGlobal.color.universal,
        },
        GalleryListFilter: {
          MarginBottom: `40px`,
        },
        GalleryListFilterButton: {
          FontWeight: `500`,
          FontSize: `15px`,
          LineHeight: `18px`,
          Background: themeGlobal.color.universal,
          BorderColor: themeGlobal.color.alpha,
          BorderRadius: `4px`,
          Color: themeGlobal.color.alpha,
          PaddingY: `8px`,
          PaddingX: `24px`,
          Hover: {
            Background: themeGlobal.color.alpha,
            BorderColor: themeGlobal.color.alpha,
            Color: themeGlobal.color.beta,
          },
          Active: {
            Background: themeGlobal.color.alpha,
            BorderColor: themeGlobal.color.alpha,
            Color: themeGlobal.color.beta,
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
          Color: themeGlobal.color.alpha,
        },
        h3: {
          FontWeight: themeGlobal.typography.h3.FontWeight,
          FontSize: themeGlobal.typography.h3.FontSize,
          LineHeight: themeGlobal.typography.h3.LineHeight,
          Color: themeGlobal.color.alphaSemiLight,
        },
        p: {
          FontWeight: themeGlobal.typography.regular.FontWeight,
          FontSize: themeGlobal.typography.regular.FontSize,
          LineHeight: themeGlobal.typography.regular.LineHeight,
          Color: themeGlobal.color.alpha,
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
            Background: themeGlobal.color.alpha,
            BorderColor: themeGlobal.color.alpha,
            BorderRadius: `4px`,
            Color: themeGlobal.color.universal,
            PaddingY: `10px`,
            PaddingX: `40px`,
            Hover: {
              Background: themeGlobal.color.alpha,
              BorderColor: themeGlobal.color.alpha,
              Color: themeGlobal.color.beta,
            }
          }
        }
      },
      ContactPage: {
        h2: {
          FontWeight: themeGlobal.typography.h2.FontWeight,
          FontSize: themeGlobal.typography.h2.FontSize,
          LineHeight: themeGlobal.typography.h2.LineHeight,
          Color: themeGlobal.color.alpha,
        },
        h3: {
          FontWeight: themeGlobal.typography.h3.FontWeight,
          FontSize: themeGlobal.typography.h3.FontSize,
          LineHeight: themeGlobal.typography.h3.LineHeight,
          Color: themeGlobal.color.alpha,
          BorderBottom: {
            BorderWidth: `2px`,
            Background: themeGlobal.color.alphaSemiLight,
            BottomSpace: `-8px`,
          }
        },
        h6: {
          FontWeight: themeGlobal.typography.h6.FontWeight,
          FontSize: themeGlobal.typography.h6.FontSize,
          LineHeight: themeGlobal.typography.h6.LineHeight,
          Color: themeGlobal.color.alpha,
        },
        a: {
          FontWeight: themeGlobal.typography.anchor.FontWeight,
          FontSize: themeGlobal.typography.anchor.FontSize,
          LineHeight: themeGlobal.typography.anchor.LineHeight,
          Color: themeGlobal.color.alpha,
        },
        p: {
          FontWeight: themeGlobal.typography.regular.FontWeight,
          FontSize: themeGlobal.typography.regular.FontSize,
          LineHeight: themeGlobal.typography.regular.LineHeight,
          Color: themeGlobal.color.alpha,
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
          Color: themeGlobal.color.alpha,
        },
        h4: {
          FontWeight: themeGlobal.typography.h4.FontWeight,
          FontSize: themeGlobal.typography.h4.FontSize,
          LineHeight: themeGlobal.typography.h4.LineHeight,
          Color: themeGlobal.color.alpha,
        },
        h5: {
          FontWeight: themeGlobal.typography.h5.FontWeight,
          FontSize: themeGlobal.typography.h5.FontSize,
          LineHeight: themeGlobal.typography.h5.LineHeight,
          Color: themeGlobal.color.alphaSemiLight,
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
          Background: themeGlobal.color.alpha,
          BorderColor: themeGlobal.color.alpha,
          BorderRadius: `4px`,
          Color: themeGlobal.color.universal,
          PaddingY: `10px`,
          PaddingX: `40px`,
          Hover: {
            Background: themeGlobal.color.alpha,
            BorderColor: themeGlobal.color.alpha,
            Color: themeGlobal.color.beta,
          }
        },
        ViewMoreAdmissionHeroSection: {
          Alignment: `left`
        }
      },
      AdmissionPageSection: {
        h2: {
          FontWeight: themeGlobal.typography.h2.FontWeight,
          FontSize: themeGlobal.typography.h2.FontSize,
          LineHeight: themeGlobal.typography.h2.LineHeight,
          Color: themeGlobal.color.alpha,
        },
        h6: {
          FontWeight: themeGlobal.typography.h6.FontWeight,
          FontSize: themeGlobal.typography.h6.FontSize,
          LineHeight: themeGlobal.typography.h6.LineHeight,
          Color: themeGlobal.color.universal,
        },
        p: {
          FontWeight: themeGlobal.typography.regular.FontWeight,
          FontSize: themeGlobal.typography.regular.FontSize,
          LineHeight: themeGlobal.typography.regular.LineHeight,
          Color: themeGlobal.color.universal,
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
          Background: themeGlobal.color.beta,
          BorderColor: themeGlobal.color.beta,
          BorderRadius: `4px`,
          Color: themeGlobal.color.alpha,
          PaddingY: `10px`,
          PaddingX: `40px`,
          Hover: {
            Background: themeGlobal.color.alpha,
            BorderColor: themeGlobal.color.alpha,
            Color: themeGlobal.color.beta,
          }
        },
        OverlayViewButton: {
          FontWeight: `400`,
          FontSize: `15px`,
          LineHeight: `18px`,
          Background: themeGlobal.color.alphaLight,
          BorderColor: themeGlobal.color.alphaLight,
          BorderRadius: `4px`,
          Color: themeGlobal.color.alpha,
          PaddingY: `10px`,
          PaddingX: `40px`,
          Hover: {
            Background: themeGlobal.color.beta,
            BorderColor: themeGlobal.color.beta,
            Color: themeGlobal.color.alpha,
          }
        },
        ViewDetailAdmissionModalBody: {
          h6: {
            FontWeight: themeGlobal.typography.h6.FontWeight,
            FontSize: themeGlobal.typography.h6.FontSize,
            LineHeight: themeGlobal.typography.h6.LineHeight,
            Color: themeGlobal.color.alpha,
            Alignment: "left"
          },
          p: {
            FontWeight: themeGlobal.typography.regular.FontWeight,
            FontSize: themeGlobal.typography.regular.FontSize,
            LineHeight: themeGlobal.typography.regular.LineHeight,
            Color: themeGlobal.color.alpha,
            Alignment: "left"
          },
          ApplyNowButton: {
            FontWeight: `500`,
            FontSize: `14px`,
            LineHeight: `24px`,
            Background: themeGlobal.color.alpha,
            BorderColor: themeGlobal.color.alpha,
            BorderRadius: `4px`,
            Color: themeGlobal.color.universal,
            PaddingY: `6px`,
            PaddingX: `24px`,
            Alignment: "center",
            LetterSpacing: "0.2px",
            Hover: {
              Background: themeGlobal.color.alpha,
              BorderColor: themeGlobal.color.alpha,
              Color: themeGlobal.color.beta,
            }
          },
          DownloadFeeStructureButton: {
            FontWeight: `500`,
            FontSize: `14px`,
            LineHeight: `24px`,
            Background: themeGlobal.color.universal,
            BorderColor: themeGlobal.color.alpha,
            BorderRadius: `4px`,
            Color: themeGlobal.color.alpha,
            PaddingY: `6px`,
            PaddingX: `24px`,
            Alignment: "center",
            LetterSpacing: "0.2px",
            Hover: {
              Background: themeGlobal.color.alpha,
              BorderColor: themeGlobal.color.alpha,
              Color: themeGlobal.color.universal,
            }
          },
          DownloadBrochureButton: {
            FontWeight: `500`,
            FontSize: `14px`,
            LineHeight: `24px`,
            Background: themeGlobal.color.universal,
            BorderColor: themeGlobal.color.alpha,
            BorderRadius: `4px`,
            Color: themeGlobal.color.alpha,
            PaddingY: `6px`,
            PaddingX: `24px`,
            Alignment: "center",
            LetterSpacing: "0.2px",
            Hover: {
              Background: themeGlobal.color.alpha,
              BorderColor: themeGlobal.color.alpha,
              Color: themeGlobal.color.universal,
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
          Color: themeGlobal.color.alpha,
        },
        h6: {
          FontWeight: themeGlobal.typography.h6.FontWeight,
          FontSize: themeGlobal.typography.h6.FontSize,
          LineHeight: themeGlobal.typography.h6.LineHeight,
          Color: themeGlobal.color.base,
        },
        FeeStructureHomeHeroHead: {
          MarginBottom: `40px`,
          Alignment: `center`,
        },
        ViewMoreFeeStructureHeroButton: {
          FontWeight: `400`,
          FontSize: `18px`,
          LineHeight: `24px`,
          Background: themeGlobal.color.alpha,
          BorderColor: themeGlobal.color.alpha,
          BorderRadius: `4px`,
          Color: themeGlobal.color.universal,
          PaddingY: `10px`,
          PaddingX: `40px`,
          Hover: {
            Background: themeGlobal.color.alpha,
            BorderColor: themeGlobal.color.alpha,
            Color: themeGlobal.color.beta,
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
          Color: themeGlobal.color.alpha,
        },
        h4: {
          FontWeight: themeGlobal.typography.h4.FontWeight,
          FontSize: themeGlobal.typography.h4.FontSize,
          LineHeight: themeGlobal.typography.h4.LineHeight,
          Color: themeGlobal.color.alpha,
          MarginBottom: `10px`,
          Alignment: "center"
        },
        p: {
          FontWeight: themeGlobal.typography.regular.FontWeight,
          FontSize: themeGlobal.typography.regular.FontSize,
          LineHeight: themeGlobal.typography.regular.LineHeight,
          Color: themeGlobal.color.alphaSemiLight,
          Alignment: "center"
        },
        FeeStructureListCard: {
          Alignment: `center`,
        },
        ViewFeeStructureButton: {
          FontWeight: `500`,
          FontSize: `19px`,
          LineHeight: `34px`,
          Background: themeGlobal.color.universal,
          BorderColor: themeGlobal.color.universal,
          BorderRadius: `4px`,
          Color: themeGlobal.color.alpha,
          PaddingY: `0`,
          PaddingX: `0`,
          Alignment: "center",
          Hover: {
            Background: themeGlobal.color.universal,
            BorderColor: themeGlobal.color.universal,
            Color: themeGlobal.color.alphaSemiLight,
          }
        },
        FeeStructureModalBody: {
          h4: {
            FontWeight: themeGlobal.typography.h4.FontWeight,
            FontSize: themeGlobal.typography.h4.FontSize,
            LineHeight: themeGlobal.typography.h4.LineHeight,
            Color: themeGlobal.color.alpha,
            Alignment: "left"
          },
          h5: {
            FontWeight: themeGlobal.typography.h5.FontWeight,
            FontSize: themeGlobal.typography.h5.FontSize,
            LineHeight: themeGlobal.typography.h5.LineHeight,
            Color: themeGlobal.color.alpha,
            Alignment: "left"
          },
          h6: {
            FontWeight: themeGlobal.typography.h6.FontWeight,
            FontSize: themeGlobal.typography.h6.FontSize,
            LineHeight: themeGlobal.typography.h6.LineHeight,
            Color: themeGlobal.color.alpha,
            Alignment: "left"
          },
          p: {
            FontWeight: themeGlobal.typography.regular.FontWeight,
            FontSize: themeGlobal.typography.regular.FontSize,
            LineHeight: themeGlobal.typography.regular.LineHeight,
            Color: themeGlobal.color.alpha,
            Alignment: "left"
          },
          DownloadFileButton: {
            FontWeight: `500`,
            FontSize: `14px`,
            LineHeight: `24px`,
            Background: themeGlobal.color.alpha,
            BorderColor: themeGlobal.color.alpha,
            BorderRadius: `4px`,
            Color: themeGlobal.color.universal,
            PaddingY: `6px`,
            PaddingX: `24px`,
            Alignment: "center",
            LetterSpacing: "0.2px",
            Hover: {
              Background: themeGlobal.color.alpha,
              BorderColor: themeGlobal.color.alpha,
              Color: themeGlobal.color.beta,
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
          Color: themeGlobal.color.alpha,
        },
        h6: {
          FontWeight: themeGlobal.typography.h6.FontWeight,
          FontSize: themeGlobal.typography.h6.FontSize,
          LineHeight: themeGlobal.typography.h6.LineHeight,
          Color: themeGlobal.color.alpha,
        },
        p: {
          FontWeight: themeGlobal.typography.regular.FontWeight,
          FontSize: themeGlobal.typography.regular.FontSize,
          LineHeight: themeGlobal.typography.regular.LineHeight,
          Color: themeGlobal.color.alpha,
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
          Background: themeGlobal.color.alpha,
          BorderColor: themeGlobal.color.alpha,
          BorderRadius: `4px`,
          Color: themeGlobal.color.universal,
          PaddingY: `10px`,
          PaddingX: `40px`,
          Hover: {
            Background: themeGlobal.color.alpha,
            BorderColor: themeGlobal.color.alpha,
            Color: themeGlobal.color.beta,
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
          Color: themeGlobal.color.alpha,
        },
        h6: {
          FontWeight: themeGlobal.typography.h6.FontWeight,
          FontSize: themeGlobal.typography.h6.FontSize,
          LineHeight: themeGlobal.typography.h6.LineHeight,
          Color: themeGlobal.color.alpha,
        },
        p: {
          FontWeight: themeGlobal.typography.regular.FontWeight,
          FontSize: themeGlobal.typography.regular.FontSize,
          LineHeight: themeGlobal.typography.regular.LineHeight,
          Color: themeGlobal.color.alpha,
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
          Color: themeGlobal.color.alpha,
        },
        h6: {
          FontWeight: themeGlobal.typography.h6.FontWeight,
          FontSize: themeGlobal.typography.h6.FontSize,
          LineHeight: themeGlobal.typography.h6.LineHeight,
          Color: themeGlobal.color.universal,
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
          Background: themeGlobal.color.alpha,
          BorderColor: themeGlobal.color.alpha,
          BorderRadius: `4px`,
          Color: themeGlobal.color.universal,
          PaddingY: `10px`,
          PaddingX: `40px`,
          Hover: {
            Background: themeGlobal.color.alpha,
            BorderColor: themeGlobal.color.alpha,
            Color: themeGlobal.color.beta,
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
          Color: themeGlobal.color.alpha,
        },
        h6: {
          FontWeight: themeGlobal.typography.h6.FontWeight,
          FontSize: themeGlobal.typography.h6.FontSize,
          LineHeight: themeGlobal.typography.h6.LineHeight,
          Color: themeGlobal.color.universal,
        },
        p: {
          FontWeight: themeGlobal.typography.regular.FontWeight,
          FontSize: themeGlobal.typography.regular.FontSize,
          LineHeight: themeGlobal.typography.regular.LineHeight,
          Color: themeGlobal.color.universal,
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
          Background: themeGlobal.color.beta,
          BorderColor: themeGlobal.color.beta,
          BorderRadius: `4px`,
          Color: themeGlobal.color.alpha,
          PaddingY: `10px`,
          PaddingX: `40px`,
          Hover: {
            Background: themeGlobal.color.alpha,
            BorderColor: themeGlobal.color.alpha,
            Color: themeGlobal.color.beta,
          }
        },
        OverlayViewButton: {
          FontWeight: `400`,
          FontSize: `15px`,
          LineHeight: `18px`,
          Background: themeGlobal.color.beta,
          BorderColor: themeGlobal.color.beta,
          BorderRadius: `4px`,
          Color: themeGlobal.color.alpha,
          PaddingY: `10px`,
          PaddingX: `40px`,
          Hover: {
            Background: themeGlobal.color.alpha,
            BorderColor: themeGlobal.color.alpha,
            Color: themeGlobal.color.beta,
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
          Color: themeGlobal.color.alpha,
        },
        h6: {
          FontWeight: themeGlobal.typography.h6.FontWeight,
          FontSize: themeGlobal.typography.h6.FontSize,
          LineHeight: themeGlobal.typography.h6.LineHeight,
          Color: themeGlobal.color.universal,
        },
        p: {
          FontWeight: themeGlobal.typography.regular.FontWeight,
          FontSize: themeGlobal.typography.regular.FontSize,
          LineHeight: themeGlobal.typography.regular.LineHeight,
          Color: themeGlobal.color.universal,
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
          Background: themeGlobal.color.beta,
          BorderColor: themeGlobal.color.beta,
          BorderRadius: `4px`,
          Color: themeGlobal.color.alpha,
          PaddingY: `10px`,
          PaddingX: `40px`,
          Hover: {
            Background: themeGlobal.color.alpha,
            BorderColor: themeGlobal.color.alpha,
            Color: themeGlobal.color.beta,
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