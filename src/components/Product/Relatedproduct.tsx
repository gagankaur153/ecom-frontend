import { useContext, useEffect, useState } from "react";
import Appcontext from "../Context/Appcontext";
import { NavLink } from "react-router";
type categorytype = {
  category: string;
};

const Relatedproduct = ({ category }: categorytype) => {
  const Appstate = useContext(Appcontext);
  if (!Appstate) return null;
  const { products, addcart } = Appstate;
  const [realtedprodcts, setrealtedproduct] = useState([]);
  useEffect(() => {
    setrealtedproduct(
      products?.filter(
        (item: any) => item?.category?.toLowerCase() == category?.toLowerCase()
      )
    );
  }, [category, products]);

  return (
    <div className="mt-4">
      {realtedprodcts && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {realtedprodcts.map((product: any) => (
            <div key={product._id} className="shop-card overflow-hidden">
              <NavLink
                to={`/singleproduct/${product._id}`}
                className="shop-image-box flex aspect-[4/3] items-center justify-center overflow-hidden p-3"
              >
                {product?.image && (
                  <img
                    src={product.image}
                    className="h-full w-full object-contain transition duration-300 hover:scale-105"
                    alt={product.title}
                  />
                )}
              </NavLink>
              <div className="flex min-h-[135px] flex-col p-3 md:p-4">
                <h3 className="shop-title shop-line-clamp text-sm font-bold md:text-base">
                  {product.title}
                </h3>
                <p className="shop-price mt-auto pt-3 text-base font-bold">
                  Rs. {product.price}
                </p>
                <div className="pt-3">
                  <button
                    onClick={() => addcart(product._id)}
                    className="shop-primary-btn w-full px-3 py-2 text-sm"
                  >
                    Add to cart
                  </button>
                  </div>
                </div>
              </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Relatedproduct;
