const mongoose = require('mongoose')

const db =  async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Thiran")
        console.log("db connected");

    } catch (error) {
        console.error(error);
    }
}

module.exports = {db}