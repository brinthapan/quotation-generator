const mongoose = require("mongoose");

const QuotationSchema = mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    components: [
      {
        componentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Component',
          required: true,
        },
        totalCost: {
          type: Number,
          required: true,
        },
        modules: [
          {
            moduleId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Module',
              required: true,
            },
            cost: {
              type: Number,
              required: true,
            },
            manhours: {
              type: Number,
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
          },
        ],
      },
    ],
    totalCost: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Quotation = mongoose.model("Quotation", QuotationSchema);

module.exports = Quotation;
