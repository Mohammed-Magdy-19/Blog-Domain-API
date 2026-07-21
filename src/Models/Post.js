import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        text: { type: String, required: true, message: "Text is required" },
        imagesUrls: { type: [String], default: [] },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true },
);

const Post = mongoose.model("Post", postSchema);
export default Post;