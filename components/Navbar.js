import { useState } from "react"

import { useRouter } from "next/router"
import Link from "next/link"

import MenuIcon from "./svg/menu_black_24dp.svg"
import OpenMenuIcon from "./svg/menu_open_black_24dp.svg"
import SearchIcon from "./svg/search_black_24dp.svg"
import ShoppingCartIcon from "./svg/shopping_cart_black_24dp.svg"
import ChevronRightIcon from "./svg/chevron_right.svg"
import ChevronLeftIcon from "./svg/chevron_left.svg"

const NAV_ITEM = ["create", "gallery", "contact", "about"]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { asPath } = useRouter()

  return (
    <nav className="flex flex-col mb-3 md:flex-row md:justify-between md:items-center">
      <NavSection1 isOpen={isOpen} setIsOpen={setIsOpen} />
      <NavSection2 isOpen={isOpen} path={asPath} />
      <NavSection3 />
    </nav>
  )
}

function NavSection1({ isOpen, setIsOpen }) {
  return (
    <div className="flex justify-between items-center p-1 border-b border-brown md:border-none">
      <button
        className="md:hidden ml-2 z-20 "
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? (
          <OpenMenuIcon
            className={`fill-current ${isOpen ? "text-pink" : "text-brown"}`}
          />
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
      <div className="">
        <Link href="/">
          <a>
            <img
              src="/img/alda-bella-logo-b.png"
              className="w-14 md:p-5 md:w-36"
              alt="logo..."
            />
          </a>
        </Link>
      </div>
    </div>
  )
}

function NavSection2({ isOpen, path }) {
  return (
    <>
      <ul
        style={{ fontFamily: `"Fredoka One", cursive` }}
        className={`absolute z-10 ${
          isOpen ? "left-0" : "-left-104"
        } flex flex-col transition-all h-screen w-screen duration-700 ease-in-out bg-brown overflow-hidden justify-center items-center md:bg-opacity-0 md:static md:h-auto md:flex md:flex-row md:border-0`}
      >
        {NAV_ITEM.map((n, i) => (
          <NavLink href={`/${n}`} key={i} path={path}>
            {n}
          </NavLink>
        ))}
      </ul>
    </>
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

function NavLink({ children, href, path }) {
  return (
    <li
      className={`p-3 px-4 mx-10 my-2 transition-all duration-300 ease-in-out rounded-lg capitalize text-center ${
        href == path ? "text-brown bg-pink" : "text-pink"
      } hover:bg-pink hover:text-brown md:text-brown md:px-4 md:text-xl`}
    >
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </li>
  )
}
