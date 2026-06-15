import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router";
import Appstate from "./components/Context/Appstate.js";



createRoot(document.getElementById("root")!).render(

     <BrowserRouter>
    <Appstate>
      <App />
    </Appstate>
  </BrowserRouter>


 
);
