import React, { useEffect, useState } from "react"
import Navbar from "./Navbar"
import Head from "next/head"
import useScreenSize from "hooks/useScreenSize"

interface Props {
  title: string
}

const Layout: React.FC<Props> = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [ScreenW] = useScreenSize()

  const toggleIsOpen = () => {
    setIsOpen((e) => !e)
  }

  useEffect(() => {
    if (ScreenW > 768) {
      setIsOpen(false)
    }
  }, [ScreenW])

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
