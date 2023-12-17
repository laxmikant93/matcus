import React, { useRef } from 'react'
import AppLink from '../../Common/AppLink';
import { useDetectOutsideClick } from "../../Common/DetectOutsideClick/useDetectOutsideClick";

const MySitesDropdownMenu = () => {
  const dropdownRef = useRef(null);

  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const manageActive = () => {
    setIsActive(!isActive)
  }

  return (
    <React.Fragment>
      <div className="MySitesDropdownMenuCustom">
        {/* <button type="button" className={`isActive && "active"`} onClick={manageActive}>My Sites</button> */}

        {isActive &&
          <div className="MySitesDropdownMenuListWrapper" ref={dropdownRef}>
            <ul className="MySitesDropdownMenuList">
              <li className="MySitesDropdownMenuListItemHead">
                <h4>Sites Last Opened</h4>
                <AppLink to="">Create New Site</AppLink>
              </li>
              <li className="MySitesDropdownMenuListItemBody">
                <ul>
                  <li className="active">
                    <div className="MySitesImage">
                      <span></span>
                    </div>
                    <button type="button" className="MySitesCopyIcon"></button>
                  </li>
                  <li className="">
                    <div className="MySitesImage">
                      <span></span>
                    </div>
                    <button type="button" className="MySitesCopyIcon"></button>
                  </li>
                  <li className="">
                    <div className="MySitesImage">
                      <span></span>
                    </div>
                    <button type="button" className="MySitesCopyIcon"></button>
                  </li>
                  <li className="">
                    <div className="MySitesImage">
                      <span></span>
                    </div>
                    <button type="button" className="MySitesCopyIcon"></button>
                  </li>
                  <li className="">
                    <div className="MySitesImage">
                      <span></span>
                    </div>
                    <button type="button" className="MySitesCopyIcon"></button>
                  </li>
                  <li className="">
                    <div className="MySitesImage">
                      <span></span>
                    </div>
                    <button type="button" className="MySitesCopyIcon"></button>
                  </li>
                  <li className="">
                    <div className="MySitesImage">
                      <span></span>
                    </div>
                    <button type="button" className="MySitesCopyIcon"></button>
                  </li>
                </ul>
              </li>
              <li className="MySitesDropdownMenuListItemFooter">
                <AppLink to="">Go to All Sites</AppLink>
              </li>
            </ul>
          </div>}
      </div>
    </React.Fragment>
  )
}

export default MySitesDropdownMenu