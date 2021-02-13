// Importations //
const db = require('../models')
const { Likes } = db.sequelize.models

// Module qui permet de liké un post //
exports.likeOnePost = async (req, res, next) => {
  try {
    const existingLike = await Likes.findOne({
      where: { userId: req.user.id, postId: req.params.postId }
    })

    if (existingLike) {
      await existingLike.destroy()
      res.status(200).json({ like: false })
    } else {
      await Likes.create({ userId: req.user.id, postId: req.params.postId })
      res.status(201).json({ like: true })
    }
  } catch (error) {
    res.status(400).json({ error })
  }
}

// Module qui permet récupérer un like //
exports.getLikeOnOnePost = async (req, res, next) => {
  try {
    const existingLike = await Likes.findOne({
      where: { userId: req.user.id, postId: req.params.postId }
    })
    res.status(200).json({ like: existingLike ? true : false })
  } catch (error) {
    res.status(400).json({ error })
  }
}

// Module qui permet de récupérer tout les likes d'un post //
exports.getAllLikesOfOnePost = async (req, res, next) => {
  try {
    const allLikes = await Likes.findAll({
      where: { postId: req.params.postId },
      include: db.User
    })
    res.status(200).json({ allLikes })
  } catch (error) {
    res.status(400).json({ error })
  }
}