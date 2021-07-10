import dbConnect from "../../../../database/dbconnect";
import Post from "../../../..//database/postSchema";

dbConnect();

export default async function handler(req, res) {
    const { post_id } = req.query;

    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const post = await Post.find({ '_id':{ $ne: post_id},hidden: "false" }).sort({ date: -1 }).limit(10)
                res.send(post)
            } catch (err) {
                res.status(404);
                res.send(err);
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
