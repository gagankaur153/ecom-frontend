import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Appcontext from "../Context/Appcontext";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

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
      <div className="auth-page flex min-h-screen items-center justify-center px-4 pb-10 pt-28">
        <form
          onSubmit={handleform}
          className="auth-card w-full max-w-md p-6 md:p-8"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold md:text-4xl">Welcome Back</h1>
            <p className="auth-copy mt-2 text-sm">
              Sign in to continue shopping.
            </p>
          </div>

          <div className="auth-field mb-5">
            <label className="mb-2 block text-sm font-semibold">Email</label>
            <div className="auth-input-wrap flex items-center gap-3 px-4">
              <FaEnvelope className="auth-icon" />
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={inputhandle}
                className="w-full py-3"
                placeholder="name@gmail.com"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="auth-field mb-7">
            <label className="mb-2 block text-sm font-semibold">Password</label>
            <div className="auth-input-wrap flex items-center gap-3 px-4">
              <FaLock className="auth-icon" />
              <input
                type={passwordshow ? "text" : "password"}
                className="w-full py-3"
                name="password"
                value={data.password}
                onChange={inputhandle}
                placeholder="Enter password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="auth-eye-btn"
                onClick={handlepasswordicon}
                aria-label={passwordshow ? "Hide password" : "Show password"}
              >
                {passwordshow ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={Loading}
            className="shop-primary-btn w-full px-5 py-3 text-base disabled:cursor-not-allowed disabled:opacity-70"
          >
            {Loading ? "Please wait..." : "Login"}
          </button>

          <div className="mt-7 flex items-center justify-center gap-2 text-sm">
            <p className="auth-copy">Don't have an account?</p>
            <NavLink
              to={"/register"}
              className="auth-link font-semibold hover:underline"
            >
              Sign Up
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
