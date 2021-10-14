import Layout from "components/Layout"
import Dashboard from "components/Dashboard"
import React, { useEffect } from "react"
import { NextPage } from "next"

interface HomeProps {
  DB_HOST: string
}

const Home: NextPage<HomeProps> = ({ DB_HOST }) => {
  return (
    <Layout title="Home">
      <Dashboard />
    </Layout>
  )
}

export default Home
