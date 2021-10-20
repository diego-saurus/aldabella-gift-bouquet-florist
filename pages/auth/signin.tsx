import React, { useRef } from "react"
import { BuiltInProviderType } from "next-auth/providers"
import { GetStaticProps, NextPage } from "next"
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react"

import Layout from "components/Layout"
import ArrowSvg from "svg/east_black_24dp.svg"

interface Props {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >
}

const feature = ["Like", "Favorite", "Add To Cart"]

const SignIn: NextPage<Props> = ({ providers }) => {
  return (
    <Layout title="Login">
      <div className="flex flex-col text-white md:py-12 md:px-24 items-center justify-center">
        <h1 className="text-5xl font-bold text-gold-light">
          Login to Your Account
        </h1>
        <span className="my-5 text-white text-opacity-80 text-xl w-1/2 text-center font-medium">
          Nikmati fitur-fitur seperti{" "}
          {feature.map((m, i) => (
            <span key={i} className="text-gold-light text-opacity-90">
              {m},{" "}
            </span>
          ))}{" "}
          dan lainnya dengan hanya login ke website ini
        </span>
        <div className="grid grid-cols-9 gap-x-10 py-10 w-8/12">
          <CredentialForm />
          <span className="text-3xl col-span-1 text-center self-center">/</span>
          <div className="grid gap-y-5 col-span-4">
            {Object.values(providers).map((prov) =>
              prov.type === "credentials" ? null : (
                <ProviderComponent key={prov.id} provider={prov} />
              )
            )}
          </div>
        </div>
        <a className="hover:underline cursor-pointer">Forgot Password?</a>
      </div>
    </Layout>
  )
}

const CredentialForm: React.FC = () => {
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error, ok } = await signIn("credentials", {
      callbackUrl: "http://localhost:3000/profile",
      username: "diego-saurus134",
      password: "R3dh0tchill1",
      // username: usernameRef.current.value,
      // password: passwordRef.current.value,
    })
    if (error) return alert(error)
  }

  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  return (
    <form className="grid gap-y-5 col-span-4" onSubmit={handleFormSubmit}>
      <input
        className="bg-gradient-to-br from-black-light to-black py-4 px-6 focus:outline-none rounded-md"
        placeholder="username"
        type="text"
        ref={usernameRef}
      />
      <input
        className="bg-gradient-to-br from-black-light to-black py-4 px-6 focus:outline-none rounded-md"
        placeholder="8 or More Digit Secure Password"
        type="password"
        ref={passwordRef}
      />
      <button>
        <div className="font-bold py-4 px-5 transition-all duration-500 ease-in-out focus:outline-none rounded-md cursor-pointer bg-gold-light hover:bg-gold-lightest text-black flex justify-between">
          Login to Your Account <ArrowSvg className="inline" />
        </div>
      </button>
    </form>
  )
}

const ProviderComponent: React.FC<{ provider: ClientSafeProvider }> = ({
  provider,
}) => {
  return (
    <div className="cursor-pointer font-normal tracking-wide py-4 transition-all duration-500 ease-in-out pr-40 pl-5 bg-black rounded-md border-gold-lightest border-[1px]">
      <span>Sign in With {provider.name}</span>
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

export const getServerSideProps: GetStaticProps = async () => {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}

export default SignIn
