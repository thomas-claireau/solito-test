import withProtect from "../../middlewares/withProtect"

function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

export default withProtect(handler)