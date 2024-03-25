const mongoose = require('mongoose')

const db =  async() => {
    try {
        await mongoose.connect("mongodb+srv://skavin1701:skavin1701@cluster0.thhqsol.mongodb.net/thiran")
        console.log("db connected");

    } catch (error) {
        console.error(error);
    }
}

module.exports = {db}