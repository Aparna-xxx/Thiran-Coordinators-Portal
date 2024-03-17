const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    regId:{
        type: String,
        required: true
    },
    eMail: [{
        type: String,
        required: true
    }],
    name: [{
        type: String,
        required: true
    }],
    dept: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    attended: {
        type: Boolean,
        default: false
    }
});

const Participant = mongoose.model('participants', participantSchema);

module.exports = { Participant };
