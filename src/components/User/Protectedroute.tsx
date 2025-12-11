import * as React from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Appcontext from "../Context/Appcontext";

interface Setprotectedtype {
  children: React.ReactNode;
}
const Protectedroute = ({ children }: Setprotectedtype): React.JSX.Element => {
  const navigate = useNavigate();
  const Appstate = useContext(Appcontext);
  if (!Appstate) return <>null</>;
  const { logout } = Appstate;
  useEffect(() => {
    const gettoken = localStorage.getItem("isauth");
    if (!gettoken) {
      navigate("/login");
    }
  }, [logout]);
  return <>{children}</>;
};

export default Protectedroute;
