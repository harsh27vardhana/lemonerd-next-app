import dbConnect from "../../../database/dbconnect";
import Quicksplained from "../../../database/quicksplainedSchema";

dbConnect();


export default async (req, res) => {
  try {
    const quicksplained = await Quicksplained.create(req.body);
    res.send({ success: true, data: quicksplained });
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};
