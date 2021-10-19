import { NextApiRequest, NextApiResponse } from "next"
import { getCsrfToken } from "next-auth/react"
import { handleBodyProp } from "utils/handleBodyProp"
import { handleError } from "utils/handleError"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req
  const { csrfToken } = body
  try {
    if (method !== "POST") throw { code: 405 }
    const required = handleBodyProp(["csrfToken"], body)
    if (required[0]) throw { code: 406, required } //jika isi didalam required ada, maka kembalikan error
    const csrf = await getCsrfToken({ req })
    if (csrf !== csrfToken) {
      throw { code: 406 }
    }
    res.status(200).json("authenticated")
  } catch (error) {
    handleError(res, error)
  }
}
