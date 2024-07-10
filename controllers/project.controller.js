const Project = require("../models/project.model.js");
const Component = require("../models/components.model.js");
// get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).populate('components');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get a specific project
const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id).populate('components');
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//create a new project
const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//update an existing project 
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndUpdate(id, req.body);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const updatedProject = await Project.findById(id);
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// delete a project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Export all controller functions
module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};