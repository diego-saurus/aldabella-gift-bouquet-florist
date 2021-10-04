import React, { useEffect, useState } from "react"
import Navbar from "./Navbar"
import Head from "next/head"

interface Props {
  title: string
}

const Layout: React.FC<Props> = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = () => {
    if (window.innerWidth < 768) {
      setIsOpen((e) => !e)
    }
  }

  useEffect(() => {
    const windowListener = (): void => {
      if (window.innerWidth > 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", windowListener)
    return () => {
      window.removeEventListener("resize", windowListener)
    }
  }, [])

  useEffect(() => {
    const body = document.querySelector("body")
    body.style.setProperty("--bg-color", isOpen ? "#F8B12E" : "#090909")
  }, [isOpen])

  return (
    <>
      <Head>
        <title>{title} | AldaBella . Gift . Bouquet . Florist</title>
      </Head>

      <div className={`${isOpen ? "h-screen" : "h-auto"}`}>
        <Navbar isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
        {!isOpen && children}
      </div>
    </>
  )
}
export default Layout
