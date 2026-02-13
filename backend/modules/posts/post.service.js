const Post = require("./post.model")
const ApiError = require("../../utils/ApiError"); 

const createPost = async(data) =>{
    return await Post.create(data);
}

const getPostById = async(postId) =>{
    const post = await Post.findById(postId).populate("author", "Username avatar");
    if(!post) throw new ApiError(404, "Post not found");
    return post;
}

const getUserPosts = async(userId) =>{
    return await Post.find({author: userId, isArchived: false})
    .sort({createdAt: -1});
};

const deletePost = async(postId, userId) =>{
    const post = await Post.findOneAndDelete({_id: postId, author: userId});
    if(!post) throw new ApiError(403, "Unauthorized or post not found");
    return post;
}

module.exports = {
    createPost,
    getPostById,
    getUserPosts,
    deletePost,
}