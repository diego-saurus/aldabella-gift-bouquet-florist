import { GetServerSideProps, NextPage } from "next"
import { Session } from "next-auth"
import { getSession, signOut } from "next-auth/react"
import { useEffect } from "react"

const Profile: NextPage = () => {
  useEffect(() => {
    getSession().then((res) => console.log(res))
  }, [])
  return (
    <div className="text-white">
      <h1>Profile Page</h1>
      <button className="cursor-pointer" onClick={() => signOut()}>
        Logout
      </button>
    </div>
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
    props: {},
  }
}

export default Profile
