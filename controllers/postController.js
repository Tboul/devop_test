const Post = require("../models/postModel")



exports.getAllPosts = async (req, res, next) => {

  try {
    const posts = await Post.find()

    res.status(200).json({
      status: "succes",
      results: posts.length,
      data: {
        posts,
      }
    })

  } catch (e) {
    res.status(400).json({
      status: "fail",
    })
  }
};
//localhost:3333/posts/id
exports.getOnePost = async (req, res, next) => {

  try {
    const post = await Post.findById(req.params.id)

    res.status(200).json({
      status: "succes",
      data: {
        post,
      }
    })

  } catch (e) {
    res.status(400).json({
      status: "fail",
    })
  }
}

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body)
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    })

  } catch (e) {
    res.status(400).json({
      status: "fail"
    },
      await Post.save())
  }
}
exports.updatePost = async (req, res, next) => {

  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    },

    )
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    })
  } catch (e) {
    res.status(400).json({
      status: "fail",
    });
  }
};
exports.deletePost = async (req, res, next) => {

  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status: "success",

    })
  } catch (e) {
    res.status(400).json({
      status: "fail",
    })
  }
}