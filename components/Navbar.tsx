import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { signIn, signOut, useSession, getCsrfToken } from "next-auth/react"

import { useNavbarContext } from "hooks/useNavbarContext"

import MenuIcon from "svg/menu_black_24dp.svg"
import MenuOpenIcon from "svg/menu_open_black_24dp.svg"
import CartIcon from "svg/shopping_cart_black_24dp.svg"

const NavItemsText = ["Home", "About", "Testimonial", "Gallery"]

const Navbar: React.FC = () => {
  const { navbarOpen } = useNavbarContext()

  return (
    <nav
      className={`${
        navbarOpen ? "h-screen" : "h-auto"
      } md:h-auto flex flex-col md:px-24 md:flex-row md:justify-between md:items-center text-white md:py-4`}
      style={{ fontFamily: "Heebo" }}
    >
      <NavLogo />
      <NavItem />
    </nav>
  )
}

const NavLogo: React.FC = () => {
  const { navbarOpen, toggleNavbar } = useNavbarContext()

  const IconClass = `fill-current ${navbarOpen ? "text-black" : "text-gold"}`
  return (
    <div
      className={`flex p-3 w-full justify-between items-center md:p-0 md:border-b-0 border-b-2 ${
        navbarOpen ? "border-black" : "border-gold"
      }`}
    >
      <h1 className="hidden md:block font-bold tracking-widest text-lg md:text-2xl">
        <Link href="/">
          <a>AldaBella</a>
        </Link>
      </h1>
      <button onClick={() => toggleNavbar()} className="md:hidden">
        {navbarOpen ? (
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

const NavItem: React.FC = () => {
  const { data: session, status: authStatus } = useSession()
  const [status, setStatus] = useState("")
  const { pathname: path } = useRouter()
  const { navbarOpen } = useNavbarContext()

  useEffect(() => {
    setStatus(handleStatus())
  }, [authStatus])

  async function handleSign() {
    authStatus === "authenticated" ? signOut() : signIn()
  }

  function handleStatus() {
    switch (authStatus) {
      case "loading":
        return "....."
      case "unauthenticated":
        return "Sign In"
      case "authenticated":
        return "Sign Out"
    }
  }

  return (
    <div
      className={`h-full ${
        navbarOpen ? "flex" : "hidden"
      } overflow-hidden flex-col mx-3 mt-10 transition-all justify-between text-md font-medium md:m-0 md:border-opacity-0 md:flex md:items-center md:h-auto md:flex-row  md:w-1/2`}
    >
      {NavItemsText.map((e, i) => (
        <Navlink
          title={e}
          key={i}
          className={`${
            path === "/" + e.toLowerCase() ? "font-bold" : "font-light"
          }`}
        />
      ))}
      <div className="flex w-full justify-around md:hidden text-black">
        <div className="border-black border-2 p-5 w-full text-center">Mail</div>
        <div className="border-black border-2 p-5 w-full border-l-0 text-center ">
          Address
        </div>
      </div>
      <div className="p-0.5 bg-gradient-to-r from-gold-light to-gold rounded-lg hidden md:block">
        <button
          className="text-gold-light px-5 py-2 rounded-md bg-black transition-all duration-500 ease-in-out hover:text-black hover:bg-gradient-to-r hover:from-gold-light to-gold"
          onClick={handleSign}
        >
          {status}
        </button>
      </div>
    </div>
  )
}

interface NavlinkProps {
  className?: string
  title: string
}

const Navlink: React.FC<NavlinkProps> = ({ children, className, title }) => {
  return (
    <Link href={`/${title.toLowerCase()}`}>
      <a
        className={`text-3xl text-black cursor-pointer p-2 md:text-base md:font-bold md:text-white md:border-opacity-0 md:hover:border-opacity-100 ${className}`}
      >
        {title}
      </a>
    </Link>
  )
}

export default Navbar
