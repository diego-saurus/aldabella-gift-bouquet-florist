import useItemsCollection from "hooks/useItemsCollection"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req
  const { id } = query
  const itemsCollection = await useItemsCollection()

  const result = await itemsCollection.findOne({ slug: id })
  if (!result) {
    res.status(404).json({ message: "Items Not Found" })
  }

  switch (method) {
    case "GET":
      res.status(200).json(result)
      break

    case "DELETE":
      break
  }
}
