const express = require("express");
const cors = require("cors");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const userRouter = require("./src/routes/user");
const postRouter = require("./src/routes/post");
const app = express();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Full Stack Project",
      version: "1.0.0",
      description: "A simple Express API documentation",
    },
    servers: [
      {
        url: "http://localhost:5001",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};
const spacs = swaggerjsdoc(options);

const server = () => {
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
  app.use(express.urlencoded({ extended: false }));
  app.use("/api-docs", swaggerui.serve, swaggerui.setup(spacs));
  app.use("/api", postRouter);
  app.use("/api", userRouter);

  return app;
};
module.exports = server;
