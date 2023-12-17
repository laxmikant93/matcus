import styled, { createGlobalStyle } from "styled-components";
import SubDomainHeader from "../../Layout/SubdomainLayout/SubDomainHeader";
export const GlobalStyleInstitute = createGlobalStyle`

*{
  @import url(${(props) => props.theme[props.theme.activeTheme]?.regular_body_fonturl});
  @import url(${(props) => props.theme[props.theme.activeTheme]?.heading_sub_fonturl});  
  color:${(props) => props.theme[props.theme.activeTheme]?.regular_text_color || "#ffffff"};
  font-size-adjust:auto;
}
a{
  color:${(props) => props.theme[props.theme.activeTheme]?.hyperlink_text_color || "#146efa"};  
  &:hover{
    color:${(props) => props.theme[props.theme.activeTheme]?.hyperlink_hover_color || "#146efa"};
  }
} 

html {
  --scrollbarBG: rgba(${(props) => props.theme[props.theme.activeTheme]?.regular_text_color || "#ffffff"}, .5);
  --thumbBG: ${(props) => props.theme[props.theme.activeTheme]?.hyperlink_text_color || "#146efa"};
}
button, .button{
  font-family: ${(props) => props.theme[props.theme.activeTheme]?.regular_body_font || "manrope"};
  font-size:${(props) => (props.theme[props.theme.activeTheme]?.body_text && props.theme[props.theme.activeTheme]?.body_text.size) || "14px"};
  background-color:${(props) => props.theme[props.theme.activeTheme]?.button_background || "#146efa"};
  color:${(props) => props.theme[props.theme.activeTheme]?.button_text || "#ffffff"};
  &:hover{
    background-color:${(props) => props.theme[props.theme.activeTheme]?.button_hover_background || "#146efa"};
    color:${(props) => props.theme[props.theme.activeTheme]?.button_hover_text_color || "#ffffff"};
  }
}
body{
  font-family: ${(props) => props.theme[props.theme.activeTheme]?.regular_body_font || "manrope"};
  font-size:${(props) => (props.theme[props.theme.activeTheme]?.body_text && props.theme[props.theme.activeTheme]?.body_text.size) || "24px"};
  font-weight:${(props) => (props.theme[props.theme.activeTheme]?.body_text && props.theme[props.theme.activeTheme]?.body_text.text_type) || "700"};
  background-color:${(props) => props.theme[props.theme.activeTheme]?.website_background || "#ececec"};
}
.bg-primary{
  background-color:${(props) => props.theme[props.theme.activeTheme]?.primary_background || "#146efa"};
    h3,p{
      color:${(props) => props.theme[props.theme.activeTheme]?.primary_text_color || "#ffffff"};
    }
  } 
}
.bg-secondary{
  background-color:${(props) => props.theme[props.theme.activeTheme]?.secondary_background || "#14a032"};
  h3,p{
    color:${(props) => props.theme[props.theme.activeTheme]?.secondary_text_color || "#ffffff"};
  }
}

h1, h2, h3{
  font-family: ${(props) => props.theme[props.theme.activeTheme]?.heading_sub_font || "manrope"};
  @media only screen and (min-width: 768px) {
    font-size:${(props) => (props.theme[props.theme.activeTheme]?.heading && props.theme[props.theme.activeTheme]?.heading.size) || "24px"};
  }
  @media only screen and (max-width: 760px) {
    font-size: 7.55vw;
  }
  font-weight:${(props) => (props.theme[props.theme.activeTheme]?.heading && props.theme[props.theme.activeTheme]?.heading.text_type) || "700"};
  color:${(props) => props.theme[props.theme.activeTheme]?.heading_text_color || "#121212"};
  line-height:${(props) => props.theme[props.theme.activeTheme]?.heading_line_height || "25px"};
  letter-spacing:${(props) => props.theme[props.theme.activeTheme]?.heading_letter_spacing || "0"};
}
.heading{
  font-family: ${(props) => props.theme[props.theme.activeTheme]?.heading_sub_font || "manrope"};
  @media only screen and (min-width: 768px) {
    font-size:${(props) => (props.theme[props.theme.activeTheme]?.heading && props.theme[props.theme.activeTheme]?.heading.size) || "24px"};
  }
  @media only screen and (max-width: 760px) {
    font-size: 6.26vw;
    line-height:1.25;
  }
  font-weight:${(props) => (props.theme[props.theme.activeTheme]?.heading && props.theme[props.theme.activeTheme]?.heading.text_type) || "700"};
  color:${(props) => props.theme[props.theme.activeTheme]?.heading_text_color || "#121212"};
  line-height:${(props) => props.theme[props.theme.activeTheme]?.heading_line_height || "25px"};
  letter-spacing:${(props) => props.theme[props.theme.activeTheme]?.heading_letter_spacing || "0"};
}
.subheading{
  font-family: ${(props) => props.theme[props.theme.activeTheme]?.subheading_sub_font || "manrope"};  
  @media only screen and (min-width: 768px) {
    font-size:${(props) => (props.theme[props.theme.activeTheme]?.sub_heading && props.theme[props.theme.activeTheme]?.sub_heading.size) || "24px"};
  }
  @media only screen and (max-width: 760px) {
    font-size: 4.25vw;
    line-height:1.25;
  }
  font-weight:${(props) => (props.theme[props.theme.activeTheme]?.sub_heading && props.theme[props.theme.activeTheme]?.sub_heading.text_type) || "500"};
  color:${(props) => props.theme[props.theme.activeTheme]?.sub_heading_text_color || "#121212"};
  line-height:${(props) => props.theme[props.theme.activeTheme]?.heading_line_height || "25px"};
  letter-spacing:${(props) => props.theme[props.theme.activeTheme]?.heading_letter_spacing || "0"};
}
p{
  font-family: ${(props) => props.theme[props.theme.activeTheme]?.regular_body_font || "manrope"};
  @media only screen and (min-width: 768px) {
    font-size:${(props) => (props.theme[props.theme.activeTheme]?.body_text && props.theme[props.theme.activeTheme]?.body_text.size) || "24px"};
  }
  @media only screen and (max-width: 760px) {
    font-size: 3.8vw;
    line-height:1.5;
  }
  
  font-weight:${(props) => (props.theme[props.theme.activeTheme]?.body_text && props.theme[props.theme.activeTheme]?.body_text.text_type) || "700"};
  color:${(props) => props.theme[props.theme.activeTheme]?.regular_text_color || "#121212"};
  line-height:${(props) => props.theme[props.theme.activeTheme]?.regular_line_height || "20px"};
  letter-spacing:${(props) => props.theme[props.theme.activeTheme]?.regular_letter_spacing || "0"};

}
// start code for header section here ===========================
.sd-header-theme{
  background-color:${(props) => props.theme[props.theme.activeTheme]?.header_background || "#ffffff"};
}
.bottomNavArrowLeft,
.bottomNavArrowRight{
  .arrowcustom {
    border-color:  ${(props) => props.theme[props.theme.activeTheme]?.menu_hover_text_color || "#121212"};    
  }
  &:hover{
    .arrowcustom{
      border-color: ${(props) => props.theme[props.theme.activeTheme]?.menu_text_color || "#146efa"};
    }
  }
}
.textLink{
  color:${(props) => props.theme[props.theme.activeTheme]?.hyperlink_text_color || "#146efa"};
  &:hover{
    color:${(props) => props.theme[props.theme.activeTheme]?.hyperlink_hover_color || "#121212"};
    &:after{
      background-color:${(props) => props.theme[props.theme.activeTheme]?.hyperlink_hover_color || "#146efa"};
    }
  }
}
.subdomainTopNav{
  background-color:${(props) => props.theme[props.theme.activeTheme]?.menu_background || "#ffffff"};
}
.pn-Advancer{
  .arrowcustom {
    border-color: ${(props) => props.theme[props.theme.activeTheme]?.menu_text_color || "#121212"};
    &:hover{
      border-color:${(props) => props.theme[props.theme.activeTheme]?.menu_hover_text_color || "#146efa"};
    }
  }
}
.pn-Advancer{
  .arrowcustom {
    border-color: ${(props) => props.theme[props.theme.activeTheme]?.menu_text_color || "#121212"};
    &:hover{
      border-color:${(props) => props.theme[props.theme.activeTheme]?.menu_hover_text_color || "#146efa"};
    }
  }
 
}
.sd-navbar{
  li{
    a{
      color:${(props) => props.theme[props.theme.activeTheme]?.menu_text_color || "#121212"};
      font-size:${(props) => (props.theme[props.theme.activeTheme]?.body_text && props.theme[props.theme.activeTheme]?.body_text.size) || "14px"};
      letter-spacing:0;
      &:after{
        background-color:${(props) => props.theme[props.theme.activeTheme]?.menu_hover_text_color || "#146efa"};
      }
      &:hover{
        color:${(props) => props.theme[props.theme.activeTheme]?.menu_hover_text_color || "#146efa"};
      }
      &.active{
        color:${(props) => props.theme[props.theme.activeTheme]?.menu_hover_text_color || "#146efa"};
      }
    }
  }
}
.sd-social-connect{
  background-color:${(props) => props.theme[props.theme.activeTheme]?.header_background || "#146efa"};
  .ed-icon{
    background-color:${(props) => props.theme[props.theme.activeTheme]?.menu_text_color || "#146efa"};
  }
}
.signUpSecWrap{
  a{
    border:0;
    background: ${(props) => props.theme[props.theme.activeTheme]?.button_background || "#121212"};
    color:${(props) => props.theme[props.theme.activeTheme]?.button_text || "#121212"};
    font-size:${(props) => (props.theme[props.theme.activeTheme]?.body_text && props.theme[props.theme.activeTheme]?.body_text.size) || "14px"};
    &:hover{      
      background-color: ${(props) => props.theme[props.theme.activeTheme]?.button_hover_background || "#121212"};
      color:${(props) => props.theme[props.theme.activeTheme]?.button_hover_text_color || "#121212"};
    }
    &:last-child {
      background: ${(props) => props.theme[props.theme.activeTheme]?.button_background || "#121212"};
      color:${(props) => props.theme[props.theme.activeTheme]?.button_text || "#121212"};
      &:hover {
        background-color: ${(props) => props.theme[props.theme.activeTheme]?.button_hover_background || "#121212"};
        color:${(props) => props.theme[props.theme.activeTheme]?.button_hover_text_color || "#121212"};
      }
    }
  }
}
.scroll-top-menu-wrap{
  ul{
    li{
      &.active{
        &:after{
          background-color:${(props) => props.theme[props.theme.activeTheme]?.menu_hover_text_color || "#146efa"};
        }
        &:before{
          border-top-color:${(props) => props.theme[props.theme.activeTheme]?.menu_hover_text_color || "#146efa"};
        }
      }
    }
  }
}

// end code for header section here ===========================
.circle_previewleftpngimag{
  background-color:${(props) => props.theme[props.theme.activeTheme]?.circle_background_image || "#146efa"};
}
span.previewiconlineone{
  background-color:${(props) => props.theme[props.theme.activeTheme]?.circle_background_line || "#146efa"};

}
.small_circle_blackpreview{
  background-color:${(props) => props.theme[props.theme.activeTheme]?.circle_background_line || "#146efa"};
}
.verysmall_circle_blackpreview{
  background-color:${(props) => props.theme[props.theme.activeTheme]?.circle_background_line || "#146efa"};
}

.sd-contact-display{
  span{
    color:${(props) => props.theme[props.theme.activeTheme]?.hyperlink_text_color || "#121212"};
    &:hover{
      color:${(props) => props.theme[props.theme.activeTheme]?.hyperlink_hover_color || "#146efa"};
    }
  }
}
.AAG-CardMedia .thumbOverlayNoImage, .WA-CardMedia .thumbOverlayNoImage{
  color:${(props) => props.theme[props.theme.activeTheme]?.regular_text_color || "#121212"}; 
}
.slick-dots {
  li{
    button{
      &:before{
        color:${(props) => props.theme[props.theme.activeTheme]?.regular_text_color || "#121212"};
      }
    }
    &.slick-active{
      button{
        &:before{
          color:${(props) => props.theme[props.theme.activeTheme]?.regular_text_color || "#121212"};
        }
      }
    }
  }  
}
.icon-pinLOc{
  border: 6px solid  ${(props) => props.theme[props.theme.activeTheme]?.hyperlink_text_color || "#146efa"};
  &:after{
    border-top: 6px solid  ${(props) => props.theme[props.theme.activeTheme]?.hyperlink_text_color || "#146efa"};
  }  
  &:before{
    background-color:${(props) => props.theme[props.theme.activeTheme]?.website_background || "#ffffff"};
  }
}
.icon-emailBox{
  border: 2px solid ${(props) => props.theme[props.theme.activeTheme]?.hyperlink_text_color || "#ffffff"};
  &:after,&:before{
    border: 1px solid ${(props) => props.theme[props.theme.activeTheme]?.hyperlink_text_color || "#ffffff"};
  }
}
.icon-phonering{
  &:before{
    border-color: ${(props) => props.theme[props.theme.activeTheme]?.hyperlink_text_color || "#146efa"};
  }
}
.director-message{
  border-top: 3px solid ${(props) => props.theme[props.theme.activeTheme]?.hyperlink_text_color || "#146efa"};
  &:before{
    border-color: transparent transparent ${(props) => props.theme[props.theme.activeTheme]?.hyperlink_text_color || "#146efa"} transparent;
  }
  p{
    font-weight:${(props) => (props.theme[props.theme.activeTheme]?.body_text && props.theme[props.theme.activeTheme]?.body_text.text_type) || "700"};
    color:${(props) => props.theme[props.theme.activeTheme]?.button_background || "#121212"};  
  }

}
.modal{
  .modalwrapper{
    background-color:${(props) => props.theme[props.theme.activeTheme]?.website_background || "#ececec"};
    color:${(props) => props.theme[props.theme.activeTheme]?.button_background || "#146efa"};
    p, .heading, .subheading, h3, h1, strong{
      color:${(props) => props.theme[props.theme.activeTheme]?.button_background || "#146efa"};
    }
  }
}

.thumbOverlayNoImage{
  color:${(props) => props.theme[props.theme.activeTheme]?.regular_text_color || "#146efa"};
}
.FS-Action{
  .btnLink{
    color:${(props) => props.theme[props.theme.activeTheme]?.hyperlink_text_color || "#146efa"};
    &:after{
      background-color:${(props) => props.theme[props.theme.activeTheme]?.hyperlink_text_color || "#146efa"};
    }
    &:hover{
      color:${(props) => props.theme[props.theme.activeTheme]?.hyperlink_hover_color || "#146efa"};
      &:after{
        background-color:${(props) => props.theme[props.theme.activeTheme]?.hyperlink_hover_color || "#146efa"};
      }
    }
  }
}
.sharebtn{
  .icon-share{
    background-color:${(props) => props.theme[props.theme.activeTheme]?.button_text || "#146efa"};
  }
}
.icon-like-heart{
  background-color:${(props) => props.theme[props.theme.activeTheme]?.button_text || "#146efa"};
}

.subdomainHomeFaq{
  article{
    .faqHead{
      color:${(props) => props.theme[props.theme.activeTheme]?.hyperlink_text_color || "#146efa"};
    }
  }
}
// start code for footer section here ===========================
.sd-footer-theme{
  background-color:${(props) => props.theme[props.theme.activeTheme]?.footer_background_color || "#121212"}
}

.sd-copyright, .sd-powered-text{
  font-size: 80%;
  font-weight: normal;
  color:${(props) => props.theme[props.theme.activeTheme]?.footer_text_color || "#f1f1f1"};
  a{
    color:${(props) => props.theme[props.theme.activeTheme]?.footer_link_color || "#f1f1f1"};
    &:hover{
      color:${(props) => props.theme[props.theme.activeTheme]?.footer_link_hover_color || "#146efa"};
    }
  }
  // end code for footer section here ===========================
  @media only screen and (max-width: 500px) {
    .heading{
      font-size:20px;
    }
  }
`;

export const MenuWraper = styled(SubDomainHeader)`
  background-color: '#ffffff';
`;
