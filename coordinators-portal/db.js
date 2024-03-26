const mongoose = require('mongoose')
require('dotenv').config();

const mongourl = process.env.MONGOURL;

const db =  async() => {
    try {
        await mongoose.connect(mongourl)
        console.log("db connected");

    } catch (error) {
        console.error(error);
    }
}
//mongodb+srv://aparnaramanthan14:1yKihI5MQ1N0qpAw@cluster0.0tmaiqa.mongodb.net/Thiran?retryWrites=true&w=majority&appName=Cluster0
module.exports = {db}

