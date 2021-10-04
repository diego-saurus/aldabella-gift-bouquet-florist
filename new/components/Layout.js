import Navbar from "./Navbar"
import Head from "next/head"

function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>Document</title>
        <title>{title} | AldaBella . Gift . Bouquet . Florist</title>
      </Head>

      <div className="mx-12">
        <Navbar />
        {children}
      </div>
    </>
  )
}

export default Layout
