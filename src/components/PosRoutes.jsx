import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { PosState } from 'store/atom/posState';

function PosRoutes() {

  const isPos = useRecoilValue(PosState);

  return (
    <>
      { isPos ? <Outlet /> : <Navigate to="/kiosk" /> }
    </>
  )
}

export default PosRoutes;