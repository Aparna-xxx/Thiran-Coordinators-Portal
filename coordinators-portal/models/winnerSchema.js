const mongoose = require('mongoose')

const winners = new mongoose.Schema({
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

const winner = mongoose.model('winners', winners)

module.exports = winner;