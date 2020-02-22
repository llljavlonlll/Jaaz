const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    created: {
        type: Date,
        default: new Date()
    },
    activationHash: String,
    emailVerHash: String,
    category: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!["customer", "instructor", "admin"].includes(value)) {
                throw new Error("Invalid category");
            }
        }
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        maxlength: 50,
        minlength: 5,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

// Generating authorization token
userSchema.methods.generateAuthToken = async function(action) {
    const token = jwt.sign(
        {
            _id: this._id.toString(),
            user: {
                name: this.name,
                email: this.email,
                category: this.category,
                balance: this.balance
            }
        },
        process.env.JWT_SECRET
    );

    if (action === "signup") {
        // Hash to send via link to verify user email
        const activationHash = jwt.sign(
            { _id: this._id.toString() },
            process.env.JWT_SECRET
        );

        this.activationHash = activationHash;
    }

    this.tokens = this.tokens.concat({ token });
    await this.save();

    return token;
};

// Find user by email and password
userSchema.statics.findByCredentials = async function(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Incorrect email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Incorrect email or password");
    }

    return user;
};

// Encrypt the password
userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    if (this.isModified("email")) {
        this.isVerified = false;
    }

    if (this.category === "customer") {
        this.balance = 300000;
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
