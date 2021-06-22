const file = "./data/authors.json"
import Data from "../../../data/authors.json";
const fs=require('fs')
export default async (req, res) => {
    Data.authors.push(req.body);
    try {
        // console.log(req.body);
        fs.writeFile(file, JSON.stringify(Data,null,2),(e)=>{
            console.log(e);
        });
        res.send({ 'sucess': 'true' });
    }
    catch(err) {
        res.send(err);
        console.log(err);
    }

};
