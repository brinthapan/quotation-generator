const Project = require("../models/project.model.js");
const Component = require("../models/components.model.js");
const Module = require("../models/module.model.js");
//generate quotation for a project
const generateQuotation = async (req, res) => {
  try {
    const {projectId} = req.params;
    const project = await Project.findById(projectId)
      .populate({
        path: "components",
        populate: {
          path: "module",
        },
      })
      .exec();

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
// Initialize variables for total project cost and timeline
    let totalProjectCost = 0;
    let earliestStartDate = null;
    let latestEndDate = null;
 // Calculate costs for each component 
    const componentCosts = project.components.map((component) => {
      let totalComponentCost = 0;
      component.module.forEach((module) => {
        totalComponentCost += module.cost;

        // Update project cost
        totalProjectCost += module.cost;

        // Update timeline
        const startDate = new Date(module.start_date);
        const endDate = new Date(module.end_date);

        if (!earliestStartDate || startDate < earliestStartDate) {
          earliestStartDate = startDate;
        }

        if (!latestEndDate || endDate > latestEndDate) {
          latestEndDate = endDate;
        }
      });

      return {
        componentId: component._id,
        componentName: component.name,
        totalComponentCost,
      };
    });
 // Respond with quotation details
    res.json({
      projectId: project._id,
      projectName: project.name,
      totalProjectCost,
      componentCosts,
      timeline: {
        start: earliestStartDate,
        end: latestEndDate,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  generateQuotation,
};
