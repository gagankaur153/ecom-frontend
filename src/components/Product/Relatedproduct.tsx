import { useContext, useEffect, useState } from 'react'
import Appcontext from '../Context/Appcontext'
import { NavLink } from 'react-router';
type categorytype = {
  category: string
}

const Relatedproduct = ({category}:categorytype) => {
  const Appstate = useContext(Appcontext)
    if(!Appstate) return null
    const {products, addcart} = Appstate
    const [realtedprodcts,setrealtedproduct] = useState([])
    useEffect(()=>{
      setrealtedproduct(products?.filter((item: any)=> item?.category?.toLowerCase() == category?.toLowerCase()))
    },[category,products])
  
  return (
    <div className='flex mt-4'>
    {
          realtedprodcts && <div className=' p-4 md:m-5 gap-7 md:gap-6  justify-items-center md:p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
          
              { realtedprodcts.map((product: any)=>(
                <div  key={product._id} className="rounded-xl p-2 md:p-6  shadow-lg "  >
               <NavLink to={`/singleproduct/${product._id}`}   className='flex justify-center m-2 rounded-xl  items-center '>
               <img src={product.image} className=" rounded-xl border border-yellow-600 w-[300px] h-[100px] md:h-[150px]"alt="..."/>
               </NavLink>
                <div className="md:text-xl">
                  <h5 className="">Title:{product.title}</h5>
                  <div className=' flex md:items-center flex-col p-3'>
                  <button className=" mb-2 px-1 md:py-1  bg-blue-600 rounded md:px-2">Price: {product.price}</button>
                  <button  onClick={()=>addcart(product._id)} className=" px-1 md:px-2 rounded bg-yellow-600 hover:bg-yellow-800">Add to cart</button>
                  </div>
                </div>
              </div>
              ))}
          </div>
      }
    </div>
  )
}

export default Relatedproduct
