const db = require("../models");

const Project = db.projects;

const createTeam = async (req, res) => {
  let data = {
    name: req.body.name,
    id: req.body.id,
  };

  const project = await Project.create(data);
  res.status(201).send(project);
};

const getTeams= async (req, res) => {
  let projects = await Project.findAll({});
  res.status(200).send(projects);
};

const getTeam = async (req, res) => {
  let id = req.params.id;
  let project = await Project.findOne({ where: { id: id } });
  res.status(200).send(project);
};

const updateTeam = async (req, res) => {
  let id = req.params.id;
  const project = await Project.update(req.body, { where: { id: id } });
  res.status(200).send(project);
};

const deleteTeam = async (req, res) => {
  let id = req.params.id;
  await Project.destroy({ where: { id: id } });
  res.status(200).send("Project is deleted!");
};

module.exports = {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
};