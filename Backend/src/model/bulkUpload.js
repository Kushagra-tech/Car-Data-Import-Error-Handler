const mongoose = require("mongoose");
const bulkUpload = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  noOfItems: { type: Number, required: true },
  fileName: { type: String, required: true },
  successfulInserted: { type: Number, required: true },
  failedDuringInsert: { type: Number, required: true },
});

const BulkUpload = mongoose.model("BulkUpload", bulkUpload);
module.exports = BulkUpload;
