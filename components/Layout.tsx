import React, { useEffect, useState } from "react"
import Navbar from "./Navbar"
import Head from "next/head"
import useScreenSize from "hooks/useScreenSize"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth/server/types"

interface Props {
  title: string
  session: Session
}

const Layout: React.FC<Props> = ({ children, title, session }) => {
  const [navbarIsOpen, setNavbarIsOpen] = useState(false)
  const [ScreenW] = useScreenSize()

  const toggleIsOpen = () => {
    setNavbarIsOpen((e) => !e)
  }

  useEffect(() => {
    if (ScreenW > 768) {
      setNavbarIsOpen(false)
    }
  }, [ScreenW])

  useEffect(() => {
    const body = document.querySelector("body")
    body.style.setProperty("--bg-color", navbarIsOpen ? "#F8B12E" : "#090909")
  }, [navbarIsOpen])

  return (
    <>
      <Head>
        <title>{title} | AldaBella . Gift . Bouquet . Florist</title>
      </Head>

      <div className={`${navbarIsOpen ? "h-screen" : "h-auto"}`}>
        <SessionProvider session={session}>
          <Navbar
            navbarIsOpen={navbarIsOpen}
            toogleNavbarIsOpen={toggleIsOpen}
          />
          <div id="modal"></div>
          {!navbarIsOpen && children}
        </SessionProvider>
      </div>
    </>
  )
}
export default Layout
