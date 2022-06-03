const db = require("../models");

const Project = db.projects;

const createProject = async (req, res) => {
  let data = {
    title: req.body.title,
    description: req.body.description,
  };

  try {
    const project = await Project.create(data);
    res.status(201).send(project);
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).json({ error: e.errors[0].message });
    }
  }
};

const getProjects = async (req, res) => {
  let projects = await Project.findAll({});
  res.status(200).send(projects);
};

const getProject = async (req, res) => {
  let id = req.params.id;
  let project = await Project.findOne({ where: { id: id } });
  res.status(200).send(project);
};

const updateProject = async (req, res) => {
  let id = req.params.id;
  const project = await Project.update(req.body, { where: { id: id } });
  res.status(200).send(project);
};

const deleteProject = async (req, res) => {
  let id = req.params.id;
  await Project.destroy({ where: { id: id } });
  res.status(200).send("Project is deleted!");
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};
