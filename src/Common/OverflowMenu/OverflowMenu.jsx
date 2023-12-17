import React, { useState, useMemo, useRef, useEffect } from "react";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import styled from 'styled-components'
import classnames from "classnames";
// import { IconButton, Menu, MenuItem } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
import Styles from "./style.module.scss";
import { useDetectOutsideClick } from "../DetectOutsideClick/useDetectOutsideClick";
import Dropdown from "../Dropdown/Dropdown";
import DropdownButton from "../Dropdown/DropdownButton";
import { useSelector } from "react-redux";


const LongMenuWrap = styled.div`
position: absolute;
  top: 74px;
  right: 0;
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px 4px;
  min-width: 160px;
  max-width: 200px;
  background: ${({ theme }) => theme.Header.Background}; ;
  /* background-color: #fff; */
  display: flex;
    flex-direction: column;
    gap: 8px;
    &.stickydrop{
      top: 65px;
    }
    &.Vaspertine_Active{
      top: 44px;
      padding: 20px 16px;
    }
`

export default function OverflowMenu({ children, className, classNameInner, visibilityMap, LongMenuWrapProp }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dropdownRef = useRef(null);
  const { theme, themeSuccess } = useSelector((state) => {
      return {
        theme: state.websiteTemplate.getTemplate.data,
        themeSuccess: state.websiteTemplate.getTemplate.success,
      }
    })




  const [isActive, setIsActive] = useDetectOutsideClick(
    dropdownRef,
    false
  );
  const handleDropdown = () => {
    setIsActive(!isActive)
  }
  const open = Boolean(anchorEl);
  // const classes = inOverflowMenu();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const shouldShowMenu = useMemo(
  //   () => Object.values(visibilityMap).some((v) => v === false),
  //   [visibilityMap]
  // );
  // if (!shouldShowMenu) {
  //   return null;
  // }
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    // just trigger this so that the initial state 
    // is updated as soon as the component is mounted
    // related: https://stackoverflow.com/a/63408216
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
    {/* <DropdownButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          // onClick={handleDropdown}
          Title="OverFlowMenuDropdown"
        >
          More<i>&nbsp;</i>++
        </DropdownButton> */}
          {/*   {isActive && */}
      <div className={className}>
      <div className={classNameInner}>
        <Dropdown Title="OverFlowMenuDropdown">
        <LongMenuWrap
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          // className={`${Styles.LongMenuWrap} ${LongMenuWrapProp}`}
          className={`${themeSuccess && theme.themeGlobal.component === "Vespertine_Body" ? "" : (scrollY > 100 ? "stickydrop" : "")} ${themeSuccess && theme.themeGlobal.component === "Vespertine_Body" ? "Vaspertine_Active" : ""} ${LongMenuWrapProp}`}
        >
          {React.Children.map(children, (child) => {
            if (!visibilityMap[child.props["data-targetid"]]) {
              return (
                <div key={child} onClick={handleClose}>
                  {React.cloneElement(child, {
                    className: classnames(child.className, Styles.InOverflowMenu)
                  })}
                </div>
              );
            }
            return null;
          })}
        </LongMenuWrap>
        </Dropdown>
        {/* } */}
      </div>
    </div>
    </React.Fragment>
  );
}
