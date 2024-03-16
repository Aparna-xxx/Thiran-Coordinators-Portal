const mongoose = require('mongoose')

const db =  async() => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Thiran")
        console.log("db connected");

    } catch (error) {
        console.error(error);
    }
}

module.exports = {db}