import React from 'react';
import { useState } from 'react';

import Modal from '../ui/Modal';
import EmployeeSeq from './EmployeeSeq';
import Attendace from './Attendance';
import LeaveWork from './LeaveWork';



function AttendanceCehck(){
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [workType, setWorkType] = useState(null);

    //모달
    const openModal = (type) => {
        setWorkType(type);
        setModalIsOpen(true);
       };
       const closeModal = () => {
       setModalIsOpen(false);
       };


    return(
        <div>
            <button onClick={() => openModal('attendance')}>출근</button>
            <button onClick={() => openModal('leavework')}>퇴근</button>

        <Modal isOpen={modalIsOpen} onClose={closeModal}>
            {workType === 'attendance' && <Attendace onClose={closeModal} />}
            {workType === 'leavework' && <LeaveWork onClose={closeModal} />}
        </Modal>
        </div>
    )
}

export default AttendanceCehck;