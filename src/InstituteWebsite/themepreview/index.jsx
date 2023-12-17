import styled, { createGlobalStyle } from "styled-components";
import SubDomainHeader from "../../Layout/SubdomainLayout/SubDomainHeader";
export const GlobalStyleInstitute = createGlobalStyle`

*{
  @import url(${(props) => props.theme.previewTheme.regular_body_fonturl});
    @import url(${(props) => props.theme.previewTheme.heading_sub_fonturl});
    

  color:${(props) => props.theme.previewTheme.regular_text_color || "#ffffff"};
   a{
    color:${(props) => props.theme.previewTheme.hyperlink_text_color || "#146efa"};
    
    &:hover{
      color:${(props) =>
    props.theme.previewTheme.hyperlink_hover_color || "#146efa"};
    }
  }

  & button, .button{
    background-color:${(props) =>
    props.theme.previewTheme.button_background || "#146efa"};
    color:${(props) => props.theme.previewTheme.button_text || "#ffffff"};

    &:hover{
      background-color:${(props) =>
    props.theme.previewTheme.button_hover_background || "#146efa"};
      color:${(props) =>
    props.theme.previewTheme.button_hover_text_color || "#ffffff"};
    
    }
  }
}
body{
  font-family: ${(props) =>
    props.theme.previewTheme.regular_body_font || "manrope"};
    font-size:${(props) =>
    (props.theme.previewTheme.body_text &&
      props.theme.previewTheme.body_text.size) ||
    "23px"};
  font-weight:${(props) =>
    (props.theme.previewTheme.body_text &&
      props.theme.previewTheme.body_text.text_type) ||
    "700"};
  background-color:${(props) =>
    props.theme.previewTheme.website_background || "#ececec"};
}
.subdomainTopNav{
  background-color:${(props) =>
    props.theme.previewTheme.menu_background || "#ffffff"};
  & .bottomNavArrowLeft{
    background-color:${(props) =>
    props.theme.previewTheme.menu_background || "#ffffff"};
    filter:brightness(85%);
  }

  & .bottomNavArrowRight{
    background-color:${(props) =>
    props.theme.previewTheme.menu_background || "#ffffff"};
    filter:brightness(85%);
  }

  & li{
    color:${(props) => props.theme.previewTheme.menu_text_color || "#146efa"};
  }
}

.sd-header-theme{
  background-color:${(props) =>
    props.theme.previewTheme.header_background || "#ffffff"};
}
.bg-primary{
  background-color:${(props) =>
    props.theme.previewTheme.primary_background || "#146efa"};
    h3,p{
      color:${(props) =>
    props.theme.previewTheme.primary_text_color || "#ffffff"};
    }
  }
 
}
.bg-secondary{
  background-color:${(props) =>
    props.theme.previewTheme.secondary_background || "#14a032"};
    h3,p{
      color:${(props) =>
    props.theme.previewTheme.secondary_text_color || "#ffffff"};
    }
  }
 
}

}

h1, h2, h3{
  font-size:${(props) => (props.theme.previewTheme.heading && props.theme.previewTheme.heading.size) || "23px"};
  font-weight:${(props) => (props.theme.previewTheme.heading && props.theme.previewTheme.heading.text_type) || "700"};
  color:${(props) => props.theme.previewTheme.heading_text_color || "#000000"}
}

.heading{
  font-size:${(props) => (props.theme.previewTheme.heading && props.theme.previewTheme.heading.size) || "23px"};
  font-weight:${(props) => (props.theme.previewTheme.heading && props.theme.previewTheme.heading.text_type) || "700"};
  color:${(props) => props.theme.previewTheme.heading_text_color || "#000000"}
}


.sd-footer-theme{
  background-color:${(props) => props.theme.clonetheme.footer_background_color || "#121212 "};
  color:${(props) => props.theme.clonetheme.footer_text_color || "#f1f1f1 "};
  a{
    color:${(props) => props.theme.clonetheme.footer_link_color || "#f1f1f1 "};
    &:hover{
    color:${(props) => props.theme.clonetheme.footer_link_hover_color || "#146efa "};
  }
}
}



`;
