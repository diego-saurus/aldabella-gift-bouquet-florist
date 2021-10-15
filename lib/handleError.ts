import { NextApiResponse } from "next"

interface Error {
  code: number
  message: string
}

export function handleError(res: NextApiResponse, error: Error) {
  let status: number
  if (!error.code) return

  switch (error.code) {
    case 121:
      status = 406
      error.message = "Document Validation Error"
      break

    case 405:
      status = 405
      error.message = "Method Not Allowed"
      break

    case 11000:
      status = 500
      break

    case 404:
      status = 404
      error.message = "Items not found"
  }
  res.status(status).json({
    message: error.message,
    error: {
      code: error.code,
    },
  })
}
