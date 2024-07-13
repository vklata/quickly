import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Home from './pages/home/Home';
import 'bootstrap/dist/css/bootstrap.min.css'
import Order from './pages/Order/Order';
import Cart from './pages/cart/CartPage';
import NoPage from './pages/nopage/NoPage';
// import MyState from './context/data/myState';
// import { AuthProvider } from './context/auth';
import ProductInfo from './components/productInfo/ProductInfo';
import CartPage from './pages/cart/CartPage';
import AllProducts from './pages/allproducts/AllProducts'
import Signup from './pages/registration/Signup';
import Login from './pages/registration/Login';
import UserDashboard from './pages/user/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import UpdateProduct from './pages/admin/UpdateProduct';
import { ProtectedRouteForUser } from "./protectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./protectedRoute/ProtectedRouteForAdmin";
import CreateCategory from './components/admin/CreateCategory';
import CreateProduct from './components/admin/CreateProduct';
import UserDetail from './components/admin/UserDetail';
import CategoryProduct from './pages/CategoryProduct';
// import Products from './pages/admin/Products';


// import {Toaster} from "react-hot-toast";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ForgotPassword } from './pages/registration/ForgotPassword';
import Search from './pages/Search';


function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/order" element={<Order/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/*" element={<NoPage/>} />
        <Route path="/productinfo/:slug" element={<ProductInfo />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        {/* <Route path="/allproduct" element={<AllProduct />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/search" element={<Search/>} />


        {/* <Route path="/user-dashboard" element={<UserDashboard />} /> */}
        <Route path="/user-dashboard" element={
            <ProtectedRouteForUser>
              <UserDashboard />
            </ProtectedRouteForUser>
          } />
                <Route path="/admin-dashboard" element={
            <ProtectedRouteForAdmin>
              <AdminDashboard />
        
            </ProtectedRouteForAdmin>
          } />
                 <Route path="/create-category" element={
            <ProtectedRouteForAdmin>
          
              <CreateCategory/>
         
            </ProtectedRouteForAdmin>
          } />
                 <Route path="/create-product" element={
            <ProtectedRouteForAdmin>
              <CreateProduct/>
            </ProtectedRouteForAdmin>
          } />
                     <Route path="/users" element={
            <ProtectedRouteForAdmin>
           <UserDetail/>
            </ProtectedRouteForAdmin>
          } />
                            <Route path="/allproduct" element={
            <ProtectedRouteForAdmin>
           <AllProducts/>
            </ProtectedRouteForAdmin>
          } />
                                     <Route path="/allproduct/:slug" element={
            <ProtectedRouteForAdmin>
           <UpdateProduct/>
            </ProtectedRouteForAdmin>
          } />
         {/* <Route path="/addproduct" element={<AddProductPage/>} /> */}
      </Routes>
      <ToastContainer/>
    </Router>

  )
}

export default App

