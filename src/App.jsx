import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Account from "./Pages/Account";
import Listitem from "./Pages/Listitem";
import ProductDetail from "./Pages/ProductDetail";
import Product from "./Pages/Product";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Account />} />
          <Route path="/additem" element={<Listitem />} />
          <Route path="/shop" element={<Product />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
