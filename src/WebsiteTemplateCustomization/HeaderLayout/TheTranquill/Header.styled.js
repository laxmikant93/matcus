import styled from 'styled-components'
import EmailIcon from "../../assets/TheTranquill/email-icon.svg";
import PhoneIcon from "../../assets/TheTranquill/phone-icon.svg";
import AddressIcon from "../../assets/TheTranquill/address-icon.svg";

export const StyledHeader = styled.header`
        background-color: ${({ theme }) => theme.Header.Background};
        `


export const Nav = styled.nav`
        display: grid;
                grid-template-columns: 1fr 2fr auto;
                align-items: center;
                gap: 32px;
        padding: 16px 0;
        @media screen and (max-width: 468px) {
                display: grid;
                grid-template-columns: 1fr auto;
                align-items: center;
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
        justify-content: space-between;
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
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        gap: 10px;
        @media (max-width: ${({ theme }) => theme.mobile}) {
        flex-direction: column;
        }
        `
export const Logo = styled.div`
        // width: ${({ theme }) => theme.Header.Logo.Width};
        // height: ${({ theme }) => theme.Header.Logo.Height};
        min-width: 84px;
        max-width: 210px;
        min-height: 42px;
        max-height: 62px;
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
        min-width: 100%;
        max-width: 100%;
        min-height: 100%;
        max-height: 100%;
        text-align: center;
        object-fit: contain;
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
        text-transform: ${({ theme }) => theme.Header.h4.TextTransform};
        text-alignment: ${({ theme }) => theme.Header.h4.TextAlignemnt};
        display: -webkit-box;
        -webkit-line-clamp: 2;
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
export const NavContactWrap = styled.ul`
display: grid;
grid-template-columns: auto auto;
align-items: flex-start;
justify-content: flex-end;
gap: 36px;
        `
export const NavContactWrapItem = styled.li`
display: grid;
grid-template-columns: auto 1fr;
gap: 8px;
.phone-icon{
 width: 40px;
  height: 40px;
  display: block;
  cursor: pointer;
  background-color: #006f9c;
  -webkit-mask: url(${PhoneIcon}) no-repeat center;
  mask-image: url(${PhoneIcon}) no-repeat center;
}
.email-icon{
        width: 40px;
        height: 40px;
  display: block;
  cursor: pointer;
  background-color: #006f9c;
  -webkit-mask: url(${EmailIcon}) no-repeat center;
  mask-image: url(${EmailIcon}) no-repeat center;
}
.address-icon{
        width: 40px;
        height: 40px;
  display: block;
  cursor: pointer;
  background-color: #006f9c;
  -webkit-mask: url(${AddressIcon}) no-repeat center;
  mask-image: url(${AddressIcon}) no-repeat center;
}
h6{
        font-weight: ${({ theme }) => theme.Header.h6.FontWeight};
        font-size: ${({ theme }) => theme.Header.h6.FontSize};
        line-height: ${({ theme }) => theme.Header.h6.LineHeight};
        font-style: ${({ theme }) => theme.Header.h6.FontStyle};
        font-family: ${({ theme }) => theme.Header.h6.FontFamily};
        letter-spacing: ${({ theme }) => theme.Header.h6.LetterSpacing};
        color: ${({ theme }) => theme.Header.h6.Color};
        text-transform: ${({ theme }) => theme.Header.h6.TextTransform};
        text-alignment: ${({ theme }) => theme.Header.h6.TextAlignemnt};
      
}
a, p{
        font-weight: ${({ theme }) => theme.Header.p.FontWeight};
        font-size: ${({ theme }) => theme.Header.p.FontSize};
        line-height: ${({ theme }) => theme.Header.p.LineHeight};
        font-style: ${({ theme }) => theme.Header.p.FontStyle};
        font-family: ${({ theme }) => theme.Header.p.FontFamily};
        letter-spacing: ${({ theme }) => theme.Header.p.LetterSpacing};
        color: ${({ theme }) => theme.Header.p.Color};
        text-transform: ${({ theme }) => theme.Header.p.TextTransform};
        text-alignment: ${({ theme }) => theme.Header.p.TextAlignemnt};
     
}
`
export const ItemInnerContent = styled.li`
`
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
        background: ${({ theme }) => theme.Header.NavMenuWrapper.Background};
        /* background: #201C70; */

        @media (max-width: ${({ theme }) => theme.mobile}) {

        }
        `
