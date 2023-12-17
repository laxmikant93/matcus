import React from 'react';
import Modals from '../../../../Common/Modals';
import ModalHeader from '../../../../Common/Modals/ModalsHeader';
import ModalBody from '../../../../Common/Modals/ModalsBody';
import './accountPopup.scss';
import { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { DeactivateUserInfo, DeleteUserInfo } from '../../../../store/actions/user';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AccountPopup = forwardRef(({ onclose, title, text, pass, type, setErrorMessage }, ref) => {

  let dispatch = useDispatch();
  let history = useNavigate();

  const { user } = useSelector((state) => {
    return {
      user: state.user,
    }
  })

  const closeModal = () => {
    onclose();
  }

  const handleYesButton = () => {
    if (type === "Delete") {
      let data = { password: pass }
      dispatch(DeleteUserInfo(data, user._id, user.user_business_type, history));
    }
    else if (type === "Deactivate") {
      let data = { password: pass }
      // console.log("ApI hit");
      dispatch(DeactivateUserInfo(data, user._id, user.user_business_type));
    }
  }

  useEffect(() => {
    if (user.error && user.error === true) {
      setErrorMessage("Password doesn't exist!");
      onclose();
    }
  }, [onclose, setErrorMessage, user.error])

  return (
    <React.Fragment>
      <Modals ref={ref} Position="center" slide="center" ClosePopUp={() => closeModal()} ModalsSize={'modal-s'}>
        <ModalHeader title={title} />
        <ModalBody>
          <div className='account-wrapper'>
            <div className='accont-text-wrap'>
              <p className='accont-text base w-500'>{text}</p>
            </div>
            <div className='btn-wrap'>
              <button className='button btn-account btn-2xs btn-oval btn-o-silver' onClick={() => closeModal()}>No</button>
              <button className='button  btn-account btn-2xs btn-oval button-red' onClick={handleYesButton}>Yes</button>
            </div>
          </div>
        </ModalBody>
      </Modals>
    </React.Fragment>
  )
}
)

export default AccountPopup