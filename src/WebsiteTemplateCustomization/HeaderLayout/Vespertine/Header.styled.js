import styled from 'styled-components';
export const StyledHeader = styled.header`
        background-color: ${({ theme }) => theme.Header.Background};
        z-index:99;
        position: relative;
        `
export const NavMenuWrapperDropdown = styled.div`
        margin: auto;
        overflow-y: auto;
        white-space: nowrap;
        &::-webkit-scrollbar {
        background: transparent; /* make scrollbar transparent */
        -webkit-appearance: none;
        width: 0;
        height: 0;
        }
        /* -webkit-overflow-scrolling: touch; seems to confine overflow in error  */
        button{
                background-color: transparent;
                outline: none;
                border: none;
                cursor: pointer;
                &.menuPrevClass{
                        
                position: absolute;
                left: 0;
                top:18px;
                width: 0.6rem;
                height: 0.6rem;
                border-right: 2px solid ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.NavMenuScrollIcon.BorderColor};
                border-bottom: 2px solid ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.NavMenuScrollIcon.BorderColor};
                -webkit-transform: rotate(135deg);
                -ms-transform: rotate(135deg);
                transform: rotate(135deg);
                -webkit-transform: rotate(135deg);
                &:hover{
                border-right: 2px solid ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.NavMenuScrollIcon.Hover.BorderColor};
                border-bottom: 2px solid ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.NavMenuScrollIcon.Hover.BorderColor};
                }
                }
        &.menuNextClass{
                
        position: absolute;
        left: auto;
        top:18px;
        right: 0;
        width: 0.6rem;
        height: 0.6rem;
        border-right: 2px solid ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.NavMenuScrollIcon.BorderColor};
        border-bottom: 2px solid ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.NavMenuScrollIcon.BorderColor};
        -webkit-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        &:hover{
        border-right: 2px solid ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.NavMenuScrollIcon.Hover.BorderColor};
        border-bottom: 2px solid ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.NavMenuScrollIcon.Hover.BorderColor};
        }
        }
        }
        .nav{
        display: table; /*white-space fix*/
        max-width: 100%;
        margin:auto;
        text-align: start;
        word-spacing: -9em; /*white-space fix*/
        a {
                font-weight: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.FontWeight};
                font-size: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.FontSize};
                line-height: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.LineHeight};
                color: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.Color};
                font-family: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.FontFamily};
                display: block;
                padding: 13px 20px;
                border: none;
                text-decoration: none;
                white-space: nowrap;
                position: relative;
                &:hover{
                color: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.Hover.Color};
                }
        }
        ul {
                position: absolute;
                z-index: 104;
                left: -999em;
                top: 0;
                opacity: 0;
                transition: opacity 0.5s, left 0s 0.5s, top 0.5s;
        }
        li{
        display: inline-block;
        text-align: left;
        word-spacing: normal;

        &:hover > .dropdown {
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        left: auto;
        top: auto;
        opacity: 1;
        transition: opacity 0.5s linear, top 0.5s;
        display: flex;
        justify-content: center;
        flex-direction: column;
        border-radius:8px;
        width: 200px;
        padding: 13px 18px;
        background: #FFFFFF;
                a{
                background: #FFFFFF;
                padding:8px 17px;
                color:#202020;
                &:hover{
                color: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.Hover.Color};
                }
                }
        }
        }
        li > a {
        position: relative;
        }
        .nav li li {
        display: block;
        }
        .nav a {
        display: block;
        padding: 7px 10px;
        background: red;
        color: #fff;
        border: 1px solid #000;
        text-decoration: none;
        white-space: nowrap;
        position: relative;
        }
        }
`
export const Nav = styled.nav`
display: grid;
grid-template-columns: auto 1fr;
align-items: center;
        padding: 16px 0;
        @media screen and (max-width: 468px) {
               
                h4{
                       grid-column: 1/3;
                       display: -webkit-box;
                       -webkit-line-clamp: 1;
                       -webkit-box-orient: vertical;
                       overflow: hidden;
                }
               }
        @media screen and (max-width: 320px) {
                flex-direction: column;
        }
        `
