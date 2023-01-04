require("dotenv").config();

const mongoose = require("mongoose");

const DB = async () => {
  try {
    await mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`DB connection SUCCESSFULL`);
  } catch (err) {
    console.dir(`DB connection FAILED ${err}`);
  }

  const connection = mongoose.connection;
};

module.exports = DB;
