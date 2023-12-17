/* eslint-disable jsx-a11y/no-distracting-elements */
import { useSelector } from 'react-redux';
import styled from 'styled-components';
const MiscellaneousHeroSection = styled.div`
padding: 20px 0;
`;
const MiscellaneousHeroHead = styled.div`
margin-bottom: 24px;
text-align: ${({ theme }) => theme.Notice.NoticeBoardHero.MiscellaneousHeroHead.Alignment};
h2{

font-weight: ${({ theme }) => theme.Notice.NoticeBoardHero.h2.FontWeight};
font-size: ${({ theme }) => theme.Notice.NoticeBoardHero.h2.FontSize};
line-height: ${({ theme }) => theme.Notice.NoticeBoardHero.h2.LineHeight};
font-style: ${({ theme }) => theme.Notice.NoticeBoardHero.h2.FontStyle};
font-family: ${({ theme }) => theme.Notice.NoticeBoardHero.h2.FontFamily};
letter-spacing: ${({ theme }) => theme.Notice.NoticeBoardHero.h2.LetterSpacing};
color: ${({ theme }) => theme.Notice.NoticeBoardHero.h2.Color};
}
h3{

font-weight: ${({ theme }) => theme.Notice.NoticeBoardHero.h3.FontWeight};
font-size: ${({ theme }) => theme.Notice.NoticeBoardHero.h3.FontSize};
line-height: ${({ theme }) => theme.Notice.NoticeBoardHero.h3.LineHeight};
font-style: ${({ theme }) => theme.Notice.NoticeBoardHero.h3.FontStyle};
font-family: ${({ theme }) => theme.Notice.NoticeBoardHero.h3.FontFamily};
letter-spacing: ${({ theme }) => theme.Notice.NoticeBoardHero.h3.LetterSpacing};
color: ${({ theme }) => theme.Notice.NoticeBoardHero.h3.Color};
}
}
`;
const MiscellaneousHeroGrid = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 30px;
background: ${({ theme }) => theme.Notice.NoticeBoardHero.MiscellaneousHeroGrid.Background};
padding: ${({ theme }) => theme.Notice.NoticeBoardHero.MiscellaneousHeroGrid.PaddingY} ${({ theme }) => theme.Notice.NoticeBoardHero.MiscellaneousHeroGrid.PaddingX};
`;
const MiscellaneousItem = styled.figure`
box-shadow: 0px 4px 12px 2px rgba(0, 0, 0, 0.1);
background: ${({ theme }) => theme.Notice.NoticeBoardHero.MiscellaneousItem.Background};
border-radius: 8px;
padding:  ${({ theme }) => theme.Notice.NoticeBoardHero.MiscellaneousItem.Padding};
h4{
  
  font-weight: ${({ theme }) => theme.Notice.NoticeBoardHero.h4.FontWeight};
  font-size: ${({ theme }) => theme.Notice.NoticeBoardHero.h4.FontSize};
  line-height: ${({ theme }) => theme.Notice.NoticeBoardHero.h4.LineHeight};
  font-style: ${({ theme }) => theme.Notice.NoticeBoardHero.h4.FontStyle};
  font-family: ${({ theme }) => theme.Notice.NoticeBoardHero.h4.FontFamily};
  letter-spacing: ${({ theme }) => theme.Notice.NoticeBoardHero.h4.LetterSpacing};
  color: ${({ theme }) => theme.Notice.NoticeBoardHero.h4.Color};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
},
p{
  
  font-weight: ${({ theme }) => theme.Notice.NoticeBoardHero.p.FontWeight};
  font-size: ${({ theme }) => theme.Notice.NoticeBoardHero.p.FontSize};
  line-height: ${({ theme }) => theme.Notice.NoticeBoardHero.p.LineHeight};
  font-style: ${({ theme }) => theme.Notice.NoticeBoardHero.p.FontStyle};
  font-family: ${({ theme }) => theme.Notice.NoticeBoardHero.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.Notice.NoticeBoardHero.p.LetterSpacing};
  color: ${({ theme }) => theme.Notice.NoticeBoardHero.p.Color};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  }
`;
const ViewMoreMiscellaneousHeroSection = styled.div`
display: flex;
justify-content: ${({ theme }) => theme.Notice.NoticeBoardHero.ViewMoreMiscellaneousHeroSection.Alignment};
}
`;
const DownloadButton = styled.button`

