import { Collection } from "mongodb"
import { NextApiResponse } from "next"

declare module "*.svg" {
  import React from "react"
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
  export default SVG
}

declare interface ItemsCollection {
  name: string
  price: number
  slug: string
}
