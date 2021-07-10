import dbConnect from "../../../database/dbconnect";
import Post from "../../../database/postSchema";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        
        const posts = await Post.find({ hidden: "false" }).sort({ date: -1 });
    

        res.status(200).json({ success: true, data: posts });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
