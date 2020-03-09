const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectToDb = async () => {
    await mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
    console.log('connected to MongoDb');
};

module.exports = connectToDb;

