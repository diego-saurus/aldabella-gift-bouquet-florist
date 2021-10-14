import useItemsCollection from "hooks/useItemsCollection"
import { handleError } from "lib/handleError"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req
  const { slug } = query
  const Items = await useItemsCollection()

  try {
    const result = await Items.findOne({ slug })
    if (!result) throw { code: 404 }

    switch (method) {
      case "GET":
        res.status(200).json(result)
        break

      case "DELETE":
        await Items.findOneAndDelete({ slug })
        res.status(204).json({ acknoweledge: true })
        break

      default:
        throw { code: 405 }
    }
  } catch (error) {
    handleError(res, error)
  }
}
