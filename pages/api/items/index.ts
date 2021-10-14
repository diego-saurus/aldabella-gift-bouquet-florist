// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import Cors from "cors"

import useItemsCollection from "hooks/useItemsCollection"
import initMiddleware from "lib/initMiddlewares"
import { ItemsCollection } from "types/declaration"
import { ErrorDescription } from "mongodb"

const cors = initMiddleware(Cors({ methods: ["GET", "POST"] }))

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res)
  const { method, query, body } = req
  const itemsCollection = await useItemsCollection()

  async function checkSlug(slug: string) {
    const data = await itemsCollection.findOne({ slug })
    if (data?.slug) {
      slug += `-new`
      slug = await checkSlug(slug)
    }
    return slug
  }

  switch (method) {
    case "GET":
      const data = await itemsCollection.find().toArray()
      res.status(200).json(data)
      break

    case "POST":
      try {
        const { name, price }: ItemsCollection = body
        const slug = await checkSlug(
          name.toLocaleLowerCase().replace(/ /g, "-")
        )
        console.log(slug)
        const result = await itemsCollection.insertOne({
          name,
          price,
          slug,
        })
        res.status(201).json(result)
      } catch (error) {
        res.status(500).json({ message: error.message, error })
      }

      break
  }
}
