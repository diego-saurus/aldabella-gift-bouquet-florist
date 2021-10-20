import NextAuth, { Awaitable } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
import TwitterProvider from "next-auth/providers/twitter"
import { useUsersCollection } from "hooks/useUsersCollection"
import { compare } from "bcryptjs"
import { Collections } from "types/declaration"
import { JWT } from "next-auth/jwt"

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    TwitterProvider({
      clientId: "",
      clientSecret: "",
    }),
    CredentialProvider({
      name: "Credential",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ username, password }) {
        const users = await useUsersCollection()
        const result = await users.findOne({ username })
        if (!result) throw new Error("No User Found")

        const checkPassword = await compare(password, result.password)

        if (!checkPassword) throw new Error("Password didnt match")
        return {
          name: result.username,
        }
      },
    }),
  ],
  session: {
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.name = user.name
      }

      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.user = { ...token }
      }
      return session
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
})
