// import React, { useState, useEffect } from "react";

// function TokenRenewal() {
//     const [token, setToken] = useState(localStorage.getItem("accessToken"));
//     const [expirationTime, setExpirationTime] = useState(localStorage.getItem("expirationTime"));
//     const [showRenewAlert, setShowRenewAlert] = useState(false);

//   useEffect(() => {
//     // 만료 시간이 설정되어 있고, 현재 시간이 만료 시간의 1시간 전일 때 알림 표시
//     if (expirationTime && new Date(expirationTime) - new Date() <= 60 * 60 * 1000) {
//       setShowRenewAlert(true);
//     } else {
//       setShowRenewAlert(false);
//     }
//   }, [expirationTime]);

//   const renewToken = () => {
//     // TODO: 서버에 토큰 연장 요청을 보내고 새로운 토큰 및 만료 시간을 받아와서 저장
//     const newAccessToken = "새로운AccessToken"; // 실제로는 서버에서 받아와야 합니다.
//     const newExpirationTime = new Date(); // 새로운 만료 시간 설정 (실제로는 서버에서 받아온 시간을 사용)

//     // 새로운 토큰과 만료 시간을 저장
//     localStorage.setItem("accessToken", newAccessToken);
//     localStorage.setItem("expirationTime", newExpirationTime);

//     // 알림 숨기기
//     setShowRenewAlert(false);

//     // 상태 업데이트
//     setToken(newAccessToken);
//     setExpirationTime(newExpirationTime);
//   };
  
//     return (
//       <div>
//         {token ? (
//         <div>
//           <p>토큰: {token}</p>
//           {showRenewAlert && (
//             <div>
//               <p>토큰이 1시간 후 만료됩니다. 연장하시겠습니까?</p>
//               <button onClick={renewToken}>연장하기</button>
//             </div>
//           )}
//         </div>
//       ) : (
//         <p>로그인되지 않았습니다.</p>
//       )}
//       </div>
//     );
//   }
  
//   export default TokenRenewal;