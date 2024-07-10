
const mongoose = require("mongoose");

const ModuleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
        type: String,
        required: true,
      },

      cost_type: {
        type: String,
        required: true,
        default:0,
      },


    cost: {
        type: Number,
        required: true,
        default:0,
      },

    manhours: {
      type: Number,
      required: true,
    },

    employee_level: {
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

    componentId:[{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Component'
    }],
  },
  {
    timestamps: true,
  }
);


const Module = mongoose.model("Module",ModuleSchema);

module.exports =Module;



