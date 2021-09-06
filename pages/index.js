import Head from "next/head"

import Navbar from "../components/Navbar"
import Main from "../components/Main"

export default function Home() {
  return (
    <Wrap>
      <Navbar />
      <Head>
        <title>AldaBella . Gift . Bouquet . Florist</title>
      </Head>
      <div className="container">
        <Main />
      </div>
    </Wrap>
  )
}

function Wrap({ children }) {
  return (
    <div
      className="bg-local bg-cover bg-top"
      style={{ backgroundImage: `url('img/Background.png')`, height: "100vh" }}
    >
      {children}
    </div>
  )
}
