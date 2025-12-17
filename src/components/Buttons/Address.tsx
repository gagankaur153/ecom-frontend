import { ChangeEvent, useContext, useState } from "react";
import Appcontext from "../Context/Appcontext";

const Address = () => {
  const Appstate = useContext(Appcontext);
  if (!Appstate) return null;
  const { addnewaddress, oldaddresss } = Appstate;
  const [data, setdata] = useState({
    fullname: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
  });

  const inputhandler = (e: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    value = value.charAt(0).toUpperCase() + value.slice(1);
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const click = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addnewaddress(
      data?.fullname,
      data?.country,
      data?.state,
      data?.city,
      data?.pincode,
      data?.address,
      setdata
    );
  };
  const useoldaddress = () => {
    oldaddresss();
  };

  return (
    <div className="md:mt-16 mt-20 p-8 max-w-8xl flex justify-center text-white items-center ">
      <div id="border" className="border shadow-2xl rounded  w-full  p-8 mx-auto ">
        <div className="text-center mb-8 text-3xl md:text-4xl font-bold">
          <h1>Shipping Address</h1>
        </div>
        <div className="grid grid-cols-3 gap-4 w-full mt-9">
          <div className="flex flex-col space-y-2 ">
            <label className="md:text-xl font-bold">Full Name</label>
            <input id="logininput"
              type="text"
              className="py-1 px-2 rounded-lg border focus:ring-1 focus:ring-blue-500"
              name="fullname"
              value={data.fullname}
              onChange={(e) => inputhandler(e)}
            />
          </div>

          <div className="flex flex-col space-y-2 ">
            <label className="md:text-xl font-bold">Country</label>
            <input
           id="logininput"
              type="text"
              className="py-1 px-2 rounded-lg border focus:ring-1 focus:ring-blue-500"
              name="country"
              value={data.country}
              onChange={(e) => inputhandler(e)}
            />
          </div>
          <div className="flex flex-col space-y-2 ">
            <label className="md:text-xl font-bold">State</label>
            <input
              id="logininput"
              className="py-1 px-2 rounded-lg border focus:ring-1 focus:ring-blue-500"
              name="state"
              value={data.state}
              onChange={(e) => inputhandler(e)}
            />
          </div>
          <div className="flex  flex-col  space-y-2 ">
            <label className="md:text-xl font-bold">City</label>
            <input
            id="logininput"
              type="text"
              className="py-1 px-2 rounded-lg border focus:ring-1 focus:ring-blue-500"
              name="city"
              value={data.city}
              onChange={(e) => inputhandler(e)}
            />
          </div>
          <div className="flex flex-col space-y-2 ">
            <label className="md:text-xl font-bold">Pincode</label>
            <input
          id="logininput"
              type="text"
              className="py-1 px-2 rounded-lg border focus:ring-1 focus:ring-blue-500"
              name="pincode"
              value={data.pincode}
              onChange={(e) => inputhandler(e)}
            />
          </div>

          <div className="flex flex-col space-y-2 col-span-3">
            <label className="md:text-xl font-bold">Address Line</label>
            <input
           id="logininput"
              type="text"
              className="py-2 px-2 rounded-lg border focus:ring-1 focus:ring-blue-500"
              name="address"
              value={data.address}
              onChange={(e) => inputhandler(e)}
            />
          </div>
        </div>
        <div className=" mt-5 flex items-center flex-col space-y-5 ">
          <button
            className="w-1/2 bg-blue-600 py-1 md:text-xl font-semibold text-white "
            onClick={(e) => click(e)}
          >
            Submit
          </button>
          <button
            className="w-1/2 bg-yellow-600 py-1 md:text-xl font-semibold text-black"
            onClick={() => useoldaddress()}
          >
            Use Old Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default Address;
