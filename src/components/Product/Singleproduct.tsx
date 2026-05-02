import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import Appcontext from "../Context/Appcontext";
import Relatedproduct from "./Relatedproduct";
const Singleproduct = () => {
  const { id } = useParams();
  const Appstate = useContext(Appcontext);
  if (!Appstate) return null;
  const { fetchsingleproduct, addcart } = Appstate;

  const [product, setproduct] = useState<any>("");
  useEffect(() => {
    fetchsingleproduct(id, setproduct);
  }, [id]);
  return (
    <>
      <div className="shop-page mt-14 min-h-screen px-4 py-10 lg:px-10">
        <div className="shop-card mx-auto grid max-w-6xl overflow-hidden md:grid-cols-2">
          <div className="shop-image-box flex min-h-[320px] items-center justify-center p-6 md:min-h-[520px]">
            {product?.image && (
              <img
                className="max-h-[460px] w-full object-contain"
                src={product.image}
                alt={product.title}
              />
            )}
          </div>

          <div className="flex flex-col justify-center p-5 md:p-8 lg:p-10">
            <p className="shop-eyebrow text-sm font-semibold uppercase">
              Product details
            </p>
            <h1 className="shop-title mt-3 text-3xl font-bold md:text-5xl">
              {product.title}
            </h1>
            <p className="shop-description mt-5 text-base leading-7 md:text-lg">
              {product.description}
            </p>
            <p className="shop-price mt-6 text-3xl font-bold">
              Rs. {product.price}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <NavLink
                to={"/cart"}
                className="shop-primary-btn px-5 py-3 text-center text-sm md:text-base"
              >
                Buy Now
              </NavLink>
              <button
                className="shop-warm-btn px-5 py-3 text-sm md:text-base"
                onClick={() => addcart(product._id)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl">
          <div className="mb-5">
            <p className="shop-eyebrow text-sm font-semibold uppercase">
              More from this category
            </p>
            <h2 className="shop-title mt-2 text-2xl font-bold md:text-4xl">
              Related Products
            </h2>
          </div>
          <Relatedproduct category={product?.category} />
        </div>
      </div>
    </>
  );
};

export default Singleproduct;
