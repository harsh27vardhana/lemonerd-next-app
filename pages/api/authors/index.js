const file = "./data/authors.json";
import Data from "../../../data/authors.json";
const fs = require("fs");
import { v4 as uuidv4 } from "uuid";

export default async (req, res) => {

  const { method } = req;

  switch (method) {
    case "POST":
      try {
        // console.log(req.body);
        const authorid = Date.now() + uuidv4();
        const data = {
          id: authorid,
          description: req.body.description,
          image: req.body.image,
          name: req.body.name,
          tags: []
        };
        Data.authors.push(data);
        fs.writeFile(file, JSON.stringify(Data, null, 2), (e) => {
          // console.log(e);
        });
        res.send({ success: true });
      } catch (err) {
        res.send(err);
        console.log(err);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
    }

  
};




