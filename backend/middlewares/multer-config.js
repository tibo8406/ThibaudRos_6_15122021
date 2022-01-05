const { getDefaultSettings } = require('http2');
const multer = require('multer');
const path = require('path');


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
        let date = new Date();
        console.log(date);
        ///callback(null, filename + '_' + Date.now() + '.' + extension)
        callback(null, date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '_' + date.getHours() + date.getMinutes() + date.getSeconds() + '_' + filename + '.' + extension)

    }
});

module.exports = multer({ storage }).single('image');