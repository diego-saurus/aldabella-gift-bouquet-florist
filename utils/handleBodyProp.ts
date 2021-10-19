export function handleBodyProp(arr: string[], body: { [key: string]: any }) {
  const check = arr.filter((a) => !body[a]) //cek jika properti dalam body == required
  return check
}
