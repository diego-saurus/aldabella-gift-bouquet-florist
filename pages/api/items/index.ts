// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { Filter, FindOptions, Sort } from "mongodb"

import { useItemsCollection } from "hooks/useItemsCollection"
import { generateSlug } from "lib/generateSlug"
import { ItemsCollection } from "types/declaration"
import { handleError } from "lib/handleError"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const pageLimit = 5

  const { method, body, query } = req
  const { search, sort, page, limit } = query

  const Items = await useItemsCollection()

  async function checkSlug(generator: () => string): Promise<string> {
    const slug = generator()
    const item = await Items.findOne({ slug })
    if (!item) {
      return slug
    }
    return checkSlug(generator)
  }

  try {
    switch (method) {
      case "GET":
        const regex: Filter<ItemsCollection> = {
          name: {
            $regex: `${search}`,
            $options: "i",
          },
        }

        const findOpt: FindOptions<ItemsCollection> = {
          skip: Number(page) ? pageLimit * Number(page) - pageLimit : 0,
          limit: Number(limit) || pageLimit,
        }

        const sortOpt: Sort = { _id: sort === "asc" ? "asc" : "desc" }

        const items = await Items.find(search ? regex : null, findOpt)
          .sort(sortOpt)
          .toArray()

        res.status(200).json(items)
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
