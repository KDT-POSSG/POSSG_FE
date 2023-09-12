import React from 'react'
import { Link } from 'react-router-dom'

function HomeItem({ item }) {
  return (
    <Link to="#">
      <div className='home-item'>{item.pageName}</div>
    </Link>
  )
}

export default HomeItem