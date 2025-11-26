import React, { useContext, useState,useEffect } from 'react'
import Appcontext from '../Context/Appcontext'
import { LuFilter } from "react-icons/lu";
import { NavLink, useNavigate } from 'react-router';


const Showproduct = () => {
    const {products,addcart,role} = useContext(Appcontext)
    const navigate = useNavigate()
   const updateproduct = (id)=>{
         navigate(`/updateproduct/${id}`)
   }
  const [value, setvalue] = useState(false)
  const lufilter = ()=>{
    setvalue(!value)
  }
  
  return (
   <>
       


       <div className=' h-screen mt-24 bg-black'>
      <div className='d-flex items-center justify-center'>
      {
            products && <div className='text-white gap-2 md:gap-6  justify-items-center p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
            
                {products.map((product)=>(
                  <NavLink to={`/singleproduct/${product._id}`}  key={product._id} className="card  rounded-xl my-4 p-4 h-fit bg-gray-900 shadow-lg hover:bg-gray-950"  >
                 <div className='flex justify-center m-2 rounded-xl  items-center '>
                 <img src={product.image} className="card-img-top rounded-xl border border-yellow-600 " style={{width:["150px"], height:["200px"]}} alt="..."/>
                 </div>
                  <div className="card-body text-base md:text-xl">
                    <h5 className="card-title">{product.title}</h5>
                    <div className=' items-center justify-center gap-2 lg:flex p-2 '>
                    <button className="btn mb-2 lg:mb-0 btn-primary  px-1 bg-blue-600">Price: {product.price}</button>
                    {role !== "admin"? <>
                    <button  className="btn  btn-danger px-1  bg-yellow-600 hover:bg-yellow-800"
                    onClick={()=>addcart(product._id)}
                    >Add to cart</button>
                    </>: <>
                    <button  className="btn  btn-danger px-1  bg-yellow-600 hover:bg-yellow-800"
                    onClick={()=>updateproduct(product._id)}
                    >Update</button>
                    </>}
                    </div>
                  </div>
                </NavLink>
                ))}
            </div>
        }
      </div>
     </div>
   </>
  )
}

export default Showproduct
