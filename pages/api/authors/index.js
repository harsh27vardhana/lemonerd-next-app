const file = "./data/authors.json"
import Data from "../../../data/authors.json";
const fs=require('fs')
import { v4 as uuidv4 } from 'uuid';


export default async (req, res) => {
   
    try {
        console.log(req.body);
        const authorid = Date.now() + uuidv4();
        const data={
            id:authorid,
            description: req.body.description,
            image:req.body.image,
            name:req.body.name

        }
        Data.authors.push(data);
        fs.writeFile(file, JSON.stringify(Data,null,2),(e)=>{
            // console.log(e);
        });
        res.send({ 'sucess': 'true' });
    }
    catch(err) {
        res.send(err);
        console.log(err);
    }

};
