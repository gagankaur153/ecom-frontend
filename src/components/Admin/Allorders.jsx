import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Appcontext from '../Context/Appcontext'

const Allorders = () => {
    const {url} = useContext (Appcontext)
    const [orders, setorders] = useState([])
    useEffect(()=>{
        const alluserorders = ()=>{
            axios.get(`${url}/payment/allorders`,{withCredentials:true})
            .then((res)=>{
                setorders(res.data.data)
                console.log("allorderforadmin", res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        alluserorders()
    },[])
  return (
    <div>
      {
        orders.length === 0 ? <h1>No orders</h1> : <>
        <div className="flex justify-center">
  <div className="w-[80%]">
    {orders.map((item, index) => (
      <div
        key={index}
        className="grid md:grid-cols-2 grid-cols-1 border border-blue-600 my-6"
      >
        {/* LEFT SIDE (ORDER ITEMS) */}
        <div className="border-r border-blue-600 p-4">
            <h1 className='font-bold'>{index+1}.</h1>
          <h2 className="text-center text-2xl font-semibold border-b border-blue-600 pb-2">
            Order Items
          </h2>

          <table className="w-full mt-4 border border-blue-600">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border p-2">Img</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Qty</th>
              </tr>
            </thead>

            <tbody>
              {item?.orderItems?.map((orderdetails) => (
                <tr
                  key={orderdetails._id}
                  className="text-center border-b border-blue-600"
                >
                  <td className="border p-2">
                    <img
                      src={orderdetails?.productid?.image}
                      className="w-[50px] h-[60px] mx-auto"
                      alt=""
                    />
                  </td>

                  <td className="border p-2">
                    {orderdetails?.productid?.title}
                  </td>

                  <td className="border p-2">{orderdetails?.price}</td>

                  <td className="border p-2">{orderdetails?.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* TOTAL SECTION */}
          <div className="mt-4 flex gap-4 justify-center">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Total
            </button>

            <div className="bg-yellow-500 text-black px-4 py-2 rounded font-bold">
              {item.amount} ₹
            </div>

            <div className="bg-blue-500 text-white px-4 py-2 rounded">
              {item.totalQuantity}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (ORDER DETAILS) */}
        <div className="p-4">
          <h2 className="text-center text-2xl font-semibold border-b border-blue-600 pb-2">
            Order Details
          </h2>

          <div className="mt-4 space-y-2 text-lg">
            <p><strong>Order Id:</strong> {item.orderId}</p>
            <p><strong>Payment Id:</strong> {item.paymentId}</p>
            <p><strong>Pay Status:</strong> {item.payStatus}</p>
            <p><strong>Order Date:</strong> {item.orderDate}</p>
            <p><strong>Name:</strong> {item.userShipping?.[5]}</p>
            <p><strong>State:</strong> {item.userShipping?.[0]}</p>
            <p><strong>City:</strong> {item.userShipping?.[1]}</p>
            <p><strong>Address:</strong> {item.userShipping?.[3]}</p>
            <p><strong>Pincode:</strong> {item.userShipping?.[4]}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div></>
      }
    </div>
  )
}

export default Allorders
