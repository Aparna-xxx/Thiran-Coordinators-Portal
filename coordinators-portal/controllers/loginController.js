const { admin } = require('../models/adminSchema');
const { Participant } = require('../models/participantSchema');

exports.login = async (req, res) => {
    const { name, pwd } = req.body;

    try {
        const valid = await admin.findOne({ name: name });

        if (valid) {
            if (valid.pwd == pwd) {
                const eventName = valid.event;
                res.redirect(`/home?eventName=${eventName}`);
            } else {
                res.send("Incorrect Password");
            }
        } else {
            res.send("User not found in db");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.home = async (req, res) => {
    try {
        const eventNameVal = req.query.eventName;
        console.log(eventNameVal);

        const participants = await Participant.find({ eventName: eventNameVal });
        // console.log(participants);

        res.render("details", { eventName: eventNameVal, participants });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

