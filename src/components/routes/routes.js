import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Loginform from '../login/loginform'
import Home from '../Home/home'

export default function UseRoutes() {
  return (
    <Routes>
        <Route path='/' element={ <Home />} />
        <Route path={'/login'} element={<Loginform />} />
    </Routes>
  )
}
