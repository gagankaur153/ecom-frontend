// import { createContext } from "react";

//  const Appcontext = createContext<any | null>(null)

// export default Appcontext

import { createContext } from "react";

interface AppContextType {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  products: any;
  search: string;
  setsearch: React.Dispatch<React.SetStateAction<string>>;
  getallproduct: () => void;
  fetchsingleproduct: (id: any, setproduct: any) => void;
  updateproduct: (...args: any[]) => void;
  deletecart: () => void;
  login: (...args: any[]) => void;
  register: (...args: any[]) => void;
  user_detail: any;
  profile: () => void;
  isauth: string;
  logout: () => void;
  addcart: (productid: string) => void;
  addnewaddress: (...args: any[]) => void;
  oldaddresss: () => void;
  role: string;
  oldaddress: any;
  fetchcarts: () => void;
  carts: any;
  quantityDecrease: (id: string) => void;
  quantityIncrease: (id: string) => void;
  quantityRemove: (id: string) => void;
  addnewproduct: (...args: any[]) => void;
  userorder: () => void;
  recentlyorder: any;
  allorder: (...args: any[]) => void;
  loading: boolean;
  setloading: React.Dispatch<React.SetStateAction<boolean>>;
  url: string;
}
const Appcontext = createContext<AppContextType | null>(null);

export default Appcontext;
