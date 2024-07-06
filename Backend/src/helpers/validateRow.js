const validateRow = (row, rowNumber) => {
  const errors = [];
  let isValid = true;

  const rowKeys = Object.keys(row);

  if (rowKeys.length !== 8) {
    errors.push({
      row: rowNumber,
      key: "Keys",
      error: `Row should contain exactly 8 keys, found ${rowKeys.length}`,
    });
    isValid = false;
  }

  rowKeys.forEach((key) => {
    if (row[key] === "" || row[key] === null || row[key] === undefined) {
      errors.push({
        row: rowNumber,
        key: key,
        error: `Value for key "${key}" should not be empty`,
      });
      isValid = false;
    }
  });

  if (isValid && parseInt(row.Price) > 55000) {
    errors.push({
      row: rowNumber,
      key: "Price",
      error: "Price should be less than 45000",
    });
    isValid = false;
  }

  if (isValid && row.Make === "Ford") {
    errors.push({
      row: rowNumber,
      key: "Make",
      error: "Make should not be Ford",
    });
    isValid = false;
  }

  return { isValid, errors };
};
module.exports = validateRow;

// const fs = require("fs");
// const csv = require("fast-csv");
// const CarDetails = require("../model/carDetails"); // Adjust path as per your project structure
// const validateRow = require("../helpers/validateRow"); // Adjust path as per your project structure
// const BulkUpload = require("../model/bulkUpload"); // Adjust path as per your project structure
// const BulkError = require("../model/bulkUploadError"); // Adjust path as per your project structure

// const uploadData = async (req, res) => {
//   const batchSize = 10000; // Batch size for inserting rows
//   let failedDuringInserted = 0,
//     successfulInserted = 0,
//     rowNumber = 0;
//   const errorObj = {
//     fileName: req.file.originalname,
//     errorsLog: [],
//   };
//   const bulkUpload = {
//     startTime: Date.now(),
//     endTime: 0,
//     noOfItems: 0,
//     fileName: req.file.originalname,
//     successfulInserted: 0,
//     failedDuringInsert: 0,
//   };

//   if (!req.file) {
//     return res.status(400).send("No file uploaded.");
//   }

//   const readStream = fs.createReadStream(req.file.path);
//   const csvStream = readStream.pipe(csv.parse({ headers: true }));

//   let buffer = []; // Buffer to accumulate rows before inserting in batch

//   csvStream
//     .on("error", (err) => {
//       console.error("Error reading CSV file:", err);
//       res.status(500).json({ message: "Error reading CSV file." });
//     })
//     .on("data", async (row) => {
//       rowNumber++;
//       const { isValid, errors } = validateRow(row, rowNumber);
//       if (isValid) {
//         buffer.push(row); // Add row to buffer

//         // Check if buffer reaches batch size, then insert into DB
//         if (buffer.length >= batchSize) {
//           await insertBatch(buffer);
//           successfulInserted += buffer.length;
//           buffer = []; // Clear buffer after insertion
//         }
//       } else {
//         errorObj.errorsLog.push(...errors);
//         failedDuringInserted++;
//       }
//     })
//     .on("end", async () => {
//       // Insert any remaining rows in buffer
//       if (buffer.length > 0) {
//         await insertBatch(buffer);
//         successfulInserted += buffer.length;
//       }

//       console.log(successfulInserted, rowNumber);
//       bulkUpload.successfulInserted = successfulInserted;
//       bulkUpload.failedDuringInsert = failedDuringInserted;
//       bulkUpload.noOfItems = rowNumber;

//       try {
//         const fileData = await uploadFileDetails(bulkUpload);
//         let errorData = null;
//         if (errorObj.errorsLog.length > 0) {
//           errorData = await uploadErrorDetails(errorObj);
//         }
//         res.json({
//           message: "Data processed successfully",
//           fileData,
//           errorData,
//         });
//       } catch (error) {
//         console.error("Database insertion error:", error.message);
//         res.status(500).json({ message: "Database insertion error." });
//       } finally {
//         // Clean up: delete the uploaded file
//         fs.unlink(req.file.path, (err) => {
//           if (err) {
//             console.error("Error deleting the file:", err);
//           } else {
//             console.log("File deleted successfully");
//           }
//         });
//       }
//     });

//   // Function to insert a batch of rows into the database
//   async function insertBatch(rows) {
//     try {
//       const result = await CarDetails.insertMany(rows);
//       console.log("Inserted-",result.length);
//     } catch (err) {
//       console.error("Error inserting batch:", err);
//       errorObj.errorsLog.push("Error inserting batch:", err.message);
//       failedDuringInserted += rows.length;
//     }
//   }
// };

// const uploadFileDetails = async (bulkUpload) => {
//   const result = new BulkUpload(bulkUpload);
//   await result.save();
//   return result;
// };

// const uploadErrorDetails = async (errorObj) => {
//   const result = new BulkError(errorObj);
//   await result.save();
//   return result;
// };

// module.exports = uploadData;