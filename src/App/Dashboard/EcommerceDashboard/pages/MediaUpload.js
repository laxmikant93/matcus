import React, { useRef } from 'react'
import AppLink from '../../../../Common/AppLink'
import Cropper from '../../../../Common/Cropper'
import Modal from '../../../../Common/Modal'
import ModalBody from '../../../../Common/Modal/ModalBody'
import ModalHeader from '../../../../Common/Modal/ModalHeader'
import SearchControl from '../../../../Common/SearchControl'
import "./addProduct.scss"

const MediaUpload = ({ show, onClose }) => {
  const ref = useRef()
  const closeModal = () => {
    onClose()
  }
  return (
    <React.Fragment>
      <Modal show={show}>
        <ModalHeader
          closeButton={true}
          onclose={closeModal}
          className="media-modal-head"
        >
          <h4>Choose Images</h4>
        </ModalHeader>
        <ModalBody>
          <div className="media-modal-body">
            <aside>
              <h5>EXPLORE</h5>
              <ul>
                <li>
                  <AppLink to="">EXPLORE</AppLink>
                </li>
                <li>
                  <AppLink to="">Pixabay</AppLink>
                </li>
                <li>
                  <AppLink to="">Unsplash</AppLink>
                </li>
              </ul>
            </aside>
            <main>
              <div>
                <div className="headerItem headerSearchBar mb-40">
                  <SearchControl
                    classNameWrappper="tableSearchbar"
                    placeholder="Search..."
                  />
                </div>
              </div>
              <div className="Mediauploadfile-wrap">
                <i className='file-icon'></i>
                <h5>Start adding your Menu</h5>
                <p className="pb-30">Drag and drop files or upload from your computer</p>
                <label htmlFor="upload" className="button button-primary mb-20 upload-file">
                  <input type="file" id="upload" hidden />
                  + Upload Media
                </label>
                <Cropper ref={ref} />
                <small>Upload the files in .jpg, .png, .pdf formats only</small>
              </div>
            </main>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  )
}

export default MediaUpload;