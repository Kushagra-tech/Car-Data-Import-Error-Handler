const mongoose = require("mongoose");
const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected...");
  } catch (error) {
    console.log("Can't Connected...", error);
  }
};
module.exports=connection;
