const multer = require("multer");
const path = require("path");
const uuid = require("uuid");

// Upload middleware configurations
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const imageRoute = path.join(
            __dirname,
            "..",
            "..",
            "..",
            "..",
            "questions",
            "raw"
        );

        cb(null, imageRoute);
    },

    // uuid + file's original extension
    filename: function(req, file, cb) {
        cb(
            null,
            uuid() +
                file.originalname
                    .substr(file.originalname.length - 4)
                    .toLocaleLowerCase()
        );
    }
});

// Accept only JPG or PNG
const fileFilter = (req, file, cb) => {
    if (
        file.originalname.endsWith(".jpg") ||
        file.originalname.endsWith(".png")
    ) {
        return cb(undefined, true);
    }

    cb(new Error("Please upload a .jpg or .png image"));
};

const upload = multer({
    storage,
    limits: {
        fileSize: 5000000 // 5MB
    },
    fileFilter
});

module.exports = upload;
