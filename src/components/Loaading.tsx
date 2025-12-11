import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";

interface Ishow {
  show: boolean;
}

const Loaading = ({ show }: Ishow) => {
  useEffect(() => {
    console.log(show);
  }, []);
  return (
    <>
      {show && (
        <div className=" h-screen  mt-28 flex items-center justify-center">
          <h2 className="text-white text-center h-screen font-bold text-4xl">
            <ClipLoader color="fffff" size={50} />
          </h2>
        </div>
      )}
    </>
  );
};

export default Loaading;
