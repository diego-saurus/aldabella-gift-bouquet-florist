import { connectToDatabase } from "lib/mongodb"
import { Collections } from "types/declaration"

export const useItemsCollection = async () => {
  const { db } = await connectToDatabase()
  const itemsCollection = db.collection<Collections.Item>("items")
  return itemsCollection
}
