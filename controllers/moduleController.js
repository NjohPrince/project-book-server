const db = require("../models");

const Module = db.modules;

const createModule = async (req, res) => {
  let data = {
    id: req.body.id,
    name: req.body.name,
    product_id: req.body.product_id,
    description: req.body.description,
  };

  const project = await Module.create(data);
  res.status(201).send(project);
};

const getModules = async (req, res) => {
  let projects = await Module.findAll({});
  res.status(200).send(projects);
};

const getModule = async (req, res) => {
  let id = req.params.id;
  let project = await Module.findOne({ where: { id: id } });
  res.status(200).send(project);
};

const updateModule = async (req, res) => {
  let id = req.params.id;
  const project = await Module.update(req.body, { where: { id: id } });
  res.status(200).send(project);
};

const deleteModule = async (req, res) => {
  let id = req.params.id;
  await Module.destroy({ where: { id: id } });
  res.status(200).send("module is deleted!");
};

module.exports = {
  createModule,
  getModules,
  getModule,
  updateModule,
  deleteModule,
};
