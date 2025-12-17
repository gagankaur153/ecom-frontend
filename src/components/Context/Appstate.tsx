import { useState, useEffect, SetStateAction, Dispatch } from "react";
import Appcontext from "./Appcontext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
type propstype = {
  children: React.ReactNode;
};
type IState = {
  orderItems: any;
};

const Appstate: React.FC<propstype> = ({ children }: propstype) => {
  const storedtheme = localStorage.getItem("istheme") as
    | "light"
    | "dark"
    | null;
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark">(storedtheme ?? "light");
  const [products, setproducts] = useState(null);
  const [search, setsearch] = useState("");
  const [isauth, setisauth] = useState("false");
  const [user_detail, setuser_detail] = useState("");
  const [oldaddress, setoldaddress] = useState(null);
  const [carts, setcarts] = useState<any>(null);
  const [role, setrole] = useState("user");
  const [recentlyorder, setRecentlyorder] = useState<any[]>([]);
  const [loading, setloading] = useState(false);

  // const url = "https://ecom-backend-payment-intigrate.onrender.com"
  // urls.js
  const url = window.location.origin.includes("localhost")
    ? "http://localhost:4000" // local backend
    :
    "https://ecom-backend-tdn9.onrender.com"; // deployed backend

  const privateAxios = axios.create({
    baseURL: url,
  });

  //theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.style.setProperty("--bg-color", "black");
      document.documentElement.style.setProperty("--navbg-color", "black");
      document.documentElement.style.setProperty("--text-color", "white");
      document.documentElement.style.setProperty(
        "--navbuttontextcolor",
        "white"
      );
      document.documentElement.style.setProperty(
        "--border",
        "2px solid rgb(57,55,55)"
      );
    } else {
      document.documentElement.style.setProperty("--bg-color", "white");
      document.documentElement.style.setProperty("--navbg-color", "white");
      document.documentElement.style.setProperty("--text-color", "black");
      document.documentElement.style.setProperty(
        "--navbuttontextcolor",
        "white"
      );
      document.documentElement.style.setProperty(
        "--border",
        "2px solid rgb(222, 217, 217)"
      );
    }
  }, [theme]);
  useEffect(() => {
    localStorage.setItem("istheme", theme);
  }, [theme]);

  const useDebounce = (value: string, delay= 1000)=>{
    const[debounce , setDebounce] = useState(value)
    
      useEffect(()=>{
     const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
          setDebounce(value)
        }, delay);
        return  ()=>{
          clearTimeout(timer)
         }
      },[value, delay])

      return debounce;

  }

  const debouncesearch = useDebounce(search,1000)
 
  // get all product
  const getallproduct = () => {
    axios
      .get(`${url}/product/allproduct?search=${debouncesearch}`)
      .then((res) => {
        setproducts(res.data.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getallproduct();
  }, [debouncesearch]);

  // get single product
  const fetchsingleproduct = (id: any, setproduct: any) => {
    axios
      .get(`${url}/product/singleproduct/${id}`)
      .then((res) => {
        setproduct(res.data.data);
        console.log("fetch single product", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // add product admin
  const addnewproduct = (
    title: string,
    price: string,
    category: string,
    description: string,
    file: any,
    setfile: any,
    setproductdetail: any,
    fileInputRef: any,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ): Promise<void> => {
    const token = localStorage.getItem("token")
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", file);
    console.log(formData);
    setLoading(true);
    return privateAxios
      .post("/product/addproduct", formData, {headers: {Authorization: `Bearer ${token}`} || {withCredentials: true}})
      .then((res: any) => {
        setproductdetail({
          title: " ",
          price: " ",
          description: " ",
          category: " ",
        });
        setfile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
        getallproduct();
        console.log("add new product", res);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // update product
  const updateproduct = (
    id: string,
    title: string,
    price: string,
    category: string,
    description: string,
    file: any,
    setfile: any,
    setproductdetail: React.Dispatch<
      React.SetStateAction<{
        title: string;
        price: string;
        description: string;
        image: string;
        category: string;
      }>
    >,
    fileInputref: any,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const token = localStorage.getItem("token")
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", file);
    setLoading(true);
    privateAxios
      .put(`/product/updateproduct/${id}`, formData, {headers: {Authorization: `Bearer ${token}`} || {withCredentials: true}})
      .then((res) => {
        setproductdetail({
          title: " ",
          price: " ",
          description: " ",
          image: " ",
          category: " ",
        });
        setfile(null);
        if (fileInputref.current) {
          fileInputref.current.value = null;
        }
        getallproduct();
        console.log("update product", res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // retgister
  const register = (
    username: string,
    email: string,
    password: string,
    setdata: React.Dispatch<
      React.SetStateAction<{
        username: string;
        email: string;
        password: string;
      }>
    >,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const payload = {
      username: username,
      email: email,
      password: password,
    };
    setLoading(true);
    privateAxios
      .post("/api/register", payload)
      .then((res) => {
        setdata({ username: " ", email: " ", password: " " });
        toast.success(res?.data?.message);
        navigate("/login");
        console.log("register", res);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // login
  const login = (
    email: string,
    password: string,
    setdata: React.Dispatch<
      React.SetStateAction<{ email: string; password: string }>
    >,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const payload = {
      email: email,
      password: password,
    };
    setLoading(true);
    privateAxios
      .post("/api/login", payload,{withCredentials:true})
      .then((res) => {
        setdata({ email: " ", password: " " });
        setrole(res?.data?.role);
        navigate("/");
        localStorage.setItem("isauth", "true");
        localStorage.setItem("isrole", res.data.role);
        localStorage.setItem("istheme", theme);
        setisauth("true");
        toast.success(res.data.message);
        console.log("login", res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    const authstatus = localStorage.getItem("isauth");
    let rolee: any = localStorage.getItem("isrole");
    setrole(rolee);
    if (authstatus === "true") {
      setisauth("true");
    }
  }, []);

  // profile
  const profile = () => {
    const token = localStorage.getItem("token")
    axios

      .get(`${url}/api/getuser`,{headers: {Authorization: `Bearer ${token}`} || {withCredentials: true}} )
      .then((res) => {
        setuser_detail(res.data.data);
        console.log("profile data", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //logout
  const logout = () => {
    const token = localStorage.getItem("token")
    axios
      .delete(`${url}/api/logout`, {headers: {Authorization: `Bearer ${token}`} || {withCredentials: true}})
      .then((res) => {
        toast.success(res?.data?.message);
        localStorage.removeItem("isauth");
        localStorage.removeItem("isrole");
        localStorage.removeItem("token");
        setisauth("false");
        setrole(" ");
        console.log("logout", res);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        console.log(err);
      });
  };

  // add to cart
  const addcart = (productid: string) => {
    const token = localStorage.getItem("token")
    privateAxios
      .post(
        `/cart/addcart/${productid}`,
        {},
        {headers: {Authorization: `Bearer ${token}`} || {withCredentials: true}}
      )
      .then((res) => {
        toast.success(res?.data?.message);
        console.log("add cart", res.data);
      })
      .catch((err) => {
        toast.error("please login");
        console.log(err);
      });
  };

  // fetch all cart
  const fetchcarts = () => {
    const token = localStorage.getItem("token")
    axios
    .get(`${url}/cart/allcart`,{headers: {Authorization: `Bearer ${token}`} || {withCredentials: true}})
    .then((res) => {
      setcarts(res.data.data);
      console.log(oldaddress);
      console.log("all carts", res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  // quantity decrease
  const quantityDecrease = (id: string) => {
    const token = localStorage.getItem("token")
    privateAxios
      .put(
        `${url}/cart/decrease/${id}`,
        {},
        {headers: {Authorization: `Bearer ${token}`} || {withCredentials: true}}
      )
      .then((res) => {
        setcarts(res.data.data);
        console.log("decrease", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // quantity increase
  const quantityIncrease = (id: string) => {
    const token = localStorage.getItem("token")
    privateAxios
      .put(
        `${url}/cart/increase/${id}`,
        {},
        {headers: {Authorization: `Bearer ${token}`} || {withCredentials: true}}
      )
      .then((res) => {
        setcarts(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // quantity remove
  const quantityRemove = (id: string) => {
    const token = localStorage.getItem("token")
    privateAxios
      .put(
        `${url}/cart/removecart/${id}`,
        {},
        {headers: {Authorization: `Bearer ${token}`} || {withCredentials: true}}
      )
      .then((res) => {
        fetchcarts()
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //  delete cart
  const deletecart = () => {
    const token = localStorage.getItem("token")
    privateAxios
      .put(
        `${url}/cart/deletecart`,
        {},
        {headers: {Authorization: `Bearer ${token}`} || {withCredentials: true}}
      )
      .then((res) => {
        console.log("delete cart", res.data.data);
        fetchcarts()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //  add new address
  const addnewaddress = (
    fullname: string,
    country: string,
    state: string,
    city: string,
    pincode: string,
    address: string,
    setdata: React.Dispatch<
      React.SetStateAction<{
        fullname: string;
        country: string;
        state: string;
        city: string;
        pincode: string;
        address: string;
      }>
    >
  ) => {
    const token = localStorage.getItem("token")
    const payload = {
      fullname,
      country,
      state,
      city,
      pincode,
      address,
    };
    privateAxios
      .post("/address/add", payload, {headers: {Authorization: `Bearer ${token}`} || {withCredentials: true}})
      .then((res) => {
        setdata({
          fullname: " ",
          country: " ",
          state: " ",
          city: " ",
          pincode: " ",
          address: " ",
        });
        setoldaddress(res?.data?.data);
        toast.success(res.data.message);
        navigate("/checkout");
        //   setinc(res.data.data)
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        console.log(err);
      });
  };

  // get old latest address
  const oldaddresss = () => {
    const token = localStorage.getItem("token")
    axios
      .get(`${url}/address/getaddress`, {headers: {Authorization: `Bearer ${token}`} || {withCredentials: true}})
      .then((res) => {
        setoldaddress(res.data.data[0]);
        navigate("/checkout");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // orderconfirm page
  const userorder = () => {
    const token = localStorage.getItem("token")
    axios
      .get(`${url}/payment/userorder`, {headers: {Authorization: `Bearer ${token}`} || {withCredentials: true}})
      .then((res) => {
        setRecentlyorder(res.data.data[0]);
        console.log("user recently order", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const allorder = (setallorders: any) => {
    const token = localStorage.getItem("token")
    axios
      .get(`${url}/payment/userorder`,{headers: {Authorization: `Bearer ${token}`} || {withCredentials: true}})
      .then((res) => {
        setallorders(res.data.data);
        console.log("user all order", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Appcontext.Provider
      value={{
        theme,
        setTheme,
        products,
        search,
        setsearch,
        getallproduct,
        fetchsingleproduct,
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
        quantityDecrease,
        quantityIncrease,
        quantityRemove,
        addnewproduct,
        userorder,
        recentlyorder,
        allorder,
        loading,
        setloading,
        url,
      }}
    >
      {children}
    </Appcontext.Provider>
  );
};

export default Appstate;
