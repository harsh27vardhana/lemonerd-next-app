import dbConnect from "../../../database/dbconnect";
import Post from "../../../database/postSchema";

dbConnect();

export default async (req, res) => {

    const { method } = req;
    const { author_id } = req.query
    switch (method) {
        case "GET":
            try {
                const authortags = await Post.distinct("tags", { "author": author_id });
                res.send(authortags);
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


};
