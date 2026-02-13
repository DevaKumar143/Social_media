const mongoose = require("mongoose");
const  User  = require("../users/user.model");

const postSchema = new mongoose.Schema(
    {
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        caption:{
            type: String,
            trim: true,
            maxLength: 2200,
        },
        mediaUrls: {
            type: [String],
            required: true,
             validate: [(v) => v.length > 0, "At least one media is required"],
        },
        mediaType: {
            type:String,
            enum: ["image", "video", "carousel"],
            required: true
        },

        isArchived: {
            type: Boolean,
            default: false,
        },
        isPrivate: {
            type: Boolean,
            default: false,
        },

    },
    {timestamps: true}
)

module.exports = mongoose.model("Post", postSchema);