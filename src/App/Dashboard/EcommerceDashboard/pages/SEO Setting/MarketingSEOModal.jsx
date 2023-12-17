import React, { useState } from 'react'
import AppLink from '../../../../../Common/AppLink'
import Modal from '../../../../../Common/Modal'
import ModalBody from '../../../../../Common/Modal/ModalBody'
import ModalFooter from '../../../../../Common/Modal/ModalFooter'
import ModalHeader from '../../../../../Common/Modal/ModalHeader'
import '../sidebar.scss'
import SeoBasic from "./SeoBasic";
import SeoShare from "./SeoShare"

const MarketingSEOModal = ({ onClose, show }) => {
  const [activeTab, setActiveTab] = useState("tab1");

  const closeModal = () => {
    onClose()
  }

  const handleTab1 = () => {
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    setActiveTab("tab2");
  };

  return (
    <React.Fragment>
      <Modal show={show}>
        <ModalHeader
          closeButton={true}
          onclose={closeModal}
          className="media-modal-head"
        >
          <h4>SEO Settings</h4>
        </ModalHeader>
        <ModalBody>
          <div className="seo-tab-wrapper">
            <ul className="nav">
              <li
                className={activeTab === "tab1" ? "active" : ""}
                onClick={handleTab1}
              >
                SEO basics
              </li>
              <li
                className={activeTab === "tab2" ? "active" : ""}
                onClick={handleTab2}
              >
                SEO share
              </li>
            </ul>
            <div className="TabInfo_wrapper">
              {
                activeTab === "tab1" ? <SeoBasic /> : <SeoShare />
              }
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="contextinfo-wrapper">
            <h4 className="mb-10">Hire a professional</h4>
            <h3>Optimize your store's product pages with the
              help of an expert. <AppLink to="#" className="underline">Contact us</AppLink></h3>
          </div>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  )
}

export default MarketingSEOModal