const mongoose = require("mongoose");
const bulkErrorSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  errorsLog: [
    {
      row: { type: Number, required: true },
      key: { type: String, required: true },
      error: { type: String, required: true },
    },
  ],
});

const BulkError = mongoose.model("BulkError", bulkErrorSchema);
module.exports = BulkError;
