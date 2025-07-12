import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Footer />
    </div>
  );
}

export default Home;
