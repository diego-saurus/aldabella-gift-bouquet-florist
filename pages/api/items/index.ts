// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { Filter, FindOptions, Sort } from "mongodb"

import { useItemsCollection } from "hooks/useItemsCollection"
import { generateSlug } from "utils/generateSlug"
import { Collections } from "types/declaration"
import { handleError } from "utils/handleError"
import { checkSession } from "utils/checkSession"
import { handleBodyProp } from "utils/handleBodyProp"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const pageLimit = 5
  const { method, body, query } = req
  const { search, sort, page, limit } = query

  try {
    await checkSession(req)

    const Items = await useItemsCollection()

    const checkSlug = async (generator: () => string): Promise<string> => {
      const slug = generator()
      const item = await Items.findOne({ slug })
      if (!item) {
        return slug
      }
      return checkSlug(generator)
    }

    switch (method) {
      case "GET":
        const regex: Filter<Collections.Item> = {
          name: {
            $regex: `${search}`,
            $options: "i",
          },
        }

        const findOpt: FindOptions<Collections.Item> = {
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
        handleBodyProp(["name", "price"], req)

        const { name, price }: Collections.Item = body
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
