const { port } = require("../../config");
const { connect } = require("mongoose");

const runner = (app) => {
  const bootsrap = async () => {
    try {
      await connect("mongodb://localhost:27017/efastFood").then(() =>
        console.log("connected to database")
      );

      app.listen(port, () => {
        console.log(`server start on http://localhost:${port}`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  bootsrap();
};

module.exports = runner;
