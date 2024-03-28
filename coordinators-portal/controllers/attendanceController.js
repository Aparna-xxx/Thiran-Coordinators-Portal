// const { Participant } = require('../models/participantSchema');
const { Registrations } = require('../models/registrationsSchema');

exports.updateAttendance = async (req, res) => {
    try {
        const { digit1, digit2, digit3, digit4 } = req.body;
        const Id = digit1 + digit2 + digit3 + digit4;
        const eventName = req.body.eventNameVal;
        console.log(eventName);

        // const participant = await Registrations.find({ event_name :eventName });
        // console.log(participant)

        const participant = await Registrations.findOne({ _id: Id });
        console.log(participant)

        if (participant) {
            participant.attended = true;

            await participant.save();
            
            res.render('attendance', { eventName });
        } else {
            res.send("No user found with this registration ID");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


exports.attendance= async(req,res)=>{
    try {
        const eventName = req.query.eventName;
        // console.log(eventNameVal)

        res.render('attendance' , {eventName})
        console.log(eventName);
    } catch (error) {
        console.log(error)
    }
}


exports.starWinner


