import styled from 'styled-components'

export const StyledFooter = styled.footer`
background-color: ${({ theme }) => theme.Footer.Background};
color: #fff;
padding: 42px 0 72px 0;
@media (max-width: ${({ theme }) => theme.mobile}) {

}
`
//logo section//
export const LogoWrapper = styled.a`
display: flex;
align-items: center;
gap: 10px;
@media screen and (max-width: 768px) {
flex-direction: column;
align-items: flex-start;
}
`
export const Logo = styled.div`
width: ${({ theme }) => theme.Footer.Logo.Width};
height: ${({ theme }) => theme.Footer.Logo.Height};
img{
width: 100%;
height: 100%;
object-fit: contain;
object-position: center;
background-color: ${({ theme }) => theme.Footer.Logo.Background};
border-radius: ${({ theme }) => theme.Footer.Logo.BorderRadius};
// padding: ${({ theme }) => theme.Footer.Logo.PaddingY}; ${({ theme }) => theme.Footer.Logo.PaddingX};
padding: 6px;
}
`
export const LogoText = styled.div`

@media (max-width: ${({ theme }) => theme.mobile}) {

}`
export const LogoTextPrimary = styled.h4`

font-weight: ${({ theme }) => theme.Footer.h4.FontWeight};
font-size: ${({ theme }) => theme.Footer.h4.FontSize};
line-height: ${({ theme }) => theme.Footer.h4.LineHeight};
font-style: ${({ theme }) => theme.Footer.h4.FontStyle};
font-family: ${({ theme }) => theme.Footer.h4.FontFamily};
letter-spacing: ${({ theme }) => theme.Footer.h4.LetterSpacing};
color: ${({ theme }) => theme.Footer.h4.Color};
@media (max-width: ${({ theme }) => theme.mobile}) {

}`
export const LogoTextSecondary = styled.h5`

font-weight: ${({ theme }) => theme.Footer.h5.FontWeight};
font-size: ${({ theme }) => theme.Footer.h5.FontSize};
line-height: ${({ theme }) => theme.Footer.h5.LineHeight};
font-style: ${({ theme }) => theme.Footer.h5.FontStyle};
font-family: ${({ theme }) => theme.Footer.h5.FontFamily};
letter-spacing: ${({ theme }) => theme.Footer.h5.LetterSpacing};
color: ${({ theme }) => theme.Footer.h5.Color};
@media (max-width: ${({ theme }) => theme.mobile}) {

}`
//close logo section//

// footer content section //
export const FooterContentWrapper = styled.div`
display: grid;
grid-template-columns: 2fr 3fr;
gap: 30px;
align-items: flex-start;
margin-top: 30px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
}`

export const FooterContentWrapperItem = styled.div`
`
export const ContentMenuWrap = styled.div`

@media (max-width: ${({ theme }) => theme.mobile}) {

}`
// close footer content section //

// Heading section //
export const ContentHeading = styled.h6`

font-weight: ${({ theme }) => theme.Footer.h6.FontWeight};
font-size: ${({ theme }) => theme.Footer.h6.FontSize};
line-height: ${({ theme }) => theme.Footer.h6.LineHeight};
font-style: ${({ theme }) => theme.Footer.h6.FontStyle};
font-family: ${({ theme }) => theme.Footer.h6.FontFamily};
letter-spacing: ${({ theme }) => theme.Footer.h6.LetterSpacing};
text-transform: ${({ theme }) => theme.Footer.h6.TextTransform};
color:${({ theme }) => theme.Footer.h6.Color};
margin-bottom: 10px;
@media (max-width: ${({ theme }) => theme.mobile}) {

}`
// close headeing section //

//menu list Section//
export const MenuList = styled.ul`
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 10px 20px;
      @media screen and (max-width: 468px) {
        grid-template-columns: 1fr;
      }
      `;
export const MenuListItem = styled.li`
`
export const MenuListItemLink = styled.a`

font-weight: ${({ theme }) => theme.Footer.a.FontWeight};
font-size: ${({ theme }) => theme.Footer.a.FontSize};
line-height: ${({ theme }) => theme.Footer.a.LineHeight};
font-style: ${({ theme }) => theme.Footer.a.FontStyle};
font-family: ${({ theme }) => theme.Footer.a.FontFamily};
letter-spacing: ${({ theme }) => theme.Footer.a.LetterSpacing};
color: ${({ theme }) => theme.Footer.a.Color};
&:hover{
color: ${({ theme }) => theme.Footer.a.Hover.Color};
}
@media (max-width: ${({ theme }) => theme.mobile}) {

}`
export const MenuListItemButton = styled.button`
background-color: transparent;
outline: none;
border: none;
font-weight: ${({ theme }) => theme.Footer.a.FontWeight};
font-size: ${({ theme }) => theme.Footer.a.FontSize};
line-height: ${({ theme }) => theme.Footer.a.LineHeight};
font-style: ${({ theme }) => theme.Footer.a.FontStyle};
font-family: ${({ theme }) => theme.Footer.a.FontFamily};
letter-spacing: ${({ theme }) => theme.Footer.a.LetterSpacing};
color: ${({ theme }) => theme.Footer.a.Color};
&:hover{
color: ${({ theme }) => theme.Footer.a.Hover.Color};
}
@media (max-width: ${({ theme }) => theme.mobile}) {

}`

//close menu list Section//

//map Section//
export const MapContainerWrap = styled.div`

@media (max-width: ${({ theme }) => theme.mobile}) {

}`
export const MapContainer = styled.div`
iframe{
  border-radius: 8px;
  border: none;
  height: ${({ theme }) => theme.Footer.MapContainer.Height};
  width: 100%;
}
@media (max-width: ${({ theme }) => theme.mobile}) {

}`
//close map Section//

//social media Section//

export const SocialMediaSection = styled.div`
margin-top: 32px;
@media (max-width: ${({ theme }) => theme.mobile}) {

}`
export const SocialMediaIconList = styled.div`
margin-top: 10px;
display: flex;
gap: 15px;
align-items: center;
@media screen and (max-width: 768px) {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(50px, auto));
gap: 10px;
}
@media screen and (max-width: 320px) {
  grid-template-columns: 1fr;
  }
`
export const SocialMediaIconListItem = styled.div`
width: ${({ theme }) => theme.Footer.SocialMediaIconListItem.Width};
height: ${({ theme }) => theme.Footer.SocialMediaIconListItem.Height};
cursor: pointer;
@media (max-width: ${({ theme }) => theme.mobile}) {

}`

//close social media Section//

//copyright Section//

export const CopyrightSection = styled.div`
margin-top: 10px;
@media (max-width: ${({ theme }) => theme.mobile}) {

}`
export const CopyrightSectionItem = styled.p`
font-weight: ${({ theme }) => theme.Footer.CopyrightSectionItem.FontWeight};
font-size: ${({ theme }) => theme.Footer.CopyrightSectionItem.FontSize};
line-height: ${({ theme }) => theme.Footer.CopyrightSectionItem.LineHeight};
color: ${({ theme }) => theme.Footer.CopyrightSectionItem.Color};
@media (max-width: ${({ theme }) => theme.mobile}) {

}`

//close copyright Section//
