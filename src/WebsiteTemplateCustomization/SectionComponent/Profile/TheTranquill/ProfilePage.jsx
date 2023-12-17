import React, { useEffect } from 'react'
import { Container } from '../../../CommonComponent/Container.styled'
import styled from 'styled-components';
import Profile from "./profile.jpg";
// import CalenderIcon from "../../../assets/TheTranquill/calender.svg";
// import TimingIcon from "../../../assets/TheTranquill/timing.svg";
// import EmailIcon from "../../../assets/TheTranquill/email-icon.svg";
// import PhoneIcon from "../../../assets/TheTranquill/phone-icon.svg";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSingleFaculty } from '../../../../store/actions/serviceWebsiteTemplate';
import { useSelector } from 'react-redux';
import FormatText from '../../../../Common/FormatText';
import ComponentLoader from '../../../../Common/Loader/ComponentLoader';
const ProfilePageSection = styled.div`
margin: 72px 0;

h4{
  font-weight: ${({ theme }) => theme.ProfilePage.h4.FontWeight};
  font-size: ${({ theme }) => theme.ProfilePage.h4.FontSize};
  line-height: ${({ theme }) => theme.ProfilePage.h4.LineHeight};
  font-style: ${({ theme }) => theme.ProfilePage.h4.FontStyle};
  font-family: ${({ theme }) => theme.ProfilePage.h4.FontFamily};
  letter-spacing: ${({ theme }) => theme.ProfilePage.h4.LetterSpacing};
  color: ${({ theme }) => theme.ProfilePage.h4.Color};
  }
  h5{
  font-weight: ${({ theme }) => theme.ProfilePage.h5.FontWeight};
  font-size: ${({ theme }) => theme.ProfilePage.h5.FontSize};
  line-height: ${({ theme }) => theme.ProfilePage.h5.LineHeight};
  font-style: ${({ theme }) => theme.ProfilePage.h5.FontStyle};
  font-family: ${({ theme }) => theme.ProfilePage.h5.FontFamily};
  letter-spacing: ${({ theme }) => theme.ProfilePage.h5.LetterSpacing};
  color: ${({ theme }) => theme.ProfilePage.h5.Color};
  }
  h6{
  font-weight: ${({ theme }) => theme.ProfilePage.h6.FontWeight};
  font-size: ${({ theme }) => theme.ProfilePage.h6.FontSize};
  line-height: ${({ theme }) => theme.ProfilePage.h6.LineHeight};
  font-style: ${({ theme }) => theme.ProfilePage.h6.FontStyle};
  font-family: ${({ theme }) => theme.ProfilePage.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.ProfilePage.h6.LetterSpacing};
  color: ${({ theme }) => theme.ProfilePage.h6.Color};
  }
  p{
  font-weight: ${({ theme }) => theme.ProfilePage.p.FontWeight};
  font-size: ${({ theme }) => theme.ProfilePage.p.FontSize};
  line-height: ${({ theme }) => theme.ProfilePage.p.LineHeight};
  font-style: ${({ theme }) => theme.ProfilePage.p.FontStyle};
  font-family: ${({ theme }) => theme.ProfilePage.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.ProfilePage.p.LetterSpacing};
  color: ${({ theme }) => theme.ProfilePage.p.Color};

  }
`;
const ProfilePageGrid = styled.div`
display: grid;
grid-template-columns: 447px 1fr;
align-items: flex-start;
gap:44px;
@media screen and (max-width: 768px) {
  grid-template-columns: 1fr;
}
`;

const ProfilePageGridLeft = styled.div``;
const ProfilePageGridRight = styled.div``;

