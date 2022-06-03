const { ValidationError } = require("sequelize");
const db = require("../models");

const User = db.users;

const createUser = async (req, res) => {
  let data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    contact: req.body.contact,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const user = await User.create(data);
    res.status(201).send(user);
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).json({ error: e.errors[0].message });
    }
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
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
