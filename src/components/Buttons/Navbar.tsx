import { useState, useContext } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { CiDark } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import Appcontext from "../Context/Appcontext";

const Navbar = () => {
  const Appstate = useContext(Appcontext);
  if (!Appstate) return null;
  const { logout, setsearch, search, isauth, role, setTheme, theme } = Appstate;
  const [isopen, setisopen] = useState(false);
 

  //theme
  const themechange = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  const smallbuttons = () => {
    setisopen((prev) => !prev);
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
  if (isauth === "false") {
    buttons.splice(0, 2);
  }

  if (isauth === "true") {
    buttons.splice(2, 4);
  }

  return (
    <div className="fixed top-0 z-50 w-full">
      {/* small device navbar */}
      <nav id="navbar" className="shop-nav flex w-full flex-col gap-3 px-4 py-3 sm:hidden">
        <div className="flex items-center justify-between gap-3">
          <NavLink
            to={"/"}
            className="shop-brand flex items-center gap-2 text-xl font-extrabold"
            onClick={() => setisopen(false)}
          >
            <span className="shop-brand-mark flex h-9 w-9 items-center justify-center rounded-lg text-sm font-black">
              ME
            </span>
            <span className="shop-brand">Mern Ecom</span>
          </NavLink>
          <div className="flex items-center gap-2">
            <button
              className="shop-nav-icon flex h-10 w-10 items-center justify-center"
              onClick={themechange}
              aria-label="Toggle theme"
            >
              <CiDark size={24} />
            </button>
            <button
              className="shop-nav-icon flex h-10 w-10 items-center justify-center"
              onClick={smallbuttons}
              aria-label="Toggle menu"
            >
              {!isopen ? (
                <IoReorderThreeOutline size={28} />
              ) : (
                <RxCross2 size={24} />
              )}
            </button>
          </div>
        </div>

        <div>
          <input
            placeholder="search product..."
            className="shop-search w-full rounded-full px-4 py-2 text-sm"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
        </div>
        {isopen && (
          <div className="shop-nav-menu grid gap-2 pt-3">
            {role !== "admin" ? (
              <>
                {buttons.map((item, index) => (
                  <NavLink
                    key={index}
                    className="shop-nav-link px-4 py-2 text-sm"
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
                    className="shop-nav-link px-4 py-2 text-sm"
                    to={item.link}
                    onClick={smallbuttons}
                  >
                    {item.button}
                  </NavLink>
                ))}
              </>
            )}

            {isauth === "true" && (
              <button
                onClick={() => {
                  logout();
                  smallbuttons();
                }}
                className="shop-nav-link px-4 py-2 text-left text-sm"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
      {/* sticky-top  */}

      {/* desktop device navbar */}
      <nav id="navbar" className="shop-nav hidden w-full items-center justify-between gap-4 px-4 py-3 sm:flex lg:px-10">
        <div className="min-w-fit">
          <NavLink
            to={"/"}
            className="shop-brand flex items-center gap-3 text-xl font-extrabold md:text-2xl"
          >
            <span className="shop-brand-mark flex h-10 w-10 items-center justify-center rounded-lg text-sm font-black">
              ME
            </span>
            <span className="shop-brand hidden md:inline">Mern Ecom</span>
          </NavLink>
        </div>
        <div className="flex w-full max-w-2xl">
          <input
            type="search"
            placeholder="search products..."
            className="shop-search w-full rounded-full px-5 py-2 text-sm md:text-base"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
        </div>
        <div className="flex min-w-fit items-center gap-2">
          {role !== "admin" ? (
            <>
              <button
                className="shop-nav-icon flex h-10 w-10 items-center justify-center"
                onClick={themechange}
                aria-label="Toggle theme"
              >
                <CiDark size={24} />
              </button>
              {buttons.map((item, index) => (
                <NavLink
                  key={index}
                  className="shop-nav-link px-4 py-2 text-center text-sm"
                  to={item.link}
                >
                  {item.button}
                </NavLink>
              ))}
            </>
          ) : (
            <>
              <button
                className="shop-nav-icon flex h-10 w-10 items-center justify-center"
                onClick={themechange}
                aria-label="Toggle theme"
              >
                <CiDark size={24} />
              </button>
              {adminbuttons.map((item, index) => (
                <NavLink
                  key={index}
                  className="shop-nav-link px-4 py-2 text-center text-sm"
                  to={item.link}
                >
                  {item.button}
                </NavLink>
              ))}
            </>
          )}

          {isauth === "true" && (
            <button
              onClick={() => logout()}
              className="shop-nav-link px-4 py-2 text-sm"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
