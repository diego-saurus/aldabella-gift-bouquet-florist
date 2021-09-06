import { useState } from "react"

import Image from "next/image"

import MenuIcon from "./svg/menu_black_24dp.svg"
import OpenMenuIcon from "./svg/menu_open_black_24dp.svg"
import SearchIcon from "./svg/search_black_24dp.svg"
import ShoppingCartIcon from "./svg/shopping_cart_black_24dp.svg"
import ChevronRightIcon from "./svg/chevron_right.svg"
import ChevronLeftIcon from "./svg/chevron_left.svg"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="flex flex-col mb-3 md:flex-row md:justify-between md:items-center">
      <NavSection1 isOpen={isOpen} setIsOpen={setIsOpen} />
      <NavSection2 isOpen={isOpen} />
      <NavSection3 />
    </nav>
  )
}

function NavSection1({ isOpen, setIsOpen }) {
  return (
    <div className="flex justify-between items-center p-1">
      <button
        className="md:hidden  ml-2 "
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? (
          <OpenMenuIcon className="fill-current text-brown" />
        ) : (
          <MenuIcon className="fill-current text-brown" />
        )}
      </button>
      <form className="md:hidden w-1/2 ml-5">
        <input
          type="text"
          className="w-full px-3 py-1 rounded-lg focus:outline-none text-sm text-center"
          placeholder="search what you want..."
        />
      </form>
      <img
        src="/img/alda-bella-logo-b.png"
        className="w-14 md:p-5 md:w-36"
        alt="logo..."
      />
    </div>
  )
}

function NavSection2({ isOpen }) {
  return (
    <ul
      style={{ fontFamily: `"Fredoka One", cursive` }}
      className={`${
        isOpen ? "h-72" : "h-0"
      } flex flex-col transition-all duration-300 ease border border-brown overflow-hidden justify-center items-center md:h-auto md:flex md:flex-row md:border-0`}
    >
      <NavLink href="#">Create</NavLink>
      <NavLink href="#">Gallery</NavLink>
      <NavLink href="#">Contact</NavLink>
      <NavLink href="#">About Us</NavLink>
    </ul>
  )
}

function NavSection3() {
  const [isShow, setIsShow] = useState(true)
  return (
    <div className="flex flex-row mr-3">
      <button href="#" className="p-3 hidden md:block">
        <SearchIcon className="fill-current text-brown" />
      </button>
      <div
        className={`fixed flex bottom-10 ${
          isShow ? "-right-0" : "-right-20"
        } transition-all ease-out duration-500 md:block md:static md:right-0 md:left-0 md:bg-opacity-0 `}
      >
        <button
          className={`${
            isShow ? "opacity-0" : "opacity-1"
          } transition-opacity ease-in duration-300 md:hidden`}
          onClick={() => setIsShow(true)}
        >
          <ChevronLeftIcon />
        </button>

        <button href="#" className="p-3 bg-brown rounded-full md:bg-opacity-0">
          <ShoppingCartIcon className="fill-current text-pink md:text-brown" />
        </button>

        <button className="block md:hidden" onClick={() => setIsShow(false)}>
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  )
}

function NavLink({ children, className, href }) {
  return (
    <li
      className={`p-3 px-4 mx-10 my-2 transition-all duration-300 ease-in-out rounded-lg text-brown text-center hover:text-pink hover:bg-brown md:px-4 md:text-xl`}
    >
      <a href={href}>{children}</a>
    </li>
  )
}
