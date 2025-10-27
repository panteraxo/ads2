import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdOutlinePointOfSale } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { BsBoxSeamFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    {
      name: "Home",
      icon: <FaHome />,
      path: "/",
    },
    {
      name: "Venta",
      icon: <MdOutlinePointOfSale />,
      path: "/ventas",
    },
    {
      name: "Inventario",
      icon: <MdInventory />,
      path: "/inventario",
    },
    {
      name: "Reportes",
      icon: <BiSolidReport />,
      path: "/reportes/ventas",
    },
    {
      name: "Productos",
      icon: <BsBoxSeamFill />,
      path: "/productos",
    },
    {
      name: "usuarios",
      icon: <FaUsers />,
      path: "/usuarios",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header con Logo */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-blue-800 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">TINKU</span>
          </div>
          {isOpen && (
            <span className="text-blue-800 font-bold text-sm">market</span>
          )}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <div className="w-6 h-1 bg-gray-600 mb-1"></div>
          <div className="w-6 h-1 bg-gray-600 mb-1"></div>
          <div className="w-6 h-1 bg-gray-600"></div>
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 mx-2 rounded transition-colors ${
                  isActive(item.path)
                    ? "bg-indigo-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer con Usuario y Cerrar Sesión */}
      <div className="border-t border-gray-200 p-4">
        {/* Usuario */}
        <div
          className={`flex items-center gap-3 px-3 py-2 mb-2 ${
            isOpen ? "" : "justify-center"
          }`}
        >
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">👤</span>
          </div>
          {isOpen && (
            <span className="text-sm font-medium text-gray-800">Carlos P.</span>
          )}
        </div>

        {/* Cerrar Sesión */}
        <button
          className={`flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 rounded w-full transition-colors ${
            isOpen ? "" : "justify-center"
          }`}
        >
          <span className="text-xl">
            <CiLogin />
          </span>
          {isOpen && <span className="text-sm font-medium">Cerrar Sesión</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
