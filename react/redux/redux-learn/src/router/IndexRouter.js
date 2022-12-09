import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
// import Content from '../component/Content'
// import Header from '../component/Header'
// import Sider from '../component/Sider'
import NewSandBos from '../view/NewSandBos'
import './indexRouter.css'

export default function IndexRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path='*' element={<NewSandBos />} ></Route>
      </Routes>
    </HashRouter>


    // <div className='component'>
    //   <div className='left'>
    //     <Sider></Sider>
    //   </div>
    //   <div className='right'>
    //     <Header></Header>
    //     <Content></Content>
    //   </div>
    // </div>
  )
}
