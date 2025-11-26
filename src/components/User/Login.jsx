import React,{useContext, useState} from 'react'
import { NavLink, useNavigate } from 'react-router'
import Appcontext from '../Context/Appcontext'

const Login = () => {
  const {login }= useContext(Appcontext)
  const [data,setdata] = useState({email:"",password:"",})
  const inputhandle = (e)=>{
  const  {name, value} = e.target;
    setdata({
      ...data,
      [name]: value
    })
  }
  const handleform = (e)=>{
    e.preventDefault()
    login(data?.email, data?.password,setdata)
  }
  return (
   <>
    <div className='min-h-screen flex items-center justify-center  bg-gradient-to-br from-gray-950 to-blue-950 px-5'>
     <form onSubmit={handleform} className=' shadow-xl rounded-2xl w-full max-w-md backdrop-blur-lg bg-white/10 border  border-gray-900 p-10  '>
     <div className="mb-6  flex flex-col space-y-1 ">
  <label className=" text-lg font-semibold">Email address</label>
  <input type="string" name='email' value={data.email} onChange={inputhandle} className=" px-4 py-3 text-black rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none" id="exampleFormControlInput1" placeholder="name@example.com"/>
</div>
<div className="mb-10 flex flex-col space-y-1 ">
  <label className="form-label text-lg font-semibold">Password</label>
  <input type="string" className="form-control text-black rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none" name='password' value={data.password} onChange={inputhandle} placeholder="enter password"/>
</div>
<div className=" w-full flex container justify-center">
  <button type='submit' className='btn btn-primary px-14 py-2 w-full text-lg rounded-lg hover:bg-sky-900  bg-sky-700 hover:text-white font-semibold '>Login</button>
</div>
<div className=' w-full flex flex-col text-sm  items-center justify-center mt-8'>
  <p>Do'not account ?</p>
  <NavLink to={'/register'} className='hover:underline text-blue-500 font-semibold '>Register</NavLink>
</div>
     </form>
    </div>
   </>
    
  
  )
}

export default Login
