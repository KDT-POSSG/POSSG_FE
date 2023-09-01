import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import InvenModal from '../components/inventory/InvenModal';
import '../styles/page/inventory/inventory.css';


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
            <h1 className='inven-title'>시재 관리</h1>
            <hr/>
            <div className='inven-content'>
                <h2 className='last-time'>최근 시재 입력시간 : { lastUpdateTime ? `${lastUpdateTime.getFullYear()}.${String(lastUpdateTime.getMonth() + 1).padStart(2, '0')}.${String(lastUpdateTime.getDate()).padStart(2, '0')} ${String(lastUpdateTime.getHours()).padStart(2, '0')}:${String(lastUpdateTime.getMinutes()).padStart(2, '0')}:${String(lastUpdateTime.getSeconds()).padStart(2, '0')}` : "없음" }</h2><br/><br/><br/>
                <h2 className='present-time'>현재 시간 : { formattedTime }</h2>
            </div>

            <div className='center-container'>
                <button className='inven-btn' onClick={openModal}>시재 입력</button>
            </div>

            <Modal isOpen={modalIsOpen} onClose={closeModal}>
                <InvenModal updateLastTime={ updateLastTime }/>
            </Modal>
        </div>
    )
}


export default Inventory;
