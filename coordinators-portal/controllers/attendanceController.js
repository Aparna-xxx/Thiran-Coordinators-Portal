const { Participant } = require('../models/participantSchema');


exports.updateAttendance = async (req, res) => {
    try {
        const { digit1, digit2, digit3, digit4 } = req.body;
        const regId = digit1 + digit2 + digit3 + digit4;
        const eventNameVal = req.body.eventNameVal;
        console.log(eventNameVal) 

        const participant = await Participant.findOne({ regId });

        if (participant) {
            participant.attended = true;

            await participant.save();

            res.render('attendance', { eventNameVal });
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
        const eventNameVal = req.query.eventName;
        // console.log(eventNameVal)

        res.render('attendance' , {eventNameVal})
    } catch (error) {
        console.log(error)
    }
}


