const { ValidationError } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = require("../models");

const User = db.users;
const saltRounds = 10;

const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, contact, password } = req.body;
    let user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ message: "Email already in use." });

    const hashedPwd = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      contact,
      password: hashedPwd,
    });

    res.status(201).send(newUser);
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).json({ error: e.errors[0].message });
    }
    console.log(e);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Email not found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password." });

    const access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // update user data
    await User.update({ access_token, access_token }, { where: { email } });

    res.cookie("jwt", access_token, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });

    res.status(200).json({
      access_token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        contact: user.contact,
      },
    });
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).json({ error: e.errors[0].message });
    }
    console.log(e);
  }
};

const getUsers = async (req, res) => {
  let projects = await User.findAll({});
  res.status(200).send(projects);
};

const getUser = async (req, res) => {
  let id = req.params.id;
  let user = await User.findOne({ where: { id: id } });
  res.status(200).send(user);
};

const updateUser = async (req, res) => {
  let id = req.params.id;
  const user = await User.update(req.body, { where: { id: id } });
  res.status(200).send(user);
  console.log(user);
};

const deleteUser = async (req, res) => {
  let id = req.params.id;
  await User.destroy({ where: { id: id } });
  res.status(200).json({ message: "User successfully deleted!" });
};

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
