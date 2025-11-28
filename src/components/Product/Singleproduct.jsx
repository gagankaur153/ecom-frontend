import axios from 'axios'
import React, { useContext, useEffect,useState } from 'react'
import { useParams } from 'react-router'
import {NavLink} from 'react-router-dom'
import Appcontext from '../Context/Appcontext'
import Relatedproduct from './Relatedproduct'

const Singleproduct = () => {
    const {id} = useParams()
    const {fetchsingleproduct,addcart } = useContext(Appcontext)
    const [product,setproduct ] = useState('')
useEffect(()=>{
     fetchsingleproduct(id,setproduct)
},[id])
  return (
<>
<div className='flex mt-28  text-white items-center'>
<div className="flex md:w-full justify-around gap-5 md:gap-24 m-5 ">
    <div className=' flex w-1/2  md:justify-center md:w-full'>
          <img className=' h-[200px] w-[150px] md:w-[250px] md:h-[290px] rounded-xl' src={product.image} alt="" />
    </div>
    <div className='  flex flex-col w-1/2 md:w-full p-2 space-y-3 md:space-y-6'>
       
            <p className='md:text-4xl md:mt-7 font-medium'>Title: {product.title}</p>
            <p className=' md:text-xl mx-auto h-[150px] word-spacing-[5px] md:h-[100px] overflow-hidden md:overflow-visible font-normal md:ml-4 md:mr-4'> Desciption: {product.description}</p>
            <p className='md:text-3xl  text-center  w-full'>Price: {product.price}</p>
            <div className=' flex md:justify-around w-full gap-1 md:gap-5 '>
            <NavLink to={'/cart'} className='bg-red-600 hover:bg-red-800 font-semibold  text-sm px-1 md:px-2 py-1 md:text-lg text-white  rounded'>Buy Now</NavLink>
            <button className='bg-yellow-500 hover:bg-yellow-700 font-semibold nd:text-lg text-sm px-1 md:px-2 py-1 text-black  rounded'  onClick={()=>addcart(product._id)}>Add TO Cart</button>
            </div>
    </div>
</div>
</div>

<div className='m-4'>
    <h1 className=' text-white text-2xl font-semibold md:text-4xl text-center'>Related Products</h1>
   <Relatedproduct category={product?.category} />
</div>

</>
   
    
  )
}

export default Singleproduct
