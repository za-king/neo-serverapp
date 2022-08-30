
const multer = require("multer");
const path = require("path");
//multer SetUp

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "buktievent");
  },
  filename: (req, file, cb) => {
    cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}` );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload =multer({storage : fileStorage , fileFilter :fileFilter,limits: '5000000'}).single('image')


module.exports = upload