import Head from "next/head"

import Navbar from "../components/Navbar"
import Main from "../components/Main"
import Layout from "../components/Layout"

export default function Home() {
  return (
    <>
      <Wrap>
        <Layout>
          <Main />
        </Layout>
      </Wrap>
    </>
  )
}

export function Wrap({ children }) {
  return (
    <div
      className={`bg-local bg-cover bg-top`}
      style={{ backgroundImage: `url('img/Background.png')`, height: "100vh" }}
    >
      {children}
    </div>
  )
}
