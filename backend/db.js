const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/iNotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToMongo = async () => {
try {
    await mongoose.connect(mongoURI);
    console.log('Database connected!');
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectToMongo;