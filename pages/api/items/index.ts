// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import Cors from "cors"

import useItemsCollection from "hooks/useItemsCollection"
import { runMiddleware } from "lib/initMiddlewares"
import { generateSlug } from "lib/generateSlug"
import { ItemsCollection } from "types/declaration"
import { handleError } from "lib/handleError"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // await runMiddleware(
  //   req,
  //   res,
  //   Cors({
  //     methods: ["GET", "POST"],
  //   })
  // )

  const { method, body } = req
  const Items = await useItemsCollection()

  async function checkSlug(generator: () => string): Promise<string> {
    const slug = generator()
    if (Boolean(await Items.findOne({ slug }))) {
      return checkSlug(generator)
    }
    return slug
  }

  try {
    switch (method) {
      case "GET":
        const data = await Items.find().toArray()
        res.status(200).json(data)
        break

      case "POST":
        const { name, price }: ItemsCollection = body
        const slug = await checkSlug(generateSlug)
        const result = await Items.insertOne({
          name,
          price,
          slug,
        })
        res.status(201).json(result)
        break

      default:
        throw { code: 405 }
    }
  } catch (error) {
    handleError(res, error)
  }
}
