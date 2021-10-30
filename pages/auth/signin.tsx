import React, { useEffect, useRef, useState } from "react"
import { BuiltInProviderType } from "next-auth/providers"
import { getSession, LiteralUnion, signIn, useSession } from "next-auth/react"

import Layout from "components/Layout"
import FacebookIcon from "svg/facebook_icon.svg"
import GoogleIcon from "svg/google_icon.svg"
import TwitterIcon from "svg/twitter_icon.svg"
import { FormSubmit, Form, FormControl, Values } from "components/Form"
import Link from "next/link"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"

interface Prov {
  id: LiteralUnion<BuiltInProviderType, string>
  Icon?: React.VFC<React.SVGProps<SVGSVGElement>>
  name: string
}

const Provider: Prov[] = [
  {
    id: "google",
    Icon: GoogleIcon,
    name: "Google",
  },
  {
    id: "facebook",
    Icon: FacebookIcon,
    name: "Facebook",
  },
  {
    id: "twitter",
    Icon: TwitterIcon,
    name: "Twitter",
  },
  {
    id: "credentials",
    name: "Username SignIn",
  },
]

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  return session
    ? {
        redirect: {
          destination: "/profile",
          permanent: false,
        },
      }
    : {
        props: {},
      }
}

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()

  const handleSubmit = async (val: Values) => {
    setLoading(true)
    const { error } = await signIn("credentials", {
      redirect: false,
      ...val,
    })
    setLoading(false)
    if (error) alert(error)
    push("/profile")
  }

  return (
    <Layout title="Sign In">
      <div className="text-white p-5">
        <h1 className="text-2xl">Log in</h1>
        <p className="text-white text-opacity-70 font-light my-3 text-sm">
          log in with one of this following option
        </p>
        <div className="grid gap-y-8">
          <div className="flex justify-between">
            {Provider.map((p) => {
              return p.id !== "credentials" ? (
                <ProviderItem key={p.id} provider={p} />
              ) : null
            })}
          </div>
          <Form
            onSubmit={handleSubmit}
            initialValues={{ username: "", password: "" }}
          >
            <FormControl
              type="text"
              label="Username"
              strict={true}
              placeholder="Account Username"
            />
            <FormControl
              type="password"
              label="Password"
              placeholder="Secure Password"
            />
            <FormSubmit>Log in</FormSubmit>
          </Form>
        </div>
        <p className="text-center text-white text-opacity-70 my-5">
          Dont have Account?{" "}
          <Link href="/auth/signup">
            <a className="text-opacity-100 text-white underline">Sign Up</a>
          </Link>
        </p>
        {loading && "loading"}
      </div>
    </Layout>
  )
}

const ProviderItem: React.FC<{ provider: Prov }> = ({ provider }) => {
  return (
    <div
      className="px-11 py-1.5 transition-all ease-in-out duration-300 rounded-xl border-[1px] border-gold bg-black-light active:bg-gold-lightest"
      // onClick={() => signIn(provider.id)}
    >
      <provider.Icon className="h-6 fill-current" />
    </div>
  )
}

export default SignIn
