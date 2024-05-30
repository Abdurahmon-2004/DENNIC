import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Users from './Page/Users'
import Doctors from './Page/Doctors'
import Patient from './Page/Patients'
import Specializations from './Page/Specializations'
import Admins from './Page/Admins'


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Users />}></Route>
          <Route path='/doctors' element={<Doctors />}></Route>
          <Route path='/patients' element={<Patient />}></Route>
          <Route path='/specializations' element={<Specializations />}></Route>
          <Route path='/admins' element={<Admins />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
