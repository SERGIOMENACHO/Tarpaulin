const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Tarpaulin API Documentation",
    description: "Description",
  },
  host: "tarpaulin.onrender.com",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./server.js");
});
