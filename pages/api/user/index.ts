import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { handleError } from "utils/handleError"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    if (!session) throw { code: 401 }
    res.status(200).json(session)
  } catch (error) {
    handleError(res, error)
  }
}
