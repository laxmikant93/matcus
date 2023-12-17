/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Container } from '../../../CommonComponent/Container.styled';
import { NavLink } from 'react-router-dom';
import React from 'react';

const NoticeBoard = styled.div`
position: sticky;
bottom:0;
width: 100%;
z-index:1;
padding: 10px 0;
background: #f9f9f9;
line-height: 0;
marquee{
  line-height:0;
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
    background: #FFFFFF;
  }
a{
font-weight: ${({ theme }) => theme.Notice.NoticeBoardHero.a.FontWeight};
font-size: ${({ theme }) => theme.Notice.NoticeBoardHero.a.FontSize};
line-height: ${({ theme }) => theme.Notice.NoticeBoardHero.a.LineHeight};
font-style: ${({ theme }) => theme.Notice.NoticeBoardHero.a.FontStyle};
font-family: ${({ theme }) => theme.Notice.NoticeBoardHero.a.FontFamily};
letter-spacing: ${({ theme }) => theme.Notice.NoticeBoardHero.a.LetterSpacing};
color: #26335D;
span{
  font-weight: 700;
}
&:hover{
text-decoration: underline;
}
}
}
}
}
`;

const NoticeBoardHero = () => {
  const { announcementData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const handleDownload = (item) => {
    if (item.attachment&&item?.attachment?.src && item.attachment.src !== "") {
      window.open(item.attachment.src, '_blank');
    }
  }


  return (
    <NoticeBoard>
      <marquee width="100%" direction="left">
        {/* <ul>
          {
            NoticeBoardData.length ? NoticeBoardData.map((item, key) => {
              return (
                <li key={key}>
                  <NavLink to="#" onClick={() => handleDownload(item)}>{item.title}</NavLink>
                  
                </li>
              );
            }) :
              <>
                <li>
                  <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 <span>Click Here To Apply</span></NavLink>
                </li>
                <li>
                  <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 <span>Click Here To Apply</span></NavLink>
                </li>
                <li>
                  <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 <span>Click Here To Apply</span></NavLink>
                </li>
                <li>
                  <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 <span>Click Here To Apply</span></NavLink>
                </li>
                <li>
                  <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 <span>Click Here To Apply</span></NavLink>
                </li>
                <li>
                  <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 <span>Click Here To Apply</span></NavLink>
                </li>
                <li>
                  <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 <span>Click Here To Apply</span></NavLink>
                </li>
                <li>
                  <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 <span>Click Here To Apply</span></NavLink>
                </li>
                <li>
                  <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 <span>Click Here To Apply</span></NavLink>
                </li>
                <li>
                  <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 <span>Click Here To Apply</span></NavLink>
                </li>
                <li>
                  <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 <span>Click Here To Apply</span></NavLink>
                </li>
                <li>
                  <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 <span>Click Here To Apply</span></NavLink>
                </li>
                <li>
                  <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 <span>Click Here To Apply</span></NavLink>
                </li>
                <li>
                  <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 <span>Click Here To Apply</span></NavLink>
                </li>
                <li>
                  <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 <span>Click Here To Apply</span></NavLink>
                </li>
                <li>
                  <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 <span>Click Here To Apply</span></NavLink>
                </li>
                <li>
                  <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 <span>Click Here To Apply</span></NavLink>
                </li>
                <li>
                  <NavLink to="/">CBSE Honour for Excellence in Teaching 2021-22 01/06/2022 <span>Click Here To Apply</span></NavLink>
                </li>
              </>
          }
        </ul> */}
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
  )
}

export default NoticeBoardHero