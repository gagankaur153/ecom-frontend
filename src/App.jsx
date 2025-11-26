import React from 'react'
import { Route, Routes } from 'react-router'
import {lazy, Suspense} from 'react'
import Showproduct from './components/Product/Showproduct'
const Cart = lazy(()=> import('./components/Buttons/Cart'))
// import Cart from './components/Buttons/Cart'
import Login from './components/User/Login'
import Profile from './components/User/Profile'
import Home from './components/Home/Home'
import Navbar from './components/Buttons/Navbar'
import Singleproduct from './components/Product/Singleproduct'
import Register from './components/User/Register'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LuLogOut } from 'react-icons/lu'
import Address from './components/Buttons/Address'
import Checkout from './components/Buttons/Checkout'
import Protectedroute from './components/User/Protectedroute'
import Addproduct from './components/Admin/Addproduct'
import Updateproduct from './components/Admin/Updateproduct'
import Orderconfirmation from './components/Buttons/Orderconfirmation'
import Allorders from './components/Admin/Allorders'
import Alluser from './components/Admin/Alluser'


const App = () => {
 
  return (
    <>
    
     <Navbar/>
     <Suspense fallback={<div><h2>Loading...</h2></div>}></Suspense>

      <Routes>
        <Route path='/' element={<Showproduct/>}/>
       <Route path='/singleproduct/:id' element={<Singleproduct/>}/>
        <Route path='/cart' element={<Protectedroute><Cart/></Protectedroute>}/>
        <Route path='/profile' element={<Protectedroute><Profile/></Protectedroute>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/shipping' element={<Protectedroute><Address/></Protectedroute>}/>
        <Route path='/checkout' element={<Protectedroute><Checkout/></Protectedroute>}/>
        <Route path='/addproduct' element={<Protectedroute><Addproduct/></Protectedroute>}/>
        <Route path='/updateproduct/:id' element={<Protectedroute><Updateproduct/></Protectedroute>}/>
        <Route path='/order-confirmation' element={<Protectedroute><Orderconfirmation/></Protectedroute>}/>
        <Route path='/alluserorders' element={<Protectedroute><Allorders/></Protectedroute>}/>
        <Route path='/alluser' element={<Protectedroute><Alluser/></Protectedroute>}/>
      </Routes>
      
      <ToastContainer position='top-right' autoClose={1000}/>
    
  </>
  )
}

export default App
