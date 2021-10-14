import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import MenuIcon from "svg/menu_black_24dp.svg"
import MenuOpenIcon from "svg/menu_open_black_24dp.svg"
import CartIcon from "svg/shopping_cart_black_24dp.svg"
import SearchBox from "components/utils/SearchBox"

interface NavProps {
  isOpen: boolean
  toggleIsOpen?: () => void
  path?: string
}

interface NavlinkProps {
  children: string
  className?: string
}

const NavItemsText = ["Home", "About", "Testimonial", "Gallery"]

const Navbar: React.FC<NavProps> = ({ toggleIsOpen, isOpen }) => {
  const { pathname } = useRouter()

  return (
    <nav
      className={`${
        isOpen ? "h-screen" : "h-auto"
      } md:h-auto flex flex-col md:px-24 md:flex-row md:justify-between md:items-center text-white md:py-4`}
      style={{ fontFamily: "Heebo" }}
    >
      <NavLogo isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
      <NavItem isOpen={isOpen} path={pathname} />
    </nav>
  )
}

const NavLogo: React.FC<NavProps> = ({ isOpen, toggleIsOpen }) => {
  const IconClass = `fill-current ${isOpen ? "text-black" : "text-gold"}`
  return (
    <div
      className={`flex p-3 w-full justify-between items-center md:p-0 md:border-b-0 border-b-2 ${
        isOpen ? "border-black" : "border-gold"
      }`}
    >
      <h1 className="hidden md:block font-bold tracking-widest text-lg md:text-2xl">
        <Link href="/">
          <a>AldaBella</a>
        </Link>
      </h1>
      <button onClick={() => toggleIsOpen()} className="md:hidden">
        {isOpen ? (
          <MenuOpenIcon className={IconClass} />
        ) : (
          <MenuIcon className={IconClass} />
        )}
      </button>
      <button className={`md:hidden ${IconClass}`}>
        <CartIcon />
      </button>
    </div>
  )
}

const NavItem: React.FC<NavProps> = ({ isOpen, path }) => {
  return (
    <div
      className={`h-full ${
        isOpen ? "flex" : "hidden"
      } overflow-hidden flex-col mx-3 mt-10 transition-all justify-between text-md font-medium md:m-0 md:border-opacity-0 md:flex md:items-center md:h-auto md:flex-row  md:w-1/2`}
    >
      <SearchBox className="md:hidden" />
      {NavItemsText.map((e, i) => (
        <Navlink
          key={i}
          className={`${
            path === "/" + e.toLowerCase() ? "font-bold" : "font-light"
          }`}
        >
          {e}
        </Navlink>
      ))}
      <div className="flex w-full justify-around md:hidden text-black">
        <div className="border-black border-2 p-5 w-full text-center">Mail</div>
        <div className="border-black border-2 p-5 w-full border-l-0 text-center ">
          Address
        </div>
      </div>
      <div className="p-0.5 bg-gradient-to-r from-gold-light to-gold rounded-lg hidden md:block">
        <button className="text-gold-light px-5 py-2 rounded-md bg-black transition-all duration-500 ease-in-out hover:text-black hover:bg-gradient-to-r hover:from-gold-light to-gold ">
          Product
        </button>
      </div>
    </div>
  )
}

const Navlink: React.FC<NavlinkProps> = ({ children, className }) => {
  return (
    <Link href={`/${children.toLowerCase()}`}>
      <a
        className={`text-3xl text-black cursor-pointer p-2 md:text-base md:font-bold md:text-white md:border-opacity-0 md:hover:border-opacity-100 ${className}`}
      >
        {children}
      </a>
    </Link>
  )
}

export default Navbar
