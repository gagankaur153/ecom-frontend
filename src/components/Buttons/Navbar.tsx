import { useState, useContext, useEffect } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { CiDark } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import Appcontext from "../Context/Appcontext";

const Navbar = () => {
  const Appstate = useContext(Appcontext);
  if (!Appstate) return null;
  const { logout, setsearch, search, isauth, role, setTheme, theme} = Appstate;
  const [isopen, setisopen] = useState(false);
const useDebounce = (value: any, delay=3000)=>{
  const[debounce , setDebounce] = useState(value)
       let timer: ReturnType<typeof setTimeout>;
       return function (){
         clearTimeout(timer)
     timer = setTimeout(() => {
          setDebounce(value)
     }, delay);
       }
}

  //theme
  const themechange = ()=>{
    if(theme === "light"){
  
      setTheme("dark")
    }else {
      setTheme("light")
    }
  }
  const smallbuttons = () => {
    setisopen((prev) => !prev);
    console.log(isopen);
  };

  const buttons = [
    {
      button: "Cart",
      link: "/cart",
    },
    {
      button: "Profile",
      link: "/profile",
    },
    {
      button: "Login",
      link: "/login",
    },
    {
      button: "Sign up",
      link: "/register",
    },
  ];

  const adminbuttons = [
    {
      button: "Go To Home",
      link: "/",
    },
    {
      button: "Add Product",
      link: "/addproduct",
    },
    {
      button: "All Orders",
      link: "/alluserorders",
    },
    {
      button: "All User",
      link: "/alluser",
    },
  ];
  console.log(isauth);
  if (isauth === "false") {
    buttons.splice(0, 2);
  }

  if (isauth === "true") {
    buttons.splice(2, 4);
  }

  return (
    <div className="max-w-8xl w-full fixed top-0 z-50 mx-auto  ">
      {/* small device navbar */}
      <nav id="navbar" className="  md:hidden  bg-white p-1 w-full flex flex-col space-y-3  ">
        <div className="text-2xl font-semibold underline">
          <NavLink to={"/"}>Mern-Ecommerce</NavLink>
        </div>

        <div className=" flex justify-between gap-3 items-center ">
          <input
            placeholder="search product..."
            className=" rounded-full border w-full  px-3 py-1 "
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
            <div> <CiDark size={40} className=" rounded-full p-1 cursor-pointer" onClick={themechange}/></div>
          {!isopen ? (
            <IoReorderThreeOutline
              size={40}
              className=" cursor-pointer"
              onClick={smallbuttons}
            />
          ) : (
            <RxCross2
              size={40}
              className=" cursor-pointer"
              onClick={smallbuttons}
            />
          )}
        </div>
        {isopen && (
          <div className=" p-2  rounded-xl flex flex-col ">
            {role !== "admin" ? (
              <>
                {buttons.map((item, index) => (
                  <NavLink
                    key={index}
                    className=" m-2 p-1 hover:underline font-semibold w-full "
                    to={item.link}
                    onClick={smallbuttons}
                  >
                    {item.button}
                  </NavLink>
                ))}
              </>
            ) : (
              <>
                {adminbuttons.map((item, index) => (
                  <NavLink
                    key={index}
                    className=" m-2 p-1 hover:underline font-semibold w-full "
                    to={item.link}
                    onClick={smallbuttons}
                  >
                    {item.button}
                  </NavLink>
                ))}
              </>
            )}

            {isauth === "true" && (
              <span
                onClick={() => logout()}
                className=" m-2  p-1 hover:underline font-semibold "
              >
                Logout
              </span>
            )}
          </div>
        )}
      </nav>
      {/* sticky-top  */}

      {/* desktop device navbar */}
      <nav id="navbar" className="hidden w-full  md:flex px-4 py-1  items-center justify-between mx-auto">
        <div className="md:text-3xl text-white font-sans hover:underline md:w-80">
          <NavLink id="text" to={"/"}>Mern Ecom</NavLink>
        </div>
        <div className=" md:w-full flex px-7 ">
          <input id="input"
            type="search"
            placeholder="search products..."
            className="input md:w-full rounded-full text-md bg-zinc-80  px-5 border"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          {role !== "admin" ? (
            <>
            <div className=" p-1"> <CiDark id="navbutton" onClick={themechange} size={40} className="rounded-full p-1 " /></div>
              {buttons.map((item, index) => (
                <div
                  key={index}
                  className="flex p-2 items-center"
                >
                  <NavLink id="navbutton" className="border border-zinc-500 px-3 w-24 text-center py-1 rounded-full lg:text-lg font-semibold" to={item.link}>{item.button}</NavLink>
                </div>
              ))}
            </>
          ) : (
            <>
            {/* <CiDark size={50} /> */}
            <div className=" p-1"> <CiDark id="navbutton" onClick={changetheme} size={40} className="rounded-full p-1 " /></div>
              {adminbuttons.map((item, index) => (
                <div
                  key={index}
                  className="flex p-2 items-center"
                >
                  <NavLink id="navbutton"   className="border text-center border-zinc-500 px-3 py-1 rounded-full w-32 font-semibold"to={item.link}>{item.button}</NavLink>
                </div>
              ))}
            </>
          )}

          {isauth === "true" && (
            <div className="p-2 flex items-center">
              <button id="navbutton"
              onClick={() => logout()}
              className="border border-zinc-500 px-3 py-1 rounded-full lg:text-lg font-semibold"
            >
              Logout
            </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