export const NavAuth = styled.div`
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 16px;
        @media (max-width: ${({ theme }) => theme.mobile}) {

        }
        .ButtonLoginAppLink{
                font-weight: ${({ theme }) => theme.Header.NavAuth.ButtonLogin.FontWeight};
                font-size: ${({ theme }) => theme.Header.NavAuth.ButtonLogin.FontSize};
                line-height: ${({ theme }) => theme.Header.NavAuth.ButtonLogin.LineHeight};
                background: ${({ theme }) => theme.Header.NavAuth.ButtonLogin.Background};
                border: 1px solid ${({ theme }) => theme.Header.NavAuth.ButtonLogin.BorderColor};
                border-radius: ${({ theme }) => theme.Header.NavAuth.ButtonLogin.BorderRadius};
                color: ${({ theme }) => theme.Header.NavAuth.ButtonLogin.Color};
                padding: ${({ theme }) => theme.Header.NavAuth.ButtonLogin.PaddingY} ${({ theme }) => theme.Header.NavAuth.ButtonLogin.PaddingX};
                cursor: pointer;
                &:hover{
                background: ${({ theme }) => theme.Header.NavAuth.ButtonLogin.Hover.Background};
                color: ${({ theme }) => theme.Header.NavAuth.ButtonLogin.Hover.Color};
                border: 1px solid ${({ theme }) => theme.Header.NavAuth.ButtonLogin.Hover.BorderColor};
                -webkit-transition-duration: 700ms;
                -moz-transition-duration: 700ms;
                -o-transition-duration: 700ms;
                transition-duration: 700ms;
                }
                @media (max-width: ${({ theme }) => theme.mobile}) {
        
                }
        }
        `

export const LogoWrapper = styled.a`
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        gap: 10px;
        @media (max-width: ${({ theme }) => theme.mobile}) {
        flex-direction: column;
        }
        `
export const Logo = styled.div`
        min-width: ${({ theme }) => theme.Header.Logo.Width};
        min-height: ${({ theme }) => theme.Header.Logo.Height};
        max-width: 210px;
        max-height: ${({ theme }) => theme.Header.Logo.Height};
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        @media (max-width: ${({ theme }) => theme.mobile}) {

        }
        img{
        width: 100%;
        height: 100%;
        text-align: center;
        }
        `

export const LogoText = styled.div`

        @media (max-width: ${({ theme }) => theme.mobile}) {

        }`
export const LogoTextPrimary = styled.h4`
        
        font-weight: ${({ theme }) => theme.Header.h4.FontWeight};
        font-size: ${({ theme }) => theme.Header.h4.FontSize};
        line-height: ${({ theme }) => theme.Header.h4.LineHeight};
        font-style: ${({ theme }) => theme.Header.h4.FontStyle};
        font-family: ${({ theme }) => theme.Header.h4.FontFamily};
        letter-spacing: ${({ theme }) => theme.Header.h4.LetterSpacing};
        color: ${({ theme }) => theme.Header.h4.Color};
        text-alignment: ${({ theme }) => theme.Header.h4.TextAlignemnt};
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        @media (max-width: ${({ theme }) => theme.mobile}) {

        }`
export const LogoTextSecondary = styled.h5`
        
        font-weight: ${({ theme }) => theme.Header.h5.FontWeight};
        font-size: ${({ theme }) => theme.Header.h5.FontSize};
        line-height: ${({ theme }) => theme.Header.h5.LineHeight};
        font-style: ${({ theme }) => theme.Header.h5.FontStyle};
        font-family: ${({ theme }) => theme.Header.h5.FontFamily};
        letter-spacing: ${({ theme }) => theme.Header.h5.LetterSpacing};
        color: ${({ theme }) => theme.Header.h5.Color};
        text-transform: ${({ theme }) => theme.Header.h5.TextTransform};
        text-alignment: ${({ theme }) => theme.Header.h5.TextAlignemnt};
        @media (max-width: ${({ theme }) => theme.mobile}) {

        }`
