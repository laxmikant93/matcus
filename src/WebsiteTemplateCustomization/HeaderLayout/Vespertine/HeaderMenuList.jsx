import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import AppLink from "../../../Common/AppLink";
import IntersectionObserverWrap from "../../../Common/OverflowMenu/intersection-observer-wrapper";
import { selectRouteForPreview } from "../../../store/actions/WebsiteTemplate";
import { NavMenuCustom, NavMenuWrapperDropdown } from "../Vespertine/Header.styled";
import Dropdown from "../../CommonComponent/Drowpdown/Dropdown"


const ListWrap = styled.li`
  position:relative;
  text-align:start;
`

const HeaderMenuList = ({ preview }) => {
  let scrl = useRef(null);
  const { dynamicHeaderData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { subheadersData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { homecomponenthideData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { route, previewData } = useSelector((state) => state.websiteTemplate.getTemplate)
  const { instituteData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const { pathname } = useLocation()
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch()
  const handleOnClick = (index) => {
    setActiveIndex(index); // remove the curly braces
  };
  const { _id } = useParams()
  const handleSelectPage = (item, index) => {
    dispatch(selectRouteForPreview(item, true))
    handleOnClick(index)
  }


  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);
  //Slide click
  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const [HoverId, setHoverId] = useState(null)

  const HoverDropHande = (item) => {
    setHoverId(item)
  }


  // const scroller = document.querySelector(".navwrap");
  // const dropDown = document.querySelectorAll(".dropdown");
  // scroller.addEventListener("scroll", checkScroll);

  //   function checkScroll() {
  //     document.activeElement.blur();
  //     scroller.classList.add("isScrolling");
  //     for (let i = 0; i < dropDown.length; i++) {
  //       dropDown[i].style.transform =
  //       "translateX(-" + scroller.scrollLeft + "px)";
  //     }
  //     scroller.classList.remove("isScrolling");
  //   }

  // console.log(dynamicHeaderData, "lineuuuuuuuuuu")
  return (
    <React.Fragment>
      {
        (instituteData._id === "62e0bded569df55ac343a893" || instituteData._id === "636a0657a96e827c3a04cbd0" || instituteData._id === "639d4f48eb146b07a4535c55") ? (
          <>
            {
              preview ? (
                <NavMenuWrapperDropdown className="navwrap" ref={scrl} onScroll={scrollCheck}>
                  <ul className="nav">
                    {scrollX !== 0 && (
                      <button
                        className="menuPrevClass"
                        onClick={() => slide(-50)}
                      >
                      </button>
                    )}
                    {dynamicHeaderData && dynamicHeaderData.dynamic_header && dynamicHeaderData.dynamic_header.length > 0 && dynamicHeaderData.dynamic_header.filter((item) => item.showOnHeader === true).map((headerMenuList, index) => {
                      return (
                        <React.Fragment>
                          <li>
                            <NavLink onMouseEnter={() => HoverDropHande(headerMenuList)} exact={true} key={index} data-targetid={index} to={headerMenuList.path} onClick={() => handleOnClick(index)} className={pathname === headerMenuList.path && "active"}>
                              {(subheadersData && subheadersData[headerMenuList.titleKey]) || headerMenuList.title}
                            </NavLink>
                            {
                              HoverId && (headerMenuList.path === '/aboutus' || headerMenuList.path === '/services' || headerMenuList.path === '/announcements' || headerMenuList.path === '/miscellaneous') && (
                                <Dropdown preview={preview} WrapperClass={"dropdown"} ListData={headerMenuList.title} HoverItem={HoverId} />
                              )
                            }
                          </li>
                        </React.Fragment>
                      )
                    })
                    }
                    {!scrolEnd && (
                      <button
                        className="menuNextClass"
                        onClick={() => slide(+50)}
                      >
                      </button>
                    )}
                  </ul>
                </NavMenuWrapperDropdown>
              ) : (
                <NavMenuWrapperDropdown className="navwrap" ref={scrl} onScroll={scrollCheck}>
                  <ul className="nav">
                    {scrollX !== 0 && (
                      <button
                        className="menuPrevClass"
                        onClick={() => slide(-50)}
                      >
                      </button>
                    )}
                    {dynamicHeaderData && dynamicHeaderData.dynamic_header && dynamicHeaderData.dynamic_header.length > 0 && dynamicHeaderData.dynamic_header.filter((item) => item.showOnHeader === true).map((headerMenuList, index) => {
                      return (
                        <React.Fragment>
                          <li>
                            <NavLink onMouseEnter={() => HoverDropHande(headerMenuList)} exact={true} key={index} data-targetid={index} to={headerMenuList.path} onClick={() => handleOnClick(index)} className={pathname === headerMenuList.path && "active"}>
                              {(subheadersData && subheadersData[headerMenuList.titleKey]) || headerMenuList.title}
                            </NavLink>
                            {
                              HoverId && (headerMenuList.path === '/aboutus' || headerMenuList.path === '/services' || headerMenuList.path === '/announcements' || headerMenuList.path === '/miscellaneous') && (
                                <Dropdown WrapperClass={"dropdown"} ListData={headerMenuList.title} HoverItem={HoverId} />
                              )
                            }
                          </li>
                        </React.Fragment>
                      )
                    })
                    }
                    {!scrolEnd && (
                      <button
                        className="menuNextClass"
                        onClick={() => slide(+50)}
                      >
                      </button>
                    )}
                  </ul>
                </NavMenuWrapperDropdown>
              )
            }
          </>
        ) : (
          <>
            {
              preview ?
                <NavMenuCustom>
                  <IntersectionObserverWrap LongMenuWrapProp="LongMenuWrapProp">

                    {dynamicHeaderData && dynamicHeaderData.dynamic_header && dynamicHeaderData.dynamic_header.length > 0 && dynamicHeaderData.dynamic_header.filter((item) => item.showOnHeader === true).map((headerMenuList, index) => {
                      return (
                        <button key={index} data-targetid={index} onClick={() => handleSelectPage(headerMenuList.path, index)} className={activeIndex === index ? "active" : ""}>
                          {(subheadersData && subheadersData[headerMenuList.titleKey]) || headerMenuList.title}
                        </button>

                      );
                    })}
                  </IntersectionObserverWrap>
                </NavMenuCustom> :
                <NavMenuCustom>
                  <IntersectionObserverWrap LongMenuWrapProp="LongMenuWrapProp">

                    {dynamicHeaderData && dynamicHeaderData.dynamic_header && dynamicHeaderData.dynamic_header.length > 0 && dynamicHeaderData.dynamic_header.filter((item) => item.showOnHeader === true).map((headerMenuList, index) => {
                      return (
                        <NavLink exact={true} key={index} data-targetid={index} to={headerMenuList.path} onClick={() => handleOnClick(index)} className={pathname === headerMenuList.path && "active"}>
                          {(subheadersData && subheadersData[headerMenuList.titleKey]) || headerMenuList.title}
                        </NavLink>
                      );
                    })}
                  </IntersectionObserverWrap>
                </NavMenuCustom>
            }
          </>
        )
      }



    </React.Fragment>
  )
}
export default HeaderMenuList