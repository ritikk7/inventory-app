const mongoose = require('mongoose').default;

async function connectToDB() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
}

module.exports = connectToDB;