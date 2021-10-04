import Layout from "../components/Layout"
import Dashboard from "../components/Dashboard"
import SectionBar from "../components/SectionBar"

export default function Home() {
  return (
    <>
      <Layout title="Dashboard">
        <Dashboard />
      </Layout>
      <SectionBar />
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
