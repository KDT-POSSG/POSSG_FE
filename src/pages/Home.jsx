import React, { useEffect, useState } from 'react';
import homeMenuDatas from '../assets/datas/homeMenuDatas'
import HomeItem from 'components/home/HomeItem';
import HomeItemEdit from 'components/home/HomeItemEdit';

function Home() {

  const [homeMenu, setHomeMenu] = useState();

  useEffect(() => {
    setHomeMenu(homeMenuDatas);
  }, []);

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
        <HomeItemEdit />
      </div>

    </div>
  )
}

export default Home;