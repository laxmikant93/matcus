import React from 'react';
import Modal from '../Modal';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import ModalHeader from '../Modal/ModalHeader';

const AutoLogoutModal = ({ show, reset, closeModal }) => {

    return (
        <div>
            <Modal show={show}>
                <ModalHeader
                    title="Your Session will logout in 5 minutes"
                    closeButton={true}
                    onclose={closeModal}
                />
                <ModalBody>

                </ModalBody>
                <ModalFooter>
                    <button
                        className="button btn-md button-theme"
                        onClick={reset}
                    >
                        Click here to Continue
                    </button>

                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AutoLogoutModal;