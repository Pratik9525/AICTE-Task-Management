require("dotenv").config();
const { connect } = require("mongoose");

async function connectWithDB(app) {
  try {
    connect(process.env.MONGO_CONNECTION_STRING).then(() =>
      app.listen(3000, () => {
        console.log("Running on port 3000");
      })
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectWithDB;
