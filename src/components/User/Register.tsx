import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Appcontext from "../Context/Appcontext";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";

type IState = {
  username: string;
  email: string;
  password: string;
};

const Register = (): React.JSX.Element => {
  const Appstate = useContext(Appcontext);
  if (!Appstate) return <>null</>;
  const { register } = Appstate;
  const [data, setdata] = useState<IState>({
    username: "",
    email: "",
    password: "",
  });
  const [erroremail, seterroremail] = useState("");
  const [errorpassword, seterrorpassword] = useState("");
  const [Loading, setLoading] = useState<boolean>(false);
  const [passwordshow, setPasswordshow] = useState<boolean>(false);

  const emailregex = /^[a-z0-9#_$]+@gmail\.com$/;
  const passwordregex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;

  const inputhandle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nextData = {
      ...data,
      [name]: value,
    };
    setdata(nextData);

    if (name === "email") {
      if (!emailregex.test(value)) {
        seterroremail("Use a valid Gmail address.");
      } else {
        seterroremail("");
      }
    }
    if (name === "password") {
      if (!passwordregex.test(value)) {
        seterrorpassword(
          "Use 8-12 characters with uppercase, number and symbol."
        );
      } else {
        seterrorpassword("");
      }
    }
  };
  const handleform = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(data.username, data.email, data.password, setdata, setLoading);
  };

  const handlepasswordicon = () => {
    setPasswordshow(!passwordshow);
  };
  const hasValidationError = Boolean(erroremail || errorpassword);

  return (
    <>
      <div className="auth-page flex min-h-screen items-center justify-center px-4 pb-10 pt-28">
        <form
          onSubmit={handleform}
          className="auth-card w-full max-w-md p-6 md:p-8"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold md:text-4xl">Create Account</h1>
            <p className="auth-copy mt-2 text-sm">
              Join us and start shopping faster.
            </p>
          </div>

          <div className="auth-field mb-5">
            <label className="mb-2 block text-sm font-semibold">Username</label>
            <div className="auth-input-wrap flex items-center gap-3 px-4">
              <FaUser className="auth-icon" />
              <input
                type="text"
                name="username"
                value={data.username}
                onChange={inputhandle}
                className="w-full py-3"
                placeholder="Enter username"
                autoComplete="username"
              />
            </div>
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
            {erroremail && (
              <p className="auth-error mt-2 text-sm font-medium">{erroremail}</p>
            )}
          </div>

          <div className="auth-field mb-7">
            <label className="mb-2 block text-sm font-semibold">Password</label>
            <div className="auth-input-wrap flex items-center gap-3 px-4">
              <FaLock className="auth-icon" />
              <input
                type={passwordshow ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={inputhandle}
                className="w-full py-3"
                placeholder="Enter password"
                autoComplete="new-password"
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

            {errorpassword && (
              <p className="auth-error mt-2 text-sm font-medium">
                {errorpassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={hasValidationError || Loading}
            className="shop-primary-btn w-full px-5 py-3 text-base disabled:cursor-not-allowed disabled:opacity-70"
          >
            {Loading ? "Please wait..." : "Register"}
          </button>

          <div className="mt-7 flex items-center justify-center gap-2 text-sm">
            <p className="auth-copy">Already have an account?</p>
            <NavLink
              to={"/login"}
              className="auth-link font-semibold hover:underline"
            >
              Sign In
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
