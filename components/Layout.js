import Navbar from "./Navbar"
import Head from "next/head"

function Layout({ children, title, pathname }) {
  return (
    <>
      <Head>
        <title>{title} | AldaBella . Gift . Bouquet . Florist</title>
      </Head>
      <Navbar />
      <div className="container">{children}</div>
    </>
  )
}
export default Layout
