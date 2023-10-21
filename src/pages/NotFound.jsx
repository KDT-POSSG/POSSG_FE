import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='not-found-page'>

      <span className='tossface not-found-icon'>🧚</span>

      <div className='not-found-title'>존재하지 않는 페이지입니다.</div>

      <Link to="/">
        <button className='not-found-home'>홈으로 돌아가기</button>
      </Link>
      
  </div>
  )
}

export default NotFound