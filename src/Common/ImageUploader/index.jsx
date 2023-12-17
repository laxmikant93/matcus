import React from 'react';
import { useState } from 'react';
import './imageUploader.scss';
import Modals from '../Modals';
import ModalsBody from '../Modals/ModalsBody';
import ModalsHeader from '../Modals/ModalsHeader';
import Tabs from './Tabs/Tabs';
import UploadSection from './UploadSection/UploadSection';
// import MyFiles from './MyFiles';
// import ModalsFooter from '../Modals/ModalsFooter';


const Uploader = ({ onclose, multiSelect, discartRef, onUploaded, search, uploadLimit, size,accept,validationProp ,bulkUploadTrue}) => {
  const closeModal = () => {
    onclose();
  }
  const [toggleState, setToggleState] = useState(1);
  const handleToggleState = (index) => {
    setToggleState(index);
  }
  const onUpload = (value) => {
    onUploaded(value)
  }
  return (
    <React.Fragment>
      <Modals ref={discartRef} Position="center" slide="top" ClosePopUp={() => closeModal()} ModalsSize={'modal-l'} className={"modalWidth"}>
        <ModalsHeader title={'Choose Images'} />
        <ModalsBody className={'uploadImage-modalBody'}>
          <div className='uploadimagepop-container'>
            <div className='tabContainer'>
              {/* tab components */}
              <Tabs toggleState={toggleState} handleToggleState={handleToggleState} />
              <div className='tab-content-div'>
                <UploadSection bulkUploadTrue={bulkUploadTrue} size={size} accept={accept} validationProp={validationProp} toggleState={toggleState} onUpload={onUpload} multiSelect={multiSelect} discartRef={discartRef} searchTerm={search} uploadLimit={uploadLimit} />
                {/* <MyFiles /> */}
              </div>
            </div>
          </div>
        </ModalsBody>
      </Modals>
    </React.Fragment>
  )
}

export default Uploader