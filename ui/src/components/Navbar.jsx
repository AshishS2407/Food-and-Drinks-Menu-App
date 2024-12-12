import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">DEEP NET SOFT</div>

        <div
          className="text-3xl md:hidden cursor-pointer"
          onClick={toggleMenu}
        >
          ☰
        </div>

        <ul className="hidden md:flex space-x-8 text-lg">
          <li className="hover:text-blue-500 cursor-pointer">Home</li>
          <li className="hover:text-blue-500 cursor-pointer">Menu</li>
          <li className="hover:text-blue-500 cursor-pointer">
            Make a Reservation
          </li>
          <li className="hover:text-blue-500 cursor-pointer">Contact Us</li>
        </ul>
      </div>

      {isMenuOpen && (
        <ul className="md:hidden bg-black text-lg space-y-4 py-4 px-6">
          <li className="hover:text-blue-500 cursor-pointer">Home</li>
          <li className="hover:text-blue-500 cursor-pointer">Menu</li>
          <li className="hover:text-blue-500 cursor-pointer">
            Make a Reservation
          </li>
          <li className="hover:text-blue-500 cursor-pointer">Contact Us</li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
