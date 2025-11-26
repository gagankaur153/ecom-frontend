import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router'
import Appcontext from '../Context/Appcontext'
const Register = () => {
  const {register} = useContext(Appcontext)
  const [data,setdata] = useState({username:"",email:"",password:""})
  const [display, setdisplay] = useState(false)
  const [erroremail, seterroremail] = useState("")
  const [errorpassword, seterrorpassword] = useState("")

const emailregex = /^[a-z0-9#_$]+@gmail\.com$/
  const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/
  // const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;

  const inputhandle = (e)=>{
  const  {name, value} = e.target;
    setdata({
      ...data,
      [name]: value
    })
    if(name === "email"){
      if(!emailregex.test(value)){
        setdisplay(true)
       seterroremail("email format is youremail@gmail.com")
      }else{
        setdisplay(false)
        seterroremail(" ")
      }
    }
    if(name === "password"){
      if(!passwordregex.test(value)){
        setdisplay(true)
       seterrorpassword("Password must be contain 8-12 character & 1 captial letter & 1 number & 1 special symbol")
      }else{
        setdisplay(false)
        seterrorpassword(" ")
      }
    }
  }
  const handleform = (e)=>{
    e.preventDefault()
    register(data.username, data.email,data.password,setdata)
  }
  return (

    <>
    <div className=' mt-20 h-[90vh] flex items-center  justify-center '>
    <form onSubmit={handleform} className=' container shadow-xl rounded-2xl bg-gray-900 w-1/2 p-10  '>
    <div className="mb-6  flex flex-col space-y-2 ">
  <label className="form-label text-lg font-semibold">Username</label>
  <input type="string" name='username' value={data.username} onChange={inputhandle} className="form-control py-2 text-black rounded-full px-2 focus:outline-none"placeholder="enter username"/>
</div>
     <div className="mb-6  flex flex-col space-y-2 ">
  <label className="form-label text-lg font-semibold">Email address</label>
  <input type="email" name='email' value={data.email} onChange={inputhandle} className="form-control py-2 text-black rounded-full px-2 hover:ring-2 focus:outline-none"  placeholder="name@example.com"/>
 {display &&  <h2 className='text-md text-red-500'>{erroremail}</h2>}
</div>
<div className="mb-10 flex flex-col space-y-2 ">
  <label  className="form-label text-lg font-semibold">Password</label>
  <input type="string" name='password' value={data.password} onChange={inputhandle} className="form-control py-2 text-black rounded-full px-2 focus:outline-none" placeholder="enter password"/>
  {display &&  <h2 className='text-md text-red-500'>{errorpassword}</h2>}
</div>
<div className="mb- w-full flex container justify-center">
  <button type='submit' disabled={display=== true} className={`btn btn-primary px-4 lg:px-14 py-2 text-lg rounded-lg font-semibold 
    ${display 
      ? "bg-gray-400 cursor-not-allowed text-gray-700" 
      : "bg-sky-700 hover:bg-sky-900 text-black hover:text-white"
    }`}>Register</button>
</div>
<div className='mb- w-full  flex flex-col text-sm  items-center justify-center mt-2'>
  <p>Already account</p>
  <NavLink to={'/login'} className='hover:underline
  '>Signup</NavLink>
</div>
     </form>
    </div>
   </>
  )
}

export default Register
