const mongoose = require('mongoose');
const ExportModel = require('../utils/mongoose-model-export');

const schema = new mongoose.Schema(
  {
    SKU:{type: String, required: true},
    quantity: { type: Number, required: true },
    price:{ type: Number, required: true },
    vendor_email: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = ExportModel(mongoose, 'Purchase', schema);