export const NavMenuWrapperContainer = styled.div`
display: grid;
grid-template-columns: 75% auto;
gap:32px;
padding: 8px 0;
position:relative;
&.Active{
        grid-template-columns: 100%;
}
@media screen and (max-width: 768px) {
        grid-template-columns: 100%;
        }
`
export const BookAppoinmentButton = styled.button`
        position:relative;
        font-weight: ${({ theme }) => theme.Header.NavMenuWrapper.BookAppoinmentButton.FontWeight};
        font-size: ${({ theme }) => theme.Header.NavMenuWrapper.BookAppoinmentButton.FontSize};
        line-height: ${({ theme }) => theme.Header.NavMenuWrapper.BookAppoinmentButton.LineHeight};
        background: ${({ theme }) => theme.Header.NavMenuWrapper.BookAppoinmentButton.Background};
        border: 1px solid ${({ theme }) => theme.Header.NavMenuWrapper.BookAppoinmentButton.BorderColor};
        border-radius: ${({ theme }) => theme.Header.NavMenuWrapper.BookAppoinmentButton.BorderRadius};
        color: ${({ theme }) => theme.Header.NavMenuWrapper.BookAppoinmentButton.Color};
        padding: ${({ theme }) => theme.Header.NavMenuWrapper.BookAppoinmentButton.PaddingY} ${({ theme }) => theme.Header.NavMenuWrapper.BookAppoinmentButton.PaddingX};
        cursor: pointer;
        &:hover{
        background: ${({ theme }) => theme.Header.NavMenuWrapper.BookAppoinmentButton.Hover.Background};
        color: ${({ theme }) => theme.Header.NavMenuWrapper.BookAppoinmentButton.Hover.Color};
        border: 1px solid ${({ theme }) => theme.Header.NavMenuWrapper.BookAppoinmentButton.Hover.BorderColor};
        -webkit-transition-duration: 700ms;
        -moz-transition-duration: 700ms;
        -o-transition-duration: 700ms;
        transition-duration: 700ms;
        }
`
export const NavMenuCustom = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: 0 20px;
        button{
                background-color: transparent;
                outline: none;
                border: none;
                cursor: pointer;
                &.menuPrevClass{
                        
                position: absolute;
                left: 0;
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
        ul{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.MenuGap};
        max-width: 100%;
        overflow-x: scroll;
        scroll-behavior: smooth;
        &::-webkit-scrollbar {
        background: transparent; /* make scrollbar transparent */
        -webkit-appearance: none;
        width: 0;
        height: 0;
        }
        li{
        white-space: nowrap;
        cursor: pointer;
        &.active{
        a,button{
        color: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.Hover.Color};
        }    
        }
        a,button{
        
        font-weight: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.FontWeight};
        font-size: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.FontSize};
        line-height: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.LineHeight};
        color: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.Color};
        font-family: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.FontFamily};
        flex: none;
        order: 0;
        flex-grow: 0;
        &:hover{
        color: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.Hover.Color};
        }
        }
        }
        }



        @media (max-width: ${({ theme }) => theme.mobile}) {

        }
        `


export const BookingForm = styled.div`
        width: 368px;
        min-height:auto;
        background: #FFFFFF;
        border-radius: 8px;
        position:absolute;
        top: 53px;
    right: 0;
`

export const DropHead = styled.div`
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px 24px;
                border-bottom:1px solid #EAEAEA;
        h5{
                font-weight: 500;
                font-size: 20px;
                line-height: 30px;
                color: #202020;
        }
        button{
                position:relative;
                &.Closebtn{
                opacity: 0.3;
                background: transparent;
                border: none;
                height: 12px;
                width: 12px;
                margin-bottom: 10px;
                &:before, &:after {
                position: absolute;
                left: 0;
                content: ' ';
                height: 12px;
                width: 2px;
                background-color: #333;
                }
                &:before {
                transform: rotate(45deg);
                }
                &:after {
                transform: rotate(-45deg);
                }
                }
        }
`
export const DropBody = styled.div`
                padding: 20px 24px;
                button{
                        &.Submit-btn{
                                width:100%;
                                border:none;
                                padding:10px 24px;
                                border-radius: 4px;
                                display:block;
                                font-weight: 500;
                                font-size: 14px;
                                line-height: 21px;
                                text-align:center;
                                color:#FFFFFF;
                                background: ${({ theme }) => theme.Header.NavMenuWrapper.Background};
                        }
                }
`

export const FormFieldWrap = styled.div`
        padding-bottom:15px;
        position:relative;
`

export const TextInfo = styled.div`
        position:absolute;
        bottom:8px;
        right:0;
        small{
                font-weight: 400;
                font-size: 10px;
                line-height: 15px;
                color: rgba(32, 32, 32, 0.4); 
        }
`