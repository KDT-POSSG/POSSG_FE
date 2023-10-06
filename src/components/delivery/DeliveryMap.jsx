import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import DaumPostcodeEmbed from 'react-daum-postcode';
import axios from 'axios';
import { ACCESS_TOKEN } from 'store/apis/base';

function DeliveryMap({ setIsRegi }) {

  const mapRef = useRef(null);

  const [address, setAddress] = useState("");
  const [mapData, setMapData] = useState({
    La: 33.450701,
    Ma: 126.570667
  });

  useEffect(() => {

    createMap();

  }, []);

  const handleDeliveryRegiConfirm = () => {
    console.log("handleDeliveryRegiConfirm");
    console.log(address, mapData.La, mapData.Ma);

    axios
      .post("http://54.180.60.149:3000/convAddDelivery", {
        convLocation: address,
        latitude: mapData.La,
        longtitude: mapData.Ma
      }, 
      {
        headers: {
          accessToken: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((response)=>{
        console.log(response.data);

        if(response.data === "YES") {
          toast.success("배달 점포로 등록되었습니다");
          setIsRegi(true);
        }
        else {
          toast.error("배달 점포 등록에 실패했습니다");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("배달 점포 등록에 실패했습니다");
      })
  }

  const createMap = () => {

    const container = mapRef.current;
    const options = { //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(mapData.La, mapData.Ma), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };

    const map = new window.kakao.maps.Map(container, options);
    return map;
  }
  
  const handleSearch = (address) => {

    const map = createMap();
    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, function(result, status) {

      console.log("result >> ", result);
      console.log("status >> ", status);

      // 정상적으로 검색이 완료됐으면 
      if (status === window.kakao.maps.services.Status.OK) {

        toast.success("검색 성공");

        let coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        let marker = new window.kakao.maps.Marker({
          map: map,
          position: coords
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        let infowindow = new window.kakao.maps.InfoWindow({
          content: '<div style="width: 150px; text-align: center; padding: 6px 0; font-size: 12px;">편의점 위치</div>'
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
        setMapData(coords);
      } 
      else {
        toast.error("검색 실패");
      }
    }); 
  }

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log(fullAddress);
    setAddress(fullAddress);
    handleSearch(fullAddress);
  };

  return (
    <div className='delivery-map'>

      <div className='delivery-map-top'>

        <div className='delivery-map-image' ref={mapRef}>
        </div>

        <div className='delivery-map-search'>
          <DaumPostcodeEmbed 
            style={{ height: "100%", border: "1px solid #ebebeb", borderRadius: "1rem" }}
            onComplete={handleComplete} 
            autoClose={false} 
            onResize={{height : '100%'}}
          />
        </div>

      </div>

      <div className='delivery-map-bottom'>
        {
          address === "" ?
          <></>
          :
          <>
            <div>
              <p className='delivery-map-title'>{address}</p>
              <p className='delivery-map-data'>위도 {mapData.La} / 경도 {mapData.Ma}</p>
            </div>
          </>
        }
        <div>
          <button className='delivery-regi-btn' disabled={address === ""} onClick={handleDeliveryRegiConfirm}>배달 점포 등록하기</button>
        </div>
      </div>

    </div>
  )
}

export default DeliveryMap;