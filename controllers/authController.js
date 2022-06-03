const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
// const cookie = require('cookie');

// mail service
const { sendMail } = require("../services/mail");

const saltRounds = 10;

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // verifying if a user exists with given email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        message: `Wrong email or password.`,
      });

    const cmp = await bcrypt.compare(password, user.password);
    if (!cmp) {
      return res.status(400).json({
        message: `Wrong email or password.`,
      });
    }

    // generating a new access token for the user
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_MINUTES,
    });

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_REFRESH,
      {
        expiresIn: process.env.REFERESH_TOKEN_EXPIRY_TIME,
      }
    );

    // update the token upon new login
    await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

    // res.cookie("jwt", refreshToken, {
    //   httpOnly: true,
    //   sameSite: "None",
    //   maxAge: 24 * 60 * 60 * 1000,
    //   secure: true,
    //   domain: "https://creativelytepro.herokuapp.com"
    // });

    res
      .status(200)
      .cookie("jwt_token", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        domain: "https://creativelytepro.herokuapp.com",
      })
      .json({
        user: {
          id: user._id,
          profile: user.profile,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          contact: user.contact,
          social_media: user.social_media,
          role: user.role,
        },
        accessToken,
        refreshToken,
      });
  } catch (err) {
    console.log(err?.message);
    res.status(500).send({
      message: err.message || "An error occured signing in.",
    });
  }
};

exports.register = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send({
      message: "Please upload an image.",
    });
  }

  if (!req.body) {
    return res.status(400).send({
      message: "Please provide your requested data.",
    });
  }

  const { first_name, last_name, email, contact, password, skill } = req.body;

  var obj = {
    profile: {
      data: fs.readFileSync(
        path.join(`${__dirname}/../uploads/` + req.file.filename)
      ),
      contentType: `image/${req.extension}`,
    },
  };

  const user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: "Email already in use." });

  const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);

  const newUser = new User({
    profile: obj.profile,
    first_name,
    last_name,
    skill,
    email,
    contact,
    password: hashedPwd,
  });

  await newUser.save();

  try {
    await sendMail({
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
    }).catch((err) => {
      console.log(err);
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });

    res
      .json({
        data: {
          id: newUser._id,
          profile: newUser.profile,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
          skill: newUser.skill,
          contact,
        },
      })
      .status(201);
  } catch (error) {
    console.log(error);
    return res
      .json({ message: "Unable to sign up, Please try again later." })
      .status(400);
  }
};

exports.handleLogout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); // no content
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken });

  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
  }

  User.findByIdAndUpdate(foundUser._id, {
    refreshToken: "",
    accessToken: "",
  });

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res
    .status(200)
    .json({ message: "Successfully logged out. Please come back soon💖" });
};
