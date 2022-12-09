import React from 'react'
import Content from '../component/Content'
import Header from '../component/Header'
import Sider from '../component/Sider'
import './NewSandBos.css'

export default function NewSandBos() {
  return (
      <div className='component'>
        <div className='left'>
          <Sider></Sider>
        </div>
        <div className='right'>
          <Header></Header>
          <Content></Content>
        </div>
      </div>
  )
}
