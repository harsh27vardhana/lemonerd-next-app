import dbConnect from '../../database/dbconnect'

dbConnect();

export default (req, res) => {
  res.status(200).json({ name: 'John Doe' })
}
