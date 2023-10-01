import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from './layout/Header';

function PrivateRoutes() {

  const isLogin = localStorage.getItem("accesstoken");

  // 유효한 토큰인지 확인하는 로직 필요 (API)

  return (
    <>
      <Header />
      { isLogin ? <Outlet /> : <Navigate to="/login" /> }
    </>
  )
}

export default PrivateRoutes;