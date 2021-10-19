import { ObjectID } from "bson"
import { NextApiResponse } from "next"

declare module "*.svg" {
  import React from "react"
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
  export default SVG
}

declare module Collections {
  export interface Item {
    _id: ObjectID
    name: string
    price: number
    slug?: string
  }

  export interface User {
    username: string
    password: string
  }
}
