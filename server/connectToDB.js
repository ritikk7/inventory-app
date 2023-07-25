const mongoose = require('mongoose').default;

async function connectToDB() {
  try {
    await mongoose.connect("mongodb+srv://ritikk075:DMMETtmFhulqPlJr@cluster0.42scj5p.mongodb.net/?retryWrites=true&w=majority");
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
}

module.exports = connectToDB;