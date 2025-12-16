import { useContext, useEffect, useState } from "react";
import Appcontext from "../Context/Appcontext";
import { NavLink, useNavigate } from "react-router";
import { BeatLoader} from "react-spinners";

const Showproduct = () => {
  const Appstate = useContext(Appcontext);
  if (!Appstate) return null;
  const { products, addcart, role, getallproduct } = Appstate;
  const navigate = useNavigate();

  // update product
  const updateproduct = (id: any) => {
    navigate(`/updateproduct/${id}`);
  };
  useEffect(() => {
    getallproduct();
  }, []);

  return (
    <>
      <div className=" min-h-screen mt-14">
        <div className="flex mx-auto p-8">
          {products && (
            <div className=" w-full gap-6  md:gap-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
              {products.map((product: any) => (
                <div
                  key={product._id}
                  className="rounded-xl p-2 h-fit md:p-6  shadow-lg hover: "
                >
                  <NavLink
                    to={`/singleproduct/${product._id}`}
                    className="flex p-2 m-2 rounded-xl  items-center "
                  >
                    <img
                      src={product.image}
                      className="rounded-xl md:w-[200px] md:h-[200px] border border-yellow-600 "
                      alt="..."
                    />
                  </NavLink>
                  <div className="md:text-xl p-2 md:mb-3">
                    <h5 className="">Title:{product.title}</h5>
                  </div>
                  <div className=" md:flex p-2 md:gap-4 font-semibold justify-around space-y-2 md:space-y-0">
                    <button className=" px-2 rounded md:px-1 lg:px-2 lg:py-2 bg-blue-600">
                      Price: {product.price}
                    </button>
                    {role !== "admin" ? (
                      <>
                        <button
                          className="px-2 rounded  md:px-1 lg:px-2  lg:py-2 bg-yellow-600 hover:bg-yellow-800"
                          onClick={() => addcart(product._id)}
                        >
                        Add to cart
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="px-2 xl:p-3 rounded md:px-1 lg:px-2  lg:py-2 bg-yellow-600 hover:bg-yellow-800"
                          onClick={() => updateproduct(product._id)}
                        >
                          Update
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Showproduct;
