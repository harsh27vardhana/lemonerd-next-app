import dbConnect from '../../../../database/dbconnect';
import Post from '../../../../database/postSchema';

dbConnect();

export default async function handler(req, res) {
    const { author_id } = req.query
    try {
        const post = await Post.find({ author: author_id });
        res.send(post);

    } catch (err) {
        // console.log(err);
        res.status(404);
        res.send(err);
    }
}