const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const imageRoute = path.join(
            __dirname,
            "..",
            "..",
            "..",
            "..",
            "solutions",
            "raw"
        );

        cb(null, imageRoute);
    },

    // uuid + file's original extension
    filename: function (req, file, cb) {
        let extensionLength = 4;

        if (file.originalname.toLowerCase().endsWith(".jpeg")) {
            extensionLength = 5;
        }
        const newFileName =
            "solution-" +
            req.body.questionName.substr(
                0,
                req.body.questionName.length - extensionLength
            ) +
            file.originalname
                .substr(file.originalname.length - extensionLength)
                .toLocaleLowerCase();
        cb(null, newFileName);
    },
});

// Accept only JPG or PNG
const fileFilter = (req, file, cb) => {
    if (
        file.originalname.toLowerCase().endsWith(".jpg") ||
        file.originalname.toLowerCase().endsWith(".jpeg") ||
        file.originalname.toLowerCase().endsWith(".png")
    ) {
        return cb(undefined, true);
    }

    cb(new Error("Please upload a .jpg or .png image"));
};

const upload = multer({
    fileFilter,
    storage,
    limits: {
        fileSize: 10000000, // 10MB
    },
});

module.exports = upload;
