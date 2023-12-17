import styled from 'styled-components'

export const StyledFooter = styled.footer`
        background-color: ${({ theme }) => theme.Footer.Background};
        color: #fff;
        padding: 42px 0 72px 0;
        @media (max-width: ${({ theme }) => theme.mobile}) {

        }
        `

//close logo section//

// footer content section //
export const FooterContentGrid = styled.div`

margin-top: 30px;
margin-bottom: 30px;
@media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
      }
        `

export const FooterContentGridLeft = styled.div`
display: flex;
align-items: flex-start;
justify-content: space-between;
@media (max-width: 768px) {
       flex-direction: column;
       gap: 24px;
       }
ul{
    
        li{
                
                font-weight: ${({ theme }) => theme.Footer.li.FontWeight};
                font-size: ${({ theme }) => theme.Footer.li.FontSize};
                line-height: ${({ theme }) => theme.Footer.li.LineHeight};
                // text-transform: ${({ theme }) => theme.Footer.li.TextTransform};
                color:${({ theme }) => theme.Footer.li.Color};
                
    display: grid;
     
        }
}   
`;
export const FooterContentGridRight = styled.div`
   `

// close footer content section //

// Heading section //
export const ContentHeading = styled.h6`
   
   font-weight: ${({ theme }) => theme.Footer.h6.FontWeight};
   font-size: ${({ theme }) => theme.Footer.h6.FontSize};
   line-height: ${({ theme }) => theme.Footer.h6.LineHeight};
   font-style: ${({ theme }) => theme.Footer.h6.FontStyle};
   font-family: ${({ theme }) => theme.Footer.h6.FontFamily};
   letter-spacing: ${({ theme }) => theme.Footer.h6.LetterSpacing};
//    text-transform: ${({ theme }) => theme.Footer.h6.TextTransform};
   color:${({ theme }) => theme.Footer.h6.Color};
//    margin-bottom: 10px;
   @media (max-width: ${({ theme }) => theme.mobile}) {

   }`
// close headeing section //
export const FooterNavLink = styled.ul`
display: flex;
align-items: center;
gap: 0 24px;
flex-wrap: wrap;
@media (max-width: 768px) {

}
`
export const MenuListItem = styled.li`
`
export const MenuListItemLink = styled.a`
background-color: transparent;
outline: none;
border: none;
font-weight: 400;
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

}
`

export const MenuListItemButton = styled.button`
background-color: transparent;
outline: none;
border: none;
font-weight: 400;
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
       margin: auto 0 auto auto;
        @media (max-width: 1200px) {
                align-items: flex-start;
                flex-direction: column;
        }`
export const SocialMediaIconList = styled.div`
        // margin-top: 10px;
        display: flex;
        gap: 15px;
        align-items: center;
        @media (max-width: 1200px) {
        }`
export const SocialMediaIconListItem = styled.div`
        width: ${({ theme }) => theme.Footer.SocialMediaIconListItem.Width};
        height: ${({ theme }) => theme.Footer.SocialMediaIconListItem.Height};
        cursor: pointer;
        @media (max-width: ${({ theme }) => theme.mobile}) {

        }`

//close social media Section//

//copyright Section//

export const CopyrightSection = styled.div`
        margin-top: 16px;
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
