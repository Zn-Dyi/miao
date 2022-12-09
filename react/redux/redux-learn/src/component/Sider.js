import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sider() {
  return (
    <div className='side'>
      Sider
      <ul>
        <li><NavLink to="/second">1</NavLink></li>
        <li><NavLink to='/minute'>2</NavLink></li>
        <li><NavLink to='/hour'>3</NavLink></li>
      </ul>
    </div>
  )
}

