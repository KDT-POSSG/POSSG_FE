import axios from 'axios';
import DeliveryProgress from 'components/delivery/DeliveryProgress';
import DeliveryRegister from 'components/delivery/DeliveryRegister';
import React, { useEffect, useState } from 'react';
import { ACCESS_TOKEN } from 'store/apis/base';

function Delivery() {

  const [isRegi, setIsRegi] = useState(false);
  const [convAddress, setConvAddress] = useState("");

  useEffect(() => {

    axios
      .get("http://54.180.60.149:3000/deliveryCheck", {
        headers: {
          accessToken: `Bearer ${ACCESS_TOKEN}`,
        }
      })
      .then((response) => {
        console.log(response.data);

        if(response.data === "YES") {
          setIsRegi(true);
        }
      })
      .catch((error) => {
        console.error(error);
      })
    
  }, []);

  return (
    <div className='delivery-page'>

      <div className='delivery-test'>
      
        <div className='delivery-top'>
          <div className='page-title'>배달 페이지</div>
          <div className='delivery-top-address'>{convAddress}</div>
          {/* <div className='delivery-top-address'>해운대구 APEC로 17 센텀리더스마크 (주)지오택 227호</div> */}
        </div>

        {
          isRegi ? 
          <DeliveryProgress />
          :
          <DeliveryRegister setIsRegi={setIsRegi} />
        }

      </div>

    </div>
  )
}

export default Delivery;