const ProfilePageImageSection = styled.div`
img{
  width: 100%;
   height: 495px;
   border-radius: 12px;
   @media screen and (max-width: 768px) {
    height: auto;
  }
}
`;
const ProfilePageDescription = styled.div`

  ul{
    padding-top: 32px;
    padding-left: 16px;
    @media screen and (max-width: 768px) {
      padding-left: 24px;
    }
    li{
  font-weight: ${({ theme }) => theme.ProfilePage.p.FontWeight};
  font-size: ${({ theme }) => theme.ProfilePage.p.FontSize};
  line-height: ${({ theme }) => theme.ProfilePage.p.LineHeight};
  font-style: ${({ theme }) => theme.ProfilePage.p.FontStyle};
  font-family: ${({ theme }) => theme.ProfilePage.p.FontFamily};
  letter-spacing: ${({ theme }) => theme.ProfilePage.p.LetterSpacing};
  color: ${({ theme }) => theme.ProfilePage.p.Color};
      list-style-type: disc;
      &:first-child{
        margin-left: -20px;
        list-style-type: none;
        margin-bottom: 8px;
      }
    }
  }
  
`;
// const BookingButton = styled.button`
// font-weight: ${({ theme }) => theme.ProfilePage.BookingButton.FontWeight};
// font-size: ${({ theme }) => theme.ProfilePage.BookingButton.FontSize};
// line-height: ${({ theme }) => theme.ProfilePage.BookingButton.LineHeight};
// background: ${({ theme }) => theme.ProfilePage.BookingButton.Background};
// border: 1px solid ${({ theme }) => theme.ProfilePage.BookingButton.BorderColor};
// border-radius: ${({ theme }) => theme.ProfilePage.BookingButton.BorderRadius};
// color: ${({ theme }) => theme.ProfilePage.BookingButton.Color};
// padding: ${({ theme }) => theme.ProfilePage.BookingButton.PaddingY} ${({ theme }) => theme.ProfilePage.BookingButton.PaddingX};
// cursor: pointer;
// &:hover{
// background: ${({ theme }) => theme.ProfilePage.BookingButton.Hover.Background};
// color: ${({ theme }) => theme.ProfilePage.BookingButton.Hover.Color};
// border: 1px solid ${({ theme }) => theme.ProfilePage.BookingButton.Hover.BorderColor};
// -webkit-transition-duration: 700ms;
// -moz-transition-duration: 700ms;
// -o-transition-duration: 700ms;
// transition-duration: 700ms;
// `;

// const BookingButtonSection = styled.div`
// margin-top: 48px;
// `;
// const ProfilePageContactSection = styled.div`
// margin-top: 32px;
// `;
// const ProfilePageContactCard = styled.div`
// background: ${({ theme }) => theme.ProfilePage.ProfilePageCard.Background};
// box-shadow: 2px 5px 12px rgba(0, 0, 0, 0.15);
// border-radius: ${({ theme }) => theme.ProfilePage.ProfilePageCard.BorderRadius};
// `;
// const ProfilePageContactHead = styled.div`
// border-top-right-radius: inherit;
// border-top-left-radius: inherit;
// background: ${({ theme }) => theme.ProfilePage.ProfilePageCardHead.Background};
// Padding: ${({ theme }) => theme.ProfilePage.ProfilePageCardHead.PaddingY} ${({ theme }) => theme.ProfilePage.ProfilePageCardHead.PaddingX};
// `;
// const ProfilePageContactBody = styled.div`
// border-bottom-right-radius: inherit;
// border-bottom-left-radius: inherit;
// background: ${({ theme }) => theme.ProfilePage.ProfilePageCardBody.Background};
// Padding: ${({ theme }) => theme.ProfilePage.ProfilePageCardBody.PaddingY} ${({ theme }) => theme.ProfilePage.ProfilePageCardBody.PaddingX};

