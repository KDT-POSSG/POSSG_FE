import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Header from './layout/Header';
import { useRecoilValue } from 'recoil';
import { PosState } from 'store/atom/posState';

function PrivateRoutes() {

  const accesstoken = localStorage.getItem("accesstoken");
  const isPos = useRecoilValue(PosState);

  const [isLogin, setIsLogin] = useState(accesstoken);
  const { pathname } = useLocation();

  // console.log("pathname >> ", pathname);

  useEffect(() => {
    setIsLogin(accesstoken);
    // console.log("private routes isAceessToken >> ", isLogin);
  }, [pathname, isPos]);

  return (
    <>
      <Header />
      { isLogin ? <Outlet /> : <Navigate to="/login" /> }
    </>
  )
}

export default PrivateRoutes;