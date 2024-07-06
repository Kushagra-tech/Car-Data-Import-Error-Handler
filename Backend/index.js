require("dotenv").config();
const server = require("./server");
const connection = require("./src/config/db");
connection()
  .then(() =>
    server().listen(process.env.PORT, () =>
      console.log("Server Connected Successfully")
    )
  )
  .catch(() => console.log("Can't connected...", error));
