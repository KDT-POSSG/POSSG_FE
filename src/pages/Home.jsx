import React from 'react';
import homeMenuDatas from '../assets/datas/homeMenuDatas'
import HomeItem from 'components/home/HomeItem';

function Home() {
  return (
    <div className='home-page'>
      
      <div className='home-container'>
        {/* <div className='home-item'>결제</div>
        <div className='home-item'>배달</div>
        <div className='home-item'>재고 관리</div>
        <div className='home-item'>시재</div>
        <div className='home-item'>1</div>
        <div className='home-item'>2</div> */}
        {
          homeMenuDatas && homeMenuDatas.map((item) => (
            item.favoriteEnable === "enable" ?
            (<HomeItem key={item.seq} item={item} />)
            :
            (<React.Fragment key={item.seq}></React.Fragment>)
          ))
        }
        <div className='home-item home-edit'>
          <span className="material-symbols-rounded home-add-icon">add_circle</span>
          추가 및 편집
        </div>
      </div>

    </div>
  )
}

export default Home;