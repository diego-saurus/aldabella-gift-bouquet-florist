import React from "react"
import Navbar from "./Navbar"
import Head from "next/head"

interface Props {
  title: string
}

const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title} | AldaBella . Gift . Bouquet . Florist</title>
      </Head>

      <div className="container overflow-hidden px-5 md:px-24">
        <Navbar />
        {children}
      </div>
    </>
  )
}
export default Layout
