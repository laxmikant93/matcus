import styled, { createGlobalStyle } from "styled-components";
export const EditStyleInstitute = createGlobalStyle`;

@import url(${(props) => props.theme.activeSidetheme.regular_body_fonturl});
@import url(${(props) => props.theme.activeSidetheme.heading_sub_fonturl});

html {
  --scrollbarBG: rgba(${(props) => props.theme[props.theme.activeTheme].regular_text_color || "#ffffff"}, .5);
  --thumbBG: ${(props) => props.theme[props.theme.activeTheme].hyperlink_text_color || "#146efa"};
}
a{
  font-family: ${(props) => props.theme.activeSidetheme.regular_body_font || "manrope"};
  color:${(props) => props.theme.activeSidetheme.menu_text_color || "#146efa"};  
  &:hover{
    color:${(props) => props.theme.activeSidetheme.hyperlink_hover_color || "#146efa"};
  }
}

.SkinPreviewWrapper{
  background-color:${(props) =>
    props.theme.activeSidetheme.website_background || "#ffffff"};
    

   .button{
    background-color:${(props) =>
    props.theme.activeSidetheme.button_background || "#146efa"};
    color:${(props) => props.theme.activeSidetheme.button_text || "#ffffff"};

    &:hover{
      background-color:${(props) =>
    props.theme.activeSidetheme.button_hover_background || "#146efa"};
      color:${(props) =>
    props.theme.activeSidetheme.button_hover_text_color || "#ffffff"};
    
    }
  }
h1, h2, h3, .heading{
  font-family: ${(props) => props.theme.activeSidetheme.heading_sub_font || "manrope"};
  font-size:${(props) => (props.theme.activeSidetheme.heading && props.theme.activeSidetheme.heading.size) || "23px"};
  font-weight:${(props) => (props.theme.activeSidetheme.heading && props.theme.activeSidetheme.heading.text_type) || "700"};
  color:${(props) => props.theme.activeSidetheme.heading_text_color || "#121212"};
  line-height:${(props) => props.theme.activeSidetheme.heading_line_height || "1.25"};
  letter-spacing:${(props) => props.theme.activeSidetheme.heading_letter_spacing || "0"};
}

    p{
      font-family: ${(props) =>
    props.theme.activeSidetheme.regular_body_font || "manrope"};
      font-size:${(props) =>
    (props.theme.activeSidetheme.body_text &&
      props.theme.activeSidetheme.body_text.size) ||
    "23px"};
      font-weight:${(props) =>
    (props.theme.activeSidetheme.body_text &&
      props.theme.activeSidetheme.body_text.text_type) ||
    "700"};
      color:${(props) => props.theme.activeSidetheme.regular_text_color || "#121212"};
      line-height:${(props) => props.theme.activeSidetheme.regular_line_height || "1.25"};
      letter-spacing:${(props) => props.theme.activeSidetheme.regular_letter_spacing || "0"};

    }

    
}

// start code for header section here ===========================

.headerBackground{
  background-color:${(props) =>
    props.theme.activeSidetheme.header_background || "#ffffff"};
}

.subheader-sidepreview{

    font-family: ${(props) =>
    props.theme.activeSidetheme.heading_sub_font || "Manrope"};
    font-size:${(props) =>
    (props.theme.activeSidetheme.sub_heading &&
      props.theme.activeSidetheme.sub_heading.size) ||
    "23px"};
    font-weight:${(props) =>
    (props.theme.activeSidetheme.sub_heading &&
      props.theme.activeSidetheme.sub_heading.text_type) ||
    "700"};
    color:${(props) =>
    props.theme.activeSidetheme.sub_heading_text_color || "#121212"}
}

.sd-menuItem{
  li{
    font-family:${(props) => props.theme.activeSidetheme.regular_body_font || "Manrope"};
    color:${(props) => props.theme.activeSidetheme.menu_text_color || "#121212"};
    &:hover{
      color:${(props) => props.theme.activeSidetheme.menu_hover_text_color || "#146efa"}
    }
  }
}
// end code for header section here ===========================
.PTH-Item.secHeadWrap{
   & p{
    font-family: ${(props) =>
    props.theme.activeSidetheme.subheading_sub_font || 'manrope'};
    font-size:${(props) =>
    (props.theme.activeSidetheme.sub_heading &&
      props.theme.activeSidetheme.sub_heading.size) ||
    "23px"};
    font-weight:${(props) =>
    (props.theme.activeSidetheme.sub_heading &&
      props.theme.activeSidetheme.sub_heading.text_type) ||
    "300"};
    color:${(props) =>
    props.theme.activeSidetheme.sub_heading_text_color || "#121212"};
    line-height:${(props) => props.theme.activeSidetheme.subheading_line_height || "1.25"};
    letter-spacing:${(props) => props.theme.activeSidetheme.subheading_letter_spacing || "0"};
  }
}


.bottomNavArrowLeft{
  & .arrowcustom {
    border-color:  ${(props) => props.theme.activeSidetheme.menu_hover_text_color || "#121212"};    
    &:hover{
      border-color: ${(props) => props.theme.activeSidetheme.menu_text_color || "#146efa"};
    }
  }
}
.bottomNavArrowRight{
  & .arrowcustom {
    border-color:  ${(props) => props.theme.activeSidetheme.menu_hover_text_color || "#121212"};    
    &:hover{
      border-color ${(props) => props.theme.activeSidetheme.menu_text_color || "#146efa"};
    }
  }
}


.sd-header-theme{
  background-color:${(props) =>
    props.theme.activeSidetheme.header_background || "#ffffff"};
}

button.btnText.w-500 {
  &.previewconatectDetailsBtn{
      background-color:${(props) => props.theme.activeSidetheme.button_background || "#146efa"};
      color:${(props) => props.theme.activeSidetheme.button_text || "#ffffff"};

      &::after{
         border:  solid ${(props) => props.theme.activeSidetheme.button_text || "#ffffff"};
         border-width: 0 2px 2px 0;
      }
    }
}
.sd-contact-display{
  span{
    color:${(props) => props.theme.activeSidetheme.hyperlink_text_color || "#146efa"};
    &:hover{
      color:${(props) => props.theme.activeSidetheme.hyperlink_hover_color || "#146efa"};
    }
  }    
}
.circle_previewleftpngimag{
  background-color:${(props) => props.theme.activeSidetheme.circle_background_image || "#146efa"};
}
span.previewiconlineone{
  background-color:${(props) => props.theme.activeSidetheme.circle_background_line || "#146efa"};

}
.small_circle_blackpreview{
  background-color:${(props) => props.theme.activeSidetheme.circle_background_line || "#146efa"};
}
.verysmall_circle_blackpreview{
  background-color:${(props) => props.theme.activeSidetheme.circle_background_line || "#146efa"};
}
// button{
//  &.btnText {}}

// start code for footer section here ===========================
.sd-footer-theme{
  background-color:${(props) => props.theme.activeSidetheme.footer_background_color || "#121212"};
  color:${(props) => props.theme.activeSidetheme.footer_text_color || "#f1f1f1"};
  a{
    color:${(props) => props.theme.activeSidetheme.footer_link_color || "#f1f1f1"};
    &:hover{
    color:${(props) => props.theme.activeSidetheme.footer_link_hover_color || "#146efa"};
  }
}
}
// end code for footer section here ===========================
`;

