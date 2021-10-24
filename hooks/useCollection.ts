import { connectToDatabase } from "lib/mongodb"

export const useItemsCollection = async () => {
  const { db } = await connectToDatabase()
  const itemsCollection = db.collection<Collections.Item>("items")
  return itemsCollection
}

export const useUsersCollection = async () => {
  const { db } = await connectToDatabase()
  const usersColletion = db.collection<Collections.User>("users")
  return usersColletion
}
