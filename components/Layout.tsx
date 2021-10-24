import React, { useEffect, useState } from "react"
import Navbar from "./Navbar"
import Head from "next/head"
import { useMediaQuery } from "hooks/useMediaQuery"

interface Props {
  title: string
}

export const NavbarContext = React.createContext({
  navbarOpen: false,
  toggleNavbar: () => {},
})

const Layout: React.FC<Props> = ({ children, title }) => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const isMedia = useMediaQuery("md")

  const toggleNavbar = () => {
    setNavbarOpen((e) => !e)
  }

  useEffect(() => {
    setNavbarOpen(false)
  }, [isMedia])

  useEffect(() => {
    const body = document.querySelector("body")
    body.style.setProperty("--bg-color", navbarOpen ? "#F8B12E" : "#090909")
  }, [navbarOpen])

  return (
    <>
      <Head>
        <title>{title} | AldaBella . Gift . Bouquet . Florist</title>
      </Head>

      <div className={`${navbarOpen ? "h-screen" : "h-auto"}`}>
        <NavbarContext.Provider value={{ navbarOpen, toggleNavbar }}>
          <Navbar />
        </NavbarContext.Provider>
        {!navbarOpen && children}
      </div>
    </>
  )
}
export default Layout
