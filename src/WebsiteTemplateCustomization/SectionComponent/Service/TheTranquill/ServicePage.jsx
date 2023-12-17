/* eslint-disable jsx-a11y/no-distracting-elements */
import styled from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Default1 from "./default1.svg";
import Default2 from "./default2.svg";
import Default3 from "./default3.svg";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectRouteForPreview } from '../../../../store/actions/WebsiteTemplate';
import React, { useState } from 'react';
import { Container } from '../../../CommonComponent/Container.styled'
import { setParamId } from '../../../../store/actions/serviceWebsiteTemplate';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import DefaultImage from "../../../assets/TheTranquill/default-bg.png";



const ServiceHomePageSection = styled.div`
margin:  72px 0;
`;
const ServiceHomePage = styled.div`
`;
const ServiceHomePageHead = styled.div`
h2{

  font-weight: ${({ theme }) => theme.ServicePage.h2.FontWeight};
  font-size: ${({ theme }) => theme.ServicePage.h2.FontSize};
  line-height: ${({ theme }) => theme.ServicePage.h2.LineHeight};
  font-style: ${({ theme }) => theme.ServicePage.h2.FontStyle};
  font-family: ${({ theme }) => theme.ServicePage.h2.FontFamily};
  letter-spacing: ${({ theme }) => theme.ServicePage.h2.LetterSpacing};
  text-align: ${({ theme }) => theme.ServicePage.h2.Alignment};
  color: ${({ theme }) => theme.ServicePage.h2.Color};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  }
  h3{
    font-weight: ${({ theme }) => theme.ServicePage.h3.FontWeight};
    font-size: ${({ theme }) => theme.ServicePage.h3.FontSize};
    line-height: ${({ theme }) => theme.ServicePage.h3.LineHeight};
    font-style: ${({ theme }) => theme.ServicePage.h3.FontStyle};
    font-family: ${({ theme }) => theme.ServicePage.h3.FontFamily};
    letter-spacing: ${({ theme }) => theme.ServicePage.h3.LetterSpacing};
    color: ${({ theme }) => theme.ServicePage.h3.Color};
    text-align: ${({ theme }) => theme.ServicePage.h3.Alignment};
    position: relative;
    display: inline-block;
    text-transform: uppercase;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    }
`;
const ServicePageItem = styled.figure`
position: relative;
cursor: pointer;
`;
const ServicePageImage = styled.div`
width: 100%;
height: 100%;
min-height: 166px;
max-height: 332px;
img{
  border-radius: 5px;
  width: 100%;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  object-fit: cover;
  display: block;
}
`;
const ServicePageCaption = styled.figcaption`
position: absolute;
bottom: 0;
width: 100%;
height: 100%;
min-height: 100%;
max-height: 100%;
display: flex;
align-items: flex-end;
justify-content: flex-start;
border-radius: 5px;
background: ${({ theme }) => theme.ServicePage.ServicePageCaption.Background};
padding: 24px;
h6{
  font-weight: ${({ theme }) => theme.ServicePage.h6.FontWeight};
  font-size: ${({ theme }) => theme.ServicePage.h6.FontSize};
  line-height: ${({ theme }) => theme.ServicePage.h6.LineHeight};
  font-style: ${({ theme }) => theme.ServicePage.h6.FontStyle};
  font-family: ${({ theme }) => theme.ServicePage.h6.FontFamily};
  letter-spacing: ${({ theme }) => theme.ServicePage.h6.LetterSpacing};
  color: #FFFFFF;
  text-align: ${({ theme }) => theme.ServicePage.h6.Alignment};
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden;
}
`;
const ServicePageGrid = styled.div`
 margin-top: 48px;
 display: grid;
 grid-template-columns: repeat(4, 1fr);
 gap: 24px;
 @media screen and (max-width: 768px) {
  grid-template-columns: repeat(1, 1fr);
}
`;


