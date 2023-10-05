import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

function DeliveryMap() {

  const [searchAddress, setSearchAddress] = useState("");
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

  const handleSearchAddress = (e) => {
    setSearchAddress(e.target.value);
  }

  const handleSearch = () => {

    const map = createMap();
    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(searchAddress, function(result, status) {

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

  return (
    <div>

      <div>
        <input type="text" placeholder='주소를 입력해주세요' value={searchAddress} onChange={handleSearchAddress} />
        <button onClick={handleSearch}>검색</button>
      </div>

      searchAddress : {searchAddress}<br/>
      {mapData.La} / {mapData.Ma}

      <div ref={mapRef} style={{ width: "100%", height: "50vh", backgroundColor: "gray", borderRadius: "1rem", border: "1px solid #ebebeb" }}></div>

      <button>배달 점포 등록하기</button>

    </div>
  )
}

export default DeliveryMap;