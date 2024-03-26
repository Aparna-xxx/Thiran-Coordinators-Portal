const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    _id: Number, // We'll use this as the registration ID
    event_name: { type: String, required: true },
    participants: { type: [String], required: true },
    attended: { type: Boolean, default: false }
  });

const Registrations = mongoose.model('Registration', registrationSchema);

module.exports = {Registrations};