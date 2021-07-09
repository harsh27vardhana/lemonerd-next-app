import dbConnect from "../../../../database/dbconnect";
import Post from "../../../../database/postSchema";

dbConnect();

export default async function handler(req, res) {
    const { post_id } = req.query;

    const { method } = req;

    const Tags= await Post.findById(post_id);
    var tags=Tags.tags;
    // console.log(tags)
    switch (method) {
        case "GET":
            try {

                var maxlimit=5;
                const size=tags.length
                var ans=[];

                while(maxlimit>0 && tags.length>0 && ans.length<5)
                {
                    var temp =await Post.find({ '_id': { $ne: post_id }, tags: { $all: tags }, hidden: "false" }).limit(maxlimit);
                   
                    while (temp.length) {
                        ans.push(temp.pop());
                    }
                    maxlimit=5-ans.length
                    tags.pop()
                }
                
                if(ans.length<5)
                {
                    const post = await Post.aggregate([
                        { $match: { _id: {$ne: post_id} } },
                        { $sample: { size: maxlimit } }
                    ])
                    ans.push(...post);
                }
                res.send(ans)
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
