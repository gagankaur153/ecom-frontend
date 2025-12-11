import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { NavLink } from "react-router";
import Appcontext from "../Context/Appcontext";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

interface ILogindata {
  email: string;
  password: string;
}
const Login = () => {
  const Appstate = useContext(Appcontext);
  if (!Appstate) return null;
  const { login } = Appstate;
  const [Loading, setLoading] = useState<boolean>(false);
  const [data, setdata] = useState<ILogindata>({ email: "", password: "" });
  const [passwordshow, setPasswordshow] = useState<boolean>(false);
  const inputhandle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };
  const handleform = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(data?.email, data?.password, setdata, setLoading);
  };
  const handlepasswordicon = () => {
    setPasswordshow(!passwordshow);
  };

  return (
    <>
      <div className="min-h-screen mt-12 flex items-center justify-center ">
        <form
          onSubmit={handleform}
          className="rounded-2xl shadow-2xl w-full border max-w-md  p-7  "
        >
          <h1 className="text-center font-bold text-2xl md:text-4xl mb-12">
            Welcome Back
          </h1>
          <div className="mb-6  flex flex-col space-y-1 ">
            {/* Email address */}

         
            <input
              type="string"
              name="email"
              value={data.email}
              onChange={inputhandle}
              className=" px-4 py-3 rounded-lg border "
              id="logininput"
              placeholder="name@example.com"
            />
          </div>

          {/* Password */}
          <div className="mb-10 relative flex flex-col space-y-1 ">
            {/* <label className="text-lg font-semibold">Password</label> */}
            <input
              id="logininput"
              type={passwordshow ? "string" : "password"}
              className="rounded-lg border px-4 py-3"
              name="password"
              value={data.password}
              onChange={inputhandle}
              placeholder="enter password"
            />
            {passwordshow ? (
              <FaEye
                size={30}
                className="absolute p-1 rounded bottom-2 right-5 text-zinc-800 "
                onClick={handlepasswordicon}
              />
            ) : (
              <FaEyeSlash
                size={30}
                className="absolute p-1 rounded bottom-2 right-5 text-zinc-800 "
                onClick={handlepasswordicon}
              />
            )}
          </div>

          {/* Button */}
          <div className=" w-full flex container justify-center">
            <button
              type="submit"
              className="btn btn-primary px-14 py-2 w-full text-lg rounded-lg hover:bg-sky-900  bg-sky-700 hover:text-white font-semibold "
            >
              {Loading ? "please wait..." : "Login"}
            </button>
          </div>

          {/* Paragraph */}
          <div className=" w-full flex flex-col text-sm  items-center justify-center mt-8">
            <p>Do'not account ?</p>
            <NavLink
              to={"/register"}
              className="hover:underline text-blue-500 font-semibold "
            >
              Register
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
