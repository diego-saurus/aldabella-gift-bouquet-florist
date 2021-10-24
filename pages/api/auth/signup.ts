import { useUsersCollection } from "hooks/useCollection"
import { NextApiRequest, NextApiResponse } from "next"
import { handleError } from "utils/handleError"
import { hash } from "bcryptjs"
import { handleBodyProp } from "utils/handleBodyProp"
import { getCsrfToken } from "next-auth/react"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req
  const salt = 8
  const required = ["username", "password", "csrfToken"]

  try {
    const require = handleBodyProp(required, body)
    if (require[0]) throw { code: 406, require }

    const users = await useUsersCollection()

    switch (method) {
      case "POST":
        const csrf = await getCsrfToken({ req })
        const {
          username,
          password,
          csrfToken,
        }: Collections.User & { csrfToken: string } = body

        if (csrf !== csrfToken)
          throw { code: 406, message: "csrfToken Invalid" }

        const existingUsername = await users.findOne({ username })
        if (existingUsername) throw { code: 409 }

        const hashedPassword = await hash(password, salt)
        await users.insertOne({
          username,
          password: hashedPassword,
          role: "standard",
        })

        res.status(201).json({ user: { username } })

        break

      default:
        throw { code: 403 }
    }
  } catch (error) {
    handleError(res, error)
  }
}
