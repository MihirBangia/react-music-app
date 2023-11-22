import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home/home'
import Playlist from '../playlist/playlist'
import RegistrationForm from '../login/registrationform'
import SignIn from '../login/loginform'

export default function UseRoutes() {
  return (
    <Routes>
        <Route path={'/'} element={ <Home />} />  
        <Route path={'/login'} element={<SignIn />} />
        <Route path={'/playlist'} element={<Playlist />} />
        <Route path ={'/register'} element={<RegistrationForm />} />
    </Routes>
  )
}
