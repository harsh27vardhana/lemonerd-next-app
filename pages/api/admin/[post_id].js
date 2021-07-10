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
                res.status(404);
                res.send(err);
            }
            break;

        case "PATCH":
            try {
                const post = await Post.findByIdAndUpdate(post_id, req.body, {
                    new: true,
                });
                res.send({ success: true, data: post });
            } catch (err) {
                res.status(404);
                res.send({ success: false });
            }
            break;
        case "DELETE":

            try {
                const post = await Post.findByIdAndRemove(post_id);
                res.send("POST DELETED");
            } catch (err) {
                console.log(err);
                res.send(err);
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
