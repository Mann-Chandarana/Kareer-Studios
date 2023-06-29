const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '../static/files'),
  filename: (req, file, cb) => {
    const filename = Date.now() + '-' + file.originalname;
    const url = `http://localhost:8000/static/files/${filename}`;
    req.body.fileurl = url;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
