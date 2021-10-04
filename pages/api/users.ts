import type { NextApiRequest, NextApiResponse } from "next"

export default function usersAPI(req: NextApiRequest, res: NextApiResponse) {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
      res.send(data)
    })
}
