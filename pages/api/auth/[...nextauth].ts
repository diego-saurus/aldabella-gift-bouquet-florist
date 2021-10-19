import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
import { useUsersCollection } from "hooks/useUsersCollection"
import { compare } from "bcryptjs"

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

    CredentialProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credential, req) => {
        const users = await useUsersCollection()
        const result = await users.findOne({ username: credential.username })
        if (!result) throw new Error("No User Found")

        const checkPassword = await compare(
          credential.password,
          result.password
        )

        if (!checkPassword) throw new Error("Password didnt match")
        return { username: result.username }
      },
    }),
  ],
})
