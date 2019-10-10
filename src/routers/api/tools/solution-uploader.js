const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const imageRoute = path.join(
            __dirname,
            "..",
            "..",
            "..",
            "..",
            "solutions"
        );

        cb(null, imageRoute);
    },

    // uuid + file's original extension
    filename: function(req, file, cb) {
        cb(
            null,
            "solution-" +
                req.body.questionName +
                file.originalname
                    .substr(file.originalname.length - 4)
                    .toLocaleLowerCase()
        );
    }
});

// Accept only JPG or PNG
const fileFilter = (req, file, cb) => {
    if (!file.mimetype === "image/jpeg" || !file.mimetype === "image/png") {
        return cb(new Error("Please upload a .jpg or .png image"));
    }

    cb(undefined, true);
};

const upload = multer({
    fileFilter,
    storage,
    limits: {
        fileSize: 5000000 // 5MB
    }
});

module.exports = upload;
