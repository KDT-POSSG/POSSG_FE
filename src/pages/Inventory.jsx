import React, { useState, useEffect } from "react";
import Modal from "../components/ui/Modal";
import InvenModal from "../components/inventory/InvenModal";
import axios from "axios";
import Pagination from "react-js-pagination"; // npm i react-js-pagination
import { addComma } from "store/utils/function";

function Inventory() {
  const accesstoken = localStorage.getItem("accesstoken");
  const convSeq = localStorage.getItem("convSeq");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastUpdateTime, setLastUpdateTime] = useState(null);
  const [inventoryList, setInventoryList] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); // 선택된 행의 인덱스를 저장
  const [totalCnt, setTotalCnt] = useState(0);
  const [page, setPage] = useState(1); // 현재 페이지
  const [itemsPerPage, setItemsPerPage] = useState(8); // 한 페이지에 5개 아이템
  const [currentPageData, setCurrentPageData] = useState([]);
  const [expandRows, setExpandRows] = useState({});

  const fetchInventoryData = () => {
    axios
      .get("http://54.180.60.149:3000/settlementlist", {
        params: { convSeq: convSeq, page: page },
        headers: { accessToken: `Bearer ${accesstoken}` },
      })
      .then((res) => {
        setInventoryList(res.data.settlement);
        setTotalCnt(res.data.cnt);
      })
      .catch((err) => {
        console.log(err);
        console.log("시재 리스트 불러오기 실패");
      });
  };

  useEffect(() => {
    fetchInventoryData();
    setExpandRows({});
  }, [page]);

  const handleLoadInventoryData = () => {
    fetchInventoryData();
    closeModal();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // 페이지네이션
  useEffect(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setCurrentPageData(inventoryList.slice(start, end));
  }, [inventoryList, page, itemsPerPage]);

  // 시재 입력 시간 포맷
  const formattedTime = `${currentTime.getFullYear()}.${String(
    currentTime.getMonth() + 1
  ).padStart(2, "0")}.${String(currentTime.getDate()).padStart(
    2,
    "0"
  )} ${String(currentTime.getHours()).padStart(2, "0")}:${String(
    currentTime.getMinutes()
  ).padStart(2, "0")}:${String(currentTime.getSeconds()).padStart(2, "0")}`;

  const updateLastTime = (time) => {
    setLastUpdateTime(time);
  };

  // 행 확장
  const handleToggleRow = (index) => {
    setExpandRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // 행 클릭 시 행 확장
  const handleRowClick = (index) => {
    if (selectedRow === index) {
      setSelectedRow(null); // 이미 선택된 행을 다시 클릭하면 드롭다운을 닫
    } else {
      setSelectedRow(index); // 새로운 행을 클릭하면 해당 행의 인덱스 저장
    }
  };

  return (
    <div className="inventory">
      <div className="inven-content">
        <div className="page-title">시재 관리</div>
        <div className="inventory-header">
          <div className="present-time">
            <span className="tossface">⏰</span>&nbsp;&nbsp;
            <span className="time">{formattedTime}</span>
          </div>
          <button className="inven-btn" onClick={openModal}>
            시재 입력
          </button>
        </div>
        <div className="inventory-table">
          <table>
            <thead>
              <tr>
                <th>번호</th>
                <th>지점명</th>
                <th>시재 입력 시간</th>
                <th>시재 금액</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.length === 0 ? (
                <tr className="inventory-empty">
                  <td colSpan="5" className="tossface">
                    📝
                  </td>
                </tr>
              ) : (
                currentPageData.map((item, index) => (
                  <React.Fragment key={index}>
                    <tr onClick={() => handleToggleRow(index)}>
                      <td>{(page - 1) * itemsPerPage + index + 1}</td>
                      <td>{item.convName}</td>
                      <td>{item.rdate}</td>
                      <td className="inventory-cash">
                        {addComma(item.cash)} 원
                      </td>
                      <td>
                        <button
                          onClick={() => handleRowClick(index)}
                          className={expandRows[index] ? "rotated" : ""}
                        >
                          <span className="material-symbols-rounded">
                            expand_more
                          </span>
                        </button>
                      </td>
                    </tr>
                    {expandRows[index] && (
                      <tr
                        className={`drop-memo-container ${
                          expandRows[index] ? "expanded" : ""
                        }`}
                      >
                        <td className="drop-memo-td" colSpan="5">
                          <div className="drop-memo">
                            <span className="tossface">💬&nbsp; </span>{" "}
                            {item.memo ? item.memo : " 특이사항이 없습니다."}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        className="pagination"
        activePage={page}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={totalCnt}
        onChange={(pageNumber) => setPage(pageNumber)}
        firstPageText={
          <span className="material-symbols-rounded page-btn">
            keyboard_double_arrow_left
          </span>
        }
        prevPageText={
          <span className="material-symbols-rounded page-btn">
            chevron_left
          </span>
        }
        nextPageText={
          <span className="material-symbols-rounded page-btn">
            chevron_right
          </span>
        }
        lastPageText={
          <span className="material-symbols-rounded page-btn">
            keyboard_double_arrow_right
          </span>
        }
      />

      <Modal
        isOpen={modalIsOpen}
        onClose={closeModal}
        style={{
          content: {
            height: "77%",
          },
        }}
      >
        <InvenModal
          updateLastTime={updateLastTime}
          closeModal={closeModal}
          onLoad={handleLoadInventoryData}
        />
      </Modal>
    </div>
  );
}

export default Inventory;
