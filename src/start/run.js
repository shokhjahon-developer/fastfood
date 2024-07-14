const { port} = require("../../config");
const { connect } = require("mongoose");

const runner = (app) => {
  const bootsrap = async () => {
    try {
      await connect("mongodb+srv://shokhjahonshomirzayev759:idng48lCxCuwYGSo@cluster0.jikwpyp.mongodb.net/fastfood").then(() => console.log("connected to database"));

      app.listen(port, '0.0.0.0' , () => {
        console.log(`This server is running on port ${port}`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  bootsrap();
};

module.exports = runner;
