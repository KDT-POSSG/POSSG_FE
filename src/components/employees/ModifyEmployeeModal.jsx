import React, { useState } from 'react';
import Modal from "../Modal";
import TerminateEmployeeModal from './TerminateEmployeeModal';


function ModifyEmployeeModal(){
    const [modalIsOpen, setModalIsOpen] = useState(false);
 
    const openModal = (type) => {
        setModalIsOpen(true);
       };
   
       const closeModal = () => {
       setModalIsOpen(false);
       };

    return(
        <div>
            <h1>직원 수정 모달</h1>
            <input placeholder="이름" />
            <input placeholder="성별" />
            <input placeholder="연락처" />
            <button>저장</button>
            <button onClick={openModal}>퇴사</button>

            <Modal isOpen={modalIsOpen} onClose={closeModal}>
                <TerminateEmployeeModal />
            </Modal>
        </div>
    )
}

export default ModifyEmployeeModal;