// ul{
//   li{
// display: flex;
// align-items: center;
// gap: 8px;
// padding: 16px;
//     font-weight: ${({ theme }) => theme.ProfilePage.p.FontWeight};
//     font-size: ${({ theme }) => theme.ProfilePage.p.FontSize};
//     line-height: ${({ theme }) => theme.ProfilePage.p.LineHeight};
//     font-style: ${({ theme }) => theme.ProfilePage.p.FontStyle};
//     font-family: ${({ theme }) => theme.ProfilePage.p.FontFamily};
//     letter-spacing: ${({ theme }) => theme.ProfilePage.p.LetterSpacing};
//     color: ${({ theme }) => theme.ProfilePage.p.Color};
//     .phone-icon{
//       width: 30px;
//        height: 30px;
//        display: block;
//        cursor: pointer;
//        background-color: #1F2B6C;
//        -webkit-mask: url(${PhoneIcon}) no-repeat center;
//        mask-image: url(${PhoneIcon}) no-repeat center;
//      }
//      .email-icon{
//              width: 30px;
//              height: 30px;
//        display: block;
//        cursor: pointer;
//        background-color: #1F2B6C;
//        -webkit-mask: url(${EmailIcon}) no-repeat center;
//        mask-image: url(${EmailIcon}) no-repeat center;
//      }
//   }
// }
// `;

// const ProfilePageAvalibilitySection = styled.div`
// margin-top: 32px;
// `;
// const ProfilePageAvalibilityCard = styled.div`
// background: ${({ theme }) => theme.ProfilePage.ProfilePageCard.Background};
// box-shadow: 2px 5px 12px rgba(0, 0, 0, 0.15);
// border-radius: ${({ theme }) => theme.ProfilePage.ProfilePageCard.BorderRadius};
// `;
// const ProfilePageAvalibilityHead = styled.div`
// border-top-right-radius: inherit;
// border-top-left-radius: inherit;
// background: ${({ theme }) => theme.ProfilePage.ProfilePageCardHead.Background};
// Padding: ${({ theme }) => theme.ProfilePage.ProfilePageCardHead.PaddingY} ${({ theme }) => theme.ProfilePage.ProfilePageCardHead.PaddingX};
// `;
// const ProfilePageAvalibilityBody = styled.div`
// border-bottom-right-radius: inherit;
// border-bottom-left-radius: inherit;
// background: ${({ theme }) => theme.ProfilePage.ProfilePageCardBody.Background};

