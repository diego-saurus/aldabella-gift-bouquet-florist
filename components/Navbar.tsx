import React, { useState } from "react"
import Link from "next/link"
import MenuIcon from "./svg/menu_black_24dp.svg"
import MenuOpenIcon from "./svg/menu_open_black_24dp.svg"

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav
      className="flex flex-col md:flex-row md:justify-between md:items-center text-white md:py-4 mb-7"
      style={{ fontFamily: "Heebo" }}
    >
      <div className="flex w-full justify-between items-center">
        <h1 className="font-bold tracking-widest text-2xl">ALDABELLA</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? (
            <MenuOpenIcon className="fill-current text-gold" />
          ) : (
            <MenuIcon className="fill-current text-gold" />
          )}
        </button>
      </div>
      <div
        className={`${
          isOpen ? "h-56" : "h-0"
        } overflow-hidden flex flex-col transition-all justify-around text-md font-medium md:border-opacity-0 md:items-center md:h-auto md:flex-row md:justify-between md:w-1/2`}
      >
        <Navlink>Home</Navlink>
        <Navlink>About Us</Navlink>
        <Navlink>Gallery</Navlink>
        <div className="p-0.5 bg-gradient-to-r from-gold-light to-gold rounded-lg hidden md:block">
          <button className="text-gold-light px-5 py-2 rounded-md bg-black transition-all duration-500 ease-in-out hover:text-black hover:bg-gradient-to-r hover:from-gold-light to-gold ">
            Product
          </button>
        </div>
      </div>
    </nav>
  )
}

const Navlink: React.FC = ({ children }) => {
  return (
    <Link href="/aaa">
      <a className="border-b border-gold-light cursor-pointer p-2 md:border-opacity-0 md:hover:border-opacity-100">
        {children}
      </a>
    </Link>
  )
}

export default Navbar