export const ButtonLogin = styled.button`
        
        font-weight: ${({ theme }) => theme.Header.NavAuth.ButtonLogin.FontWeight};
        font-size: ${({ theme }) => theme.Header.NavAuth.ButtonLogin.FontSize};
        line-height: ${({ theme }) => theme.Header.NavAuth.ButtonLogin.LineHeight};
        background: ${({ theme }) => theme.Header.NavAuth.ButtonLogin.Background};
        border: 1px solid ${({ theme }) => theme.Header.NavAuth.ButtonLogin.BorderColor};
        border-radius: ${({ theme }) => theme.Header.NavAuth.ButtonLogin.BorderRadius};
        color: ${({ theme }) => theme.Header.NavAuth.ButtonLogin.Color};
        padding: ${({ theme }) => theme.Header.NavAuth.ButtonLogin.PaddingY} ${({ theme }) => theme.Header.NavAuth.ButtonLogin.PaddingX};
        cursor: pointer;
        &:hover{
        background: ${({ theme }) => theme.Header.NavAuth.ButtonLogin.Hover.Background};
        color: ${({ theme }) => theme.Header.NavAuth.ButtonLogin.Hover.Color};
        border: 1px solid ${({ theme }) => theme.Header.NavAuth.ButtonLogin.Hover.BorderColor};
        -webkit-transition-duration: 700ms;
        -moz-transition-duration: 700ms;
        -o-transition-duration: 700ms;
        transition-duration: 700ms;
        }
        @media (max-width: ${({ theme }) => theme.mobile}) {

        }`

export const ButtonSignup = styled.button`
        
        font-weight: ${({ theme }) => theme.Header.NavAuth.ButtonSignup.FontWeight};
        font-size: ${({ theme }) => theme.Header.NavAuth.ButtonSignup.FontSize};
        line-height: ${({ theme }) => theme.Header.NavAuth.ButtonSignup.LineHeight};
        background: ${({ theme }) => theme.Header.NavAuth.ButtonSignup.Background};
        border: 1px solid ${({ theme }) => theme.Header.NavAuth.ButtonSignup.BorderColor};
        border-radius: ${({ theme }) => theme.Header.NavAuth.ButtonSignup.BorderRadius};
        color: ${({ theme }) => theme.Header.NavAuth.ButtonSignup.Color};
        padding: ${({ theme }) => theme.Header.NavAuth.ButtonSignup.PaddingY} ${({ theme }) => theme.Header.NavAuth.ButtonSignup.PaddingX};
        cursor: pointer;
        &:hover{
        background: ${({ theme }) => theme.Header.NavAuth.ButtonSignup.Hover.Background};
        color: ${({ theme }) => theme.Header.NavAuth.ButtonSignup.Hover.Color};
        border: 1px solid ${({ theme }) => theme.Header.NavAuth.ButtonSignup.Hover.BorderColor};
        -webkit-transition-duration: 700ms;
        -moz-transition-duration: 700ms;
        -o-transition-duration: 700ms;
        transition-duration: 700ms;
        }
        @media (max-width: ${({ theme }) => theme.mobile}) {

        }`



export const NavMenuWrapper = styled.div`
        background: ${({ theme }) => theme.Header.NavMenuWrapper.Background};
        /* background: #201C70; */

        @media (max-width: ${({ theme }) => theme.mobile}) {

        }
        `
export const NavMenuCustom = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 14px 0;
        position: relative;

        button{
                background-color: transparent;
                outline: none;
                border: none;
                cursor: pointer;
               
        }
        .style_InOverflowMenu__1Xzy4{
                color: ${({ theme }) => theme.Header.NavMenuWrapper.Background};
        }
        a,button{
                white-space: nowrap;
                cursor: pointer;
                display: flex;
                flex: 0 0 auto;
                padding: 0 20px;
        font-weight: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.FontWeight};
        font-size: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.FontSize};
        line-height: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.LineHeight};
        color: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.Color};
        font-family: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.FontFamily};
        &:first-child{
                padding-left: 0;
        }
        &::last-child{
                padding-right: 0;
        }
        &.active{
                color: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.Hover.Color}; 
        }
        &:hover{
        color: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.Hover.Color};
        }
        
        }



        @media (max-width: ${({ theme }) => theme.mobile}) {

        }
        `


