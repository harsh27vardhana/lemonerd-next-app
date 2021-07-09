import dbConnect from '../../../../database/dbconnect';
import Post from '../../../../database/postSchema';

dbConnect();

export default async function handler(req, res) {
    const { author_id } = req.query
    try {
        const post = await Post.find({ author: author_id, hidden: "false" }).sort({ date: -1 });
        res.send(post);

    } catch (err) {
        // console.log(err);
        res.status(404);
        res.send(err);
    }
}