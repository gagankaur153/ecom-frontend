import { useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Appcontext from "../Context/Appcontext";

const Cart = () => {
  const navigate = useNavigate();
  const Appstate = useContext(Appcontext);
  if (!Appstate) return null;
  const {
    fetchcarts,
    carts,
    quantityDecrease,
  
    quantityIncrease,
    quantityRemove,
    deletecart,
  } = Appstate;

  // const memorization = useMemo(()=> fetchcarts(),[dec,inc,remove])

  useEffect(() => {
    fetchcarts();
  }, []);

  const decrease = (id: any) => {
    quantityDecrease(id);
  };

  const increase = (id: any) => {
    quantityIncrease(id);
  };

  const rremove = (id: any) => {
    quantityRemove(id);
  };

  const btnhandler = () => {
    navigate("/shipping");
  };

  const clearcart = () => {
    deletecart();
  };

  console.log("cart length", carts?.length);

  return (
    <>
      <div className="min-h-screen flex flex-col gap-4 mt-20 md:mt-14">
        {carts?.item?.length === 0 ? (
          <>
            <h1 className="text-center text-2xl md:text-6xl text-yellow-600 font-semibold p-12">
              Cart is empty...
            </h1>
          </>
        ) : (
          <>
            {carts?.item && (
              <div className="flex justify-center pt-12 gap-4 md:gap-8">
                <p className="bg-sky-600 px-4 py-2  rounded font-bold text-xl">
                  Total Qty:- {carts?.totalquantity}
                </p>
                <p className="bg-yellow-600 px-4 py-2 font-bold rounded text-xl">
                  Total Amount:- {carts?.totalamount}
                </p>
              </div>
            )}
            <div className="m-5 md:flex flex-col gap-8">
              {carts?.item.map((product: any) => (
                <div id="border"
                  key={product._id} 
                  className=" shadow-sm rounded-md mb-4 p-4 md:flex items-center md:justify-around  "
                >
                  <div className="flex flex-row gap-4 md:gap-8">
                    <div className="">
                      <img
                        className="w-[80px] h-[70px] md:w-[100px] md:h-[100px] rounded-xl "
                        src={product?.image}
                      />
                    </div>
                    <div className="flex flex-col p-2 justify-center font-bold space-y-3">
                      <div>
                        {" "}
                        <p className="md:text-3xl ">
                          Title: {product?.productid?.title}
                        </p>
                      </div>
                      <div className="flex flex-row gap-3 md:gap-5">
                        <p className=" md:text-xl  ">Price: {product.price}</p>
                        <p className="md:text-xl">
                          Quantity: {product?.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className=" flex justify-around md:gap-5 p-2">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-700 md:text-2xl px-2  rounded font-bold "
                      onClick={() => decrease(product?.productid?._id)}
                    >
                      Qty--
                    </button>
                    <button id="white"
                      className="bg-sky-500 hover:bg-sky-700  md:text-2xl px-2 rounded font-bold"
                      onClick={() => increase(product?.productid?._id)}
                    >
                      Qty++
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700   md:text-2xl px-2 rounded text-white font-bold"
                      onClick={() => rremove(product?.productid?._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {carts?.item && (
              <div className="flex justify-center p-2 gap-4 md:gap-8">
                <button
                  className="bg-sky-600 hover:bg-sky-700  px-4 py-2  rounded font-bold text-xl"
                  onClick={() => btnhandler()}
                >
                  Checkout
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700  px-4 py-2 text-white font-bold rounded text-xl"
                  onClick={clearcart}
                >
                  Clear
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
