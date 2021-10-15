import { ObjectID } from "bson"
import { Collection } from "mongodb"
import { NextApiResponse } from "next"

declare module "*.svg" {
  import React from "react"
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
  export default SVG
}

declare interface ItemsCollection {
  _id: ObjectID
  name: string
  price: number
  slug?: string
}
