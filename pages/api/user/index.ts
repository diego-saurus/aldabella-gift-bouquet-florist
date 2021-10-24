import { useUsersCollection } from "hooks/useCollection"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { handleError } from "utils/handleError"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    if (!session) throw { code: 401 }

    const users = await useUsersCollection()

    const user = await users
      .find({ username: session.user.name })
      .project({ password: 0, _id: 0 })
      .toArray()

    if (!user) throw { code: 500 }

    res.status(200).json(user[0])
  } catch (error) {
    handleError(res, error)
  }
}
