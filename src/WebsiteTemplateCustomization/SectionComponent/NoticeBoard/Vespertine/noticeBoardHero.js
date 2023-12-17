/* eslint-disable jsx-a11y/no-distracting-elements */
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '../../../CommonComponent/Container.styled';

const NoticeBoard = styled.div`
padding: ${({ theme }) => theme.Notice.NoticeBoardHero.PaddingY} 0;
position: fixed;
bottom:0;
left: 0;
right: 0;
width: 100%;
z-index:1;
padding: 10px 0;
background: #f9f9f9;
line-height: 0;
marquee{
ul{
display: flex;
gap: 20px;
li{
  position: relative;
  &::last-child{
    &::after{
      background: transparent;
    }
  }
  &::after{
    position: absolute;
    right: -10px;
    left: auto;
    width: 1px;
    height: 100%;
    background: ${({ theme }) => theme.Notice.NoticeBoardHero.a.Color};
  }
a{
font-weight: ${({ theme }) => theme.Notice.NoticeBoardHero.a.FontWeight};
font-size: ${({ theme }) => theme.Notice.NoticeBoardHero.a.FontSize};
line-height: ${({ theme }) => theme.Notice.NoticeBoardHero.a.LineHeight};
font-style: ${({ theme }) => theme.Notice.NoticeBoardHero.a.FontStyle};
font-family: ${({ theme }) => theme.Notice.NoticeBoardHero.a.FontFamily};
letter-spacing: ${({ theme }) => theme.Notice.NoticeBoardHero.a.LetterSpacing};
color: ${({ theme }) => theme.Notice.NoticeBoardHero.a.Color};
span{
  font-weight: 700;
}
&:hover{
text-decoration: underline;
color: ${({ theme }) => theme.Notice.NoticeBoardHero.a.Hover.Color};
}
}
}
}
}
`;


const NoticeBoardHero = () => {
  const { announcementData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const handleDownload = (item) => {
    if (item?.attachment?.src && item.attachment.src !== "") {
      window.open(item.attachment.src, '_blank');
    }
  }

  return (
    <Container>
      <NoticeBoard>
        <marquee width="100%" direction="left">
          <ul>
            {announcementData.length ? announcementData.filter((item) => item.markAsFeature === true).map((item, key) => {
              return (
                <li key={key}>
                  <NavLink to="/" onClick={() => handleDownload(item)}>{item.title}
                    {/* Click Here To Apply */}
                  </NavLink>
                </li>
              );
            }) :
              // <React.Fragment>
              //   <li>
              //     <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 | <span>Click Here To Apply</span></NavLink>
              //   </li>
              //   <li>
              //     <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 | <span>Click Here To Apply</span></NavLink>
              //   </li>
              //   <li>
              //     <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 | <span>Click Here To Apply</span></NavLink>
              //   </li>
              //   <li>
              //     <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 | <span>Click Here To Apply</span></NavLink>
              //   </li>
              //   <li>
              //     <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 | <span>Click Here To Apply</span></NavLink>
              //   </li>
              //   <li>
              //     <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 | <span>Click Here To Apply</span></NavLink>
              //   </li>
              //   <li>
              //     <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 | <span>Click Here To Apply</span></NavLink>
              //   </li>
              //   <li>
              //     <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 | <span>Click Here To Apply</span></NavLink>
              //   </li>
              //   <li>
              //     <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 | <span>Click Here To Apply</span></NavLink>
              //   </li>
              //   <li>
              //     <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 | <span>Click Here To Apply</span></NavLink>
              //   </li>
              //   <li>
              //     <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 | <span>Click Here To Apply</span></NavLink>
              //   </li>
              //   <li>
              //     <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 | <span>Click Here To Apply</span></NavLink>
              //   </li>
              //   <li>
              //     <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 | <span>Click Here To Apply</span></NavLink>
              //   </li>
              //   <li>
              //     <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 | <span>Click Here To Apply</span></NavLink>
              //   </li>
              //   <li>
              //     <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 | <span>Click Here To Apply</span></NavLink>
              //   </li>
              //   <li>
              //     <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 | <span>Click Here To Apply</span></NavLink>
              //   </li>
              //   <li>
              //     <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 | <span>Click Here To Apply</span></NavLink>
              //   </li>
              //   <li>
              //     <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 | <span>Click Here To Apply</span></NavLink>
              //   </li>
              // </React.Fragment>
              ""
            }
          </ul>
        </marquee>
      </NoticeBoard>
    </Container>
  )
}

export default NoticeBoardHero