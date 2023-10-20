import React, { useState } from 'react';
import stockSortDatas from '../../assets/datas/stockSortDatas.json'
import Modal from 'components/ui/Modal';
import StockDispose from './StockDispose';

function StockNav({ search, setSearch, setFilter, setPage }) {

  const [keyword, setKeyword] = useState(search);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalOpen = () => {
    setIsModalOpen(true);
  }

  const modalClose = () => {
    setIsModalOpen(false);
  }

  const handleSearchBtn = () => {
    setSearch(keyword);
    setPage(1);
  }

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  }

  const handleFilter = (e) => {
    setFilter(e.target.value);
    setPage(1);
  }

  return (
    <div className='stock-top-nav'>

      <div>
        <button className='stock-dispose' onClick={modalOpen}>상품 폐기</button>

        <Modal isOpen={isModalOpen} onClose={modalClose} style={{ content: { width: '24rem', height: '13rem' } }}>
          <StockDispose />
        </Modal>
      </div>

      <div className='stock-search-container'>
        <div className='stock-search'>
          <input type="text" placeholder='검색할 상품을 입력해주세요' value={keyword} onChange={handleKeyword} />
          <button type='button' onClick={handleSearchBtn}>
            <span className="material-symbols-rounded">search</span>
          </button>
        </div>

        <div className='stock-sort'>
          <select onChange={handleFilter}>
            {
              stockSortDatas && stockSortDatas.map((item) => (
                <option key={item.id} value={item.value}>{item.title}</option>
              ))
            }
          </select>
          <span className="material-symbols-rounded">expand_more</span>
        </div>
      </div>

    </div>
  )
}

export default StockNav;