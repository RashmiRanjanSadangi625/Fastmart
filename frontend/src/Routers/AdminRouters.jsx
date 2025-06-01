import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admin from '../Admin/Admin'
import LoginForm from '../Admin/components/Auth/LoginForn'
const AdminRouters = () => {
  return (
    <div>
        <Routes>
            <Route path='/login' element={<LoginForm/>}></Route>
            <Route path='/*' element={<Admin/>}></Route>
        </Routes>
    </div>
  )
}

export default AdminRouters