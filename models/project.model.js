
const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    team: {
        type: String,
        required: true,
      },

    description: {
      type: String,
      required: true,
    },

    colour: {
      type: String,
      required: true,
    },

    workOnWeekend: {
      type: String,
      required: true,
    },


    start_date: {
      type: Date,
      required: true,
      
    },

    end_date: {
      type: Date,
      required: true,
    },

    template:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Template'
    },

    components:[ { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Component' },]
  },
  {
    timestamps: true,
  }
);


const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
