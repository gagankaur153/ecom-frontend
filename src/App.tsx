import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
const Showproduct = lazy(() => import("./components/Product/Showproduct"));
const Cart = lazy(() => import("./components/Buttons/Cart"));
const Profile = lazy(() => import("./components/User/Profile"));
const Singleproduct = lazy(() => import("./components/Product/Singleproduct"));
const Allorders = lazy(() => import("./components/Admin/Allorders"));
const Alluser = lazy(() => import("./components/Admin/Alluser"));
const Login = lazy(()=> import("./components/User/Login"))
const Navbar = lazy(()=> import("./components/Buttons/Navbar"))
const Register = lazy(()=> import ("./components/User/Register"))
const Address = lazy(()=> import ('./components/Buttons/Address'))
const Checkout = lazy(()=> import ('./components/Buttons/Checkout'))
const Addproduct = lazy(()=> import('./components/Admin/Addproduct'))
const Updateproduct = lazy(()=> import('./components/Admin/Updateproduct'))
const Orderconfirmation = lazy(()=> import("./components/Buttons/Orderconfirmation"))
const Protectedroute = lazy(()=> import('./components/User/Protectedroute') )
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loaading from "./components/Loaading";
import axios from "axios";
import {PropagateLoader} from 'react-spinners'

const App: React.FC = () => {
  const [Loading, setLoading] = useState(false);
  
  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        setLoading(true);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (config) => {
        setLoading(false);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <>
      <Navbar />
      <Loaading show={Loading} />
      <Suspense fallback={<h2><PropagateLoader /></h2>}>
        <Routes>
          <Route path="/" element={<Showproduct />} />
          <Route path="/singleproduct/:id" element={<Singleproduct />} />
          <Route
            path="/cart"
            element={
              <Protectedroute>
                <Cart />
              </Protectedroute>
            }
          />
          <Route
            path="/profile"
            element={
              <Protectedroute>
                <Profile />
              </Protectedroute>
            }
          />
          <Route
            path="/alluserorders"
            element={
              <Protectedroute>
                <Allorders />
              </Protectedroute>
            }
          />
          <Route
            path="/alluser"
            element={
              <Protectedroute>
                <Alluser />
              </Protectedroute>
            }
          />
          <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/shipping"
          element={
            <Protectedroute>
              <Address />
            </Protectedroute>
          }
        />
        <Route
          path="/checkout"
          element={
            <Protectedroute>
              <Checkout />
            </Protectedroute>
          }
        />
        <Route
          path="/addproduct"
          element={
            <Protectedroute>
              <Addproduct />
            </Protectedroute>
          }
        />
        <Route
          path="/updateproduct/:id"
          element={
            <Protectedroute>
              <Updateproduct />
            </Protectedroute>
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <Protectedroute>
              <Orderconfirmation />
            </Protectedroute>
          }
        />
        </Routes>
      </Suspense>

    

      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
};

export default App;
