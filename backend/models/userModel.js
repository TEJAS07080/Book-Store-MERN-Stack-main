import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
   
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
});

// Middleware to hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to generate access token
userSchema.methods.accessTokenGenerator = function () {
    return jwt.sign({ id: this._id }, "process.env.REFRESH_TOKEN_SECRET", { expiresIn: "15m" });
};

// Method to generate refresh token
userSchema.methods.refreshTokenGenerator = function () {
    return jwt.sign({ id: this._id }, "process.env.REFRESH_TOKEN_SECRET", { expiresIn: "7d" });
};

// Method to validate password
userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export { User };
