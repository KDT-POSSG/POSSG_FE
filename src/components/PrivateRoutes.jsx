import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Header from './layout/Header';
import { isAceessToken } from 'store/utils/function';

function PrivateRoutes() {

  const [isLogin, setIsLogin] = useState(isAceessToken());
  const { pathname } = useLocation();

  console.log("pathname >> ", pathname);

  useEffect(() => {
    setIsLogin(isAceessToken());
    console.log("private routes isAceessToken >> ", isLogin);
  }, [pathname]);

  return (
    <>
      <Header />
      { isLogin ? <Outlet /> : <Navigate to="/login" /> }
    </>
  )
}

export default PrivateRoutes;