font-weight: ${({ theme }) => theme.Notice.NoticeBoardHero.DownloadButton.FontWeight};
font-size: ${({ theme }) => theme.Notice.NoticeBoardHero.DownloadButton.FontSize};
line-height: ${({ theme }) => theme.Notice.NoticeBoardHero.DownloadButton.LineHeight};
background: ${({ theme }) => theme.Notice.NoticeBoardHero.DownloadButton.Background};
border: 1px solid ${({ theme }) => theme.Notice.NoticeBoardHero.DownloadButton.BorderColor};
border-radius: ${({ theme }) => theme.Notice.NoticeBoardHero.DownloadButton.BorderRadius};
color: ${({ theme }) => theme.Notice.NoticeBoardHero.DownloadButton.Color};
padding: ${({ theme }) => theme.Notice.NoticeBoardHero.DownloadButton.PaddingY} ${({ theme }) => theme.Notice.NoticeBoardHero.DownloadButton.PaddingX};
cursor: pointer;
display: inline-block;
text-decoration: ${({ theme }) => theme.Notice.NoticeBoardHero.DownloadButton.TextDecoration};
margin-top: ${({ theme }) => theme.Notice.NoticeBoardHero.DownloadButton.MarginTop};
&:hover{
background: ${({ theme }) => theme.Notice.NoticeBoardHero.DownloadButton.Hover.Background};
color: ${({ theme }) => theme.Notice.NoticeBoardHero.DownloadButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Notice.NoticeBoardHero.DownloadButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;
const ViewMoreMiscellaneousHeroButton = styled.a`

font-weight: ${({ theme }) => theme.Notice.NoticeBoardHero.ViewMoreMiscellaneousHeroButton.FontWeight};
font-size: ${({ theme }) => theme.Notice.NoticeBoardHero.ViewMoreMiscellaneousHeroButton.FontSize};
line-height: ${({ theme }) => theme.Notice.NoticeBoardHero.ViewMoreMiscellaneousHeroButton.LineHeight};
background: ${({ theme }) => theme.Notice.NoticeBoardHero.ViewMoreMiscellaneousHeroButton.Background};
border: 1px solid ${({ theme }) => theme.Notice.NoticeBoardHero.ViewMoreMiscellaneousHeroButton.BorderColor};
border-radius: ${({ theme }) => theme.Notice.NoticeBoardHero.ViewMoreMiscellaneousHeroButton.BorderRadius};
color: ${({ theme }) => theme.Notice.NoticeBoardHero.ViewMoreMiscellaneousHeroButton.Color};
padding: ${({ theme }) => theme.Notice.NoticeBoardHero.ViewMoreMiscellaneousHeroButton.PaddingY} ${({ theme }) => theme.Notice.NoticeBoardHero.ViewMoreMiscellaneousHeroButton.PaddingX};

text-decoration: ${({ theme }) => theme.Notice.NoticeBoardHero.ViewMoreMiscellaneousHeroButton.TextDecoration};
margin-top: ${({ theme }) => theme.Notice.NoticeBoardHero.ViewMoreMiscellaneousHeroButton.MarginTop};
cursor: pointer;
&:hover{
background: ${({ theme }) => theme.Notice.NoticeBoardHero.ViewMoreMiscellaneousHeroButton.Hover.Background};
color: ${({ theme }) => theme.Notice.NoticeBoardHero.ViewMoreMiscellaneousHeroButton.Hover.Color};
border: 1px solid ${({ theme }) => theme.Notice.NoticeBoardHero.ViewMoreMiscellaneousHeroButton.Hover.BorderColor};
-webkit-transition-duration: 700ms;
-moz-transition-duration: 700ms;
-o-transition-duration: 700ms;
transition-duration: 700ms;
}
`;

const MiscellaneousHero = () => {
  const { NoticeBoardData } = useSelector((state) => state.serviceTemplate.getTemplate.data);
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const handleDownload = (item) => {
    window.open(item.attachment, '_blank');
  }

  return (
    <MiscellaneousHeroSection>
      <MiscellaneousHeroHead>
        <h2>{(subheadersData && subheadersData['noticehead']) || "Miscellaneous"}</h2>
        <h2>{(subheadersData && subheadersData['noticesubhead']) || ""}</h2>
      </MiscellaneousHeroHead>
      <MiscellaneousHeroGrid>
        {NoticeBoardData && NoticeBoardData.length ?
          NoticeBoardData.map((item, key) => {
            return (
              <MiscellaneousItem key={key}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                {item.attachment && item.attachment !== "" ?
                  <DownloadButton
                    onClick={() => handleDownload(item)}>
                    Download
                  </DownloadButton>
                  : ""}
              </MiscellaneousItem>
            );
          })
          :
          <>
            <MiscellaneousItem>
              <h4>Opening for Maths Teacher</h4>
              <p>We focus on ergonomics and meeting
                you where you work. It's only a
                keystroke away.</p>
              <DownloadButton to="">
                Download
              </DownloadButton>
            </MiscellaneousItem>
            <MiscellaneousItem>
              <h4>Opening for Maths Teacher</h4>
              <p>We focus on ergonomics and meeting
                you where you work. It's only a
                keystroke away.</p>
              <DownloadButton to="">
                Downloadad
              </DownloadButton>
            </MiscellaneousItem>
            <MiscellaneousItem>
              <h4>Opening for Maths Teacher</h4>
              <p>We focus on ergonomics and meeting
                you where you work. It's only a
                keystroke away.</p>
              <DownloadButton to="">
                Download
              </DownloadButton>
            </MiscellaneousItem>
          </>
        }
      </MiscellaneousHeroGrid>

      <ViewMoreMiscellaneousHeroSection>
        <ViewMoreMiscellaneousHeroButton to="">
          View All
        </ViewMoreMiscellaneousHeroButton>
      </ViewMoreMiscellaneousHeroSection>
    </MiscellaneousHeroSection>
  )
}

export default MiscellaneousHero