import Layout from "components/Layout"
import { GetServerSideProps, NextPage } from "next"
import { getSession, signOut } from "next-auth/react"

interface Props {
  user: {
    name: string
    email?: string
    image?: string
  }
}

const Profile: NextPage<Props> = ({ user }) => {
  // useEffect(() => {
  //   getSession().then((res) => console.log(res))
  // }, [])
  const handleButtonClick = async () => {
    signOut()
  }
  return (
    <Layout title={`${user.name} Profile Page`}>
      <div className="text-white">
        <h1>Profile Page</h1>
        <p>username : {user.name}</p>
        <button onClick={handleButtonClick}>Sign Out</button>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    }
  }

  return {
    props: { user: session.user },
  }
}

export default Profile
