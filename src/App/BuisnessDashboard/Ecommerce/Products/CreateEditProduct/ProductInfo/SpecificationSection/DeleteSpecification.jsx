import React from 'react'
import Modals from "../../../../../../../Common/Modals";
import ModalsHeader from "../../../../../../../Common/Modals/ModalsHeader";
import ModalsBody from "../../../../../../../Common/Modals/ModalsBody";


const DeleteSpecification = ({ deleteInfoRef, onClose, infoDataArray, setInfoDataArray, infoIndex, setInfoIndex }) => {

  const closeModal = () => {
    onClose();
    setInfoIndex("");
  }

  const handleCloseDeletePopup = () => {
    deleteInfoRef.current.close();
    setInfoIndex("");
  }

  const handleYesButton = () => {
    let data = infoDataArray.filter((item, i) => i !== infoIndex);
    setInfoDataArray([...data]);
    deleteInfoRef.current.close();
    setInfoIndex("");
  }

  return (
    <React.Fragment>
      <Modals ref={deleteInfoRef} Position="center" slide="top" ClosePopUp={() => closeModal()} ModalsSize="modal-s">
        <ModalsHeader
          className="deletepop-header"
          title={'Delete this info section'} />
        <ModalsBody>
          <div className='discart-container'>
            <p className='text-xs w-500 base'>The information section will get removed from your site.</p>
            {/* <p className='text-xs w-500 base'>Do you really want to discard all the changes ?</p> */}
            <div className='discard-btn-wrapper mt-35'>
              <button className='button btn-sm btn-o-gray'
                onClick={handleCloseDeletePopup}
              >Cancel
              </button>
              <button className='button btn-sm button-red'
                onClick={handleYesButton}
              > Yes Delete
              </button>
            </div>
          </div>
        </ModalsBody>
      </Modals>
    </React.Fragment>
  )
}

export default DeleteSpecification
