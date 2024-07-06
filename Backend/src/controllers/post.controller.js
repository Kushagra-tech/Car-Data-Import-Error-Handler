const CarDetails = require("../model/carDetails");
const BulkUpload = require("../model/bulkUpload");
const BulkError = require("../model/bulkUploadError");
const allPosts = async (req, res) => {
  const pageNumber = req.query.pageNumber || 1;
  const pageSize = req.query.pageSize || 10;
  const fileName = req.query.file;
  const check = req.query.check;
  try {
    if (check === "bulk") {
      const posts = await BulkUpload.find({});
      if (!posts) {
        return res.status(400).json({ message: "No data found" });
      }
      return res.status(200).json({ posts });
    } else if (check === "cardetails") {
      const totalCount = await CarDetails.countDocuments({});
      const posts = await CarDetails.find({})
        .sort({ createdAt: -1 })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);

      if (posts.length === 0) {
        return res.json({ message: "No more posts available" });
      }
      return res.status(200).json({ posts, totalCount });
    } else if (check === "error") {
      const posts = await BulkError.find({ fileName });
      if (!posts) {
        return res.status(400).json({ message: "No data found" });
      }
      const limitedPosts = posts.map((post) => {
        const limitedErrorLogs = post.errorsLog.slice(
          (pageNumber - 1) * pageSize,
          pageNumber * pageSize
        );
        return {
          ...post,
          errorsLog: limitedErrorLogs,
        };
      });
      return res
        .status(200)
        .json({ posts: limitedPosts, count: posts[0].errorsLog.length });
      // .json({ posts: limitedPosts })
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const create = async (req, res) => {
  const cardetails = req.body;
  try {
    const carsData = new CarDetails(cardetails);
    await carsData.save();
    return res.status(201).json({ message: "UploadSuccessfully", carsData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteData = async (req, res) => {
  const _id = req.params._id;
  try {
    const isDeleted = await CarDetails.findByIdAndDelete(_id);
    return res.json({ isDeleted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const editData = async (req, res) => {
  const _id = req.params._id;
  const cardetails = req.body;

  try {
    const updatedCarDetails = await CarDetails.findByIdAndUpdate(
      _id,
      cardetails,
      {
        new: true,
      }
    );

    if (!updatedCarDetails) {
      return res.status(404).json({ message: "Car details not found" });
    }

    return res.json({ updatedCarDetails });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = { allPosts, create, deleteData, editData };
