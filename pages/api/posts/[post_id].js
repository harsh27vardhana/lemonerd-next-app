import dbConnect from "../../../database/dbconnect";
import Post from "../../../database/postSchema";

dbConnect();

export default async function handler(req, res) {
  const { post_id } = req.query;

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const post = await Post.findById(post_id);
        res.send(post);
      } catch (err) {
        // console.log(err);
        res.status(404);
        res.send(err);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
