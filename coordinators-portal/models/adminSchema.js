const mongoose = require('mongoose')

const adminSchema  = new mongoose.Schema({
    name:{type: String, required: true},
    pwd:{type: String, required: true},
    event:{type: String, required: true}
})

const admin = mongoose.model('coordinators', adminSchema)

module.exports = {admin}