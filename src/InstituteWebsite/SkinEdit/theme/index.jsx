import styled, { createGlobalStyle } from "styled-components";
export const EditStyleInstitute = createGlobalStyle`

*{
  @import url(${(props) => props.theme.clonetheme.regular_body_fonturl});
    @import url(${(props) => props.theme.clonetheme.heading_sub_fonturl});
    
    a{
      font-family: ${(props) =>
    props.theme.clonetheme.regular_body_font || "manrope"};
      color:${(props) => props.theme.clonetheme.menu_text_color || "#121212"};
      
      &:hover{
        color:${(props) =>
    props.theme.clonetheme.hyperlink_hover_color || "#0A0A0A"};
      }
    }
    
}
html {
  --scrollbarBG: rgba(${(props) => props.theme[props.theme.activeTheme].regular_text_color || "#0A0A0A"}, .5);
  --thumbBG: ${(props) => props.theme[props.theme.activeTheme].hyperlink_text_color || "#EBC05E"};
}

.SkinPreviewWrapper{
  background-color:${(props) =>
    props.theme.clonetheme.website_background || "#F6F6F6"};
    

   .button{
    background-color:${(props) =>
    props.theme.clonetheme.button_background || "#EBC05E"};
    color:${(props) => props.theme.clonetheme.button_text || "#0A0A0A"};

    &:hover{
      background-color:${(props) =>
    props.theme.clonetheme.button_hover_background || "#0A0A0A"};
      color:${(props) =>
    props.theme.clonetheme.button_hover_text_color || "#FFFFFF"};
    
    }
  }
h1, h2, h3{
  font-family: ${(props) => props.theme.clonetheme.heading_sub_font || "manrope"};
  font-size:${(props) => (props.theme.clonetheme.heading && props.theme.clonetheme.heading.size) || "23px"};
  font-weight:${(props) => (props.theme.clonetheme.heading && props.theme.clonetheme.heading.text_type) || "700"};
  color:${(props) => props.theme.clonetheme.heading_text_color || "#0A0A0A"};
  line-height:${(props) => props.theme.clonetheme.heading_line_height || "20px"};
  letter-spacing:${(props) => props.theme.clonetheme.heading_letter_spacing || "0"};
}
.heading{
  font-family: ${(props) => props.theme.clonetheme.heading_sub_font || "manrope"};
  font-size:${(props) => (props.theme.clonetheme.heading && props.theme.clonetheme.heading.size) || "23px"};
  font-weight:${(props) => (props.theme.clonetheme.heading && props.theme.clonetheme.heading.text_type) || "700"};
  color:${(props) => props.theme.clonetheme.heading_text_color || "#0A0A0A"};
  line-height:${(props) => props.theme.clonetheme.heading_line_height || "20px"};
  letter-spacing:${(props) => props.theme.clonetheme.heading_letter_spacing || "0"};
}

    p{
      font-family: ${(props) =>
    props.theme.clonetheme.regular_body_font || "manrope"};
      font-size:${(props) =>
    (props.theme.clonetheme.body_text &&
      props.theme.clonetheme.body_text.size) ||
    "23px"};
      font-weight:${(props) =>
    (props.theme.clonetheme.body_text &&
      props.theme.clonetheme.body_text.text_type) ||
    "700"};
      color:${(props) => props.theme.clonetheme.regular_text_color || "#0A0A0A"};
      line-height:${(props) => props.theme.clonetheme.regular_line_height || "20px"};
      letter-spacing:${(props) => props.theme.clonetheme.regular_letter_spacing || "0"};

    }

    
}

// start code for header section here ===========================

.headerBackground{
  background-color:${(props) =>
    props.theme.clonetheme.header_background || "#0A0A0A"};
}

.subheader-sidepreview{

    font-family: ${(props) =>
    props.theme.clonetheme.heading_sub_font || "manrope"};
    font-size:${(props) =>
    (props.theme.clonetheme.sub_heading &&
      props.theme.clonetheme.sub_heading.size) ||
    "23px"};
    font-weight:${(props) =>
    (props.theme.clonetheme.sub_heading &&
      props.theme.clonetheme.sub_heading.text_type) ||
    "700"};
    color:${(props) =>
    props.theme.clonetheme.sub_heading_text_color || "#F17013"}
}
.nav-tab-menu-scroll{
  background-color:${(props)=>props.theme.clonetheme.menu_background || "#0A0A0A"}
}
.sd-menuItem{
  li{
    color:${(props) => props.theme.clonetheme.menu_text_color || "#EBC05E"};
    font-family:${(props) => props.theme.clonetheme.regular_body_font || "Manrope"};
    &:hover{
      color:${(props) => props.theme.clonetheme.menu_hover_text_color || "#FFFFFF"};
    }
  }
}
// end code for header section here ===========================
.sd-contact-display{
  span{
    color:${(props) => props.theme.clonetheme.hyperlink_text_color || "#EBC05E"};
    &:hover{
      color:${(props) => props.theme.clonetheme.hyperlink_hover_color || "#0A0A0A"};
    }
  }    
}
.PTH-Item.secHeadWrap{
   & p{
      font-family: ${(props) => props.theme.clonetheme.subheading_sub_font || 'manrope'};
      font-size:${(props) => (props.theme.clonetheme.sub_heading && props.theme.clonetheme.sub_heading.size) || "23px"};
      font-weight:${(props) => (props.theme.clonetheme.sub_heading && props.theme.clonetheme.sub_heading.text_type) || "300"};
      color:${(props) =>  props.theme.clonetheme.sub_heading_text_color || "#F17013"};
      line-height:${(props) => props.theme.clonetheme.subheading_line_height || "20px"};
      letter-spacing:${(props) => props.theme.clonetheme.subheading_letter_spacing || "2px"};
  }
}


.bottomNavArrowLeft{
  & .arrowcustom {
    border-color:  ${(props) => props.theme.clonetheme.menu_hover_text_color || "#121212"};    
    &:hover{
      border-color: ${(props) => props.theme.clonetheme.menu_text_color || "#146efa"};
    }
  }
}
.bottomNavArrowRight{
  & .arrowcustom {
    border-color:  ${(props) => props.theme.clonetheme.menu_hover_text_color || "#121212"};    
    &:hover{
      border-color ${(props) => props.theme.clonetheme.menu_text_color || "#146efa"};
    }
  }
}


.sd-header-theme{
  background-color:${(props) =>
    props.theme.clonetheme.header_background || "#ffffff"};
}

button.btnText.w-500 {
  &.previewconatectDetailsBtn{
      background-color:${(props) => props.theme.clonetheme.button_background || "#EBC05E"};
      color:${(props) => props.theme.clonetheme.button_text || "#0A0A0A"};

      &::after{
         border:  solid ${(props) => props.theme.clonetheme.button_text || "#ffffff"};
         border-width: 0 2px 2px 0;
      }
    }
}
.circle_previewleftpngimag{
  background-color:${(props) => props.theme.clonetheme.circle_background_image || "#146efa"};
}
span.previewiconlineone{
  background-color:${(props) => props.theme.clonetheme.circle_background_line || "#146efa "};

}
.small_circle_blackpreview{
  background-color:${(props) => props.theme.clonetheme.circle_background_line || "#146efa"};
}
.verysmall_circle_blackpreview{
  background-color:${(props) => props.theme.clonetheme.circle_background_line || "#146efa"};
}
// button{
//  &.btnText {}}

// start code for footer section here ===========================
.sd-footer-theme{
  background-color:${(props) => props.theme.clonetheme.footer_background_color || "#121212"};
  color:${(props) => props.theme.clonetheme.footer_text_color || "#F1F1F1 "};
  a{
    color:${(props) => props.theme.clonetheme.footer_link_color || "#F1F1F1 "};
    &:hover{
    color:${(props) => props.theme.clonetheme.footer_link_hover_color || "#146EFA "};
  }
}
}
// end code for footer section here ===========================
`;

