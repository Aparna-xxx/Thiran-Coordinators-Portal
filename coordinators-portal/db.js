const mongoose = require('mongoose')

const db =  async() => {
    try {
        await mongoose.connect("mongodb+srv://aparnaramanthan14:1yKihI5MQ1N0qpAw@cluster0.0tmaiqa.mongodb.net/Thiran?retryWrites=true&w=majority&appName=Cluster0")
        console.log("db connected");

    } catch (error) {
        console.error(error);
    }
}

module.exports = {db}