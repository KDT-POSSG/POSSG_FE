import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import InvenModal from '../components/inventory/InvenModal';
import axios from 'axios';
import Pagination from "react-js-pagination"; // npm i react-js-pagination
import { addComma } from 'store/utils/function';
import { toast } from "react-hot-toast";


function Inventory() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [lastUpdateTime, setLastUpdateTime] = useState(null);
    const [inventoryList, setInventoryList] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);  // 선택된 행의 인덱스를 저장
    const [totalCnt, setTotalCnt] = useState(0);
    const [page, setPage] = useState(1);  // 현재 페이지
    const [itemsPerPage, setItemsPerPage] = useState(5);  // 한 페이지에 5개 아이템
    const [currentPageData, setCurrentPageData] = useState([]);
    

    //페이지
    useEffect(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setCurrentPageData(inventoryList.slice(start, end));
    }, [inventoryList, page, itemsPerPage]); 

    //시간
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
    
    //모달
    const openModal = () => {
     setModalIsOpen(true);
    };
    const closeModal = () => {
    setModalIsOpen(false);
    };

    //시재 리스트 불러오기
    useEffect(() => {
        axios.get('http://54.180.60.149:3000/settlementlist', {params: {convSeq :1, page : page}}) //convSeq는 나중에 로그인한 지점의 seq로 변경
        .then((res) => {
            setInventoryList(res.data.settlement);
            setTotalCnt(res.data.cnt);
            
        })
        .catch((err) => {
            console.log(err);
            console.log('시재 리스트 불러오기 실패');
        });
    }, [page]);

   //시재 리스트 메모 드롭다운
    const handleRowClick = (index) => {
        if (selectedRow === index) {
            setSelectedRow(null);  // 이미 선택된 행을 다시 클릭하면 드롭다운을 닫
        } else {
            setSelectedRow(index);  // 새로운 행을 클릭하면 해당 행의 인덱스 저장
        }
    };

    return (
        <div className='inventory'>
            
            <div className='inven-content'>
                <div className='page-title'>시재 관리</div>
                <div className='present-time'>현재 시간 : { formattedTime }</div>
            <div className='btn-container'>
                <button className='inven-btn' onClick={ openModal }>시재 입력</button>
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
                        {
                            currentPageData.length === 0 ? (
                                <tr className='inventory-empty'>
                                    <td colSpan="4">📝</td>
                                </tr>
                            ) : (
                                currentPageData.map((item, index) => (
                                    <>
                                    <tr key={index} onClick={() => handleRowClick(index)}>
                                        <td>{item.seq}</td>
                                        <td>{item.convName}</td>
                                        <td>{item.rdate}</td>
                                        <td>{addComma(item.cash)}</td>
                                    </tr>
                                    {selectedRow === index && (
                                            <tr className='drop-memo-container'>
                                                <td colSpan="4">
                                                    <div className='drop-memo'>┗  {item.memo}</div>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                ))
                            )
                        }
                    </tbody>
                </table>
                </div>
            </div>

            <Pagination
                activePage={page}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={totalCnt}
                pageRangeDisplayed={5}
                onChange={(pageNumber) => setPage(pageNumber)}
                firstPageText={<span className="material-symbols-rounded page-btn">keyboard_double_arrow_left</span>}
                prevPageText={<span className="material-symbols-rounded page-btn">chevron_left</span>}
                nextPageText={<span className="material-symbols-rounded page-btn">chevron_right</span>}
                lastPageText={<span className="material-symbols-rounded page-btn">keyboard_double_arrow_right</span>}
            />

            <Modal isOpen={modalIsOpen} onClose={ closeModal } >
                <InvenModal updateLastTime={ updateLastTime }/>
            </Modal>
        </div>
    )
}

export default Inventory;
