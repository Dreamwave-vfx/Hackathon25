import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Account from "./Pages/Account";
import Listitem from "./Pages/Listitem";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Account />} />
          <Route path="/additem" element={<Listitem />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
