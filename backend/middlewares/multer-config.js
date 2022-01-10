const multer = require('multer');
const path = require('path');
const moment = require('moment');


const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const originalNameWithoutSpaces = file.originalname.split(' ').join('_');
        const filename = path.parse(originalNameWithoutSpaces).name;
        const extension = MIME_TYPES[file.mimetype];
        const date = moment();
        ///callback(null, filename + '_' + Date.now() + '.' + extension)
        callback(null, date.format(`YYYY-MM-DD_HH-mm-ss_[${filename}.${extension}]`))
    }
});

module.exports = multer({ storage }).single('image');