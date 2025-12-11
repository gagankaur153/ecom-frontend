import * as React from "react";
import { useState, useContext, useEffect, useRef, ChangeEvent } from "react";
import { useParams } from "react-router";
import Appcontext from "../Context/Appcontext";

const Updateproduct = () => {
  const { id } = useParams();
  const fileInputref = useRef<HTMLInputElement | null>(null);
  const Appstate = useContext(Appcontext);
  if (!Appstate) return null;
  const { fetchsingleproduct, updateproduct } = Appstate;
  const [product, setproduct] = useState<null | any>(null);
  const [file, setfile] = useState(null);
  const [productdetail, setproductdetail] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    fetchsingleproduct(id, setproduct);
  }, [id]);
  useEffect(() => {
    if (product) {
      setproductdetail({
        title: product?.title,
        price: product?.price,
        description: product?.description,
        category: product?.category,
      });
    }
  }, [product]);

  const inpputhandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setproductdetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filehandler = (e: any) => {
    setfile(e.target.files[0]);
  };
  const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateproduct(
      id,
      productdetail?.title,
      productdetail?.price,
      productdetail?.category,
      productdetail?.description,
      file,
      setfile,
      setproductdetail,
      fileInputref,
      setLoading
    );
  };

  return (
    <div className=" flex mt-16 p-3 justify-center max-w-8xl h-[90%] ">
      <div className="border mx-auto w-[90%] sm:w-[90%] rounded-xl md:w-2/3 m-6 p-7 shadow-2xl space-y-4">
        <div className="">
          <h1 className="text-center mb-8 text-2xl md:text-5xl font-semibold">
            Update Product
          </h1>
        </div>

        <div className="flex flex-col mt-5 space-y-2">
          <label className="font-medium">Title</label>
          <input
           id="logininput"
            type="text"
            name="title"
            value={productdetail?.title || ""}
            onChange={(e) => inpputhandler(e)}
            className=" py-2 px-4  rounded-xl border focus:ring-1 focus:ring-blue-300"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label  className="font-medium">Price</label>
          <input
           id="logininput"
            type="text"
            className=" py-2 px-4 rounded-xl border focus:ring-1 focus:ring-blue-300"
            name="price"
            value={productdetail.price || ""}
            onChange={(e) => inpputhandler(e)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label  className="font-medium">Category</label>
          <input
           id="logininput"
            type="text"
            placeholder="  --select category--"
            className=" py-2 px-4 rounded-xl border focus:ring-1 focus:ring-blue-300"
            name="category"
            value={productdetail.category || ""}
            onChange={(e) => inpputhandler(e)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label  className="font-medium">URL Image</label>
          {product?.image && (
            <>
              <label className="text-sm font-semibold">Current Image : </label>
              <img
                src={product?.image}
                alt="old image"
                className="w-[100px] h-[50px]"
              />
            </>
          )}
          <input
           id="logininput"
            type="file"
            ref={fileInputref}
            onChange={(e) => filehandler(e)}
            className=" py-2 px-4 rounded-xl border focus:ring-1 focus:ring-blue-300"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-medium">Description</label>
          <textarea
           id="logininput"
           className=" py-2 px-4  rounded-xl border focus:ring-1 focus:ring-blue-300"
            name="description"
            value={productdetail.description || ""}
            onChange={(e) => inpputhandler(e)}
          />
        </div>
        <div className="p-8 flex justify-center ">
          <button
            className="py-1 text-white px-6 rounded-2xl bg-purple-700 text-2xl font-semibold hover:bg-purple-600"
            onClick={(e) => submit(e)}
          >
            {Loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Updateproduct;
