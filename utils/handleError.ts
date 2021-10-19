import { NextApiResponse } from "next"

type errorCode = 121 | 401 | 403 | 404 | 405 | 406 | 409 | 11000

interface Error {
  code: errorCode
  message?: string
  [key: string]: any
}

export function handleError(res: NextApiResponse, error: Error) {
  let status: number
  let message: string
  if (!error.code) return

  switch (error.code) {
    case 401:
      status = 401
      message = "Forbidden, need authentication"
      break

    case 403:
      status = 403
      message = "Forbidden"
      break

    case 404:
      status = 404
      message = "Not found"
      break

    case 405:
      status = 405
      message = "Method Not Allowed"
      break

    case 121:
    case 406:
      status = 406
      message = "Document Validation Error"
      break

    case 409:
      status = 409
      message = "Already Exist"

    case 11000:
      status = 500
      break
  }

  res.status(status).json({
    message: error.message || message,
    ...error,
  })
}
