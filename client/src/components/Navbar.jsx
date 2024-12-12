import { Link, NavLink, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const { showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const [navSearchVisible, setNavSearchVisible] = useState(false);

  const location = useLocation();

  // Update navSearchVisible when location changes
  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setNavSearchVisible(true);
    } else {
      setNavSearchVisible(false);
      setShowSearch(false);
    }
  }, [location, setShowSearch]);

  // Define the navigation items
  const navItems = [
    { to: "/", label: "HOME" },
    { to: "/collection", label: "COLLECTION" },
    { to: "/about", label: "ABOUT" },
    { to: "/contact", label: "CONTACT" },
  ];

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-36" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className="flex flex-col items-center gap-1"
          >
            <p>{item.label}</p>
            <hr className="w-3/4 border-none h-[1.5px] bg-gray-700" hidden />
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        {navSearchVisible && (
          <img
            onClick={() => setShowSearch(!showSearch)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="Search Icon"
          />
        )}
        <div className="group relative">
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="Profile Icon"
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart Icon" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-[8px]">
            7
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu Icon"
        />
      </div>

      {/* Sidebar menu for small screen */}
      <div
        className={`absolute top-0 left-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              src={assets.dropdown_icon}
              className="h-4 rotate-180"
              alt="Back Icon"
            />
            <p>Back</p>
          </div>
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border"
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
