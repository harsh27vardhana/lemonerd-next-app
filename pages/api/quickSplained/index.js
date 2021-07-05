const file = "./data/quicksplained.json";
import Data from "../../../data/quicksplained.json";
const fs = require("fs");

export default async (req, res) => {
  try {
    Data.feed.push(req.body);
    fs.writeFile(file, JSON.stringify(Data, null, 2), (e) => {});
    res.send({ success: true });
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};
