import { Routes,Route } from 'react-router-dom'
import Login from "./customers/pages/Login"
import AppRoutes from './Routers/AppRoutes'
import './styles/App.css'
import Navigation from './customers/components/Navigation/Navigation'
import Homepage from './customers/pages/Homepage'
import Footer from './customers/components/Footer/Footer'
import Product from './customers/components/Product/Product'
import ProductDetails from './customers/components/ProductDetails/ProductDetails'
import Cart from './customers/components/Cart/Cart'
import Checkout from './customers/components/Checkout/Checkout'
import Order from './customers/components/Order/Order'
import OrderDetails from './customers/components/Order/OrderDetails'
import CustomerRouters from './Routers/CustomerRouters'
import AdminRouters from './Routers/AdminRouters'


function App() {
 
  return (
    <div className=''>
      <Routes>
        <Route path='/*' element={<CustomerRouters/>}></Route>
        <Route path='/admin/*' element={<AdminRouters/>}></Route>
      </Routes>     
    </div>
  )
}

export default App
