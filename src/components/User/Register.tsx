import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { NavLink } from "react-router";
import Appcontext from "../Context/Appcontext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  const [display, setdisplay] = useState<Boolean>(false);
  const [erroremail, seterroremail] = useState("");
  const [errorpassword, seterrorpassword] = useState("");
  const [Loading, setLoading] = useState<Boolean>(false);
  const [passwordshow, setPasswordshow] = useState<Boolean>(false);

  const emailregex = /^[a-z0-9#_$]+@gmail\.com$/;
  const passwordregex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;

  const inputhandle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
    if (name === "email") {
      if (!emailregex.test(value)) {
        setdisplay(true);
        seterroremail("email format is youremail@gmail.com");
      } else {
        setdisplay(false);
        seterroremail(" ");
      }
    }
    if (name === "password") {
      if (!passwordregex.test(value)) {
        setdisplay(true);
        seterrorpassword(
          "Password must be contain 8-12 character & 1 captial letter & 1 number & 1 special symbol"
        );
      } else {
        setdisplay(false);
        seterrorpassword(" ");
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

  return (
    <>
      <div className=" mt-14 h-[90vh] flex items-center justify-center">
        <form
          onSubmit={handleform}
          className="shadow-2xl mt-10 border w-full max-w-md rounded-2xl p-7 space-y-6"
        >
          <div className="text-center text-2xl md:text-4xl font-bold mb-9">
            <h1>Create Account</h1>
          </div>

          {/* username */}
          <div className="flex flex-col ">
            <input
              id="logininput"
              type="string"
              name="username"
              value={data.username}
              onChange={inputhandle}
              className=" py-3 border rounded-xl px-4 focus:outline-none "
              placeholder="enter username"
            />
          </div>

          {/* email address */}
          <div className="flex flex-col ">
            <input
              id="logininput"
              type="email"
              name="email"
              value={data.email}
              onChange={inputhandle}
              className="py-3 border rounded-xl px-4"
              placeholder="name@example.com"
            />
            {display && <h2 className="text-md text-red-500">{erroremail}</h2>}
          </div>

          {/* password */}
          <div className=" flex flex-col">
            <div className="relative">
              <input
                id="logininput"
                type={passwordshow ? "string" : "password"}
                name="password"
                value={data.password}
                onChange={inputhandle}
                className="py-3 rounded-xl w-full px-4 relative border"
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

            {display && (
              <h2 className="text-md text-red-500">{errorpassword}</h2>
            )}
          </div>

          {/* button */}
          <div className=" w-full flex container justify-center ">
            <button
              type="submit"
              disabled={display === true}
              className={`btn btn-primary mt-3 px-4 w-full lg:px-14 py-2 text-lg rounded-lg font-semibold 
    ${
      display
        ? "bg-gray-400 cursor-not-allowed text-gray-700"
        : "bg-sky-700 hover:bg-sky-900text-white"
    }`}
            >
              {Loading ? "Please wait..." : "Register"}
            </button>
          </div>
          <div className="mb- w-full  flex flex-col text-sm  items-center justify-center mt-2">
            <p>Already account</p>
            <NavLink
              to={"/login"}
              className="hover:underline text-blue-500 font-semibold text-md
  "
            >
              Signup
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
