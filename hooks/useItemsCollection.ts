import { connectToDatabase } from "lib/mongodb"
import { ItemsCollection } from "types/declaration"

export const useItemsCollection = async () => {
  const { db } = await connectToDatabase()
  const itemsCollection = db.collection<ItemsCollection>("items")
  return itemsCollection
}
