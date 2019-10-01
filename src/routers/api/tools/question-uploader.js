const multer = require("multer");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const uuid = require("uuid");

// Upload middleware configurations
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let imageRoute = path.join(
            __dirname,
            "..",
            "..",
            "..",
            "..",
            "images"
            // req.user.id
        );

        // Create folder for the user and upload picture into
        // if (!fs.existsSync(imageRoute)) {
        //     fs.mkdirSync(imageRoute, (err, stats) => {
        //         if (err) throw err;
        //         cb(null, imageRoute);
        //     });
        // }

        cb(null, imageRoute);
    },
    filename: function(req, file, cb) {
        cb(
            null,
            uuid() + file.originalname.substr(file.originalname.length - 4)
        );
    }
});

const fileFilter = (req, file, cb) => {
    if (!file.mimetype === "image/jpeg" || !file.mimetype === "image/png") {
        return cb(new Error("Please upload a .jpg image"));
    }

    cb(undefined, true);
};

const upload = multer({
    fileFilter,
    storage,
    limits: {
        fileSize: 5000000
    }
});

module.exports = upload;
