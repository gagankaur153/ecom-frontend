import React, { useContext, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import Appcontext from "./Context/Appcontext";

interface Ishow {
  show: boolean;
}

const Loaading = ({ show }: Ishow) => {
  const Appstate = useContext(Appcontext)
  if(!Appstate) return null
  const {theme} = Appstate
  useEffect(() => {
    console.log(show);
  }, []);
  return (
    <>
      {show && (
        <div className=" h-screen  mt-28 flex items-center justify-center">
          <h2 className="text-white text-center h-screen font-bold text-4xl">
            <ClipLoader color={theme == "dark"? "fffff": "black"} size={50} />
          </h2>
        </div>
      )}
    </>
  );
};

export default Loaading;
