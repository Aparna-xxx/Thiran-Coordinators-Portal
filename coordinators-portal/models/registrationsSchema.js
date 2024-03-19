const mongoose = require('mongoose')

const registrationsSchema = new mongoose.Schema({
    
    "event_name": {type: String, required: true}, 
    "participants": [{type: String}] ,
    "attended": {type: Boolean, required: true}, 
  })

const registrations = mongoose.model('registrations', registrationsSchema)

module.exports = {registrations}