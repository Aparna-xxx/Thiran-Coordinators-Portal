const mongoose = require('mongoose')

const winner = new mongoose.Schema({
    regId:{
        type:String,
        required: true
    },
    name:[{
        type:String,
        required: true
    }],
    dept:{
        type:String,
        required: true
    },
    eventName:{
        type:String,
        required: true
    },
    place:{
        type:String,
        required: true
    }
})

const Winners = mongoose.model('winners', winner)

module.exports = {Winners};