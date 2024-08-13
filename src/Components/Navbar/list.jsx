"use client";

import { useState } from "react";
import { House, List, Flame, Tag } from "@phosphor-icons/react";

const ListButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleMenu}
        className=" text-color-dark py-4 flex flex-col justify-center items-center"
      >
        <List size={32} />
      </button>
      {isOpen && (
        <ul className="absolute top-full mt-2 left-0 w-48 bg-blue-600 text-color-dark shadow-lg rounded-lg">
          <li className="px-4 py-2 hover:bg-blue-700 transition-colors">
            <a href="/" className="flex items-center space-x-2">
              <House size={24} />
              <span>Home</span>
            </a>
          </li>
          <li className="px-4 py-2 hover:bg-blue-700 transition-colors">
            <a href="/trending" className="flex items-center space-x-2">
              <Flame size={24} />
              <span>Trending</span>
            </a>
          </li>
          <li className="px-4 py-2 hover:bg-blue-700 transition-colors">
            <a href="/kategori" className="flex items-center space-x-2">
              <Tag size={24} />
              <span>Category</span>
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ListButton;
