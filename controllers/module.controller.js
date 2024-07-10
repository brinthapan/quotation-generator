// Import necessary models
const Module = require("../models/module.model.js");
const Component = require("../models/components.model.js");
//get all modules
const getModules = async (req, res) => {
  try {
    const module = await Module.find({});
    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get a specific module by ID
const getModule = async (req, res) => {
  try {
    const { id } = req.params;
    const module = await Module.findById(id);
    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//create a new module
const createModule = async (req, res) => {
  try {
    const module = await Module.create(req.body);
    const component = await Component.findById(req.body.componentId);
      if (component) {
        component.module.push(module._id);
        await component.save();
        await module.save();
        } else {
        return res.status(404).json({ error: 'Project not found' });
      
      }
     res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//update an existing module
const updateModule = async (req, res) => {
  try {
    const { id } = req.params;

    const module = await Module.findByIdAndUpdate(id, req.body);

    if (!module) {
      return res.status(404).json({ message: "module not found" });
    }

    const updatedmodule = await Module.findById(id);
    res.status(200).json(updatedmodule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//delete a module 
const deleteModule = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the module by its ID
    const modules = await Module.findByIdAndDelete(id);

    if (!modules) {
      return res.status(404).json({ message: "module not found" });
    }

   
    const components = await Component.find({ module: module._id });

    if (components.length > 0) {
      
      await Promise.all(
        components.map(async (Component) => {
          Component.module.pull(module._id);
          await Component.save();
        })
      );
    }

    res.status(200).json({ message: "module deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getModules,
  getModule,
  createModule,
  updateModule,
  deleteModule,
};