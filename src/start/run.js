const { port, mongoUri } = require("../../config");
const { connect } = require("mongoose");

const runner = (app) => {
  const bootsrap = async () => {
    try {
      await connect(mongoUri).then(() => console.log("connected to database"));

      app.listen(port, () => {
        console.log(`This server is running on port ${port}`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  bootsrap();
};

module.exports = runner;
