const { admin } = require('../models/adminSchema');
const {registrations} = require("../models/registrationsSchema");

let info, eventData;

exports.login = async (req, res) => {
    const { name, pwd, event_name } = req.body;
    console.log(name,pwd)

    try {
        const valid = await admin.findOne({ name: name });

        if (valid) {
            console.log(valid);
            if (valid.pwd == pwd) {
                info = valid;
                console.log("Authenticated");
                eventData = await registrations.find({ event_name: "codesprint" });
                console.log(eventData);
                res.redirect("/home");
            } else {
                res.send("Incorrect Password");
            }
        } else {
            console.log("Not in db");
            res.send("User not found in db");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.home = async (req, res) => {
    try {
        res.render("details", {info_details: info, event_details: eventData});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
