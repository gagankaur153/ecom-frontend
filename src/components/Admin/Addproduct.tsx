import { ChangeEvent, useContext, useRef, useState } from "react";
import Appcontext from "../Context/Appcontext";

const Addproduct = () => {
  const Appstate = useContext(Appcontext);
  if (!Appstate) return null;
  const { addnewproduct } = Appstate;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [Loading, setLoading] = useState<boolean>(false);
  const [productdetail, setproductdetail] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });
  const [file, setfile] = useState(null);
  const inpputhandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;
    value = value.charAt(0).toUpperCase() + value.slice(1);
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
    setLoading(true);
    addnewproduct(
      productdetail?.title,
      productdetail?.price,
      productdetail?.category,
      productdetail?.description,
      file,
      setproductdetail,
      setfile,
      fileInputRef,
      setLoading
    );
  };

  return (
    <div className=" flex p-3 justify-center mt-16 max-w-8xl h-[90%] text-white ">
      <div className="border mx-auto w-[90%] sm:w-[90%] rounded-xl md:w-2/3  m-8 p-7 shadow-2xl space-y-6">
        <div className="">
          <h1 className="text-center text-2xl mb-8 md:text-4xl font-semibold">
            Add Product
          </h1>
        </div>

        {/* TITLE */}
        <div className="flex flex-col space-y-2">
          <input
            id="logininput"
            type="text"
            name="title"
            value={productdetail?.title || ""}
            onChange={(e) => inpputhandler(e)}
            className="py-2 px-4 border rounded-xl focus:ring-1 focus:ring-blue-300"
            placeholder="enter title"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col space-y-2">
          <input
            id="logininput"
            type="text"
            className="py-2 px-4 border rounded-xl focus:ring-1 focus:ring-blue-300"
            name="price"
            placeholder="--price--"
            value={productdetail?.price || ""}
            onChange={(e) => inpputhandler(e)}
          />
        </div>

        {/* Category */}
        <div className="flex flex-col space-y-2">
          <input
            id="logininput"
            type="text"
            placeholder="  --select category--"
            className="py-2 px-4 border rounded-xl focus:ring-1 focus:ring-blue-300"
            name="category"
            value={productdetail?.category || ""}
            onChange={(e) => inpputhandler(e)}
          />
        </div>

        {/* URL */}
        <div className="flex flex-col space-y-2">
          <input
            id="logininput"
            type="file"
            ref={fileInputRef}
            onChange={(e) => filehandler(e)}
            className="py-2 px-4 border rounded-xl focus:ring-1 focus:ring-blue-300"
            placeholder="--URL--"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col space-y-2">
          <textarea
            id="logininput"
            className="py-2 px-4 text-black border rounded-xl focus:ring-1 focus:ring-blue-300"
            name="description"
            value={productdetail?.description || ""}
            onChange={(e) => inpputhandler(e)}
            placeholder="--description--"
          />
        </div>

        {/* button */}
        <div className="p-5 flex justify-center ">
          <button
            className="py-1 text-white px-6 rounded-2xl bg-purple-700 text-2xl font-semibold hover:bg-purple-600"
            onClick={(e) => submit(e)}
          >
            {Loading ? "Loading..." : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addproduct;
