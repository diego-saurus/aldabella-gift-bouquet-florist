import { NextApiRequest, NextApiResponse } from "next"
import { Session } from "next-auth"
import { getSession } from "next-auth/react"

export const checkSession = async (
  req: NextApiRequest
  // res: NextApiResponse
) => {
  const session = await getSession({ req })
  switch (req.method) {
    case "GET":
      break
    default:
      if (!session) throw { code: 401 }
      break
  }
}
