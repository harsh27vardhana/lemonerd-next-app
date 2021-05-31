import { v4 as uuidv4 } from 'uuid';
const fs = require('fs');
export default async (req, res) => {
    const { method } = req;

    switch (method) {

        case 'POST':
            try {
                const file = req.body;
                const tmp = req.body.filename.split('.');
                const filename = tmp.slice(0, tmp.length - 1).join(".") + Date.now() + uuidv4() + '.' + tmp[tmp.length - 1]
                fs.writeFile('public/images/' + filename, file.data, 'base64', (error) => {
                    // console.log(error);
                });
                console.log(filename);
                res.send({ 'location': "/images/" + filename });
            } catch (error) {
                console.log(error);
                res.status(400).json({ success: false });
            }
            break;

        default:
            console.log(error);
            res.status(400).json({ success: false });
            break;
    }
}
