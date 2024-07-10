
const mongoose = require("mongoose");

const TemplateSchema = mongoose.Schema(
  {
    name: {
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


    components:[ { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Component' },]
    
  },
  
  {
    timestamps: true,
  }
);


const Template = mongoose.model("Template", TemplateSchema);

module.exports = Template;
