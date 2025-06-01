import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navigation from '../customers/components/Navigation/Navigation'
import Footer from '../customers/components/Footer/Footer'
import Homepage from '../customers/pages/Homepage'
import Cart from '../customers/components/Cart/Cart'
import Product from '../customers/components/Product/Product'
import ProductDetails from '../customers/components/ProductDetails/ProductDetails'
import ProductCard from '../customers/components/Product/ProductCard'
import ProductReviewCard from '../customers/components/ProductDetails/ProductReviewCard'
import Checkout from '../customers/components/Checkout/Checkout'
import Order from '../customers/components/Order/Order'
import OrderDetails from '../customers/components/Order/OrderDetails'

import PaymentSuccess from '../customers/components/Payment/PaymentSuccess'
import SearchedProducts from '../customers/components/Product/SearchedProducts'
import AccountProfile from '../customers/components/AccountProfile/AccountProfile'
import ResetPassword from '../customers/Auth/ResetPassword'


const CustomerRouters = () => {
  return (
    <div>
      <div>
        <Navigation/>
      </div>
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/login' element={<Homepage/>}></Route>
        <Route path='/register' element={<Homepage/>}></Route>
        <Route path='/forgotPassword' element={<Homepage/>}></Route>
        <Route path='/resetPassword/:email/:token' element={<ResetPassword/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/:levelOne/:levelTwo/:levelThre' element={<Product/>}></Route>
        <Route path='/product/:productId' element={<ProductDetails/>}></Route>
        <Route path="/searched-products" element={<SearchedProducts />} />
        <Route path='/checkout' element={<Checkout/>}></Route>
        <Route path='/account/order' element={<Order/>}></Route>
        <Route path='/account/profile' element={<AccountProfile/>}></Route>
        <Route path='/account/order/:orderId' element={<OrderDetails/>}></Route>
        <Route path='/account/order/:orderId/:productId' element={<OrderDetails/>}></Route>
        <Route path='/payments/:id' element={<PaymentSuccess/>}></Route>
      </Routes>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default CustomerRouters