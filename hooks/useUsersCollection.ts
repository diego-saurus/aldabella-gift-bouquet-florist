import { connectToDatabase } from "lib/mongodb"
import { Collections } from "types/declaration"

export async function useUsersCollection() {
  const { db } = await connectToDatabase()
  const usersColletion = db.collection<Collections.User>("users")
  return usersColletion
}
