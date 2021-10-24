import { useEffect, useState } from "react"

export default function useScreenSize(): number[] {
  const [size, setSize] = useState([0, 0])
  useEffect(() => {
    const windowListener = (): void => {
      setSize([window.innerWidth, window.innerHeight])
    }
    windowListener()
    window.addEventListener("resize", windowListener)
    return () => {
      window.removeEventListener("resize", windowListener)
    }
  }, [])
  return size
}
