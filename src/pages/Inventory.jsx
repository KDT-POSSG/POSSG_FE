import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import InvenModal from '../components/inventory/InvenModal';


function Inventory() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [lastUpdateTime, setLastUpdateTime] = useState(null);

    useEffect( () => {
        const timer = setInterval(() => {
            setCurrentTime(new Date() );
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const formattedTime = `${currentTime.getFullYear()}.${String(currentTime.getMonth() + 1).padStart(2, '0')}.${String(currentTime.getDate()).padStart(2, '0')} ${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}:${String(currentTime.getSeconds()).padStart(2, '0')}`;
    
    const updateLastTime = (time) => {
        setLastUpdateTime(time);
    }

    const openModal = () => {
     setModalIsOpen(true);
    };

    const closeModal = () => {
    setModalIsOpen(false);
    };
    return (
        <div>
            <h1 className='page-title'>시재 관리</h1>
            <hr/>
            <div className='inven-content'>
                <h2 className='present-time'>현재 시간 : { formattedTime }</h2>
                
            <div className='center-container'>
                <button className='inven-btn' onClick={openModal}>시재 입력</button>
            </div>
                <div className='inventory-table'>
                <table>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>지점명</th>
                        <th>시재 입력 시간</th>
                        <th>시재 금액</th> 
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    
                    </tbody>
                </table>
                </div>
            </div>


            <Modal isOpen={modalIsOpen} onClose={closeModal}>
                <InvenModal updateLastTime={ updateLastTime }/>
            </Modal>
        </div>
    )
}


export default Inventory;
