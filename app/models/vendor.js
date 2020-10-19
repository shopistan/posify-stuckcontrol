const mongoose = require('mongoose');
const ExportModel = require('../utils/mongoose-model-export');

const schema = new mongoose.Schema(
  {
    vendor_Name: { type: String, required: true },
    vendor_phone: { type: String, required: true },
    vendor_email: { type: String, required: true },
    address: {
      vendor_addressLine1:{ type: String },
      vendor_addressLine2: { type: String },
      vendor_city:{ type: String },
      vendor_country:{ type: String },
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = ExportModel(mongoose, 'vendor', schema);
