const db = require("../models");

const Team = db.teams;

const createTeam = async (req, res) => {
  let data = {
    name: req.body.name,
    id: req.body.id,
  };

 

  const project = await team.create(data);
  res.status(201).send(project);
};

const getTeams = async (req, res) => {
  let projects = await Team.findAll({});
  res.status(200).send(projects);
};

const getTeam = async (req, res) => {
  let id = req.params.id;
  let project = await Team.findOne({ where: { id: id } });
  res.status(200).send(project);
};

const updateTeam = async (req, res) => {
  let id = req.params.id;
  const project = await Team.update(req.body, { where: { id: id } });
  res.status(200).send(project);
};

const deleteTeam = async (req, res) => {
  let id = req.params.id;
  await Team.destroy({ where: { id: id } });
  res.status(200).send("Team is deleted!");
};

module.exports = {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
};
