const User = require("../models/userModel")
const bcrypt = require("bcryptjs")

exports.signUp = async (req, res) => {
  const { username, password } = req.body

  try {
    const hashpassword = await bcrypt.hash(password, 12)
    const newUser = await User.create({
      username,
      password: hashpassword
    })
    req.session.user = newUser
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    })

  } catch (e) {
    res.status(400).json({
      status: "fail"
    },
    )

  }
}

exports.login = async (req, res) => {

  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "username not found"
      })
    }
    const isUser = await bcrypt.compare(password, user.password)
    req.session.user = user
    if (isUser) {
      res.status(200).json({
        status: "success",
      })
    } else {
      res.status(400).json({
        status: "fail",
        message: "wrong username or password"
      })
    }

  } catch (e) {
    res.status(400).json({
      status: "fail"
    },
    )

  }
}



exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json({
      status: "success",
      data: {
        users
      },
    })

  } catch (e) {
    res.status(400).json({
      status: "fail"
    },
    )

  }
}

