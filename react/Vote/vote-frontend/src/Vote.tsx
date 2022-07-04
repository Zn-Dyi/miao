import { Routes, Route, Navigate } from 'react-router-dom'
import CreateVote from './CreateVote'
import Home from './Home'
import { Login } from './login'
import Me from './Me'
import Register from './register'

import SelectCreation from './SelectCreation'
import ViewVote from './ViewVote'

export default function Vote() {



  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/home"/> } />
      <Route path="/home" element={<Home />}>
        <Route path="" element={<Navigate replace to="create" />} />
        <Route path="create" element={<SelectCreation />} />
        <Route path="me" element={<Me />} />
      </Route>

      <Route path="/create" element={<CreateVote />} />

      {/* <Route path="/create-single" element={<div>create</div> } />
      <Route path="/create-multiple" element={<div>create</div> } /> */}
      <Route path="/vote/:id" element={<ViewVote /> } />
      <Route path="/login" element={<Login /> } />
      <Route path="/register" element={<Register /> } />
    </Routes>
  )
}
