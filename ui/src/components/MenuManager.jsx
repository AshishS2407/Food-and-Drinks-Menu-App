import React, { useState, useEffect } from "react";
import axios from "axios";

const MenuManager = () => {
  const [menus, setMenus] = useState([]);
  const [menuForm, setMenuForm] = useState({ name: "", description: "" });
  const [itemForm, setItemForm] = useState({ name: "", description: "", price: "" });
  const [selectedMenuId, setSelectedMenuId] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);

  const API_URL = "http://localhost:5000/api";

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get(`${API_URL}/menus`);
      setMenus(response.data);
    } catch (error) {
      console.error("Error fetching menus:", error);
    }
  };

  const createMenu = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/menus`, menuForm);
      setMenus([...menus, response.data]);
      setMenuForm({ name: "", description: "" });
    } catch (error) {
      console.error("Error creating menu:", error);
    }
  };

  const addItemToMenu = async (e) => {
    e.preventDefault();
    if (!selectedMenuId) {
      alert("Please select a menu first.");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/menus/${selectedMenuId}/items`, itemForm);
      setMenus(menus.map((menu) => (menu._id === selectedMenuId ? response.data : menu)));
      setItemForm({ name: "", description: "", price: "" });
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div
      className="bg-black min-h-screen bg-cover bg-center flex justify-center items-center relative"
      style={{
        backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/027/865/586/non_2x/set-of-restaurant-doodles-food-and-drinks-on-black-background-vector.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="absolute inset-0 bg-blur-lg"></div>

      <div className="w-full max-w-4xl mx-auto shadow-lg rounded-lg p-6 relative z-10">
        <h1 className="text-2xl text-white font-bold mb-4 text-center">Menu Manager</h1>

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-12 justify-center mb-6">


          <form
            onSubmit={createMenu}
            className="w-full lg:w-[45%] mb-8 rounded-xl shadow-xl overflow-hidden bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-000 text-white"
          >
            <div className="h-[300px] w-full">
              <img
                src="https://img.freepik.com/free-vector/positive-lettering-with-food_52683-34388.jpg?t=st=1733996067~exp=1733999667~hmac=3a1df7fc28bb33fbaffb470c07ea24e76e6893ef76b0e56a0e8a5c7355a3b33f&w=826"
                alt="Menu Header"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 lg:p-10">
              <h2 className="text-3xl font-extrabold text-center mb-4">Create Menu</h2>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  placeholder="Menu Name"
                  value={menuForm.name}
                  onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                  className="w-full  p-3 border-2 border-white rounded-full bg-opacity-20 bg-white text-black placeholder-black focus:outline-none focus:ring-4 focus:ring-orange-00"
                  required
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={menuForm.description}
                  onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
                  className="w-full p-3 border-2 border-white rounded-full bg-opacity-20 bg-white text-black placeholder-black focus:outline-none focus:ring-4 focus: ring-orange-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-6 w-full bg-gradient-to-r from-orange-500 to-red-800 text-white font-bold text-xl py-3 px-6 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
              >
                Create Menu
              </button>
            </div>
          </form>


          <form
            onSubmit={addItemToMenu}
            className="w-full lg:w-[45%] mb-8 rounded-xl shadow-xl overflow-hidden bg-gradient-to-br from-orange-500 via-yellow-500 to-blue-000 text-white"
          >
            <div className="h-[300px] w-full">
              <img
                src="https://img.freepik.com/free-vector/positive-lettering-with-food_52683-34388.jpg?t=st=1733996067~exp=1733999667~hmac=3a1df7fc28bb33fbaffb470c07ea24e76e6893ef76b0e56a0e8a5c7355a3b33f&w=826"
                alt="Form Header"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 lg:p-10">
              <h2 className="text-3xl font-extrabold text-center mb-4">Add an Item</h2>
              <div className="mb-4">
                <label htmlFor="menu-select" className="block text-sm font-semibold mb-2">
                  Select a Menu:
                </label>
                <select
                  id="menu-select"
                  value={selectedMenuId}
                  onChange={(e) => setSelectedMenuId(e.target.value)}
                  className="w-full p-2 border-2 border-white rounded-full bg-opacity-20 bg-white text-black focus:outline-none focus:ring-2 focus: ring-orange-300"
                  required
                >
                  <option value="">Choose a Menu</option>
                  {menus.map((menu) => (
                    <option key={menu._id} value={menu._id}>
                      {menu.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="item-name" className="block text-sm font-semibold mb-1">
                    Item Name:
                  </label>
                  <input
                    id="item-name"
                    type="text"
                    placeholder="Enter item name"
                    value={itemForm.name}
                    onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                    className="w-full p-2 border-2 border-white rounded-full bg-opacity-20 bg-white text-black focus:outline-none focus:ring-2 focus: ring-orange-300 placeholder-black"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="item-description" className="block text-sm font-semibold mb-1">
                    Description:
                  </label>
                  <input
                    id="item-description"
                    type="text"
                    placeholder="Enter description"
                    value={itemForm.description}
                    onChange={(e) =>
                      setItemForm({ ...itemForm, description: e.target.value })
                    }
                    className="w-full p-2 border-2 border-white rounded-full bg-opacity-20 bg-white text-black focus:outline-none focus:ring-2 focus: ring-orange-300 placeholder-black"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="item-price" className="block text-sm font-semibold mb-1">
                    Price:
                  </label>
                  <input
                    id="item-price"
                    type="number"
                    placeholder="Enter price"
                    value={itemForm.price}
                    onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                    className="w-full p-2 border-2 border-white rounded-full bg-opacity-20 bg-white text-black focus:outline-none focus:ring-2 focus: ring-orange-300 placeholder-black"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 w-full bg-gradient-to-r from-orange-500 to-red-800 text-white font-bold text-xl py-3 px-6 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
              >
                Add Item
              </button>
            </div>
          </form>
        </div>

        
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Menus</h2>
          <div className="flex flex-wrap gap-4 mb-6">
            {menus.map((menu) => (
              <button
                key={menu._id}
                className={`px-4 py-2 rounded ${activeMenu === menu._id ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
                  }`}
                onClick={() => setActiveMenu(activeMenu === menu._id ? null : menu._id)}
              >
                {menu.name}
              </button>
            ))}
          </div>
          {activeMenu && (
            <div className="p-6 border border-gray-700 rounded bg-black shadow-lg">
              <h3 className="text-2xl font-bold text-yellow-400 text-center uppercase border-b border-gray-600 pb-2">
                {menus.find((menu) => menu._id === activeMenu).name}
              </h3>
              <ul className="mt-4 space-y-4">
                {menus
                  .find((menu) => menu._id === activeMenu)
                  .items.map((item) => (
                    <li
                      key={item._id}
                      className="flex justify-between items-start text-white border-b border-gray-600 pb-2"
                    >
                      <div>
                        <span className="block text-lg font-semibold text-gray-100">
                          {item.name}
                        </span>
                        <span className="block text-sm text-gray-400">
                          {item.description}
                        </span>
                      </div>
                      <span className="text-lg font-bold text-yellow-500">
                        ₹{item.price}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuManager;