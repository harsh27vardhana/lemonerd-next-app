
import Data from "../../../data/quicksplained.json";
const fs = require("fs");


export default async (req, res) => {
    try {
        console.log(req.body);
       
        // Data.authors.push(data);
        // fs.writeFile(file, JSON.stringify(Data, null, 2), (e) => {
        //     // console.log(e);
        // });
        res.send({ success: true });
    } catch (err) {
        res.send(err);
        console.log(err);
    }
};
