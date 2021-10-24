import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { signOut, useSession } from "next-auth/react"

import { useNavbarContext } from "hooks/useNavbarContext"

import MenuIcon from "svg/menu_black_24dp.svg"
import MenuOpenIcon from "svg/menu_open_black_24dp.svg"
import CartIcon from "svg/shopping_cart_black_24dp.svg"
import ProfileIcon from "svg/profile_icon.svg"
import { useMediaQuery } from "hooks/useMediaQuery"

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
  const { pathname: path } = useRouter()
  const isMedia = useMediaQuery("md")

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
      <button className="md:hidden">
        <Link href={path === "/profile" ? "/profile/cart" : "/profile"}>
          <a>
            {path === "/profile" ? (
              <CartIcon className={IconClass} />
            ) : (
              <ProfileIcon className={`h-7 ${IconClass}`} />
            )}
          </a>
        </Link>
      </button>
    </div>
  )
}

const NavItem: React.FC = () => {
  const { status: authStatus } = useSession()
  const [status, setStatus] = useState("")
  const { pathname: path } = useRouter()
  const { navbarOpen } = useNavbarContext()
  const isMedia = useMediaQuery("md")

  useEffect(() => {
    setStatus(handleStatus().status)
  }, [authStatus])

  function handleStatus() {
    let obj: { status: string; href: string }

    switch (authStatus) {
      case "loading":
        obj = {
          status: ".....",
          href: "/",
        }
        break
      case "unauthenticated":
        obj = {
          status: "Login",
          href: "/auth/signin",
        }

        break
      case "authenticated":
        if (path === "/profile") {
          obj = {
            status: "Sign Out",
            href: "/profile",
          }
          break
        }

        obj = {
          status: "Profile",
          href: "/profile",
        }

        break
    }

    if (path === "/auth/signin")
      obj = { status: "Sign Up", href: "/auth/signup" }

    return obj
  }

  const handleClick = () => {
    if (path === "/profile") signOut()
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
      {isMedia && (
        <Link href={handleStatus().href}>
          <div className="p-0.5 hidden md:block bg-gradient-to-r from-gold-light to-gold rounded-lg">
            <button className="text-gold-light px-5 py-2 rounded-md bg-black transition-all duration-500 ease-in-out hover:text-black hover:bg-gradient-to-r hover:from-gold-light to-gold">
              <a onClick={handleClick}>{status}</a>
            </button>
          </div>
        </Link>
      )}
    </div>
  )
}

interface NavlinkProps {
  className?: string
  title: string
}

const Navlink: React.FC<NavlinkProps> = ({ className, title }) => {
  return (
    <Link href={`/${title.toLowerCase()}`}>
      <a
        className={`text-3xl text-black cursor-pointer p-2 transition-all ease-out duration-150 ${
          title.toLocaleLowerCase() === "home" ? "md:hidden" : ""
        } md:tracking-wide md:text-base md:font-light md:text-white md:border-opacity-0 md:border-white md:border-b-[1px] md:hover:border-opacity-100 ${className}`}
      >
        {title}
      </a>
    </Link>
  )
}

export default Navbar
