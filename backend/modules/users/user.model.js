const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required:true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
     followers: [
        { type: Schema.Types.ObjectId, ref: "User" }  // users who follow this user
    ],
    following: [
        { type: Schema.Types.ObjectId, ref: "User" }  // users this user follows
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

userSchema.index({username:1});

const User = mongoose.model("User", userSchema);
module.exports = User;

