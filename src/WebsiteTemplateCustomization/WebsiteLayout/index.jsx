import React, { useEffect, useState } from "react";
import SectionHeader from '../SectionImports/SectionHeader'
import SectionFooter from '../SectionImports/SectionFooter'
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../CommonComponent/global.styled";
import { useDispatch, useSelector } from "react-redux";
import { getWebsiteDomainTemplate } from "../../store/actions/WebsiteTemplate";
import AppLinkUrl from "../../Common/AppLink/AppLinkUrl";
import ComponentLoader from "../../Common/Loader/ComponentLoader";
import Error404 from "../../Common/Error404";
import styled from 'styled-components';
import Headroom from 'react-headroom';
import { useLocation } from "react-router-dom";

const SectionBodyCustom = styled.div`
min-height: ;
`;

const WebsiteLayout = ({ children }) => {

  // const themeGlobal = {
  //   color: {
  //     alpha: `#343F64`,
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
  //     },
  //     h2: {
  //       FontSize: `32px`,
  //       FontWeight: `700`,
  //       LineHeight: `42px`,
  //     },
  //     h3: {
  //       FontSize: `18px`,
  //       FontWeight: `500`,
  //       LineHeight: `24px`,
  //     },
  //     h4: {
  //       FontSize: `20px`,
  //       FontWeight: `700`,
  //       LineHeight: `30px`,
  //     },
  //     h5: {
  //       FontSize: `16px`,
  //       FontWeight: `500`,
  //       LineHeight: `20px`,
  //     },
  //     h6: {
  //       FontSize: `18px`,
  //       FontWeight: `600`,
  //       LineHeight: `24px`,
  //     },
  //     regular: {
  //       FontSize: `16px`,
  //       FontWeight: `400`,
  //       LineHeight: `28px`,
  //     },
  //     anchor: {
  //       FontWeight: '500',
  //       FontSize: '16px',
  //       LineHeight: '1.24',
  //     },
  //   }

  // }
  // const theme = {
  //   Header: {
  //     component: "Vespertine_Header",
  //     Logo: {
  //       Width: '86px',
  //       Height: '86px',
  //     },
  //     h4: {
  //       FontWeight: `20px`,
  //       FontSize: `20px`,
  //       LineHeight: `30px`,
  //       Color: `#343F64`,
  //       TextTransform: 'uppercase',
  //     },
  //     h5: {
  //       FontWeight: `500`,
  //       FontSize: `16px`,
  //       LineHeight: `20px`,
  //       Color: `#4E616B`,
  //     },
  //     NavAuth: {
  //       ButtonLogin: {
  //         FontSize: '15px',
  //         FontWeight: '600',
  //         LineHeight: '18px',
  //         PaddingY: '10px',
  //         PaddingX: '14px',
  //         Background: `#343F64`,
  //         BorderColor: `#343F64`,
  //         BorderRadius: '4px',
  //         Color: '#fff',
  //         Hover: {
  //           Background: `#343F64`,
  //           Color: `#E9DB89`,
  //           BorderColor: `#343F64`,
  //         },
  //         Active: {
  //           Background: `#343F64`,
  //           Color: `#E9DB89`,
  //           BorderColor: `#343F64`,
  //         }

  //       },
  //       Buttonsignup: {
  //         FontSize: '15px',
  //         FontWeight: '600',
  //         LineHeight: '18px',
  //         PaddingY: '10px',
  //         PaddingX: '14px',
  //         Background: 'transparent',
  //         BorderColor: `#343F64`,
  //         BorderRadius: '4px',
  //         Color: `#343F64`,
  //         Hover: {
  //           Background: `#fff`,
  //           Color: `#E9DB89`,
  //           BorderColor: `#343F64`,
  //         },
  //         Active: {
  //           Background: `#fff`,
  //           Color: `#E9DB89`,
  //           BorderColor: `#343F64`,
  //         }
  //       }
  //     },
  //     NavMenuWrapper: {
  //       Background: `#343F64`,
  //       NavMenuCustom: {
  //         MenuGap: '28px',
  //         FontWeight: '500',
  //         FontSize: '16px',
  //         LineHeight: '1.24',
  //         Color: `#fff`,
  //         Hover: {
  //           Color: `#E9DB89`,
  //         },
  //         NavMenuScrollIcon: {
  //           BorderColor: `#fff`,
  //           Hover: {
  //             BorderColor: `#E9DB89`,
  //           }
  //         }
  //       }
  //     }
  //   },
  //   Footer: {
  //     component: 'Vespertine_Footer',
  //     Background: `#343F64`,
  //     Logo: {
  //       Background: "#fff",
  //       Width: `80px`,
  //       Height: "80px",
  //       BorderRadius: "50%",
  //       PaddingX: "10px",
  //       PaddingY: "10px",
  //     },
  //     h4: {
  //       FontWeight: `20px`,
  //       FontSize: `20px`,
  //       LineHeight: `30px`,
  //       Color: `#fff`,
  //     },
  //     h5: {
  //       FontWeight: `500`,
  //       FontSize: `16px`,
  //       LineHeight: `20px`,
  //       Color: `#fff`,
  //     },
  //     h6: {
  //       FontWeight: `600`,
  //       FontSize: `18px`,
  //       LineHeight: `24px`,
  //       TextTransform: `uppercase`,
  //       Color: `#fff`,
  //     },
  //     a: {
  //       FontWeight: '500',
  //       FontSize: '16px',
  //       LineHeight: '1.24',
  //       Color: `#FFFFFF`,
  //       Hover: {
  //         Color: `#E9DB89`,
  //       }
  //     },
  //     MapContainer: {
  //       Height: `300px`
  //     },
  //     SocialMediaIconListItem: {
  //       Width: `48px`,
  //       Height: `48px`,
  //     },
  //     CopyrightSectionItem: {
  //       FontWeight: `400`,
  //       FontSize: `10px`,
  //       LineHeight: `15px`,
  //       Color: `#fff`,
  //     }
  //   },
  //   Banner: {
  //     a: {
  //       FontWeight: `400`,
  //       FontSize: `18px`,
  //       LineHeight: `24px`,
  //       Background: `#343F64`,
  //       BorderColor: `#343F64`,
  //       BorderRadius: `4px`,
  //       Color: `#ffffff`,
  //       PaddingY: `10px`,
  //       PaddingX: `40px`,
  //       Hover: {
  //         Background: `#343F64`,
  //         BorderColor: `#343F64`,
  //         Color: `#E9DB89`,
  //       }
  //     },
  //     h1: {
  //       FontWeight: `700`,
  //       FontSize: `56px`,
  //       LineHeight: `68px`,
  //       Color: `#343F64`,
  //     },
  //     h3: {
  //       FontWeight: `500`,
  //       FontSize: `18px`,
  //       LineHeight: `24px`,
  //       Color: `#4E616B`,
  //     },
  //     Background: `#000`,
  //     Dots: {
  //       Color: `#343F64`,
  //       Active: {
  //         Color: `#fff`,
  //       }
  //     },
  //     SliderImage: {
  //       Height: `576px`,
  //     },
  //     SlickArrowColor: {
  //       Color: `#fff`,
  //       Hover: {
  //         Color: `#E9DB89`,
  //       }
  //     },
  //     BannerOverlay: {
  //       Top: `171px`,
  //       width: `510px`,
  //       Background: `#EBECF0`,
  //       Padding: `36px`,
  //       BorderRadius: `0`,
  //     },
  //   },
  //   AboutUs: {
  //     AboutUsHero: {
  //       h2: {
  //         FontWeight: `700`,
  //         FontSize: `32px`,
  //         LineHeight: `42px`,
  //         Color: `#343F64`,
  //       },
  //       h3: {
  //         FontWeight: `500`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Color: `#4E616B`,
  //       },
  //       p: {
  //         FontWeight: `400`,
  //         FontSize: `16px`,
  //         LineHeight: `28px`,
  //         Color: `#202020`,
  //       },
  //       SectionHead: {
  //         MarginBottom: `40px`,
  //         Alignment: `center`,
  //       },
  //       BorderBottom: {
  //         BorderWidth: `2px`,
  //         Background: `#343F64`,
  //         BottomSpace: `-8px`,
  //       },
  //       ViewMoreButton: {
  //         FontWeight: `400`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Background: `#343F64`,
  //         BorderColor: `#343F64`,
  //         BorderRadius: `4px`,
  //         Color: `#ffffff`,
  //         PaddingY: `10px`,
  //         PaddingX: `40px`,
  //         Hover: {
  //           Background: `#343F64`,
  //           BorderColor: `#343F64`,
  //           Color: `#E9DB89`,
  //         }
  //       },
  //       ViewMoreSection: {
  //         MarginTop: `32px`,
  //       }
  //     },
  //     AboutUsPage: {
  //       h2: {
  //         FontWeight: `700`,
  //         FontSize: `32px`,
  //         LineHeight: `42px`,
  //         Color: `#343F64`,
  //       },
  //       h3: {
  //         FontWeight: `500`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Color: `#4E616B`,
  //         BorderBottom: {
  //           BorderWidth: `2px`,
  //           Background: `#343F64`,
  //           BottomSpace: `-8px`,
  //         }
  //       },
  //       p: {
  //         FontWeight: `400`,
  //         FontSize: `16px`,
  //         LineHeight: `28px`,
  //         Color: `#202020`,
  //       },

  //       SectionHead: {
  //         MarginBottom: `40px`,
  //         Alignment: `center`,
  //       },
  //       AboutSection: {
  //         Background: `#EBECF0`,
  //       },
  //       MessageDeskSection: {
  //         h2: {
  //           FontWeight: `700`,
  //           FontSize: `32px`,
  //           LineHeight: `42px`,
  //           Color: `#343F64`,
  //         },
  //         h3: {
  //           FontWeight: `500`,
  //           FontSize: `18px`,
  //           LineHeight: `24px`,
  //           Color: `#4E616B`,

  //         },
  //         h4: {
  //           FontWeight: `20px`,
  //           FontSize: `20px`,
  //           LineHeight: `30px`,
  //           Color: `#343F64`,
  //         },
  //         h5: {
  //           FontWeight: `500`,
  //           FontSize: `16px`,
  //           LineHeight: `20px`,
  //           Color: `#4E616B`,
  //         },
  //         p: {
  //           FontWeight: `400`,
  //           FontSize: `16px`,
  //           LineHeight: `28px`,
  //           Color: `#202020`,
  //         },
  //         MessageDeskSectionHead: {
  //           MarginBottom: `40px`,
  //           Alignment: `center`,
  //           BorderBottom: {
  //             BorderWidth: `2px`,
  //             Background: `#343F64`,
  //             BottomSpace: `-8px`,
  //           }
  //         },
  //         MessageDeskProfileImage: {
  //           Width: `447px`,
  //           Height: `495px`,
  //           BorderRadius: `20px`,
  //         },
  //       },
  //       MissionSection: {
  //         Background: `#EBECF0`,
  //         BorderRadius: `20px`,
  //         h2: {
  //           FontWeight: `700`,
  //           FontSize: `32px`,
  //           LineHeight: `42px`,
  //           Color: `#343F64`,
  //           Alignment: `center`,
  //           BorderBottom: {
  //             BorderWidth: `2px`,
  //             Background: `#343F64`,
  //             BottomSpace: `-8px`,
  //           }
  //         },
  //         p: {
  //           FontWeight: `400`,
  //           FontSize: `16px`,
  //           LineHeight: `28px`,
  //           Color: `#202020`,
  //           Alignment: `center`,
  //         },
  //         MissionHead: {
  //           MarginBottom: `40px`,
  //           Alignment: `center`,
  //         }
  //       },
  //       VisionSection: {
  //         Background: `#EBECF0`,
  //         BorderRadius: `20px`,
  //         h2: {
  //           FontWeight: `700`,
  //           FontSize: `32px`,
  //           LineHeight: `42px`,
  //           Color: `#343F64`,
  //           Alignment: `center`,
  //           BorderBottom: {
  //             BorderWidth: `2px`,
  //             Background: `#343F64`,
  //             BottomSpace: `-8px`,
  //           }
  //         },
  //         p: {
  //           FontWeight: `400`,
  //           FontSize: `16px`,
  //           LineHeight: `28px`,
  //           Color: `#202020`,
  //           Alignment: `center`,
  //         },
  //         VisionHead: {
  //           MarginBottom: `40px`,
  //           Alignment: `center`,
  //         }
  //       }
  //     },
  //   },
  //   Notice: {
  //     NoticeBoardHero: {
  //       a: {
  //         FontWeight: '500',
  //         FontSize: '16px',
  //         LineHeight: '1.24',
  //         Color: `#343F64`,
  //       },
  //       PaddingY: `16px`,
  //       ContentBox: {
  //         width: `100%`,
  //       },
  //     },
  //   },
  //   Principal: {
  //     PrincipalHero: {
  //       h4: {
  //         FontWeight: `20px`,
  //         FontSize: `20px`,
  //         LineHeight: `30px`,
  //         Color: `#343F64`,
  //       },
  //       h5: {
  //         FontWeight: `500`,
  //         FontSize: `16px`,
  //         LineHeight: `20px`,
  //         Color: `#4E616B`,
  //       },
  //       p: {
  //         FontWeight: `400`,
  //         FontSize: `16px`,
  //         LineHeight: `28px`,
  //         Color: `#343F64`,
  //         PaddingTop: `24px`,
  //       },
  //       PrincipalProfileImage: {
  //         Width: `200px`,
  //         Height: `200px`,
  //         BorderRadius: `50%`,
  //         MarginBottom: `24px`,
  //       }
  //     }
  //   },
  //   Faculty: {
  //     FacultyHero: {
  //       h2: {
  //         FontWeight: `700`,
  //         FontSize: `32px`,
  //         LineHeight: `42px`,
  //         Alignment: `center`,
  //         Color: `#343F64`,
  //       },
  //       h3: {
  //         FontWeight: `500`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Alignment: `center`,
  //         Color: `#4E616B`,
  //       },
  //       h4: {
  //         FontWeight: `20px`,
  //         FontSize: `20px`,
  //         LineHeight: `30px`,
  //         Color: `#343F64`,
  //         MarginBottom: `10px`,
  //       },
  //       h5: {
  //         FontWeight: `500`,
  //         FontSize: `16px`,
  //         LineHeight: `20px`,
  //         Color: `#4E616B`,
  //       },
  //       TeamAlbumHomeCard: {
  //         BorderWidth: `2px`,
  //         BorderColor: `#343F64`,
  //         BorderRadius: `24px`,
  //         Height: `381px`,
  //         TeamAlbumHomeCardOverlay: {
  //           PaddingY: `10px`,
  //           PaddingX: `32px`,
  //           PrimaryBorderBottom: {
  //             Height: `1px`,
  //             Background: `#343F64`,
  //             Bottom: `-5px`,
  //           },
  //         }
  //       },
  //       ViewMoreTeamButton: {
  //         FontWeight: `400`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Background: `#343F64`,
  //         BorderColor: `#343F64`,
  //         BorderRadius: `4px`,
  //         Color: `#ffffff`,
  //         PaddingY: `10px`,
  //         PaddingX: `40px`,
  //         MarginTop: `48px`,
  //         Hover: {
  //           Background: `#343F64`,
  //           BorderColor: `#343F64`,
  //           Color: `#E9DB89`,
  //         }
  //       }
  //     },
  //     FacultyPage: {
  //       h2: {
  //         FontWeight: `700`,
  //         FontSize: `32px`,
  //         LineHeight: `42px`,
  //         Alignment: `center`,
  //         Color: `#343F64`,
  //       },
  //       h3: {
  //         FontWeight: `500`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Alignment: `center`,
  //         Color: `#4E616B`,
  //       },
  //       h4: {
  //         FontWeight: `20px`,
  //         FontSize: `20px`,
  //         LineHeight: `30px`,
  //         Color: `#343F64`,
  //         MarginBottom: `10px`,
  //       },
  //       h5: {
  //         FontWeight: `500`,
  //         FontSize: `16px`,
  //         LineHeight: `20px`,
  //         Color: `#4E616B`,
  //       },
  //       TeamAlbumCard: {
  //         BorderWidth: `2px`,
  //         BorderColor: `#343F64`,
  //         BorderRadius: `24px`,
  //         Height: `381px`,
  //         TeamAlbumCardOverlay: {
  //           PaddingY: `10px`,
  //           PaddingX: `32px`,
  //           PrimaryBorderBottom: {
  //             Height: `1px`,
  //             Background: `#343F64`,
  //             Bottom: `-5px`,
  //           },
  //         }
  //       },
  //     },
  //   },
  //   Facility: {
  //     FacilitiesHero: {
  //       h2: {
  //         FontWeight: `700`,
  //         FontSize: `32px`,
  //         LineHeight: `42px`,
  //         Alignment: `center`,
  //         Color: `#343F64`,
  //       },
  //       h3: {
  //         FontWeight: `500`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Alignment: `center`,
  //         Color: `#4E616B`,
  //       },
  //       h4: {
  //         FontWeight: `20px`,
  //         FontSize: `20px`,
  //         LineHeight: `30px`,
  //         Color: `#343F64`,
  //       },
  //       p: {
  //         FontWeight: `400`,
  //         FontSize: `16px`,
  //         LineHeight: `28px`,
  //         Color: `#4E616B`,
  //         MarginTop: `20px`,
  //       },
  //       a: {
  //         FontWeight: `400`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Background: `#343F64`,
  //         BorderColor: `#343F64`,
  //         BorderRadius: `4px`,
  //         Color: `#fff`,
  //         PaddingY: `10px`,
  //         PaddingX: `40px`,
  //         MarginTop: `48px`,
  //         Hover: {
  //           Background: `#343F64`,
  //           BorderColor: `#343F64`,
  //           Color: `#E9DB89`,
  //         }
  //       },
  //       SlickArrowColor: {
  //         Color: `#4E616B`,
  //         Hover: {
  //           Color: `#343F64`,
  //         }
  //       },
  //       FacilitiesSliderDescription: {
  //         Padding: `24px`,
  //         Background: `rgba(32, 32, 32, 0.1)`,
  //         BorderBottom: {
  //           Height: `2px`,
  //           Background: `#4E616B`,
  //           BottomSpace: `-10px`,
  //         },
  //       },
  //     },
  //     FacilityPage: {
  //       h2: {
  //         FontWeight: `700`,
  //         FontSize: `32px`,
  //         LineHeight: `42px`,
  //         Alignment: `center`,
  //         Color: `#343F64`,
  //       },
  //       h4: {
  //         FontWeight: `20px`,
  //         FontSize: `20px`,
  //         LineHeight: `30px`,
  //         Alignment: `left`,
  //         Color: `#343F64`,

  //       },
  //       li: {
  //         FontWeight: `400`,
  //         FontSize: `16px`,
  //         LineHeight: `28px`,
  //         Alignment: `left`,
  //         Color: `#343F64`,
  //       },
  //       FacilityListItemImage: {
  //         Width: `320px`,
  //         Height: `374px`,
  //         BorderTopLeftRadius: `25px`,
  //         BorderBottomLeftRadius: `25px`,
  //       },
  //       FacilityListItemContent: {
  //         Padding: `32px`,
  //         Background: `#EBECF0`,
  //         BorderTopRightRadius: `25px`,
  //         BorderBottomRightRadius: `25px`,
  //         BorderBottom: {
  //           Height: `2px`,
  //           Background: `#4E616B`,
  //         },
  //       }
  //     },
  //   },
  //   Gallery: {
  //     GalleryHero: {
  //       h2: {
  //         FontWeight: `700`,
  //         FontSize: `32px`,
  //         LineHeight: `42px`,
  //         Alignment: `center`,
  //         Color: `#343F64`,
  //       },
  //       h3: {
  //         FontWeight: `500`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Alignment: `center`,
  //         Color: `#4E616B`,
  //       },
  //       ViewMoreSneekPeakButton: {
  //         FontWeight: `400`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Background: `#343F64`,
  //         BorderColor: `#343F64`,
  //         BorderRadius: `4px`,
  //         Color: `#fff`,
  //         PaddingY: `10px`,
  //         PaddingX: `40px`,
  //         MarginTop: `48px`,
  //         Hover: {
  //           Background: `#343F64`,
  //           BorderColor: `#343F64`,
  //           Color: `#E9DB89`,
  //         }
  //       }
  //     },
  //     GalleryPage: {
  //       h2: {
  //         FontWeight: `700`,
  //         FontSize: `32px`,
  //         LineHeight: `42px`,
  //         Alignment: `center`,
  //         Color: `#343F64`,
  //       },
  //       h4: {
  //         FontWeight: `20px`,
  //         FontSize: `20px`,
  //         LineHeight: `30px`,
  //         Color: `#fff`,
  //       }
  //     },
  //   },
  //   Contact: {
  //     ContactHero: {
  //       h2: {
  //         FontWeight: `700`,
  //         FontSize: `32px`,
  //         LineHeight: `42px`,
  //         Color: `#343F64`,
  //       },
  //       h3: {
  //         FontWeight: `500`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Color: `#4E616B`,
  //       },
  //       p: {
  //         FontWeight: `400`,
  //         FontSize: `16px`,
  //         LineHeight: `28px`,
  //         Color: `#343F64`,
  //         MarginBottom: `10px`,
  //       },
  //       ContactHomeHeroAddress: {
  //         AddressIcon: {
  //           Background: `#343F64`
  //         },
  //         PhoneIcon: {
  //           Background: `#343F64`
  //         },
  //         MailIcon: {
  //           Background: `#343F64`
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
  //           BorderColor: `#4E616B`,
  //           Color: `#343F64`,
  //           FontWeight: `400`,
  //           FontSize: `14px`,
  //           LineHeight: `21px`,
  //         },
  //         SubmitButton: {
  //           FontWeight: `400`,
  //           FontSize: `18px`,
  //           LineHeight: `24px`,
  //           Background: `#343F64`,
  //           BorderColor: `#343F64`,
  //           BorderRadius: `4px`,
  //           Color: `#fff`,
  //           PaddingY: `10px`,
  //           PaddingX: `40px`,
  //           Hover: {
  //             Background: `#343F64`,
  //             BorderColor: `#343F64`,
  //             Color: `#E9DB89`,
  //           }
  //         }
  //       }
  //     },
  //     ContactPage: {
  //       h2: {
  //         FontWeight: `700`,
  //         FontSize: `32px`,
  //         LineHeight: `42px`,
  //         Color: `#343F64`,
  //       },
  //       h3: {
  //         FontWeight: `500`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Color: `#343F64`,
  //         BorderBottom: {
  //           BorderWidth: `2px`,
  //           Background: `#4E616B`,
  //           BottomSpace: `-8px`,
  //         }
  //       },
  //       h6: {
  //         FontWeight: `600`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Color: `#343F64`,
  //       },
  //       a: {
  //         FontWeight: '500',
  //         FontSize: '16px',
  //         LineHeight: '1.24',
  //         Color: `#343F64`,
  //       },
  //       p: {
  //         FontWeight: '500',
  //         FontSize: '16px',
  //         LineHeight: '1.24',
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
  //         FontWeight: `700`,
  //         FontSize: `32px`,
  //         LineHeight: `42px`,
  //         Color: `#343F64`,
  //       },
  //       h4: {
  //         FontWeight: `20px`,
  //         FontSize: `20px`,
  //         LineHeight: `30px`,
  //         Color: `#343F64`,
  //       },
  //       h5: {
  //         FontWeight: `500`,
  //         FontSize: `16px`,
  //         LineHeight: `20px`,
  //         Color: `#4E616B`,
  //         Alignment: `left`,
  //         MarginY: `10px`,
  //         MarginX: `0`,
  //       },
  //       AdmissionHomeHeroHead: {
  //         MarginBottom: `40px`,
  //         Alignment: `left`,
  //       },
  //       ViewMoreAdmissionHeroButton: {
  //         FontWeight: `400`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Background: `#343F64`,
  //         BorderColor: `#343F64`,
  //         BorderRadius: `4px`,
  //         Color: `#ffffff`,
  //         PaddingY: `10px`,
  //         PaddingX: `40px`,
  //         Hover: {
  //           Background: `#343F64`,
  //           BorderColor: `#343F64`,
  //           Color: `#E9DB89`,
  //         }
  //       },
  //       ViewMoreAdmissionHeroSection: {
  //         Alignment: `left`
  //       }
  //     },
  //     AdmissionPage: {
  //       h2: {
  //         FontWeight: `700`,
  //         FontSize: `32px`,
  //         LineHeight: `42px`,
  //         Color: `#343F64`,
  //       },
  //       h6: {
  //         FontWeight: `600`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Color: `#fff`,
  //       },
  //       p: {
  //         FontWeight: `400`,
  //         FontSize: `16px`,
  //         LineHeight: `28px`,
  //         Color: `#fff`,
  //       },
  //       AdmissionHead: {
  //         MarginBottom: `40px`,
  //         Alignment: `center`,
  //       },
  //       AdmissionListItem: {
  //         BorderColor: `#4E616B`,
  //       },
  //       OverlayDownloadButton: {
  //         FontWeight: `400`,
  //         FontSize: `15px`,
  //         LineHeight: `18px`,
  //         Background: `#E9DB89`,
  //         BorderColor: `#E9DB89`,
  //         BorderRadius: `4px`,
  //         Color: `#343F64`,
  //         PaddingY: `10px`,
  //         PaddingX: `40px`,
  //         Hover: {
  //           Background: `#343F64`,
  //           BorderColor: `#343F64`,
  //           Color: `#E9DB89`,
  //         }
  //       },
  //       OverlayViewButton: {
  //         FontWeight: `400`,
  //         FontSize: `15px`,
  //         LineHeight: `18px`,
  //         Background: `#EBECF0`,
  //         BorderColor: `#EBECF0`,
  //         BorderRadius: `4px`,
  //         Color: `#343F64`,
  //         PaddingY: `10px`,
  //         PaddingX: `40px`,
  //         Hover: {
  //           Background: `#E9DB89`,
  //           BorderColor: `#E9DB89`,
  //           Color: `#343F64`,
  //         }
  //       },
  //       ViewDetailAdmissionModalBody: {
  //         h6: {
  //           FontWeight: themeGlobal.typography.h6.FontWeight,
  //           FontSize: themeGlobal.typography.h6.FontSize,
  //           LineHeight: themeGlobal.typography.h6.LineHeight,
  //           Color: themeGlobal.color.alpha,
  //           Alignment: "left"
  //         },
  //         p: {
  //           FontWeight: themeGlobal.typography.regular.FontWeight,
  //           FontSize: themeGlobal.typography.regular.FontSize,
  //           LineHeight: themeGlobal.typography.regular.LineHeight,
  //           Color: themeGlobal.color.alpha,
  //           Alignment: "left"
  //         },
  //         ApplyNowButton: {
  //           FontWeight: `500`,
  //           FontSize: `14px`,
  //           LineHeight: `24px`,
  //           Background: themeGlobal.color.alpha,
  //           BorderColor: themeGlobal.color.alpha,
  //           BorderRadius: `4px`,
  //           Color: themeGlobal.color.white,
  //           PaddingY: `6px`,
  //           PaddingX: `24px`,
  //           Alignment: "center",
  //           LetterSpacing: "0.2px",
  //           Hover: {
  //             Background: themeGlobal.color.alpha,
  //             BorderColor: themeGlobal.color.alpha,
  //             Color: themeGlobal.color.beta,
  //           }
  //         },
  //         DownloadFeeStructureButton: {
  //           FontWeight: `500`,
  //           FontSize: `14px`,
  //           LineHeight: `24px`,
  //           Background: themeGlobal.color.white,
  //           BorderColor: themeGlobal.color.alpha,
  //           BorderRadius: `4px`,
  //           Color: themeGlobal.color.alpha,
  //           PaddingY: `6px`,
  //           PaddingX: `24px`,
  //           Alignment: "center",
  //           LetterSpacing: "0.2px",
  //           Hover: {
  //             Background: themeGlobal.color.alpha,
  //             BorderColor: themeGlobal.color.alpha,
  //             Color: themeGlobal.color.white,
  //           }
  //         },
  //         DownloadBrochureButton: {
  //           FontWeight: `500`,
  //           FontSize: `14px`,
  //           LineHeight: `24px`,
  //           Background: themeGlobal.color.white,
  //           BorderColor: themeGlobal.color.alpha,
  //           BorderRadius: `4px`,
  //           Color: themeGlobal.color.alpha,
  //           PaddingY: `6px`,
  //           PaddingX: `24px`,
  //           Alignment: "center",
  //           LetterSpacing: "0.2px",
  //           Hover: {
  //             Background: themeGlobal.color.alpha,
  //             BorderColor: themeGlobal.color.alpha,
  //             Color: themeGlobal.color.white,
  //           }
  //         }
  //       }
  //     },
  //   },
  //   FeeStructure: {
  //     FeeStructureHero: {
  //       h2: {
  //         FontWeight: `700`,
  //         FontSize: `32px`,
  //         LineHeight: `42px`,
  //         Color: `#343F64`,
  //       },
  //       h6: {
  //         FontWeight: `600`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Color: `#202020`,
  //       },
  //       FeeStructureHomeHeroHead: {
  //         MarginBottom: `40px`,
  //         Alignment: `center`,
  //       },
  //       ViewMoreFeeStructureHeroButton: {
  //         FontWeight: `400`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Background: `#343F64`,
  //         BorderColor: `#343F64`,
  //         BorderRadius: `4px`,
  //         Color: `#ffffff`,
  //         PaddingY: `10px`,
  //         PaddingX: `40px`,
  //         Hover: {
  //           Background: `#343F64`,
  //           BorderColor: `#343F64`,
  //           Color: `#E9DB89`,
  //         }
  //       },
  //       ViewMoreFeeStructureHeroSection: {
  //         Alignment: `left`
  //       }
  //     },
  //     FeeStructurePage: {

  //       h2: {
  //         FontWeight: `700`,
  //         FontSize: `32px`,
  //         LineHeight: `42px`,
  //         Alignment: `center`,
  //         Color: `#343F64`,
  //       },
  //       h4: {
  //         FontWeight: `20px`,
  //         FontSize: `20px`,
  //         LineHeight: `30px`,
  //         Color: `#343F64`,
  //         MarginBottom: `10px`,
  //         Alignment: "center"
  //       },
  //       p: {
  //         FontWeight: `400`,
  //         FontSize: `16px`,
  //         LineHeight: `28px`,
  //         Color: `#4E616B`,
  //         Alignment: "center"
  //       },
  //       FeeStructureListCard: {
  //         Alignment: `center`,
  //       },
  //       ViewFeeStructureButton: {
  //         FontWeight: `500`,
  //         FontSize: `19px`,
  //         LineHeight: `34px`,
  //         Background: `#fff`,
  //         BorderColor: `#fff`,
  //         BorderRadius: `4px`,
  //         Color: `#343F64`,
  //         PaddingY: `0`,
  //         PaddingX: `0`,
  //         Alignment: "center",
  //         Hover: {
  //           Background: `#fff`,
  //           BorderColor: `#fff`,
  //           Color: `#4E616B`,
  //         }
  //       },
  //       FeeStructureModalBody: {
  //         h4: {
  //           FontWeight: themeGlobal.typography.h4.FontWeight,
  //           FontSize: themeGlobal.typography.h4.FontSize,
  //           LineHeight: themeGlobal.typography.h4.LineHeight,
  //           Color: themeGlobal.color.alpha,
  //           Alignment: "left"
  //         },
  //         h5: {
  //           FontWeight: themeGlobal.typography.h5.FontWeight,
  //           FontSize: themeGlobal.typography.h5.FontSize,
  //           LineHeight: themeGlobal.typography.h5.LineHeight,
  //           Color: themeGlobal.color.alpha,
  //           Alignment: "left"
  //         },
  //         h6: {
  //           FontWeight: themeGlobal.typography.h6.FontWeight,
  //           FontSize: themeGlobal.typography.h6.FontSize,
  //           LineHeight: themeGlobal.typography.h6.LineHeight,
  //           Color: themeGlobal.color.alpha,
  //           Alignment: "left"
  //         },
  //         p: {
  //           FontWeight: themeGlobal.typography.regular.FontWeight,
  //           FontSize: themeGlobal.typography.regular.FontSize,
  //           LineHeight: themeGlobal.typography.regular.LineHeight,
  //           Color: themeGlobal.color.alpha,
  //           Alignment: "left"
  //         },
  //         DownloadFileButton: {
  //           FontWeight: `500`,
  //           FontSize: `14px`,
  //           LineHeight: `24px`,
  //           Background: themeGlobal.color.alpha,
  //           BorderColor: themeGlobal.color.alpha,
  //           BorderRadius: `4px`,
  //           Color: themeGlobal.color.white,
  //           PaddingY: `6px`,
  //           PaddingX: `24px`,
  //           Alignment: "center",
  //           LetterSpacing: "0.2px",
  //           Hover: {
  //             Background: themeGlobal.color.alpha,
  //             BorderColor: themeGlobal.color.alpha,
  //             Color: themeGlobal.color.beta,
  //           }
  //         },
  //         FeeStructureBreakuplist: {
  //           tr: {
  //             BorderColor: themeGlobal.color.alphaSemiLight
  //           }
  //         }
  //       },
  //     },
  //   },
  //   Faqs: {
  //     FaqsHero: {
  //       h2: {
  //         FontWeight: `700`,
  //         FontSize: `32px`,
  //         LineHeight: `42px`,
  //         Color: `#343F64`,
  //       },
  //       h6: {
  //         FontWeight: `600`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Color: `#343F64`,
  //       },
  //       p: {
  //         FontWeight: `400`,
  //         FontSize: `16px`,
  //         LineHeight: `28px`,
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
  //         Background: `#343F64`,
  //         BorderColor: `#343F64`,
  //         BorderRadius: `4px`,
  //         Color: `#ffffff`,
  //         PaddingY: `10px`,
  //         PaddingX: `40px`,
  //         Hover: {
  //           Background: `#343F64`,
  //           BorderColor: `#343F64`,
  //           Color: `#E9DB89`,
  //         }
  //       },
  //       ViewMoreFaqsHeroSection: {
  //         Alignment: `left`,
  //         MarginTop: `32px`,
  //       }
  //     },
  //     FaqsPage: {
  //       h2: {
  //         FontWeight: `700`,
  //         FontSize: `32px`,
  //         LineHeight: `42px`,
  //         Color: `#343F64`,
  //       },
  //       h6: {
  //         FontWeight: `600`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Color: `#343F64`,
  //       },
  //       p: {
  //         FontWeight: `400`,
  //         FontSize: `16px`,
  //         LineHeight: `28px`,
  //         Color: `#343F64`,
  //       },

  //       FaqsHead: {
  //         MarginBottom: `40px`,
  //         Alignment: `left`,
  //       },
  //       FaqListItem: {
  //         BorderColor: `#4E616B`,
  //       },
  //     },
  //   },
  //   Vacancy: {
  //     VacancyHero: {
  //       h2: {
  //         FontWeight: `700`,
  //         FontSize: `32px`,
  //         LineHeight: `42px`,
  //         Color: `#343F64`,
  //       },
  //       h6: {
  //         FontWeight: `600`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Color: `#fff`,
  //       },

  //       VacancyHomeHeroHead: {
  //         MarginBottom: `40px`,
  //         Alignment: `center`,
  //       },
  //       VacancyListItem: {
  //         BorderColor: `#4E616B`,
  //       },
  //       ViewMoreVacancyHeroButton: {
  //         FontWeight: `400`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Background: `#343F64`,
  //         BorderColor: `#343F64`,
  //         BorderRadius: `4px`,
  //         Color: `#ffffff`,
  //         PaddingY: `10px`,
  //         PaddingX: `40px`,
  //         Hover: {
  //           Background: `#343F64`,
  //           BorderColor: `#343F64`,
  //           Color: `#E9DB89`,
  //         }
  //       },
  //       ViewMoreVacancyHeroSection: {
  //         Alignment: `left`,
  //         MarginTop: `32px`,
  //       }
  //     },
  //     VacancyPage: {
  //       h2: {
  //         FontWeight: `700`,
  //         FontSize: `32px`,
  //         LineHeight: `42px`,
  //         Color: `#343F64`,
  //       },
  //       h6: {
  //         FontWeight: `600`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Color: `#fff`,
  //       },
  //       p: {
  //         FontWeight: `400`,
  //         FontSize: `16px`,
  //         LineHeight: `28px`,
  //         Color: `#fff`,
  //       },
  //       VacancyHead: {
  //         MarginBottom: `40px`,
  //         Alignment: `center`,
  //       },
  //       VacancyListItem: {
  //         BorderColor: `#4E616B`,
  //       },
  //       OverlayApplyNowButton: {
  //         FontWeight: `400`,
  //         FontSize: `15px`,
  //         LineHeight: `18px`,
  //         Background: `#E9DB89`,
  //         BorderColor: `#E9DB89`,
  //         BorderRadius: `4px`,
  //         Color: `#343F64`,
  //         PaddingY: `10px`,
  //         PaddingX: `40px`,
  //         Hover: {
  //           Background: `#343F64`,
  //           BorderColor: `#343F64`,
  //           Color: `#E9DB89`,
  //         }
  //       },
  //       OverlayViewButton: {
  //         FontWeight: `400`,
  //         FontSize: `15px`,
  //         LineHeight: `18px`,
  //         Background: `#E9DB89`,
  //         BorderColor: `#E9DB89`,
  //         BorderRadius: `4px`,
  //         Color: `#343F64`,
  //         PaddingY: `10px`,
  //         PaddingX: `40px`,
  //         Hover: {
  //           Background: `#343F64`,
  //           BorderColor: `#343F64`,
  //           Color: `#E9DB89`,
  //         }
  //       }
  //     },
  //   },
  //   Announcement: {
  //     AnnouncementPage: {
  //       h2: {
  //         FontWeight: `700`,
  //         FontSize: `32px`,
  //         LineHeight: `42px`,
  //         Color: `#343F64`,
  //       },
  //       h6: {
  //         FontWeight: `600`,
  //         FontSize: `18px`,
  //         LineHeight: `24px`,
  //         Color: `#fff`,
  //       },
  //       p: {
  //         FontWeight: `400`,
  //         FontSize: `16px`,
  //         LineHeight: `28px`,
  //         Color: `#fff`,
  //       },
  //       AnnouncementHead: {
  //         MarginBottom: `40px`,
  //         Alignment: `center`,
  //       },
  //       AnnouncementListItem: {
  //         BorderColor: `#4E616B`,
  //       },
  //       OverlayDownloadButton: {
  //         FontWeight: `400`,
  //         FontSize: `15px`,
  //         LineHeight: `18px`,
  //         Background: `#E9DB89`,
  //         BorderColor: `#E9DB89`,
  //         BorderRadius: `4px`,
  //         Color: `#343F64`,
  //         PaddingY: `10px`,
  //         PaddingX: `40px`,
  //         Hover: {
  //           Background: `#343F64`,
  //           BorderColor: `#343F64`,
  //           Color: `#E9DB89`,
  //         }
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
  //           Color: themeGlobal.color.alpha,
  //           Alignment: `left`,
  //         },
  //         h3: {
  //           FontWeight: themeGlobal.typography.h3.FontWeight,
  //           FontSize: themeGlobal.typography.h3.FontSize,
  //           LineHeight: themeGlobal.typography.h3.LineHeight,
  //           Color: themeGlobal.color.alphaSemiLight,
  //           Alignment: `left`,
  //         }
  //       },
  //       ModalBodyWTC: {
  //         h2: {
  //           FontWeight: themeGlobal.typography.h2.FontWeight,
  //           FontSize: themeGlobal.typography.h2.FontSize,
  //           LineHeight: themeGlobal.typography.h2.LineHeight,
  //           Color: themeGlobal.color.alpha,
  //           Alignment: `left`,
  //         },
  //         h3: {
  //           FontWeight: themeGlobal.typography.h3.FontWeight,
  //           FontSize: themeGlobal.typography.h3.FontSize,
  //           LineHeight: themeGlobal.typography.h3.LineHeight,
  //           Color: themeGlobal.color.alphaSemiLight,
  //           Alignment: `left`,
  //         },
  //         p: {
  //           FontWeight: themeGlobal.typography.regular.FontWeight,
  //           FontSize: themeGlobal.typography.regular.FontSize,
  //           LineHeight: themeGlobal.typography.regular.LineHeight,
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
  //       bodyBackground: 'red',
  //       bodyFont: `'Poppins', sans-serif`,
  //       bodyFontSize: '16px',
  //       bodyFontWeight: '600',
  //       bodyColor: '#8B417D',
  //       bodyLetterSpacing: '2px',
  //     },
  //     container: {
  //       containerMaxWidth: '1140px',
  //     }
  //   },
  // }
  const dispatch = useDispatch()
  const { theme, themeSuccess, themeStatus } = useSelector((state) => {
    return {
      theme: state.websiteTemplate.getTemplate.data,
      themeSuccess: state.websiteTemplate.getTemplate.success,
      themeStatus: state.websiteTemplate.getTemplate.status
      // themeLoading: state.websiteTemplate.getTemplate.loading,
      // themeGlobal: state.websiteTemplate.getTemplate.data.themeGlobal,
    }
  })
  const HeaderToRender = SectionHeader[themeSuccess && theme.Header.component ? theme.Header.component : "Vespertine_Header"];
  const FooterToRender = SectionFooter[themeSuccess && theme.Footer.component ? theme.Footer.component : 'Vespertine_Footer'];
  const { pathname } = useLocation()

  return (
    <React.Fragment>
      {
        themeSuccess ?
          themeStatus === 201 ?
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              {/* <Headroom style={{
                WebkitTransition: 'all .5s ease-in-out',
                MozTransition: 'all .5s ease-in-out',
                OTransition: 'all .5s ease-in-out',
                transition: 'all .5s ease-in-out'
              }}> */}
                {
                  pathname !== "/auth/login" &&

                  <HeaderToRender preview={false} />
                }
              {/* </Headroom> */}
              <SectionBodyCustom>
                {children}
              </SectionBodyCustom>
              {
                pathname !== "/auth/login" &&
                <FooterToRender preview={false} />
              }
            </ThemeProvider>
            : <Error404 domainError={true} />
          : <ComponentLoader />
      }

    </React.Fragment>
  )
}
export default WebsiteLayout