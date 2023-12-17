import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled';

const FaqsSection = styled.div`
padding: 40px 0;
`;
const Faqs = styled.div`

`;
const FaqsHead = styled.div`
margin-bottom: ${({ theme }) => theme.Faqs.FaqsPage.FaqsHead.MarginBottom};

display: flex;
align-items: center;
flex-direction: column;
h2{
font-weight: ${({ theme }) => theme.Faqs.FaqsPage.h2.FontWeight};
font-size: ${({ theme }) => theme.Faqs.FaqsPage.h2.FontSize};
line-height: ${({ theme }) => theme.Faqs.FaqsPage.h2.LineHeight};
font-style: ${({ theme }) => theme.Faqs.FaqsPage.h2.FontStyle};
font-family: ${({ theme }) => theme.Faqs.FaqsPage.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Faqs.FaqsPage.h2.LetterSpacing};
text-align: ${({ theme }) => theme.Faqs.FaqsPage.h2.Alignment};
color: ${({ theme }) => theme.Faqs.FaqsPage.h2.Color};

}
`;
const FaqsDescription = styled.div`

`;
const FaqList = styled.ul`
padding: 0 20px;
`;
const FaqListItem = styled.li`
border-bottom: 1px solid ${({ theme }) => theme.Faqs.FaqsPage.FaqListItem.BorderColor};
padding: 16px 0 16px 24px;
h6{
  
  font-weight: ${({ theme }) => theme.Faqs.FaqsPage.h6.FontWeight};
  font-size: ${({ theme }) => theme.Faqs.FaqsPage.h6.FontSize};
  line-height: ${({ theme }) => theme.Faqs.FaqsPage.h6.LineHeight};
  font-style: ${({ theme }) => theme.Faqs.FaqsPage.h6.FontStyle};
  font-family: ${({ theme }) => theme.Faqs.FaqsPage.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.Faqs.FaqsPage.h6.LetterSpacing};
  color: ${({ theme }) => theme.Faqs.FaqsPage.h6.Color};
  position: relative; 
  
  &::before{
    width: 8px;
    height: 8px;
    border-radius:50%;
    background: ${({ theme }) => theme.Faqs.FaqsPage.h6.Color};
    left: -20px;
    top: 8px;
  }
},
p{
  
  font-weight: ${({ theme }) => theme.Faqs.FaqsPage.p.FontWeight};
  font-size: ${({ theme }) => theme.Faqs.FaqsPage.p.FontSize};
  line-height: ${({ theme }) => theme.Faqs.FaqsPage.p.LineHeight};
  font-style: ${({ theme }) => theme.Faqs.FaqsPage.p.FontStyle};
  font-family: ${({ theme }) => theme.Faqs.FaqsPage.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.Faqs.FaqsPage.p.LetterSpacing};
  color: ${({ theme }) => theme.Faqs.FaqsPage.p.Color};

}

button{
  font-weight: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.FontWeight};
  font-size: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.FontSize};
  line-height: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.LineHeight};
  background: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.Background};
  border: 1px solid ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.BorderColor};
  border-radius: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.BorderRadius};
  color: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.Color};
  padding: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.PaddingY} ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.PaddingX};
  cursor: pointer;
  margin-top: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.MarginTop};
  &:hover{
  background: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.Hover.Background};
  color: ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.Hover.Color};
  border: 1px solid ${({ theme }) => theme.Team.TeamHero.ViewMoreTeamButton.Hover.BorderColor};
  -webkit-transition-duration: 700ms;
  -moz-transition-duration: 700ms;
  -o-transition-duration: 700ms;
  transition-duration: 700ms;
  }
}
`;
const ViewMoreFaqsSection = styled.div`
display: flex;
justify-content: center;
margin-top: ${({ theme }) => theme.Faqs.FaqsPage.ViewMoreFaqsSection.MarginTop};
}
`;
const MiscellaneousHero = () => {
  const { NoticeBoardData } = useSelector((state) => state.websiteTemplate.getTemplate.data);
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const pushDropDownCheck = useSelector((state) => state.websiteTemplate.pushDropDown.data)
  var element = document.getElementById(pushDropDownCheck);

useEffect(()=>{
  if(pushDropDownCheck&&element){
    element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }
 
},[pushDropDownCheck,element])
  const handleDownload = (item) => {
    if (item.attachment && item.attachment !== "") {
      window.open(item.attachment, '_blank');
    }
  }

  return (
    <React.Fragment>

      <Container>
        <FaqsSection>
          <Faqs>
            <FaqsHead>
              <h2>{(subheadersData && subheadersData['noticehead']) || "Miscellaneous"}</h2>
              <h3>{(subheadersData && subheadersData['noticesubhead']) || ""}</h3>
            </FaqsHead>
            <FaqsDescription>
              <FaqList>
                {NoticeBoardData.length ? NoticeBoardData.map((item, key) => {
                  return (
                    <FaqListItem key={key} >
                      <h6 id={item._id}>
                        {item.title}
                      </h6>
                      <p dangerouslySetInnerHTML={{
                        __html:
                          item.description,
                      }}></p>
                      {item.attachment && item.attachment !== "" ?
                        <button onClick={() => handleDownload(item)}>Download</button>
                        : ""
                      }
                    </FaqListItem>
                  );
                })
                  :
                  <>
                    <FaqListItem>
                      <h6>Lörem ipsum tens ninade ihar tetöbelt.IDivöhet tuliga, för nessa att. Finera maa  </h6>
                      <p></p>
                      <button>Download</button>
                    </FaqListItem>
                    <FaqListItem>
                      <h6>Lörem ipsum tens ninade ihar tetöbelt.IDivöhet  </h6>
                      <p></p>
                      <button>Download</button>
                    </FaqListItem>
                    <FaqListItem>
                      <h6>Lörem ipsum tens ninade ihar tetöbelt.IDivöhet tuliga,  </h6>
                      <p></p>
                      <button>Download</button>
                    </FaqListItem>
                    <FaqListItem>
                      <h6>Lörem ipsum tens   </h6>
                      <p></p>
                      <button>Download</button>
                    </FaqListItem>
                    <FaqListItem>
                      <h6>Lörem ipsum tens ninade ihar tetöbelt. </h6>
                      <p></p>
                      <button>Download</button>
                    </FaqListItem>
                    <FaqListItem>
                      <h6>
                        Lörem ipsum tens ninade ihar tetöbelt.IDivöhet tuliga, för nessa att. Finera maa
                      </h6>
                      <p></p>
                      <button>Download</button>
                    </FaqListItem>
                  </>
                }


              </FaqList>
            </FaqsDescription>
          </Faqs>
        </FaqsSection>
      </Container>
    </React.Fragment>
  )
}

export default MiscellaneousHero