// table{
//   td,th{
//     font-weight: ${({ theme }) => theme.ProfilePage.p.FontWeight};
//     font-size: ${({ theme }) => theme.ProfilePage.p.FontSize};
//     line-height: ${({ theme }) => theme.ProfilePage.p.LineHeight};
//     font-style: ${({ theme }) => theme.ProfilePage.p.FontStyle};
//     font-family: ${({ theme }) => theme.ProfilePage.p.FontFamily};
//     letter-spacing: ${({ theme }) => theme.ProfilePage.p.LetterSpacing};
//     color: ${({ theme }) => theme.ProfilePage.p.Color};
//     padding: 16px;
//     text-align:center;
//   }
//   .calender-icon{
//     width: 20px;
//     height: 20px;
// display: block;
// cursor: pointer;
// background-color: #1F2B6C;
// -webkit-mask: url(${CalenderIcon}) no-repeat center;
// mask-image: url(${CalenderIcon}) no-repeat center;
// }
// .hours-icon{
//     width: 20px;
//     height: 20px;
// display: block;
// cursor: pointer;
// background-color: #1F2B6C;
// -webkit-mask: url(${TimingIcon}) no-repeat center;
// mask-image: url(${TimingIcon}) no-repeat center;
// }
//   thead{
//     tr{
//       border: none;
//     }
//     th{
//       span{
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         gap: 8px;
//       }
//     }
//   }
//   td,th{
//     border-right: 1px solid ${({ theme }) => theme.ProfilePage.AvalibilityTable.BorderColor};
//     &:last-child{
//       border-right: none;
//     }
//   }
//   tr{
//     border-top: 1px solid ${({ theme }) => theme.ProfilePage.AvalibilityTable.BorderColor};
//     td{
//       &:first-child{
//         background: ${({ theme }) => theme.ProfilePage.AvalibilityTable.td.Background};
//         Color: ${({ theme }) => theme.ProfilePage.AvalibilityTable.td.Color};
//       }
//     }
//   }
// }
// `;
const ProfilePage = () => {
  const { _id } = useParams()
  const dispatch = useDispatch()
  const { facultyDetail, facultySuccess } = useSelector((state) => {
    return {
      facultySuccess: state.serviceTemplate.facultyDetails.success,
      facultyDetail: state.serviceTemplate.facultyDetails.data
    }
  })
  useEffect(() => {
    dispatch(getSingleFaculty(_id))
  }, [_id, dispatch])
  return (
    <Container>
      {facultySuccess ? <ProfilePageSection>
        <ProfilePageGrid>
          <ProfilePageGridLeft>
            <ProfilePageImageSection>
              <img src={facultyDetail.profileurl ? facultyDetail.profileurl : Profile} alt="" />
            </ProfilePageImageSection>
            {/* <ProfilePageContactSection>
              <ProfilePageContactCard>
                <ProfilePageContactHead>
                  <h6>Contact Details</h6>
                </ProfilePageContactHead>
                <ProfilePageContactBody>
                  <ul>
                    <li>
                      <i className="phone-icon"></i>
                      1800 309 0777
                    </li>
                    <li>
                      <i className="email-icon"></i>
                      info@jeewanhopspital.in
                    </li>
                  </ul>
                </ProfilePageContactBody>
              </ProfilePageContactCard>
            </ProfilePageContactSection> */}
          </ProfilePageGridLeft>
          <ProfilePageGridRight>
            <ProfilePageDescription>
              <h4>{facultyDetail.fullname}</h4>
              <h5>{facultyDetail.designation}</h5>
              <p>   {facultyDetail.description && <FormatText text={facultyDetail.description}>
                {({ formatedText }) => (
                  <p className='sun-editor-output' dangerouslySetInnerHTML={{ __html: formatedText }}></p>
                )}
              </FormatText>}</p>

              {/* <ul>
                <li>Qualification</li>
                <li>M.B.B.S</li>
                <li>M.R.C.P.</li>
                <li>D.T.M&H (ENG)</li>
                <li>M D.T.C.D (Cardiff)</li>
              </ul> */}
              {/* <BookingButtonSection>
                <BookingButton>BOOK APPOINTMENT</BookingButton>
              </BookingButtonSection> */}
            </ProfilePageDescription>
            {/* <ProfilePageAvalibilitySection>
              <ProfilePageAvalibilityCard>
                <ProfilePageAvalibilityHead>
                  <h6>Availability</h6>
                </ProfilePageAvalibilityHead>
                <ProfilePageAvalibilityBody>
                  <table>
                    <thead>
                      <tr>
                        <th width="40%"><span><i className="calender-icon"></i>Days</span></th>
                        <th width="60%"><span><i className="hours-icon"></i>Timings</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Monday</td>
                        <td>06:00 AM - 08:00 PM</td>
                      </tr>
                      <tr>
                        <td>Tuesday</td>
                        <td>06:00 AM - 08:00 PM</td>
                      </tr>
                      <tr>
                        <td>Wednesday</td>
                        <td>06:00 AM - 02:00 PM, 04:00 AM - 08:00 PM </td>
                      </tr>
                      <tr>
                        <td>Thursday</td>
                        <td>06:00 AM - 08:00 PM</td>
                      </tr>
                      <tr>
                        <td>Friday</td>
                        <td>06:00 AM - 02:00 PM, 04:00 AM - 08:00 PM </td>
                      </tr>
                      <tr>
                        <td>Saturday</td>
                        <td>06:00 AM - 08:00 PM</td>
                      </tr>
                      <tr>
                        <td>Sunday</td>
                        <td>Not Available</td>
                      </tr>
                    </tbody>
                  </table>
                </ProfilePageAvalibilityBody>
              </ProfilePageAvalibilityCard>
            </ProfilePageAvalibilitySection> */}
          </ProfilePageGridRight>
        </ProfilePageGrid>
      </ProfilePageSection> : <ComponentLoader />}
    </Container>
  )
}

export default ProfilePage