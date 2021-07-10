import dbConnect from "../../../../database/dbconnect";
import Post from "../../../../database/postSchema";

dbConnect();

export default async function handler(req, res) {
    const { post_id } = req.query;

    const { method } = req;

    
    // console.log(tags)
    switch (method) {
        case "GET":
            try {
                const Tags = await Post.findById(post_id);
                var tag = Tags.tags;
                const post = await Post.find({ '_id': { $ne: post_id }, hidden: "false", tags: tag[0]}).limit(10)
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
