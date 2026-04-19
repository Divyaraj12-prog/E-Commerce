import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Products from '../pages/Products'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Cart from '../pages/user/Cart'
import ProfileUser from '../pages/user/ProfileUser'
import UpdateUser from '../pages/user/UpdateUser'
import CreateProduct from '../pages/admin/CreateProduct'
import ProductDetails from '../pages/admin/ProductDetails'
import { useSelector } from 'react-redux'
import AuthWrapper from '../wrapper/AuthWrapper'

const Mainroutes = () => {
  const { users } = useSelector(state => state.userReducer);
  
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/login" element={users ? <Products /> : <Login />} />
      <Route path="/register" element={users ? <Products /> : <Register />} />

      {/* User */}
      <Route path="/cart" element={<Cart /> } />
      <Route path="/profile" element={users ? <ProfileUser /> : <Login />} />
      <Route path="/profile/update" element={users ? <UpdateUser /> : <Login />} />

      {/* Admin */}
      <Route path="/admin/create-product" element={<AuthWrapper><CreateProduct /></AuthWrapper>} />

    </Routes>
  )
}

export default Mainroutes