import React, { useContext, useState,useEffect } from 'react'
import Appcontext from '../Context/Appcontext'
import { LuFilter } from "react-icons/lu";
import { NavLink, useNavigate } from 'react-router';


const Showproduct = () => {
    const {products,addcart,role,getallproduct} = useContext(Appcontext)
    const navigate = useNavigate()
   const updateproduct = (id)=>{
         navigate(`/updateproduct/${id}`)
   }
   useEffect(()=>{getallproduct()},[])
 
  
  return (
   <>
       <div className=' min-h-screen mt-20 bg-black'>
      <div className='flex mx-auto  p-6'>
      {
            products && <div className='text-white w-full gap-6  borde md:gap-10 mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
            
                {products.map((product)=>(
                  <div  key={product._id} className="rounded-xl p-2  h-fit md:p-6  bg-gray-900 shadow-lg hover:bg-gray-950"  >
                 <NavLink to={`/singleproduct/${product._id}`} className='flex p-2 m-2 rounded-xl  items-center '>
                 <img src={product.image} className="rounded-xl md:w-[200px] md:h-[200px] border border-yellow-600 " alt="..."/>
                 </NavLink>
                  <div className="md:text-xl p-2 md:mb-3">
                    <h5 className="">{product.title}</h5>
                    </div>
                    <div className=' md:flex p-2 md:gap-4 font-semibold justify-around space-y-2 md:space-y-0'>

                    <button className=" px-2 xl:p-3 rounded md:px-1 lg:py-1 bg-blue-600">Price: {product.price}</button>
                    {role !== "admin"? <>
                    <button  className="px-2 xl:p-3 rounded  md:px-1 lg:py-1 bg-yellow-600 hover:bg-yellow-800"
                    onClick={()=>addcart(product._id)}
                    >Add to cart</button>
                    </>: <>
                    <button  className="px-2 xl:p-3 rounded md:px-1 lg:py-1 bg-yellow-600 hover:bg-yellow-800"
                    onClick={()=>updateproduct(product._id)}
                    >Update</button>
                    </>}
                    </div>
               
                </div>
                ))}
            </div>
        }
      </div>
     </div>
   </>
  )
}

export default Showproduct
