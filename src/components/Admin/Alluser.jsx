import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Appcontext from '../Context/Appcontext'

const Alluser = () => {
    const {url} = useContext(Appcontext)
    const [users, setusers] = useState([])
    useEffect(()=>{
        const allusers = ()=>{
            axios.get(`${url}/api/alluser`)
            .then((res)=>{
               setusers(res.data.data)
                console.log("allusers", res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        allusers()
    },[])
  return (
    <div className=''>
    {
   users.length == 0 ? <h1>No User register</h1> : 
   <div className='flex justify-center  mt-28'>
     <table className='w-full m-12 border  border-blue-600 p-4' >
             <thead className='border-b  border-blue-600'>
                <tr className='font-semibold text-2xl' >
                    <th className='border-r border-blue-600 p-2'>Username</th>
                    <th className='border-r  border-blue-600 p-2'>Email</th>
                    <th className='border-r  border-blue-600 p-2'>Address</th>
                </tr>
             </thead>
             <tbody>
             {
        users.map((item)=>(
           <tr key={item?._id} className='border-r border-b text-lg border-blue-600'>
            <th className='border-r p-2 border-blue-600'>{item?.username}</th>
            <th className='border-r p-3 border-blue-600'>{item?.email}</th>
            <th className='border-r p-4 border-blue-600'>{item?.address?.country},{item?.address?.city},
            {item?.address?.address},{item?.address?.pincode}</th>
           </tr>
        ))
    }
             </tbody>
            </table>
  
   </div>
    }
    </div>
  )
}

export default Alluser
