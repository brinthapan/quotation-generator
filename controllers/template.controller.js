const Template = require("../models/template.model.js");
//get all templates
const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find({}).populate('components');
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get a specific template
const getTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await Template.findById(id).populate('components');
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//create a new template
const createTemplate = async (req, res) => {
  try {
    const template = await Template.create(req.body);
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//update an existing template
const updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await Template.findByIdAndUpdate(id, req.body);

    if (!template) {
      return res.status(404).json({ message: "template not found" });
    }

    const updatedTemplate = await Template.findById(id);
    res.status(200).json(updatedTemplate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//delete a template
const deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await Template.findByIdAndDelete(id);

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.status(200).json({ message: "Template deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
};