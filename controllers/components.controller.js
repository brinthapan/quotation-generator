// Import necessary models
const Component = require("../models/components.model.js");
const Project = require("../models/project.model.js");
const Template = require("../models/template.model.js");

// Controller function to get all components
const getComponents = async (req, res) => {
  try {
    const components = await Component.find({}).populate('module');
    res.status(200).json(components);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get a specific component by ID
const getComponent = async (req, res) => {
  try {
    const { id } = req.params;
    const component = await Component.findById(id).populate('module');
    res.status(200).json(component);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create component - /api/component
const createComponent = async (req, res) => {
  try {
    const component = await Component.create(req.body);
    // creating component inside a project
    if (req.body.projectId) {
      const project = await Project.findById(req.body.projectId);
      if (project) {
        project.components.push(component._id);
        await project.save();
        await component.save();
        } else {
        return res.status(404).json({ error: 'Project not found' });
      
      }
    }

    // creating component inside a template
    if (req.body.templateId) {
      const template = await Template.findById(req.body.templateId);
      if (template) {
        template.components.push(component._id);
        await template.save();
        await component.save();
        } else {
        return res.status(404).json({ error: 'template not found' });
      
      }
    }
     res.status(200).json(component);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// update an existing component
const updateComponent = async (req, res) => {
  try {
    const { id } = req.params;

    const component = await Component.findByIdAndUpdate(id, req.body);

    if (!component) {
      return res.status(404).json({ message: "component not found" });
    }

    const updatedComponent = await Component.findById(id);
    res.status(200).json(updatedComponent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// delete a component 
const deleteComponent = async (req, res) => {
  try {
    const { id } = req.params;

    const component = await Component.findByIdAndDelete(id);

    if (!component) {
      return res.status(404).json({ message: "component not found" });
    }

     // Remove component from project if projectId is provided
     if (req.body.projectId) {
      const project = await Project.findById(req.body.projectId);
      if (project) {
        project.components.pull(component._id);
        await project.save();
      }
    }

    res.status(200).json({ message: "Component deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Export all controller functions
module.exports = {
  getComponents,
  getComponent,
  createComponent,
  updateComponent,
  deleteComponent,
};