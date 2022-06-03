const db = require("../models");

const Workspace= db.workspaces;

const creatWorkspace = async (req, res) => {
  let data = {
    
    id: req.body.id,
    code: req.body.code,
    label: req.body.label,
    description: req.body.description,
    
  };

  const project = await Workspace.create(data);
  res.status(201).send(project);
};

const getWorkspaces = async (req, res) => {
  let projects = await Workspace.findAll({});
  res.status(200).send(projects);
};

const getWorkspace = async (req, res) => {
  let id = req.params.id;
  let project = await Workspace.findOne({ where: { id: id } });
  res.status(200).send(project);
};

const updateWorkspace = async (req, res) => {
  let id = req.params.id;
  const project = await Workspace.update(req.body, { where: { id: id } });
  res.status(200).send(project);
};

const deleteWorkspace = async (req, res) => {
  let id = req.params.id;
  await Workspace.destroy({ where: { id: id } });
  res.status(200).send("Workspace is deleted!");
};

module.exports = {
  creatWorkspace,
  getWorkspaces,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace,
};
