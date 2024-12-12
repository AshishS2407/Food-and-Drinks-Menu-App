import React from "react";
import MenuManager from "./components/MenuManager";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
    <Navbar/>
    <div >
      <MenuManager />
    </div>
    <Footer/>
    </>
  );
}

export default App;
