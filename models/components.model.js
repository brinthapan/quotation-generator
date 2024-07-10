
const mongoose = require("mongoose");

const ComponentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    projectId:[{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Project'
    },],

    templateId:[{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Template'
    },],
   
    module:[{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Module'
    },]
  },
  {
    timestamps: true,
  }
);


const Component = mongoose.model("Component", ComponentSchema);

module.exports = Component;



