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

                var maxlimit=10;
                const size=tags.length
                var ans=[];
                var neid=[];
                neid.push(post_id);
                while(maxlimit>0 && tags.length>0 && ans.length<10)
                {
                    var temp =await Post.find({ '_id': { $nin: [neid] }, tags: { $all: tags }, hidden: "false" }).limit(maxlimit);
                   
                    while (temp.length) {
                        let temppost=temp.pop();
                        ans.push(temppost);
                        neid.push(temppost._id)
                    }
                    maxlimit=10-ans.length
                    tags.pop()
                }
                
                if(ans.length<10)
                {
                    var post = await Post.aggregate([
                        { $match: { _id: { $nin: [neid] } } },
                        { $sample: { size: maxlimit } }
                    ])
                    // ans.push(...post);
                    while (post.length) {
                        let temppost = post.pop();
                        ans.push(temppost);
                        neid.push(temppost._id)
                    }
                    
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
