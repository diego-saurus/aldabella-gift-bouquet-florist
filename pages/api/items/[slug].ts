import { NextApiRequest, NextApiResponse } from "next"
import { useItemsCollection } from "hooks/useItemsCollection"
import { handleError } from "lib/handleError"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req
  const { slug } = query
  const Items = await useItemsCollection()

  try {
    const item = await Items.findOne({ slug })
    if (!item) throw { code: 404 }

    switch (method) {
      case "GET":
        res.status(200).json(item)
        break

      case "DELETE":
        await Items.findOneAndDelete({ slug })
        res.status(200).json({ acknoweledge: true })
        break

      case "PUT":
        const rules = ["name", "price"]
        let allowed = {}
        for (const key in body) {
          for (const rule of rules) {
            if (rule == key) {
              if (!allowed[key]) allowed[key] = body[key]
            }
          }
        }
        await Items.findOneAndUpdate({ slug }, { $set: allowed })
        res.status(200).json({ acknoweledge: true, updated: allowed })
        break

      default:
        throw { code: 405 }
    }
  } catch (error) {
    handleError(res, error)
  }
}
