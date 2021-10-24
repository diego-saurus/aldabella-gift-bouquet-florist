import { useState, useEffect } from "react"

export const useMediaQuery = (query: "sm" | "md" | "lg" | "xl") => {
  const [match, setMatch] = useState<boolean>()

  useEffect(() => {
    const size = () => {
      switch (query) {
        case "sm":
          return 640
        case "md":
          return 768
        case "lg":
          return 1024
        case "xl":
          return 1280
      }
    }

    const mediaQuery = window.matchMedia(`(min-width: ${size()}px)`)
    const handler = () => setMatch(mediaQuery.matches)
    handler()
    mediaQuery.addEventListener("change", handler)

    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  return match
}
