import { useContext, useEffect, useMemo } from "react";
import { NavLink, useParams } from "react-router";
import Appcontext from "../Context/Appcontext";

const Categoryproduct = () => {
  const { category } = useParams();
  const Appstate = useContext(Appcontext);
  if (!Appstate) return null;

  const { products, addcart, role, getallproduct } = Appstate;

  useEffect(() => {
    getallproduct();
  }, []);

  const relatedProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    return products.filter(
      (product: any) =>
        product?.category?.toLowerCase() === category?.toLowerCase()
    );
  }, [products, category]);

  const heading = category ? category.replace(/-/g, " ") : "Products";

  return (
    <div className="shop-page min-h-screen mt-14 px-4 py-10 lg:px-10">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="shop-eyebrow text-sm font-semibold uppercase">
            Related products
          </p>
          <h1 className="shop-title mt-2 text-3xl font-bold capitalize md:text-5xl">
            {heading}
          </h1>
          <p className="shop-description mt-3 max-w-2xl text-sm md:text-base">
            Products selected from the same category. Click any item to view
            its full description.
          </p>
        </div>
        <NavLink
          to="/"
          className="shop-secondary-btn w-fit px-4 py-2 text-sm"
        >
          Back To Categories
        </NavLink>
      </div>

      {relatedProducts.length > 0 ? (
        <div className="grid w-full grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {relatedProducts.map((product: any) => (
            <div
              key={product._id}
              className="shop-card overflow-hidden"
            >
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
              <div className="flex min-h-[140px] flex-col p-3 md:p-4">
                <h2 className="shop-title shop-line-clamp text-sm md:text-base font-bold">
                  {product.title}
                </h2>
                <p className="shop-description shop-line-clamp mt-2 text-xs md:text-sm">
                  {product.description}
                </p>
                <p className="shop-price mt-auto pt-3 text-base font-bold">
                  Rs. {product.price}
                </p>
                <div className="pt-3 font-semibold">
                  {role !== "admin" ? (
                    <button
                      className="shop-primary-btn w-full px-3 py-2 text-sm"
                      onClick={() => addcart(product._id)}
                    >
                      Add to cart
                    </button>
                  ) : (
                    <NavLink
                      to={`/updateproduct/${product._id}`}
                      className="shop-warm-btn block w-full px-3 py-2 text-center text-sm"
                    >
                      Update
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="shop-card p-8 text-center">
          <h2 className="shop-title text-2xl font-bold">No products found</h2>
          <p className="shop-description mt-2">
            This category does not have any products right now.
          </p>
        </div>
      )}
    </div>
  );
};

export default Categoryproduct;
