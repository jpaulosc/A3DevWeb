import multer from "multer";
import {resolve} from "path";
const folderTemp = resolve(__dirname, "..", "..", "tmp");

export default {
    storage: multer.diskStorage({
        destination: folderTemp,
        filename: (request, file, cb) => {
            const filename = file.originalname;
            return cb(null, filename);
        }
    })
};
