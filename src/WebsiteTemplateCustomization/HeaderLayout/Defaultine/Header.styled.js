import styled from 'styled-components'

export const StyledHeader = styled.header`
       
 z-index: 99;     
 background-color: transparent;
 background-color: ${({ theme }) => theme.Header.Background}; 
 position: relative;
        &.sticky{
                background-color: ${({ theme }) => theme.Header.Background}; 
     
                     
 position: fixed;
 width: 100%;
 top: 0;
    animation: headerSticky .95s ease forwards;
    box-shadow: 0px 3px 9px rgb(0 0 0 / 5%);
        }
        @keyframes headerSticky {
                0% {
                  transform: translateY(-100%); }
                100% {
                  transform: translateY(0); } }
              
        `


export const Nav = styled.nav`
        display: grid;
        align-items: center;
        grid-template-columns: 180px 65% auto;
        padding: 16px 0;

        @media (max-width: ${({ theme }) => theme.mobile}) {

        }
        `
export const NavAuth = styled.div`
        display: flex;
        align-items: center;
        justify-content: flex-end;
        button{
        margin-right: 16px;
        &:last-child{
        margin-right: 0;
        }
        }
        @media (max-width: ${({ theme }) => theme.mobile}) {

        }
        `

export const LogoWrapper = styled.a`
        display: flex;
        align-items: center;
        gap: 10px;
        @media (max-width: ${({ theme }) => theme.mobile}) {
        flex-direction: column;
        }
        `
export const Logo = styled.div`
        width: ${({ theme }) => theme.Header.Logo.Width};
        height: ${({ theme }) => theme.Header.Logo.Height};
        &.sticky{
                width:56px;
                height: 56px;
        }
        @media (max-width: ${({ theme }) => theme.mobile}) {

        }
        img{
        width: 100%;
        }
        `

export const LogoText = styled.div`
display: block;
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
        // text-transform: ${({ theme }) => theme.Header.h4.TextTransform};
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
        // text-transform: ${({ theme }) => theme.Header.h5.TextTransform};
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
        &:active {
        background: ${({ theme }) => theme.Header.NavAuth.ButtonLogin.Active.Background};
        color: ${({ theme }) => theme.Header.NavAuth.ButtonLogin.Active.Color};
        border: 1px solid ${({ theme }) => theme.Header.NavAuth.ButtonLogin.Active.BorderColor};
        -webkit-transition-duration: 700ms;
        -moz-transition-duration: 700ms;
        -o-transition-duration: 700ms;
        transition-duration: 700ms;
        }
        &:focus {
        box-shadow: #fff 0px 0px 0px 2px, #36327e 0px 0px 0px 3px, #36327e 0px 0px 0px 0px;
        }
        @media (max-width: ${({ theme }) => theme.mobile}) {

        }`
export const Buttonsignup = styled.button`
        
        font-weight: ${({ theme }) => theme.Header.NavAuth.ButtonSignup.FontWeight};
        font-size: ${({ theme }) => theme.Header.NavAuth.ButtonSignup.FontSize};
        line-height: ${({ theme }) => theme.Header.NavAuth.ButtonSignup.LineHeight};
        background: ${({ theme }) => theme.Header.NavAuth.ButtonSignup.Background};
        border: 1px solid ${({ theme }) => theme.Header.NavAuth.ButtonSignup.BorderColor};
        border-radius: 24px;
        color: ${({ theme }) => theme.Header.NavAuth.ButtonSignup.Color};
        padding: 8px 24px;
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
        &:active {
        background: ${({ theme }) => theme.Header.NavAuth.ButtonSignup.Active.Background};
        color: ${({ theme }) => theme.Header.NavAuth.ButtonSignup.Active.Color};
        border: 1px solid ${({ theme }) => theme.Header.NavAuth.ButtonSignup.Active.BorderColor};
        -webkit-transition-duration: 700ms;
        -moz-transition-duration: 700ms;
        -o-transition-duration: 700ms;
        transition-duration: 700ms;
        }
        &:focus {
        box-shadow: #fff 0px 0px 0px 2px, #36327e 0px 0px 0px 3px, #36327e 0px 0px 0px 0px;
        }
        @media (max-width: ${({ theme }) => theme.mobile}) {

        }`



export const NavMenuWrapper = styled.div`
/*  background: ${({ theme }) => theme.Header.NavMenuWrapper.Background};
    background: #201C70; */
        @media (max-width: ${({ theme }) => theme.mobile}) {

        }
        `
export const NavMenuCustom = styled.div`
        
        padding: 14px 24px;
        position: relative;
button{
        background-color: transparent;
        outline: none;
        border: none;
        cursor: pointer;
}
        a,button{
                white-space: nowrap;
                cursor: pointer;
                display: flex;
                flex: 0 0 auto;
                padding: 0 20px;
        font-weight: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.FontWeight};
        font-size: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.FontSize};
        font-family: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.FontFamily};
        line-height: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.LineHeight};
        letter-spacing: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.LetterSpacing};
        color: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.Color};
        &.active{
                color: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.Active.Color};
                font-weight: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.Active.FontWeight}; 
                }
        &:hover{
        color: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.Hover.Color};
        }
        
        }
    



        @media (max-width: ${({ theme }) => theme.mobile}) {

        }
        `

