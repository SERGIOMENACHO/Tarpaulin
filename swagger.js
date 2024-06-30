const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Tarpaulin API Documentation",
    description: "Description",
  },
  host: "",
  schemes: ["https"],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js')
})
