import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { pushDropDown, selectRouteForPreview } from '../../../store/actions/WebsiteTemplate';

const DropdownListWrapper = styled.ul`
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        left: auto;
        top: auto;
        opacity: 1;
        transition: opacity 0.5s linear, top 0.5s;
        display: flex;
        justify-content: center;
        flex-direction: column;
        border-radius:8px;
        width: 200px;
        padding: 13px 18px;
        background: #FFFFFF;
        
`;

const ListWrap = styled.li`
 ${'' /* display:flex ;
  align-item:Center;
  justify-content:flex-start;
  flex-direction:column; */}
`
const ListButton = styled.button`
      background: #FFFFFF;
      padding:8px 0;
      color:#202020;
      font-weight: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.FontWeight};
                font-size: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.FontSize};
                line-height: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.LineHeight};
                ${'' /* color: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.Color}; */}
                font-family: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.FontFamily};
      &:hover{
      color: ${({ theme }) => theme.Header.NavMenuWrapper.NavMenuCustom.Hover.Color};
      }
      
`
const Dropdown = ({ WrapperClass, children, Title, State, ListData, HoverItem,preview }) => {
  const { homecomponenthideData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { facilitiesData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const pushDropDownCheck = useSelector((state) => state.websiteTemplate.pushDropDown.data)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { NoticeBoardData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { announcementData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const dispatch=useDispatch()
  const history=useNavigate()
  // console.log(pushDropDownCheck,"lline 48")
  const OnClickRedirect = (section,item,secitonTile) => {
    if (section === "/aboutus") {
      if(preview){
        dispatch(selectRouteForPreview(section, true))
        dispatch(pushDropDown(item,section,secitonTile))
      }else{
        history(section)
        dispatch(pushDropDown(item,section,secitonTile))
      }
      
    } else {
      if(preview){
        dispatch(selectRouteForPreview(section, true))
        dispatch(pushDropDown(item,section,secitonTile))
      }else{
        history(section)
        dispatch(pushDropDown(item,section,secitonTile))
      }
      
    }
  }


  function truncate(str) {
    return str.length > 20 ? str.substring(0, 18) + "..." : str;
  }


  function AboutUsSectionRender(key){
    switch (key) {
      case "Aboutus":
          return(
            truncate(instituteData.institute_about_head)
          )
      case "Mission":
        return(
          truncate(instituteData.institute_mission_head)
        )
      case "Vission":
        return(
          truncate(instituteData.institute_vision_head)
        )
      case "PrincipalWelcome":
        return(
          truncate(instituteData.institute_owner_name_head)
        )
      case "Videos":
        return(
          truncate("Videos")
        )
        default:
          break;
    }
  }

  // console.log(homecomponenthideData.length > 0 && homecomponenthideData[0].aboutSectionHideData.length && homecomponenthideData[0].aboutSectionHideData.find((item) => item.field === "Aboutus"),"jijiji")

  

  // console.log(homecomponenthideData,"aboutus data 82")

  const renderFunction = (key) => {
    switch (key) {
      case "/aboutus":
        return (
          <>
            {homecomponenthideData.length > 0 && homecomponenthideData[0].aboutSectionHideData.length && homecomponenthideData[0].aboutSectionHideData.map((item, key) => {
              return (
                <ListWrap >
                  <ListButton onClick={() => OnClickRedirect("/aboutus",null,item.title)}>
                    {AboutUsSectionRender(item.field)}
                  </ListButton>
                </ListWrap>
              )
            })
            }
          </>

        )
      case "/services":
        return (
          <>
            {facilitiesData.length > 0 && facilitiesData.map((item, key) => {
              return (
                <ListWrap >
                  <ListButton onClick={() => OnClickRedirect("/services",item._id)}>
                  {truncate(item.title)}
                  </ListButton>
                </ListWrap>
              )
            })
            }
          </>

        )
      case "/miscellaneous":
        return (
          <>
            {NoticeBoardData.length > 0 && NoticeBoardData.map((item, key) => {
              return (
                <ListWrap >
                  <ListButton onClick={() => OnClickRedirect("/miscellaneous",item._id)}>
                    {truncate(item.title)}
                  </ListButton>
                </ListWrap>
              )
            })
            }
          </>

        )
      case "/announcements":
        return (
          <>
            {announcementData.length > 0 && announcementData.map((item, key) => {
              return (
                <ListWrap >
                  <ListButton onClick={() => OnClickRedirect("/announcements",item._id)}>
                  {truncate(item.title)}
                  </ListButton>
                </ListWrap>
              )
            })
            }
          </>

        )
      default:
        break;
    }

  }
  return (
    <React.Fragment>
      <DropdownListWrapper className={`${WrapperClass}`} title={Title}>
        {renderFunction(HoverItem.path)}
      </DropdownListWrapper>
    </React.Fragment>
  )
}

export default Dropdown