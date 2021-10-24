import React, { useEffect, useRef } from "react"
import { BuiltInProviderType } from "next-auth/providers"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import { getSession, LiteralUnion, signIn } from "next-auth/react"

import Layout from "components/Layout"
import ArrowSvg from "svg/east_black_24dp.svg"
import FacebookIcon from "svg/facebook_icon.svg"
import GoogleIcon from "svg/google_icon.svg"
import TwitterIcon from "svg/twitter_icon.svg"
import { useMediaQuery } from "hooks/useMediaQuery"

const Features = ["Like", "Favorite", "Add To Cart"]

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

const SignIn: NextPage = () => {
  const isMedia = useMediaQuery("md")
  return (
    <Layout title="Login">
      <div className="flex flex-col py-10 text-white md:py-12 md:px-24 items-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gold-light text-center">
          Login to Your Account
        </h1>
        <span className="mt-2 mb-10 md:my-5 text-white text-opacity-80 text-sm md:text-xl w-10/12 md:w-1/2 text-center font-medium">
          Nikmati fitur-fitur seperti{" "}
          {Features.map((m, i) => (
            <span key={i} className="text-gold-light text-opacity-90">
              {m},{" "}
            </span>
          ))}{" "}
          dan lainnya dengan hanya login ke website ini
        </span>
        <div className="grid grid-cols-9 md:gap-x-10 w-10/12 md:w-8/12 items-center justify-center">
          <div className="grid grid-flow-col col-span-full gap-x-2 items-center md:order-last md:gap-x-0 md:gap-y-5 md:grid-flow-row md:col-span-4">
            {Provider.map((prov) =>
              prov.id === "credentials" ? null : (
                <ProviderComponent
                  isMedia={isMedia}
                  provider={prov}
                  key={prov.id}
                />
              )
            )}
          </div>
          <span className="hidden md:inline text-3xl col-span-1 text-center self-center">
            /
          </span>
          <CredentialForm className="grid md:order-first gap-x-2 gap-y-3 md:gap-x-0 md:gap-y-6 col-span-full md:col-span-4" />
        </div>
        <a className="hover:underline cursor-pointer text-sm md:text-base my-5">
          Forgot Password?
        </a>
      </div>
    </Layout>
  )
}

const primaryClass =
  "bg-gradient-to-br from-black-light to-black text-sm md:text-base py-3 md:py-4 px-6 focus:outline-none rounded-md"
const CredentialForm: React.FC<{ className?: string }> = ({ className }) => {
  const { push } = useRouter()
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error, ok } = await signIn("credentials", {
      redirect: false,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    })
    if (error) return alert(error)
    push("/profile")
  }

  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  return (
    <form className={className ? className : ""} onSubmit={handleFormSubmit}>
      <input
        className={primaryClass}
        placeholder="Username"
        type="text"
        ref={usernameRef}
      />
      <input
        className={primaryClass}
        placeholder="8 or More Digit Secure Password"
        type="password"
        ref={passwordRef}
      />
      <button>
        <div className="font-bold text-sm md:text-base py-3 md:py-4 px-6 transition-all duration-500 ease-in-out focus:outline-none rounded-md cursor-pointer bg-gold-light hover:bg-gold-lightest text-black flex justify-between items-center">
          Login to Your Account <ArrowSvg className="inline" />
        </div>
      </button>
    </form>
  )
}

const ProviderComponent: React.FC<{
  provider: Prov
  isMedia: boolean
}> = ({ provider, isMedia }) => {
  const handleSignIn = async (
    prov: LiteralUnion<BuiltInProviderType, string>
  ) => {
    const { error, ok } = await signIn(prov, {
      redirect: false,
    })

    if (error) alert(error)
  }

  return (
    <div
      onClick={() => handleSignIn(provider.id)}
      className="flex text-sm md:text-base items-center justify-start cursor-pointer active:bg-gold-lightest font-normal tracking-wide py-2 md:py-4 transition-all duration-150 ease-in-out px-5 bg-black rounded-md border-gold hover:border-gold-lightest border-[1px]"
    >
      <provider.Icon className="inline fill-current text-white mx-5 h-7" />
      {isMedia && <span>Sign in With {provider.name}</span>}
    </div>
  )
}
// export const getServerSideProps: GetServerSideProps = async ({
//   req,
// }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<unknown>> => {
//   const csrfToken = await getCsrfToken({ req })
//   return {
//     props: { csrfToken },
//   }
// }

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  if (session)
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    }
  return {
    props: {},
  }
}

export default SignIn
