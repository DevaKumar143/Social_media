const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const postService = require("./post.service");

exports.createPost = asyncHandler(async (req, res) => {
    const {caption, mediaUrls, mediaType} = req.body;

    const post = await postService.createPost({
        author: req.user.id,
        caption,
        mediaUrls,
        mediaType,
    });

    res.status(201).json(new ApiResponse(201, post, "Post created"));
});


exports.getPost = asyncHandler(async (req, res) =>{
    const post = await postService.getPostById(req.params.id);
    res.status(200).json(new ApiResponse(200, post));
});

exports.getMyPosts = asyncHandler(async (req, res) =>{
    const posts = await postService.getUserPosts(req.user.id);
    res.status(200).json(new ApiResponse(200, posts));
});

exports.deletePost = asyncHandler(async(req, res) =>{
    await postService.deletePost(req.params.id, req.user.id);
    res.status(200).json(new ApiResponse(200, null, "Post deleted"));
});