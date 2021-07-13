import dbConnect from "../../../database/dbconnect";
import Author from "../../../database/authorSchema";

 dbConnect();


export default async (req, res) => {
  console.log("FSJKHF")
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const posts = await Author.find();

        res.status(200).json({ success: true, data: posts });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const post = await Author.create(req.body);
        res.status(201).json({ success: true, data: post });
      } catch (error) {
        res.status(400).json({ success: false });
        console.log(res.status);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
