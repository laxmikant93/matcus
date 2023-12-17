import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import { Container } from '../../../CommonComponent/Container.styled';

const MiscellaneousWrapper = styled.div`
margin: 32px 0;
border: 1px solid;
border-color:  ${({ theme }) => theme.Principal.PrincipalHero.h4.Color};
border-radius: 8px;
`;
const MiscellaneousHead = styled.div`
background-color: ${({ theme }) => theme.Principal.PrincipalHero.h4.Color};
border-radius: 8px;
padding: 16px 24px;
h4{
  font-weight: ${({ theme }) => theme.Principal.PrincipalHero.h4.FontWeight};
  font-size: ${({ theme }) => theme.Principal.PrincipalHero.h4.FontSize};
  line-height: ${({ theme }) => theme.Principal.PrincipalHero.h4.LineHeight};
  font-style: ${({ theme }) => theme.Principal.PrincipalHero.h4.FontStyle};
  font-family: ${({ theme }) => theme.Principal.PrincipalHero.h4.FontFamily};
  letter-spacing: ${({ theme }) => theme.Principal.PrincipalHero.h4.LetterSpacing};
  color: #FFF;
}
`;
const MiscellaneousBody = styled.div`

padding: 16px 24px;
`;
const List = styled.ul`
margin-left: 24px;
`;
const ListItem = styled.li`
font-weight: ${({ theme }) => theme.Principal.PrincipalHero.p.FontWeight};
font-size: ${({ theme }) => theme.Principal.PrincipalHero.p.FontSize};
line-height: ${({ theme }) => theme.Principal.PrincipalHero.p.LineHeight};
font-style: ${({ theme }) => theme.Principal.PrincipalHero.p.FontStyle};
font-family: ${({ theme }) => theme.Principal.PrincipalHero.p.FontFamily};
letter-spacing: ${({ theme }) => theme.Principal.PrincipalHero.p.LetterSpacing};
color: ${({ theme }) => theme.Principal.PrincipalHero.h4.Color};
list-style-type:disc;
a{
  cursor: pointer;
}
mark {
  background: red;
  padding: 2px 8px;
  color:#FFF;
  font-size:12px;
  border-radius: 4px;
  margin-left: 8px;
}

`;

const ViewMoreFaqsHeroSection = styled.div`
display: flex;
justify-content: center;
margin-top: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroSection.MarginTop};
}
`;
const ViewMoreFaqsHeroButton = styled.a`

font-weight: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.FontWeight};
font-size: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.FontSize};
line-height: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.LineHeight};
background: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.Background};
border: 1px solid ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.BorderColor};
border-radius: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.BorderRadius};
color: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.Color};
padding: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.PaddingY} ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.PaddingX};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.Hover.Background};
color: ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Faqs.FaqsHero.ViewMoreFaqsHeroButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;

const MiscellaneousHero = () => {

  const dispatch = useDispatch();
  const history = useNavigate();

  const { NoticeBoardData } = useSelector((state) => state.websiteTemplate.getTemplate.data);
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { route, preview } = useSelector((state) => {
    return {
      route: state.websiteTemplate.route,
      preview: state.websiteTemplate.preview
    }
  })

  const handleDownload = (item) => {
    if (item.attachment && item.attachment !== "") {
      window.open(item.attachment, '_blank');
    }
  }

  const handleViewMoreButton = () => {
    if (preview) {
      dispatch(selectRouteForPreview("/miscellaneous", true))
    }
    else {
      history("/miscellaneous")
    }
  }

  return (
    <Container>
      <MiscellaneousWrapper>
        <MiscellaneousHead>
          {/* <h4>Miscellaneous</h4> */}
          
          <h2>{(subheadersData && subheadersData['noticehead']) || "Miscellaneous"}</h2>
          <h3>{(subheadersData && subheadersData['noticesubhead']) || ""}</h3>
        </MiscellaneousHead>
        <MiscellaneousBody>
          <List>
            {NoticeBoardData.length ? NoticeBoardData.slice(0, 7).map((item, key) => {
              return (
                <ListItem key={key} onClick={() => handleDownload(item)}>
                  {item.title}
                  {item?.ribbon ?
                    <mark>{item?.ribbon}</mark>
                    : ""
                  }
                </ListItem>
              );
            })
              :
              <>
                <ListItem>
                  Lörem ipsum tens ninade ihar tetöbelt.IDivöhet tuliga, för nessa att. Finera maa  <mark>New</mark>
                </ListItem>
                <ListItem>
                  Lörem ipsum tens ninade ihar tetöbelt.IDivöhet  <mark>New</mark>
                </ListItem>
                <ListItem>
                  Lörem ipsum tens ninade ihar tetöbelt.IDivöhet tuliga,  <mark>New</mark>
                </ListItem>
                <ListItem>
                  Lörem ipsum tens   <mark>New</mark>
                </ListItem>
                <ListItem>
                  Lörem ipsum tens ninade ihar tetöbelt. <mark>New</mark>
                </ListItem>
                <ListItem>
                  Lörem ipsum tens ninade ihar tetöbelt.IDivöhet tuliga, för nessa att. Finera maa  <mark>New</mark>
                </ListItem>
              </>
            }
          </List>

        </MiscellaneousBody>
      </MiscellaneousWrapper>
      <ViewMoreFaqsHeroSection>
          <ViewMoreFaqsHeroButton onClick={() => handleViewMoreButton()}>
            View More
          </ViewMoreFaqsHeroButton>
        </ViewMoreFaqsHeroSection>
    </Container>
  )
}

export default MiscellaneousHero
