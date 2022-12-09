import React from 'react'
import { Route, Routes } from 'react-router'
import Hour from '../view/hour/Hour'
import Minute from '../view/minute/Minute'
import Second from '../view/second/Second'

export default function Content() {
  return (
    <div>
      <Routes>
        <Route path='/second' element={<Second />} ></Route>
        <Route path='/minute' element={<Minute />} ></Route>
        <Route path='/hour' element={<Hour />} ></Route>
      </Routes>
    </div>
  )
}
