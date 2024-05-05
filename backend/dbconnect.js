const mongoose = require('mongoose');

const connectURI = "mongodb://localhost:27017/TextSyncer";

async function connectToMongoDB() {
  try {
    await mongoose.connect(connectURI);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = connectToMongoDB;
