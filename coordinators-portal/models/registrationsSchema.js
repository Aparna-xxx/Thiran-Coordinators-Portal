const mongoose = require('mongoose')

const registrationsSchema = new mongoose.Schema({
    "attended": {type: Boolean, required: true}, 
    "event_name": {type: String, required: true}, 
    "participants": [{type: String}] 
  })

const registrations = mongoose.model('registrations', registrationsSchema)

module.exports = {registrations}