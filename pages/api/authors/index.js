import dbConnect from "../../../database/dbconnect";
import Author from "../../../database/authorSchema";

await dbConnect();

export default async (req, res) => {

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const author = await Author.find();
        res.send({ success: true, data: author });
      } catch (err) {
        console.log(err);
        res.status(404);
      }
      break;
    case "POST":
      try {
        const author = await Author.create(req.body);
        res.send({ success: true, data: author });
      } catch (err) {
        console.log(err);
        res.status(404);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }


};




