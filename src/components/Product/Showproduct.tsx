import { useContext, useEffect, useMemo } from "react";
import Appcontext from "../Context/Appcontext";
import { NavLink, useNavigate } from "react-router";

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

  const categoryList = useMemo(() => {
    const categoryMap = new Map<string, any>();

    if (Array.isArray(products)) {
      products.forEach((product: any) => {
        const category = product?.category?.trim();
        if (!category) return;

        const key = category.toLowerCase();
        if (!categoryMap.has(key)) {
          categoryMap.set(key, {
            key,
            name: category,
            image: product?.image,
            count: 1,
          });
        } else {
          const current = categoryMap.get(key);
          categoryMap.set(key, {
            ...current,
            count: current.count + 1,
          });
        }
      });
    }

    return Array.from(categoryMap.values());
  }, [products]);

  return (
    <>
      <div className="shop-page min-h-screen mt-14">
        <section className="px-4 lg:px-10 pt-10 pb-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="shop-eyebrow text-sm font-semibold uppercase">
                Shop by category
              </p>
              <h1 className="shop-title mt-2 text-3xl md:text-5xl font-bold">
                Choose Your Category
              </h1>
              <p className="shop-description mt-3 max-w-2xl text-sm md:text-base">
                Explore fresh picks by category and find the products you need
                faster.
              </p>
            </div>
          </div>

          {categoryList.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {categoryList.map((category) => (
                <NavLink
                  key={category.key}
                  to={`/category/${category.key}`}
                  className="shop-card group overflow-hidden text-left"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <h2 className="shop-title text-base font-bold capitalize">
                      {category.name}
                    </h2>
                    <p className="shop-description text-sm">
                      {category.count} products
                    </p>
                  </div>
                </NavLink>
              ))}
            </div>
          )}
        </section>

        <section className="mx-auto px-2 lg:px-10 pb-12">
          <div className="mb-5 flex items-center justify-between px-2">
            <h2 className="shop-title text-2xl md:text-3xl font-bold capitalize">
              All Products
            </h2>
            <p className="shop-description text-sm font-semibold">
              {Array.isArray(products) ? products.length : 0} items
            </p>
          </div>

          {products && (
            <div className="w-full gap-4 md:gap-6 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {products.map((product: any) => (
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
                    <h1 className="shop-title shop-line-clamp text-sm md:text-base font-bold">
                      {product.title}
                    </h1>
                    <p className="shop-description shop-line-clamp mt-2 text-xs md:text-sm">
                      {product.description}
                    </p>
                    <div className="mt-auto pt-3">
                      <h2 className="shop-price mb-3 text-base font-bold">
                        Rs. {product.price}
                      </h2>
                      {role !== "admin" ? (
                        <button
                          className="shop-primary-btn w-full px-3 py-2 text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            addcart(product._id);
                          }}
                        >
                          Add to cart
                        </button>
                      ) : (
                        <button
                          className="shop-warm-btn w-full px-3 py-2 text-sm"
                          onClick={() => updateproduct(product._id)}
                        >
                          Update
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Showproduct;
