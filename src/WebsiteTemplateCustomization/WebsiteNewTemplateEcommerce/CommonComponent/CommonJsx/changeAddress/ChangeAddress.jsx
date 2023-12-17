import React, { useState, useEffect } from 'react';
import Modal from '../../../../../Common/Modal';
import ModalBody from '../../../../../Common/Modal/ModalBody';
import ModalFooter from '../../../../../Common/Modal/ModalFooter';
import ModalHeader from '../../../../../Common/Modal/ModalHeader';
import './changeAddress.scss';
import RadioAddress from '../Address/RadioAddress';
import DeleteConfirmPop from '../DeleteConfirmPop/DeleteConfirmPop';

const ChangeAddress = ({ onClose, list, show, addAddress, deleteAddress, editAddress, selectAddress, selected }) => {

  const [addList, setAddList] = useState([]);
  const [deletepopup, setDeletePopup] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [selectedAddressId, setselectedAddressId] = useState("");

  useEffect(() => {
    if (list && list.length > 0) {
      let arr = list.map((vl, i) => {
        return { ...vl, selected: false };
      });
      setAddList([...arr]);
    }
  }, [list])
  const closeModal = () => {
    onClose()
  };
  const addAddressHandler = () => {
    addAddress();
    onClose();
  };

  const deleteHandler = () => {
    deleteAddress(deleteID);
    setDeletePopup(false);
  };

  const editHandler = (id) => {
    editAddress(id);
    onClose();
  }

  useEffect(() => {
    if (selected) {
      setselectedAddressId(selected);
    }
  }, [selected])

  const handleSelectDiv = async(id, i) => {
    // setDivSelected(!divSelected)
    // alert('hello')
    let arr =await addList.map((vl, j) => {
      if (i === j) {
        return { ...vl, selected: true };
      } else {
        return { ...vl, selected: false };
      }
    });
    setAddList(arr);
    setselectedAddressId(id);
  }


  const handleDeleteModal = (id) => {
    setDeletePopup(true);
    setDeleteID(id);
  }

  const handleDoneButton = () => {
    selectAddress(selectedAddressId);
    closeModal();
  }

  return (
    <React.Fragment>
      <Modal show={show}>
        <div className='modal-wrapper'>
          <ModalHeader
            closeButton={true}
            onclose={closeModal}
            className="media-modal-head"
          >
            <div className='form-wrapper'>
              <div className='address-header-wrap'>
                <h3 className='address-heading'>Change Delivery Address</h3>
                <button className='buttonTrue btnTrue-o-primary btn-xs ' onClick={addAddressHandler}>ADD NEW ADDRESS</button>
              </div>
            </div>
          </ModalHeader>
          <ModalBody className={'changeAddres-modalBody'}>
            <div className='form-wrapper'>
              <div className='address-list-wrapper'>
                {
                  addList && addList.length > 0 && addList.map(({ _id, ...options }, i) => {
                    return (
                      <div
                        className={`address-div selected-div`}
                      // onClick={() => handleSelectDiv(_id, i)}
                      // key={i}
                      >
                        <RadioAddress key={_id} {...options} selected={selectedAddressId === _id}
                          handleSelectDiv={() => handleSelectDiv(_id, i)} />

                        <div className='edit-btn-wrap'>
                          <button className='edit-btn' onClick={() => { editHandler(_id) }}>Edit</button>
                          <button className='edit-btn' onClick={() => handleDeleteModal(_id)}>Remove</button>
                          {deletepopup && <DeleteConfirmPop onClosePop={(val) => setDeletePopup(val)}
                            deleteHandler={deleteHandler} para="Are you sure you want to delete this address?" />}

                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className='form-wrapper'>
              <div className="footer-btn-wrapper">
                <button className='buttonTrue btnTrue-o-primary width-100' onClick={closeModal}>CANCEL</button>
                <button className='buttonTrue btnTrue-primary width-100  ' onClick={handleDoneButton}>Done</button>
              </div>
            </div>
          </ModalFooter>
        </div>
      </Modal>

    </React.Fragment >
  )
}

export default ChangeAddress