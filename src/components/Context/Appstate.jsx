import React,{useState,useEffect} from 'react'
import Appcontext from './Appcontext'
import axios from 'axios'
import{ toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Appstate = (props) => {
  const navigate = useNavigate()
    const [products,setproducts] = useState(null)
    const [search,setsearch] = useState("")
    const [isauth, setisauth] = useState("false")
    const [user_detail, setuser_detail] = useState("")
    const [oldaddress, setoldaddress] = useState(null)
    const [carts,setcarts] = useState(null)
    const [dec, setdec] =  useState(null)
    const [inc, setinc] =  useState(null)
    const [remove,setremove] = useState(null)
    const [role, setrole] = useState("user")
    const [recentlyorder , setrecentlyeorder] = useState([])
    const [loading , setloading] = useState(false)

   
    
  // const url = "https://ecom-backend-payment-intigrate.onrender.com"
  // urls.js
 const url = window.location.origin.includes("localhost")
? "http://localhost:4000"  // local backend
: "https://ecom-backend-payment-intigrate.onrender.com"; // deployed backend

const privateAxios = axios.create({
  baseURL : url
})

    // get all product
    const getallproduct = ()=>{
        privateAxios.get(`${url}/product/allproduct?search=${search}`)
        .then((res)=>{
            setproducts(res.data.data)
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    useEffect(()=>{getallproduct()},[search])
    

    // get single product
    const fetchsingleproduct = (id,setproduct)=>{
      axios.get(`${url}/product/singleproduct/${id}`)
      .then((res)=>{
          setproduct(res.data.data)
          console.log("fetch single product",res.data)
      })
      .catch((err)=>{
          console.log(err)
      })
   }

   

   // add product admin
   const addnewproduct = (title,price,category,description,file,setfile, setproductdetail,fileInputRef ,setLoading)=>{
    const formData = new FormData()
    formData.append("title",title)
    formData.append("price",price)
    formData.append("description", description)
    formData.append("category",category)
    formData.append("image",file)
    console.log(formData)
    privateAxios.post('/product/addproduct',formData,{withCredentials:true, headers:{
      "Content-Type":"multipart/form-data"
    }})
    setLoading(true)
    .then((res)=>{
      setproductdetail({
        title: " ",
        price: " ",
        description: " ",
        category: " "
      })
      setfile(null)
      if(fileInputRef.current){
        fileInputRef.current.value = null
      }
      getallproduct()
      console.log("add new product",res)
    })
    .catch((err)=>{
      console.log(err)
    })
    .finally(()=>{
      setLoading(false)
    })
    
  }

  // update product
  const updateproduct = (id,title,price,category,description,file,setfile, setproductdetail,fileInputref, setLoading)=>{
    const formData = new FormData()
    formData.append("title",title)
    formData.append("price",price)
    formData.append("description", description)
    formData.append("category",category)
    formData.append("image",file)
    setLoading(true)
    privateAxios.put(`/product/updateproduct/${id}`,formData,{withCredentials:true, headers:{
      "Content-Type":"multipart/form-data"
    }})
    .then((res)=>{
      setproductdetail({
        title: " ",
        price: " ",
        description: " ",
        image: " ",
        category: " "
      })
      setfile(null)
      if(fileInputref.current){
        fileInputref.current.value = null
      }
      getallproduct()
      console.log("update product",res)
    })
    .catch((err)=>{
      console.log(err)
    })
    .finally(()=>{
      setLoading(false)
    })
  }



    // retgister
    const register = (username,email,password, setdata,setLoading)=>{
        const payload = {
            username:username,
            email:email,
            password:password
          }
          setLoading(true)
          privateAxios.post('/api/register',payload)
          .then((res)=>{
            setdata({username:" ",email:" ",password:" "})
            toast.success(res?.data?.message)
            navigate('/login')
            console.log("register",res)
          })
          .catch((err)=>{
            toast.error(err?.response?.data?.message)
            console.log(err)
          })
          .finally(()=>{
            setLoading(false)
          })
    }


    // login
    const login = (email,password, setdata,setLoading)=>{
        const payload = {
            email:email,
            password:password
          }
          setLoading(true)
          privateAxios.post('/api/login',payload,{withCredentials:true})
          .then((res)=>{
            setdata({email:" ",password:" "})
            setrole(res?.data?.role)
            navigate('/')
            localStorage.setItem("isauth", "true")
            localStorage.setItem("isrole", res.data.role)
            setisauth("true")
            toast.success(res.data.message)
            console.log("login",res.data)
          })
          .catch((err)=>{
            toast.error(err?.response?.data?.message)
            console.log(err)
          })
          .finally(()=>{
            setLoading(false)
          })
    }
    useEffect(()=>{
      const authstatus = localStorage.getItem("isauth")
     let rolee = localStorage.getItem("isrole")
       setrole(rolee)
      if(authstatus === "true"){
        setisauth("true")
      }
    },[])

    // profile
    const profile = ()=>{
      axios.get(`${url}/api/getuser`,{withCredentials:true})
      .then((res)=>{
        setuser_detail(res.data.data)
        console.log("profile data",res.data.data)})
        .catch((err)=>{
          console.log(err)
        })
    } 

    //logout
    const logout = ()=>{
      axios.delete(`${url}/api/logout`,{withCredentials:true})
      .then((res)=>{
        toast.success(res?.data?.message)
        localStorage.removeItem("isauth")
        localStorage.removeItem("isrole")
        setisauth("false")
        setrole("")
        console.log("logout",res)})
        .catch((err)=>{
          toast.error(err?.response?.data?.message)
          console.log(err)

        })
    } 

    
    // add to cart
    const addcart = (productid)=>{
       privateAxios.post(`/cart/addcart/${productid}`,{},{withCredentials:true})
       .then((res)=>{
        toast.success(res?.data?.message)
        console.log("add cart",res.data)
       })
       .catch((err)=>{
        toast.error("please login")
        console.log(err)
       })
     }


    // fetch all cart
    const fetchcarts = ()=>{
      axios.get(`${url}/cart/allcart`,{withCredentials:true})
      .then((res)=>{
        setcarts(res.data.data)
        console.log(oldaddress)
        console.log("all carts" ,res.data.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    }

  // quantity decrease
  const quantityDecrease = (id)=>{
    axios.put(`${url}/cart/decrease/${id}`,{},{withCredentials:true})
    .then((res)=>{
      setdec(res.data.data)
      console.log(res.data.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  // quantity increase
  const quantityIncrease = (id)=>{
    axios.put(`${url}/cart/increase/${id}`,{},{withCredentials:true})
    .then((res)=>{
      setinc(res.data.data)
      console.log(res.data.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  // quantity remove
  const quantityRemove = (id)=>{
    axios.put(`${url}/cart/removecart/${id}`,{}, {withCredentials:true})
    .then((res)=>{
     setremove(res.data.data)
     console.log(res.data)
   })
   .catch((err)=>{
     console.log(err)
   })
 }

//  delete cart
const deletecart = ()=>{
  axios.put(`${url}/cart/deletecart`,{},{withCredentials:true})
  .then((res)=>{
    console.log(res)
    fetchcarts()
  })
  .catch((err)=>{
    console.log(err)
  })
}
    

    //  add new address
    const addnewaddress= (fullname, country, state, city, pincode, address, setdata)=>{
      const payload = {
          fullname,
          country,
          state,
          city,
          pincode,
          address,
      }
      privateAxios.post('/address/add',payload,{withCredentials:true})
      .then((res)=>{
          setdata({
              fullname: " ",
      country: " ",
      state: " ",
      city: " ",
      pincode: " ",
      address: " "
          })
          setoldaddress(res?.data?.data)
          toast.success(res.data.message)
          navigate('/checkout')
      //   setinc(res.data.data)
        console.log(res.data)
      })
      .catch((err)=>{
          toast.error(err?.response?.data?.message)
        console.log(err)
      })
    }
    
    // get old latest address
    const oldaddresss = ()=>{
      axios.get(`${url}/address/getaddress`,{withCredentials:true})
      .then((res)=>{
          setoldaddress(res.data.data[0])
          navigate('/checkout')
        console.log(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    }

    // orderconfirm page
    const userorder = ()=>{
      axios.get(`${url}/payment/userorder`, {withCredentials:true})
      .then((res)=>{
        setrecentlyeorder(res.data.data[0])
        console.log("user recently order" ,res.data.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    }

    const allorder = (setallorders)=>{
      axios.get(`${url}/payment/userorder`,{withCredentials:true})
      .then((res)=>{
        setallorders(res.data.data)
        console.log("user all order" ,res.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    }

    

  
   
  return (
   
      <Appcontext.Provider value={{products,search,setsearch,
        getallproduct,
        fetchsingleproduct ,
        updateproduct,
        deletecart,
        login,
         register,
         user_detail,
          profile,
           isauth,
           logout,
           addcart, 
           addnewaddress,
            oldaddresss,
        role,
        oldaddress,
      fetchcarts,
      carts,
      dec,inc,remove,
      quantityDecrease,
      quantityIncrease,
      quantityRemove,
      addnewproduct,
      userorder,
      recentlyorder ,
      allorder,
      loading ,
       setloading,
       url
     }}>{props.children}</Appcontext.Provider>
  
  )
}

export default Appstate
