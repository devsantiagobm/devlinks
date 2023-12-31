import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  return res.status(200).json({ name: 'John Doe' })
}
