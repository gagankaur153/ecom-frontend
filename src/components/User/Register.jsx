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
    <div className=' mt-20 h-[90vh] flex items-center bg-gradient-to-br from-gray-950 to-blue-950  justify-center px-5'>
    <form onSubmit={handleform}
     className='shadow-2xl backdrop-blur-lg bg-white/10 border w-full max-w-md border-gray-900 rounded-2xl p-7 space-y-3 '>
      <div className='text-center text-4xl font-bold mb-9'>
        <h1>Create Account</h1>
      </div>
    <div className="flex flex-col space-y-1 ">
  <label className=" text-lg font-semibold">Username</label>
  <input type="string" name='username' value={data.username} onChange={inputhandle} className=" py-3 text-black rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"placeholder="enter username"/>
</div>
     <div className="mb-6  flex flex-col space-y-2 ">
  <label className="form-label text-lg font-semibold">Email address</label>
  <input type="email" name='email' value={data.email} onChange={inputhandle} className="py-3 text-black rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"  placeholder="name@example.com"/>
 {display &&  <h2 className='text-md text-red-500'>{erroremail}</h2>}
</div>
<div className="mb-10 flex flex-col space-y-2 ">
  <label  className="form-label text-lg font-semibold">Password</label>
  <input type="string" name='password' value={data.password} onChange={inputhandle} className="py-3 text-black rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="enter password"/>
  {display &&  <h2 className='text-md text-red-500'>{errorpassword}</h2>}
</div>
<div className=" w-full flex container justify-center ">
  <button type='submit' disabled={display=== true} className={`btn btn-primary mt-3 px-4 w-full lg:px-14 py-2 text-lg rounded-lg font-semibold 
    ${display 
      ? "bg-gray-400 cursor-not-allowed text-gray-700" 
      : "bg-sky-700 hover:bg-sky-900text-white"
    }`}>Register</button>
</div>
<div className='mb- w-full  flex flex-col text-sm  items-center justify-center mt-2'>
  <p>Already account</p>
  <NavLink to={'/login'} className='hover:underline text-blue-500 font-semibold text-md
  '>Signup</NavLink>
</div>
     </form>
    </div>
   </>
  )
}

export default Register

// import React, { useContext, useState } from 'react'
// import { NavLink } from 'react-router'
// import Appcontext from '../Context/Appcontext'

// const Register = () => {
//   const { register } = useContext(Appcontext)
//   const [data, setData] = useState({ username: "", email: "", password: "" })
//   const [display, setDisplay] = useState(false)
//   const [errorEmail, setErrorEmail] = useState("")
//   const [errorPassword, setErrorPassword] = useState("")

//   const emailregex = /^[a-z0-9._%+-]+@gmail\.com$/
//   const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/

//   const inputhandle = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });

//     if (name === "email") {
//       if (!emailregex.test(value)) {
//         setDisplay(true)
//         setErrorEmail("Email must be in format: youremail@gmail.com")
//       } else {
//         setDisplay(false)
//         setErrorEmail("")
//       }
//     }

//     if (name === "password") {
//       if (!passwordregex.test(value)) {
//         setDisplay(true)
//         setErrorPassword("Password must be 8–12 chars, 1 uppercase, 1 number, 1 special character")
//       } else {
//         setDisplay(false)
//         setErrorPassword("")
//       }
//     }
//   }

//   const handleform = (e) => {
//     e.preventDefault()
//     register(data.username, data.email, data.password, setData)
//   }

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-900 via-gray-900 to-black px-4">

//       <form onSubmit={handleform}
//         className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 w-full max-w-md animate-fadeIn">

//         <h1 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-lg">
//           Create Account
//         </h1>

//         {/* Username */}
//         <div className="mb-6 flex flex-col space-y-1">
//           <label className="text-white text-lg font-semibold">Username</label>
//           <input type="text"
//             name='username'
//             value={data.username}
//             onChange={inputhandle}
//             className="py-3 text-black rounded-xl px-4 focus:ring-2 focus:ring-blue-400 outline-none"
//             placeholder="Enter username" />
//         </div>

//         {/* Email */}
//         <div className="mb-6 flex flex-col space-y-1">
//           <label className="text-white text-lg font-semibold">Email Address</label>
//           <input type="email"
//             name='email'
//             value={data.email}
//             onChange={inputhandle}
//             className="py-3 text-black rounded-xl px-4 focus:ring-2 focus:ring-blue-400 outline-none"
//             placeholder="youremail@gmail.com" />

//           {errorEmail && (
//             <p className="text-red-400 text-sm animate-pulse mt-1">{errorEmail}</p>
//           )}
//         </div>

//         {/* Password */}
//         <div className="mb-8 flex flex-col space-y-1">
//           <label className="text-white text-lg font-semibold">Password</label>
//           <input type="password"
//             name='password'
//             value={data.password}
//             onChange={inputhandle}
//             className="py-3 text-black rounded-xl px-4 focus:ring-2 focus:ring-blue-400 outline-none"
//             placeholder="Enter password" />

//           {errorPassword && (
//             <p className="text-red-400 text-sm animate-pulse mt-1">{errorPassword}</p>
//           )}
//         </div>

//         {/* Button */}
//         <button
//           type="submit"
//           disabled={display}
//           className={`w-full py-3 rounded-xl text-xl font-semibold transition-all duration-300 
//             ${display
//               ? "bg-gray-400 cursor-not-allowed text-gray-700"
//               : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/50"
//             }`}
//         >
//           Register
//         </button>

//         {/* Bottom Link */}
//         <p className="mt-6 text-center text-white/80 text-sm">
//           Already have an account?
//         </p>
//         <NavLink to="/login" className="block text-center text-blue-400 hover:underline mt-1">
//           Login
//         </NavLink>

//       </form>
//     </div>
//   )
// }

// export default Register