const ServicePage = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { _id } = useParams();
  const data  = useSelector((state) => state.serviceTemplate.getTemplate.data.bookAppointService)
  const { subheadersData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const [categoryServices, setCategoryServices] = useState("");

  const { preview } = useSelector((state) => {
    return {
      route: state.serviceTemplate.route,
      preview: state.serviceTemplate.preview
    }
  })



  const handleService = (item) => {
    if (preview) {
      dispatch(selectRouteForPreview(`/service-detail/${item._id}`, true))
      dispatch(setParamId(item._id))
    } else {
      history(`/service-detail/${item._id}`)
    }
  }

  useEffect(() => {
    if (_id) {
      if (data.length) {
        let categoryServices = data.filter((item, key) => item?.main_category === _id);
        setCategoryServices(categoryServices);
      }
    }
  }, [_id, data])

  return (
    <React.Fragment>
      <Container>
        <ServiceHomePageSection>
          <ServiceHomePage>
            <ServiceHomePageHead>
              <h2>{(subheadersData && subheadersData['bookservicehead']) || "Our Services"}</h2>
              <h3>{(subheadersData && subheadersData['bookservicesubhead']) || ""}</h3>
            </ServiceHomePageHead>
            <ServicePageGrid>
              <React.Fragment>
                {_id ?
                  categoryServices.length ? categoryServices.map((item, key) => {
                    return (
                      <ServicePageItem key={key} onClick={() => handleService(item)}>
                        <ServicePageImage>
                          <img src={item?.image ? item?.image : DefaultImage} alt="Album" />
                        </ServicePageImage>
                        <ServicePageCaption>
                          <h6>{item?.title}</h6>
                        </ServicePageCaption>
                      </ServicePageItem>
                    );
                  }) : <>
                    <ServicePageItem>
                      <ServicePageImage>
                        <img src={Default1} alt="Album" />
                      </ServicePageImage>
                      <ServicePageCaption>
                        <h6>Neuro Surgery</h6>
                      </ServicePageCaption>
                    </ServicePageItem>
                    <ServicePageItem>
                      <ServicePageImage>
                        <img src={Default2} alt="Album" />
                      </ServicePageImage>
                      <ServicePageCaption>
                        <h6>X-ray</h6>
                      </ServicePageCaption>
                    </ServicePageItem>
                    <ServicePageItem>
                      <ServicePageImage>
                        <img src={Default3} alt="Album" />
                      </ServicePageImage>
                      <ServicePageCaption>
                        <h6>Dialysis</h6>
                      </ServicePageCaption>
                    </ServicePageItem>
                    <ServicePageItem>
                      <ServicePageImage>
                        <img src={Default3} alt="Album" />
                      </ServicePageImage>
                      <ServicePageCaption>
                        <h6>Laparoscopic surgery</h6>
                      </ServicePageCaption>
                    </ServicePageItem>
                    <ServicePageItem>
                      <ServicePageImage>
                        <img src={Default3} alt="Album" />
                      </ServicePageImage>
                      <ServicePageCaption>
                        <h6>Laparoscopic surgery</h6>
                      </ServicePageCaption>
                    </ServicePageItem>
                  </>
                  :
                  data.length ?
                    data.map((item, key) => {
                      return (
                        <ServicePageItem key={key} onClick={() => handleService(item)}>
                          <ServicePageImage>
                            <img src={item?.image ? item?.image : DefaultImage} alt="Album" />
                          </ServicePageImage>
                          <ServicePageCaption>
                            <h6>{item?.title}</h6>
                          </ServicePageCaption>
                        </ServicePageItem>
                      );
                    })
                    :
                    <>
                      <ServicePageItem>
                        <ServicePageImage>
                          <img src={Default1} alt="Album" />
                        </ServicePageImage>
                        <ServicePageCaption>
                          <h6>Neuro Surgery</h6>
                        </ServicePageCaption>
                      </ServicePageItem>
                      <ServicePageItem>
                        <ServicePageImage>
                          <img src={Default2} alt="Album" />
                        </ServicePageImage>
                        <ServicePageCaption>
                          <h6>X-ray</h6>
                        </ServicePageCaption>
                      </ServicePageItem>
                      <ServicePageItem>
                        <ServicePageImage>
                          <img src={Default3} alt="Album" />
                        </ServicePageImage>
                        <ServicePageCaption>
                          <h6>Dialysis</h6>
                        </ServicePageCaption>
                      </ServicePageItem>
                      <ServicePageItem>
                        <ServicePageImage>
                          <img src={Default3} alt="Album" />
                        </ServicePageImage>
                        <ServicePageCaption>
                          <h6>Laparoscopic surgery</h6>
                        </ServicePageCaption>
                      </ServicePageItem>
                      <ServicePageItem>
                        <ServicePageImage>
                          <img src={Default3} alt="Album" />
                        </ServicePageImage>
                        <ServicePageCaption>
                          <h6>Laparoscopic surgery</h6>
                        </ServicePageCaption>
                      </ServicePageItem>
                    </>
                }
              </React.Fragment>
            </ServicePageGrid>
          </ServiceHomePage>
        </ServiceHomePageSection>
      </Container>
    </React.Fragment>
  )
}

export default ServicePage