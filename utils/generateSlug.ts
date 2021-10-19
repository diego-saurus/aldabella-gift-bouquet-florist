function generateSlug(): string {
  let slug = ""
  const length = 16
  const alfa = "abcdefghijklmnopqrstuvwxyz"
  const numeric = "1234567890"
  const symbol = "-_"
  const rules = [alfa, numeric, symbol, alfa.toUpperCase()]

  for (let i = 0; i < Math.floor(length / rules.length); i++) {
    for (const rule of rules) {
      const randNum = Math.round(Math.random() * (rule.length - 1))
      slug += rule[randNum]
    }
  }

  return slug
}

export { generateSlug }
