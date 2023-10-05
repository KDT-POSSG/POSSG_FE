import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import DaumPostcodeEmbed from 'react-daum-postcode';

function DeliveryMap() {

  const [address, setAddress] = useState("");
  const [mapData, setMapData] = useState({
    La: 33.450701,
    Ma: 126.570667
  });

  const mapRef = useRef(null);

  useEffect(() => {

    createMap();

  }, []);

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

        <div className='delivery-map-search'>
          <DaumPostcodeEmbed 
            className='delivery-daum'
            style={{ height: "100%" }}
            onComplete={handleComplete} 
            autoClose={false} 
            onResize={{height : '100%'}}
          />
        </div>

        <div className='delivery-map-image' ref={mapRef}>
        </div>

      </div>

      <div className='delivery-map-bottom'>
        <div>
          <p className='delivery-map-title'>{address}</p>
          <p className='delivery-map-data'>위도 {mapData.La} / 경도 {mapData.Ma}</p>
        </div>
        
        <div>
          <button className='delivery-regi-btn'>배달 점포 등록하기</button>
        </div>
      </div>

    </div>
  )
}

export default DeliveryMap;