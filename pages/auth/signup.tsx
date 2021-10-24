import { NextPage } from "next"
import { getCsrfToken } from "next-auth/react"
import { useRef } from "react"

const SignUp: NextPage = () => {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const res = fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        csrfToken: await getCsrfToken(),
      }),
    })
    console.log(await (await res).json())
  }
  return (
    <form onSubmit={handleFormSubmit}>
      <input ref={usernameRef} placeholder="username" />
      <input ref={passwordRef} type="password" placeholder="password" />
      <button>Sign Up</button>
    </form>
  )
}

export default SignUp
