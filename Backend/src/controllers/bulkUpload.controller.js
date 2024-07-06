// const fs = require("fs");
// const csv = require("fast-csv");
// const CarDetails = require("../model/carDetails");
// const validateRow = require("../helpers/validateRow");
// const BulkUpload = require("../model/bulkUpload");
// const BulkError = require("../model/bulkUploadError");

// const uploadData = async (req, res) => {
//   let failedDuringInserted = 0,
//     successfulInserted = 0,
//     rowNumber = 0;
//   const allRecords = [];
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

//   try {
//     fs.createReadStream(req.file.path)
//       .pipe(csv.parse({ headers: true }))
//       .on("error", (err) => {
//         console.error("Error reading CSV file:", err);
//         res.status(500).json({ message: "Error reading CSV file." });
//       })
//       .on("data", async (row) => {
//         rowNumber++;
//         const { isValid, errors } = validateRow(row, rowNumber);
//         if (isValid) {
//           allRecords.push(row);
//           successfulInserted++;
//         } else {
//           errorObj.errorsLog.push(...errors);
//           failedDuringInserted++;
//         }
//       })
//       .on("end", async (rowCount) => {
//         bulkUpload.successfulInserted = successfulInserted;
//         bulkUpload.failedDuringInsert = failedDuringInserted;
//         bulkUpload.noOfItems = successfulInserted + failedDuringInserted;

//         try {
//           const carsData = await uploadCarsDetail(allRecords);
//           bulkUpload.endTime = Date.now();
//           console.log(carsData);
//           const fileData = await uploadFileDetails(bulkUpload);
//           let errorData = null;
//           if (errorObj.errorsLog.length > 0) {
//             errorData = await uploadErrorDetails(errorObj);
//           }
//           console.log("Data", carsData, fileData, errorData);
//           res.json({ ...carsData, ...fileData, ...errorData });
//         } catch (error) {
//           console.error("Database insertion error:", error.message);
//           res.status(500).json({ message: "Database insertion error." });
//         } finally {
//           console.log("inserted");
//           fs.unlink(req.file.path, (err) => {
//             console.log("finally");
//             if (err) {
//               console.log("finallyerror---=-=----------=-=-=-=-=-=-=");

//               console.error("Error deleting the file:", err);
//             } else {
//               console.log("File deleted successfully");
//             }
//           });
//         }
//       });
//   } catch (error) {
//     console.error("Error:", error.message);
//     res.status(400).json({ message: error.message });
//   }
// };

// const uploadCarsDetail = async (allRecords) => {
//   try {
//     if (allRecords.length > 0) {
//       await CarDetails.insertMany(allRecords);
//       return {
//         message: "File processing completed",
//       };
//     } else {
//       throw new Error("No records to insert");
//     }
//   } catch (error) {
//     console.log("Error in uploadCarsDetail:", error.message);
//     throw error; // Propagate the error upwards
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

//  ===================================================================================================================

const fs = require("fs");
const csv = require("fast-csv");
const CarDetails = require("../model/carDetails"); // Adjust path as per your project structure
const validateRow = require("../helpers/validateRow"); // Adjust path as per your project structure
const BulkUpload = require("../model/bulkUpload"); // Adjust path as per your project structure
const BulkError = require("../model/bulkUploadError"); // Adjust path as per your project structure

const uploadData = async (req, res) => {
  let failedDuringInserted = 0,
    rowNumber = 0;
  const errorObj = {
    fileName: req.file.originalname,
    errorsLog: [],
  };
  const bulkUpload = {
    startTime: Date.now(),
    endTime: 0,
    noOfItems: 0,
    fileName: req.file.originalname,
    successfulInserted: 0,
    failedDuringInsert: 0,
  };

  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const readStream = fs.createReadStream(req.file.path);
  const csvStream = readStream.pipe(csv.parse({ headers: true }));
  const cars = [];
  csvStream
    .on("error", (err) => {
      console.error("Error reading CSV file:", err);
      res.status(500).json({ message: "Error reading CSV file." });
    })
    .on("data", async (row) => {
      rowNumber++;
      const { isValid, errors } = validateRow(row, rowNumber);
      if (isValid) {
        cars.push({
          Make: row.Make,
          Model: row.Model,
          Year: row.Year,
          Color: row.Color,
          Price: row.Price,
          Mileage: row.Mileage,
          Transmission: row.Transmission,
          FuelType: row.FuelType,
        });
      } else {
        errorObj.errorsLog.push(...errors);
        failedDuringInserted++;
      }
    })
    .on("end", async (rowCount) => {
      try {
        const carsDetails = await CarDetails.insertMany(cars);
        cars.length = 0;
        console.log(carsDetails.length);
        bulkUpload.successfulInserted = rowCount - failedDuringInserted;
        bulkUpload.failedDuringInsert = failedDuringInserted;
        bulkUpload.noOfItems = rowCount;
        const fileData = await uploadFileDetails(bulkUpload);
        let errorData = null;
        if (errorObj.errorsLog.length > 0) {
          errorData = await uploadErrorDetails(errorObj);
        }
        res.json({
          message: "Data processed successfully",
          fileData,
          errorData,
        });
      } catch (error) {
        console.error("Database insertion error:", error.message);
        res.status(500).json({ message: "Database insertion error." });
      } finally {
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error("Error deleting the file:", err);
          } else {
            console.log("File deleted successfully");
          }
        });
      }
    });
};

const uploadFileDetails = async (bulkUpload) => {
  const result = new BulkUpload(bulkUpload);
  await result.save();
  return result;
};

const uploadErrorDetails = async (errorObj) => {
  const result = new BulkError(errorObj);
  await result.save();
  return result;
};

module.exports = uploadData;
