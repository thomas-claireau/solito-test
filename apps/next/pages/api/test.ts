import { NextApiRequest, NextApiResponse } from "next"
import withProtect from "../../middlewares/withProtect"

function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: 'John Doe' })
}

export default handler